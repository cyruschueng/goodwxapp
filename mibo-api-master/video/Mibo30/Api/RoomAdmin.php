<?php

class Api_RoomAdmin extends PhalApi_Api {

    public function getRules() {
        return array(
            'addAdmin' => array(
                'anchor_id' => array('name' => 'anchor_id', 'type' => 'int', 'require' => true, 'desc' => '主播id'),
                'admin_id' => array('name' => 'admin_id', 'type' => 'int', 'require' => true, 'desc' => '房管id'),
            ),
            'delAdmin' => array(
                'anchor_id' => array('name' => 'anchor_id', 'type' => 'int', 'require' => true, 'desc' => '主播id'),
                'admin_id' => array('name' => 'admin_id', 'type' => 'int', 'require' => true, 'desc' => '房管id'),
            ),
            'getAdminList' => array(
                'anchor_id' => array('name' => 'anchor_id', 'type' => 'int', 'require' => true, 'desc' => '主播id'),
                'page_no' => array('name' => 'page_no', 'type' => 'int', 'default' => 1, 'desc' => '页码'),
                'page_size' => array('name' => 'page_size', 'type' => 'int', 'default' => 20, 'max' => 50, 'desc' => '每页数量'),
            ),
            'searchUser' => array(
                'anchor_id' => array('name' => 'anchor_id', 'type' => 'int', 'require' => true, 'desc' => '主播id'),
                'key_word' => array('name' => 'key_word', 'type' => 'string', 'require' => true, 'desc' => '用户昵称或米播id'),
                'page_no' => array('name' => 'page_no', 'type' => 'int', 'default' => 1, 'desc' => '页码'),
                'page_size' => array('name' => 'page_size', 'type' => 'int', 'default' => 20, 'max' => 50, 'desc' => '每页数量'),
            ),
            'getRoomUserInfo' => array(
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
                'self_user_id' => array('name' => 'self_user_id', 'type' => 'int', 'require' => true, 'desc' => '自己id'),
                'chatroom_id' => array('name' => 'chatroom_id', 'type' => 'string', 'require' => true, 'desc' => '聊天室id'),
            ),
        );
    }

    /**
     * 添加房管
     * @desc 添加房管
     * @request http://t.com/mibotest.yahalei.com/public/mibo30/index.php?service=roomAdmin.addAdmin&anchor_id=ss&admin_id=aa
     * @return bool
     */
    public function addAdmin() {
        $req['anchor_id'] = $this->anchor_id;
        $req['admin_id'] = $this->admin_id;

        if($req['anchor_id'] <= 0 || $req['admin_id'] <=0) throw new PhalApi_Exception('参数错误');

        $domain = new Domain_RoomAdmin();
        return $domain->addAdmin($req);

    }

    /**
     * 删除房管
     * @desc 删除房管
     * @request http://t.com/mibotest.yahalei.com/public/mibo30/index.php?service=roomAdmin.addAdmin&anchor_id=2&admin_id=100
     * @return bool
     */
    public function delAdmin() {
        $req['anchor_id'] = $this->anchor_id;
        $req['admin_id'] = $this->admin_id;

        if($req['anchor_id'] <= 0 || $req['admin_id'] <=0) throw new PhalApi_Exception('参数错误');

        $domain = new Domain_RoomAdmin();
        return $domain->delAdmin($req);
    }

    /**
     * 我的房管列表
     * @desc 我的房管列表
     * @return array|null
     */
    public function getAdminList() {
        $req['anchor_id'] = $this->anchor_id;
        $req['page_no'] = $this->page_no;
        $req['page_size'] = $this->page_size;

        $domain = new Domain_RoomAdmin();
        return $domain->getAdminList($req);
    }

    /**
     * 搜索添加管理员
     * @desc 搜索添加管理员
     * @request http://t.com/mibotest.yahalei.com/public/mibo30/index.php?service=roomAdmin.searchUser&anchor_id=14267&key_word=33&
     * @return boolean is_admin
     */
    public function searchUser() {
        $req['anchor_id'] = $this->anchor_id;
        $req['key_word'] = $this->key_word;
        $req['page_no'] = $this->page_no;
        $req['page_size'] = $this->page_size;

        $domain = new Domain_RoomAdmin();
        return $domain->searchUser($req);

    }

    /**
     * 获取房间用户信息
     * @desc 获取房间用户信息，是否管理员，是否被禁言等
     * @request http://t.com/mibotest.yahalei.com/public/mibo30/index.php?service=RoomAdmin.GetRoomUserInfo&self_user_id=3271&user_id=100&chatroom_id=22
     * @return boolean is_followed 是否关注
     * @return boolean is_admin 是否管理员
     * @return boolean is_mute  是否禁言
     */
    public function getRoomUserInfo() {
        $req['user_id'] = $this->user_id;
        $req['self_user_id'] = $this->self_user_id;
        $req['chatroom_id'] = $this->chatroom_id;

        $domain = new Domain_RoomAdmin();
        return $domain->getRoomUserInfo($req);
    }





}
