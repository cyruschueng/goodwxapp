<?php
/**
 * Created by PhpStorm.
 * User: XYC
 * Date: 2017/12/24
 * Time: 20:03
 */

namespace app\lib\validate;

class UserPwdBePositive extends BaseValidate
{
    /*
     * 用户名及密码验证.
     * @user post 小于40长度
     * @pwd post 小于30长度
     * */
    protected $rule = [
        "username" => "require|regex:/^[0-9\_a-zA-Z\@\.]{6,40}$/",
        "password" => "require|max:30|min:6"
    ];

}