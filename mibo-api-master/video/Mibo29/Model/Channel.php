<?php

class Model_Channel extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'channel';
    }

    public function getChannelInfoByChannel($channel) {

        $channel_info = DI()->redis->get_time('channel_' . $channel);

        if (!empty($channel_info)) {
            return json_decode($channel_info, true);
        }

        $channel_info = $this->getORM()
            ->where('channel = ?', $channel)
            ->fetchOne();

         DI()->redis->set_time('channel_' . $channel, json_encode($channel_info));

        return $channel_info;
    }


}
