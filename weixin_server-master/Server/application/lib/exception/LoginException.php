<?php
/**
 * Created by TalentBigData -> ddweb.com @血狼.
 * User: XYC
 * Date: 2017/12/26
 * Time: 15:09
 */

namespace app\lib\exception;


class LoginException extends BaseException
{
    public $code = 400;
    public $message = "用户名或密码错误";
    public $errorCode = 200001;

}