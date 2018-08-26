<?php
/**
 * 班级列表
 * @authors DemoChen
 * @date    2017-11-24 13:11:37
 * @version V1.0
 */

include_once "api/common/common.php";

$data = json_decode(file_get_contents("php://input"), true);

$code = $data['code'];
$openid = getOpenid($code);
// 插入code和openid
db_insert($link, 'yl_code_openid_log', ['code' => $code, 'opent_id' => $openid, 'type' => 'user_info']);

//$openid = 'oh9AT0WNg5jQsxGqyzoAAV3IEZV0';

if ($openid) {
    // 先查个人信息 后台班级信息 后续处理班级的交集问题
    $user_info = db_select($link, 'yl_user', 'integral,grade,brand,class_id,class_name,descript,area', "openid='" . $openid . "'");
    $class_list = db_select($link, 'yl_class', 'id,class_name');

    $data = dealData($user_info);
    $data['class_list'] = $class_list;

    echo returnMsg(200, '获取数据成功', $data);
}
