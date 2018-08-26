<?php

class Model_User extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'user';
    }

    public function getLastUser() {
        return $this->getORM()
            ->order('mb_id desc')
            ->limit(1)
            ->fetchOne();
    }

    public function addUser($data = array()) {

        $this->getORM()->insert($data);
        return $this->getORM()->insert_id();
    }

    public function getUserInfoByLoginName($login_name) {
        return $this->getORM()
            ->select("*")
            ->where('login_name = ?', $login_name)
            ->fetchOne();
    }

    public function getUserInfoByThirdId($third_id, $user_type) {
        return $this->getORM()
            ->select("*")
            ->where("third_id = ?", $third_id)
            ->fetchOne();
    }

    public function getUserInfoByPhone($phone) {
        return $this->getORM()
            ->select("*")
            ->where('phone = ?', $phone)
            ->fetchOne();
    }

    public function getSearchResult($key_word, $page_no, $page_size, $user_id) {
        $offset = ($page_no - 1) * $page_size;
        $sql = "select user.*, follow.to_user_id as is_followed from mb_user as user left join " .
            "mb_follow_list as follow on follow.user_id = $user_id and user.id = follow.to_user_id " .
            "and follow.is_cancel = 0 where user.user_type != 8 and user.user_type !=9 and  user.id != {$user_id} " .
            "and (user.mb_id like '%" . $key_word . "%' OR user.nick_name like '%" . $key_word . "%') " .
            "order by user.receive_num DESC, user.coin_num DESC limit {$page_size} offset {$offset}";
        $rs = $this->getORM()->queryAll($sql);
        return $rs;
    }

    public function getUsersInfoByIds($user_ids) {
        return $this->getORM()
            ->select("nick_name, im_id, level, avatar, signature, sex, address, coin_num, diamond_num")
            ->where('id in (' . $user_ids . ')')
            ->fetchPairs("id");
    }

    public function getUsersInfoListByUserIds($user_ids) {
        return $this->getORM()
            ->select("nick_name, im_id, level, avatar, signature, sex, address")
            ->where('id ', explode(',', $user_ids))
            ->fetchAll();
    }

    public function getUsersInfoListByImIds($im_ids) {
        return $this->getORM()
            ->select("nick_name, im_id, level, avatar, signature, sex, address")
            ->where('im_id', explode(',', $im_ids))
            ->fetchAll();
    }

    //field只能填一个,要是是，个人主页的数据还是不能缓存，因为个人资料要处理的地方很多
    public function getUsersInfoById($uid, $field = '') {
        //$user_info = DI()->redis->get_time('user_user_id_'.$uid);
        $user_info = '';
        if(!empty($user_info)) {
            $user_info = json_decode($user_info, true);
            if(!empty($user_info)) {
                return $user_info;
            }
        }

        $user_info = $this->getORM()->where('id = ?', $uid)
                        ->fetchOne();
        if($user_info['user_type'] == 8 || $user_info['is_anchor'] == 1) {
            DI()->redis->set_time('user_user_id_'.$uid, json_encode($user_info), 300);
        }
        return $user_info;
    }

    public function updateUserDiamondNumReduce($uid, $diamond, $is_send = false, $coin = 0) {

        if ($is_send) {     //送礼物，买门票
            $data = array(
                'diamond_num' => new NotORM_Literal('diamond_num -' . $diamond),
                'coin_num' => new NotORM_Literal('coin_num -' . $coin),
                'send_num'    => new NotORM_Literal('send_num +' . $diamond),
            );
        } else {    //钻石兑换金币，弹幕，门票
            $data = array(
                'diamond_num' => new NotORM_Literal('diamond_num -' . $diamond),
                'coin_num' => new NotORM_Literal('coin_num +' . $coin),
            );
        }
        DI()->redis->del('user_user_id_'.$uid);
        return $this->getORM()
            ->where('id = ?', $uid)
            ->update($data);
    }

    public function updateAnchorDiamondNumPlus($anchor_id, $diamond_num) {
        $data = array(
            'receive_num' => new NotORM_Literal('receive_num + ' . $diamond_num),
        );
        DI()->redis->del('user_user_id_'.$anchor_id);
        return $this->getORM()
            ->where('id = ?', $anchor_id)
            ->update($data);
    }

    //主要用于用户充值，系统发送大礼包
    public function updateUserDiamondCoin($user_id, $diamond_num,$coin_num) {
        $data = array(
            'diamond_num' => new NotORM_Literal('diamond_num + ' . $diamond_num),
            'coin_num' => new NotORM_Literal('coin_num + ' . $coin_num),
        );
        DI()->redis->del('user_user_id_'.$user_id);
        return $this->getORM()->where('id = ?', $user_id)
            ->update($data);

    }

    //经验增加，修改用户等级
    public function addUserExperience($uid, $experience) {
        $level_experience = DI()->redis->get_time('level_experience');
        if(empty($level_experience)) {
            $level_experience = DI()->notorm->user_level->fetchAll();
            DI()->redis->set_time('level_experience', json_encode($level_experience), 604800);
        } else {
            $level_experience = json_decode($level_experience, true);
        }

        $user_info = $this->getUsersInfoById($uid);
        if($user_info['experience'] >= pow($user_info['level'] + 1,3) * 20) {
            $data['level'] = $user_info['level'] + 1;
        }

        $data['experience'] = new NotORM_Literal('experience +' . $experience);
        return $this->getORM()
            ->where('id = ?', $uid)
            ->update($data);
    }

    public function getRobotUserInfoExcludeUserIds($user_ids) {
        return $this->getORM()
            ->select("*")
            ->where("user_type=9")
            ->where(empty($user_ids) ? "1=1" : 'id not in (' . $user_ids . ')')
            ->order("RAND()")
            ->limit(1)
            ->fetchOne();
    }

    public function insertLoginLog($data) {
        DI()->notorm->user_login
            ->insert($data);
        return DI()->notorm->user_login->insert_id();
    }

    //获取某个直播间的庄家数据
    public function getDealerInfoById($live_id, $user_id) {
        $dealer_info = DI()->redis->get_time('dealer_live_id_'.$live_id);
        if(!empty($dealer_info)) return $dealer_info;

        $dealer_info = DI()->notorm->user->select('id, nick_name, avatar, coin_num, diamond_num, vip_level')->where('id', $user_id)->fetchOne();
        if(empty($dealer_info)) return array();
        DI()->redis->set_time('dealer_live_id_'.$live_id, $dealer_info, 25);
        return $dealer_info;
    }

}