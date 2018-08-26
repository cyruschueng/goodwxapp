<?php
/**
 * Created by PhpStorm.
 * User: focus
 * Date: 2017/5/18
 * Time: 0:16
 */

namespace app\focusMobile\controller;
use think\Controller;
use think\Db;

class Online extends Controller
{
    public function index(){

        return $this->fetch();
    }

//留言 提交到数据库
    public function post(){
        if(!trim($_POST['des'])){
            $this->error('请填写您的需求信息！');
        }
        if($_POST['name']){
            $name=$_POST['name'];
        }else{
            $name="匿名";
        }
        if($_POST['phone']){
            $phone=$_POST['phone'];
        }else{
            $phone="未填写";
        }
        if($_POST['email']){
            $email=$_POST['email'];
        }else{
            $email="未填写";
        }

        $data = ['name' => $name,'phone'=>$phone, 'email' => $email,'des'=>$_POST['des']];
        Db::table('online')->insert($data);
        $this->redirect('{$Think.server.script_name}/focusMobile/index/index');
    }

}