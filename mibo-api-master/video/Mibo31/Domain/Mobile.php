<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/8/16
 * Time: 18:35
 */
class Domain_Mobile extends Domain_Common {

    public function __construct() {
        parent::__construct();
    }

    public function bindPhone() {
        $phone = $update_data['phone'] = $this->req['phone'];

        $model_user = new Model_User();
        $user_info = $model_user->getUserInfoByPhone($phone);
        if(!empty($user_info)) throw new PhalApi_Exception('手机号已经注册', 408);

        $update_data['password'] = md5($this->req['password']);
        $res = DI()->notorm->user->where('id', $this->req['user_id'])->update($update_data);
        if($res) return true;

    }

}