<?php

class Model_InternalStaff extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'internal_staff';
    }

    public function getList() {
        $staff = DI()->redis->get_time('internal_staff_list');
        if(!empty($staff)) return $staff;

        $staff =  DI()->notorm->internal_staff->fetchPairs('mb_id');
        DI()->redis->set_time('internal_staff_list', $staff, 3600 * 12);

        return $staff;
    }

    public function isInternalStaff($mb_id) {
        $list = $this->getList();
        if(key_exists($mb_id, $list)) {
            return true;
        } else {
            return false;
        }

    }



}
