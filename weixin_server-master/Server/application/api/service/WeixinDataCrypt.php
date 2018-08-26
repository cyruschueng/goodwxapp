<?php
namespace app\api\service;
/**
 * 对微信小程序用户加密数据的解密示例代码.
 *
 * @copyright Copyright (c) 1998-2014 Tencent Inc.
 */  
use app\lib\exception\BaseException;
use think\Cache;

class WeixinDataCrypt
{
    private static $appid;
	private static $sessionKey;

    public static $OK = 0;
    public static $IllegalAesKey = -41001;
    public static $IllegalIv = -41002;
    public static $IllegalBuffer = -41003;
    public static $DecodeBase64Error = -41004;
	/**
	 * 构造函数
	 * @param $sessionKey string 用户在小程序登录后获取的会话密钥
	 * @param $appid string 小程序的appid
	 */
	public static function start( $appid, $sessionKey)
	{
		self::$sessionKey = $sessionKey;
        self::$appid = $appid;
        return true;
	}

	/**
	 * 检验数据的真实性，并且获取解密后的明文.
	 * @param $encryptedData string 加密的用户数据
	 * @param $iv string 与用户数据一同返回的初始向量
	 * @param $data string 解密后的原文
     *
	 * @return int 成功0，失败返回对应的错误码
	 */
	public static function decryptData( $encryptedData, $iv, &$data )
	{
		if (strlen(self::$sessionKey) != 24) {
			return self::$IllegalAesKey;
		}
		$aesKey=base64_decode(self::$sessionKey);

        
		if (strlen($iv) != 24) {
			return self::$IllegalIv;
		}
		$aesIV=base64_decode($iv);

		$aesCipher=base64_decode($encryptedData);

		$result=openssl_decrypt( $aesCipher, "AES-128-CBC", $aesKey, 1, $aesIV);

		$dataObj=json_decode( $result );
		if( $dataObj  == NULL )
		{
			return self::$IllegalBuffer;
		}
		if( $dataObj->watermark->appid != self::$appid )
		{
			return self::$IllegalBuffer;
		}
		$data = $result;
		return self::$OK;
	}


    /*
     * 解密微信的 openid  必须参数
       @ encryptedData
       @ iv
       @ appId
    */
    public static function encrypted($option=[]){
        $cache_session_key = Cache::get($option["session_key"]);
        $session_key = $cache_session_key["session_key"];

        if( empty($session_key) ){
            throw new BaseException(["message" => "缺少 session_key"]);
        }
        if( empty($option["iv"]) ){
            throw new BaseException(["message" => "缺少 iv"]);
        }
        if(  empty($option["encryptedData"]) ){
            throw new BaseException(["message" => "缺少 encryptedData"]);
        }

        self::start($option["appId"], $session_key );
        $errCode = self::decryptData($option["encryptedData"], $option["iv"], $data );
        if ($errCode != 0) {
            throw new BaseException(["errorCode" => 300003,"message" => "解密错误代码.".$errCode ]);
        }
        return $data;
    }

    /*获取微信的 get_session_key
        必须参数
        @appId
        @appSecret
        @js_code
    */
    public static function get_session_key($option=[]){
        $key = md5($option["appId"]);
        $key = substr($key.$key.$key.$key.$key.$key,0,168);

        $getCache = Cache::get($key);
        $session_key_up = !empty($option["session_key_up"]) ? $option["session_key_up"] : input("session_key_up");
        if( $getCache && $session_key_up == "no" ){
            return $key;
        }

        $url = sprintf(config("wx.session_key"),$option["appId"],$option["appSecret"],$option["code"]);
        $getWX = GetURL($url );
        if(!$getWX){
            throw new BaseException(["errorCode" => 300006]);
        }
        $opArr = json_decode($getWX,true);
        $errcode = @$opArr["errcode"];
        if($errcode){
            throw new BaseException(["message" => "session_key 请求出现 errcode =>".$errcode]);
        }else{
            Cache::set($key,$opArr);
            return $key;
        }
    }


}

