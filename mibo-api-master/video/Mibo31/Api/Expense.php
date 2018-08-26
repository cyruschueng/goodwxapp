<?php

class Api_Expense extends PhalApi_Api {

    public function getRules() {
        return array(
            'rechargeLog' => array(
                'mold'  => array('name' => 'mold', 'type' => 'int', 'require' => true, 'desc' => '模块，1为充值记录，2为消费记录'),
                'user_id'  => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '礼包接收用户id'),
                'page_no'   => array('name' => 'page_no', 'type' => 'int', 'require' => false, 'default' => 1, 'desc' => '页码'),
                'page_size' => array('name' => 'page_size', 'type' => 'int', 'require' => false, 'default' => 20, 'desc' => '每页数量'),
            ),
        );
    }

    /**
     * 充值记录
     * @desc 充值记录
     * @return int type 0钻石，1米币，2礼包
     * @return int operation_id 1普通充值， 2礼包充值
     * @request https://mibo.yahalei.com/mibo/index.php?service=Expense.RechargeLog&user_id=36&mold=2
     */
    public function rechargeLog() {
        $domain = new Domain_Expense();
        return $domain->rechargeLog();
    }



}