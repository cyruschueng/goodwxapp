<?php
namespace app\focusPc\controller;
use think\Controller;
use think\Db;

class Equipment extends Controller
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

        //取出设备
        if($sortid==0){
            $list=Db::table('equipment')->where('img','<>','')->order('id','desc')->select();
            $sortname=' ';
        }else{
            $list=Db::table('equipment')->where('sort',$sortid)->order('id','desc')->select();
            $sortname=Db::table('equipmentsort')->where('id',$sortid)->find();
        }
        $this->assign('sortid',$sortid);
        $this->assign('sortname',$sortname);
        $this->assign('list',$list);
        return $this->fetch();
    }

    public function info($id){
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

        //取出设备
        $equipment=Db::table('equipment')->where('id',$id)->find();
        $this->assign('equipment',$equipment);

        $idpre=$id-1;
        $idnext=$id+1;
        $pre=Db::table('equipment')->where('id',$idpre)->find();
        $next=Db::table('equipment')->where('id',$idnext)->find();
        $this->assign('pre',$pre);
        $this->assign('next',$next);

        return $this->fetch();
    }
}