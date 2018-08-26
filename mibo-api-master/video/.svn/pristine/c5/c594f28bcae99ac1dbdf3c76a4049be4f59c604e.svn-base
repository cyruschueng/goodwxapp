<?php

class Api_LiveUser extends PhalApi_Api {

    public function getRules() {
        return array(
            'getLiveUserExtendInfo'   => array(
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
                'live_id' => array('name' => 'live_id', 'type' => 'int', 'require' => true, 'desc' => '直播间id'),
            ),
            'muteUser'   => array(
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '被禁言用户id'),
                'admin_id' => array('name' => 'admin_id', 'type' => 'int', 'require' => true, 'desc' => '管理员id'),
                'anchor_id' => array('name' => 'anchor_id', 'type' => 'int', 'require' => true, 'desc' => '主播id'),
                'mute_time' => array('name' => 'mute_time', 'type' => 'int', 'min' => 600, 'max' => 31536000,
                                     'default' => 10800, 'desc' => '禁言时间，单位：秒'),
            ),
            'cancelMute'   => array(
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '被禁言用户id'),
                'admin_id' => array('name' => 'admin_id', 'type' => 'int', 'require' => true, 'desc' => '管理员id'),
                'anchor_id' => array('name' => 'anchor_id', 'type' => 'int', 'require' => true, 'desc' => '主播id'),
            ),
        );
    }


    /**
     * 用户在直播间的相关信息
     * @desc 用户在直播间的相关信息，主要是补充用户进入接口提供的不足信息
     * @request http://mibotest.yahalei.com/mibo31/index.php?service=LiveUser.GetLiveUserExtendInfo&live_id=7&user_id=2
     */
    public function getLiveUserExtendInfo() {
        $req['user_id'] = $this->user_id;
        $req['live_id'] = $this->live_id;

        $domain = new Domain_LiveUser();
        return $domain->getLiveUserExtendInfo($req);

    }

    /**
     * 主播禁言用户接口
     * @desc 主播禁言用户接口
     * @request http://t.com/mibotest.yahalei.com/public/mibo30/index.php?service=liveUser.muteUser&user_id=100&anchor_id=2&mute_time=1000
     */
    public function muteUser() {
        $req['user_id'] = $this->user_id;
        $req['anchor_id'] = $this->anchor_id;
        $req['admin_id'] = $this->admin_id;
        $req['mute_time'] = $this->mute_time;

        $domain = new Domain_LiveUser();
        return $domain->muteUser($req);
    }

    /**
     * 取消用户禁言
     * @desc 取消用户禁言
     * @return bool
     * @request http://t.com/mibotest.yahalei.com/public/mibo30/index.php?service=liveUser.cancelMute&user_id=102&anchor_id=2
     */
    public function cancelMute() {

        $req['user_id'] = $this->user_id;
        $req['anchor_id'] = $this->anchor_id;
        $req['admin_id'] = $this->admin_id;

        $domain = new Domain_LiveUser();
        return $domain->cancelMute($req);
    }


}
