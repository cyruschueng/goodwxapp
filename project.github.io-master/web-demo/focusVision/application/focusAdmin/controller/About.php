<?php
namespace app\focusAdmin\controller;
use think\Controller;
use think\Db;
class About extends Controller
{
    //工作室简介
    public function index()
    {
        $info=Db::table('contactus')->where('id','1')->find();
        $this->assign('info',$info);
        return $this->fetch();
    }

    //处理提交的工作室简介修改
    public function modides(){
        Db::table('contactus')
            ->where('id', 1)
            ->update(['des' => $_POST['des']]);

        $this->redirect('{$Think.server.script_name}/focusAdmin/about/index');
    }

    //工作室文化
    public function culture()
    {
        $info=Db::table('contactus')->where('id','1')->find();
        $this->assign('info',$info);
        return $this->fetch();
    }

    //处理提交的工作室简介修改
    public function modiculture(){
        Db::table('contactus')
            ->where('id', 1)
            ->update(['culture' => $_POST['culture']]);
        $this->redirect('{$Think.server.script_name}/focusAdmin/about/culture');
    }

    //工作室荣誉资质
    public function honor()
    {
        $info=Db::table('honor')->where('img','<>',' ')->select();
        $this->assign('info',$info);
        return $this->fetch();
    }

    //工作室荣誉资质的修改页面 文字
    public function modi_honor_word($id){
        $info=Db::table('honor')->where('id',$id)->find();
        $this->assign('info',$info);
        return $this->fetch();
    }

    //工作室荣誉资质的修改页面 图片
    public function modi_honor_img($id){
        $info=Db::table('honor')->where('id',$id)->find();
        $this->assign('info',$info);
        return $this->fetch();
    }

    //荣誉资质文字的修改  提交到数据库
    public function post_honor_word(){
        $id=$_POST['id'];
        Db::table('honor')
            ->where('id', $id)
            ->update(['title' => $_POST['title'],'des'=>$_POST['des']]);
        $this->redirect('{$Think.server.script_name}/focusAdmin/About/honor');

    }

    //荣誉资质图片的修改  提交到数据库
    public function post_honor_img(){
        $id=$_POST['id'];
        $info = Db::table('honor')->where('id', $id)->find();
        $this->assign('info', $info);

        // 获取表单上传文件 例如上传了001.jpg
        $file = request()->file('image');
        if ($file) {

        } else {
            $this->error('请选择图片');
        }
        // 移动到框架应用根目录/public/uploads/ 目录下
        $info = $file->move(ROOT_PATH . 'public' . DS . 'static' . DS . 'img');
        if ($info) {
            // 成功上传后 获取上传信息
            $a = $info->getSaveName();
            $name = $info->getFilename();
            $a = dirname($a);
            $path = "http://localhost/focusVision/public/static/img/" . $a . "/" . $name;
            Db::table('honor')
                ->where('id', $id)
                ->update(['img' => $path]);
            $this->redirect('{$Think.server.script_name}/focusAdmin/about/honor');
        } else {
            // 上传失败获取错误信息
            echo $file->getError() . "上传失败";
        }

    }

    //删除荣誉资质
    public function delete_honor($id){
        Db::table('honor')->delete($id);
        $this->redirect('{$Think.server.script_name}/focusAdmin/about/honor');
    }

    //添加荣誉资质
    public function add_honor(){

        return $this->fetch();
    }


    //添加荣誉资质 提交到数据库
    public function post_add_honor(){
        // 获取表单上传文件 例如上传了001.jpg
        $file = request()->file('image');
        if ($file) {

        } else {
            $this->error('请选择图片');
        }
        if(!$_POST['title']){
            $this->error('请填写标题');
        }
        if(!$_POST['des']){
            $this->error('请完善荣誉资质的详情描述');
        }
        // 移动到框架应用根目录/public/uploads/ 目录下
        $info = $file->move(ROOT_PATH . 'public' . DS . 'static' . DS . 'img');
        if ($info) {
            // 成功上传后 获取上传信息
            $a = $info->getSaveName();
            $name = $info->getFilename();
            $a = dirname($a);
            $path = "http://localhost/focusVision/public/static/img/" . $a . "/" . $name;
        } else {
            // 上传失败获取错误信息
            echo $file->getError() . "上传失败";
        }
        $data = ['img' => $path, 'title' => $_POST['title'],'des'=>$_POST['des']];
        Db::table('honor')->insert($data);
        $this->redirect('{$Think.server.script_name}/focusAdmin/about/honor');
    }


}
