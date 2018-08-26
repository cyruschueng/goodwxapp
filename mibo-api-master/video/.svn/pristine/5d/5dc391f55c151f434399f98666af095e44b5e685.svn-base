<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/8/16
 * Time: 18:35
 */
class Domain_LiveUser {


    public function getLiveUserExtendInfo($req) {
        $data = array();

        $model_live = new Model_LiveList();
        $live_info = $model_live->getLiveInfoByLiveId($req['live_id']);

        $is_mute = $this->isMute($req['user_id'], $live_info['anchor_id']);

        $data['is_mute'] = $is_mute;

        return $data;
    }

    //禁言用户
    public function muteUser($req) {

        //1，禁言之前把过期的禁言清理掉
        $this->remExpiredMuteUser($req['anchor_id']);

        //2,禁言相关的key
        $mute_list_key = 'mute_list_anchor_id_' . $req['anchor_id'];
        $mute_list_expire_key = 'mute_list_expire_anchor_id_' . $req['anchor_id'];
        $now = time();
        $expired_time = $now + $req['mute_time'];

        //3,禁言有序集合，过基集合以过期时间为分数
        $rs1 = DI()->redis->zAdd($mute_list_key, $now, $req['user_id']);
        $rs2 = DI()->redis->zAdd($mute_list_expire_key, $expired_time, $req['user_id']);

        if($rs1 === false || $rs2 === false) return false;

        return true;
    }

    public function isMute($user_id, $anchor_id) {
        $now = time();

        $mute_list_key = 'mute_list_anchor_id_' . $anchor_id;
        $mute_list_expire_key = 'mute_list_expire_anchor_id_' . $anchor_id;

        //redis没有判断是否已经存在的方法，只能通过是否有分数曲线判断了
        $mute_time = DI()->redis->zScore($mute_list_key, $user_id);
        $mute_expire_time = DI()->redis->zScore($mute_list_expire_key, $user_id);

        if(!$mute_time || !$mute_expire_time || $mute_expire_time < $now) {
            DI()->redis->zRem($mute_list_key, $user_id);
            DI()->redis->zRem($mute_list_expire_key, $user_id);

            return false;
        }

        return true;

    }

    //取消禁言
    public function cancelMute($req) {

        $mute_list_key = 'mute_list_anchor_id_' . $req['anchor_id'];
        $mute_list_expire_key = 'mute_list_expire_anchor_id_' . $req['anchor_id'];

        //redis没有判断是否已经存在的方法，只能通过是否有分数曲线判断了
        $is_mute = DI()->redis->zScore($mute_list_key, $req['user_id']);
        $is_mute_expire = DI()->redis->zScore($mute_list_expire_key, $req['user_id']);

        if($is_mute) {
            DI()->redis->zRem($mute_list_key, $req['user_id']);
        }

        if($is_mute_expire) {
            DI()->redis->zRem($mute_list_expire_key, $req['user_id']);
        }

        return true;

    }

    //移除过期禁言
    public function remExpiredMuteUser($anchor_id) {
        $now = time();

        $mute_list_key = 'mute_list_anchor_id_' . $anchor_id;
        $mute_list_expire_key = 'mute_list_expire_anchor_id_' . $anchor_id;

        $expire_list = DI()->redis->zRangeByScore($mute_list_expire_key, 0, $now);
        if(!empty($expire_list)) {
            foreach($expire_list as $user_id => $expire_time) {
                DI()->redis->zRem($mute_list_key, $user_id);
            }

            DI()->redis->zRemRangeByScore($mute_list_expire_key, 0, $now);
        }

        return true;
    }

}