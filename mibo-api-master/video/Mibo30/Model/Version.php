<?php

class Model_Version extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'version';
    }

    public function getNewVersion($channel) {
        $new_version = DI()->redis->get_time('mb_new_version');
        $new_version = json_decode($new_version, true);
        if(!empty($new_version[$channel])) {
            return $new_version[$channel];
        } else {
            $new_version[$channel] = $this->getORM()->where('status= 1')->where('channel = ?', $channel)
                ->order('id DESC')->fetchOne();
            //如果没有对应的渠道包，则用官方渠道
            if(empty($new_version[$channel])) {
                $new_version[$channel] = $this->getORM()->where('status = 1')->where('channel = ?', 'official')->fetchOne();
                // 如果也没有官方渠道，则随机取一个
                if(empty($new_version[$channel])) {
                    $new_version[$channel] = $this->getORM()->where('status = 1')->fetchOne();
                }
            }
            DI()->redis->set_time('mb_new_version', json_encode($new_version), 21600);
            return $new_version[$channel];
        }

    }


}
