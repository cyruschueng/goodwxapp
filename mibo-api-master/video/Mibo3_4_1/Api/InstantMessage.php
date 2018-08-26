<?php

class Api_InstantMessage extends PhalApi_Api {

    protected $domain_im;
    public function __construct() {
        $this->domain_im = new Domain_IM();
    }

    public function getRules() {
        return array(
            'sendNewUserGiftMessage' => array(
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
            ),

        );
    }

    /**
     * 发送新手大礼包消息
     * @desc 发送新手大礼包消息，前端弹出礼包时调用这个接口
     * @request http://t.com/video/Public/mibo/index.php?service=InstantMessage.SendNewUserGiftMessage&user_id=421
     */
    public function sendNewUserGiftMessage() {
        return $this->domain_im->sendUserMsg(1, array($this->user_id), '恭喜，注册成功！新用户注册系统送您【新手大礼包】一个，祝你玩的愉快！');
    }


}
