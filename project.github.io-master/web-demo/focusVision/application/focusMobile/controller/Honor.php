<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/5/5
 * Time: 9:02
 */

namespace app\focusMobile\controller;
use think\Controller;
use app\focusMobile\model\Honorus;

class Honor extends Controller
{
    public function honor($sort=1){
        $honorus=new Honorus();
        $honorArray=$honorus->where('sort',$sort)->order('id','desc')->select();
        if($sort==1){
            $sortinfo="学校资质证书";
        }elseif ($sort==2){
            $sortinfo="省市资质证书";
        }elseif ($sort==3){
            $sortinfo="国内资质证书";
        }else{
            $sortinfo="国际资质证书";
        }
        $this->assign('sortinfo',$sortinfo);
        $this->assign('honorArray',$honorArray);
        return $this->fetch();
    }

    public function honor_info($id,$sort){
        $info=Honorus::get($id);
        if($sort==1){
            $sortinfo="学校资质证书";
        }elseif ($sort==2){
            $sortinfo="省市资质证书";
        }elseif ($sort==3){
            $sortinfo="国内资质证书";
        }else{
            $sortinfo="国际资质证书";
        }
        $this->assign('sortinfo',$sortinfo);
        $this->assign('info',$info);
        return $this->fetch();
    }
}