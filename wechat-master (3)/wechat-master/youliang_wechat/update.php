<?php
/**
 * 更新个人资料
 * @authors DemoChen
 * @date    2017-11-23 20:04:57
 * @version V1.0
 */
include_once "api/common/common.php";

$data = json_decode(file_get_contents("php://input"), true);

$code = $data['code'];
$openid = getOpenid($code);

// 插入code和openid
db_insert($link, 'yl_code_openid_log', ['code' => $code, 'opent_id' => $openid, 'type' => 'update']);

if ($openid) {
    $ex_user = db_select($link, 'yl_user', 'id', "openid='" . $openid . "'");
    if ($ex_user) {
        $data['update_time'] = date('Y-m-d H:i:s');
        $ex = db_update($link, 'yl_user', $data, "openid='" . $openid . "'");
        echo $ex ? returnMsg('200', '用户信息更新成功') : returnMsg('-1', '用户更新失败');
    }
}
