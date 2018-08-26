<?php
/**
 * Qvod 统一入口
 */

//用于测试接口耗费时间
//define('START_TIME', microtime(true));

require_once dirname(__FILE__) . '/../init.php';
require_once 'constant.php';


//装载你的接口
DI()->loader->addDirs('Mibo30');

/** ---------------- 响应接口请求 ---------------- **/

DI()->logger->info('['.PhalApi_Tool::getClientIp() . "]请求",DI()->request->getAll());

//缓存 - redis
DI()->redis = new Redis_Lite(DI()->config->get('app.aliRedis.servers'));

//签名,公司ip就不用签名
if(PhalApi_Tool::getClientIp() != '127.0.0.1' && PhalApi_Tool::getClientIp() != '183.14.17.73'
|| '14.127.250.232' == PhalApi_Tool::getClientIp()) {
    DI()->filter = 'Common_SignFilter';
}


//加密类
DI()->mycrypt = new Mycrypt_Lite();

$api = new PhalApi();
$rs = $api->response();
$rs->output();
