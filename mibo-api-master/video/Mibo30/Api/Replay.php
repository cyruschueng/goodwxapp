<?php

class Api_Replay extends PhalApi_Api {

    public function getRules() {
        return array(
            'getFollowVideo' => array(
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '当前用户id'),
                'page_no' => array('name' => 'page_no', 'type' => 'int', 'default' => 1, 'desc' => '页码'),
                'page_size' => array('name' => 'page_size', 'type' => 'int', 'default' => 20,
                                     'min' => 5, 'max' => 30, 'desc' => '每页数量'),
            ),
            'userEntry' => array(
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '进入用户id'),
                'live_id' => array('name' => 'live_id', 'type' => 'int', 'require' => true, 'desc' => '视频id'),
            ),
            'userExit' => array(
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '退出用户id'),
                'live_id' => array('name' => 'live_id', 'type' => 'int', 'require' => true, 'desc' => '视频id'),
            ),
        );
    }

    /**
     * 关注回放接口
     * @desc 关注回放接口
     * @request http://t.com/mibotest.yahalei.com/public/mibo30/index.php?service=replay.getFollowVideo&user_id=3251
     * @return int status 2:直播中, 3:关闭
     * @return string header_type  1:没有关注任何主播 2:关注的没有直播和回放 3:关注的没有直播，只有回放 4:关注的有直播
     * @return string list_type  0:未知 1:推荐 2:直播 3:回放
     */
    public function getFollowVideo() {
        $req['user_id'] = $this->user_id;
        $req['page_no'] = $this->page_no;
        $req['page_size'] = $this->page_size;

        $domain = new Domain_Replay();
        return $domain->getFollowVideo($req);
    }

    /**
     * 直播回放用户入口
     * @desc 直播回放用户入口
     * @request http://t.com/mibotest.yahalei.com/public/mibo30/index.php?service=Replay.UserEntry&live_id=1650&user_id=3217
     * @return mixed
     */
    public function userEntry() {
        $req['user_id'] = $this->user_id;
        $req['live_id'] = $this->live_id;

        $domain = new Domain_Replay();
        return $domain->userEntry($req);

    }

    /**
     * 直播回放用户退出
     * @desc 直播回放用户退出
     * @request http://t.com/mibotest.yahalei.com/public/mibo30/index.php?service=Replay.UserExit&live_id=1650&user_id=3217
     * @return mixed
     */
    public function userExit() {
        $req['user_id'] = $this->user_id;
        $req['live_id'] = $this->live_id;

        $domain = new Domain_Replay();
        return $domain->userExit($req);
    }



}
