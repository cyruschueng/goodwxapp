<?php
/**
 * Created by PhpStorm.
 * User: code
 * Date: 1/14/2018
 * Time: 8:12 AM
 */

namespace app\manage\controller\user\customization\weixinheddinlike\model;
use think\Model;

class CustomizationWeixinGroupHiddenLikeConfig extends Model
{

    public static function getUser($user,$pwd)
    {
        $user = self::where([
            "user" => $user,
            "pwd" => $pwd
        ])->find();
        return $user;
    }


}