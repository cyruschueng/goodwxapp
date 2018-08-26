<?php
namespace app\focusPc\controller;
use think\Controller;
use think\Db;
class Index extends Controller
{
    public function index()
    {
        //banner
        $banner=Db::table('banner')->where('url','<>',' ')->limit(2)->order('id','asc')->select();
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
        //取出仪器设备 按id逆序
        $equipment_list=Db::table('equipment')->where('img','<>',' ')->order('id desc')->limit(9)->select();
        $this->assign('equipment_list',$equipment_list);
        //取出师资力量 按id逆序
        $teacher_list=Db::table('teacher')->where('headurl','<>',' ')->order('id desc')->limit(9)->select();
        $this->assign('teacher_list',$teacher_list);
        //取出学生团队 按id逆序
        $student_list=Db::table('student')->where('headurl','<>',' ')->order('id desc')->limit(8 )->select();
        $this->assign('student_list',$student_list);
        //取出新闻 按id逆序
        $news_list=Db::table('news')->where('title','<>',' ')->order('id desc')->limit(5)->select();
        $this->assign('news_list',$news_list);
        //取出成功案例 按id逆序
        $case_list=Db::table('case')->where('img','<>',' ')->order('id desc')->limit(10)->select();
        $this->assign('case_list',$case_list);
        //取出技术中心 按id逆序
        $technology_list=Db::table('technology')->where('title','<>',' ')->order('id desc')->limit(10)->select();
        $this->assign('technology_list',$technology_list);
        //取出关于我们
        $us=Db::table('contactus')->where('id','1')->find();
        $this->assign('us',$us);
        // 渲染模板输出
        return $this->fetch();
    }
}
