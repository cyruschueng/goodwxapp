<?php
/**
 * Created by TalentBigData -> ddweb.com.cn @血狼.
 * User: XYC
 * Date: 2017/12/26
 * Time: 15:07
 */

namespace app\lib\exception;

use think\Exception;


class BaseException extends Exception
{
    //HTTP 状态码 400,403等
    public $code= 400;
    //错误具体信息
    public $message = "未知错误";
    //自定义的错误码
    public $errorCode = 999;

    public $shouldToClient = true;

    /**
     * 构造函数，接收一个关联数组
     * @param array $params 关联数组只应包含code、msg和errorCode，且不应该是空值
     */
    public function __construct($params=[])
    {   
        /*确定错误代码*/
        $errorCode = @$params['errorCode'];
        if($errorCode."" != ""){
            $this->errorCode = $errorCode;
        }
        /*引入错误数组*/
        $error_code = include(APP_PATH."api".DS."error_code_".request()->param()["version"].".php");
        $message = $message = @$params['message'];
        if( empty( $message )){
            $message = @$error_code[ $this->errorCode.""];
        }
        if( !empty( $message )){
            $this->message = $message;
        }
        
        if(!is_array($params)){
            return;
        }
        if(array_key_exists('code',$params)){
            $this->code = $params['code'];
        }
        if(array_key_exists('errorCode',$params)){
            $this->errorCode = $params['errorCode'];
        }
    }
}

