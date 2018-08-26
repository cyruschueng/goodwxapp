<?php

/**
 * Created by PhpStorm.
 * User: code
 * Date: 1/6/2018
 * Time: 4:53 AM
 */
namespace app\api\service;
use app\api\model\ClientsUser;
use app\api\model\UserWeixins;
use app\api\model\ClientsWeixin;
use app\lib\exception\BaseException;

class UserWeixinTokenServer extends WeixinToken
{
    protected $username;
    protected $password;

    protected $code;
    protected $u_id;
    protected $appId;
    protected $appSecret;
    protected $encodingAESKey;
    protected $LoginUrl;

    /*
     *
     * 该类的作用在于给微信用户增加一个令牌
     *
     * */

    function __construct(){
        $this->code = input("code");
        $this->u_id = input("u_id");

        $wechatDB = ( new ClientsWeixin() )->getWX($this->u_id);
        $this->appId = $wechatDB["app_id"];
        // 开发者中心-配置项-AppSecret(应用密钥)
        $this->appSecret = $wechatDB["app_secret"];
        // 开发者中心-配置项-服务器配置cc-EncodingAESKey(消息加解密密钥)
        $this->encodingAESKey = $wechatDB["encoding_aes_key"];
        // 请求URL
        $this->LoginUrl = sprintf(config("wx.session_key"),$this->appId,$this->appSecret,$this->code);

    }

    public function get()
    {
        $result = GetURL($this->LoginUrl);
        $wxResult = json_decode($result,true);
        if(empty($wxResult)){
            throw new BaseException(["errorCode"=>300004]);
        }
        $loginFail = array_key_exists("errcode",$wxResult);
        if($loginFail){
            throw new BaseException([
                "message" => "微信服务器错误.code => ".$wxResult["errcode"]
            ]);
        }
        return $this->grantToken($wxResult);
    }

    /*为微信用户颁发token*/
    protected function grantToken($wxResult){
        $openid = $wxResult["openid"];
        $user = UserWeixins::getByOpenID($openid);
        if($user){
            $uid = $user->id;
        }else{
            $uid = $this->newUser($openid);
        }
        $cacheVale = $this->prepareCacheValue($wxResult,$uid);
        $token = $this->saveToCache($cacheVale);
        return $token;
    }

    /*生成一个新用户.*/
    private function newUser($openid){
        $user = UserWeixins::create([
            "openId" => $openid
        ]);
        return $user;
    }

    //写入缓存
    private function saveToCache($cacheVale){
        $key = self::generateToken();
        $value = json_encode($cacheVale);
        $token_expire = config("wx.token_expire");

        $isCache = cache($key,$value,$token_expire);
        if(!$isCache ){
            throw new BaseException(["errorCode" => 100006]);
        }
        return $key;
    }

    //生成缓存
    private function prepareCacheValue($wxResult,$uid){
        $cacheValue = $wxResult;
        $cacheValue["uid"] = $uid;
        $cacheValue["scope"] = 16;
        return $cacheValue;
    }

    public static function saveUserAnTokenInCache($user){
        $key = self::grantTokenKey($user["uid"]);
        $user = self::saveTokenCache($user['token'],$user);
        $token = self::saveTokenCache($key,$user['token']);
        if(!$user || !$token){
            throw new BaseException([
                "errorCode" =>100003
            ]);
        }
        return true;
    }


    public function getUserByToken($token){
        $user = cache($token);
        if(!empty($user)){
            return $user;
        }
        $user = (new ClientsUser()) ->getUserByToken($token);
        $user = json_encode($user);
        self::saveTokenCache($user,$token);
        return $user;
    }

    private function getCacheToken($key){
        $token = cache($key);
        return $token;
    }


    private function grantTokenKey($uid)
    {
        $key = md5(config("secure.token_salt").$uid);
        return $key;
    }

    private function saveTokenCache($v,$key){
        $expire_in = config("api.token_expire_in");
        $request = cache($key,$v,$expire_in);
        if(!$request){
            throw new BaseException([
                "errorCode" =>100003
            ]);
        }
        return $request;
    }

}