<?php
/**
 * 通用配置和方法
 * @authors DemoChen
 * @date    2017-11-23 18:23:22
 * @version V1.0
 */
define('PRO_PATH', str_replace('\\', '/', dirname(__DIR__)) . '/');
//默认时区
define('TIMEZONE', 'PRC');
//站点目录
define('WEB_PATH', '');
define('WEB_URL', 'http://adminyl.shaoziketang.com');
//默认字符集
define('CHARSET', 'utf-8');
// 屏蔽错误
error_reporting(0);
// 小程序配置信息
define("APPID", 'wxfaf1e160e6da492e');
define("SCREET", '49feb29ba8667060b3180ccbcc910a6d');

$include_files = [
    'config/database.php',
    'helper/mysql_function.php',
];

foreach ($include_files as $file) {
    $pathname = PRO_PATH . $file;

    if (file_exists($pathname)) {
        include $pathname;
    } else {
        echo $pathname . '文件不存在';
    }
}
header('Content_Type:text/html;charset=' . CHARSET);
date_default_timezone_set(TIMEZONE);
//连接数据库
$link = db_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME, DB_CHARSET);

// 返回消息的方法
function returnMsg($code, $msg, $info = '')
{
    $data = ['code' => $code, 'msg' => $msg, 'info' => $info];
    echo json_encode($data);

}

/**
 * 获取请求数据
 * @DateTime 2017-11-24
 * @return   string     [description]
 */
/*
function getRequest()
{
$data = json_decode(file_get_contents("php://input"), true);
$code = $data['code'];
$openid = getOpenid($code);
return $openid;
}
 */
/**
 * 获取openid
 * @DateTime 2017-11-24
 * @param    string     $code  小程序段传过来的code
 * @return   string          openid
 */
function getOpenid($code)
{
    $url = "https://api.weixin.qq.com/sns/jscode2session?appid=" . APPID . "&secret=" . SCREET . "&js_code=" . $code . "&grant_type=authorization_code";
    $content = file_get_contents($url);
    $content = json_decode(($content));
    $content = $content->openid;
    return $content;
}

function dealData($data)
{
    foreach ($data as $key => $value) {
        $res = $value;
    }
    return $res;
}
