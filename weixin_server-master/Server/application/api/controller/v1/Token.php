<?php
/**
 * Created by PhpStorm.
 * User: code
 * Date: 1/6/2018
 * Time: 4:50 AM
 */

namespace app\api\controller\v1;


use app\api\service\UserToken;
use app\lib\validate\TokenGet;

class Token
{
    public function getToken($uid=''){
        /* 通过用户uid获取token.*/

        if( (new TokenGet())->goCheck()){
            $UserToken = new UserToken();
            $token = $UserToken->get($uid);
            return $token;
        }

    }

    public function getUser($token=''){
        /* 通过token获取用户信息.*/

        if( (new TokenGet())->goCheck()){
            $UserToken = new UserToken();
            $user = $UserToken->getUserByToken($token);
            return $user;
        }

    }
}