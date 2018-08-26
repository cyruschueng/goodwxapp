<?php

class Model_SplashScreen extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'splash_screen';
    }

    public function getSplashScreen() {
        $screen = DI()->redis->get_time('splash_screen');
        if(empty($screen)) {
            $screen = DI()->notorm->splash_screen->select('img_url')->where('status = 1')->order('id DESC')
                ->fetchRow();
            DI()->redis->set_time('splash_screen', $screen, 43200);
        }
        return $screen;
    }


}
