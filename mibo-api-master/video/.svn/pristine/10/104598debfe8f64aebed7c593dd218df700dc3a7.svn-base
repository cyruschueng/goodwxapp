<?php

class Model_Game_Dealer extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'apply_dealer';
    }

    public function add($data) {
        $this->getORM()->insert($data);
        $id = $this->getORM()->insert_id();
        return $id;
    }

}
