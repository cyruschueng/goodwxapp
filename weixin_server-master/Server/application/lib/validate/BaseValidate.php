<?php
/**
 * Created by PhpStorm.
 * User: XYC
 * Date: 2017/12/24
 * Time: 16:51
 */

namespace app\lib\validate;
use app\lib\exception\ParameterException;
use think\Validate;
use think\Request;


class BaseValidate extends Validate
{
    public function goCheck(){
        //获取HTTP传入的参数
        //对得到的参数进行校验
        $request = Request::instance();
        $params = $request->param();
        /*单个验证,批量验证时,全局AOP错误会出错*/
        $result = $this->check($params);
        if(!$result){
            throw new ParameterException([
                "message" => $this->getError()
            ]);
        }else{
            return true;
        }
    }
}