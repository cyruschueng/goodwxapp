<?php

class Model_NoAnchorLive extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'no_anchor_live';
    }

    public function getConfig($live_id) {
        $config = DI()->redis->get_time('no_anchor_live_config_'.$live_id);
        if(!empty($config)) return $config;

        $config = $this->getORM()->where('live_id', $live_id)->fetchOne();
        if(!empty($config)) DI()->redis->set_time('no_anchor_live_config_'.$live_id, 36000);

        return $config;

    }




}
