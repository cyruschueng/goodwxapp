<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/5/5
 * Time: 9:01
 */

namespace app\focusMobile\controller;
use think\Controller;
use think\Db;

class News extends Controller
{
    public function index(){
        $list=Db::table('news')->order('id','desc')->select();
        $this->assign('list',$list);
        return $this->fetch();
    }

    public function news_info($id){
        $list=Db::table('news')->where('id',$id)->find();
        $this->assign('list',$list);
        return $this->fetch();
    }

}