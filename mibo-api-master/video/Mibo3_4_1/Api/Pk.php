<?php

class Api_Pk extends PhalApi_Api {

    private $domain_pk ;

    public function __construct() {
        $this->domain_pk = new Domain_Pk();
    }

    public function getRules() {
        return array(
            'getRoomList'         => array(
                'page_no' => array('name' => 'page_no', 'type' => 'int', 'require' => false, 'desc' => '页码'),
                'page_size' => array('name' => 'page_size', 'type' => 'int', 'require' => false, 'default' => 20, 'desc' => '每页数量'),
            ),
            'createRoom'         => array(
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
                'room_name' => array('name' => 'room_name', 'type' => 'string', 'require' => false, 'desc' => '房间名称'),
                'type' => array('name' => 'type', 'type' => 'int', 'require' => true, 'desc' => '房间类型:1钻石，2金币'),
                'password' => array('name' => 'password', 'type' => 'string', 'require' => false, 'desc' => '房间密码'),
                'mini_limit' => array('name' => 'mini_limit', 'type' => 'int', 'require' => true, 'desc' => '最低限制'),
                'loop_num' => array('name' => 'loop_num', 'type' => 'int', 'require' => true, 'desc' => '局数'),
            ),
            'continueRoom'         => array(
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
                'old_room_id' => array('name' => 'old_room_id', 'type' => 'int', 'require' => true, 'desc' => '之前房间id'),
            ),
            'ownerExit'         => array(
                'owner_id' => array('name' => 'owner_id', 'type' => 'int', 'require' => true, 'desc' => '房主id'),
                'room_id' => array('name' => 'room_id', 'type' => 'int', 'require' => true, 'desc' => '房间id'),
            ),
            'userEntry'         => array(
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
                'room_id' => array('name' => 'room_id', 'type' => 'int', 'require' => false, 'desc' => '房间id'),
                'password' => array('name' => 'password', 'type' => 'string', 'require' => false, 'desc' => '房间密码'),
            ),
            'userExit'         => array(
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
                'room_id' => array('name' => 'room_id', 'type' => 'int', 'require' => true, 'desc' => '房间id'),
            ),
            'downSeat'         => array(
                'room_id' => array('name' => 'room_id', 'type' => 'int', 'require' => true, 'desc' => '房间id'),
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
                'pool_id' => array('name' => 'pool_id', 'type' => 'int', 'require' => true, 'min' => 1, 'max' => 4, 'desc' => '座位id'),
            ),
            'upSeat'         => array(
                'room_id' => array('name' => 'room_id', 'type' => 'int', 'require' => true, 'desc' => '房间id'),
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
                'pool_id' => array('name' => 'pool_id', 'type' => 'int', 'require' => false, 'desc' => '座位id'),
            ),
            'forceUpSeat'         => array(
                'room_id' => array('name' => 'room_id', 'type' => 'int', 'require' => true, 'desc' => '房间id'),
                'owner_id' => array('name' => 'owner_id', 'type' => 'int', 'require' => true, 'desc' => '房主id'),
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '被T用户id'),
                'pool_id' => array('name' => 'pool_id', 'type' => 'int', 'require' => true, 'desc' => '座位id'),
            ),
            'searchRoom'         => array(
                'room_id' => array('name' => 'room_id', 'type' => 'int', 'require' => false, 'desc' => '房间id'),
            ),
            'getRoomRecord'      => array(
                'room_id' => array('name' => 'room_id', 'type' => 'int', 'require' => true, 'desc' => '房间id'),
            ),
            'shareRoom'      => array(
                'room_id' => array('name' => 'room_id', 'type' => 'int', 'require' => true, 'desc' => '房间id'),
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
                'share_type' => array('name' => 'share_type', 'type' => 'int', 'require' => true,
                                      'desc' => '分享类型1:微信 2:微信朋友圈 3:新浪微博 4:QQ 5:QQ空间'),
                'from'       => array('name' => 'from', 'type' => 'int', 'require' => false, 'default' => 1,
                                      'desc' => '从哪里进行的分享 1：直播间  2：娱乐场  3：PK场-米钻房 4：PK场-米币房'),
            ),
        );
    }

    /**
     * pk房间列表
     * @desc pk房间列表
     * @return null
     * @request http://t.com/mibotest.yahalei.com/public/mibo/index.php?service=Pk.GetRoomList
     */
    public function getRoomList() {
        return $this->domain_pk->getRoomList();
    }

    /**
     * 创建pk房间
     * @desc 创建pk房间，同时进入房间
     * @request http://t.com/mibotest.yahalei.com/public/mibo/index.php?service=Pk.CreateRoom&user_id=29&type=1&mini_limit=0&game_num=8
     */
    public function createRoom() {
        return $this->domain_pk->createRoom();
    }

    /**
     * 继续房间
     * @desc 继续房间
     */
    public function continueRoom() {
        return $this->domain_pk->continueRoom();
    }

    /**
     *  房主退出
     * @desc 房主退出
     * @return bool
     */
    public function ownerExit() {
        return $this->domain_pk->ownerExit();
    }

    /**
     * 用户进入房间
     * @desc 用户进入房间
     * @request http://t.com/mibotest.yahalei.com/public/mibo/index.php?service=Pk.UserEntry&user_id=29&room_id=2
     */
    public function userEntry() {
        return $this->domain_pk->userEntry();
    }

    /**
     * 用户退出房间
     * @desc 用户退出房间
     * @request http://t.com/mibotest.yahalei.com/public/mibo/index.php?service=Pk.UserEntry&user_id=29&room_id=2
     */
    public function userExit() {
        return $this->domain_pk->userExit();
    }

    /**
     * 用户入座
     * @desc 用户入座
     * @request http://t.com/mibotest.yahalei.com/public/mibo/index.php?service=Pk.DownSeat&room_id=2&pool_id=1&user_id=29
     */
    public function downSeat() {
        return $this->domain_pk->downSeat();
    }

    /**
     * 用户退座
     * @desc 用户退座
     */
    public function upSeat() {
        return $this->domain_pk->upSeat();
    }

    /**
     * 强制用户退座
     * @desc 强制用户退座,T人
     */
    public function forceUpSeat() {
        return $this->domain_pk->forceUpSeat();
    }

    /**
     * 根据房间id搜索房间
     * @desc 根据房间id搜索房间
     * @return mixed|null
     * @request http://t.com/mibotest.yahalei.com/public/mibo/index.php?service=Pk.SearchRoom&room_id=2
     */
    public function searchRoom() {
        return $this->domain_pk->searchRoom();
    }

    /**
     * 分享房间，邀请好友
     * @desc 分享房间，邀请好友
     * @return array
     */
    public function shareRoom() {
        return $this->domain_pk->shareRoom();
    }


}
