<?php

class Api_Lottery extends PhalApi_Api {

    public function __construct() {
        $this->domain_lottery = new Domain_Lottery();
    }

    public function getRules() {
        return array(
            'beforeLottery' => array(
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户ID'),
            ),
            'getResult' => array(
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户ID'),
            ),
        );
    }

    /**
     * 抽奖前
     * @desc 抽奖前，返回免费次数，人个钻石、米币
     * @request http://t.com/video/Public/mibo/index.php?service=Lottery.BeforeLottery&user_id=14
     */
    public function beforeLottery() {
        return $this->domain_lottery->beforeLottery();
    }

    /**
     * 抽奖结果
     * @desc 接口处理抽奖结果，返回中奖id
     * @request http://t.com/mibotest.yahalei.com/public/mibo/index.php?service=Lottery.GetResult&user_id=2
     */
    public function getResult() {
        return $this->domain_lottery->getResult();
    }




}
