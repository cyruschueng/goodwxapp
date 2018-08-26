<?php

class Model_GiftPackageLog extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'gift_package_log';
    }

   public function insertUpdateLog($user_id, $gift_package_id) {
       $unique = array('user_id' => $user_id, 'gift_package_id' => $gift_package_id);
       $insert = array('user_id' => $user_id, 'gift_package_id' => $gift_package_id);
       $update = array();
       $rs = $this->getORM()->insert_update($unique, $insert, $update);
       return $rs;
   }


}
