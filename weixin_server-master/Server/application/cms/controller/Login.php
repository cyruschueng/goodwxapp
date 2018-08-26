<?php
/**
 * Created by PhpStorm.
 * User: XYC
 * Date: 2017/12/24
 * Time: 19:28
 */

namespace app\cms\controller;


class Login
{
    public function login(){
        (new \app\lib\validate\UserPwdBePositive() )->goCheck();
        /*
         * @password 密码
         * @username 账户
         * @api = client 用于对接WHMCS 区别于网页登陆
         * */
        $_POST["password"] = input('password');
        $_POST["username"] = input('username');
        $_POST["api"] = "client";
        /*使用WHCMS的登陆验证模块*/
        $WHMCSLogin = __DIR__."/../../../cloud/dologin.php";
        if( !file_exists( $WHMCSLogin ) ){
            return "WHMCS模块不存在.";
        }
        $isLogin = require $WHMCSLogin;
        if( $isLogin == true){
            dump($_SESSION);
            return "登陆成功";

        }else{
            return "账号密码不正确";
        }
    }
}