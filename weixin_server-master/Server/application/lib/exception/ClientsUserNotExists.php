<?php
/**
 * Created by PhpStorm.
 * User: code
 * Date: 1/6/2018
 * Time: 5:45 AM
 */

namespace app\lib\exception;


class ClientsUserNotExists extends BaseException
{
    public $code = 400;
    public $message = "";
    public $errorCode = 200004;
}