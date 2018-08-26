<?php
class Domain_Lottery extends Domain_Common {


    public function __construct() {
        parent::__construct();
        $today_end_second = strtotime('tomorrow');
        $this->today_remain_second = $today_end_second - time();
    }

    public function getLeftTimes() {
        $user_id = $this->req['user_id'];
        $times = DI()->redis->get_time('lottery_user_id_'.$user_id);
        if($times === null) {
            $times = 1;

            //缓存当天还有的抽奖次数
            DI()->redis->set_time('lottery_user_id_'.$user_id, $times, $this->today_remain_second);
        }

        return $times;
    }

    public function getLotteryItem($id) {

        $lottery = array(   //type:1为米币，2米钻，3vip,4话费
            1 => array('type' => 1, 'name' => '2000米币', 'reward' => 2000),
            2 => array('type' => 1, 'name' => '10000米币', 'reward' => 10000),
            3 => array('type' => 1, 'name' => '50000米币', 'reward' => 50000),
            4 => array('type' => 1, 'name' => '100000米币', 'reward' => 100000),
            5 => array('type' => 2, 'name' => '10米钻', 'reward' => 10),
            6 => array('type' => 2, 'name' => '50米钻', 'reward' => 50),
            7 => array('type' => 2, 'name' => '100米钻', 'reward' => 100),
            8 => array('type' => 3, 'name' => 'vip特权', 'reward' => 1),
            9 => array('type' => 4, 'name' => '10元话费', 'reward' => 10),
            10 => array('type' => 4, 'name' => '20元话费', 'reward' => 20),
        );

        return $lottery[$id];
    }

    public function getLotteryId() {
        $rate = rand(0, 1000);
        if($rate < 50) {
            $lottery_id = 1;
        } else if($rate < 100) {
            $lottery_id = 2;
        } else if($rate < 400) {
            $lottery_id = 3;
        } else if($rate < 943) {
            $lottery_id = 4;
        } else if($rate < 993) {
            $lottery_id = 5;
        } else if($rate < 998) {
            $lottery_id = 6;
        } else if($rate < 1000) {
            $lottery_id = 8;
        } else if($rate < 1000) {
            $lottery_id = 9;
        } else if($rate < 1010) {
            $lottery_id = 9;
        } else {
            $lottery_id = 1;
        }

        return $lottery_id;
    }

    public function beforeLottery() {
        $user_id = $this->req['user_id'];
        $user_info = DI()->r_notorm->user->select('diamond_num, coin_num')->where('id', $user_id)->fetchOne();
        //二、随机中奖id
        $times = $this->getLeftTimes();
        $user_info['times'] = (string)$times;
        $lottery_id = $this->getLotteryId();
        $user_info['lottery_id'] = $lottery_id;
        DI()->redis->set_time('lottery_user_id_'.$user_id.'_lottery_id', $lottery_id);

        return $user_info;

    }

    public function getResult() {
        $user_id = $this->req['user_id'];
        $user_info = DI()->r_notorm->user->select('vip_level, diamond_num, coin_num')->where('id', $user_id)->fetchOne();

        //一、剩余免费次数
        $times = $this->getLeftTimes();

        //二、随机中奖id
        $lottery_id = DI()->redis->get_time('lottery_user_id_'.$user_id.'_lottery_id');
        if(!$lottery_id) throw new PhalApi_Exception('想作弊？', 481);

        //三、奖品信息
        $lottery = $this->getLotteryItem($lottery_id);
        $send_coin_num = 0;
        $send_diamond_num = 0;
        $send_vip_level = isset($user_info['vip_level']) ? $user_info['vip_level'] : 0;

        //四、抽奖费用，或10米钻，或免费一次
        if($times < 1) {    //如果没有免费次数

            if($user_info['diamond_num'] < 10) throw new PhalApi_Exception('米钻不足10', 482);
            $send_diamond_num = $send_diamond_num - 10 ;    //没有免费，则要10米钻一次
        } else {
            $times -= 1;
            DI()->redis->set_time('lottery_user_id_'.$user_id, $times, $this->today_remain_second);
        }

        //五、奖品处理
        if($lottery['type'] == 1) {
            $send_coin_num += $lottery['reward'];
        }
        if($lottery['type'] == 2) {
            $send_diamond_num += $lottery['reward'];
        }

        if($lottery['type'] == 3) {
            //vip等级等于原基础加一
            $send_vip_level = $user_info['vip_level'] + 1;
        }

        //六、结果处理
        if($send_diamond_num != 0 || $send_coin_num != 0 || $send_vip_level > 0) {
            $data = array(
                'coin_num' => new NotORM_Literal('coin_num + ' . $send_coin_num),
                'diamond_num' => new NotORM_Literal('diamond_num + ' . $send_diamond_num),
                'vip_level' => $send_vip_level,
            );
            DI()->notorm->user->where('id', $user_id)->update($data);
        }

        //七、写入统计
        $stat_data = array(
            'aid' => 5,
            'user_id' => $user_id,
            'type' => 'result',
            'value' => $lottery_id,
        );
        DI()->notorm->activity_statistic->insert($stat_data);

        return array(
            'lottery_id' => $lottery_id,
            'coin_num' => $user_info['coin_num'] + $send_coin_num,
            'diamond_num' => $user_info['diamond_num'] + $send_diamond_num,
            'times' => $times
        );
    }



}