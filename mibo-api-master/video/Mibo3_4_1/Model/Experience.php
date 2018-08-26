<?php

class Model_Experience extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'user_experience_log';
    }

//    public function getLastLoginLog($uid) {
//
//        return $this->getORM()
//            ->select("*")
//            ->where('user_id = ?', $uid)
//            ->order('create_time DESC')
//            ->fetchOne();
//    }

    public function getLastSeeLiveExp($uid) {
        return $this->getORM()
            ->select("*")
            ->where('user_id = ?', $uid)
            ->where('mid = 300')
            ->where('create_time >= ?', date('Y-m-d', time()))
            ->order('id DESC')
            ->limit(2)
            ->fetchAll();
    }

    public function addUserExperienceLog($data) {

        $this->getORM()
            ->insert($data);
        return $this->getORM()->insert_id();
    }



}
