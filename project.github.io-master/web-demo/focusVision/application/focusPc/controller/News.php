<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/5/5
 * Time: 9:01
 */

namespace app\focusPc\controller;
use think\Controller;
use think\Db;

class News extends Controller
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

        //取出新闻
        if($sortid==0){
            $news_list=Db::table('news')->where('title','<>','')->order('id','desc')->select();
            $sortname=' ';
        }else{
            $news_list=Db::table('news')->where('title','<>','')->order('id','desc')->select();
            $sortname=Db::table('news')->where('id',$sortid)->find();
        }
        $this->assign('sortid',$sortid);
        $this->assign('sortname',$sortname);
        $this->assign('news_list',$news_list);
        return $this->fetch();
    }

    public function news_info($id){
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

        //取出新闻
        $news=Db::table('news')->where('id',$id)->find();
        $this->assign('news',$news);

        $idpre=$id-1;
        $idnext=$id+1;
        $pre=Db::table('news')->where('id',$idpre)->find();
        $next=Db::table('news')->where('id',$idnext)->find();
        $this->assign('pre',$pre);
        $this->assign('next',$next);

        return $this->fetch();
    }
}