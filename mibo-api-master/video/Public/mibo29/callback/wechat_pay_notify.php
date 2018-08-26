<?php
/*
 * +----------------------------------------------------------------------
 * | 微信异步回调
 * +----------------------------------------------------------------------
 * | Copyright (c) 2015 summer All rights reserved.
 * +----------------------------------------------------------------------
 * | Author: summer <aer_c@qq.com> <qq7579476>
 * +----------------------------------------------------------------------
 * | This is not a free software, unauthorized no use and dissemination.
 * +----------------------------------------------------------------------
 * | Date
 * +----------------------------------------------------------------------
 */

//写入超全局变量
$GLOBALS['PAY_NOTIFY'] = $GLOBALS['HTTP_RAW_POST_DATA'];
//$GLOBALS['PAY_NOTIFY'] = <<<XML
//<xml>
// <appid><![CDATA[wx2421b1c4370ec43b]]></appid>
// <attach><![CDATA[支付测试]]></attach>
// <bank_type><![CDATA[CFT]]></bank_type>
// <fee_type><![CDATA[CNY]]></fee_type>
// <is_subscribe><![CDATA[Y]]></is_subscribe>
// <mch_id><![CDATA[10000100]]></mch_id>
// <nonce_str><![CDATA[5d2b6c2a8db53831f7eda20af46e531c]]></nonce_str>
// <openid><![CDATA[oUpF8uMEb4qRXf22hE3X68TekukE]]></openid>
// <out_trade_no><![CDATA[1409811653]]></out_trade_no>
// <result_code><![CDATA[SUCCESS]]></result_code>
// <return_code><![CDATA[SUCCESS]]></return_code>
// <sign><![CDATA[F6E80BC6327F5285160E2483C5A46204]]></sign>
// <sub_mch_id><![CDATA[10000100]]></sub_mch_id>
// <time_end><![CDATA[20140903131540]]></time_end>
// <total_fee>1</total_fee>
// <trade_type><![CDATA[JSAPI]]></trade_type>
// <transaction_id><![CDATA[1004400740201409030005092168]]></transaction_id>
//</xml>
//XML;

$_REQUEST['service'] = 'PayNotify.index';
$_REQUEST['type']	= 'wechat';
$_REQUEST['method'] = 'notify';

require_once(dirname(dirname(__FILE__)) . '/notify.php');