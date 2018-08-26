<?php
/**
 * Created by PhpStorm.
 * User: code
 * Date: 1/13/2018
 * Time: 2:22 AM
 */

namespace app\api\service;


class WeixinToken
{
    //生成一个token
    public static function generateToken(){
        //32字符
        $ranChars =  createRandomString(32);
        $timestmap = time();
        $ranChars = substr(sha1($ranChars).md5($timestmap ),0,40);
        return $ranChars;
    }
}