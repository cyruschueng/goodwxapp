<?php
/**
 * Created by PhpStorm.
 * User: code
 * Date: 1/14/2018
 * Time: 8:12 AM
 */

namespace app\api\model;


class CustomizationWeixinGroupHiddenLikeConfig extends BaseModel
{
    protected $hidden = ["user","pwd"];

    public static function getInit($u_id)
    {
        $config = self::where("u_id","=",$u_id)
            ->find();
        return $config;
    }
}