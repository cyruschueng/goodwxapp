<?php

class Model_FollowList extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'follow_list';
    }

    public function getFansList($user_id, $self_user_id, $page_no = 1, $page_size = 50) {
        $offset = ($page_no - 1) * $page_size;
        $sql = "select his.*, my.to_user_id as my_follow_id from mb_follow_list as his left join mb_follow_list " .
            " as my on his.user_id = my.to_user_id and my.user_id = {$self_user_id} and my.is_cancel = 0 " .
            "where his.to_user_id = {$user_id} and his.is_cancel = 0 order by his.create_time DESC " .
            " limit " . $offset . "," . $page_size;
        $rs = $this->getORM()->queryAll($sql);

        return $rs;

    }

    public function isMyFollow($user_id, $to_user_id) {
        $is_follow = $this->getORM()->where('user_id', $user_id)->where('to_user_id', $to_user_id)
            ->where('is_cancel = 0')->fetchOne('id');
        return !empty($is_follow) ? true : false;
    }

    public function getFollowList($user_id, $self_user_id, $page_no = 1, $page_size = 50) {
        $offset = ($page_no - 1) * $page_size;
        $sql = "select his.*, my.to_user_id as my_follow_id from mb_follow_list as his left join mb_follow_list " .
            " as my on his.to_user_id = my.to_user_id and my.user_id = {$self_user_id} and my.is_cancel = 0 " .
            "where his.user_id = {$user_id} and his.is_cancel = 0 order by his.create_time DESC " .
            " limit " . $offset . "," . $page_size;
        $rs = $this->getORM()->queryAll($sql);

        return $rs;
    }

    public function getUserFollow($user_id, $to_user_id) {
        return $this->getORM()
            ->select("*")
            ->where("user_id", $user_id)
            ->where('to_user_id', $to_user_id)
            ->fetchOne();
    }

    public function addFollowItem($user_id, $to_user_id) {

        if (empty($user_id) || empty($to_user_id)) {
            return null;
        }

        $insert_data = array(
            'user_id' => $user_id,
            'to_user_id' => $to_user_id,
        );

        return $this->getORM()
            ->insert($insert_data);
    }


}
