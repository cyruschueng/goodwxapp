<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/8/16
 * Time: 18:35
 */
class Domain_Common {
    protected $user_id;
    protected $req;
    public function __construct() {
        $this->req = DI()->request->getAll();
        $user_id = DI()->request->get('user_id');
        $this->user_id = $user_id ? $user_id : false;
    }

    public function checkUser($user_id = '') {
        $user_id = $user_id ? $user_id : $this->user_id;
        if(!$user_id) throw new PhalApi_Exception('用户id错误', 446);

        $model_user = new Model_User();
        $user_info = $model_user->getUsersInfoById($user_id);

        if (empty($user_info)) {
            throw new PhalApi_Exception_BadRequest("用户不存在", 47);
        }
        return $user_info;
    }

    public function setUserBean($user_info = array()) {
        return array(
            'id'          => isset($user_info['id']) ? $user_info['id'] : "0",
            'mb_id'       => isset($user_info['mb_id']) ? $user_info['mb_id'] : "0",
            'im_id'       => isset($user_info['im_id']) ? $user_info['im_id'] : "",
            'im_pwd'      => isset($user_info['im_pwd']) ? DI()->mycrypt->encrypt($user_info['im_pwd']) : "",
            'third_id'    => isset($user_info['third_id']) ? $user_info['third_id'] : "",
            'third_extra' => isset($user_info['third_extra']) ? $user_info['third_extra'] : "",
            'user_type'   => isset($user_info['user_type']) ? $user_info['user_type'] : "0",
            'channel'     => isset($user_info['channel']) ? $user_info['channel'] : "bt",
            'nick_name'   => isset($user_info['nick_name']) ? $user_info['nick_name'] : "",
            'password'   => isset($user_info['password']) ? $user_info['password'] : "",
            'login_name'  => isset($user_info['login_name']) ? $user_info['login_name'] : "",
            'phone'  => isset($user_info['phone']) ? $user_info['phone'] : "",
            'sex'         => isset($user_info['sex']) ? $user_info['sex'] : "0",
            'is_anchor'   => isset($user_info['is_anchor']) ? $user_info['is_anchor'] : "0",
            'anchor_type'   => isset($user_info['anchor_type']) ? $user_info['anchor_type'] : "0",
            'address'     => (!isset($user_info['address']) || empty($user_info['address'])
                                || $user_info['address'] == ' ') ? "火星" : $user_info['address'],
            'signature'   => !isset($user_info['signature']) || empty($user_info['signature']) ? "这家伙太懒了，什么也没留下" : $user_info['signature'],
            'level'       => isset($user_info['level']) ? $user_info['level'] : "0",
            'experience'  => isset($user_info['experience']) ? $user_info['experience'] : "0",
            'avatar'      => isset($user_info['avatar']) ? $user_info['avatar'] : "http://mibores.yahalei.com/img/pub/201610/default_photo_of_mobile.png",
            'coin_num'    => isset($user_info['coin_num']) ? $user_info['coin_num'] : "0",
            'diamond_num' => isset($user_info['diamond_num']) ? $user_info['diamond_num'] : "0",
            'send_num'    => isset($user_info['send_num']) ? $user_info['send_num'] : "0",
            'receive_num' => isset($user_info['receive_num']) ? $user_info['receive_num'] : "0",
            'fans_num'    => isset($user_info['fans_num']) ? $user_info['fans_num'] : "0",
            'follow_num'  => isset($user_info['follow_num']) ? $user_info['follow_num'] : "0",
            'is_limit'    => isset($user_info['is_limit']) ? $user_info['is_limit'] : "0",
            'vip_level'    => isset($user_info['vip_level']) ? $user_info['vip_level'] : "0",
            'room_card'    => isset($user_info['room_card']) ? $user_info['room_card'] : "0",

        );
    }

}