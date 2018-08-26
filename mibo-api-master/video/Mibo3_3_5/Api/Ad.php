<?php

class Api_Ad extends PhalApi_Api {

    public function getRules() {
        return array(
            'getAd' => array(
            ),
        );
    }

    /**
     * 获取广告
     * @desc 获取广告
     * @request http://mibo.yahalei.com/mibo/index.php?service=Ad.getAd&mibo
     */
    public function getAd() {
        $domain_ad = new Domain_Ad();
        $res = $domain_ad->getAd();
        return $res;
    }


}
