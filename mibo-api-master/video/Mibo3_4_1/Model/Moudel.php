<?php

class Model_Moudel extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'moudel';
    }

    public function getMoudelList() {
        return $this->getORM()
            ->fetchPairs('mid');
    }


}
