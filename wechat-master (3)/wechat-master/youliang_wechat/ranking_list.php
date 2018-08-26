<?php
/**
 * 群排行
 * @authors DemoChen
 * @date    2017-11-27 09:26:55
 * @version V1.6
 */
//error_reporting(0);

include_once "api/common/common.php";

$data = json_decode(file_get_contents("php://input"), true);
//$data = $_POST;
$code = $data['code'];
$openid = getOpenid($code);
//$openid = 'oh9AT0WNg5jQsxGqyzoAAV3IEZV0';
// 插入code和openid
db_insert($link, 'yl_code_openid_log', ['code' => $code, 'opent_id' => $openid, 'type' => 'ranking_list']);

if ($openid) {
    // 查询用户是否存在用户表
    $ex_user = db_select($link, 'yl_user', 'id', "openid='" . $openid . "'");
    if ($ex_user) {
        // 处理班级的排名 class_status ==1 班级排名 ==0 全校排名
        $res = [];
        // 处理班级排名和全校排名
        $result['user_info'] = db_select($link, 'yl_user', 'class_id,nickName,avatarUrl,integral', "openid='" . $openid . "'");
        // $res = dealData($result);
        $res['class_id'] = $result['user_info'][0]['class_id'];
        $res['nickName'] = $result['user_info'][0]['nickName'];
        $res['avatarUrl'] = $result['user_info'][0]['avatarUrl'];
        $res['integral'] = $result['user_info'][0]['integral'];

        // 班级排行信息
        $class_where = $result['user_info'][0]['class_id'] ? "class_id  = " . $result['user_info'][0]['class_id'] . " " : 1;
        $res['ranking'] = db_select($link, '(SELECT @rownum:=0) r,yl_user yu ', '@rownum:=@rownum+1 AS rownum, yu.class_id,yu.nickName,yu.avatarUrl,yu.integral,yu.openid', $class_where, 'integral desc ');
        // 第几名
        foreach ($res['ranking'] as $key => $value) {
            if ($value['openid'] == $openid) {
                $res['num'] = $value['rownum'];
            }
        }
        // 全校排行信息
        $res['ranking_scr'] = db_select($link, '(SELECT @rownum:=0) r,yl_user yu ', '@rownum:=@rownum+1 AS rownum, yu.class_id,yu.nickName,yu.avatarUrl,yu.integral,yu.openid', 1, 'integral desc ');
        // 第几名
        foreach ($res['ranking_src'] as $key => $value) {
            if ($value['openid'] == $openid) {
                $res['num'] = $value['rownum'];
            }
        }
        // 最新的文章
        $news = db_select($link, 'yl_news', 'id,title,link', 'online_time <= NOW() AND is_delete =1 AND status != -1', 'online_time desc limit 1 ');
        $res['news_id'] = $news[0]['id'];
        $res['news_title'] = $news[0]['title'];
        $res['link'] = $news[0]['link'];
        echo $res ? returnMsg('200', '排名查询成功', $res) : returnMsg('-1', '排名查询失败');
    } else {
        $data['openid'] = $openid;
        $data['reg_time'] = date('Y-m-d H:i:s');
        $data['update_time'] = date('Y-m-d H:i:s');
        db_insert($link, 'yl_user', $data);
        $res = [];
        // 处理班级排名和全校排名
        $result['user_info'] = db_select($link, 'yl_user', 'class_id,nickName,avatarUrl,integral', "openid='" . $openid . "'");
        $res['class_id'] = $result['user_info'][0]['class_id'];
        $res['nickName'] = $result['user_info'][0]['nickName'];
        $res['avatarUrl'] = $result['user_info'][0]['avatarUrl'];
        $res['integral'] = $result['user_info'][0]['integral'];
        // 班级排行信息
        $class_where = $result['user_info'][0]['class_id'] ? "class_id  = " . $result['user_info'][0]['class_id'] . " " : 1;
        $res['ranking'] = db_select($link, '(SELECT @rownum:=0) r,yl_user yu ', '@rownum:=@rownum+1 AS rownum, yu.class_id,yu.nickName,yu.avatarUrl,yu.integral,yu.openid', $class_where, 'integral desc ');
        // 第几名
        foreach ($res['ranking'] as $key => $value) {
            if ($value['openid'] == $openid) {
                $res['num'] = $value['rownum'];
            }
        }
        // 全校排行信息
        $res['ranking_scr'] = db_select($link, '(SELECT @rownum:=0) r,yl_user yu ', '@rownum:=@rownum+1 AS rownum, yu.class_id,yu.nickName,yu.avatarUrl,yu.integral,yu.openid', 1, 'integral desc ');
        // 第几名
        foreach ($res['ranking_src'] as $key => $value) {
            if ($value['openid'] == $openid) {
                $res['num'] = $value['rownum'];
            }
        }
        // 最新的文章
        $news = db_select($link, 'yl_news', 'id,title,link', 'online_time <= NOW() AND is_delete =1 AND status != -1', 'online_time desc limit 1 ');
        $res['news_id'] = $news[0]['id'];
        $res['news_title'] = $news[0]['title'];
        $res['link'] = $news[0]['link'];
        echo $res ? returnMsg('200', '排名查询成功', $res) : returnMsg('-1', '排名查询失败');
    }
}

/*function selectClassRanking($data, $openid)
{
include_once "api/common/common.php";
// 处理班级的排名 class_status ==1 班级排名 ==0 全校排名
$class_status = intval($data['class_status']);
$class_where = "1";
$res = [];
// 处理班级排名和全校排名
if ($class_status == 1) {
$result['user_info'] = db_select($link, 'yl_user', 'class_id,nickName,avatarUrl,integral', "openid='" . $openid . "'");
$class_where = "class_id  = " . $res['user_info'][0]['class_id'] . " ";
$res = dealData($result);
} else {
$result['user_info'] = db_select($link, 'yl_user', 'nickName,avatarUrl,integral', "openid='" . $openid . "'");
$res = dealData($result);
}
// 排行信息
$res['ranking'] = db_select($link, '(SELECT @rownum:=0) r,yl_user yu ', '@rownum:=@rownum+1 AS rownum, yu.class_id,yu.nickName,yu.avatarUrl,yu.integral,yu.openid', $class_where, 'integral desc ');
var_dump($res['ranking']);die;
// 第几名
foreach ($res['ranking'] as $key => $value) {
if ($value['openid'] == $openid) {
$res['num'] = $value['rownum'];
}
}
// 最新的文章
$news = db_select($link, 'yl_news', 'id,title,link', 'online_time <= NOW() AND is_delete =1 AND status != -1', 'online_time desc limit 1 ');
$res['news_id'] = $news[0]['id'];
$res['news_title'] = $news[0]['title'];
$res['link'] = $news[0]['link'];
echo $res ? returnMsg('200', '排名查询成功', $res) : returnMsg('-1', '排名查询失败');
}
 */
