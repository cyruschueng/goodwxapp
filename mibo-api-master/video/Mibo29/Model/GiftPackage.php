<?php

class Model_GiftPackage extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'gift_package';
    }

    public function getPackageBySortId($sort_id) {
        return $this->getORM()->where('sort_id = ?', $sort_id)
            ->fetch();
    }






}
