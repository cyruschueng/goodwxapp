<?php

class Model_Ad extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'ad';
    }

    public function getList() {
        $list = DI()->redis->get_time('get_ad');

        $channel = DI()->request->get('channel');
        $channel = !empty($channel) ? $channel : '';

        $ad = [];
        if(isset($list) && !empty($list)) {
            $list = json_decode($list, true);

            $default_ad = array();
            foreach($list as $val) {
                if($val['channel'] == $channel) {
                    $ad = $val;
                    break;
                }
                if($val['channel'] == '') {
                    $default_ad = $val;
                }
            }

            if(empty($ad)) {
                $ad = $default_ad;
            }
        } else {

            $list = DI()->notorm->ad->where('status = 1')->fetchAll();

            $default_ad = array();
            foreach($list as $val) {
                if($val['channel'] == $channel) {
                    $ad = $val;
                    break;
                }
                if($val['channel'] == '') {
                    $default_ad = $val;
                }
            }

            if(empty($ad)) {
                $ad = $default_ad;
            }

            DI()->redis->set_time('get_ad', json_encode($list), 60 * 60 * 3);
        }
        return $ad;
    }



}