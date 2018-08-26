<?php
/**
 * Demo 统一入口
 */

require_once dirname(__FILE__) . '/../init.php';

//装载你的接口
DI()->loader->addDirs('Demo');

/** ---------------- 响应接口请求 ---------------- **/

// DI()->memcache = new PhalApi_Cache_Memcached(DI()->config->get('sys.mc'));
DI()->redis = new PhalApi_Cache_Redis(DI()->config->get('sys.redis.servers'));

$api = new PhalApi();
$rs = $api->response();
$rs->output();

