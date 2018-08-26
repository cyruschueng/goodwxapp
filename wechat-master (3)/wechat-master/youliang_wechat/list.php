<?php
/**
 * 注册或者列出个人信息
 * @authors DemoChen
 * @date    2017-11-23 20:13:50
 * @version V1.0
 */
include_once "api/common/common.php";

$data = json_decode(file_get_contents("php://input"), true);

$code = $data['code'];
//echo $code;
$openid = getOpenid($code);
// 插入code和openid
db_insert($link, 'yl_code_openid_log', ['code' => $code, 'opent_id' => $openid, 'type' => 'list']);

//$openid = 'oh9AT0WNg5jQsxGqyzoAAV3IEZV0';
if ($openid) {
    $ex_user = db_select($link, 'yl_user', 'id', "openid='" . $openid . "'");
    if ($ex_user) {
        // 如果用户已经存在就返回相关的用户信息
        $res = db_select($link, 'yl_user', 'integral,grade,brand,class_name,descript,area', "openid='" . $openid . "'");
        $info['integral'] = $res[0]['integral'] ?: 0;
        $info['area'] = $res[0]['area'] ?: '未填写';
        $info['grade'] = $res[0]['grade'] ?: '小白';
        $info['brand'] = $res[0]['brand'] ?: '填写您经营门店的名称';
        $info['class_name'] = $res[0]['class_name'] ?: '未选择';
        $info['descript'] = $res[0]['descript'] ?: '一句话描述自己';
        echo returnMsg('200', '用户已存在', $info);
    } else {
        // 不存在就插入数据库
        $data['openid'] = $openid;
        $data['reg_time'] = date('Y-m-d H:i:s');
        $data['update_time'] = date('Y-m-d H:i:s');
        $info = ['openid' => $openid, 'integral' => 0, 'area' => '未填写', 'grade' => '小白', 'brand' => '填写您经营门店的名称', 'class_name' => '未选择', 'descript' => '一句话描述自己'];
        $result = db_insert($link, 'yl_user', $data);
        if ($result) {
            echo returnMsg('200', '用户插入成功', $info);
        } else {
            echo returnMsg('-1', '用户插入失败', $info);
        }
    }
}
