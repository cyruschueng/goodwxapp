<?php
/**
 * Created by PhpStorm.
 * User: code
 * Date: 1/13/2018
 * Time: 12:23 AM
 * customization
 */

namespace app\api\model;


class UserWeixins extends BaseModel
{
    protected $hidden = ["openId"];

    public static function add(){
        $re = self::add();
        if(!$re){
            return ["status" => 0];
        }
        return ["status" => 1];
    }

    public static function getByOpenID($openid){
        $userWeixin = self::where("openid","=",$openid)->find();
        return $userWeixin;
    }
}