<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/8/16
 * Time: 18:35
 */
class Domain_Crond {

    private $req;

    public function __construct() {
        $this->req = DI()->request->getAll();
    }

    /**
     * 机器人定时器
     * @desc 随机时间加入机器人
     */
    public function robot() {
        //随机加入机器人
        $rand_int = rand(1, 10);
        if ($rand_int != 1 && $rand_int != 10) {
            return true;
        }

        $live_domain = new Domain_Live();
        $live_list = $live_domain->liveModel->getLiveInList();
        if (empty($live_list)) {
            DI()->logger->info("当前没有在直播的视频", $this->req);
            throw new PhalApi_Exception_BadRequest('当前没有在直播的视频', 12);
        }

        $user_model = new Model_User();
        $emchat = new Emchat_Lite();

        $robot_user_list = array();
        $im = new Domain_IM();
        $follow_model = new Model_FollowList();

        $gameModel = new Model_Game();

        foreach ($live_list as $live) {

            //一、判断聊天室情况
            $chatroom_detail = $emchat->getChatRoomDetail($live['chatroom_id']);
            if (isset($chatroom_detail['data'][0]['affiliations_count']) && $chatroom_detail['data'][0]['affiliations_count'] > 0) {
                DI()->logger->info("聊天室人数:" . $chatroom_detail['data'][0]['affiliations_count']);
                if ($chatroom_detail['data'][0]['affiliations_count'] >= 500) {
                    DI()->logger->info("聊天室人数大于500人");
                    continue;
                }
            } else {
                DI()->logger->info("直播间".$live['id']."聊天室".$live['chatroom_id']."不存在");
                continue;
            }

            //二、从Redis中拿出之前添加过的用户Ids,并再次从数据库随机拿出新的一个机器人
            $chatroom_robot_user_list_key = "chatroom_" . $live['id'] . "_robot_user_list_key";
            $robot_users = DI()->redis->get_forever($chatroom_robot_user_list_key);
            $robot_user_info = $user_model->getRobotUserInfoExcludeUserIds($robot_users);

            if (empty($robot_user_info)) {
                DI()->logger->info("没有获取到机器人,机器人不够啦");
                continue;
            }

            //三、模拟真实用户请求进入接口
            $user_entry_url = "http://mibo.yahalei.com/mibo/index.php?service=Live.userEntry&channel=bt&user_id=" . $robot_user_info['id'] . "&live_id=" . $live['id'];
            $rs = json_decode(file_get_contents($user_entry_url), true);
            if (isset($rs['ret']) && ($rs['ret'] == 200 || $rs['ret'] == '200')) {
                DI()->redis->set_forever($chatroom_robot_user_list_key, empty($robot_users) ? $robot_user_info['id'] : $robot_users . "," . $robot_user_info['id']);
            }

            //官方追债系统
//            if(rand(0,100) < 5) {
//                DI()->logger->info(">>>>>>>>>>>>>>>调逗信息");
//                $is_send_tease_key = "is_send_tease_" . $live['id'];
//                if(DI()->redis->get_time($is_send_tease_key) != 1) {
//                    $anchor_info = $user_model->getUsersInfoById($live['anchor_id']);
//                    if ($anchor_info['coin_num'] < 0 && $live['type'] != 1) {
//                        $im->sendLiveMsg(1, $live['chatroom_id'], "@" . $anchor_info['nick_name'] . " 官方追债系统已启动，您所欠官方的" . $anchor_info['coin_num'] * (-1) . "米币何时偿还？群众的眼镜是雪亮的！", IM_SYS_NOTICE);
//                        DI()->redis->set_time($is_send_tease_key, 1, 2000);
//                    }
//                }
//            }

            //针对排名前几名处理
            $winRand = rand(0,100);
            if($winRand < 50) {

                $redis_card = DI()->redis->get_time('card_info_of_live_' . $this->req['live_id']);
                if (!empty($redis_card)) {
                    $redis_card = json_decode($redis_card, true);
                }

                if(isset($redis_card) && !empty($redis_card)) {

                    //$card_info = $loop_card_info = DI()->notorm->game_loop_card_log->where('anchor_id', $live['anchor_id'])->where('live_id', $live['id'])->order("id desc")->limit(1)->fetchOne();
                    $diff_time = time() - strtotime($redis_card['start_server_time']);
                    if($diff_time <= 30) {
                        $live_msg = "";
                        if ($winRand % 2 == 0) {
                            //开心榜
                            $win_list = $gameModel->getUserWinInLiveList($live['id']);
                            $msg_str = " 亲爱的米粉，在玩的开心的同时，如果觉得主播表现不错的，别忘记给主播送送礼物哦！";
                            if(count($win_list) >=3) {
                                $live_msg = "@".$win_list[0]." @".$win_list[1]." @".$win_list[2] ."...". $msg_str;
                            } else {
                                $live_msg = "@".explode("@", $win_list) . $msg_str;
                            }
                        } else {
                            //伤心榜 输给主播
                            $lose_list = $gameModel->getUserLoseInLiveList($live['id']);
                            $msg_str = " 亲爱的米粉，运气不好输了不开心，可以给主播送送礼物，事实证明送礼物是可以转运的哦！";
                            if(count($lose_list) >=3) {
                                $live_msg = "@".$lose_list[0]." @".$lose_list[1]." @".$lose_list[2] ."...". $msg_str;
                            } else {
                                $live_msg = "@".explode("@", $lose_list) . $msg_str;
                            }
                        }
                        $im->sendLiveMsg(1, $live['chatroom_id'], $live_msg, IM_SYS_NOTICE);
                    }
                }
            }


            //加入聊天室
            $emchat_rs = $emchat->addChatRoomMember($live['chatroom_id'], $robot_user_info['im_id']);
            if (isset($emchat_rs['data']['result']) && $emchat_rs['data']['result']) {
                //发送用户进来了消息到聊天室

                $msg_rs = $im->sendLiveMsg($robot_user_info['id'], $live['chatroom_id'], '「' . $robot_user_info['nick_name'] . "」加入了直播间", 100);
                if ($msg_rs) {
                    $robot_user_info['live_id'] = $live['id'];
                    $robot_user_list[] = $robot_user_info;
                    DI()->logger->info("加入聊天室成功", $robot_user_info);
                }
            }


            //发送关注消息
            if ($live['type'] != 1 && rand(1, 100) <= 40) {
                $chatroom_users_key = "chatroom_" . $live['id'] . "_user_list";
                $chatroom_user_list = DI()->redis->get_forever($chatroom_users_key);
                if (!empty($chatroom_user_list)) {
                    $redis_user_list = json_decode($chatroom_user_list, true);
                    $roboot_user_list = array();
                    foreach ($redis_user_list as $user) {
                        if ($user['user_type'] == USER_ROBOT) {
                            $roboot_user_list[] = $user;
                        }
                    }
                    $index = rand(0, count($roboot_user_list) - 1);
                    if (rand(1, 100) <= 0) {// dallon 暂时关闭掉
                        $index2 = rand(0, count($roboot_user_list) - 1);
                        $msg = array(
                            "魅力",
                            "恭喜发财。。。",
                            "美女讲个笑话呗",
                            "支持一下",
                            "我喜欢默默地看着你",
                            "妹子，你好漂亮！",
                            "妹子你哪里人呀？",
                            "爱死你了",
                            "主播你的样子好逗",
                            "给唱首歌呗！",
                            "来看你啦！",
                            "这游戏好玩！",
                            //"主播发下QQ号呗！",
                            //"主播发下微信号呗！",
                            "这主播要火",
                            "主播有男朋友吗",
                            "你好呀",
                            "我能送内衣吗？",
                            "我能送春药吗？",
                            "我能送春药吗？",
                            "喜欢你这样的",
                            "醉了",
                            "主播你多大了？",
                            "美女来一段",
                            "不错哦",
                            "好玩",
                            "妹妹几岁啦？",
                            "姐姐几岁啦？",
                            "主播零零后吧",
                            "带我飞",
                            "漂亮",
                            "这个主播漂亮",
                            "新年快乐",
                            "嗨起来",
                            //"我有酒，你有故事吗？",
                            "主播有个性",
                            "为啥总是输",
                            //"美女下次什么时候播？",
                            "这尼玛边看美女边打牌。。。",
                            "想听你唱歌",
                            "被你深深吸引了",
                            "我要把你赢光",
                            "主播你要输惨啦",
                            "主播单身吗",
                            "这游戏不错",
                            "主播可以加你微信吗",
                            "主播笑起来真好看",
                            //"跟我一个同学好像啊",
                            //"主播粉丝好多哟",
                            "么么哒",
                            "很实诚的妹子",
                            "主播输我点米币吧，让我上庄呀",
                            "这游戏好玩",
                            "美女是97的吗？",
                            //"我来啦",
                            "主播美美哒",
                            //"这个平台的主播颜值一绝啊",
                            "输了这么多，要吃土了",
                            "好玩",
                            "主播带我下注",
                            "主播差点比我帅",
                            "嗨，美女",
                            "玩得停不下来",
                            "这是炸金花吗？",
                            //"最喜欢的直播平台了",
                            "主播用的啥手机",
                            "来点新鲜点的呗",
                            "来点刺激的呗",
                            "",

                        );

                        $msg_list_key = "msg_list_key_".$live['id'];
                        $msg_list = array();
                        $msg_list_str = DI()->redis->get_time($msg_list_key);
                        if (!empty($msg_list_str)) {
                            $msg_list = json_decode($msg_list_str, true);
                        }

                        $randMsgIndex = rand(0, count($msg));
                        $count = 0;
                        while (in_array($randMsgIndex, $msg_list)) {
                            $count ++;
                            if($count <= 10) {
                                $randMsgIndex = rand(0, count($msg));
                            } else {
                                break;
                            }
                        }

                        if(!in_array($randMsgIndex, $msg_list)) {
                            $msg_list[] = $randMsgIndex;
                            DI()->redis->set_time($msg_list_key, json_encode($msg_list), 2*3600);
                        }

                        $im->sendLiveMsg($roboot_user_list[$index2]['id'], $live['chatroom_id'], $msg[$randMsgIndex], $index%2 == 0? IM_CHATROOM_CHAT : IM_BARRAGE);
                    }


                    $follow_info = $follow_model->getUserFollow($roboot_user_list[$index]['id'], $live['anchor_id']);
                    if (empty($follow_info) && rand(0, 100) < 8) {

                        $follow_model->addFollowItem($roboot_user_list[$index]['id'], $live['anchor_id']);
                        $im->sendLiveMsg($roboot_user_list[$index]['id'], $live['chatroom_id'], '「' . $roboot_user_list[$index]['nick_name'] . "」", IM_FOLLOW_IN_ROOM);
                    }
                }

            }

            //机器人说话
            if ($live['type'] != 1 && rand(1, 100) <= 10) {
                $chatroom_users_key = "chatroom_" . $live['id'] . "_user_list";
                $chatroom_user_list = DI()->redis->get_forever($chatroom_users_key);
                if (!empty($chatroom_user_list)) {
                    $redis_user_list = json_decode($chatroom_user_list, true);
                    $roboot_user_list = array();
                    foreach ($redis_user_list as $user) {
                        if ($user['user_type'] == USER_ROBOT) {
                            $roboot_user_list[] = $user;
                        }
                    }
                    $index = rand(0, count($roboot_user_list) - 1);
                    $follow_info = $follow_model->getUserFollow($roboot_user_list[$index]['id'], $live['anchor_id']);
                    if (empty($follow_info)) {
                        $im->sendLiveMsg($roboot_user_list[$index]['id'], $live['chatroom_id'], '「' . $roboot_user_list[$index]['nick_name'] . "」", IM_FOLLOW_IN_ROOM);
                    }
                }

            }

        }

        return $robot_user_list;
    }

    /**
     * 机器人退出，主要是无主播场，先定一个小于当前人数的随机数量，然后把这个数量减到0，再重复这个步骤
     */
    public function robotExit() {
        //随机退出机器人
        $rand_int = rand(1, 10);
        if ($rand_int != 1 && $rand_int != 5 && $rand_int != 10) {
            return true;
        }

        //一、取无人场正在播放的直播
        //$live_lists = DI()->notorm->live_list->where('status = 2 and type = 1')->fetchAll();
        $model_live = new Model_LiveList();
        $live_lists = $model_live->getGameList(1, 30);
        foreach ($live_lists as $live_info) {

            $redis_robots_exit_num = 'live_' . $live_info['id'] . '_robots_exit_num';

            $exit_num = DI()->redis->get_time($redis_robots_exit_num);

            if (isset($exit_num) && $exit_num > 0) {
                $chatroom_robot_user_list_key = "chatroom_" . $live_info['id'] . "_robot_user_list_key";

                $robot_ids_str = DI()->redis->get_forever($chatroom_robot_user_list_key);
                $robot_ids_arr = explode(',', $robot_ids_str);
                if (!empty($robot_ids_arr)) {
                    $robot_id = array_pop($robot_ids_arr);
                    $user_exit_url = "http://mibo.yahalei.com/mibo/index.php?service=Live.userExit&channel=bt&user_id=" . $robot_id . "&live_id=" . $live_info['id'];
                    $rs = json_decode(file_get_contents($user_exit_url), true);
                    if (isset($rs['ret']) && ($rs['ret'] == 200 || $rs['ret'] == '200')) {

                        //机器人id列表重新写入缓存
                        $robot_ids_str = implode(',', $robot_ids_arr);
                        DI()->redis->set_forever($chatroom_robot_user_list_key, $robot_ids_str);

                        //取得环信id,用于删除聊天室该成员
                        $im_id = DI()->notorm->user->where('id = ?', $robot_id)->fetchOne('im_id');
                        $emchat = $emchat = new Emchat_Lite();
                        $rs = $emchat->deleteChatRoomMember($live_info['chatroom_id'], $im_id);
                        $exit_num = $exit_num - 1;
                        DI()->redis->set_time($redis_robots_exit_num, $exit_num, 7200);
                        return true;
                    }
                }

            } else {

                //$rooms_data = json_decode(DI()->redis->get_forever('im_rooms_data'), true);
                $easemob = new Emchat_Lite();

                $room_info = $easemob->getChatRoomDetail($live_info['chatroom_id']);
                $live_info['affiliations_count'] = isset($room_info['data'][0]['affiliations_count']) ?
                                                $room_info['data'][0]['affiliations_count'] : 0;


                DI()->logger->debug('robot-exit-test', $live_info['affiliations_count']);
                //if (isset($rooms_data) && !empty($rooms_data)) {
                //    //二、取得当前直播间的人数
                //    foreach ($rooms_data as $room_data) {
                //        if ($room_data['id'] == $live_info['chatroom_id']) {
                //            $live_info['affiliations_count'] = $room_data['affiliations_count'];
                //            break;
                //        }
                //    }
                //}

                //$live_info['affiliations_count'] = isset($live_info['affiliations_count'])
                //    ? $live_info['affiliations_count'] : 0;

                //只有大于388人时才有退出机制
                if ($live_info['affiliations_count'] > 330) {
                    $rand_num = rand(0, $live_info['affiliations_count']);
                    DI()->redis->set_time($redis_robots_exit_num, $rand_num, 7200);
                }
            }
        }

    }

    //每10s把每个直播间的人数存到redis
    public function setAllRoomData() {
        $easemob = new Emchat_Lite();
        $room_data = array();
        for($i = 1; $i<=10; $i++) {
            $rs = $easemob->getChatRooms($i);
            $rooms_num = isset($rs['data']) ? count($rs['data']) : 0;
            if($rooms_num < 100 && is_array($rs['data'])) {
                $room_data = array_merge($room_data,$rs['data']);
                break;
            } else {
                $room_data = array_merge($room_data,$rs['data']);
            }
        }
        $room_data = json_encode($room_data);

        DI()->redis->set_forever('im_rooms_data', $room_data);
    }

    //无人场计划任务发牌
    public function dealCard($live_info_list = array()) {
        if (!empty($live_info_list)) {
            $model_game = new Model_Game();
            foreach($live_info_list as $live_info) {
                $domain = new Domain_IM();
                $live_game = $model_game->getLiveGame($live_info['id']);
                //无主播场要开启游戏要在mb_live_game表中先插入相应的游戏开启数据
                if(isset($live_game['gid'])) {
                    //无人场的主播id要与庄家id一样，不然要每次发牌都要请求该直播的庄家id
                    $rs = file_get_contents(DI()->config->get('sys.api_url_host').'/mibo/index.php?service=Game.ReqCard&mibo&channel=bt&gid='.
                        $live_game['gid'].'&live_id='.$live_info['id'] . '&user_id=' . $live_info['anchor_id'] .
                        '&dealer_id=' . $live_info['anchor_id']);
                    $rs = json_decode($rs, true);
                    $extra = array();
                    foreach ($rs['data'] as $key => $per_pool) {
                        if (is_array($per_pool)) {
                            foreach ($per_pool as $second_key => $card) {
                                if ($key == 'dealer_card') {
                                    $extra['dealer_pool_card'][$second_key]['type'] = $card[0];
                                    $extra['dealer_pool_card'][$second_key]['value'] = $card[1];
                                }
                                if ($key == 'pool1_card') {
                                    $extra['pool_1_card'][$second_key]['type'] = $card[0];
                                    $extra['pool_1_card'][$second_key]['value'] = $card[1];
                                }
                                if ($key == 'pool2_card') {
                                    $extra['pool_2_card'][$second_key]['type'] = $card[0];
                                    $extra['pool_2_card'][$second_key]['value'] = $card[1];
                                }
                                if ($key == 'pool3_card') {
                                    $extra['pool_3_card'][$second_key]['type'] = $card[0];
                                    $extra['pool_3_card'][$second_key]['value'] = $card[1];
                                }
                            }
                        }
                    }
                    $extra['loop_id'] = $rs['data']['loop_id'];
                    $extra['gid'] = (string)$live_game['gid'];
                    //用redis存储每个直播间每场游戏的开始时间，用于下面每18s发送谁赢得最多的消息
                    $redis_val = $live_info['id'] . '_' . $extra['loop_id'] . '_' .
                        $live_info['anchor_id'] . '_' . microtime(true);
                    DI()->redis->set_time('deal_card_time' . $live_info['chatroom_id'], $redis_val, 25);
                    $rs = $domain->sendLiveMsg((int)$live_info['anchor_id'], $live_info['chatroom_id'], '发牌', IM_GAME_PSZ_START, $extra);
                }
            }

        }

    }

    public function sendBigGift() {
        $send_msg = DI()->redis->get_rPop('send_all_room');
        //$send_msg = '米播客服送给主播【赌神】99个黄瓜';
        if($send_msg) {
            $msg = $send_msg;

            $model = new Model_LiveList();
            $live_list = $model->getLiveInList();

            //foreach($live_list as &$live_info) {
            //    $easemob = new Emchat_Lite();
            //    $room_info = $easemob->getChatRoomDetail($live_info['chatroom_id']);
            //    $live_info['affiliations_count'] = isset($room_info['data'][0]['affiliations_count']) ?
            //        $room_info['data'][0]['affiliations_count'] : 0;
            //}

            if (!empty($live_list)) {
                $domain_im = new Domain_IM();

                //$im_rooms_data = json_decode($im_rooms_data, true);
                $rooms_num = count($live_list);
                for($i=0; $i <= $rooms_num; $i += 20) {
                    $need_send_room = array();
                    $room_20 = array_slice($live_list,$i, 20);
                    foreach($room_20 as $room) {
                        array_push($need_send_room, $room['chatroom_id']);
                    }
                    $rs = $domain_im->sendLiveMsg(1, $need_send_room, $msg, IM_SYS_PUBLIC);
                    return true;
                }
            }

            //$im_rooms_data = DI()->redis->get_forever('im_rooms_data');
            //if (!empty($im_rooms_data)) {
            //    $domain_im = new Domain_IM();
            //
            //    $im_rooms_data = json_decode($im_rooms_data, true);
            //    $rooms_num = count($im_rooms_data);
            //    for($i=0; $i <= $rooms_num; $i += 20) {
            //        $need_send_room = array();
            //        $room_20 = array_slice($im_rooms_data,$i, 20);
            //        foreach($room_20 as $room) {
            //            array_push($need_send_room, $room['id']);
            //        }
            //
            //        $rs = $domain_im->sendLiveMsg(1, $need_send_room, $msg, IM_SYS_PUBLIC);
            //    }
            //}
        }
    }

    //无人场庄家结算，但是不可以跟有主播场共用，因为无人场结算没有live_id传过来
    public function sendWinnerMsg() {
        //$im_rooms_data = DI()->redis->get_forever('im_rooms_data');
        //if (!empty($im_rooms_data)) {
            $model = new Model_LiveList();
            $live_list = $model->getGameList(1, 50);
            if(!empty($live_list)) {
                foreach ($live_list as $room) {
                    $redis_key = 'deal_card_time' . $room['chatroom_id'];
                    $start_info = DI()->redis->get_time($redis_key);
                    if ($start_info) {
                        //$start_info[0]为live_id, $start_info[1]为loop_id, $start_info[2]为主播id
                        $start_info = explode('_', $start_info);
                        $model_game = new Model_Game();

                        //更新庄家金币，通过redis取得庄家id,如果没有缓存，其实也没关系，因为数据是从其他玩家结算而来的
                        $every_liveroom_card_info = DI()->redis->get_time('card_info_of_live_' . $start_info[0]);
                        if (!empty($every_liveroom_card_info)) {
                            $every_liveroom_card_info = json_decode($every_liveroom_card_info, true);
                            //如果该直播间已有缓存信息
                            if (!empty($every_liveroom_card_info)) {

                                //更新庄家输赢情况
                                $total_of_loop = DI()->notorm->game_loop_settlement
                                    ->where('loop_id = ?', $start_info[1])->sum('earn_num + tip_num');
                                $total_of_loop *= (1 - GAME_TIP_RATIO);

                                $user_update_data = array(
                                    'coin_num' => new NotORM_Literal('coin_num - ' . $total_of_loop),
                                );

                                $dealer_id = $every_liveroom_card_info['dealer_id'];
                                DI()->notorm->user->where('id = ?', $dealer_id)->update($user_update_data);

                                $winner = $model_game->getWinnerByLiveidLoopid($start_info[0], $start_info[1]);

                                $domain_im = new Domain_IM();
                                if (!empty($winner)) {
                                    $earn_num = $winner[0]['earn_num'];
                                    if ($earn_num >= 10000) {
                                        $earn_num = round($earn_num / 10000, 2) . '万';
                                    }

                                    $msg = '恭喜「' . $winner[0]['nick_name'] . '」赢得' . $earn_num . '米币，成为本局大赢家';
                                    $rs = $domain_im->sendLiveMsg($dealer_id, $room['chatroom_id'], $msg, IM_GAME_BIG_WINNER);
                                } else {    //如果庄家赢，要给前端庄家金币信息，但是有人下注

                                    if ($total_of_loop < 0) {
                                        if ($total_of_loop < -10000) {
                                            $total_of_loop = round(-1 * $total_of_loop / 10000, 2) . '万';
                                        } else {
                                            $total_of_loop = -1 * $total_of_loop;
                                        }
                                        $msg = '庄家赢了' . $total_of_loop . '米币，成为本局大赢家';
                                        $rs = $domain_im->sendLiveMsg($dealer_id, $room['chatroom_id'], $msg, IM_GAME_BIG_WINNER);
                                    }
                                }

                            }
                        }

                    }
                }
            }

        //}
    }

}