<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/8/16
 * Time: 18:35
 */
class Domain_Live extends Domain_Common {

    public $liveModel;
    private $userDomain;

    public function __construct() {
        parent::__construct();
        $this->liveModel = new Model_LiveList();
        $this->userDomain = new Domain_User();
    }

    public function setLiveBean($liveInfo, $is_anchor = false) {

        return $update_data = array(
            'live_id'        => isset($liveInfo['live_id']) ? $liveInfo['live_id'] : "0",
            'chatroom_id'    => isset($liveInfo['chatroom_id']) ? $liveInfo['chatroom_id'] : "",
            'push_url'       => isset($liveInfo['push_url']) && $is_anchor ? $liveInfo['push_url'] : "",
            'look_url'       => isset($liveInfo['look_url']) ? $liveInfo['look_url'] : "",
            'flv_url'        => isset($liveInfo['flv_url']) ? $liveInfo['flv_url'] : "",
            'm3u8_url'       => isset($liveInfo['m3u8_url']) ? $liveInfo['m3u8_url'] : "",
            'type'           => isset($liveInfo['type']) ? $liveInfo['type'] : "0",
            'cover_url'      => isset($liveInfo['cover_url']) ? $liveInfo['cover_url'] : "",
            'status'         => isset($liveInfo['status']) ? $liveInfo['status'] : '0',
            'background_img' => isset($liveInfo['background_img']) ? $liveInfo['background_img'] : '',
        );
    }

    public function checkLive() {
        if(!isset($this->req['live_id'])) throw new PhalApi_Exception('参数live_id错误', 408);
        $live_info = $this->getLiveInfoByLiveId($this->req['live_id']);

        if (empty($live_info)) {
            throw new PhalApi_Exception_BadRequest("直播信息不存在", 45);
        }
        return $live_info;
    }

    public function getLiveInfoByLiveId($live_id) {
        if (empty($live_id)) {
            return false;
        }

        $live_info = $this->liveModel->getLiveInfoByLiveId($live_id);
        if (empty($live_info)) {
            return false;
        }
        return $live_info;
    }


    public function userEntryLog($user_id, $live_id, $act = 0, $is_anchor = 0) {
        $log_data = array(
            'user_id'   => $user_id,
            'live_id'   => $live_id,
            'is_anchor' => $is_anchor,
            'act'       => $act,
            'channel'   => isset($this->req['channel']) ? $this->req['channel'] : '',
        );
        $user_entry_log_model = new Model_LiveEntryLog();
        return $user_entry_log_model->insertUserEntrylog($log_data);
    }


    public function anchorEntry() {

        $live_info = $this->checkLive();
        $anchor_info = $this->checkUser();

        if (empty($anchor_info)) {
            throw new PhalApi_Exception_BadRequest("您不是该直播指定的主播", 46);
        }

        if ($anchor_info['anchor_type'] < 1) {
            throw new PhalApi_Exception_BadRequest("您不具有发起直播权限，请联系客服人员", 47);
        }

        $this->userEntryLog($anchor_info['id'], $live_info['id'], 0, 1);

        $options = array(
            'name'        => "mibo" . $live_info['id'],
            'description' => $live_info['live_name'],
            'maxusers'    => 5000,
            'owner'       => $anchor_info['im_id'],
            'members'     => array("mibokf1000"),
        );
        $chatroom_key = "chatroom_" . $live_info['id'];
        $chatroom_id = DI()->redis->get_forever($chatroom_key);
        if (empty($chatroom_id)) {

            //创建聊天室
            $emchat = new Emchat_Lite();
            $chatroom_info = $emchat->createChatRoom($options);
            if (empty($chatroom_info) || !isset($chatroom_info['data']['id'])) {
                throw new PhalApi_Exception("创建聊天室失败", 444);
            }

            $chatroom_id = $chatroom_info['data']['id'];
            DI()->redis->set_forever($chatroom_key, $chatroom_id);
        }

        $stream_name = "mb-" . $live_info['id'] . '-' . $live_info['anchor_id'];
        $filename = '/' . APP_NAME . "/" . $stream_name;

        $auth_key = $this->getAuthkey($filename);
        $flv_authkey = $this->getAuthkey($filename . '.flv');
        $m3u8_authkey = $this->getAuthkey($filename . '.m3u8');

        $add_arr = GetIpLookup(g_getIP());
        $city = isset($add_arr['city']) ? $add_arr['city'] : '火星';

        $update_data = array(
            'chatroom_id' => $chatroom_id,
            'push_url'    => "rtmp://video-center.alivecdn.com/" . APP_NAME . "/" . $stream_name . "?vhost=" . LIVE_DOMAIN_HOST . "&auth_key=" . $auth_key,
            'look_url'    => 'rtmp://' . LIVE_DOMAIN_HOST . "/" . APP_NAME . "/" . $stream_name . "?auth_key=" . $auth_key,
            'flv_url'     => 'http://' . LIVE_DOMAIN_HOST . "/" . APP_NAME . "/" . $stream_name . ".flv?auth_key=" . $flv_authkey,
            'm3u8_url'    => 'http://' . LIVE_DOMAIN_HOST . "/" . APP_NAME . "/" . $stream_name . ".m3u8?auth_key=" . $m3u8_authkey,
            'replay_url'  => 'http://miboinput.oss-cn-hangzhou.aliyuncs.com/record' . "/" . APP_NAME . "/" . $stream_name . ".m3u8?auth_key=" . $m3u8_authkey,
            'start_time'  => $live_info['status'] == 4 ? $live_info['start_time'] : date('Y-m-d H:i', time()),
            'location'    => isset($this->req['location']) ? $this->req['location'] : $city,
            'status'      => 2, //直播中状态
        );


        $rs = $this->liveModel->updateLiveInfo($live_info['id'], $update_data);

        if ($rs != 1 && $rs != 0) {
            throw new PhalApi_Exception("内部错误：更新直播信息失败", 445);
        }

//        DI()->redis->del($chatroom_key);
        $del_redis_res = DI()->redis->del('get_live_list');

        $update_data['live_id'] = $live_info['id'];
        $update_data = $this->setLiveBean($update_data, true);

        $update_data['receive_num'] = $anchor_info['receive_num'];

        //告诉粉丝开直播了
        $this->notifyFansWhenLive($anchor_info, $live_info);
        //告诉购票的人开播了
//        $this->notifyBuyerWhenLive($anchor_info['id'], $live_info['id']);

        return $update_data;
    }

    public function getAuthkey($filename) {

        $time = time() + 18000;

        $aliyun_private_key = DI()->config->get("app.aliyun.private_key");

        $string = $filename . "-" . $time . "-0-0-" . $aliyun_private_key;

        $md5 = md5($string);

        $auth_key = $time . "-0-0-" . $md5;


        return $auth_key;

    }

    //通知主播的粉丝，主播开直播了
    public function notifyFansWhenLive($anchor_info, $live_info) {
        $fans_num = DI()->notorm->follow_list->where('is_cancel = 0')
            ->where('to_user_id = ?', $anchor_info['id'])->count('*');
        $fans_user_ids = DI()->notorm->follow_list->where('is_cancel = 0')
            ->where('to_user_id = ?', $anchor_info['id'])->select('user_id')->order('id ASC')->fetchPairs('user_id');
        //从redis中取出买票的用户id,如果已经买票且是粉丝，则只以买票的名义通知用户
        $user_id_redis_key = 'live_' . $live_info['id'] . '_ticket_userid';
        $redis_user_ids = DI()->redis->get_lRange($user_id_redis_key, 0, -1);

        if(!$redis_user_ids) {
            foreach ($redis_user_ids as $redis_user_id) {
                if (is_string($redis_user_id) || is_int($redis_user_id)) {
                    if (array_key_exists($redis_user_id, $fans_user_ids)) {
                        unset($fans_user_ids[$redis_user_id]);
                    }
                }
            }
        }

        $rs = DI()->redis->del($user_id_redis_key);

        $domain_im = new Domain_IM();
        for ($i = 0; $i < $fans_num; $i += 19) {
            $cut_ids = array_slice($fans_user_ids, $i, 20, true);
            if (!empty($cut_ids)) {
                $cut_ids = array_keys($cut_ids);
                $extra_val = [
                    'id' => $live_info['id'],
                    'cover_url' => $live_info['cover_url'],
                    'push_url' => $live_info['push_url'],
                    'look_url' => $live_info['look_url'],
                    'm3u8_url' => $live_info['m3u8_url'],
                    'chatroom_id' => $live_info['chatroom_id'],
                ];
                $extra_val = json_encode($extra_val);
                $extra = array('type' => 0, 'value' => $extra_val);
                $domain_im->sendUserMsg(1, $cut_ids, '【'.$anchor_info['nick_name'].'】正在'.$live_info['location'].'开直播。邀请您来观看!', $extra);
            }
        }
    }

    public function notifyBuyerWhenLive($anchor_id, $live_id) {
        $im_id_redis_key = 'live_' . $this->req['live_id'] . '_ticket_imid';
        $im_ids = DI()->redis->get_lRange($im_id_redis_key, 0, -1);
        $num = count($im_ids);
        $domain_im = new Domain_IM();
        for ($i = 0; $i < $num; $i += 19) {
            $cut_ids = array_slice($im_ids, $i, 20, true);

            if (!empty($cut_ids)) {
                $extra = array('type' => 0, 'value' => $live_id);
                $domain_im->sendUserMsgFromImId(1, $cut_ids, '您已购票的直播开始了!', $extra);
            }
        }
        $rs = DI()->redis->del($im_id_redis_key);

    }

    public function instantLive() {

        $user_info = $this->checkUser();
        if($user_info['anchor_type'] <= 0) throw new PhalApi_Exception('您没有直播权限！', 460);

        $preview_num = DI()->notorm->live_list->where('anchor_id = ?', $this->req['user_id'])
            ->where('status = 1 or status = 4')->count('id');

        if ($preview_num >= 2) {
            throw new PhalApi_Exception('有两条未完成的直播，请到个人主页开播!', 461);
        }

        $now = date('Y-m-d H:i', time());

        $add_arr = GetIpLookup(g_getIP());
        $city = isset($add_arr['city']) ? $add_arr['city'] : '火星';
        $live_info = array(
            'live_name'    => $now,
            'cover_url'    => $user_info['avatar'],
            'anchor_id'    => $this->req['user_id'],
            'preview_time'   => $now,
            'location'    => isset($this->req['location']) ? $this->req['location'] : $city,
        );


        $last_live = DI()->notorm->live_list->select('id')->order('id desc')->fetchOne();
        $this_live_id = $last_live['id'] + 1;

        $options = array(
            'name'        => "mibo" . $this_live_id,
            'description' => $live_info['live_name'],
            'maxusers'    => 5000,
            'owner'       => $user_info['im_id'],
            'members'     => array("mibokf1000"),
        );
        $chatroom_key = "chatroom_" . $this_live_id;
        $chatroom_id = DI()->redis->get_forever($chatroom_key);
        if (empty($chatroom_id)) {

            //创建聊天室
            $emchat = new Emchat_Lite();
            $chatroom_info = $emchat->createChatRoom($options);
            if (empty($chatroom_info) || !isset($chatroom_info['data']['id'])) {
                throw new PhalApi_Exception("创建聊天室失败", 444);
            }

            $chatroom_id = $chatroom_info['data']['id'];
            DI()->redis->set_forever($chatroom_key, $chatroom_id);
        }

        $stream_name = "mb-" . $this_live_id . '-' . $live_info['anchor_id'];
        $filename = '/' . APP_NAME . "/" . $stream_name;

        $auth_key = $this->getAuthkey($filename);
        $flv_authkey = $this->getAuthkey($filename . '.flv');
        $m3u8_authkey = $this->getAuthkey($filename . '.m3u8');

        $update_data = array(
            'id'          => $this_live_id,
            'chatroom_id' => $chatroom_id,
            'push_url'    => "rtmp://video-center.alivecdn.com/" . APP_NAME . "/" . $stream_name . "?vhost=" . LIVE_DOMAIN_HOST . "&auth_key=" . $auth_key,
            'look_url'    => 'rtmp://' . LIVE_DOMAIN_HOST . "/" . APP_NAME . "/" . $stream_name . "?auth_key=" . $auth_key,
            'flv_url'     => 'http://' . LIVE_DOMAIN_HOST . "/" . APP_NAME . "/" . $stream_name . ".flv?auth_key=" . $flv_authkey,
            'm3u8_url'    => 'http://' . LIVE_DOMAIN_HOST . "/" . APP_NAME . "/" . $stream_name . ".m3u8?auth_key=" . $m3u8_authkey,
            'replay_url'  => 'http://miboinput.oss-cn-hangzhou.aliyuncs.com/record' . "/" . APP_NAME . "/" . $stream_name . ".m3u8?auth_key=" . $m3u8_authkey,
            'start_time'  => $now,
            'location'    => '火星',
            'status'      => 2, //直播中状态
        );


        $live_info = $live_info + $update_data;
        $rs = $this->liveModel->insertPreview($live_info);

        if (!$rs) {
            throw new PhalApi_Exception("服务器出错", 445);
        }

        $del_redis_res = DI()->redis->del('get_live_list');

        //$update_data['receive_num'] = $anchor_info['receive_num'];

        //告诉粉丝开直播了
        $this->notifyFansWhenLive($user_info, $live_info);

        return $live_info;

    }

    public function anchorExit() {
        $anchor_info = $this->checkUser();
        $live_info = $this->checkLive();

        if (empty($anchor_info)) {
            throw new PhalApi_Exception_BadRequest("您不是该直播指定的主播", 46);
        }
        if ($anchor_info['anchor_type'] < 1) {
            throw new PhalApi_Exception_BadRequest("您不具有删除直播权限，请联系客服人员", 47);
        }

        $domain_experience = new Domain_Experience();
        $domain_experience->setSeeLiveExperience($anchor_info['id'], $live_info['id']);
        $this->userEntryLog($anchor_info['id'], $live_info['id'], 1, 1);

        $update_data = array(
            'end_time' => date('Y-m-d H:i', time()),
            'status'   => 3,
        );
        $rs = $this->liveModel->updateLiveInfo($live_info['id'], $update_data);
        if ($rs != 1 && $rs != 0) {
            DI()->logger->error("主播退出时更新直播状态失败", 49);
        }
        $emchat = new Emchat_Lite();
        $room_info = $emchat->getChatRoomDetail($live_info['chatroom_id']);
        $live_info['affiliations_count'] = isset($room_info['data'][0]['affiliations_count']) ?
                                            $room_info['data'][0]['affiliations_count'] : 0;
        DI()->redis->set_time('affiliations_count_live_id_'.$live_info['id'], $live_info['affiliations_count']);
        $emchat->deleteChatRoom($live_info['chatroom_id']);
        $chatroom_users_key = "chatroom_" . $live_info['id'] . "_user_list";

        //清空用户列表
        $del_rs1 = DI()->redis->del($chatroom_users_key);
        $del_rs2 = DI()->redis->del('get_live_list');
        $chatroom_key = "chatroom_" . $live_info['id'];
        DI()->redis->del($chatroom_key);

        //清空机器人列表
        $chatroom_robot_user_list_key = "chatroom_" . $live_info['id'] . "_robot_user_list_key";
        $close_redis = DI()->redis->del($chatroom_robot_user_list_key);
        return true;
    }

    public function userEntry() {
        $user_info = $this->checkUser();
        $live_info = $this->checkLive();

        if($live_info['type'] == 1) {
            $domain_no_anchor_live = new Domain_NoAnchorLive();
            $no_anchor_live_info =  $domain_no_anchor_live->getConfig($live_info['id']);
            $live_info['background_img'] = isset($no_anchor_live_info['background_img'])
                                            ? $no_anchor_live_info['background_imd'] : '';
        }

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
            'vip_level' => $user_info['vip_level'],
            'send_num'  => 0,
        );

        //一、用户进入记录
        $this->userEntryLog($user_info['id'], $live_info['id'], 0, 0);

        //二、用户信息加入直播间所有用户信息集合缓存中
        if (empty($chatroom_user_list)) {
            DI()->redis->set_forever($chatroom_users_key, json_encode(array($user_info['id'] => $user_arr)));
            $user_list = array($user_arr);
        } else {

            $redis_user_list = json_decode($chatroom_user_list, true);
            if (!array_key_exists($user_info['id'], $redis_user_list)) {
                $user_arr['send_num'] = $this->getLiveSendNum($live_info['id'], $user_info['id']);
                $redis_user_list = $this->getLiveUserList($redis_user_list, $user_arr);
                DI()->redis->set_forever($chatroom_users_key, json_encode($redis_user_list));
            }
            $user_list = $redis_user_list;
        }

        //三、根据发牌时间和当前时间，把进入直播间的通用数据存储一定时间长的缓存
        $get_live_info_userentry = DI()->redis->get_time('get_live_info_userentry_' . $this->req['live_id']);
        //这个接口中isset($this->req['os']) 是用来给iOS崩溃的
        if (!empty($get_live_info_userentry) && isset($this->req['os'])) {
            $final_data = json_decode($get_live_info_userentry, true);

            //a,b都是动态数据
            //a,用户是否关注主播
            $is_followed = DI()->notorm->follow_list->where('user_id = ?', $this->req['user_id'])
                ->where('to_user_id = ?', $live_info['anchor_id'])->where('is_cancel = 0')->fetchOne('id');
            if (!empty($is_followed)) {
                $final_data['anchor_info']['is_followed'] = true;
            } else {
                $final_data['anchor_info']['is_followed'] = false;
            }

            //b,最后的牌值
            $last_loop_card_info = $this->getLastCardInfo($this->req['live_id']);
            $final_data['last_card_info'] = $last_loop_card_info;

            $total_people = count($user_list);
            if ($total_people > 50) {
                $user_list = array_slice($user_list, 0, 50);
            }
            $user_list = array_values($user_list);
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

            $anchor_info = $this->userDomain->setSimpleUserInfoBean($this->userDomain->getUsersInfoById($live_info['anchor_id']));

            //六、用户是否关注主播
            $is_followed = DI()->notorm->follow_list->where('user_id = ?', $this->req['user_id'])
                ->where('to_user_id = ?', $live_info['anchor_id'])->where('is_cancel = 0')->fetchOne('id');
            if (!empty($is_followed)) {
                $anchor_info['is_followed'] = true;
            } else {
                $anchor_info['is_followed'] = false;
            }


            //七、取得庄家信息
            $domain_game = new Domain_Game();
            $dealer_info = $domain_game->getDealerByLiveId($live_info['id']);

            //七（1）要是取不到新的庄家信息，就使用主播信息
            if (empty($dealer_info)) {
                $dealer_info = $anchor_info;
            }

            //八、最后一局牌值,如果
            $last_loop_card_info = $this->getLastCardInfo($this->req['live_id']);
            if(!isset($this->req['os'])) {
                $last_loop_card_info['start_server_time'] = 0;
                $last_loop_card_info['current_server_time'] = 0;
            }
            //九、直播间的小活动
            $model_activity = new Model_Activity();
            $activity_info = $model_activity->getList();

            //十、最终返回给客户端的数据
            $final_data = array(
                'anchor_info'    => $anchor_info,
                'dealer_info'    => $dealer_info,
                'user_list'      => $user_list,
                'notice_info'    => $msgBody,
                'live_info'      => $this->setLiveBean($live_info),
                'last_card_info' => $last_loop_card_info,
                'activity_info'  => $activity_info,
                'timer'          => rand(500, 1000),
            );


            DI()->redis->set_time('get_live_info_userentry_' . $this->req['live_id'],
                json_encode($final_data), 300);

            return $final_data;
        }


    }

    //在直播间送了多少
    public function getLiveSendNum($live_id, $user_id) {
        $send_num_list = DI()->redis->get_time('send_num_list_live_id_'.$live_id);
        if(empty($send_num_list)) {
            $send_num_list = DI()->notorm->user_deal_log->select('user_id,sum(deal_num) as send_num')->where('deal_type=1')->
            where('mid=103')->where('value', $live_id)->group('user_id')->order('sum(deal_num) desc')->fetchPairs('user_id');
            DI()->redis->set_time('send_num_list_live_id_'.$live_id, $send_num_list);
        };

        $send_num = isset($send_num_list[$user_id]) ? $send_num_list[$user_id]['send_num'] : 0;
        return $send_num;
    }

    public function getLiveUserList($pre_user_list, $user) {

        //一、直播间的头像排序，前面10个用户送得最多排在前面，再根据vip等级
        //二、原理：使用array_slice截取，再拼接
        $ten_user = array_slice($pre_user_list, 0, 10, true);
        $i = 0;

        foreach($ten_user as $per_user) {
            if($per_user['send_num'] <= 0) {
                if($user['vip_level'] >= $per_user['vip_level']) break;
            } else {
                $per_user['send_num'] = isset($per_user['send_num']) ? $per_user['send_num'] : 0;
                if($user['send_num'] >= $per_user['send_num']) break;
            }
            $i++;
        }

        $user_before = array_slice($pre_user_list, 0, $i, true);

        $user_before[$user['id']] = $user;
        $pre_num = count($pre_user_list);
        $user_after = array_slice($pre_user_list, $i, $pre_num - $i, true);

        $new_user_list = $user_before + $user_after;

        return $new_user_list;
    }

    public function getLastCardInfo($live_id) {
        $game_model = new Model_Game();
        $live_game = $game_model->getLiveGame($live_id);
        if(isset($live_game['gid'])) {
            $gid = $live_game['gid'];
            $last_loop_card_info = $game_model->getLastLoopCards($live_id, $gid);
            $last_loop_card_info['gid'] = (string)$gid;
            $last_loop_card_info['dealer_card'] = json_decode($last_loop_card_info['dealer_card'], true);
            $last_loop_card_info['pool1_card'] = json_decode($last_loop_card_info['pool1_card'], true);
            $last_loop_card_info['pool2_card'] = json_decode($last_loop_card_info['pool2_card'], true);
            $last_loop_card_info['pool3_card'] = json_decode($last_loop_card_info['pool3_card'], true);
            $last_loop_card_info['current_server_time'] = round(microtime(true) * 1000) . '';
            return $last_loop_card_info;
        } else {
            return NULL;
        }

    }

    public function userExit() {
        $live_info = $this->checkLive();
        $user_info = $this->checkUser();

        $domain_experience = new Domain_Experience();
        $domain_experience->setSeeLiveExperience($user_info['id'], $live_info['id']);
        $this->userEntryLog($user_info['id'], $live_info['id'], 1, 0);

        $chatroom_users_key = "chatroom_" . $live_info['id'] . "_user_list";
        $chatroom_user_list = DI()->redis->get_forever($chatroom_users_key);

        if (empty($chatroom_user_list)) {
            return true;
        } else {
            $redis_user_list = json_decode($chatroom_user_list, true);
            if (array_key_exists($user_info['id'], $redis_user_list)) {
                unset($redis_user_list[$user_info['id']]);
                DI()->redis->set_forever($chatroom_users_key, json_encode($redis_user_list));
            }
            sort($redis_user_list);
            return true;
        }
    }

    public function getGiftList() {

        $gift_model = new Model_Gift();
        $gift_list = $gift_model->getGiftList();
        if (empty($gift_list)) {
            return false;
        }

        return $gift_list;
    }

    public function buyLiveTicket() {
        $user_info = $this->checkUser();
        $live_info = $this->checkLive();


        if ($user_info['diamond_num'] < $this->req['price']) {
            DI()->logger->error("余额不足，无法交易", $this->req);
            throw new PhalApi_Exception('余额不足,无法交易', 540);
        }

        //免费的
        if ($this->req['price'] == 0) {
            $is_pay_success = true;
        } else {
            $is_pay_success = $this->userDomain->updateUserDiamondNumReduce($user_info['id'], $this->req['price'], false);
        }


        if (!$is_pay_success) {
            DI()->logger->error("用户门票购买失败", $this->req);
            throw new PhalApi_Exception_BadRequest("用户门票购买失败", 51);
        } else {
            $rs = $this->userDomain->updateAnchorDiamondNumPlus($live_info['anchor_id'], $this->req['price']);
            $rs = $this->req['price'] == 0 ? true : $rs;    //若是邀请码就不用
            if (!$rs) {
                DI()->logger->error("主播收到门票失败", $this->req);
                throw new PhalApi_Exception_BadRequest("主播收到门票失败", 52);
            } else {
                //更新直播间门票
                $update_live_data = array(
                    'ticket_sale' => new NotORM_Literal('ticket_sale + 1'),
                );
                $model_live = new Model_LiveList();
                $model_live->updateLiveInfo($this->req['live_id'], $update_live_data);

                $im_id_redis_key = 'live_' . $this->req['live_id'] . '_ticket_imid';
                DI()->redis->set_rPush($im_id_redis_key, $user_info['im_id']);

                $user_id_redis_key = 'live_' . $this->req['live_id'] . '_ticket_userid';
                DI()->redis->set_rPush($user_id_redis_key, $user_info['id']);

                //把交易写进日志
                $deal_log_data = array(
                    'user_id'     => $user_info['id'],
                    'to_user_id'  => $live_info['anchor_id'],
                    'mid'         => MOUDEL_LIVE_TICKET,
                    'value'       => $live_info['id'],
                    'deal_type'   => DEAL_TYPE_DIAMOND,
                    'deal_num'    => $this->req['price'],
                    'deal_before' => $user_info['diamond_num'],
                    'deal_after'  => $user_info['diamond_num'] - $this->req['price'],
                );
                $deal_log_model = new Model_UserDealLog();
                $insert_id = $deal_log_model->insertDealLog($deal_log_data);
                if ($insert_id > 0) {
                    return true;
                }
            }
        }

        throw new PhalApi_Exception("门票购买失败", 449);
    }

    public function sendBarrage() {

        $user_info = $this->checkUser();
        $live_info = $this->checkLive();

        if($user_info['vip_level'] >= 2) return true;

        if ($user_info['diamond_num'] < $this->req['price']) {
            throw new PhalApi_Exception('余额不足，无法交易', 450);
        }

        if ($this->req['price'] == 0) {
            return false;
        }

        $rs = $this->userDomain->updateUserDiamondNumReduce($user_info['id'], $this->req['price'], false);
        if (!$rs) {
            DI()->logger->error("用户发送弹幕失败", $this->req);
            throw new PhalApi_Exception_BadRequest("用户发送弹幕失败", 53);
        } else {

            $this->userDomain->setSendGiftExperience($user_info['id'], $live_info['id'], '', $this->req['price'] * 1, MOUDEL_LIVE_BARRAGE);
            $deal_log_data = array(
                'user_id'     => $user_info['id'],
                'mid'         => MOUDEL_LIVE_BARRAGE,
                'value'       => $live_info['id'],
                'deal_type'   => 1,
                'deal_num'    => $this->req['price'],
                'deal_before' => $user_info['diamond_num'],
                'deal_after'  => $user_info['diamond_num'] - $this->req['price'],
            );
            $deal_log_model = new Model_UserDealLog();
            $insert_id = $deal_log_model->insertDealLog($deal_log_data);
            if ($insert_id > 0) {
                return true;
            }
        }

        throw new PhalApi_Exception("发送弹幕失败", 449);
    }

//    public function sendGift() {
//        $user_info = $this->checkUser();
//        $live_info = $this->checkLive();
//
//        $gift_model = new Model_Gift();
//        $gift_info = $gift_model->getGiftInfoById($this->req['gift_id']);
//        $total_fee = $this->req['gift_num'] * $gift_info['price'];
//
//        if ($user_info['diamond_num'] < $total_fee) {
//            throw new PhalApi_Exception('余额不足，无法交易', 450);
//        }
//
//        //免费礼物
////        if ($gift_info['price'] == 0) {
////            return true;
////        }
//
//        $rs = $this->userDomain->updateUserDiamondNumReduce($user_info['id'], $total_fee, true);
//        if (!$rs) {
//            DI()->logger->error("用户赠送礼物失败", $this->req);
//            throw new PhalApi_Exception_BadRequest("用户赠送礼物失败", 54);
//        }
//
//        $this->userDomain->setSendGiftExperience($user_info['id'], $live_info['id'], $this->req['gift_id'], $total_fee * 1);
//
//        $anchor_info = $this->userDomain->getUsersInfoById($live_info['anchor_id']);
//        //$anchor_info = $this->userDomain->getUsersInfoById($live_info['id']);
//        $rs = $this->userDomain->updateAnchorDiamondNumPlus($anchor_info['id'], $total_fee);
//        if (!$rs) {
//            DI()->logger->error("用户赠送礼物失败", $this->req);
//            throw new PhalApi_Exception_BadRequest("主播收到礼物失败", 55);
//        }
//
//        $deal_log_data = array(
//            'user_id'     => $user_info['id'],
//            'to_user_id'  => $live_info['anchor_id'],
//            'mid'         => MOUDEL_LIVE_GIFT,
//            'value'       => $live_info['id'],
//            'extra'       => $this->req['gift_id'],
//            'deal_type'   => DEAL_TYPE_DIAMOND,
//            'deal_num'    => $total_fee,
//            'deal_before' => $user_info['diamond_num'],
//            'deal_after'  => $user_info['diamond_num'] - $total_fee,
//        );
//
//        $deal_log_model = new Model_UserDealLog();
//        $insert_id = $deal_log_model->insertDealLog($deal_log_data);
//        if ($insert_id > 0) {
//            return true;
//        }
//
//        throw new PhalApi_Exception("发送礼物失败", 449);
//    }

    public function sendGift() {
        $gift_model = new Model_Gift();
        $gift_info = $gift_model->getGiftInfoById($this->req['gift_id']);

        if ($gift_info['type'] == 1) {
            return $this->sendDiamondGift($gift_info);
        } else {
            return $this->sendCoinGift($gift_info);
        }

    }

    public function sendDiamondGift($gift_info) {
        $user_info = $this->checkUser();
        $live_info = $this->checkLive();

        $total_fee = $this->req['gift_num'] * $gift_info['price'];

        if ($user_info['diamond_num'] < $total_fee) {
            throw new PhalApi_Exception('余额不足，无法交易', 450);
        }

        $rs = $this->userDomain->updateUserDiamondNumReduce($user_info['id'], $total_fee, true);
        if (!$rs) {
            DI()->logger->error("用户赠送礼物失败", $this->req);
            throw new PhalApi_Exception_BadRequest("用户赠送礼物失败", 54);
        }

        $this->userDomain->setSendGiftExperience($user_info['id'], $live_info['id'], $this->req['gift_id'], $total_fee * 1);

        $anchor_info = $this->userDomain->getUsersInfoById($live_info['anchor_id']);

        //如果不是内部人员，则增加用户表中收到的钻石
        //if(!$this->isInternalStaff($user_info['mb_id'])) {
            $rs = $this->userDomain->updateAnchorDiamondNumPlus($anchor_info['id'], $total_fee);
            if (!$rs) {
                throw new PhalApi_Exception_BadRequest("主播收到礼物失败", 55);
            }
        //}

        $deal_log_data = array(
            'user_id'     => $user_info['id'],
            'to_user_id'  => $live_info['anchor_id'],
            'mid'         => MOUDEL_LIVE_GIFT,
            'value'       => $live_info['id'],
            'extra'       => $this->req['gift_id'],
            'deal_type'   => DEAL_TYPE_DIAMOND,
            'deal_num'    => $total_fee,
            'deal_before' => $user_info['diamond_num'],
            'deal_after'  => $user_info['diamond_num'] - $total_fee,
        );

        //内部员或送出米钻小于系统赠送的数量时，即如果用户没有充值，主播收到无效
        if($this->isInternalStaff($user_info['mb_id'])) {
            $deal_log_data['status'] = 0;
        }

        $deal_log_model = new Model_UserDealLog();
        $insert_id = $deal_log_model->insertDealLog($deal_log_data);
        if ($insert_id > 0) {
            if($gift_info['price'] > 1000 || $this->req['gift_num'] > 98) {
                DI()->redis->set_lPush('send_all_room',
                '【'.$user_info['nick_name'].'】土豪送给主播【'.$anchor_info['nick_name'].'】'.$this->req['gift_num'].'个'.$gift_info['name']);
            }
            return $gift_info;
        }

        throw new PhalApi_Exception("发送礼物失败", 449);
    }

    public function isInternalStaff($mb_id) {
        $model_staff  = new Model_InternalStaff();
        return $model_staff->isInternalStaff($mb_id);
    }

    public function sendCoinGift($gift_info) {
        $user_info = $this->checkUser();
        $live_info = $this->checkLive();

        $total_fee = $this->req['gift_num'] * $gift_info['price'];

        if ($user_info['coin_num'] < $total_fee) {
            throw new PhalApi_Exception('余额不足，无法交易', 450);
        }

        $rs = $this->userDomain->updateUserDiamondNumReduce($user_info['id'], 0, true, $total_fee);
        if (!$rs) {
            DI()->logger->error("用户赠送礼物失败", $this->req);
            throw new PhalApi_Exception_BadRequest("用户赠送礼物失败", 54);
        }

        //$this->userDomain->setSendGiftExperience($user_info['id'], $live_info['id'], $this->req['gift_id'], $total_fee * 1);

        $anchor_info = $this->userDomain->getUsersInfoById($live_info['anchor_id']);
        //$rs = $this->userDomain->updateAnchorDiamondNumPlus($anchor_info['id'], $total_fee);
        $model_user = new Model_User();
        $rs = $model_user->updateUserDiamondCoin($anchor_info['id'], 0, $total_fee);
        if (!$rs) {
            DI()->logger->error("用户赠送礼物失败", $this->req);
            throw new PhalApi_Exception_BadRequest("主播收到礼物失败", 55);
        }

        $deal_log_data = array(
            'user_id'     => $user_info['id'],
            'to_user_id'  => $live_info['anchor_id'],
            'mid'         => MOUDEL_LIVE_GIFT,
            'value'       => $live_info['id'],
            'extra'       => $this->req['gift_id'],
            'deal_type'   => DEAL_TYPE_COIN,
            'deal_num'    => $total_fee,
            'deal_before' => $user_info['coin_num'],
            'deal_after'  => $user_info['coin_num'] - $total_fee,
        );

        $deal_log_model = new Model_UserDealLog();
        $insert_id = $deal_log_model->insertDealLog($deal_log_data);
        if ($insert_id > 0) {
            return $gift_info;
        }

        throw new PhalApi_Exception("发送礼物失败", 449);
    }

    public function guardList() {

        $live_info = $this->checkLive();

        $user_deal_model = new Model_UserDealLog();
        $guard_list = $user_deal_model->getGuardListByAnchorId($live_info['anchor_id']);
        $user_ids = '';
        foreach ($guard_list as $itm) {
            $user_ids .= $itm['user_id'] . ",";
        }
        $user_ids = rtrim($user_ids, ",");

        $user_list = $this->userDomain->getUsersInfoByIds($user_ids);
        $rank = 1;
        $rs = array();
        foreach ($guard_list as $itm) {
            $ranking = array();
            $ranking['send_diamond'] = $itm['deal_num'];
            $ranking['rank'] = strval($rank);
            $ranking['user_info'] = $user_list[$itm['user_id']];
            $rank++;
            $rs[] = $ranking;
            unset($ranking);
        }

        return $rs;
    }

    public function liveEnd() {
        $info = DI()->redis->get_time('live_end_info' . $this->req['live_id']);
        if (!empty($info)) {
            return json_decode($info, true);
        } else {

            $receipt_diamond = DI()->notorm->user_deal_log->where('mid = 103 and deal_type = 1')
                ->where('to_user_id = ?', $this->req['user_id'])
                ->where('value = ?', $this->req['live_id'])->sum('deal_num');
            $receipt_diamond = !empty($receipt_diamond) ? $receipt_diamond : '0';

            //$redis_im_rooms_data = DI()->redis->get_forever('im_rooms_data');
            $see_num = DI()->redis->get_time('affiliations_count_live_id_'.$this->req['live_id']);
            //if (!empty($redis_im_rooms_data)) {
            //    $rooms_data = json_decode($redis_im_rooms_data, true);
            //    if (is_array($rooms_data)) {
            //        //用环信id作为键
            //        $new_rooms_data = array_reduce($rooms_data, function (&$new_rooms_data, $v) {
            //            $new_rooms_data[$v['id']] = $v;
            //            return $new_rooms_data;
            //        });
            //    }
            //}
            $see_num = $see_num ? (string)$see_num : '0';


            $info = array('receipt_diamond' => $receipt_diamond, 'see_num' => $see_num);

            //缓存给直播间的其他用户查看结束信息
            DI()->redis->set_time('live_end_info' . $this->req['live_id'], json_encode($info), 10);

            return $info;
        }

    }

    //发布预告
    public function setLivePreview() {
        $start_time_int = strtotime($this->req['start_time']);
        $seven_day_time = strtotime('7 day');
        if ($start_time_int < time() || $start_time_int > $seven_day_time) {
            throw new PhalApi_Exception('预计开播时间需大于当前时间，小于七天', 355);
        }
        $user_info = $this->checkUser();

        $preview_num = DI()->notorm->live_list->where('anchor_id = ?', $this->req['user_id'])
            ->where('status = 1 or status = 4')->count('id');

        if ($preview_num >= 2) {
            throw new PhalApi_Exception('已经发了两条预告了，不能再发了', 356);
        }

        $invite_code = substr(str_shuffle('1234567890'), 0, 4);
        $data = array(
            'live_name'    => $this->req['live_name'],
            'cover_url'    => $this->req['cover_url'],
            'anchor_id'    => $this->req['user_id'],
            'status'       => 1,
            'preview_time'   => isset($this->req['start_time']) ? $this->req['start_time'] : '',
            'start_time'   => isset($this->req['start_time']) ? $this->req['start_time'] : '',
            'time_length'  => isset($this->req['time_length']) ? $this->req['time_length'] : '',
            'ticket_price' => 0,//$this->req['ticket_price'],
            'invite_code'  => $invite_code,
        );
        $live_id = $this->liveModel->insertPreview($data);

        $five_min_before = $start_time_int - 60 * 5;
        $expire_time = $start_time_int - time();
        DI()->redis->set_time('preview_userid_' . $this->req['user_id'] . '_starttime_' . $start_time_int, $five_min_before, $expire_time);

        if ($live_id) {
            $data['id'] = $live_id;
            return array_merge($user_info, $data);
        }
    }

    //1 是引导充值， 2是礼物,  3vip礼包，4，土豪礼包
    //1、当用户无米钻时引导充值，慷慨解囊,VIP 礼包
    //2、当用户米钻小于20米钻时，引导送小礼物，忠实粉丝
    //3、当用户米钻大于20米钻时，引导送大礼物，示爱
    //4、当用户送礼物时，剩余米钻小于10米钻时引导充值土豪大礼
    public function pop() {
        $model_user = new Model_User();
        $user_info = $model_user->getUsersInfoById($this->req['user_id']);
        $live_info = $this->checkLive();

        $data = array( 'type'  => 0,  'value' => null);

        //不是VIP 先成为VIP
        if($this->req['version_code'] >= 23 && $user_info['vip_level'] == 0) {
            $key = "live_pop_vip_user_list_";
            $user_list_string = DI()->redis->get_time($key.$live_info['id']);
            if(!empty($user_list_string)) {
                $user_list = json_decode($user_list_string, true);
                if (in_array($user_info['id'],$user_list)) {
                    $key_index = array_search($user_info['id'], $user_list);
                    if ($key !== false) {
                        array_splice($user_list, $key_index, 1);
                    }
                    DI()->redis->set_time($key.$live_info['id'], json_encode($user_list), 5*3600);
                    $data['type'] = 0;
                    return $data;
                } else {
                    array_push($user_list, $user_info['id']);
                    DI()->redis->set_time($key.$live_info['id'], json_encode($user_list), 5*3600);
                }
            } else {
                DI()->redis->set_time($key.$live_info['id'], json_encode(array($user_info['id'])), 5*3600);
            }

            $data['type'] = 3;
            return $data;
        }

        //VIP用户
        $diamond_num = $user_info['diamond_num'];
        $deal_rows = DI()->notorm->user_deal_log
            ->where("user_id",$this->req['user_id'])
            ->where("to_user_id", $live_info['anchor_id'])
            ->where("mid", 103)
            ->where("value", $this->req['live_id'])
            ->where("deal_type", 1)
            ->where("deal_num >= 20")
            ->limit(1)
            ->fetch();


        $deal_items = count($deal_rows);

        //送过就不送了
        if ($deal_rows) {
            $data['type'] = 0;
            return $data;
        }
        //米钻为0
        if ($diamond_num <= 0) {
            $data['type'] = 4;
            return $data;
         //米钻<20
        } elseif ($diamond_num <= 20) {
            $data['type'] = 2;
            //0<米钻数量<=20米钻
            $gift_info = DI()->notorm->gift->where('price <= ?', 20)->where('is_show = 1')->order('rand()')->fetchOne();
            $data['value'] = $gift_info;
            return $data;
        //米钻>20
        } else {
            $data['type'] = 2;
            $gift_info = DI()->notorm->gift
                ->where('is_show = 1')
                ->where('price >= 20')
                ->where('price <= ?', ceil($diamond_num*0.5))
                ->order('rand()')
                ->limit(1)
                ->fetchOne();

            if(empty($gift_info)) {
                $gift_info = DI()->notorm->gift->where('id', 32)->fetchOne();
            }
            $data['value'] = $gift_info;
            return $data;
        }

    }

}