<?php

class Model_Gift extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'gift';
    }

    public function getGiftList() {
        $version_code = DI()->request->get('version_code') ? DI()->request->get('version_code') : 20;
        $key = 'gift_list_version_code_'.$version_code;
        $gift_list = DI()->redis->get_time($key);
        if (!empty($gift_list)) {
            return json_decode($gift_list, true);
        }
        //如果app版本小于20，是没有米币礼物的
        if($version_code <= 20) {
            $rs = $this->getORM()
                ->select("id, name, thumb_url,effect_url,md5,local_target,effect_type,price,score,combo,type")
                ->where('is_show = 1')
                ->where('type = 1')
                ->order('sort ASC')
                ->fetchAll();
        } else {
            $rs = $this->getORM()
                ->select("id, name, thumb_url, md5,local_target,price,score,combo,type")
                ->where('is_show = 1')
                ->order('sort ASC')
                ->fetchAll();
        }

        DI()->redis->set($key, $rs, 3600*12);

        return $rs;
    }

    public function insertGiftList($data) {
        return $this->getORM()
            ->insert_multi($data);
    }


    public function getGiftInfoById($gift_id) {
        $key = 'get_gift_info_Id_'. $gift_id;
        $gift_info = DI()->redis->get_time($key);
        if (!empty($gift_info)) {
            return json_decode($gift_info, true);
        }
        $rs =  $this->getORM()
            ->select("*")
            ->where('id =? ', $gift_id)
            ->fetchOne();

        DI()->redis->set($key, $rs, 3600*12);

        return $rs;

    }


}
