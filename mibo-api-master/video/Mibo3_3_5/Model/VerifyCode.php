<?php

class Model_VerifyCode extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'verify_code';
    }

    public function addVerifyCode($data) {
        $this->getORM()
            ->insert($data);
        return $this->getORM()->insert_id();
    }

    public function setVerifyCodeChecked($phone, $type) {

        return $this->getORM()
            ->where('phone = ? AND code_type = ? ', array($phone, $type))
            ->update(array('is_check' => 1));
    }


}
