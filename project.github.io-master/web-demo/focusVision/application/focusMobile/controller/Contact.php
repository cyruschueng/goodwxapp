<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/5/5
 * Time: 9:02
 */

namespace app\focusMobile\controller;
use think\Controller;
use think\Db;

class Contact extends Controller
{
    public function index(){
        //取出关于我们
        $us=Db::table('contactus')->where('id','1')->find();
        $this->assign('contactus',$us);
        return $this->fetch();
    }
}