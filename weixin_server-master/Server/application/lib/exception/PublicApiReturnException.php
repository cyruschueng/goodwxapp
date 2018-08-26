<?php
/**
 * Created by TalentBigData -> ddweb.com.cn @血狼.
 * User: XYC
 * Date: 2017/12/27
 * Time: 15:26
 */

namespace app\lib\exception;


class PublicApiReturnException extends BaseException
{
    public $code = 200;
    public $message = "请求成功";
    public $errorCode = 100001;
}