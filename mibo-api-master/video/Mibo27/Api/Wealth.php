<?php

class Api_Wealth extends PhalApi_Api {

    public function getRules() {
        return array(
            'exchangeRoomCard' => array(
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
                'card_num' => array('name' => 'card_num', 'type' => 'int', 'require' => true, 'desc' => '房卡兑换数量'),
            ),
        );
    }

    /**
     * 兑换房卡
     * @desc 兑换房卡
     * @request http://t.com/mibotest.yahalei.com/public/mibo/index.php?service=Wealth.ExchangeRoomCard&user_id=0&card_num=10&mibo
     */
    public function exchangeRoomCard() {
        $domain_wealth = new Domain_Wealth();
        return $domain_wealth->exchangeRoomCard();
    }


}
