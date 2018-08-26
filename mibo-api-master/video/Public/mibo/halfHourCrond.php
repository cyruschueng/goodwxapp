<?php
//两分钟执行一次的计划任务入口
require_once dirname(__FILE__) . '/../init.php';
require_once 'constant.php';
//装载你的接口
DI()->loader->addDirs('Mibo');

set_time_limit(0);

$a = $_REQUEST['service'] = $_POST['service'] = $_GET['service'] = "Crond.halfHourAct";

/** ---------------- 响应接口请求 ---------------- **/

DI()->logger->debug("半小时定时器任务",DI()->request->getAll());

//缓存 - redis
//DI()->redis = new Redis_Lite(DI()->config->get('app.redis.servers'));
DI()->redis = new Redis_Lite(DI()->config->get('app.aliRedis.servers'));


//缓存 - Memcache/Memcached
DI()->cache = function () {
    return new PhalApi_Cache_Memcache(DI()->config->get('sys.mc'));
};


$api = new PhalApi();
$rs = $api->response();
$rs->output();
