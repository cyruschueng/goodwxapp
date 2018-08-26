<?php
/**
 * Created by PhpStorm.
 * User: XYC
 * Date: 2017/12/26
 * Time: 14:58
 */

namespace app\lib\exception;
use think\exception\Handle;
use think\Log;
use think\Request;

class ExceptionHandler extends Handle
{
    public $message="出现错误,请稍候再试..";
    public $code=400;
    public $errorCode=999;

    public function render(\Exception $e){
        if($e instanceof BaseException){
            /*不需要记录,但需要把错误返回给用户*/
            $err = [
                "error_code" => $e->errorCode,
                "message" => $e->message,
                "type" => "user",
            ];
            return json($err,$this->code);
        }else{
            /*系统错误,需要记录日志,但不返回给用户
              在开启调试的情况下,并且在URL中请求debug,则显示原来的错误
            */
            $debug = input('debug');
            $ServerDebug = (Boolean)($debug == "true");
            $GetDebug = (Boolean)( !empty( $debug ) );

            if( config("app_debug") == true && $ServerDebug ){
                return parent::render($e);
            }else{
                $message = ( $GetDebug ?  $e->getMessage() : $this->message );/*系统的错误将被记录*/
                $this->LogErrorFile($message);
                $Request = Request::instance();
                $err = [
                    "error_code" => $this->errorCode,
                    "message" => $message,
                    "request_url" => $Request->url(),
                    "type" => "service",
                ];
                return json($err,$this->code);
            }
        }
    }

    /*将系统错误记录到日志*/
    private function LogErrorFile($message){
        /*初始化一个错误记录*/
        Log::init([
            'type'  => 'File',
            'path'  => LOG_PATH,
            'level' => ["error"],
        ]);
        Log::record( $message ,"error");
    }

}