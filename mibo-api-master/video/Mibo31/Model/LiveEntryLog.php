<?php

class Model_LiveEntryLog extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'live_entry_log';
    }

    public function insertUserEntrylog($data) {
        $this->getORM()->insert($data);
        return $this->getORM()->insert_id();
    }

    public function getLastEntry($user_id, $live_id) {
        return $this->getORM()->where('user_id = ?', $user_id)
            ->where('live_id = ?', $live_id)->order('id DESC')
            ->fetchOne();
    }

}
