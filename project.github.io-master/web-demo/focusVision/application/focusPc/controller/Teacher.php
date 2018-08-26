<?php
namespace app\focusPc\controller;
use think\Controller;
use think\Db;

class Teacher extends Controller
{
    public function index($sortid=0){
        //banner
        $banner=Db::table('banner')->where('url','<>',' ')->limit(2)->order('id','desc')->select();
        $this->assign('bannerAraay',$banner);
        //老师种类查询
        $teachersort=Db::table('teachersort')->where('name','<>',' ')->select();
        $this->assign('teachersort',$teachersort);
        //学生种类查询
        $studentsort=Db::table('studentsort')->where('name','<>',' ')->select();
        $this->assign('studentsort',$studentsort);
        //设备种类查询
        $equipmentsort=Db::table('equipmentsort')->where('name','<>',' ')->select();
        $this->assign('equipmentsort',$equipmentsort);
        //成功案例种类查询
        $casesort=Db::table('casesort')->where('name','<>',' ')->select();
        $this->assign('casesort',$casesort);
        //技术中心种类查询
        $technologysort=Db::table('technologysort')->where('name','<>',' ')->select();
        $this->assign('technologysort',$technologysort);
        //取出关于我们
        $us=Db::table('contactus')->where('id','1')->find();
        $this->assign('us',$us);

        //取出老师
        if($sortid==0){
            $teacher_list=Db::table('teacher')->where('headurl','<>','')->order('id','asc')->select();
            $sortname=' ';
        }else{
            $teacher_list=Db::table('teacher')->where('sortid',$sortid)->order('id','asc')->select();
            $sortname=Db::table('teachersort')->where('id',$sortid)->find();
        }
        $this->assign('sortid',$sortid);
        $this->assign('sortname',$sortname);
        $this->assign('teacher_list',$teacher_list);
        return $this->fetch();
    }

    public function teacher_info($id){
        //banner
        $banner=Db::table('banner')->where('url','<>',' ')->limit(2)->order('id','desc')->select();
        $this->assign('bannerAraay',$banner);
        //老师种类查询
        $teachersort=Db::table('teachersort')->where('name','<>',' ')->select();
        $this->assign('teachersort',$teachersort);
        //学生种类查询
        $studentsort=Db::table('studentsort')->where('name','<>',' ')->select();
        $this->assign('studentsort',$studentsort);
        //设备种类查询
        $equipmentsort=Db::table('equipmentsort')->where('name','<>',' ')->select();
        $this->assign('equipmentsort',$equipmentsort);
        //成功案例种类查询
        $casesort=Db::table('casesort')->where('name','<>',' ')->select();
        $this->assign('casesort',$casesort);
        //技术中心种类查询
        $technologysort=Db::table('technologysort')->where('name','<>',' ')->select();
        $this->assign('technologysort',$technologysort);

        //取出关于我们
        $us=Db::table('contactus')->where('id','1')->find();
        $this->assign('us',$us);

        //取出老师
        $teacher=Db::table('teacher')->where('id',$id)->find();
        $this->assign('teacher',$teacher);

        $idpre=$id-1;
        $idnext=$id+1;
        $pre=Db::table('teacher')->where('id',$idpre)->find();
        $next=Db::table('teacher')->where('id',$idnext)->find();
        $this->assign('pre',$pre);
        $this->assign('next',$next);

        return $this->fetch();
    }
}