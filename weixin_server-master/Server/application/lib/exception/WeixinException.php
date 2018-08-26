<?php
/**
 * Created by TalentBigData -> ddweb.com.cn @血狼.
 * User: XYC
 * Date: 2017/12/26
 * Time: 19:58
 */

namespace app\lib\exception;


class WeixinException extends BaseException
{
    public $code = 400;
    public $message = "";
    public $errorCode = 300001;
}