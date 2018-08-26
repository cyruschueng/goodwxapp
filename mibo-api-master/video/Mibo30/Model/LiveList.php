<?php

class Model_LiveList extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'live_list';
    }

    //直播预告
    public function insertPreview($data) {
        $this->getORM()->insert($data);
        $live_id = $this->getORM()->insert_id();
        if($live_id) {
            DI()->redis->del('get_live_list');
            return $live_id;
        } else {
            throw new PhalApi_Exception('发布失败', 531);
        }
    }

    /**
     * @param $page_no
     * @param $page_size
     * @desc 直播列表
     * @return array
     */
    public function getLiveList($page_no, $page_size) {

        $key = "get_live_list";
        $live_list = DI()->redis->get_time($key);
        if (!empty($live_list)) {
            $live_list = json_decode($live_list, true);
            if(isset($live_list[$page_no."_".$page_size]) && !empty($live_list[$page_no."_".$page_size])) {
                return $live_list[$page_no."_".$page_size];
            }
        }

        $offset = ($page_no - 1) * $page_size;
        $sql = 'select l.* from mb_live_list as l LEFT JOIN mb_user as u on l.anchor_id = u.id ' .
            'where (l.status = 1 or l.status = 2) and l.type = 0 order by l.sort DESC, l.status DESC, ' .
            'u.anchor_type ASC, preview_time ASC limit ' . $offset . ', ' . $page_size;

        $live_list = $this->getORM()->queryAll($sql);

        $rs = [];
        foreach($live_list as $per_live) {
            $rs[$per_live['id']] = $per_live;
        }

        if (!empty($rs)) {
            $live_list = is_string($live_list) ? json_decode($live_list, true) : array();
            $live_list[$page_no . "_" . $page_size] = $rs;
            DI()->redis->set($key, json_encode($live_list));
        }

        return $rs;
    }

    /**
     * @param $page_no
     * @param $page_size
     * @desc 有测试的直播列表
     * @return array
     */
    public function getTestLiveList($page_no, $page_size) {

        $offset = ($page_no - 1) * $page_size;
        $sql = 'select l.* from mb_live_list as l LEFT JOIN mb_user as u on l.anchor_id = u.id ' .
            'where (l.status = 1 or l.status = 2) and (l.type = 0 or l.type = 3) order by l.sort DESC, l.status DESC, ' .
            'u.anchor_type ASC, preview_time ASC limit ' . $offset . ', ' . $page_size;

        $live_list = $this->getORM()->queryAll($sql);

        $rs = [];
        foreach($live_list as $per_live) {
            $rs[$per_live['id']] = $per_live;
        }

        return $rs;
    }

    //获取无主播游戏场
    public function getGameList($page_no, $page_size) {

        $key = "get_game_list";
        $game_list = DI()->redis->get_time($key);
        if (!empty($game_list)) {
            $game_list = json_decode($game_list, true);
            if(isset($game_list[$page_no."_".$page_size]) && !empty($game_list[$page_no."_".$page_size])) {
                return $game_list[$page_no."_".$page_size];
            }
        }
        $rs = $this->getORM()
            ->where("(type = 1 And status = 2)")
            ->order('sort DESC, status DESC, type ASC, id DESC')
            ->limit(($page_no - 1) * $page_size, $page_size)
            ->fetchPairs('id');

        if (!empty($rs)) {
            $game_list = is_string($game_list) ? json_decode($game_list, true) : $game_list;
            $game_list[$page_no . "_" . $page_size] = $rs;
            DI()->redis->set($key, json_encode($game_list));
        }

        return $rs;
    }

    //根据id获取直播信息
    public function getLiveInfoByLiveId($live_id) {
        //$live_info = DI()->redis->get_time('every_live_info');
        $redis_key = 'live_info_id_' . $live_id;
        $live_info = DI()->redis->get_time($redis_key);
        if(!empty($live_info)) {
            return $live_info;
        }

        $live_info = $this->getORM()->select("*")->where('id = ?', $live_id)->fetchOne();

        DI()->redis->set_time($redis_key, $live_info);

        return $live_info;
    }

    public function updateLiveInfo($live_id, $data) {
        DI()->redis->del('live_info_id_'.$live_id);
        DI()->redis->del('living_list');
        return $this->getORM()
            ->where('id = ?', $live_id)
            ->update($data);
    }

    //获取正在直播的房间，并redis缓存，其他更新直播间信息时（如updateLiveInfo)，删除缓存
    public function getLiveInList() {
        $live_in_list = DI()->redis->get_time('living_list');
        if(!empty($live_in_list)) {
            $live_in_list = json_decode($live_in_list, true);
        } else {
            $live_in_list = $this->getORM()->where('status=2')->limit(50)->fetchAll();
            DI()->redis->set_time('living_list', json_encode($live_in_list));
        }
        return $live_in_list;
    }

    public function getUserLiveList($user_id) {
        return $this->getORM()
            ->where('anchor_id = ?', $user_id)
            //->where('start_time>' . time())
            ->where('status = 1 or status = 4')
            ->fetchAll();
    }

    public function getFollowVideo($user_id, $page_offset, $page_size) {
        $seven_day_ago = date('Y-m-d', strtotime('-7 day'));

        //关联关注表、直播审核表、直播表，取得直播信息
        $sql = 'select l.id, l.anchor_id, l.cover_url, l.push_url, l.look_url, l.replay_url,' .
            ' l.chatroom_id, l.start_time,' .
            ' l.end_time, l.location, l.status from mb_live_list as l left join mb_follow_list as f ' .
            ' on f.to_user_id = l.anchor_id left join mb_operation_live as o' .
            ' on o.live_id = l.id' .
            ' where f.is_cancel = 0 and f.user_id = ' . $user_id .
            ' and l.start_time >= "' . $seven_day_ago . '" and l.type = 0 and (l.status = 2 or o.type < 9)' .
            ' order by l.start_time desc, l.status asc limit ' .
            $page_offset . ', ' . $page_size;

        $list = $this->getORM()->queryAll($sql);
        return $list;
    }

    public function getRecommendVideo($offset, $page_size) {
        $seven_day_ago = date('Y-m-d', strtotime('-7 day'));

        $sql = 'select l.* from mb_live_list as l left join mb_operation_live as o on l.id = o.live_id' .
                ' where l.type = 0 and l.status = 3 and o.type < 9 and l.start_time >= "' . $seven_day_ago .
                '" order by l.start_time desc, l.sort desc limit ' . $offset . ',' . $page_size;

        $list = $this->getORM()->queryAll($sql);
        return $list;

        //return $this->getORM()
        //    ->select('id, anchor_id,cover_url, push_url, look_url, replay_url, chatroom_id, start_time, end_time, location, status')
        //    ->where('start_time >= ?', $seven_day_ago)->where('type = 0')->where('status = 3')
        //    ->order('sort ASC, start_time DESC')->limit($offset, $page_size)->fetchAll();
    }



}
