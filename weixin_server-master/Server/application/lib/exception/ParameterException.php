<?php
/**
 * Created by TalentBigData -> ddweb.com.cn @血狼.
 * User: XYC
 * Date: 2017/12/26
 * Time: 19:58
 */

namespace app\lib\exception;


class ParameterException extends BaseException
{
    public $code = 400;
    public $message = "参数错误";
    public $errorCode = 100001;
}