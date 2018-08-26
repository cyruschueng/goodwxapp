<?php
/**
 * Created by TalentBigData -> ddweb.com.cn @血狼.
 * User: XYC
 * Date: 2017/12/26
 * Time: 16:52
 */

namespace app\api\controller\v1;
use app\api\model\ClientsWeixin;
use app\lib\exception\LoginException;
use app\lib\exception\WeixinException;
use app\api\service\WeixinDataCrypt;


//来自https://github.com/gaoming13/wechat-php-sdk 的微信开源方法

//http://www.ddweb.com.cn/api/v1/weixin/index?debug=true&u_id=2

class Weixin extends BaseController
{   
    public $api;
    public $msg;
    public $wechat;

    public $appId;
    public $appSecret;
    public $token;
    public $encodingAESKey;

    public function _initialize(){

        $autoload = VENDOR_PATH."gaoming13".DS."wechat-php-sdk".DS."autoload.php";
        require($autoload);
        
        $u_id = input("u_id");
        if(!$u_id){
            throw new LoginException(["errorCode"=>200002]);
        }

        $wechatDB = ( new ClientsWeixin() )->getWX($u_id);

        if( empty($wechatDB) ){
            throw new WeixinException(["errorCode"=>300000]);
        }

        if( empty($wechatDB['app_id'])  ){
            throw new WeixinException(["errorCode"=>300001]);
        }

        // 这是使用了Memcached来保存access_token
        // 开发者中心-配置项-AppID(应用ID)
        $this->appId = $wechatDB["app_id"];
        // 开发者中心-配置项-AppSecret(应用密钥)
        $this->appSecret = $wechatDB["app_secret"];
        // 开发者中心-配置项-服务器配置-UserWeixinTokenServer(令牌)
        $this->token = $wechatDB["token"];
        // 开发者中心-配置项-服务器配置-EncodingAESKey(消息加解密密钥)
        $this->encodingAESKey = $wechatDB["encoding_aes_key"];
        // wechat模块 - 处理用户发送的消息和回复消息
        $this->wechat = new \Gaoming13\WechatPhpSdk\Wechat(array(
            'appId' => $this->appId,
            'token' =>     $this->token,
            'encodingAESKey' =>    $this->encodingAESKey //可选
        ));



        // api模块 - 包含各种系统主动发起的功能
        $this->api = new \Gaoming13\WechatPhpSdk\Api(
            array(
                'appId' => $this->appId,
                'appSecret'    => $this->appSecret,
                'get_access_token' => function() use($u_id) {
                // 用户需要自己实现access_token的返回                    
                    return cache('wechat_token_'.$u_id);
                },
                'save_access_token' => function($token) use($u_id) {
                // 用户需要自己实现access_token的保存
                    cache('wechat_token_'.$u_id,$token ,0);
                },
                'get_jsapi_ticket' => function() use($u_id) {
                // 可选：用户需要自己实现jsapi_ticket的返回（若使用get_jsapi_config，则必须定义）
                    return cache('jsapi_ticket'.$u_id );
                },
                'save_jsapi_ticket' => function($jsapi_ticket) use($u_id) {
                // 可选：用户需要自己实现jsapi_ticket的保存（若使用get_jsapi_config，则必须定义）
                    cache('jsapi_ticket'.$u_id, $jsapi_ticket, 0);
                },
            )
        );
    }
      /*
      动点世纪
      AppSecret  5ccb71c72d5669c633b2216cc70dddd4
      */



    public function index(){
        $a = $this->api->get_jsapi_config('http://www.ddweb.com.cn/api/v1/weixin/user?u_id=1', 'jsonp', 'callback');
        $u = $this->api->get_authorize_url('snsapi_base','http://www.ddweb.com.cn/index.php/api/v1/weixin/index/user?debug=true&u_id=1');
        var_dump($u);
        // 获取微信消息
        // 回复文本消息
        $this->msg = $this->wechat->serve();
        if ($this->msg->MsgType == 'text' && $this->msg->Content == '你好') {
            $this->wechat->reply("你也好！ - 这是我回复的额！");
        } else {
            $this->wechat->reply("听不懂！ - 这是我回复的额！");
        }
        // 主动发送
        $this->msg->send($msg->FromUserName, '这是我主动发送的一条消息');
    }


    /*获取群的openGId*/
    public function encrypt(){
        $option["encryptedData"] = input("encryptedData");
        $option["iv"] = input("iv");
        $option["session_key"] = input("session_key");

        $option["appId"] = $this->appId;
        $option["appSecret"] = $this->appSecret;
        $data = WeixinDataCrypt::encrypted($option);
        //self::get_session_key($option);
        return $data;
    }

    public function get_session_key(){
        $option["appId"] = $this->appId;
        $option["appSecret"] = $this->appSecret;
        $option["session_key_up"] = input("session_key_up");
        $option["code"] =  input("code");
        $key = WeixinDataCrypt::get_session_key($option);
        return [
            "session_key" => $key,
            "session_key_value" => cache($key)
        ];
    }


}

