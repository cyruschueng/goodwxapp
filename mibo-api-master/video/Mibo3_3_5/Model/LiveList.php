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

    public function getLiveList($page_no, $page_size) {

        $key = "get_live_list";
        $live_list = DI()->redis->get_time($key);
        if (!empty($live_list)) {
            $live_list = json_decode($live_list, true);
            if(isset($live_list[$page_no."_".$page_size]) && !empty($live_list[$page_no."_".$page_size])) {
                return $live_list[$page_no."_".$page_size];
            }
        }
        $rs = $this->getORM()
            ->where("(status = 1 OR status = 2)")
            ->where("type = 0")
            ->order('sort DESC, status DESC, type ASC, id DESC')
            ->limit(($page_no - 1) * $page_size, $page_size)
            ->fetchPairs('id');

        if (!empty($rs)) {
            $live_list = json_decode($live_list, true);
            $live_list[$page_no . "_" . $page_size] = $rs;
            DI()->redis->set($key, json_encode($live_list));
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
            $game_list = json_decode($game_list, true);
            $game_list[$page_no . "_" . $page_size] = $rs;
            DI()->redis->set($key, json_encode($game_list));
        }

        return $rs;
    }

    //根据id获取直播
    public function getLiveInfoByLiveId($live_id) {
        $live_info = DI()->redis->get_time('every_live_info');
        if(!empty($live_info)) {
            $live_info = json_decode($live_info, true);
            if(isset($live_info[$live_id]) && !empty($live_info[$live_id])) {
                return $live_info[$live_id];
            }
        }

        $live_info[$live_id] = $this->getORM()->select("*")
                                ->where('id = ?', $live_id)->fetchOne();
        if(!empty($live_info[$live_id])) {
            DI()->redis->set_time('every_live_info', json_encode($live_info));
        }
        return $live_info[$live_id];
    }

    public function updateLiveInfo($live_id, $data) {
        DI()->redis->del('every_live_info');
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
            $live_in_list = $this->getORM()->select("*")->where('status=2')->fetchAll();
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



}