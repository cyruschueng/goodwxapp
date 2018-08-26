<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/5/5
 * Time: 9:01
 */

namespace app\focusMobile\controller;
use think\Controller;
use app\focusMobile\model\Funus;

class Fun extends Controller
{
    public function fun(){
        $funus=new Funus();
        $funArray=$funus->where('sort','1')->order('id','desc')->select();
        $this->assign('funArray',$funArray);
        return $this->fetch();
    }

    public function img($id){
        $funArray=Funus::get($id);
        $this->assign('funArray',$funArray);
        return $this->fetch();
    }

    public function room(){
        $funus=new Funus();
        $funArray=$funus->where('sort','2')->order('id','desc')->select();
        $this->assign('funArray',$funArray);
        return $this->fetch();
    }

}