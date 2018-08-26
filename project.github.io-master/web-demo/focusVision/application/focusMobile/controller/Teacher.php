<?php
/**
 * Created by PhpStorm.
 * User: focus
 * Date: 2017/5/17
 * Time: 22:32
 */

namespace app\focusMobile\controller;
use think\Controller;
use think\Db;

class Teacher extends Controller
{
    public function index($sort=0){
        //老师种类查询
        $teachersort=Db::table('teachersort')->where('name','<>',' ')->select();
        $this->assign('teachersort',$teachersort);
        if($sort==0){
            $info=Db::table('teacher')->select();
        }else{
            $info=Db::table('teacher')->where('sortid',$sort)->select();
        }
        $this->assign('info',$info);
        // 渲染模板输出
        return $this->fetch();
    }

    public function teacher_info($id){
        $teachersort=Db::table('teachersort')->where('name','<>',' ')->select();
        $this->assign('teachersort',$teachersort);
        $info=Db::table('teacher')->where('id',$id)->find();
        $this->assign('info',$info);
        // 渲染模板输出
        return $this->fetch();
    }

}