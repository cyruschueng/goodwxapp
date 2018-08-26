<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/9/30
 * Time: 18:35
 */
class Domain_Game {

    private $req;
    private $gameModel;


    public function __construct() {
        $this->req = DI()->request->getAll();
        $this->gameModel = new Model_Game();

    }

    public function gameStatus() {
        $model_game = new Model_Game();
        $data['live_id'] = $this->req['live_id'];
        $data['gid'] = $this->req['gid'];
        $data['status'] = $this->req['status'];
        $res = $model_game->insertGameStatus($data);
        if($res) {
            return true;
        } else {
            return false;
        }
    }

    public function reqCard() {
        $live_model = new Model_LiveList();
        $live_info = $live_model->getLiveInfoByLiveId($this->req['live_id']);

        if (empty($live_info)) {
            throw new PhalApi_Exception_BadRequest('不存在该直播，请联系客服');
        }

        if ($live_info['anchor_id'] != $this->req['user_id']) {
            throw new PhalApi_Exception_BadRequest('您不具有该直播的发牌权限，请联系客服');
        }

        if($this->req['gid'] == GAME_PSZ) {
            $start_server_time = round(microtime(true) * 1000);
            $psz = new Domain_PSZGame();
            $rs = $psz->reqCard();
            if (empty($rs)) {
                throw new PhalApi_Exception_BadRequest('产生牌值出错', 57);
            }


            $pool_card_log_data = array(
                'anchor_id'         => $this->req['user_id'],
                'gid'               => GAME_PSZ,
                'live_id'           => $this->req['live_id'],
                'dealer_id'         => $this->req['dealer_id'],
                'dealer_card'       => json_encode($rs['dealer_card']),
                'pool1_card'        => json_encode($rs['pool1_card']),
                'pool2_card'        => json_encode($rs['pool2_card']),
                'pool3_card'        => json_encode($rs['pool3_card']),
                'start_server_time' => $start_server_time,
            );
            $loop_id = $this->gameModel->insertGameCardLoopLog($pool_card_log_data);

            $domain_game = new Domain_PSZGame();
            $pool_rate = $domain_game->getPoolRate(0, $pool_card_log_data);

            $extra = [];

            $extra['pool1_rate'] = $rs['pool1_rate'] = $pool_rate[0];
            $extra['pool2_rate'] = $rs['pool2_rate'] = $pool_rate[1];
            $extra['pool3_rate'] = $rs['pool3_rate'] = $pool_rate[2];
            $extra['dealer_rate'] = $rs['dealer_rate'] = 0;
            $extra['pool1_style'] = $rs['pool1_style'] = $domain_game->getCardStyle($rs['pool1_card']);
            $extra['pool2_style'] = $rs['pool2_style'] = $domain_game->getCardStyle($rs['pool2_card']);
            $extra['pool3_style'] = $rs['pool3_style'] = $domain_game->getCardStyle($rs['pool3_card']);
            $extra['dealer_style'] = $rs['dealer_style'] = $domain_game->getCardStyle($rs['dealer_card']);

            $final_live_card_info = array(
                'dealer_id'         => $this->req['dealer_id'],
                'loop_id'           => $loop_id,
                'dealer_card'       => $pool_card_log_data['dealer_card'],
                'pool1_card'        => $pool_card_log_data['pool1_card'],
                'pool2_card'        => $pool_card_log_data['pool2_card'],
                'pool3_card'        => $pool_card_log_data['pool3_card'],
                'pool1_rate'        => $pool_rate[0],
                'pool2_rate'        => $pool_rate[1],
                'pool3_rate'        => $pool_rate[2],
                'dealer_rate'        => 0,
                'pool1_style'       =>$rs['pool1_style'],
                'pool2_style'       =>$rs['pool2_style'],
                'pool3_style'       =>$rs['pool3_style'],
                'dealer_style'       =>$rs['dealer_style'],
                'start_server_time' => $pool_card_log_data['start_server_time'],
            );

            DI()->redis->set_time('card_info_of_live_' . $this->req['live_id'], json_encode($final_live_card_info), 60);

            $extra['loop_id'] = $rs['loop_id'] = $loop_id;
            $extra['start_server_time'] = $rs['start_server_time'] = $start_server_time;

            foreach($rs['dealer_card'] as $d_key => $d_val) {
                $extra['dealer_card'][$d_key]['type'] = $d_val[0];
                $extra['dealer_card'][$d_key]['value'] = $d_val[1];

                //兼容老版本
                $extra['dealer_pool_card'][$d_key]['type'] = $d_val[0];
                $extra['dealer_pool_card'][$d_key]['value'] = $d_val[1];
            }

            foreach($rs['pool1_card'] as $d_key => $d_val) {
                $extra['pool1_card'][$d_key]['type'] = $d_val[0];
                $extra['pool1_card'][$d_key]['value'] = $d_val[1];

                //兼容老版本
                $extra['pool_1_card'][$d_key]['type'] = $d_val[0];
                $extra['pool_1_card'][$d_key]['value'] = $d_val[1];

            }
            foreach($rs['pool2_card'] as $d_key => $d_val) {
                $extra['pool2_card'][$d_key]['type'] = $d_val[0];
                $extra['pool2_card'][$d_key]['value'] = $d_val[1];

                //兼容老版本
                $extra['pool_2_card'][$d_key]['type'] = $d_val[0];
                $extra['pool_2_card'][$d_key]['value'] = $d_val[1];

            }
            foreach($rs['pool3_card'] as $d_key => $d_val) {
                $extra['pool3_card'][$d_key]['type'] = $d_val[0];
                $extra['pool3_card'][$d_key]['value'] = $d_val[1];

                //兼容老版本
                $extra['pool_3_card'][$d_key]['type'] = $d_val[0];
                $extra['pool_3_card'][$d_key]['value'] = $d_val[1];

            }


            $extra['gid'] = (string)GAME_PSZ;

            $domain_im = new Domain_IM();
            $domain_im->sendLiveMsg(1, $live_info['chatroom_id'], '发牌', IM_GAME_PSZ_START, $extra);

            $live_card_info = $rs;
        } else if($this->req['gid'] == GAME_DN) {
            $live_card_info = $this->reqDNCard($live_info);
        }

        return $live_card_info;
    }

    //请求斗牛牌
    public function reqDNCard($live_info) {
        $start_server_time = round(microtime(true) * 1000);
        $dn_game = new Domain_DNGame();
        $rs = $dn_game->reqCard();
        if (empty($rs)) {
            throw new PhalApi_Exception_BadRequest('产生牌值出错', 57);
        }

        $pool_card_log_data = array(
            'anchor_id'         => $this->req['user_id'],
            'gid'               => GAME_DN,
            'live_id'           => $this->req['live_id'],
            'dealer_id'         => $this->req['dealer_id'],
            'dealer_card'       => json_encode($rs['dealer_card']),
            'pool1_card'        => json_encode($rs['pool1_card']),
            'pool2_card'        => json_encode($rs['pool2_card']),
            'start_server_time' => $start_server_time,
        );
        $loop_id = $this->gameModel->insertGameCardLoopLog($pool_card_log_data);

        $extra = [];
        //以玩家身份获取每个池的概率
        $game = new Domain_DNGame();
        $pool_rate = $game->getPoolRate(0, $pool_card_log_data);
        $extra['pool1_rate'] = $rs['pool1_rate'] = $pool_rate[0];
        $extra['pool2_rate'] = $rs['pool2_rate'] = $pool_rate[1];
        $extra['pool3_rate'] = $rs['pool3_rate'] = 0;
        $extra['dealer_rate'] = $rs['dealer_rate'] = 0;
        $extra['pool1_style'] = $rs['pool1_style'] = $game->getCardStyle($rs['pool1_card']);
        $extra['pool2_style'] = $rs['pool2_style'] = $game->getCardStyle($rs['pool2_card']);
        $extra['pool3_style'] = $rs['pool3_style'] = 0;
        $extra['dealer_style'] = $rs['dealer_style'] = $game->getCardStyle($rs['dealer_card']);

        $final_live_card_info = array(
            'dealer_id'         => $this->req['dealer_id'],
            'loop_id'           => $loop_id,
            'dealer_card'       => $pool_card_log_data['dealer_card'],
            'pool1_card'        => $pool_card_log_data['pool1_card'],
            'pool2_card'        => $pool_card_log_data['pool2_card'],
            'pool1_rate'        => $pool_rate[0],
            'pool2_rate'        => $pool_rate[1],
            'pool3_rate'        => 0,
            'dealer_rate'        => 0,
            'pool1_style'        => $rs['pool1_style'],
            'pool2_style'        => $rs['pool2_style'],
            'pool3_style'        => $rs['pool3_style'],
            'dealer_style'        => $rs['dealer_style'],
            'start_server_time' => $pool_card_log_data['start_server_time'],
        );

        //直播间的牌值信息存入缓存中
        DI()->redis->set_time('card_info_of_live_' . $this->req['live_id'], json_encode($final_live_card_info), 60);



        $extra['loop_id'] = $rs['loop_id'] = $loop_id;
        $extra['start_server_time'] = $rs['start_server_time'] = $start_server_time;

        foreach($rs['dealer_card'] as $d_key => $d_val) {
            $extra['dealer_card'][$d_key]['type'] = $d_val[0];
            $extra['dealer_card'][$d_key]['value'] = $d_val[1];

            //兼容老版本
            $extra['dealer_pool_card'][$d_key]['type'] = $d_val[0];
            $extra['dealer_pool_card'][$d_key]['value'] = $d_val[1];
        }

        foreach($rs['pool1_card'] as $d_key => $d_val) {
            $extra['pool1_card'][$d_key]['type'] = $d_val[0];
            $extra['pool1_card'][$d_key]['value'] = $d_val[1];

            //兼容老版本
            $extra['pool_1_card'][$d_key]['type'] = $d_val[0];
            $extra['pool_1_card'][$d_key]['value'] = $d_val[1];

        }

        foreach($rs['pool2_card'] as $d_key => $d_val) {
            $extra['pool2_card'][$d_key]['type'] = $d_val[0];
            $extra['pool2_card'][$d_key]['value'] = $d_val[1];

            //兼容老版本
            $extra['pool_2_card'][$d_key]['type'] = $d_val[0];
            $extra['pool_2_card'][$d_key]['value'] = $d_val[1];

        }

        $extra['gid'] = (string)GAME_DN;

        $domain_im = new Domain_IM();
        $domain_im->sendLiveMsg(1, $live_info['chatroom_id'], '发牌', IM_GAME_PSZ_START, $extra);

        return $rs;
    }

    public function setResult() {
        $last_card_info = DI()->redis->get_time('card_info_of_live_' . $this->req['live_id']);
        if (!empty($last_card_info)) {

            $last_card_info = json_decode($last_card_info, true);
            if ($last_card_info) {
                $cur_microtime = round(microtime(true) * 1000);
                if (($cur_microtime - $last_card_info['start_server_time']) > 18000) {
                    throw new PhalApi_Exception('您的网络延迟严重，本局数据无效', EC_NETWORK_DELAY);
                }
            }
        }

        if ($this->req['gid'] == GAME_PSZ) {
            return $this->setPSZResult();
        } else if ($this->req['gid'] == GAME_DN) {
            return $this->setDNResult();
        } else {
            throw new PhalApi_Exception("此游戏暂未开放", 59);
        }
    }

    //除庄家的玩家下注拼三张结算
    public function setPSZResult() {

        $user_model = new Model_User();
        $user_info = $user_model->getUsersInfoById($this->req['user_id']);
        if(empty($user_info)) {
            throw new PhalApi_Exception('不存在该用户', 456);
        }

        //输赢数据校验
        $loop_info = $this->gameModel->getGameLoopInfoByLoopId($this->req['loop_id']);
        if (empty($loop_info)) {
            throw new PhalApi_Exception_BadRequest('异常数据请求，请联系客服', 55);
        }

        //如果超过500万，存在作弊嫌疑，发报警信息
        $total_bet = $this->req['bet_pool1'] + $this->req['bet_pool2'] + $this->req['bet_pool3'];
        if($total_bet > 10000000
            || (int)$this->req['bet_pool1'] > 5000000 || (int)$this->req['bet_pool1'] > 5000000
            || (int)$this->req['bet_pool3'] > 5000000) {
            DI()->mail = new PHPMailer_Lite();
            $add_arr = array('belle@mibolive.com', '362226577@qq.com', '313256513@qq.com');
            DI()->mail->send($add_arr, $user_info['nick_name'] . '玩家下注异常', '玩家下注超过500万了，赶紧去看看！');
        }

        $game = new Domain_PSZGame();
        $pool_rate = $game->getPoolRate($this->req['user_id'], $loop_info);

        //游戏结束抽成（小费）,如果是赢的则抽成，输的不抽成
        $tip_num = 0;
        $pool_1_num = $this->req['bet_pool1'] * $pool_rate[0];
        $tip_num += $pool_1_num > 0 ? $pool_1_num * $this->getGameTipRatio($user_info['vip_level']) : 0;

        $pool_2_num = $this->req['bet_pool2'] * $pool_rate[1];
        $tip_num += $pool_2_num > 0 ? $pool_2_num * $this->getGameTipRatio($user_info['vip_level']) : 0;

        $pool_3_num = $this->req['bet_pool3'] * $pool_rate[2];
        $tip_num += $pool_3_num > 0 ? $pool_3_num * $this->getGameTipRatio($user_info['vip_level']) : 0;

        //应该减去抽成（小费）
        $earn_num = $pool_1_num + $pool_2_num + $pool_3_num - $tip_num;

        $total_before = $user_info['coin_num'] + 0;
        $total_after = $user_info['coin_num'] + $earn_num;
        //如果这一局输成负数了，则清零，如果下注超过补5万
        if($earn_num < 0 && (abs($earn_num) > abs($user_info['coin_num']))) {
            $domain_im = new Domain_IM();
            if($total_bet > 100000) {
                $msg = '亲爱的'.$user_info['nick_name'].'：
  您的剩余米币为'.$user_info['coin_num'].'，不够抵扣在体验游戏的过程中的'.$earn_num.'米币，结算后您的剩余米币为'.$total_after.
                    '，鉴于您对米播的支持，现系统为您抹0，系统再赠送给您50000米币，一般人可没有的哦！您可以次日登陆米播获得米币，也可以通过充值获得更多的米币。祝您玩的愉快！
';              $total_after = 50000;
            } else {
                $msg = '亲爱的'.$user_info['nick_name'].'：
  您的剩余米币为'.$user_info['coin_num'].'，不够抵扣在体验游戏的过程中的'.$earn_num.'米币，结算后您的剩余米币为'.$total_after.
                    '，鉴于您对米播的支持，现系统为您抹0，一般人可没有的哦！您可以次日登陆米播获得米币，也可以通过充值获得更多的米币。祝您玩的愉快！
';
                $total_after = 0;
            }

            $domain_im->sendUserMsg(2, $this->req['user_id'], $msg);
            $earn_num = - $user_info['coin_num'];
        }

        $bet_data = array(
            'user_id'      => $this->req['user_id'],
            'live_id'      => $this->req['live_id'],
            'gid'          => $this->req['gid'],
            'loop_id'      => $this->req['loop_id'],
            'bet_pool1'    => $this->req['bet_pool1'],
            'bet_pool2'    => $this->req['bet_pool2'],
            'bet_pool3'    => $this->req['bet_pool3'],
            'earn_num'     => $earn_num,
            'tip_num'      => $tip_num,
            'total_before' => $total_before,
            'total_after'  => $total_after,
        );

        $result = array(
            'pool1_earn'   => 0,
            'pool2_earn'   => 0,
            'pool3_earn'   => 0,
            'total_before' => $total_before,
            'total_after'  => $total_after,
        );
        $insert_id = $this->gameModel->insertGameLoopSettlement($bet_data);
        if ($insert_id > 0) {
            //超过500万不更新用户的米币，存在异常
            if ($earn_num < 15000000) {
                $rs = $user_model->update($this->req['user_id'], array('coin_num' => $total_after));
                if ($rs == 1) {
                    DI()->redis->del("user_user_id_" . $this->req['user_id']);
                }
            }

            $result['pool1_earn'] = $pool_1_num;
            $result['pool2_earn'] = $pool_2_num;
            $result['pool3_earn'] = $pool_3_num;
        }

        return $result;
    }

    //除庄家的玩家下注斗牛结算
    public function setDNResult() {

        $user_model = new Model_User();
        $user_info = $user_model->getUsersInfoById($this->req['user_id']);
        if(empty($user_info)) {
            throw new PhalApi_Exception('不存在该用户', 456);
        }

        //输赢数据校验
        $loop_info = $this->gameModel->getGameLoopInfoByLoopId($this->req['loop_id']);
        if (empty($loop_info)) {
            throw new PhalApi_Exception_BadRequest('异常数据请求，请联系客服', 55);
        }

        //如果超过500万，存在作弊嫌疑，发报警信息
        $total_bet = $this->req['bet_pool1'] + $this->req['bet_pool2'];
        if($total_bet > 15000000
            || (int)$this->req['bet_pool1'] > 5000000 || (int)$this->req['bet_pool1'] > 5000000) {
            DI()->mail = new PHPMailer_Lite();
            $add_arr = array('belle@mibolive.com', '362226577@qq.com', '313256513@qq.com');
            DI()->mail->send($add_arr, $user_info['nick_name'] . '玩家下注异常', '玩家下注超过500万了，赶紧去看看！');
        }

        $game = new Domain_DNGame();
        $pool_rate = $game->getPoolRate($this->req['user_id'], $loop_info);

        //游戏结束抽成（小费）,如果是赢的则抽成，输的不抽成
        $tip_num = 0;
        $pool_1_num = $this->req['bet_pool1'] * $pool_rate[0];
        $tip_num += $pool_1_num > 0 ? $pool_1_num * $this->getGameTipRatio($user_info['vip_level']) : 0;

        $pool_2_num = $this->req['bet_pool2'] * $pool_rate[1];
        $tip_num += $pool_2_num > 0 ? $pool_2_num * $this->getGameTipRatio($user_info['vip_level']) : 0;


        //应该减去抽成（小费）
        $earn_num = $pool_1_num + $pool_2_num - $tip_num;

        $total_before = $user_info['coin_num'] + 0;
        $total_after = $user_info['coin_num'] + $earn_num;
        //如果这一局输成负数了，则清零，并送5万
        if($earn_num < 0 && (abs($earn_num) > abs($user_info['coin_num']))) {
            $domain_im = new Domain_IM();

            if($total_bet > 100000) {
                $msg = '亲爱的'.$user_info['nick_name'].'：
  您的剩余米币为'.$user_info['coin_num'].'，不够抵扣在体验游戏的过程中的'.$earn_num.'米币，结算后您的剩余米币为'.$total_after.
                    '，鉴于您对米播的支持，现系统为您抹0，系统再赠送给您50000米币，一般人可没有的哦！您可以次日登陆米播获得米币，也可以通过充值获得更多的米币。祝您玩的愉快！
';              $total_after = 0;
            } else {
                $msg = '亲爱的'.$user_info['nick_name'].'：
  您的剩余米币为'.$user_info['coin_num'].'，不够抵扣在体验游戏的过程中的'.$earn_num.'米币，结算后您的剩余米币为'.$total_after.
                    '，鉴于您对米播的支持，现系统为您抹0，一般人可没有的哦！您可以次日登陆米播获得米币，也可以通过充值获得更多的米币。祝您玩的愉快！
';
                $total_after = 50000;
            }

            $domain_im->sendUserMsg(2, $this->req['user_id'], $msg);
            $earn_num = - $user_info['coin_num'];
        }

        $bet_data = array(
            'user_id'      => $this->req['user_id'],
            'live_id'      => $this->req['live_id'],
            'gid'          => $this->req['gid'],
            'loop_id'      => $this->req['loop_id'],
            'bet_pool1'    => $this->req['bet_pool1'],
            'bet_pool2'    => $this->req['bet_pool2'],
            'earn_num'     => $earn_num,
            'tip_num'      => $tip_num,
            'total_before' => $total_before,
            'total_after'  => $total_after,
        );

        $result = array(
            'pool1_earn'   => 0,
            'pool2_earn'   => 0,
            'total_before' => $total_before,
            'total_after'  => $total_after,
        );
        $insert_id = $this->gameModel->insertGameLoopSettlement($bet_data);
        if ($insert_id > 0) {
            //超过500万不更新用户的米币，存在异常
            if ($earn_num < 15000000) {
                $rs = $user_model->update($this->req['user_id'], array('coin_num' => $total_after));
                if ($rs == 1) {
                    DI()->redis->del("user_user_id_" . $this->req['user_id']);
                }
            }

            $result['pool1_earn'] = $pool_1_num;
            $result['pool2_earn'] = $pool_2_num;
        }

        return $result;
    }

    //有主播场，进行庄家结算,其他用户结算走setResult()接口.
    public function setDealerResult() {
        //一、获取直播间牌信息，主要是庄家id
        $every_liveroom_card_info = DI()->redis->get_time('card_info_of_live_' . $this->req['live_id']);
        if(!empty($every_liveroom_card_info)) {
            $every_liveroom_card_info = json_decode($every_liveroom_card_info, true);
            if(!empty($every_liveroom_card_info)) {
                $dealer_id = $every_liveroom_card_info['dealer_id'];
            }
        }

        //先从缓存中取庄家id,若不存在，则从数据库中取
        if(!isset($dealer_id)) {
            $loop_info = DI()->notorm->game_loop_card_log->select('dealer_id')
                ->where('id = ?', $this->req['loop_id'])
                ->fetchOne();
            if(empty($loop_info)) throw new PhalApi_Exception('不存在这局游戏', 303);
            $dealer_id = $loop_info['dealer_id'];
        }

        $model_user = new Model_User();
        $dealer_info = $model_user->getDealerInfoById($this->req['live_id'], $dealer_id);

        //本局玩家下注合计，以此给庄家结算
        $total_of_loop = DI()->notorm->game_loop_settlement
            ->where('loop_id = ?', $this->req['loop_id'])->sum('earn_num + tip_num');
        $total_of_loop *= (1 - $this->getGameTipRatio($dealer_info['vip_level']));

        if(!$total_of_loop) {
            throw new PhalApi_Exception('没人下注');
        }

        $user_update_data = array(
            'coin_num' => new NotORM_Literal('coin_num - ' . $total_of_loop),
        );
        DI()->notorm->user->where('id = ?', $dealer_id)->update($user_update_data);

        //若是主播，主播输为负数时，增加主播金币
        //$model_live = new Model_LiveList();
        //$live_info =$model_live->getLiveInfoByLiveId($this->req['live_id']);
        //if($live_info['anchor_id'] == $dealer_id) {
            //$model_user = new Model_User();
            //$anchor_info = $model_user->getUsersInfoById($live_info['anchor_id']);
            //if($anchor_info['coin_num'] < 0) {
            //    $data = array('coin_num' => new NotORM_Literal(" coin_num + 10000000"));
            //    DI()->notorm->user->where('id = ?', $anchor_info['id'])->update($data);
            //}
        //}

        $model_game = new Model_Game();
        $winner = $model_game->getWinnerByLiveidLoopid($this->req['live_id'], $this->req['loop_id']);

        $domain_im = new Domain_IM();
        if(!empty($winner)) {
            $earn_num = $winner[0]['earn_num'];
            if($earn_num >= 10000) {
                $earn_num = round($earn_num/10000, 2) . '万';
            }

            $msg = '恭喜「' . $winner[0]['nick_name'] . '」赢得' . $earn_num . '米币，成为本局大赢家';
            $rs = $domain_im->sendLiveMsg($dealer_id, $this->req['chatroom_id'], $msg, IM_GAME_BIG_WINNER);
            //DI()->logger->debug('庄家结算发送结果消息', $rs);
            if($winner[0]['earn_num'] > 10000000) {
                $model_live = new Model_LiveList();
                $live_info =$model_live->getLiveInfoByLiveId($this->req['live_id']);
                DI()->redis->set_lPush('send_all_room',
                    '【'.$winner[0]['nick_name'].'】'.'在房间【'.$live_info['live_name'].'】赢得'.$earn_num);
            }


        } else {    //如果没人赢，仍然要给前端庄家金币信息，但是有人下注

            if($total_of_loop < 0) {
                $total_of_loop = -$total_of_loop;
                if($total_of_loop >= 10000) {
                    $total_of_loop = round(1 * $total_of_loop / 10000, 2) . '万';
                }
                $msg = '庄家赢了' . $total_of_loop . '米币，成为本局大赢家';
                $rs = $domain_im->sendLiveMsg($dealer_id, $this->req['chatroom_id'], $msg, IM_GAME_BIG_WINNER);
                //DI()->logger->debug('庄家结算发送结果消息', $rs);
            }
        }

        return true;

    }

    public function getGameTipRatio($vip_level) {
        if($vip_level >= 2) {
            return 0;
        } else {
            return GAME_TIP_RATIO;
        }
    }

    public function getLiveRank() {
        $live_rank = DI()->redis->get_time('live_rank_' . $this->req['live_id']);

        if (empty($live_rank)) {
            //开心榜 赢主播
            $win_list = $this->gameModel->getUserWinInLiveList($this->req['live_id']);

            //伤心榜 输给主播
            $lose_list = $this->gameModel->getUserLoseInLiveList($this->req['live_id']);

            $live_rank = array(
                'win_rank'  => $win_list,
                'lose_rank' => $lose_list,
            );

            $live_rank = json_encode($live_rank);
            DI()->redis->set_time('live_rank_' . $this->req['live_id'], $live_rank, 20);
        }

        $live_rank = json_decode($live_rank, true);
        return $live_rank;
    }

    public function changeDealer() {
        $model_live = new Model_LiveList();
        $live_info = $model_live->getLiveInfoByLiveId($this->req['live_id']);

        $model_user = new Model_User();
        $user = $model_user->getUsersInfoById($this->req['user_id']);
        //如果申请人不是主播，则要验证此人金币
        if($this->req['user_id'] != $live_info['anchor_id']) {
            if($user['coin_num'] <= 10000000) {
                throw new PhalApi_Exception('申请人金币不足一千万', 308);
            }
        }

        $insert_data['live_id'] = $this->req['live_id'];
        $insert_data['loop_id'] = $this->req['loop_id'];
        $insert_data['user_id'] = $this->req['user_id'];
        $insert_data['nick_name'] = $user['nick_name'];

        $rs = $this->gameModel->changeDealer($insert_data);
        if($rs) {
            $domain_im = new Domain_IM();
            //$msg = '「' . $user['nick_name'] . '」成为新庄家';
            //$domain_im->sendLiveMsg($live_info['anchor_id'], $live_info['chatroom_id'], $msg, IM_SYS_NOTICE);
            return $user;
        } else {
            throw new PhalApi_Exception('庄家切换失败', 577);
        }
    }

    //直播间获取新庄家信息用到
    public function getDealerByLiveId($live_id) {
        $dealer = DI()->notorm->apply_dealer->select('user_id, nick_name, loop_id')->where('live_id = ?', $live_id)
            ->order('id DESC')->fetchOne();
        if(empty($dealer)) {
            return false;
        }
        $user = DI()->notorm->user->select('coin_num')->where('id = ?', $dealer['user_id'])
            ->fetchOne();
        //主要是直播间前端用庄家键是id,而不是user_id
        $dealer['id'] = $dealer['user_id'];
        $dealer['coin_num'] = $user['coin_num'];
        return $dealer;

    }

}