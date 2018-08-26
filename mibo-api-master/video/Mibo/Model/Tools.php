<?php

class Model_Tools extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'moudel';
    }

    public function getMoudelList() {
        return DI()->notorm->moudel->select("mid,name")->fetchPairs("key_word");
    }

    public function getBannerList() {
        $list = DI()->redis->get_time('banner_list');
        if(empty($list)) {
           $list =  DI()->notorm->banner
                ->select("title,img,type,value")
                ->where("is_show = 1")
                ->order("sort ASC")
                ->fetchAll();

            DI()->redis->set_time('banner_list', $list, 86400);
        }

        return $list;
    }


}
