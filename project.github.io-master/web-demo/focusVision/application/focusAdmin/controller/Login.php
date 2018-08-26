<?php
namespace app\focusAdmin\controller;
use think\Controller;
use think\Db;
class Login extends Controller
{
    public function index(){

        return $this->fetch();
    }

    //处理登录
    public function post_login(){
        if(!$_POST['number']){
            $this->error('请输入工号');
        }
        if(!$_POST['password']){
            $this->error('请输入密码');
        }
        $password=md5($_POST['password']);
        $info=Db::table('admin')->where('number',$_POST['number'])->where('password',$password)->find();
        if($info==''){
            $this->error('工号或密码错误');
        }
        cookie('id',$info['id']);
        $this->redirect('{$Think.server.script_name}/focusAdmin/index/index');
    }

    //退出登录
    public function logout(){
        cookie('id',null);
        $this->redirect('{$Think.server.script_name}/focusAdmin/login/index');
    }


}
