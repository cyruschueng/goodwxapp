<?php
namespace app\focusAdmin\controller;
use think\Controller;
use think\Db;
class Contact extends Controller
{

    public function index()
    {
        $info=Db::table('contactus')->where('id','1')->find();
        $this->assign('info',$info);
        return $this->fetch();
    }

    //保存修改到数据库
    public function post_modi(){
        Db::table('contactus')
            ->where('id', 1)
            ->update(['person' => $_POST['person'],'phone'=>$_POST['phone'],'email'=>$_POST['email'],'address'=>$_POST['address']]);
        $this->redirect('{$Think.server.script_name}/focusAdmin/contact/index');
    }

    //修改地图
    public function map(){
        $info=Db::table('contactus')->where('id','1')->find();
        $this->assign('info',$info);
        return $this->fetch();
    }

    public function post_map(){

        // 获取表单上传文件 例如上传了001.jpg
        $file = request()->file('image');
        if ($file) {

        } else {
            $this->redirect('{$Think.server.script_name}/focusAdmin/contact/map');
        }
        // 移动到框架应用根目录/public/uploads/ 目录下
        $info = $file->move(ROOT_PATH . 'public' . DS . 'static' . DS . 'img');
        if ($info) {
            // 成功上传后 获取上传信息
            $a = $info->getSaveName();
            $name = $info->getFilename();
            $a = dirname($a);
            $path = "http://localhost/focusVision/public/static/img/" . $a . "/" . $name;
            Db::table('contactus')
                ->where('id', 1)
                ->update(['map' => $path]);
            $this->redirect('{$Think.server.script_name}/focusAdmin/contact/map');
        } else {
            // 上传失败获取错误信息
            echo $file->getError() . "上传失败";
        }

    }



}
