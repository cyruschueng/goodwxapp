<?php

class Api_Mobile extends PhalApi_Api {

    public function getRules() {
        return array(
            'getAdd' => array(
            ),
        );
    }

    /**
     * 获取手机地区
     * @desc 获取手机地区
     * @request http://mibo.yahalei.com/mibo/index.php?service=Mobile.GetAdd
     */
    public function getAdd() {
        $res = GetIpLookup(g_getIP());
        return $res;
    }


}
