<?php

defined('BASE_PATH') OR exit('denied');

/* 定义语言 UTF-8 */
header('Content-Type: text/html; charset=UTF-8');

/* 加载配置 */
require_once(APP_PATH.'Config/Config.php');

/* 加载公共方法 */
require_once(BASE_PATH.'Core/Common.php');

/* 加载中心控制器 */
require_once BASE_PATH.'Core/Controller.php';

/* 需要优化成选择性加载 */
require_once BASE_PATH.'Core/Model.php';

/* 加载app中的ctl */
require_once APP_PATH.'Core/Ctl.php';

/* 加载路由 */
require_once BASE_PATH.'Core/Router.php';
$Router = new Router();
$Router->run();  // 程序开始跑


/* 加载app中的mod -- 此处需要优化，无需加载时则不加载 */
//require_once APP_PATH.'Core/mod.php';
