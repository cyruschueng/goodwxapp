<?php

class Model_LiveExtend extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'live_extend';
    }

    public function addSeeNUm($live_id, $user_id) {

        $redis_key = 'replay_playing_num_live_id_'.$live_id;

        $live_see_user_key = 'replay_playing_users_live_id_'.$live_id;
        $had_added  = DI()->redis->sIsMember($live_see_user_key, $user_id);
        if($had_added) {
            $playing_num = DI()->redis->get_int($redis_key);
            return $playing_num;
        }

        DI()->redis->sAdd($live_see_user_key, $user_id);

        $playing_num = DI()->redis->get_incr($redis_key);
        if($playing_num >= 50) {
            $array_unique = ['live_id' => $live_id];
            $insert_data = [
                'live_id' => $live_id,
                'playing_num' => $playing_num,
            ];
            $update_data = [
                'playing_num' => new NotORM_Literal('playing_num + '.$playing_num),
            ];

            DI()->notorm->live_extend->insert_update($array_unique, $insert_data, $update_data);
            DI()->redis->del($redis_key);
        }

        return $playing_num;
    }

    public function getSeeNum($live_ids) {
        if(!is_array($live_ids)) return false;
        $see_num_list = DI()->notorm->live_extend->select('live_id, playing_num')
            ->where('live_id', $live_ids)->fetchPairs('live_id');

        foreach($live_ids as $live_id){
            if(!isset($see_num_list[$live_id])) {
                $see_num_list[$live_id] = array(
                    'live_id' => $live_id,
                    'playing_num' => 0,
                );
            }
        }

        foreach($see_num_list as &$item) {
            $redis_key = 'replay_playing_num_live_id_' . $item['live_id'];
            $redis_num = DI()->redis->get_int($redis_key);
            if($redis_num) {
                $item['playing_num'] += $redis_num;
            }

        }

        return $see_num_list;
    }

}
