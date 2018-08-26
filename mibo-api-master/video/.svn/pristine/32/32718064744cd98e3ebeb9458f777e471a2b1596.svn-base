<?php

class Domain_Personal extends Domain_Common{

    public function __construct() {
        parent::__construct();
    }

    public function getHomePageInfo() {
        $user_domain = new Domain_User();
        $user_info = $user_domain->getUsersInfoById($this->req['user_id']);
        $user_info = $this->setUserBean($user_info);
        if (empty($user_info)) {
            throw new PhalApi_Exception_BadRequest('不存在该用户', 2);
        }
        $fans_num = DI()->notorm->follow_list->where('to_user_id = ?', $this->req['user_id'])
                ->where('is_cancel = ?', 0)->count();
        $user_info['fans_num'] = $fans_num;

        $follow_num = DI()->notorm->follow_list->where('user_id = ?', $this->req['user_id'])
                ->where('is_cancel = ?', 0)->count();
        $user_info['follow_num'] = $follow_num;

        $home_domain = new Domain_Home();
        $live_list = $home_domain->getUserLiveList($this->req['user_id']);

        //android说，预告直播主播的资料取不了$user_info的数据，只能如下
        if(!empty($live_list)) {
            foreach($live_list as &$per_live) {
                $per_live['avatar'] = $user_info['avatar'];
                $per_live['sex'] = $user_info['sex'];
                $per_live['nick_name'] = $user_info['nick_name'];
                $per_live['location'] = ($per_live['location'] || $per_live['location'] == ' ')
                                        ? $per_live['location'] : '火星';
            }
        }

        $user_deal_model = new Model_UserDealLog();
        $top3_guard = $user_deal_model->getTop3GuardUserlist($this->req['user_id']);

        $user_ids = array_keys($top3_guard);
        $top3_user_list = array();
        if (!empty($user_ids)) {
            $top3_user_list = $user_domain->getUsersInfoByIds(implode(',', $user_ids));
            $top3_user_list = array_values($top3_user_list);
            foreach ($top3_user_list as &$itm) {
                $itm = $user_domain->setSimpleUserInfoBean($itm);
            }
        }

        $is_blocked = DI()->notorm->black_list->where('user_id = ?', $this->req['self_user_id'])
                        ->where('to_user_id = ?', $this->req['user_id'])->where('is_effect = 1')->fetchRow();

        $is_followed = DI()->notorm->follow_list->where('user_id = ?', $this->req['self_user_id'])
                        ->where('to_user_id = ?', $this->req['user_id'])->where('is_cancel = 0')->fetchRow();

        unset($user_info['password']);

        $personal_info = array(
            'user_info'   => $user_info,
            'is_blocked'  => empty($is_blocked) ? false : true,
            'is_followed' => empty($is_followed) ? false : true,
            'live_info'   => empty($live_list) ? null : $live_list,
            'guard_info'  => empty($top3_user_list) ? null : $top3_user_list,
        );

        return $personal_info;
    }

    public function identifyName() {
        $user_id = $this->req['user_id'];
        $user_info = $this->checkUser($user_id);
        if($user_info['anchor_type'] > 0) throw new PhalApi_Exception('此用户已经认证过', 479);
        $name = $this->req['name'];
        $phone = isset($this->req['phone']) ? $this->req['phone'] : "";
        $id_front_url = $this->req['id_front_url'];

        $img_resource = @file_get_contents($id_front_url);
        if(!$img_resource) throw new PhalApi_Exception('没有身份证照片', 480);
        $id_front_data = base64_encode($img_resource);

        $host = "https://dm-51.data.aliyun.com";
        $path = "/rest/160601/ocr/ocr_idcard.json";
        $method = "POST";
        $appcode = "e8853e418c6b4cf5b4f76547267f7abd";
        $headers = array();
        array_push($headers, "Authorization:APPCODE " . $appcode);
        //根据API的要求，定义相对应的Content-Type
        array_push($headers, "Content-Type".":"."application/json; charset=UTF-8");

        $bodys = '{
    "inputs": [
    {
        "image": {
            "dataType": 50,
            "dataValue": "'.$id_front_data.'"
        },
        "configure": {
            "dataType": 50,
            "dataValue": "{
                \"side\": \"face\"
            }"
        }
    }]
}';
        $url = $host . $path;

        $curl = curl_init();
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($curl, CURLOPT_FAILONERROR, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HEADER, false);
        if (1 == strpos("$".$host, "https://"))
        {
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        }
        curl_setopt($curl, CURLOPT_POSTFIELDS, $bodys);
        $res = curl_exec($curl);
        $res = json_decode($res);
        $res = $res->outputs;
        $res = $res[0];
        $res = $res->outputValue;
        $res = $res->dataValue;
        $res = json_decode($res);
        $id_request_res = $res->success;
        if(!$id_request_res) throw new PhalApi_Exception('照片验证失败', 482);
        $id_data['id_num'] = $res->num;
        $id_data['name'] = $res->name;
        if($name != $id_data['name']) throw new PhalApi_Exception('姓名不匹配', 483);
        $id_data['birth'] = $res->birth;
        $id_data['sex'] = $res->sex;
        $id_data['address'] = $res->address;
        $id_data['user_id'] = $user_id;
        $id_data['img_url'] = $id_front_url;
        $id_data['phone'] = $phone;
        DI()->notorm->user_id_card->insert($id_data);
        $insert_id = DI()->notorm->user_id_card->insert_id();

        if($insert_id) {
            $update_data = [
                'anchor_type' => 2
            ];
            $updae_res = DI()->notorm->user->where('id', $user_id)->update($update_data);
            if(!$updae_res) throw new PhalApi_Exception('验证通过，但主播权限失败，联系客服。');
        }

        return true;
    }

    public function applyAnchorSubmit() {

        $history_list = DI()->notorm->apply_anchor
            ->select("*")
            ->where('user_id=?', $this->req['user_id'])
            ->where('phone=?', $this->req['phone'])
            ->fetchOne();

        if (!empty($history_list)) {
            throw new PhalApi_Exception('您已经提交过申请了，运营人员会第一时间进行审核，请耐心靠等待！', 358);
        }

        $anchor_data = array(
            'user_id'   => $this->req['user_id'],
            'user_name' => $this->req['user_name'],
            'age'       => $this->req['age'],
            'sex'       => $this->req['sex'],
            'height'    => $this->req['height'],
            'weight'    => $this->req['weight'],
            'education' => isset($this->req['education']) ? $this->req['education'] : '',
            'wechat'    => $this->req['wechat'],
            'phone'     => $this->req['phone'],
            'id_number' => $this->req['id_number'],
            'img_idcard_hold' => isset($this->req['img_idcard_hold']) ? $this->req['img_idcard_hold'] : '',
            'img_idcard_front' => isset($this->req['img_idcard_front']) ? $this->req['img_idcard_front'] : '',
            'img_idcard_backside' => isset($this->req['img_idcard_backside']) ? $this->req['img_idcard_backside'] : '',
            'img_idcard_live' => isset($this->req['img_idcard_live']) ? $this->req['img_idcard_live'] : '',
        );

        DI()->notorm->apply_anchor->insert($anchor_data);
        $insert_id = DI()->notorm->apply_anchor->insert_id();

        if ($insert_id > 0) {
            $anchor_data['id'] = $insert_id;
            return $anchor_data;
        }
        return false;
    }

    public function getFansList() {
        $user_domain = new Domain_User();
        $user_info = $user_domain->getUsersInfoById($this->req['user_id']);
        if (empty($user_info)) {
            throw new PhalApi_Exception_BadRequest('不存在该用户', 2);
        }

        $follow_model = new Model_FollowList();
        $page_no = isset($this->req['page_no']) ? (int)$this->req['page_no'] : 1;
        $page_size = isset($this->req['page_size']) ? (int)$this->req['page_size'] : 50;
        $fans_list = $follow_model->getFansList($user_info['id'], $this->req['self_user_id'], $page_no, $page_size);
        if(empty($fans_list)) {
            return array();
        }

        $user_ids = array();
        $my_follow_id = array();
        foreach($fans_list as $perfans) {
            array_push($user_ids, $perfans['user_id']);
            if(!empty($perfans['my_follow_id'])) array_push($my_follow_id, $perfans['my_follow_id']);
        }
        //$user_ids = array_keys($fans_list);

        $user_list = $user_domain->getUsersInfoByIds(implode(',', $user_ids));
        foreach ($user_list as &$user) {
            $user_id = $user['id'];
            $user = $user_domain->setSimpleUserInfoBean($user);
            if(in_array($user_id, $my_follow_id)) {
                $user['is_followed'] = true;
            } else {
                $user['is_followed'] = false;
            }
            $user['id'] = $user_id;
        }

        sort($user_list);

        return $user_list;

    }

    //查看某用户关注，并判断关注列表中是否有我已经关注的人
    public function getFollowList() {
        $user_domain = new Domain_User();
        $user_info = $user_domain->getUsersInfoById($this->req['user_id']);
        if (empty($user_info)) {
            throw new PhalApi_Exception_BadRequest('不存在该用户', 2);
        }

        $follow_model = new Model_FollowList();
        $page_no = isset($this->req['page_no']) ? $this->req['page_no'] : 1;
        $page_size = isset($this->req['page_size']) ? $this->req['page_size'] : 50;
        $follow_list = $follow_model->getFollowList($user_info['id'], $this->req['self_user_id'], $page_no, $page_size);
        if(empty($follow_list)) {
            return array();
        }

        $user_ids = array();
        $my_follow = array();
        foreach($follow_list as $perfollow) {
            array_push($user_ids, $perfollow['to_user_id']);
            if(!empty($perfollow['my_follow_id'])) {
                array_push($my_follow, $perfollow['my_follow_id']);
            }
        }
        //$user_ids = array_keys($follow_list);

        $user_list = $user_domain->getUsersInfoByIds(implode(',', $user_ids));
        if(!empty($user_list)) {
            foreach ($user_list as &$user) {
                $user_id = $user['id'];
                $user = $user_domain->setSimpleUserInfoBean($user);

                if(in_array($user_id, $my_follow)) {
                    $user['is_followed'] = true;
                } else {
                    $user['is_followed'] = false;
                }
                $user['id'] = $user_id;
            }
            sort($user_list);
        } else {
            return array();
        }

        return $user_list;
    }

    public function getBlackList() {
        $page_no = isset($this->req['page_no']) ? $this->req['page_no'] : 1;
        $page_size = isset($this->req['page_size']) ? $this->req['page_size'] : 50;
        $offset = ($page_no - 1) * $page_size;
        $black_list = DI()->notorm->black_list->where('user_id = ?', $this->req['user_id'])
            ->where('is_effect = 1')->limit($offset, $page_size)->fetchPairs('to_user_id');

        if(empty($black_list)) {
            return array();
        }

        $user_ids = implode(',', array_keys($black_list));

        $model_user = new Model_User();
        $users = $model_user->getUsersInfoByIds($user_ids);
        foreach($users as &$user) {
            $user = $this->setUserBean($user);
        }
        $users = array_values($users);
        return $users;
    }

    public function toggleBlock() {
        $user_domain = new Domain_User();
        $user_info = $user_domain->getUsersInfoById($this->req['user_id']);
        if (empty($user_info)) {
            throw new PhalApi_Exception_BadRequest('不存在的用户', EC_USER_NO_EXIST);
        }

        $unique_data = array(
            'user_id'    => $user_info['id'],
            'to_user_id' => $this->req['to_user_id'],
        );

        $insert_data = $unique_data;

        $is_effect = 0;

        if ($this->req['act'] == 'add') {
            $is_effect = 1;
        } else if ($this->req['act'] == 'del') {
            $is_effect = 0;
        } else {
            throw new PhalApi_Exception_BadRequest('没有此操作类型', EC_BLACKLIST_NO_ACTION);
        }

        $insert_data['is_effect'] = $is_effect;

        $update_data = array(
            'is_effect' => $is_effect,
        );

        return DI()->notorm->black_list->insert_update($unique_data, $insert_data, $update_data);

    }

    public function toggleFollow() {
        $user_domain = new Domain_User();
        $user_info = $user_domain->getUsersInfoById($this->req['user_id']);
        if (empty($user_info)) {
            throw new PhalApi_Exception_BadRequest('不存在的用户', EC_USER_NO_EXIST);
        }

        if(isset($this->req['position']) && $this->req['position'] == 'Home.GetTodayWinner') {
            DI()->redis->del('today_winners');
        }

        if(isset($this->req['position']) && $this->req['position'] == 'Home.WhoReceiveMost') {
            DI()->redis->del('who_receive_most');
        }

        if(isset($this->req['position']) && $this->req['position'] == 'Home.GetCoinRank') {
            DI()->redis->del('coin_rank_user');
        }

        $unique_data = array(
            'user_id'    => $user_info['id'],
            'to_user_id' => $this->req['to_user_id'],
        );

        $insert_data = $unique_data;

        if ($this->req['act'] == 'add') {
            $is_cancel = 0;
        } else if ($this->req['act'] == 'del') {
            $is_cancel = 1;
        } else {
            throw new PhalApi_Exception_BadRequest('没有此操作类型', EC_BLACKLIST_NO_ACTION);
        }

        $insert_data['is_cancel'] = $is_cancel;

        $update_data = array(
            'is_cancel' => $is_cancel,
        );

        $rs = DI()->notorm->follow_list->insert_update($unique_data, $insert_data, $update_data);

        if (!$rs) {
            throw new PhalApi_Exception('请勿重复操作', 62);
        }
        //关注成功，告诉被关注人
        if($this->req['act'] == 'add') {
            $domain_im = new Domain_IM();
            $msg = '「' . $user_info['nick_name'] . '」关注了你。';
            $extra = array('type' => 3, 'value' => $this->req['user_id']);
            $domain_im->sendUserMsg(1, (int)$this->req['to_user_id'], $msg, $extra);

            //如果关注主播是在直播间，发消息到直播间
            if($this->req['is_in_room'] == 1 && isset($this->req['live_id'])) {
                $model_live = new Model_LiveList();
                $live_info = $model_live->getLiveInfoByLiveId((int)$this->req['live_id']);
                if($this->req['to_user_id'] == $live_info['anchor_id']) {
                    $msg = '「'.$user_info['nick_name'].'」';
                    $domain_im->sendLiveMsg(1, $live_info['chatroom_id'], $msg, IM_FOLLOW_IN_ROOM);
                }
            }
        }

        return true;

    }

    public function isMyFollow() {
        $is_follow = DI()->notorm->follow_list->where('user_id = ?', $this->req['user_id'])
            ->where('to_user_id = ?', $this->req['to_user_id'])
            ->where('is_cancel = 0')->fetchOne('id');
        if(!empty($is_follow)) {
            return true;
        } else {
            return false;
        }
    }

    public function guardList() {

        $guard_list = DI()->redis->get_time('guard_list_' . $this->req['user_id']);

        if(empty($guard_list)) {
            $deal_model = new Model_UserDealLog();
            $user_model = new Model_User();
            $self_info = $user_model->getUsersInfoById($this->req['user_id']);

            $day = date('Y-m-d H:i:s', strtotime('1 day ago'));
            $day_guard_list = $deal_model->getGuardListByTime($this->req['user_id'],$day);
            $day_user_ids = array_keys($day_guard_list);

            $week = date('Y-m-d H:i:s', strtotime('7 day ago'));
            $week_guard_list = $deal_model->getGuardListByTime($this->req['user_id'],$week);
            $week_user_ids = array_keys($week_guard_list);

            //要是没有守护人
            if(empty($day_user_ids) && empty($week_user_ids)) {
                $guard_list['receive_num'] = $self_info['receive_num'] ?  $self_info['receive_num'] : '0';
                $guard_list['day'] = NULL;
                $guard_list['week'] = NULL;
                return $guard_list;
            }

            $user_ids = array_unique(array_merge($day_user_ids, $week_user_ids));

            $user_ids = implode(',', $user_ids);


            $users = $user_model->getUsersInfoByIds($user_ids);

            foreach($day_guard_list as $key => $guard) {
                if(isset($users[$key])) {
                    $day_guard_list[$key] += $users[$key];
                }
            }

            foreach($week_guard_list as $key => $guard) {
                if(isset($users[$key])) {
                    $week_guard_list[$key] += $users[$key];
                }
            }

            //前端不能使用大括号，所以把键去掉，改成中括号
            $week_guard_list = array_values($week_guard_list);
            $day_guard_list = array_values($day_guard_list);



            $guard_list['receive_num'] = $self_info['receive_num'];
            $guard_list['day'] = $day_guard_list;
            $guard_list['week'] = $week_guard_list;

            if($self_info['is_anchor'] == 1) {
                $redis_guard_list = json_encode($guard_list);
                DI()->redis->set_time('guard_list_' . $this->req['user_id'], $redis_guard_list, 300);
            }

        } else {
            $guard_list = json_decode($guard_list, true);
        }

        return $guard_list;
    }

}