<?php
/**
 * Created by PhpStorm.
 * User: focus
 * Date: 2017/5/17
 * Time: 23:21
 */

namespace app\focusMobile\controller;
use think\Controller;
use think\Db;

class Equipment extends Controller
{
    public function index($sort=0){
        //老师种类查询
        $equipmentsort=Db::table('equipmentsort')->where('name','<>',' ')->select();
        $this->assign('equipmentsort',$equipmentsort);
        if($sort==0){
            $info=Db::table('equipment')->select();
        }else{
            $info=Db::table('equipment')->where('sort',$sort)->select();
        }
        $this->assign('info',$info);
        // 渲染模板输出
        return $this->fetch();
    }

    public function equipment_info($id){
        $equipmentsort=Db::table('equipmentsort')->where('name','<>',' ')->select();
        $this->assign('equipmentsort',$equipmentsort);
        $info=Db::table('equipment')->where('id',$id)->find();
        $this->assign('info',$info);
        // 渲染模板输出
        return $this->fetch();
    }
}