<?php

$t = json_encode($_FILES);
$time = date('Y-m-d H:i:s',time());
$get = json_encode($_GET);
$req = json_encode($_REQUEST);
logger('1111111111111----run in----'.$time.'+++files'.$t.'+++get'.$get.'+++request'.$req);


//日志记录
function logger($log_content)
{
    //$max_size = 100000;
    //$log_filename = "log.xml";
    //if(file_exists($log_filename) and (abs(filesize($log_filename)) > $max_size)){unlink($log_filename);}

    error_log($log_content.'---'.PHP_EOL, 3, 'Application/Runtime/Logs/apple'.date('Y-m-d').'.log');
}






/* openid */
if(empty($_REQUEST['openid']) && $_REQUEST['_A']!='getWxId'){
    die('we need openid');
}
/* 参数验证 */
if(empty($_REQUEST['_A']) || empty($_REQUEST['_A'])){
    die('we need _A and _C!');
}

/***************
 * 定义应用路径
 ***************/
if(!empty($_GET['phpinfo'])){
	phpinfo();
}
$appPath = 'Application/';
if (($_temp = realpath($appPath)))
{
    $appPath = $_temp.'/';
    $appPath = str_replace('\\', '/', $appPath);
}
else
{
    die('noAppPath!');
}
define('APP_PATH', $appPath);
define('API_PATH', APP_PATH.'Api/');
define('LOG_PATH', APP_PATH.'Runtime/Logs/');
define('LIB_PATH', APP_PATH.'Lib/');


/***************
 * 定义框架底层路径
 ***************/

$systemPath = '../ServiceFrame';
if (($_temp = realpath($systemPath)))
{
    $systemPath = $_temp.'/';
    $systemPath = str_replace('\\', '/', $systemPath);
}
else
{
    die('noSysPath!');
}
define('BASE_PATH', $systemPath);

/***************
 * 定义图片等文件路径
 ***************/

$resource_path = '../../Resource';
if (($_temp_resource = realpath($resource_path)))
{
    $resource_path= $_temp_resource.'/';
    $resource_path= str_replace('\\', '/', $resource_path);
}
else
{
    die('noSysPath!');
}
define('PIC_PATH', $resource_path.'xcx/pintu/images/');


/***************
 * 加载底层框架
 ***************/

require_once BASE_PATH.'Core/ServiceFrame.php';


/***************
 * 程序能够执行完毕的标志
 ***************/

die( ' serviceFrameEnd! 服务执行完毕! ' );
