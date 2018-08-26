<?php

class Api_Vip extends PhalApi_Api {

    public function __construct() {
        $this->domain_vip = new Domain_Vip();
    }

    public function getRules() {
        return array(
            'gainVipPackage' => array(
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户ID'),
                'package_id' => array('name' => 'package_id', 'type' => 'int', 'require' => true, 'desc' => '礼包ID,登录领取礼包id为1'),
            ),
            'hadGetPackage' => array(
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户ID'),
                'package_id' => array('name' => 'package_id', 'type' => 'int', 'require' => true, 'desc' => '礼包ID,登录领取礼包id为1'),
            ),
        );
    }

    /**
     * 获取vip礼包
     * @desc 获取vip礼包
     * @request http://t.com/mibotest.yahalei.com/public/mibo/index.php?service=Vip.GainVipPackage&user_id=14&package_id=1
     * @return mixed
     */
    public function gainVipPackage() {
        return $this->domain_vip->gainVipPackage();
    }

    /**
     * 是否领取vip礼包
     * @desc 是否领取vip礼包
     * @request http://t.com/mibotest.yahalei.com/public/mibo/index.php?service=Vip.HadGetPackage&user_id=14&package_id=1
     * @return bool
     */
    public function hadGetPackage() {
        return $this->domain_vip->hadGetPackage();
    }


}
