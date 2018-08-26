<?php

/**
 * Created by PhpStorm.
 * User: code
 * Date: 1/6/2018
 * Time: 4:53 AM
 */
namespace app\api\service;
use app\api\model\ClientsUser;
use app\lib\exception\BaseException;
use app\lib\exception\LoginException;

class UserToken
{
    protected $username;
    protected $password;

    function __construct(){
        #config(setting.option)
    }

    public function get($uid)
    {
        #先在数据库中查询是否有Token
        #如果没有,则grant.
        $key = self::grantTokenKey($uid);
        $token = self::getCacheToken($key);
        if($token){
           return $token;
        }
        $user = (new ClientsUser())->getUser($uid);
        $token = @$user["token"];
        if(!$token){
            throw new LoginException([
                "errorCode"=>100004
            ]);
        }
        self::saveTokenCache($key,$token);
        return $token;
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