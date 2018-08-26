<?php
header("Content-Type:text/html;charset=utf-8");
//ini_set("error_reporting","E_ALL & ~E_NOTICE");
//require('ini.php');
require "config.inc.php";
require "DatabaseSQL.inc.php";
require('func.php');

 /* $DBName = $GLOBALS["dbname"];
  echo(1);
  $this -> DatabaseSQL($DBName);
  echo(2);*/
  //$db = new Mysql('localhost','root','root','test');//实例化一个类...记住这里的参数是和构造函数的参数一样的...
 // $rutt->myQuery('select * from calvin_body');//运行数据库查寻并显示的函数..
    global  $conn;

    $conn = mysqli_connect($dbhost, $dbuser, $dbpwd,$dbname);
    $conn->query("SET NAMES 'utf8'");
    $conn->query("SET CHARACTER_SET_CLIENT=utf8");
    $conn->query("SET CHARACTER_SET_RESULTS=utf8");
    $media_code='f0b0c50b-bcf7-4433-9ef0-bfb86127f2c7';//雷凌(ZW-LL00002)
    $action=post_check($_GET['action']);
    if($action=='check'){
      $data   = json_decode(isset($_GET['data'])?$_GET['data']:null,true);
      $time   = date('Y-m-d %',strtotime('-1 day'));
      foreach ($data as $k => $v) {
        $tel[] = $v['tel'];
      }
    //获取一天之内的数据
    $sql    = "select mobile from lv_order_h5 where createtime like '".$time."'";
    $result = $conn->query($sql);
    if($r = mysqli_fetch_assoc($result)){
      foreach ($r as $k => $v) {
         $tel2[] = $v['mobile'];
      }
    }else{
      $tel2 = array();
    }
    //比较两个数据库中的手机号码
    $send_tel = array_diff($tel, $tel2);
    $msg    = '尊敬的客户，感谢您参与“试驾雷凌双擎汽车领取京东50元购物卡活动”，请您点击 https://m.zwmedia.com.cn/levin0707/index.html 补全资料，或进入公众号补全资料，然后前往预约的4S店进行试驾，祝您试驾愉快。';
    foreach ($send_tel as $k => $v) {
      send_msg($v,$msg);
      file_put_contents("/var/www/html/ltb_static_files/levin/sms.log", $v . " ," .   date('Y-m-d H:i:s') ."\n",FILE_APPEND);
    }
   }
   mysql_close($conn);
   die();
?>
