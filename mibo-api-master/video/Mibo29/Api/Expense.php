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
            'sendMessageGift'      => array(
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户ID'),
                'to_user_id' => array('name' => 'to_user_id', 'type' => 'int', 'require' => true, 'desc' => '接收礼物用户ID'),
                'gift_id' => array('name' => 'gift_id', 'type' => 'int', 'require' => true, 'desc' => '礼物ID'),
                'gift_num' => array('name' => 'gift_num', 'type' => 'int', 'require' => true, 'min' => 1, 'desc' => '礼物数量'),
            ),
        );
    }

    /**
     * 充值记录
     * @desc 充值记录，返回值type，1为钻石充值，2为礼包充值
     * @request https://mibo.yahalei.com/mibo/index.php?service=Expense.RechargeLog&user_id=36&mold=2
     */
    public function rechargeLog() {
        $domain = new Domain_Expense();
        return $domain->rechargeLog();
    }



}