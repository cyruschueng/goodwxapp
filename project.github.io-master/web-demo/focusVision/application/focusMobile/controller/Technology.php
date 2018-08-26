<?php
/**
 * Created by PhpStorm.
 * User: focus
 * Date: 2017/5/17
 * Time: 23:59
 */

namespace app\focusMobile\controller;
use think\Controller;
use think\Db;

class Technology extends Controller
{
    public function index($sort=0){
        $technologysort=Db::table('technologysort')->where('name','<>',' ')->select();
        $this->assign('technologysort',$technologysort);
        if($sort==0){
            $info=Db::table('technology')->select();
        }else{
            $info=Db::table('technology')->where('sortid',$sort)->select();
        }
        $this->assign('info',$info);
        // 渲染模板输出
        return $this->fetch();
    }

    public function technology_info($id){
        $technologysort=Db::table('technologysort')->where('name','<>',' ')->select();
        $this->assign('technologysort',$technologysort);
        $list=Db::table('technology')->where('id',$id)->find();
        $this->assign('list',$list);
        // 渲染模板输出
        return $this->fetch();
    }

}