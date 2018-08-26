<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/5/5
 * Time: 9:01
 */

namespace app\focusMobile\controller;
use think\Controller;
use app\focusMobile\model\Showus;

class Show extends Controller
{
    public function show(){
        $showus=new Showus();
        $showArray=$showus->where('sort','1')->order('time','desc')->select();
        $this->assign('showArray',$showArray);
        return $this->fetch();
    }

    public function show_info($id){
        $showus=new Showus();
        $showinfo=showus::get($id);
        $this->assign('showinfo',$showinfo);
        return $this->fetch();
    }

    public function show_student(){
        $showus=new Showus();
        $showArray=$showus->where('sort','2')->order('time','desc')->select();
        $this->assign('showArray',$showArray);
        return $this->fetch();
    }

    public function show_student_info($id){
        $showus=new Showus();
        $showinfo=showus::get($id);
        $this->assign('showinfo',$showinfo);
        return $this->fetch();
    }

    public function show_team(){
        $showus=new Showus();
        $showArray=$showus->where('sort','3')->order('time','desc')->select();
        $this->assign('showArray',$showArray);
        return $this->fetch();
    }

    public function show_team_info($id){
        $showus=new Showus();
        $showinfo=showus::get($id);
        $this->assign('showinfo',$showinfo);
        return $this->fetch();
    }

    public function show_award(){
        $showus=new Showus();
        $showArray=$showus->where('sort','4')->order('time','desc')->select();
        $this->assign('showArray',$showArray);
        return $this->fetch();
    }

    public function show_award_info($id){
        $showus=new Showus();
        $showinfo=showus::get($id);
        $this->assign('showinfo',$showinfo);
        return $this->fetch();
    }
}