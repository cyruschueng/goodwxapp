<?php


require_once dirname(__FILE__) . '/../init.php';

//装载你的接口
DI()->loader->addDirs('Mibo31');

DI()->logger->info("支付回调-->",DI()->request->getAll());

DI()->redis = new Redis_Lite(DI()->config->get('app.aliRedis.servers'));

$_REQUEST['service'] = 'PayNotify.index';

$api = new PhalApi();
$rs = $api->response();
$rs->output();
