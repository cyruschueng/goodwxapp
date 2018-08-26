<?php

class Api_Crond extends PhalApi_Api {

    private $crondDomain;

    public function getRules() {
        return array(
            'robot' => array(),
        );
    }

    public function __construct() {
        $this->crondDomain = new Domain_Crond();
    }

    /**
     * 每10s执行以下的定时任务,如增加机器人
     * @ignore
     */
    public function act() {
        $this->dealCard();
        $this->crondDomain->setAllRoomData();
        $this->crondDomain->sendBigGift();
        $this->addRobot();
        $this->robotExit();
    }

    /**
     * 两分钟执行一次
     * @ignore
     */
    public function twoMinAct() {
        $this->remindStartLive();
    }

    /**
     * 两小时执行一次
     * @ignore
     */
    public function twoHourAct() {
        $domain = new Domain_TwoHourCrond();
        $domain->guideFinishOrder();
    }

    /**
     * 机器人定时加入
     * @desc 每20秒触发一次
     * @ignore
     */
    public function addRobot() {
        $rs = $this->crondDomain->robot();
        if (empty($rs)) {
            throw new PhalApi_Exception('加入机器人失败，请查看日志', 555);
        }
        return $rs;
    }

    /**
     * 机器人定时退出
     * @desc 每20秒触发一次
     * @ignore
     */
    public function robotExit() {
        $rs = $this->crondDomain->robotExit();
        return $rs;
    }

    /**
     * 无主播场发牌
     * @desc 无主播场发牌,每5秒执行进来
     */
    public function dealCard() {
        $timekeeper = DI()->redis->get("mb_timekeeper");
        $timekeeper = $timekeeper ? $timekeeper : 0;
        DI()->redis->set_forever("mb_timekeeper", $timekeeper + 5);
        //一、第25秒发牌
        if($timekeeper !=0 && $timekeeper % 25 == 0) {
            $live_info = DI()->notorm->live_list->where('type = 1 and status = 2')->fetchAll();
            if(!empty($live_info)) {
                DI()->logger->debug('发牌', "第".$timekeeper."秒");
                $this->crondDomain->dealCard($live_info);
            }
            DI()->redis->set_forever("mb_timekeeper", 0);
        }

        //二、第15秒庄家结算
        if($timekeeper != 0 && $timekeeper % 15 == 0) {
            sleep(3);
            DI()->logger->debug('公布结果', ">>>>>>>>>>>>>>>>>>>>>>>>>>>发送结果");
            $this->sendWinnerMsg();
        }

    }

    public function remindStartLive() {

        //key = preview_userid_23_starttime_312212121
        $preview_keys = DI()->redis->keys('preview_*');
        $domain_im = new Domain_IM();
        if(!empty($preview_keys)) {
            foreach($preview_keys as $key) {
                $start_arr = explode('_', $key);
                $start_time = $start_arr[5];
                if(($start_time - 60 * 10) < time()) {
                    $no_prefix_key = $start_arr[1] . '_' . $start_arr[2] . '_' . $start_arr[3] . '_'
                        . $start_arr[4] . '_' . $start_arr[5];
                    DI()->redis->del($no_prefix_key);
                    $domain_im->sendUserMsg(1, $start_arr[3], '您发布的预告就还有几分钟就要开播了。');
                }
            }
        }
        return true;

    }

    public function closeInterruptLive() {

    }

    public function sendWinnerMsg() {
        $this->crondDomain->sendWinnerMsg();
    }

}