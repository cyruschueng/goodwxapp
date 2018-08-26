<?php
namespace app\focusAdmin\controller;
use think\Controller;
use think\Db;
class Teacher extends Controller
{
    //老师列表
    public function index()
    {
        $info=Db::table('teacher')->where('id','<>','')->select();
        $this->assign('info',$info);
        return $this->fetch();
    }

    //老师的修改页面 文字
    public function modi_teacher_word($id){
        $info=Db::table('teacher')->where('id',$id)->find();
        $this->assign('info',$info);

        //获取老师的分类
        $sort=Db::table('teachersort')->where('id','<>','')->select();
        $this->assign('sort',$sort);
        return $this->fetch();
    }

    //老师的修改页面 图片
    public function modi_teacher_img($id){
        $info=Db::table('teacher')->where('id',$id)->find();
        $this->assign('info',$info);
        return $this->fetch();
    }

    //老师文字的修改  提交到数据库
    public function post_teacher_word(){
        $id=$_POST['id'];
        Db::table('teacher')
            ->where('id', $id)
            ->update(['sortid'=>$_POST['sort'],'name' => $_POST['name'],'des'=>$_POST['des']]);
        $this->redirect('{$Think.server.script_name}/focusAdmin/teacher/index');

    }

    //老师图片的修改  提交到数据库
    public function post_teacher_img(){
        $id=$_POST['id'];
        // 获取表单上传文件 例如上传了001.jpg
        $file = request()->file('image');
        if ($file) {

        } else {
            $this->error('请重新选择图片');
        }
        // 移动到框架应用根目录/public/uploads/ 目录下
        $info = $file->move(ROOT_PATH . 'public' . DS . 'static' . DS . 'img');
        if ($info) {
            // 成功上传后 获取上传信息
            $a = $info->getSaveName();
            $name = $info->getFilename();
            $a = dirname($a);
            $path = "http://localhost/focusVision/public/static/img/" . $a . "/" . $name;
            Db::table('teacher')
                ->where('id', $id)
                ->update(['headurl' => $path]);
            $this->redirect('{$Think.server.script_name}/focusAdmin/teacher/index');
        } else {
            // 上传失败获取错误信息
            echo $file->getError() . "上传失败";
        }

    }

    //删除老师
    public function delete_teacher($id){
        Db::table('teacher')->delete($id);
        $this->redirect('{$Think.server.script_name}/focusAdmin/teacher/index');
    }

    //添加老师
    public function add_teacher(){
        //获取老师的分类
        $sort=Db::table('teachersort')->where('id','<>','')->select();
        $this->assign('sort',$sort);
        return $this->fetch();
    }


    //添加老师 提交到数据库
    public function post_add_teacher(){
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
        } else {
            // 上传失败获取错误信息
            echo $file->getError() . "上传失败";
        }
        if(!$_POST['name']){
            $this->error('请填写姓名');
        }
        if(!$_POST['des']){
            $this->error('请对这位老师进行简单描述');
        }
        $data = ['headurl' => $path,'sortid'=>$_POST['sort'], 'name' => $_POST['name'],'des'=>$_POST['des']];
        Db::table('teacher')->insert($data);
        $this->redirect('{$Think.server.script_name}/focusAdmin/teacher/index');
    }

    //分类列表
    public function sort(){
        $list=Db::table('teachersort')->where('id','<>','')->select();
        $this->assign('list',$list);

        return $this->fetch();
    }

    //删除分类
    public function delete_sort($id){
        Db::table('teachersort')->delete($id);
        $this->redirect('{$Think.server.script_name}/focusAdmin/teacher/sort');
    }

    //修改分类
    public function modi_sort($id){
        $info=Db::table('teachersort')->where('id',$id)->find();
        $this->assign('info',$info);

        return $this->fetch();
    }

    //修改分类 提交到数据库
    public function post_sort(){
        $id=$_POST['id'];
        Db::table('teachersort')
            ->where('id', $id)
            ->update(['name' => $_POST['name']]);
        $this->redirect('{$Think.server.script_name}/focusAdmin/teacher/sort');

    }

    //添加分类
    public function add_sort(){
        return $this->fetch();
    }

    //添加分类 提交到数据库
    public function post_sort_add(){
        if(!$_POST['name']){
            $this->error('请填写分类名称');
        }
        $data = ['name' => $_POST['name']];
        Db::table('teachersort')->insert($data);
        $this->redirect('{$Think.server.script_name}/focusAdmin/teacher/sort');
    }


}
