<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/8/16
 * Time: 18:35
 */
class Domain_IM {

    private $emchat;


    public function __construct() {
        $this->emchat = new Emchat_Lite();
    }

    public function getServiceUserInfo() {
        $user_domain = new Domain_User();
        return $user_domain->getUsersInfoById(1);
    }

    //当发系统消息时 extra: type=0直播，1webview,2link,3用户主页，
    //4.view（调用android跳转） value为相应的值 如com.heju.mibo.ui.activity.FeedbackActivity
    public function sendUserMsg($from_user_id, $to_user_id, $msg, $extra = null) {
        $model_user = new Model_User();
        $from_user_info = $model_user->getUsersInfoById($from_user_id);

        $msgBody = array(
            'pid'       => 110, //协议ID
            'content'   => $msg,
            'user_id'   => $from_user_info['id'], //发送用户的ID
            'nick_name' => $from_user_info['nick_name'],  //昵称
            'avatar'    => $from_user_info['avatar'],//头像
            'level'     => $from_user_info['level'],   //等级
            'sex'       => $from_user_info['sex'],   //性别
            'signature' => $from_user_info['signature'],  //个性签名
            'extra'     => $extra,
        );

        if(!is_array($to_user_id)) {
            $to_user_id = (int)$to_user_id;
            if(!is_int($to_user_id)) {
                throw new PhalApi_Exception('接收用户id格式错误', 356);

            }
        }

        $to_user_id_str = implode(',', (array)$to_user_id);
        $to_user_list = $model_user->getUsersInfoByIds($to_user_id_str);
        $to_user_im_ids = array();

        foreach($to_user_list as $per_user) {
            array_push($to_user_im_ids, $per_user['im_id']);
        }

        $requestBody = array(
            'target_type' => "users",   // users 给用户发消息。chatgroups: 给群发消息，chatrooms: 给聊天室发消息
            'target'      => $to_user_im_ids,   // 注意这里需要用数组，数组长度建议不大于20，即使只有一个用户， 也要用数组 ['u1']，给用户发送时数组元素是用户名，给群组发送时,数组元素是groupid
            'msg'         => array(
                "type" => "txt",
                "msg"  => json_encode($msgBody), //消息内容，参考[[start:100serverintegration:30chatlog|聊天记录]]里的bodies内容
            ),
            "from"        => $from_user_info['im_id'], //表示消息发送者。无此字段Server会默认设置为"from":"admin"，有from字段但值为空串("")时请求失败
            'ext'         => NULL,
        );

        $rs = $this->emchat->sendText($requestBody['from'], $requestBody['target_type'], $requestBody['target'], $requestBody['msg']['msg'], $requestBody['ext']);
        if (isset($rs['data']) && count($rs['data']) > 0) {

            $log_data = array(
                'user_id' => $from_user_id,
                'pid'     => 110,
                'target'  => implode(',', $to_user_im_ids),
                'body'    => json_encode($msgBody),
            );
            DI()->notorm->im_log->insert($log_data);

            return true;
        }

        return false;
    }

    //发送聊天室消息
    public function sendLiveMsg($fromUserId, $chatroom_ids, $msg, $pid, $extra = null) {

        $user_domain = new Domain_User();
        $from_user_info = $user_domain->getUsersInfoById($fromUserId);

        $msgBody = array(
            'pid'       => $pid, //协议ID
            'content'   => $msg,
            'user_id'   => $from_user_info['id'], //发送用户的ID
            'nick_name' => $from_user_info['nick_name'],  //昵称
            'avatar'    => $from_user_info['avatar'],//头像
            'level'     => $from_user_info['level'],   //等级
            'sex'       => $from_user_info['sex'],   //性别
            'signature' => $from_user_info['signature'],  //个性签名
            'coin_num' => $from_user_info['coin_num'],  //用户金币
            'extra'     => $extra,
        );

        $chatroom_ids = (array)$chatroom_ids;
        $requestBody = array(
            'target_type' => "chatrooms",   // users 给用户发消息。chatgroups: 给群发消息，chatrooms: 给聊天室发消息
            'target'      => $chatroom_ids,   // 注意这里需要用数组，数组长度建议不大于20，即使只有一个用户， 也要用数组 ['u1']，给用户发送时数组元素是用户名，给群组发送时,数组元素是groupid
            'msg'         => array(
                "type" => "txt",
                "msg"  => json_encode($msgBody), //消息内容，参考[[start:100serverintegration:30chatlog|聊天记录]]里的bodies内容
            ),
            //"from"        => $fromUserId['im_id'], //表示消息发送者。无此字段Server会默认设置为"from":"admin"，有from字段但值为空串("")时请求失败
            "from"        => $from_user_info['im_id'], //表示消息发送者。无此字段Server会默认设置为"from":"admin"，有from字段但值为空串("")时请求失败
            'ext'         => null,
        );


        $rs = $this->emchat->sendText($requestBody['from'], $requestBody['target_type'], $requestBody['target'], $requestBody['msg']['msg'], $requestBody['ext']);
        if (isset($rs['data']) && count($rs['data']) > 0) {
            $log_data = array(
                'user_id' => $fromUserId,
                'pid'     => $pid,
                'target'  => $chatroom_ids,
                'body'    => json_encode($msgBody),
            );
            //DI()->notorm->im_log->insert($log_data);
            return true;
        }

        return false;
    }

    public function sendUserMsgFromImId($from_user_id, $im_ids, $msg, $extra = null) {
        $model_user = new Model_User();
        $from_user_info = $model_user->getUsersInfoById($from_user_id);

        $msgBody = array(
            'pid'       => 110, //协议ID
            'content'   => $msg,
            'user_id'   => $from_user_info['id'], //发送用户的ID
            'nick_name' => $from_user_info['nick_name'],  //昵称
            'avatar'    => $from_user_info['avatar'],//头像
            'level'     => $from_user_info['level'],   //等级
            'sex'       => $from_user_info['sex'],   //性别
            'signature' => $from_user_info['signature'],  //个性签名
            'extra'     => $extra,
        );

        $to_user_im_ids = (array)$im_ids;

        $requestBody = array(
            'target_type' => "users",   // users 给用户发消息。chatgroups: 给群发消息，chatrooms: 给聊天室发消息
            'target'      => $to_user_im_ids,   // 注意这里需要用数组，数组长度建议不大于20，即使只有一个用户， 也要用数组 ['u1']，给用户发送时数组元素是用户名，给群组发送时,数组元素是groupid
            'msg'         => array(
                "type" => "txt",
                "msg"  => json_encode($msgBody), //消息内容，参考[[start:100serverintegration:30chatlog|聊天记录]]里的bodies内容
            ),
            "from"        => $from_user_info['im_id'], //表示消息发送者。无此字段Server会默认设置为"from":"admin"，有from字段但值为空串("")时请求失败
            'ext'         => null,
        );

        $rs = $this->emchat->sendText($requestBody['from'], $requestBody['target_type'], $requestBody['target'], $requestBody['msg']['msg'], $requestBody['ext']);
        if (isset($rs['data']) && count($rs['data']) > 0) {

            $log_data = array(
                'user_id' => $from_user_id,
                'pid'     => 110,
                'target'  => implode(',', $to_user_im_ids),
                'body'    => json_encode($msgBody),
            );
            DI()->notorm->im_log->insert($log_data);

            return true;
        }

        return false;
    }

    public function isRoomAdmin($im_id, $chatroom_id) {
        $rs = $this->emchat->getChatRoomAdmin($chatroom_id);
        $list = isset($rs['data']) ? $rs['data'] : [];

        $is_admin = false;

        if(empty($list)) return $is_admin;

        if(in_array($im_id, $list)) {
            $is_admin = true;
        }

        return $is_admin;
    }

    public function isMute($im_id, $chatroom_id) {
        $rs = $this->emchat->getRoomMuteList($chatroom_id);
        $list = $rs['data'];

        $is_mute = false;

        if(empty($list)) return $is_mute;

        foreach($list as $val) {
            if($im_id == $val['user']) {
                $is_mute = true;
                break;
            }
        }

        return $is_mute;

    }

}