<?php

class Model_AppConfig extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'app_config';
    }

    public function getAppConfig($os, $channel='', $version_code = 0) {
        $os = (int)$os;

        $default_config = DI()->redis->get_time('app_default_config');
        if(empty($default_config)) {
            $default_config = $this->getORM()->where('os = 3 and channel = "" and version_code = 0')
                ->fetchPairs("event");
        }


        $default_os_config = DI()->redis->get_time('app_default_'.$os.'_config');
        if(empty($default_os_config)) {
            $default_os_config = $this->getORM()->where('os = '.$os.' and channel = "" and version_code = 0')
                ->fetchPairs("event");
        }

        $default_channel_config = DI()->redis->get_time('app_default_'.$channel.'_config');
        if(empty($default_channel_config)) {
            $default_channel_config = $this->getORM()->where('(os = '.$os.' and channel = "'.$channel.'" and version_code = 0)'
            . ' or (os = 3 and channel = "'.$channel.'" and version_code = 0)')->fetchPairs("event");
        }


        $version_config = DI()->redis->get_time('app_'.$os.'_'.$channel.'_'.$version_code.'_config');
        if(empty($version_config)) {
            $sql = "select * from mb_app_config where (os = 3 and channel = '' and version_code = ".$version_code
                .") or (os = 3 and channel = '".$channel."' and version_code = ".$version_code
                .") or (os = ".$os." and channel = '' and version_code = ".$version_code.") or  (os = ".$os
                ." and channel = '".$channel."' and version_code = ".$version_code.")";
            $version_config_res = $this->getORM()->queryAll($sql);

            if(!empty($version_config_res)) {
                foreach($version_config_res as $per_config) {
                    $version_config[$per_config['event']] = $per_config;
                }
            }

        }


        $total_config = $default_config;
        if(!empty($default_os_config)) {
            $total_config = array_merge($total_config, $default_os_config);
        }
        if(!empty($default_channel_config)) {
            $total_config = array_merge($total_config, $default_channel_config);
        }
        if(!empty($version_config)) {
            $total_config = array_merge($total_config, $version_config);
        }
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
