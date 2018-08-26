<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/9/30
 * Time: 18:35
 */
class Domain_PKGame extends Domain_Common {

    private $one_card_loop_num = 8;

    public function __construct() {
        parent::__construct();

    }

    public function reqCard() {
        $owner_id = $this->req['owner_id'];

        $model_room = new Model_PkRoom();
        $room_info = $model_room->getRoomInfoById($this->req['room_id']);

        if (empty($room_info) || $room_info['owner_id'] != $owner_id) {
            throw new PhalApi_Exception('房间不存在', 456);
        }

        $model_card = new Model_Card();
        $current_loop = $model_card->getRoomCurrentLoop($room_info['id']);
        if($current_loop >= $room_info['loop_num']) throw new PhalApi_Exception('一张门票，发不了九局', 457);

        if($current_loop == 1) {
            if($room_info['loop_num'] == 20) {
                $room_card_num = 2;
            } else {
                $room_card_num = ceil($room_info['loop_num'] / $this->one_card_loop_num);
            }
            $update_room_card = ['room_card' => new NotORM_Literal('room_card - '.$room_card_num)];
            DI()->notorm->user->where('id', $owner_id)->update($update_room_card);
        }

        $seat_redis_key = 'pk_seat_data_room_id_'.$room_info['id'];
        $redis_players_arr = DI()->redis->hGetAll($seat_redis_key);
        $redis_players_arr = array_unique($redis_players_arr);
        $players_num = count($redis_players_arr);
        if($players_num < 2) throw new PhalApi_Exception('人数少于2人，无法开始游戏', 457);

        $players_arr = array();
        if(isset($redis_players_arr[1])) {
            $players_arr[1] = $redis_players_arr[1];
        }
        if(isset($redis_players_arr[2])) {
            $players_arr[2] = $redis_players_arr[2];
        }
        if(isset($redis_players_arr[3])) {
            $players_arr[3] = $redis_players_arr[3];
        }
        if(isset($redis_players_arr[4])) {
            $players_arr[4] = $redis_players_arr[4];
        }

        $dealer_pool = array_rand($players_arr);
        //$dealer_pool = 2;
        $dealer_id = $players_arr[$dealer_pool];

        if($this->req['gid'] == GAME_PSZ) {
            $start_server_time = round(microtime(true) * 1000);
            $domain_psz = new Domain_PSZGame();
            $rs = $domain_psz->reqCard();
            //$rs = DI()->notorm->pk_loop_card_log->where('id', 167)->fetchOne();
            //$rs['pool1_card'] = json_decode($rs['pool1_card']);
            //$rs['pool2_card'] = json_decode($rs['pool2_card']);
            //$rs['pool3_card'] = json_decode($rs['pool3_card']);
            //$rs['pool4_card'] = json_decode($rs['pool4_card']);
            //print_r($rs);exit;

            if (empty($rs)) {
                throw new PhalApi_Exception_BadRequest('产生牌值出错', 57);
            }

            $pool_card_log_data = array(
                'owner_id'         => $this->req['owner_id'],
                'gid'               => GAME_PSZ,
                'room_id'           => $this->req['room_id'],
                'dealer_id'         => $dealer_id,
                'pool1_card'        => json_encode($rs['pool1_card']),
                'pool2_card'        => json_encode($rs['pool2_card']),
                'pool3_card'        => json_encode($rs['pool3_card']),
                'pool4_card'       => json_encode($rs['dealer_card']),
                //'pool4_card'       => json_encode($rs['pool4_card']),
                'pool1_user_id'     => isset($players_arr['1']) ? $players_arr['1'] : '0',
                'pool2_user_id'     => isset($players_arr['2']) ? $players_arr['2'] : '0',
                'pool3_user_id'     => isset($players_arr['3']) ? $players_arr['3'] : '0',
                'pool4_user_id'     => isset($players_arr['4']) ? $players_arr['4'] : '0',
                'start_server_time' => $start_server_time,
            );

            $model_card = new Model_Card();
            $loop_id = $model_card->insertPkCard($pool_card_log_data);

            $final_card_info = $this->dealCardInfo($pool_card_log_data, $dealer_pool);

            $final_card_info['loop_id'] = $loop_id;
            $final_card_info['current_loop'] = $current_loop + 1;

            DI()->redis->set_time('card_info_of_pk_' . $room_info['id'], json_encode($final_card_info), 60);
            DI()->redis->set_time('loop_num_pk_room_id_'.$room_info['id'], $final_card_info['current_loop']);
        }

        if($this->req['gid'] == GAME_DN) {
            //$live_card_info = $this->reqDNCard();
        }

        $dealer_info = DI()->notorm->user->select('nick_name')->where('id', $dealer_id)->fetchOne();
        $domain_im = new Domain_IM();
        $msg = '【'.$dealer_info['nick_name'].'】'.'成为庄家。';
        $domain_im->sendLiveMsg(1, $room_info['chatroom_id'], $msg, IM_GAME_CHANGE_BANKER);

        return isset($final_card_info) ? $final_card_info : NULL;
    }

    public function bet() {
        $room_id = $this->req['room_id'];
        $user_id = $this->req['user_id'];
        $pool_id = $this->req['pool_id'];
        $bet_num = $this->req['bet_num'];

        $redis_key = 'pk_bet_data_room_id_'.$room_id;
        $res = DI()->redis->hSet($redis_key, $pool_id, $bet_num);
        if(!$res) throw new PhalApi_Exception('下注失败', 432);

        return true;
    }

    public function dealCardInfo($pool_card, $dealer_pool) {

        $domain_psz = new Domain_PSZGame();

        $reset_pool_card = $this->resetLoopCard($dealer_pool, $pool_card);
        $pool_rate = $domain_psz->getPoolRate(0, $reset_pool_card);

        $final_card_info['pool1_rate'] = $dealer_pool == 1 ? 0 : $pool_rate[0];
        $final_card_info['pool2_rate'] = $dealer_pool == 2 ? 0 : $pool_rate[1];
        $final_card_info['pool3_rate'] = $dealer_pool == 3 ? 0 : $pool_rate[2];
        $final_card_info['pool4_rate'] = $dealer_pool == 4 ? 0 : $pool_rate[$dealer_pool - 1];

        if($final_card_info['pool1_rate'] <= 0 && $final_card_info['pool2_rate'] <= 0
            && $final_card_info['pool3_rate'] <= 0 && $final_card_info['pool4_rate'] <= 0) {
            $final_card_info['pool'.$dealer_pool.'_rate'] = 1;
        } else {
            $final_card_info['pool'.$dealer_pool.'_rate'] = -1;
        }

        $final_card_info += $pool_card;
        $final_card_info['pool1_card'] = json_decode($final_card_info['pool1_card']);
        $final_card_info['pool2_card'] = json_decode($final_card_info['pool2_card']);
        $final_card_info['pool3_card'] = json_decode($final_card_info['pool3_card']);
        $final_card_info['pool4_card'] = json_decode($final_card_info['pool4_card']);
        $final_card_info['pool1_style'] = $domain_psz->getCardStyle($final_card_info['pool1_card']);
        $final_card_info['pool2_style'] = $domain_psz->getCardStyle($final_card_info['pool2_card']);
        $final_card_info['pool3_style'] = $domain_psz->getCardStyle($final_card_info['pool3_card']);
        $final_card_info['pool4_style'] = $domain_psz->getCardStyle($final_card_info['pool4_card']);

        return $final_card_info;
    }

    public function setResult() {

        //一、取得牌值
        $last_card_info = DI()->redis->get_time('card_info_of_pk_' . $this->req['room_id']);
        if (!empty($last_card_info)) {

            $last_card_info = json_decode($last_card_info, true);
            if ($last_card_info) {
                $cur_microtime = round(microtime(true) * 1000);
                if (($cur_microtime - $last_card_info['start_server_time']) > 18000) {
                    //throw new PhalApi_Exception('您的网络延迟严重，本局数据无效', EC_NETWORK_DELAY);
                }
            }
        }

        if ($this->req['gid'] == GAME_PSZ) {
            return $this->setPSZResult();
        } else if ($this->req['gid'] == GAME_DN) {
            //return $this->setDNResult();
        } else {
            throw new PhalApi_Exception("此游戏暂未开放", 59);
        }
    }

    //除庄家的玩家下注拼三张结算
    public function setPSZResult() {
        //一、是米钻还是米币结算基础
        $settle_base = $this->req['game_type'] == 1 ? 'diamond_num' : 'coin_num';

        $settle_base_text = $this->req['game_type'] == 1 ? '米钻' : '米币';

        //二、取得牌值
        $model_card = new Model_Card();
        $loop_info = $model_card->getPkCardByLoopId($this->req['loop_id']);
        if (empty($loop_info)) {
            throw new PhalApi_Exception('没有这一局牌', 555);
        }

        $model_room = new Model_PkRoom();
        $room_info = $model_room->getRoomInfoById($this->req['room_id']);

        if($this->req['dealer_id'] != $loop_info['dealer_id']) {
            throw new PhalApi_Exception('你不具备结算权限。', 556);
        }

        $dealer_id = $this->req['dealer_id'];

        $user_model = new Model_User();
        $user_ids_arr = array();    //玩家

        $dealer_pool = 0;   //庄家池

        //二、1、取得下注信息
        $redis_bet_key  = 'pk_bet_data_room_id_'.$loop_info['room_id'];
        $players_bet_arr = DI()->redis->hGetAll($redis_bet_key);
        DI()->redis->del($redis_bet_key);

        if(empty($players_bet_arr)) throw new PhalApi_Exception('没有人下注',561);

        //三、1、池1数据, 处理池下注额，处理庄家池位置
        $had_pool1 = false;
        if($loop_info['pool1_user_id'] > 0) {
            $had_pool1 = true;
            $user_ids_arr[1] = $loop_info['pool1_user_id'];
            $pool1_num = isset($players_bet_arr[1]) ? $players_bet_arr[1] : 0;
            if($dealer_id == $loop_info['pool1_user_id']) $dealer_pool = 1;
        }

        //三、2、池2数据
        $had_pool2 = false;
        if($loop_info['pool2_user_id'] > 0) {
            $had_pool2 = true;
            $user_ids_arr[2] = $loop_info['pool2_user_id'];
            $pool2_num = isset($players_bet_arr[2]) ? $players_bet_arr[2] : 0;
            if($dealer_id == $loop_info['pool2_user_id']) $dealer_pool = 2;
        }

        //三、3、池3数据
        $had_pool3 = false;
        if($loop_info['pool3_user_id'] > 0) {
            $had_pool3 = true;
            $user_ids_arr[3] = $loop_info['pool3_user_id'];
            $pool3_num = isset($players_bet_arr[3]) ? $players_bet_arr[3] : 0;
            if($dealer_id == $loop_info['pool3_user_id']) $dealer_pool = 3;
        }

        //三、4、池4数据
        $had_pool4 = false;
        if($loop_info['pool4_user_id'] > 0) {
            $had_pool4 = true;
            $user_ids_arr[4] = $loop_info['pool4_user_id'];
            $pool4_num = isset($players_bet_arr[4]) ? $players_bet_arr[4] : 0;
            if($dealer_id == $loop_info['pool4_user_id']) $dealer_pool = 4;
        }

        if($dealer_pool <= 0) throw new PhalApi_Exception('没有庄家池', 485);
        if(count($user_ids_arr) <= 0) throw new PhalApi_Exception('没有玩家', 485);

        //四、取得四个池玩家数据
        $users_info = DI()->notorm->user->where('id', $user_ids_arr)->select('id, nick_name, coin_num, diamond_num')->fetchPairs('id');

        $pool1_user_info = $loop_info['pool1_user_id'] > 0 && isset($users_info[$loop_info['pool1_user_id']])
                            ? $users_info[$loop_info['pool1_user_id']] : NULL;
        $pool2_user_info = $loop_info['pool2_user_id'] > 0 && isset($users_info[$loop_info['pool2_user_id']])
                            ? $users_info[$loop_info['pool2_user_id']] : NULL;
        $pool3_user_info = $loop_info['pool3_user_id'] > 0 && isset($users_info[$loop_info['pool3_user_id']])
                            ? $users_info[$loop_info['pool3_user_id']] : NULL;
        $pool4_user_info = $loop_info['pool4_user_id'] > 0 && isset($users_info[$loop_info['pool4_user_id']])
                            ? $users_info[$loop_info['pool4_user_id']] : NULL;

        //五、把四个池的牌排出一个庄家池，以此共用获得胜率的接口
        $game = new Domain_PSZGame();
        $loop_info = $this->resetLoopCard($dealer_pool, $loop_info);
        $pool_rate = $game->getPoolRate(0, $loop_info);

        //五，1，每个池的胜率，若是庄家，胜率为0
        $pool1_rate = $dealer_pool == 1 ? 0 : $pool_rate[0];
        $pool2_rate = $dealer_pool == 2 ? 0 : $pool_rate[1];
        $pool3_rate = $dealer_pool == 3 ? 0 : $pool_rate[2];
        $pool4_rate = $dealer_pool == 4 ? 0 : $pool_rate[$dealer_pool - 1];

        //五、2，每个池赢得额度
        $pool1_win_num = $had_pool1 ? floor($pool1_num * $pool1_rate) : 0;
        $pool2_win_num = $had_pool2 ? floor($pool2_num * $pool2_rate) : 0;
        $pool3_win_num = $had_pool3 ? floor($pool3_num * $pool3_rate) : 0;
        $pool4_win_num = $had_pool4 ? floor($pool4_num * $pool4_rate) : 0;

        //六、1、如果输的超过用户拥有的钻石，则只扣除他拥有的
        if($pool1_win_num < 0 && abs($pool1_win_num) > $pool1_user_info[$settle_base]) {
            $pool1_win_num = -$pool1_user_info[$settle_base];
        }
        if($pool2_win_num < 0 && abs($pool2_win_num) > $pool2_user_info[$settle_base]) {
            $pool2_win_num = -$pool2_user_info[$settle_base];
        }
        if($pool3_win_num < 0 && abs($pool3_win_num) > $pool3_user_info[$settle_base]) {
            $pool3_win_num = -$pool3_user_info[$settle_base];
        }
        if($pool4_win_num < 0 && abs($pool4_win_num) > $pool4_user_info[$settle_base]) {
            $pool4_win_num = -$pool4_user_info[$settle_base];
        }

        //六、2、总共输的总额
        $total_lose_num = 0;
        $total_lose_num = $pool1_win_num < 0 ? $total_lose_num + $pool1_win_num
                                        : $total_lose_num;
        $total_lose_num = $pool2_win_num < 0 ? $total_lose_num + $pool2_win_num
                                        : $total_lose_num;
        $total_lose_num = $pool3_win_num < 0 ? $total_lose_num + $pool3_win_num
                                        : $total_lose_num;
        $total_lose_num = $pool4_win_num < 0 ? $total_lose_num + $pool4_win_num
                                        : $total_lose_num;

        //六、3，总共赢的总额
        $total_win_num = 0;
        $total_win_num = $pool1_win_num > 0 ? $total_win_num + $pool1_win_num
            : $total_win_num;
        $total_win_num = $pool2_win_num > 0 ? $total_win_num + $pool2_win_num
            : $total_win_num;
        $total_win_num = $pool3_win_num > 0 ? $total_win_num + $pool3_win_num
            : $total_win_num;
        $total_win_num = $pool4_win_num > 0 ? $total_win_num + $pool4_win_num
            : $total_win_num;

        if($total_win_num == 0 && $total_lose_num == 0) return true;

        //六、4，庄家赢得
        $dealer_win_num = -($pool1_win_num + $pool2_win_num + $pool3_win_num + $pool4_win_num);

        $dealer_info_key = 'pool'.$dealer_pool.'_user_info';
        $dealer_info = $$dealer_info_key;

        //六、5，如果庄家自身钻石加上用户输的都赔不了赢的,只能按比例赔偿
        if($total_win_num > $dealer_info[$settle_base] - $total_lose_num) {

            //六、6，庄家全部输光
            $dealer_win_num = -intval($dealer_info[$settle_base]);

            $dealer_info[$settle_base] -= $total_lose_num;

            $pool1_win_num = $pool1_win_num > 0 ? floor(($pool1_win_num / $total_win_num) * $dealer_info[$settle_base])
                            : $pool1_win_num;
            $pool2_win_num = $pool2_win_num > 0 ? floor(($pool2_win_num / $total_win_num) * $dealer_info[$settle_base])
                            : $pool2_win_num;
            $pool3_win_num = $pool3_win_num > 0 ? floor(($pool3_win_num / $total_win_num) * $dealer_info[$settle_base])
                            : $pool3_win_num;
            $pool4_win_num = $pool4_win_num > 0 ? floor(($pool4_win_num / $total_win_num) * $dealer_info[$settle_base])
                            : $pool4_win_num;

        }

        $im_extra = ['user_list' => []];
        $win_most = 0;
        $im_msg = '';

        //七、更新用户的钻石
        DI()->notorm->beginTransaction('db_mibo');

        if(abs($pool1_win_num) != 0) {
            $update_pool1_user_data = [
                $settle_base => new NotORM_Literal($settle_base . ' + ' . $pool1_win_num),
            ];
            $update_res1 = DI()->notorm->user->where('id', $pool1_user_info['id'])->update($update_pool1_user_data);
            $settlement_data1 = [
                'user_id' => $pool1_user_info['id'],
                'room_id' => $loop_info['room_id'],
                'gid'     => $loop_info['gid'],
                'loop_id'     => $loop_info['id'],
                'earn_num' => $pool1_win_num,
                'total_before' =>$pool1_user_info[$settle_base],
            ];

            if($win_most < $pool1_win_num) {
                if($pool1_win_num >= 10000) {
                    $win_most = round(($pool1_win_num / 10000), 2) . '万';
                } else {
                    $win_most = $pool1_win_num;
                }

                $im_msg = '恭喜「'.$pool1_user_info['nick_name'].'」赢得'.$win_most. $settle_base_text .'成为大赢家';
            }

            array_push($im_extra['user_list'], $settlement_data1);

            DI()->notorm->pk_loop_settlement->insert($settlement_data1);
            $insert_id1 = DI()->notorm->pk_loop_settlement->insert_id();
        }

        if(abs($pool2_win_num) != 0) {
            $update_pool2_user_data = [
                $settle_base => new NotORM_Literal($settle_base . ' + ' . $pool2_win_num),
            ];
            $update_res2 = DI()->notorm->user->where('id', $pool2_user_info['id'])->update($update_pool2_user_data);
            $settlement_data2 = [
                'user_id' => $pool2_user_info['id'],
                'room_id' => $loop_info['room_id'],
                'gid'     => $loop_info['gid'],
                'loop_id'     => $loop_info['id'],
                'earn_num' => $pool2_win_num,
                'total_before' =>$pool2_user_info[$settle_base],
            ];

            if($win_most < $pool2_win_num) {
                if($pool2_win_num >= 10000) {
                    $win_most = round(($pool2_win_num / 10000), 2) . '万';
                } else {
                    $win_most = $pool2_win_num;
                }
                $im_msg = '恭喜「'.$pool2_user_info['nick_name'].'」赢得'.$win_most. $settle_base_text .'成为大赢家';
            }
            array_push($im_extra['user_list'], $settlement_data2);
            DI()->notorm->pk_loop_settlement->insert($settlement_data2);
            $insert_id2 = DI()->notorm->pk_loop_settlement->insert_id();
        }

        if(abs($pool3_win_num) != 0) {
            $update_pool3_user_data = [
                $settle_base => new NotORM_Literal($settle_base . ' + ' . $pool3_win_num),
            ];
            $update_res3 = DI()->notorm->user->where('id', $pool3_user_info['id'])->update($update_pool3_user_data);
            $settlement_data3 = [
                'user_id' => $pool3_user_info['id'],
                'room_id' => $loop_info['room_id'],
                'gid'     => $loop_info['gid'],
                'loop_id'     => $loop_info['id'],
                'earn_num' => $pool3_win_num,
                'total_before' =>$pool3_user_info[$settle_base],
            ];

            if($win_most < $pool3_win_num) {
                if($pool3_win_num >= 10000) {
                    $win_most = round(($pool3_win_num / 10000), 2) . '万';
                } else {
                    $win_most = $pool3_win_num;
                }
                $im_msg = '恭喜「'.$pool3_user_info['nick_name'].'」赢得'.$win_most. $settle_base_text .'成为大赢家';
            }
            array_push($im_extra['user_list'], $settlement_data3);

            DI()->notorm->pk_loop_settlement->insert($settlement_data3);
            $insert_id3 = DI()->notorm->pk_loop_settlement->insert_id();
        }

        if(abs($pool4_win_num) != 0) {
            $update_pool4_user_data = [
                $settle_base => new NotORM_Literal($settle_base . ' + ' . $pool4_win_num),
            ];
            $update_res4 = DI()->notorm->user->where('id', $pool4_user_info['id'])->update($update_pool4_user_data);
            $settlement_data4 = [
                'user_id' => $pool4_user_info['id'],
                'room_id' => $loop_info['room_id'],
                'gid'     => $loop_info['gid'],
                'loop_id'     => $loop_info['id'],
                'earn_num' => $pool4_win_num,
                'total_before' =>$pool4_user_info[$settle_base],
            ];

            if($win_most < $pool4_win_num) {
                if($pool4_win_num >= 10000) {
                    $win_most = round(($pool4_win_num / 10000), 2) . '万';
                } else {
                    $win_most = $pool4_win_num;
                }
                $im_msg = '恭喜「'.$pool4_user_info['nick_name'].'」赢得'.$win_most. $settle_base_text .'成为大赢家';
            }
            array_push($im_extra['user_list'], $settlement_data4);

            DI()->notorm->pk_loop_settlement->insert($settlement_data4);
            $insert_id4 = DI()->notorm->pk_loop_settlement->insert_id();
        }

        if(abs($dealer_win_num) != 0) {
            $update_dealer_data = [
                $settle_base => new NotORM_Literal($settle_base . ' + ' . $dealer_win_num),
            ];
            $update_res5 = DI()->notorm->user->where('id', $dealer_info['id'])->update($update_dealer_data);
            $settlement_data5 = [
                'user_id' => $dealer_info['id'],
                'room_id' => $loop_info['room_id'],
                'gid'     => $loop_info['gid'],
                'loop_id' => $loop_info['id'],
                'earn_num' => $dealer_win_num,
                'total_before' => $dealer_info[$settle_base],
            ];

            if($win_most < $dealer_win_num) {
                if($dealer_win_num >= 10000) {
                    $win_most = round(($dealer_win_num / 10000), 2) . '万';
                } else {
                    $win_most = $dealer_win_num;
                }
                $im_msg = '恭喜「'.$dealer_info['nick_name'].'」赢得'.$win_most. $settle_base_text .'成为大赢家';
            }
            array_push($im_extra['user_list'], $settlement_data5);

            DI()->notorm->pk_loop_settlement->insert($settlement_data5);
            $insert_id5 = DI()->notorm->pk_loop_settlement->insert_id();
        }


        if((isset($update_res1) && $update_res1 && isset($insert_id1) && $insert_id1)
            || (isset($update_res2) && $update_res2 && isset($insert_id2) && $insert_id2)
            || (isset($update_res3) && $update_res3 && isset($insert_id3) && $insert_id3)
            || (isset($update_res4) && $update_res4 && isset($insert_id4) && $insert_id4)
            || (isset($update_res5) && $update_res5 && isset($insert_id5) && $insert_id5)) {
            DI()->notorm->commit('db_mibo');
        } else {
            DI()->notorm->rollback('db_mibo');
        }

        //$data['pool1_win_num'] = $pool1_win_num;
        //$data['pool2_win_num'] = $pool2_win_num;
        //$data['pool3_win_num'] = $pool3_win_num;
        //$data['pool4_win_num'] = $pool4_win_num;
        //
        //
        //$data['dealer_win_num'] = $dealer_win_num;

        $domain_im = new Domain_IM();
        $domain_im->sendLiveMsg(1, $room_info['chatroom_id'], $im_msg, IM_GAME_BIG_WINNER, $im_extra);

        return true;
    }

    public function getCurrentLoop($room_id) {

        $num = DI()->redis->get_time('loop_num_pk_room_id_'.$room_id);
        if($num) return $num;

        $num = DI()->notorm->pk_loop_card_log->where('room_id', $room_id)->count('id');
        DI()->redis->set_time('loop_num_pk_room_id_'.$room_id, $num);

        return $num;
    }

    //重置四个池的牌，排出一个庄家池牌，用于获得胜率
    public function resetLoopCard($dealer_pool, $loop_info) {
        $loop_info['dealer_card']  = $loop_info['pool'.$dealer_pool.'_card'];

        if($dealer_pool < 4) {
            $loop_info['pool'.$dealer_pool.'_card'] = $loop_info['pool4_card'];
        }

        return $loop_info;
    }

    public function getPkRecord() {
        $page_no = isset($this->req['page_no']) ? $this->req['page_no'] : 1;
        $page_size = isset($this->req['page_size']) ? $this->req['page_size'] : 20;

        $user_id = $this->req['user_id'];

        $model = new Model_PkLoopSettlement();
        $record = $model->getPkRecordByUser($user_id, $page_no, $page_size);

        $room_ids = [];
        foreach($record as $per_row) {
            array_push($room_ids, $per_row['room_id']);
        }

        $room_list = DI()->notorm->pk_room->select('id, type')->where('id', $room_ids)->fetchAll();

        if(!empty($record)) {
            $user = DI()->notorm->user->select('nick_name, avatar')->where('id', $user_id)->fetchOne();

            foreach($record as &$per) {
                $per += $user;
                foreach($room_list as $room) {
                    if($per['room_id'] == $room['id']) {
                        $per['room_type'] = $room['type'];
                        break;
                    }
                }
            }
        }

        return $record;


    }

    public function getRoomPkDetail() {
        $room_id = $this->req['room_id'];
        $page_no = $this->req['page_no'];
        $page_size = $this->req['page_size'];
        $page_size *= 4;
        $offset = ($page_no -1) * $page_size;

        $sql = 'select u.avatar, p.* from mb_pk_loop_settlement as p left join mb_user as u on p.user_id = u.id'.
                ' where p.room_id = ' . $room_id . ' order by p.id desc limit ' . $offset . ',' . $page_size;

        $pk_list = DI()->notorm->example->queryAll($sql);

        $room_type = DI()->notorm->pk_room->where('id', $room_id)->select('type')->fetchOne();

        $final_data = array();
        foreach($pk_list as $row) {
            $row['room_type'] = $room_type['type'];

            if(isset($final_data[$row['loop_id']])) {
                array_push($final_data[$row['loop_id']], $row);
            } else {
                $final_data[$row['loop_id']][0] = $row;
            }
        }

        ksort($final_data);
        $final_data = array_values($final_data);

        return $final_data;


    }
}