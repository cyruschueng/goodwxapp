<?php
/*
 * This file is for get some keys and some ids
 * ADD BY ChenDuanSheng 2017-12-28
 * */
class Key extends Ctl{
	
    /*
     * @param $code varchar
     * @return JSON {
          "code": "200", 
          "msg": "成功", 
          "data": {
            "info": {
              "session_key": "EgTBLNE7RdvzxcR/MeIe5A==", 
              "openid": "oeDcV0W0lW2u-WnondVku8uZZo4k"
            }
          }
        }
    */
    public function getWxId(){
        
        /* receive code */
        $code = $this->input['code'];
        
        /* get config from Config.php */
        $key = $GLOBALS['CURRENT_KEY']['TENCENT']['WX_XCX'];
        $appid = $key['appid'];
        $secret= $key['secret'];
        
        /* send request to weixin's remote server */
        $weixin =  file_get_contents("https://api.weixin.qq.com/sns/jscode2session?appid=$appid&secret=$secret&js_code=$code&grant_type=authorization_code");
        $jsondecode = json_decode($weixin);
        $data = get_object_vars($jsondecode);
        
        /* 
        $open_id = $data['openid'];
        $weixin =  file_get_contents("https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=$open_id&lang=zh_CN");
        $jsondecode = json_decode($weixin);
        $data = get_object_vars($jsondecode); */
        
        /* print the return */
        $out = array(
            'code'  =>'200',
            'msg'=>"成功",
            'data'=>[
                'info'=>$data
            ]
        );
        ajaxJson($out);
    }

    public function getAccessToken(){
    	$key = $GLOBALS['CURRENT_KEY']['TENCENT']['WX_XCX'];
        $appid = $key['appid'];
        $secret= $key['secret'];
                $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$appid&secret=$secret";
                $result=$this->api_notice_increment($url,[]);
                $result = json_decode($result,true);
                $access_token = $result['access_token'];
	
        $out = array(
            'code'  =>'200',
            'msg'=>"成功",
            'data'=>[
                'info'=>[ 'access_token'=>$access_token ]
            ]
        );
        ajaxJson($out);
    }

   function api_notice_increment($url, $data){
    $ch = curl_init();
    $header = "Accept-Charset: utf-8";
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
   // curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; MSIE 5.01; Windows NT 5.0)');
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_AUTOREFERER, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $tmpInfo = curl_exec($ch);
    //     var_dump($tmpInfo);
    //    exit;
    if (curl_errno($ch)) {
      return false;
    }else{
      // var_dump($tmpInfo);
      return $tmpInfo;
    }
  } 
}
