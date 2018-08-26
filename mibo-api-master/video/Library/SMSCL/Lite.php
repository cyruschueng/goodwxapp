<?php

/**
 * 2016/07/04 创蓝文化短信拓展 @阿尔卑斯 <362226577@qq.com>
 */

class SMSCL_Lite {
       
    private $statusStr = array(
    	"0" => "短信发送成功",
    	"101" => "无此用户",
    	"102" => "密码错",
    	"105" => "短信内容包含敏感词",
    	"106" => "消息长度错",
    	"108" => "手机号码个数错",
    	"109" => "无发送额度",
    	"117" => "IP地址认证错",
    	"120" => "短信内容不在白名单中"
    );
    private $phoneNumber = '';
    
    public function __construct($phone, $appname = "") {
        
        $this->phoneNumber = $phone;
        $this->appName = $appname;
    }
    
    public function send($num = 4) {
        
        $verifyCode = $this->randNum($num);
        
        $config = DI()->config->get("app.sms.clsms");
        
        $post_data = array(
            'account' => $config['account'],
            'pswd' => $config['secret'],
            'mobile' => $this->phoneNumber,
            'msg' => "您好，您的验证码是:" . $verifyCode . "，打死都别告诉别人哦！ 欢迎使用【".$this->appName."】",
            'needstatus' => 'true',
        );
        
        $post_data = http_build_query($post_data);
    
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_URL, $config['url']);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
        $result = curl_exec($ch) ;
    
        $res = preg_split("/[,\r\n]/",$result);
        
        if(is_array($res) && isset($res[1]) && $res[1] == 0) {
            return $verifyCode;
        } else {
            return 0;
        }
    }
    
    /* 获取n位随机整数
     * @param string ip
     * @return json array
     */
    public function randNum($number) {
        $randString = '';
        for($i=0; $i<$number; $i++) {
            $randString .= rand(0,9);
        }
        return  $randString;
    }
    
    
}