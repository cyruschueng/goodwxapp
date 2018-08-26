<?php
namespace app\focusAdmin\controller;
use think\Controller;
use think\Db;
class Index extends Controller
{
    public function index()
    {
        if(!isset($_COOKIE['id'])){
            $this->redirect('{$Think.server.script_name}/focusAdmin/login/index');
        }
        $list=Db::table('admin')->where('id','<>','')->select();
        $this->assign('list',$list);
        return $this->fetch();
    }

    public function banner()
    {
        //取出banner图
        $info=Db::table('banner')->where('id','<>',' ')->order('id','desc')->limit(3)->select();
        $this->assign('info',$info);
        return $this->fetch();
    }

    public function upload(){
        // 获取表单上传文件 例如上传了001.jpg
        $file = request()->file('image');
        if($file){

        }else{
            $this->redirect('{$Think.server.script_name}/focusAdmin/index/banner');
        }
        // 移动到框架应用根目录/public/uploads/ 目录下
        $info = $file->move(ROOT_PATH . 'public' . DS . 'static'.DS.'img');
        if($info){
            // 成功上传后 获取上传信息
              $a=$info->getSaveName();
              $name=$info->getFilename();
              $a=dirname($a);
              $path="http://localhost/focusVision/public/static/img/".$a."/".$name;
              echo $path;
              $data = ['url' => $path];
              Db::table('banner')->insert($data);
            //重定向到News模块的Category操作
            $this->redirect('{$Think.server.script_name}/focusAdmin/index/banner');
             //$this->success('更新成功', '');
        }else{
            // 上传失败获取错误信息
            echo $file->getError()."上传失败";
        }
    }

    //删除管理员
    public function delete($id){
        Db::table('admin')->delete($id);
        $this->redirect('{$Think.server.script_name}/focusAdmin/index/index');
    }

    //添加管理员
    public function add(){
        $info= Db::table('admin')->where('id','<>','d')->order('id','desc')->find();
        $number=$info['number']+1;
        $this->assign('number',$number);
        return $this->fetch();
    }

    public function post_add(){
        if(!$_POST['name'] || !$_POST['password'] || !$_POST['repassword'] || !$_POST['phone'] || !$_POST['email'] || !$_POST['address']){
            $this->error('请填写全部信息');
        }
        if($_POST['password'] != $_POST['repassword']){
            $this->error('两次密码不相同');
        }
        $password=md5($_POST['password']);
        $data = ['number' => $_POST['number'],'name'=>$_POST['name'], 'password' => $password,'phone'=>$_POST['phone'],'email'=>$_POST['email'],'address'=>$_POST['address']];
        Db::table('admin')->insert($data);
        $this->redirect('{$Think.server.script_name}/focusAdmin/index/index');
    }

    //个人中心
    public function my(){
        $info= Db::table('admin')->where('id',$_COOKIE['id'])->find();
        $this->assign('info',$info);
        return $this->fetch();
    }

    //个人修改 提交到数据库
    public function post_my(){
        Db::table('admin')
            ->where('id', $_COOKIE['id'])
            ->update(['number' => $_POST['number'],'name'=>$_POST['name'],'phone'=>$_POST['phone'],'email'=>$_POST['email'],'address'=>$_POST['address']]);
        $this->redirect('{$Think.server.script_name}/focusAdmin/index/index');
    }
}
