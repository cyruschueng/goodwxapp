<?php
/**
 * Created by PhpStorm.
 * User: code
 * Date: 1/13/2018
 * Time: 1:07 AM
 */

namespace app\lib\validate;


class UserWeixinsAdd extends BaseValidate
{
    protected $rule = [
        "openId" => "require|isNotEmpty",
        "nickName" =>"require",
        "avatarUrl" =>"require|isNotEmpty"
    ];
}