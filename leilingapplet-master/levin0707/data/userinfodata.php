<?php
header("Content-Type:text/html;charset=utf-8");

require "config.inc.php";
require "DatabaseSQL.inc.php";
require('func.php');
require "WxApi/WeixinApi.class.php";

global $conn;




$conn = mysqli_connect($dbhost, $dbuser, $dbpwd, $dbname);
$conn->query("SET NAMES 'utf8'");
$conn->query("SET CHARACTER_SET_CLIENT=utf8");

$media_code = 'f0b0c50b-bcf7-4433-9ef0-bfb86127f2c7';//雷凌(ZW-LL00002)
$action = post_check(isset($_POST['action']) ? $_POST['action'] : $_GET['action']);
$source = @strtolower($_REQUEST['source']) ? strtolower($_REQUEST['source']) : 'normal';

$re = "";

switch ($action) {
    case "add":
        $re = add($media_code, $conn, $source);
        break;
    case "province":
        $re = province($media_code, $conn);
        break;
    case "city":
        $re = city($media_code, $conn);
        break;
    case "jingxiaoshang":
        $re = jingxiaoshang($media_code, $conn);
        break;
    case "chexing":
        $re = chexing($media_code, $conn);
        break;

    case "sendmsg":
        $re = sendmsg();
        break;
    case "submit":
        $re = submit_information($conn, $source);
        break;
    case "checkTel":
        $re = check_tel($conn);
        break;

    case "checkTelSubmit":
        $re = check_tel_submit_ajax($conn);
        break;
    case "checkUserUnique":
        $re = check_user_unique($conn);
        break;
}

mysqli_close($conn);

echo($re);
die();



//验证设备唯一性
function check_user_unique($conn)
{
    //判断是否有cookie(is_order)

    return json_encode(isset($_COOKIE['is_order']));
}
//判断是否是微信浏览器
function is_weixin(){
    if ( strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') !== false ) {
        return true;
    }
    return false;
}
//新增
function add($media_code, $conn, $source)
{


    //判断该设备是否参加过该活动
    $name = post_check($_POST["username"]);
    $mobile = post_check($_POST["mobile"]);
    $gender = post_check($_POST["gender"]);
    $dealer_code = post_check($_POST["dealer_code"]);

    $series_code = post_check($_POST["series_code"]);
    $series_name = post_check($_POST["series_name"]);
    $province_code = post_check($_POST["province_code"]);
    $province_name = post_check($_POST["province_name"]);
    $city_code = post_check($_POST["city_code"]);
    $city_name = post_check($_POST["city_name"]);
    $business_phone = post_check($_POST["business_phone"]);
    if (isset($_COOKIE['is_order'])){
        do_log($conn,'add',$mobile,'该设备已预订'.$_COOKIE['is_order']);
        return '对不起，您无法参加此活动。可能的原因：</br>1.您已经报名参加过本活动</br> 2.您报名的4S店试驾名额已满';
    }



    //$channel=post_check($_POST["channel"]);
    $channel_sql = 'select * from lv_channel where channel_code = "' . $source . '"';

    $channel_query = $conn->query($channel_sql);

    while ($channel_res = mysqli_fetch_assoc($channel_query)) {

        $channel_list[] = $channel_res;
    }

    $channel = empty($channel_list[0]['id']) ? 11 : $channel_list[0]['id'];
    $model_code = $_POST['ch'];
    if ($name == "" || $mobile == "") {
        return '请填写姓名和手机号码';
    }
    if (empty($model_code)) $model_code = '004019';




    
    $is_duplicated_zwid = checkIfDuplicatedZwid($conn, $model_code);
    if ($is_duplicated_zwid){
        return '对不起，您无法参加此活动。可能的原因：</br>1.您已经报名参加过本活动</br> 2.您报名的4S店试驾名额已满';
    }
     



    $modleSql = "select * from lv_car_model where  model_code='$model_code'";
    $modleSqlQuery = $conn->query($modleSql);
    while ($modleSqlRes = mysqli_fetch_assoc($modleSqlQuery)) {

        $modleSqlList[] = $modleSqlRes;
    }
    if ($channel <= 11) {

        $where_str = "and channel <= $channel";
    } else {

        $where_str = "and channel = $channel";
    }
    $where_str = '';
    $model_name = $modleSqlList[0]['model_name'];
    //$strSQL = "select mobile from lv_order_h5 where mobile='$mobile' and modle_name='$modle_name' and modle_code='$modle_code'  ". $where_str;
    $time = date("Y-m-d H:i:s", strtotime("-6 month"));//半年前时间
    //$strSQL联合了两个表的结果的原因是雷凌试驾小程序的表结构和H5页面不一致导致的，也就是说H5页面的订单信息会插入到lv_order_h5这个表
    //而小程序的订单结果会插入到lv_order这张表，判断用户是否重复预约试驾是联合这两张表的结果进行判定的.
    $strSQL = "
    SELECT 
        mobile,model_code 
    FROM 
        lv_order_h5 
    WHERE 
        mobile = '$mobile' 
    AND (model_code = '$model_code'OR create_time > '$time')  
    UNION 
	SELECT
		u.telephone,
		m.model_code
	FROM
		lv_order AS o,
		lv_user AS u,
		lv_car_model AS m
	WHERE
		o.user_id = u.id
	AND o.car_model_id = m.id
	AND u.telephone = '$mobile'
	AND (
		m.model_code = '$model_code'
		OR o.createtime > '$time')
    ";
    $result = $conn->query($strSQL);
    if (mysqli_num_rows($result) > 0) {
        do_log($conn,'add',$mobile,'该手机号已预约过');
        return '对不起，您无法参加此活动。可能的原因：</br>1.您已经报名参加过本活动</br> 2.您报名的4S店试驾名额已满';
    }

    $ua = $_SERVER['HTTP_USER_AGENT'];
    $ipaddr = get_client_ip(0, true);
    $zwcmopenid = '';
    if ( is_weixin() ){
        $zwcmopenid = getZwid();  //乐天邦平台在cookie里面存了zwid
    }

    $strSQL = "insert into lv_order_h5(media_code,dealer_code,is_publicorder,clue_type,model_code,model_name,series_code,series_name,province_code,province_name,city_code,city_name,district_name,content,status,customer_name,gender,phone,business_phone,mobile,email,address,contact_method,fax,buy_date,communication_time,pre_fetch_time,pre_payment_method,arrangement,pre_time,promotion_price,remark,create_user_id,create_user,create_time,update_user_id,update_user,update_time,itemid,itemcode,ifimport,channel, openid, ip, useragent) values ('$media_code','$dealer_code',2,1,'$model_code','$model_name','$series_code','$series_name','$province_code','$province_name','$city_code','$city_name','0','',0,'$name','$gender','','$business_phone','$mobile','','','','','','','','','','','','',0,'',now(),0,'',now(),5,'ZW-LL00002',0,'$channel', '$zwcmopenid', '$ipaddr', '$ua' )";
    $result = $conn->query($strSQL);
    if (preg_match('/zhwzpush.?/', $source)) {

        $msg = '尊敬的客户您已成功预约试驾。待您试驾完成后，请前往活动页面（活动链接： ' . $_SERVER["REQUEST_SCHEME"] . '://' . $_SERVER["HTTP_HOST"] . '/levin0707/car_submit.html?ch=' . $model_code . '&source=' . $source . '  ）按要求填写试驾信息，核实信息真实有效后，我们的客服会在5个工作日之内将价值50元的礼品卡密发送给您。';
        $result = send_msg($mobile, $msg, '【掌握传媒】');
    } else {

        $msg = '尊敬的客户您已成功预约试驾。待您试驾完成后，请前往活动页面 （活动链接  ' . $_SERVER["REQUEST_SCHEME"] . '://' . $_SERVER["HTTP_HOST"] . '/levin0707/car_submit.html?ch=' . $model_code . '&source=' . $source . ' ），按要求填写试驾信息(须提供4S店的照片,其中有4S店门牌号码或4S店相关标志)，待核实信息真实有效后，我们的客服会在5个工作日之内将礼品卡密发送给您。';
        $result = send_msg($mobile, $msg);
    }
    setcookie('is_order',$mobile);
    return "success";
}

function province($media_code, $conn)
{

    $reStr = "";

    //$strSQL = "select province_name,province_code from tb_cpd_province where media_code='" . $media_code . "' and status=1 ";
    $strSQL = "select province_name,province_code from lv_province where status = 1";
    // die();
    $result = $conn->query($strSQL);
    //  $res = $db->query("select distinct province from jingxiaoshang where  province='".$province."'");
    //echo(mysql_num_rows($result));
    while ($row = mysqli_fetch_assoc($result)) {
        //echo("'province':'".$row["province"]);
        $reStr = $reStr . "<option value='" . $row['province_code'] . "'>" . $row['province_name'] . "</option>";
    }
    //if ($reStr!=""){ $reStr= substr($reStr,0,strlen($reStr)-1);} //rtrim($str, ",")
//	$responce->Result = 1; $responce->total = $total_pages; $responce->records = $count;
    return $reStr;
}

function chexing($media_code, $conn)
{

    $reStr = "";

    $module_code = $_POST['ch'];
    if (empty($module_code)) $module_code = '004019';
    //$strSQL = "select series_name,series_code from tb_cpd_cfg where media_code='" . $media_code . "' and status=1 and modle_code='" . $module_code . "'";
    $strSQL = "select c.series_name,c.series_code from lv_configuration as c left join lv_car_model as m on m.id = c.car_model_id where m.model_code = {$module_code}";
    
    $result = $conn->query($strSQL);
    //  $res = $db->query("select distinct province from jingxiaoshang where  province='".$province."'");
    while ($row = mysqli_fetch_assoc($result)) {
        $reStr = $reStr . "<option value='" . $row['series_code'] . "'>" . $row['series_name'] . "</option>";
    }
    //if ($reStr!=""){ $reStr= substr($reStr,0,strlen($reStr)-1);} //rtrim($str, ",")
//	$responce->Result = 1; $responce->total = $total_pages; $responce->records = $count;
    return $reStr;
}

function city($media_code, $conn)
{
    //2017-07-03 因为作弊， 屏蔽哈尔滨市； 邵晓凌
    $reStr = "";
    $province = post_check($_POST['province']);
    $strSQL = "select a.city_name,a.city_code from lv_city a join lv_dealer b on a.city_code=b.dealer_city_code where  b.dealer_province_code='" . $province . "' and a.status=1  group by a.city_name,a.city_code";
//    $strSQL = "select c.city_name,c.city_code from lv_city as c left join lv_dealer as d on c.city_code = d.dealer_city_code where d.dealer_province_code = {$province} c.status = 1 group by c.city_name,c.city_code";
    $result = $conn->query($strSQL);
    // $res =  $db->query();
    while ($row = mysqli_fetch_assoc($result)) {
        $reStr = $reStr . "<option value='" . $row['city_code'] . "'>" . $row['city_name'] . "</option>";
    }
    //if ($reStr!="") $reStr= substr($reStr,0,strlen($reStr)-1);//rtrim($str, ",")
    return $reStr;
}

function jingxiaoshang($media_code, $conn)
{
    $reStr = "";
    $province = post_check($_POST['province']);
    $city = post_check($_POST['city']);

    //为了对付作弊行为，我们将每家4S店每天可以预约的人数控制在2人之内。超过2人则改4S店就无法预约
    date_default_timezone_set('Asia/Chongqing');
    $last24hours = date("Y-m-d H:i:s", strtotime("-24 hour"));
    $strSQL = "select d.*,a.total_count
              from lv_dealer as d
              left join
              (select count(id) as total_count, id
              from lv_dealer
              where date(updatetime)>'" . $last24hours . "'
              GROUP BY id) as a
              on a.id = d.id
              where ( a.total_count<2  or a.total_count is null )
              ";

    //$strSQL="select * from tb_cpd_dealer where  media_code='".$media_code."' and status = 1 "; //此语句是之前不限人数的版本
    if ($province != '') {
        $strSQL = $strSQL . " and dealer_province_code = '" . $province . "' ";
    }
    if ($city != '') {
        $strSQL = $strSQL . " and dealer_city_code = '" . $city . "' ";
    }

    $strSQL = $strSQL . " group by d.id";

    $result = $conn->query($strSQL);
    // $res =  $db->query("select distinct storename from jingxiaoshang where  city='".$city."'");
    while ($row = mysqli_fetch_assoc($result)) {
        $reStr = $reStr . "<option value='" . $row['tel'] . "||" . $row['id'] . "'>" . $row['dealer_name'] . "</option>";
    }
    //if ($reStr!="") $reStr= substr($reStr,0,strlen($reStr)-1);//rtrim($str, ",")
    return $reStr;
}

//function sendmsg($mode = '1',$conn){
function sendmsg($mode = '1')
{
    $tel = $_POST['tel'];
    $num = $_POST['num'];
    if ($mode == '1') {
        $msg = $num;// " 验证码（预约试驾）为: ".$num.", 五分钟内有效。";
    } else {
        $msg = $num;//" 验证码（预约试驾）为: ".$num.", 五分钟内有效。";
    }
    $result = send_msg_aliyun($tel, $msg); //send_msg($tel,$msg);  //使用阿里云的短信验证服务发送验证码
    $time = strtotime('Y-m-d H:i:s', time());
    //  $sql    = "insert into tb_cpd_log(msg,createtime) values ( ".$result." , ".$time." )";
    //  $result = mysql_query($sql);
    return $result . $msg;
}

function submit_information($conn, $source)
{
    $wName = $_POST['workerName'];
    $wNum = $_POST['workerNum'];
    $cNum = $_POST['customerNum'];
    $img = $_POST['imageData'];
    $createtime = date('Y-m-d H:i:s', time());
    $is_first = check_tel_submit($conn, $cNum);
    if ($is_first) {
        do_log($conn,'submit_information',$cNum,'该号码已提交过试驾信息');
        return '对不起，您无法参加此活动。可能的原因：</br>1.您已经报名参加过本活动</br> 2.您报名的4S店试驾名额已满';
    }
    

    $module_code = $_POST['ch'];
    if (empty($module_code)) $module_code = '004019';


    
    $is_duplicated_zwid = checkIfDuplicatedZwid($conn, $module_code);
    if ($is_duplicated_zwid){
        return '对不起，您无法参加此活动。可能的原因：</br>1.您已经报名参加过本活动</br> 2.您报名的4S店试驾名额已满';
    }
    
    $zwcmopenid = '';
    if ( is_weixin() ){
        $zwcmopenid = getZwid();  //乐天邦平台在cookie里面存了zwid
    }else{
        //如果不是在微信浏览器里面，则设置cookie，用来标示一个设备
        $zwcmopenid = isset($_COOKIE['levin_user_id'])?$_COOKIE['levin_user_id']:'' ;
        if (empty($zwcmopenid)){//$createtime = date('Y-m-d H:i:s',strtotime("-$repeat_span day"));
            $zwcmopenid = date('YmdHis', strtotime('now'))  . '.' . rand(1, 10000); //为用户生成一个不可能重复的号码，用来在数据库里面标识一个设备／用户
            //strtotime("now")
            setcookie('levin_user_id', $zwcmopenid, time() + 24 * 60 * 360);
        }
    }


    $name = $source . '_' . $module_code . '_' . $cNum . '.' . time();
    if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $img, $result)) {
        if (file_put_contents('/var/www/html/ltb_static_files/levin/img/' . $name . '.jpg', base64_decode(str_replace($result[1], '', $img)))) {
            $sql = "insert into lv_submit_info(staff_name,staff_phone,user_phone,img,createtime, openid) values('" . $wName . "' ,'" . $wNum . "', '" . $cNum . "','" . $name . "','" . $createtime .  "','"  .  $zwcmopenid . "' ) ";
            $result = $conn->query($sql);
            if ($result) {
                setcookie('isSubmit', $cNum, time() + 24 * 60 * 180);
                return '恭喜您提交成功。我们将尽快核对您的信息。如果真实有效，我们的客服将在5个工作日之内将礼品卡密发送到您的手机。';
            } else {
                do_log($conn,'submit_information',$cNum,'写入数据库失败, 请重新提交');
                return '提交失败, 请重新提交';
            }
        }
    }
    do_log($conn, 'submit_information', $cNum, '未知原因，提交失败');
    return '提交失败, 请重新提交';

    //  file_put_contents('./img/'.$name.'.jpg', $img);//返回的是字节数

}

/**
 * [check_tel 检查电话号码是否用过]
 * @ckhero
 * @DateTime 2017-06-28
 * @param    [type]     $media_code [description]
 * @param    [type]     $conn       [description]
 * @return   [type]                 [description]
 */
function check_tel($conn)
{



    $model_code = $_POST['ch'];
    $mobile = $_POST['tel'];
    if ($mobile == "") {
        return json_encode(array('status' => 0, 'info' => '对不起，您已经报名参加过此活动，不能再次参加。'));
    }
    if (empty($model_code)) $model_code = '004019';



    
    $is_duplicated_zwid = checkIfDuplicatedZwid($conn, $model_code, $mobile);
    if ($is_duplicated_zwid){
        return json_encode(array('status' => 1, 'info' => '对不起，您已经报名参加过此活动，不能再次参加。'));
    }
    

    //=========================车型的配置不关心
//    $modleSql = "select * from lv_car_model where model_code='$model_code'";
//    @$modleSqlQuery = $conn->query($modleSql);
//    while ($modleSqlRes = mysqli_fetch_assoc($modleSqlQuery)) {
//
//        $modleSqlList[] = $modleSqlRes;
//    }
//    $model_name = $modleSqlList[0]['model_name'];
    //==========================
    $time = date("Y-m-d H:i:s", strtotime("-6 month"));//半年前时间
    //用来处理用户终身只能试驾一种车型，并且半年内不能试驾其他车型//jy 2017.7.6
    //$strSQL = "select mobile from lv_order_h5 where mobile='$mobile'  and (  model_code='$model_code' or  create_time >  $time   )";
    $strSQL = "
    SELECT 
        mobile,model_code 
    FROM 
        lv_order_h5 
    WHERE 
        mobile = '$mobile' 
    AND (model_code = '$model_code' OR create_time > '$time')  
    UNION 
	SELECT
		u.telephone,
		m.model_code
	FROM
		lv_order AS o,
		lv_user AS u,
		lv_car_model AS m
	WHERE
		o.user_id = u.id
	AND o.car_model_id = m.id
	AND u.telephone = '$mobile'
	AND (
		m.model_code = '$model_code'
		OR o.createtime > '$time'
	)";
    $result = $conn->query($strSQL);
    if (mysqli_num_rows($result) > 0) {
        do_log($conn,'check_tel',$mobile,'该号码已参加过该活动');
        return json_encode(array('status' => 1, 'info' => '对不起，您已经报名参加过此活动，不能再次参加。'));
    } else {

        return json_encode(array('status' => 0, 'info' => '尚未参加活动'));
    }

}


/**
 * [check_tel_submit 检查半年内是否有提交过试驾信息]
 * @ckhero
 * @DateTime 2017-06-29
 * @param    [type]     $conn [description]
 * @param    [type]     $tel  [description]
 * @return   [type]           [description]
 */
function check_tel_submit($conn, $tel)
{
   


    if (@$_COOKIE['isSubmit']) {
        //是否要判断之前提交的手机号码跟本次提交的手机号码相同？ 即是否允许用户修改提交的图片？
        do_log($conn,'check_tel_submit',$tel,'在此设备上已经提交过试驾信息, 上次提交信息的手机为: ' . $_COOKIE['isSubmit']);
        return true;
    }

    $sql = "select * from lv_submit_info where user_phone='" . $tel . "' and createtime > '" . date('Y-m-d H:i:s', strtotime("-180 day")) . "'";

    $result = $conn->query($sql);
    if (mysqli_num_rows($result) > 0) {
        do_log($conn,'check_tel_submit',$tel,'此手机号码在半年之内已经提交过试驾信息。' );
        return true;
    } else {

        //查询用户是否预约过
        $sql = "
        SELECT 
        mobile,model_code 
    FROM 
        lv_order_h5 
    WHERE 
        mobile = '$tel' 
    UNION 
	SELECT
		u.telephone,
		m.model_code
	FROM
		lv_order AS o,
		lv_user AS u,
		lv_car_model AS m
	WHERE
		o.user_id = u.id
	AND o.car_model_id = m.id
	AND u.telephone = '$tel'
        ";
        $result = $conn->query($sql);
        if (mysqli_num_rows($result) > 0) {
            return false;       
        }else{
            do_log($conn,'check_tel_submit',$tel,'该号码没有预约过试驾');
            return true;        
        }
    }
}

/**
 * [check_tel_submit 是假信息提交页面号码检查]
 * @ckhero
 * @DateTime 2017-06-29
 * @param    [type]     $conn [description]
 * @return   [type]           [description]
 */
function check_tel_submit_ajax($conn)
{

    $tel = $_POST['tel'];
    $res = check_tel_submit($conn, $tel);
    if ($res) {
        //do_log($conn,'check_tel_submit_ajax',$tel,'该号码已提交过试驾信息'); //在 check_tel_submit里面已经记日志
        return json_encode(array('status' => 1, 'info' => '无法提交信息,可能是：</br>1.您已提交试驾信息。</br>2.您还没有预约试驾。'));
    } else {

        return json_encode(array('status' => 0, 'info' => '可以参加活动'));
    }
}

/**
 * @Description:把用户的提交错误信息写到日志中
 * @param $conn 链接句柄
 * @param $action 动作
 * @param $telephone 手机号
 * @param $detail 详细原因
 */
function do_log($conn,$action,$telephone,$detail)
{
    $ua = $_SERVER['HTTP_USER_AGENT'];
    $ipaddr = get_client_ip(0, true);

    if ( is_weixin() ){
        $user_id = getZwid();
    }else{
        //如果不是在微信浏览器里面，则设置cookie，用来标示一个设备
        $user_id = isset($_COOKIE['levin_user_id'])?$_COOKIE['levin_user_id']:'' ;
        if (empty($user_id)){//$createtime = date('Y-m-d H:i:s',strtotime("-$repeat_span day"));
            $user_id = date('YmdHis', strtotime('now'))  . '.' . rand(1, 10000); //为用户生成一个不可能重复的号码，用来在数据库里面标识一个设备／用户
            //strtotime("now")
            setcookie('levin_user_id', $user_id, time() + 24 * 60 * 360);
        }
    }

    $time = date('Y-m-d H:i:s');
    $sql = "insert into lv_user_error_log(`action`,`telephone`,`detail`, `ip`, `useragent`, `userid`,`createtime`) VALUES ('$action','$telephone','$detail', '$ipaddr', '$ua', '$user_id','$time')";
    $conn->query($sql);
}



function getZwid(){
    $zwid = $_COOKIE['zwid']; 
    if (!empty($zwid)) return $zwid;

    return '';
}

function checkIfDuplicatedZwid($conn, $model_code, $user_input_mobile_phone=''){

        $openid = '';
        if ( is_weixin() ){
            $openid = getZwid();  //乐天邦平台在cookie里面存了zwid
        }
        if(empty($openid)) return false;

        $sql = "select * from lv_submit_info where openid='" . $openid . "' and createtime > '" . date('Y-m-d H:i:s', strtotime("-180 day")) . "'  limit 1";
        $result = $conn->query($sql);
        if (mysqli_num_rows($result) > 0) {
            do_log($conn,'submit_information','','该openid已提交过试驾信息. zwid=' . $openid . ', 输入框内的手机为：' . $user_input_mobile_phone );
            return true;
        } 

        //查询用户是否预约过
        $halfyearearlier = date("Y-m-d H:i:s", strtotime("-6 month"));//半年前时间
        $sql = "
            SELECT 
                openid,model_code 
            FROM 
                lv_order_h5 
            WHERE 
                openid = '$openid' and (model_code = '$model_code' or create_time > '$halfyearearlier')
            LIMIT 1
            UNION 
            SELECT
                u.openid,
                m.model_code
            FROM
                lv_order AS o,
                lv_user AS u,
                lv_car_model AS m
            WHERE
                o.user_id = u.id
            AND o.car_model_id = m.id
            AND u.openid = '$openid'
            AND (m.model_code = '$model_code' OR o.createtime > '$halfyearearlier')
            LIMIT 1
            ";

        $result = $conn->query($sql);
        if (mysqli_num_rows($result) > 0) {
            do_log($conn,'submit_information','','该openid已提交过试驾信息. zwid:' . $openid . ', 输入框内的手机为：' . $user_input_mobile_phone);
            return true;
        }
        return false;
        
   
}

function get_client_ip($type = 0,$adv=false) {
    $type       =  $type ? 1 : 0;
    static $ip  =   NULL;
    if ($ip !== NULL) return $ip[$type];
    if($adv){
        if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $arr    =   explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            $pos    =   array_search('unknown',$arr);
            if(false !== $pos) unset($arr[$pos]);
            $ip     =   trim($arr[0]);
        }elseif (isset($_SERVER['HTTP_CLIENT_IP'])) {
            $ip     =   $_SERVER['HTTP_CLIENT_IP'];
        }elseif (isset($_SERVER['REMOTE_ADDR'])) {
            $ip     =   $_SERVER['REMOTE_ADDR'];
        }
    }elseif (isset($_SERVER['REMOTE_ADDR'])) {
        $ip     =   $_SERVER['REMOTE_ADDR'];
    }
    // IP地址合法验证
    $long = sprintf("%u",ip2long($ip));
    $ip   = $long ? array($ip, $long) : array('0.0.0.0', 0);
    return $ip[$type];
}


?>
