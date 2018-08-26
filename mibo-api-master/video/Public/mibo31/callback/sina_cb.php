<?php
/**
 * Qvod 统一入口
 */

require_once dirname(__FILE__) . '/../../init.php';

//装载你的接口
DI()->loader->addDirs('Mibo');

define("PROJECT_NAME", "米播");
define("PRO_NAME", "mibo");

/** ---------------- 响应接口请求 ---------------- **/

//DI()->logger->info("请求",DI()->request->getAll());

//缓存 - redis
//DI()->redis = new Redis_Lite(DI()->config->get('app.redis.servers'));

//签名
//DI()->filter = 'Common_SignFilter';

//加密类
//DI()->mycrypt = new Mycrypt_Lite();

$_REQUEST['service'] = "CallBack.sinaCb";



$api = new PhalApi();
$rs = $api->response();
$rs->output();
