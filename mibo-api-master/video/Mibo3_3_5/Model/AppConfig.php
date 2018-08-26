<?php

class Model_AppConfig extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'app_config';
    }

    public function getAppConfig($os, $channel='official') {
        $os = (int)$os;

        $total_config = DI()->redis->get_time('app_config_os_'.$os.'_channel_'.$channel);

        if(empty($total_config)) {
            $official_config = $this->getORM()->where('os = 3 or os = ' . $os)->where('channel = "official"')->fetchPairs("event");
            $channel_config = $this->getORM()->where('os = 3 or os = ' . $os)->where('channel', $channel)->fetchPairs("event");

            $total_config = array_merge($official_config, $channel_config);

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

            DI()->redis->set_time('app_config_os_'.$os.'_channel_'.$channel, $total_config, 18000);
        }

        $total_config = array_values($total_config);

        return $total_config;
    }

    public function getPayType($os) {
        $os = (int)$os;
        $config_list = $this->getORM()->where('os', $os)->where('event = "pay_type" or event = "is_auditing"')
            ->fetchAll();
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
