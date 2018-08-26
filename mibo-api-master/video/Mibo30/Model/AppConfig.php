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

    public function getAppConfig2($os, $channel='', $version_code = 0) {

        $rs = DI()->notorm->app_config->fetchAll();

        if(empty($rs)) {
            return array();

        } else {
            DI()->redis->set_time('app_config_list', $rs, 60*60*6);
        }


        $list = [];
        foreach($rs as $per_rs) {

            $list_key = $per_rs['event'];
            if(isset($list[$list_key])) {
                array_push($list[$list_key], $per_rs);
            } else {
                $list[$list_key][0] = $per_rs;
            }

        }

        $final_data = [];

        foreach($list as $key => $config_group) {
            foreach($config_group as $per_config) {

                if($per_config['os'] == $os && $per_config['channel'] == $channel && $per_config['version_code'] == $version_code) {
                    $config_1 = $per_config;
                }

                if($per_config['os'] == $os && $per_config['channel'] == $channel && $per_config['version_code'] == 0) {
                    $config_2 = $per_config;
                }

                if($per_config['os'] == $os && $per_config['channel'] == '' && $per_config['version_code'] == $version_code) {
                    $config_3 = $per_config;
                }

                if($per_config['os'] == $os && $per_config['channel'] == '' && $per_config['version_code'] == 0) {
                    $config_4 = $per_config;
                }

                if($per_config['os'] == 3 && $per_config['channel'] == $channel && $per_config['version_code'] == $version_code) {
                    $config_5 = $per_config;
                }

                if($per_config['os'] == 3 && $per_config['channel'] == $channel && $per_config['version_code'] == 0) {
                    $config_6 = $per_config;
                    break;
                }

                if($per_config['os'] == 3 && $per_config['channel'] == '' && $per_config['version_code'] == $version_code) {
                    $config_7 = $per_config;
                }

                if($per_config['os'] == 3 && $per_config['channel'] == '' && $per_config['version_code'] == 0) {
                    $config_8 = $per_config;
                }

            }

            if(isset($config_1)) {
                array_push($final_data, $config_1);
            } elseif(isset($config_2)) {
                array_push($final_data, $config_2);
            } elseif(isset($config_3)) {
                array_push($final_data, $config_3);
            } elseif(isset($config_4)) {
                array_push($final_data, $config_4);
            } elseif(isset($config_5)) {
                array_push($final_data, $config_5);
            } elseif(isset($config_6)) {
                array_push($final_data, $config_6);
            } elseif(isset($config_7)) {
                array_push($final_data, $config_7);
            } elseif(isset($config_8)) {
                array_push($final_data, $config_8);
            }

            unset($config_1);
            unset($config_2);
            unset($config_3);
            unset($config_4);
            unset($config_5);
            unset($config_6);
            unset($config_7);
            unset($config_8);

        }

        return $final_data;
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
