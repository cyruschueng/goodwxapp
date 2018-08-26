<?php

class Api_Task extends PhalApi_Api {

    public function getRules() {
        return array(
            'getTaskList' => array(
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
            ),
            'gainTaskReward' => array(
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
                'task_id' => array('name' => 'task_id', 'type' => 'string', 'require' => true, 'desc' => '任务id,一键领取id用英文逗号隔开'),
            ),
            'signToday' => array(
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
            ),
            'hadSignToday' => array(
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
            ),
        );
    }

    public function __construct() {
        $this->domain_task = new Domain_Task();
    }

    /**
     *  任务列表
     * @desc 任务列表 返回task_status:0为未完成，1为完成，2为已领取， finish_times:完成的次数
     * @request http://t.com/mibotest.yahalei.com/public/mibo/index.php?service=Task.GetTaskList&user_id=14
     */
    public function getTaskList() {
        $domain_task = new Domain_Task();
        return $domain_task->getTaskList();
    }

    /**
     * 领取完成任务的奖励
     * @desc 领取完成任务的奖励
     * @request http://t.com/mibotest.yahalei.com/public/mibo/index.php?service=Task.GainTaskReward&user_id=14&task_id=1
     */
    public function gainTaskReward() {
        return $this->domain_task->gainTaskReward();
    }

    /**
     * 签到
     * @desc 签到
     * @return bool
     */
    public function signToday() {
        $domain_task = new Domain_Task();
        return $domain_task->signToday();
    }

    /**
     * 今天是否签到
     * @desc 今天是否签到 true已经签，false未签
     * @request http://t.com/mibotest.yahalei.com/public/mibo/index.php?service=Task.HadSignToday&user_id=2
     * @return bool
     */
    public function hadSignToday() {
        return $this->domain_task->hadSignToday();
    }


}