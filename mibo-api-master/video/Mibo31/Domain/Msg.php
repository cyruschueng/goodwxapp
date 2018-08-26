<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/8/16
 * Time: 18:35
 */
class Domain_Msg {

    public function sendMsg($req) {
        $domain = new Domain_IM();

        $rs = true;
        if($req['type'] == 1) {
            if(!isset($req['to_user_id']) || $req['to_user_id'] <= 0) throw new PhalApi_Exception('接收用户id错误', 461);
            $rs = $domain->sendUserMsg($req['user_id'], $req['to_user_id'], $req['content']);
        } elseif($req['type'] == 2) {
            if(!isset($req['live_id']) || $req['live_id'] <= 0) throw new PhalApi_Exception('直播间id错误', 462);
            $live_info = DI()->notorm->live_list->select('chatroom_id')->where('id', $req['live_id'])->fetchOne();
            $rs = $domain->sendLiveMsg($req['user_id'], $live_info['chatroom_id'], $req['content'], 102);
        } elseif($req['type'] == 3) {
            $model = new Model_LiveList();
            $live_list = $model->getLiveInList();
            if (!empty($live_list)) {

                $rooms_num = count($live_list);
                for($i=0; $i <= $rooms_num; $i += 20) {
                    $need_send_room = array();
                    $room_20 = array_slice($live_list,$i, 20);
                    foreach($room_20 as $room) {
                        array_push($need_send_room, $room['chatroom_id']);
                    }
                    $domain->sendLiveMsg(1, $need_send_room, $req['content'], IM_SYS_PUBLIC);
                }
            }

            $rs = true;
        }

        return $rs;
    }

}