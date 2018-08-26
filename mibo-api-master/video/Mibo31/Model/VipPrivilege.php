<?php

class Model_VipPrivilege extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'vip_privilege';
    }

    public function getPrivilegeByLevel($vip_level) {
        $privilege = $this->getORM()->where('vip_level',$vip_level)->fetchOne();
        $privilege['privilege'] = json_decode($privilege['privilege'], true);
        return $privilege;
    }






}
