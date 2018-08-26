<?php
class Domain_NoAnchorLive extends Domain_Common {
    public function __construct() {
        parent::__construct();
        $this->model_no_anchor_live = new Model_NoAnchorLive();
    }

    public function getConfig($live_id) {
        return $this->model_no_anchor_live->getConfig($live_id);
    }

    //无主播场用户进入
    public function userEntry($live_info, $user_info) {
        //三、如果是无主播场
        $no_anchor_live_info =  $this->getConfig($live_info['id']);
        $live_info['background_img'] = isset($no_anchor_live_info['background_img'])
            ? $no_anchor_live_info['background_imd'] : '';

        if ($live_info['status'] != 2) {
            throw new PhalApi_Exception('当前主播已下播', 448);
        }

        $chatroom_users_key = "chatroom_" . $live_info['id'] . "_user_list";
        $chatroom_user_list = DI()->redis->get_forever($chatroom_users_key);

        $user_arr = array(
            'id'        => $user_info['id'],
            'nick_name' => $user_info['nick_name'],
            'avatar'    => $user_info['avatar'],
            'sex'       => $user_info['sex'],
            'level'     => $user_info['level'],
            'signature' => $user_info['signature'],
            'user_type' => $user_info['user_type'],
            'anchor_type' => $user_info['anchor_type'],
            'vip_level' => $user_info['vip_level'],
            'send_num'  => 0,
        );

        $domain_live = new Domain_Live();
        //一、用户进入记录
        $domain_live->userEntryLog($user_info['id'], $live_info['id'], 0, 0);

        //二、用户信息加入直播间所有用户信息集合缓存中
        if (empty($chatroom_user_list)) {
            DI()->redis->set_forever($chatroom_users_key, json_encode(array($user_info['id'] => $user_arr)));
            $user_list = array($user_arr);
        } else {

            $redis_user_list = json_decode($chatroom_user_list, true);
            if (!array_key_exists($user_info['id'], $redis_user_list)) {
                $user_arr['send_num'] = $domain_live->getLiveSendNum($live_info['id'], $user_info['id']);
                $redis_user_list = $domain_live->getLiveUserList($redis_user_list, $user_arr);
                DI()->redis->set_forever($chatroom_users_key, json_encode($redis_user_list));
            }
            $user_list = $redis_user_list;
        }

        //三、根据发牌时间和当前时间，把进入直播间的通用数据存储一定时间长的缓存
        $get_live_info_userentry = DI()->redis->get_time('get_live_info_userentry_' . $this->req['live_id']);
        if (!empty($get_live_info_userentry)) {
            $final_data = json_decode($get_live_info_userentry, true);

            //a,用户是否关注主播
            $is_followed = DI()->notorm->follow_list->where('user_id = ?', $this->req['user_id'])
                ->where('to_user_id = ?', $live_info['anchor_id'])->where('is_cancel = 0')->fetchOne('id');
            if (!empty($is_followed)) {
                $final_data['anchor_info']['is_followed'] = true;
            } else {
                $final_data['anchor_info']['is_followed'] = false;
            }

            //b,最后的牌值
            $last_loop_card_info = $domain_live->getLastCardInfo($this->req['live_id']);
            $final_data['last_card_info'] = $last_loop_card_info;

            //c,庄家信息
            $dealer_info = $final_data['anchor_info'];
            $final_data['dealer_info'] = $dealer_info;

            $total_people = count($user_list);
            if ($total_people > 50) {
                $user_list = array_slice($user_list, 0, 50);
            }
            $user_list = array_values($user_list);

            //d,是否管理员

            $final_data['is_admin'] = false;
            $final_data['user_list'] = $user_list;

            return $final_data;

        } else {

            //四、进入直播间信息通告
            $msgBody = array(
                'pid'       => strval(111), //协议ID
                'content'   => "【公告】倡导绿色文明直播，米播严禁利用游戏进行赌博，违者封号，谢谢配合！" ,
                'user_id'   => "",
                'nick_name' => "",
                'avatar'    => "",
                'level'     => "",
                'sex'       => "",
                'signature' => "",
                'extra'     => null,
            );

            //五、如果用户个数大于50个则取前50个用户数据，直播上面的头像
            $total_people = count($user_list);
            if ($total_people > 50) {
                $user_list = array_slice($user_list, 0, 50);
            }
            $user_list = array_values($user_list);

            $domain_user = new Domain_User();
            $anchor_info = $domain_user->setSimpleUserInfoBean($domain_user->getUsersInfoById($live_info['anchor_id']));

            //六、用户是否关注主播
            $is_followed = DI()->notorm->follow_list->where('user_id = ?', $this->req['user_id'])
                ->where('to_user_id = ?', $live_info['anchor_id'])->where('is_cancel = 0')->fetchOne('id');
            if (!empty($is_followed)) {
                $anchor_info['is_followed'] = true;
            } else {
                $anchor_info['is_followed'] = false;
            }

            //七、取得庄家信息
            $dealer_info = $anchor_info;

            //八、最后一局牌值,如果
            $last_loop_card_info = $domain_live->getLastCardInfo($this->req['live_id']);

            //九、直播间的小活动
            $model_activity = new Model_Activity();
            $activity_info = $model_activity->getList();


            //十一、最终返回给客户端的数据
            $final_data = array(
                'is_admin' => false,
                'anchor_info'    => $anchor_info,
                'dealer_info'    => $dealer_info,
                'user_list'      => $user_list,
                'notice_info'    => $msgBody,
                'live_info'      => $domain_live->setLiveBean($live_info),
                'last_card_info' => $last_loop_card_info,
                'activity_info'  => $activity_info,
                'timer'          => rand(500, 1000),
            );


            DI()->redis->set_time('get_live_info_userentry_' . $this->req['live_id'],
                json_encode($final_data), 300);

            return $final_data;
        }
    }

}