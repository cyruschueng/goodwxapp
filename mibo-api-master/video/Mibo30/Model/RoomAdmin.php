<?php

class Model_RoomAdmin extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'room_admin';
    }

    public function addAdmin($data){

        $this->getORM()->insert($data);
        $id = $this->getORM()->insert_id();
        return $id ? true : false;

    }

    public function isAdmin($admin_id, $anchor_id) {
        $had_been_admin = DI()->notorm->room_admin->where('admin_id', $admin_id)
            ->where('anchor_id', $anchor_id)->fetchOne();

        return $had_been_admin ? true : false;
    }

    public function getAdminByAdminIds($admin_id_arr, $anchor_id) {
        $list = DI()->notorm->room_admin->select('admin_id')->where('admin_id', $admin_id_arr)
            ->where('anchor_id', $anchor_id)->fetchAll();
        return $list;
    }



}
