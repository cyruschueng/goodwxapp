<?php

class Model_OpenStatistic extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'open_statistic';
    }

    public function insertOpenStatistic($data) {
        $this->getORM()->insert($data);
        $insert_id = $this->getORM()->insert_id();
        return $insert_id;
    }




}
