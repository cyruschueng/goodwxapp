<?php

class Model_LoadingIcon extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'loading_icon';
    }

    public function getLoadingIcon() {
        $loading_icon = DI()->redis->get_time('mb_loading_icon');
        if(!empty($loading_icon)) {
            return json_decode($loading_icon, true);

        } else {
            $loading_icon = $this->getORM()->where('status= 1')
                ->order('id DESC')->fetchOne();
            if(!empty($loading_icon)) {
                DI()->redis->set_time('mb_loading_icon', json_encode($loading_icon), 21600);
            }

            return $loading_icon;
        }

    }


}
