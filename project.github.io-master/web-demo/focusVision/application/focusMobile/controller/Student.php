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

class Student extends Controller
{
    public function index($sort=0){
        $studentsort=Db::table('studentsort')->where('name','<>',' ')->select();
        $this->assign('studentsort',$studentsort);
        if($sort==0){
            $info=Db::table('student')->select();
        }else{
            $info=Db::table('student')->where('sort',$sort)->select();
        }
        $this->assign('info',$info);
        // 渲染模板输出
        return $this->fetch();
    }

    public function student_info($id){
        $sort=Db::table('studentsort')->where('name','<>',' ')->select();
        $this->assign('sort',$sort);
        $info=Db::table('student')->where('id',$id)->find();
        $this->assign('info',$info);
        // 渲染模板输出
        return $this->fetch();
    }

}