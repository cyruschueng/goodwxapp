<?php
/**
 * Created by PhpStorm.
 * User: code
 * Date: 1/6/2018
 * Time: 4:47 AM
 */

namespace app\lib\validate;


class TokenGet extends BaseValidate
{
        protected $rule = [
            "u_id" => "require",
            "code" => "require"
        ];

        protected $message = [
            "u_id" => "必须提交u_id.",
            "code" => "必须提交code."
        ];

}