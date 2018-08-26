<?php

class Model_AppConfig extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'app_config';
    }

    public function getAppConfig($os, $channel='', $version_code = 0) {
        $os = (int)$os;

        $default_config = DI()->redis->get_time('app_default_config');
        if(empty($default_config)) {
            $default_config = $this->getORM()->where('os = 3')->where('channel = ""')->where('version_code = 0')->fetchPairs("event");
            DI()->redis->set_time('app_default_config', $default_config, 3600);
        }

        $channel_config = DI()->redis->get_time('app_'.$os.'_'.$channel.'_'.$version_code);
        if(empty($channel_config)) {
            $channel_config = $this->getORM()->where('os = ' . $os)->where('channel = "" or channel = "' . $channel .'"')
                ->where('version_code = 0 or version_code = ' . $version_code)->fetchPairs("event");
            DI()->redis->set_time('app_'.$os.'_'.$channel.'_'.$version_code, $channel_config, 3600);
        }

        $total_config = array_merge($default_config, $channel_config);
        if(!empty($total_config)) {
            foreach($total_config as $key => &$config) {
                if(!$config['event']) {
                    $config['event'] = "";
                }
                if(!$config['event_data']) {
                    $config['event_data'] = "0";
                }
                if(!$config['detail']) {
                    $config['detail'] = "0";
                }
            }
        }


        $total_config = array_values($total_config);

        return $total_config;
    }

    public function getPayType($os, $channel = '', $version_code = 0) {
        $os = (int)$os;
        $default_config_list = $this->getORM()->where('os', $os)->where('channel = ""')->where('version_code = 0')
                            ->where('event = "pay_type" or event = "is_auditing"')->fetchAll();
        $version_config_list = $this->getORM()->where('os', $os)->where('channel = ""')
                            ->where('version_code = ' . $version_code)
                            ->where('event = "pay_type" or event = "is_auditing"')->fetchAll();
        $channel_config_list = $this->getORM()->where('os', $os)->where('channel = "' . $channel . '"')
                            ->where('version_code = ' . $version_code)
                            ->where('event = "pay_type" or event = "is_auditing"')->fetchAll();

        $config_list = array_merge($default_config_list, $version_config_list, $channel_config_list);

        $pay['pay_type'] = '1,2';
        $pay['is_auditing'] = '0';
        foreach($config_list as $config) {
            if($config['event'] == 'pay_type') {
                $pay['pay_type'] = $config['event_data'];
            }
            if($config['event'] == 'is_auditing') {
                $pay['is_auditing'] = $config['event_data'];
            }
        }

        return $pay;
    }






}
