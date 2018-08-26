<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/5/5
 * Time: 8:34
 */

namespace app\focusMobile\controller;
use think\Controller;
use think\Db;

class About extends Controller
{
   public function index(){

       //取出关于我们
       $us=Db::table('contactus')->where('id','1')->find();
       $this->assign('us',$us);
       // 渲染模板输出
       return $this->fetch();
   }

    public function culture(){

        //取出关于我们
        $us=Db::table('contactus')->where('id','1')->find();
        $this->assign('us',$us);
        // 渲染模板输出
        return $this->fetch();
    }

    public function honor(){
        //取出荣誉资质
        $info=Db::table('honor')->order('id','desc')->select();
        $this->assign('info',$info);
        // 渲染模板输出
        return $this->fetch();
    }

    public function honor_info($id){
        //取出荣誉资质
        $info=Db::table('honor')->where('id',$id)->find();
        $this->assign('info',$info);
        return $this->fetch();
    }

}