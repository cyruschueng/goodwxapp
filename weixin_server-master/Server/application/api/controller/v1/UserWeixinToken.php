<?php
/**
 * Created by PhpStorm.
 * User: code
 * Date: 1/6/2018
 * Time: 4:50 AM
 */

namespace app\api\controller\v1;


use app\api\model\ClientsWeixin;
use app\api\service\UserWeixinTokenServer;
use app\lib\validate\TokenGet;

class UserWeixinToken
{

    public function getToken(){
        /* 通过用户uid获取token.*/
        if( (new TokenGet())->goCheck()){
            $UserWeixinTokenServer = new UserWeixinTokenServer();
            $token = $UserWeixinTokenServer->get();
            return ["token" => $token];
        }

    }

    public function getUser($token=''){
        /* 通过token获取用户信息.*/

        /* 通过用户uid获取token.*/

        if( (new TokenGet())->goCheck()){
            $UserToken = new UserWeixinTokenServer();
            $user = $UserToken->getUserByToken($token);
            return $user;
        }

    }
}