<?php
/**
 * Created by PhpStorm.
 * User: focus
 * Date: 2017/5/17
 * Time: 23:31
 */

namespace app\focusMobile\controller;
use think\Controller;
use think\Db;

class Cases extends Controller
{
    public function index($sort=0){

        $casessort=Db::table('casesort')->where('name','<>',' ')->select();
        $this->assign('casessort',$casessort);
        if($sort==0){
            $info=Db::table('case')->select();
        }else{
            $info=Db::table('case')->where('sortid',$sort)->select();
        }
        $this->assign('info',$info);
        // 渲染模板输出
        return $this->fetch();
    }

    public function cases_info($id){
        $casessort=Db::table('casesort')->where('name','<>',' ')->select();
        $this->assign('casessort',$casessort);
        $info=Db::table('case')->where('id',$id)->find();
        $this->assign('info',$info);
        // 渲染模板输出
        return $this->fetch();
    }
}