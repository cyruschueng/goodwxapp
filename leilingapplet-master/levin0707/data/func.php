<?php
function inject_check($sql_str) {
    return eregi('select|insert|and|or|update|delete|\'|\/\*|\*|\.\.\/|\.\/|union|into|load_file|outfile', $sql_str);
}

function verify_id($id=null) {
    if(!$id) {
        exit('没有提交参数！');
    } elseif(inject_check($id)) {
        exit('提交的参数非法！');
    } elseif(!is_numeric($id)) {
        exit('提交的参数非法！');
    }
    $id = intval($id);

    return $id;
}


function str_check( $str ) {
    if(!get_magic_quotes_gpc()) {
        $str = addslashes($str); // 进行过滤
    }
    $str = str_replace("_", "\_", $str);
    $str = str_replace("%", "\%", $str);

   return $str;
}


function post_check($post) {
    if(!get_magic_quotes_gpc()) {
        $post = addslashes($post);
    }
    $post = str_replace("_", "\_", $post);
    $post = str_replace("%", "\%", $post);
    $post = nl2br($post);
    $post = htmlspecialchars($post);

    return $post;
}

function send_msg_aliyun($tel, $msg){
    
    include './Sms/aliyun-php-sdk-core/Config.php';
    $iClientProfile = \DefaultProfile::getProfile("cn-hangzhou", "LTAIE2hl7LxNZvH4", "p5dxoML3L4VXhCMZ8vwD7s2SMzuEe5");
    $client = new \DefaultAcsClient($iClientProfile);
    $request = new \Sms\Request\V20160927\SingleSendSmsRequest();
    $request->setSignName("乐天邦");//签名名称
    $request->setTemplateCode("SMS_56225097");//模板code
    $request->setRecNum($tel);//目标手机号
    $data = array(
        'code'=>$msg
    );
    $data = json_encode($data);
    $request->setParamString($data);//模板变量，数字一定要转换为字符串
    
    try {
        $response = $client->getAcsResponse($request);
        return 'ok'. ':' . $tel;
    }
    catch (ClientException  $e) {
        
    }
    return '发送短信失败';
}
// 短信发送内容
// @param $tel,手机号码
// @param $msg,短信内容
function send_msg($tel, $msg, $title = ''){
  $username = 'cs_zwgg';
  $password = '123zhang';
  if ($title == '') {

      $title = "【乐天邦】";
  }
  $send_msg = urlencode(iconv('UTF-8', 'GB2312', $title . $msg));
  $url = 'http://58.83.147.92:8080/qxt/smssenderv2?user=' . $username . '&password=' . md5($password) . '&tele=' . $tel . '&msg=' . $send_msg;
  $result = send_curl($url);
  return $result;
}

function send_curl($url , $data = "",$method = "GET",$charset = 'utf-8'){
  //初始化并执行curl请求
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_TIMEOUT, 15);
    //设置抓取的url
    curl_setopt($curl, CURLOPT_URL, $url);
    //设置头文件的信息作为数据流输出
    curl_setopt($curl, CURLOPT_HEADER, 0);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
    //设置获取的信息以文件流的形式返回，而不是直接输出。
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    if (strtoupper($method)=='POST') {
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        if (is_string($data)) { //发送JSON数据
            $http_header = array(
                'Content-Type: application/json; charset=' . $charset,
                'Content-Length: ' . strlen($data),
            );
            curl_setopt($curl, CURLOPT_HTTPHEADER, $http_header);
        }
    }
    $result = curl_exec($curl);
    $error = curl_error($curl);
    curl_close($curl);
    //发生错误，抛出异常
    //if ($error) throw new \Exception('请求发生错误：' . $error);
    //if($error){readdir(C('WEB_URL').C('ERROR_PAGE'));}
    return $result;

}


?>
