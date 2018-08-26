<?php

class Api_Pay extends PhalApi_Api {

    private $appDomain;

    public function __construct() {
        $this->appDomain = new Domain_App();
    }

    public function getRules() {
        return array(
            'getRechargeItemList'         => array(
                'channel' => array('name' => 'channel', 'type' => 'string', 'require' => true, 'desc' => '渠道ID'),
                'os' => array('name' => 'os', 'type' => 'int', 'require' => false, 'default' =>1,
                              'desc' => 'Android或iOS'),
            ),
            'getRechargeCoinItemList'         => array(
                'channel' => array('name' => 'channel', 'type' => 'string', 'require' => true, 'desc' => '渠道ID'),
                'os' => array('name' => 'os', 'type' => 'int', 'require' => false, 'default' =>'Android',
                              'desc' => 'Android或iOS'),
            ),
            'getExchange2CoinItemList'    => array(
                'channel' => array('name' => 'channel', 'type' => 'string', 'require' => true, 'desc' => '渠道ID'),
            ),
            'getExchange2DiamondItemList' => array(
                'channel' => array('name' => 'channel', 'type' => 'string', 'require' => true, 'desc' => '渠道ID'),
            ),
            'diamondExchange2Coin'        => array(
                'channel' => array('name' => 'channel', 'type' => 'string', 'require' => true, 'desc' => '渠道ID'),
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户ID'),
                'item_id' => array('name' => 'item_id', 'type' => 'int', 'require' => true, 'desc' => '兑换列表ID'),
            ),
            'coinExchange2Diamond'        => array(
                'channel' => array('name' => 'channel', 'type' => 'string', 'require' => true, 'desc' => '渠道ID'),
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户ID'),
                'item_id' => array('name' => 'item_id', 'type' => 'int', 'require' => true, 'desc' => '兑换列表ID'),
            ),
            'getPayType'        => array(
                'os' => array('name' => 'os', 'type' => 'string', 'require' => true, 'desc' => 'Android/iOS'),
                'channel' => array('name' => 'channel', 'type' => 'string', 'require' => false, 'desc' => 'channel'),
                'version_code' => array('name' => 'version_code', 'type' => 'int', 'require' => false, 'desc' => '版本号'),
            ),
            'placeOrder' => array(
                'type'        => array('name' => 'type', 'type' => 'int', 'require' => true, 'desc' => '1是微信支付，2是支付宝,3苹果支付'),
                'money'       => array('name' => 'money', 'type' => 'int', 'require' => true, 'desc' => '支付金额,单位分'),
                'user_id'     => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
                'order_no'     => array('name' => 'order_no', 'type' => 'string', 'require' => false, 'desc' => '订单号，用于之前未完成的'),
                'operation_id'=> array('name' => 'operation_id', 'type' => 'int', 'require' => false,
                                              'desc' => '操作内容，1普通充值，2大礼包'),
                'operation_value' => array('name' => 'operation_value', 'type' => 'int', 'require' => false,
                                                 'desc' => '操作内容对应的id,如充值列表id,礼包id'),
            ),
            'updateDiamond' => array(
                'order_no'        => array('name' => 'order_no', 'type' => 'string', 'require' => true, 'desc' => '订单号'),
                'user_id'        => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
            ),
            'updateCoin' => array(
                'order_no'        => array('name' => 'order_no', 'type' => 'string', 'require' => true, 'desc' => '订单号'),
                'user_id'        => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
            ),
            'verifyApplePay' => array(
                'order_no'       => array('name' => 'order_no', 'type' => 'string', 'require' => true, 'desc' => '订单号'),
                'apple_order_no' => array('name' => 'apple_order_no', 'type' => 'string', 'require' => true, 'desc' => '苹果订单号'),
                'user_id'        => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
                'receipt_data'   => array('name' => 'receipt_data', 'type' => 'string', 'require' => false, 'desc' => '验证数据'),
                'is_sand_box'   => array('name' => 'is_sand_box', 'type' => 'int', 'require' => false, 'desc' => '是否沙盒'),
            ),
        );
    }

    /**
     * 钻石充值价格列表
     * @desc 1元能充多少钻石价格列表，id与价格尽量不要变，因为苹果还有苹果价格id
     * @request https://mibo.yahalei.com/mibo/index.php?service=Pay.GetRechargeItemList&channel=bt
     */
    public function getRechargeItemList() {
        $pay_domain = new Domain_Pay();
        return $pay_domain->getRechargeItemList();
    }

    /**
     * 米币充值价格列表
     * @desc 1元能充多少米币价格列表
     * @request https://mibo.yahalei.com/mibo/index.php?service=Pay.GetRechargeItemList&channel=bt
     */
    public function getRechargeCoinItemList() {
        $pay_domain = new Domain_Pay();
        return $pay_domain->getRechargeCoinItemList();
    }

    /**
     * 钻石兑换金币价格列表
     * @desc 钻石兑换金币价格列表
     */
    public function getExchange2CoinItemList() {
        $pay_domain = new Domain_Pay();
        return $pay_domain->getExchange2CoinItemList();
    }

    /**
     * 钻石兑换金币接口
     * @desc 钻石兑换金币接口
     * @request http://mibo.yahalei.com/mibo/index.php?service=Pay.diamondExchange2Coin&channel=bt&user_id=14&&item_id=1
     */
    public function diamondExchange2Coin() {
        $pay_domain = new Domain_Pay();
        return $pay_domain->diamondExchange2Coin();
    }

    /**
     * 金币兑换钻石详情列表
     * @desc 金币兑换钻石详情列表
     */
    public function getExchange2DiamondItemList() {
        $pay_domain = new Domain_Pay();
        return $pay_domain->getExchange2DiamondItemList();
    }

    /**
     * 金币兑换钻石接口
     * @desc 金币兑换钻石接口
     */
    public function coinExchange2Diamond() {
        throw new PhalApi_Exception_BadRequest("暂时不支持兑换钻石", 70);
    }

    /**
     * 创建订单
     * @ignore
     */
    public function createOrderNo() {
        throw new PhalApi_Exception_BadRequest("接口暂未提供", 70);
    }

    /**
     * ios获取支付方式,主要是因为ios不能用微信支付
     * @desc ios获取支付方式，pay_type:1wechat, 2alipay, 3apple pay, is_auditing:1为在审核，0为不在审核
     */
    public function getPayType() {
        $domain_pay = new Domain_Pay();
        return $domain_pay->getPayType();
    }

    /**
     * 米播钻石充值，微信、支付宝下单
     * @desc 米播充值，微信、支付宝下单
     * @return id为充值列表id
     * @request http://mibo.yahalei.com/mibo/index.php?service=Pay.PlaceOrder&type=1&money=1
     */
    public function placeOrder() {
        $domain_pay = new Domain_Pay();
        return $domain_pay->placeOrder();
    }


    /**
     * 微信下单后，更新用户钻石
     * @desc 微信下单后，更新用户钻石，所有需要充值的礼包或者第一次充值先走Gift.SendPackage这个接口，二、placeOrder接口，三、updateDiamond接口。
     * 登录时有first_charge_package这个字段，因此不管是第一次充值，还是”首充大礼包"，如果first_charge_package是false,
     * 都要走Gift.SendPackage	这个接口，用以记录已经首充了，以后不弹首充大礼包。
     */
    public function updateDiamond2() {
        $domain_pay = new Domain_Pay();
        $rs = $domain_pay->updateDiamond2();
        return $rs;
    }

    public function verifyApplePay() {
        $domain = new Domain_Pay();
        return $domain->verifyApplePay();
    }

    /**
     * 米币充值，更新用户米币
     * @desc 米币充值，更新用户米币
     */
    public function updateCoin2() {
        $domain_pay = new Domain_Pay();
        return $domain_pay->updateCoin2();
    }

}
