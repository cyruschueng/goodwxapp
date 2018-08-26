<?php

class Model_Ad extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'ad';
    }

    public function getList() {
        $ad = DI()->redis->get_time('get_ad');
        if(isset($ad) && !empty($ad)) {
            $ad = json_decode($ad, true);
        } else {
            $ad = DI()->notorm->ad->where('status = 1')->order('id DESC')->fetchOne();
            DI()->redis->set_time('get_ad', json_encode($ad), 60 * 60 * 3);
        }
        return $ad;
    }




}
