<?php
namespace app\focusAdmin\controller;
use think\Controller;
use think\Db;
class Cases extends Controller
{
    //案例列表
    public function index()
    {
        $info=Db::table('case')->where('id','<>','')->order('id','desc')->select();
        $this->assign('info',$info);
        return $this->fetch();
    }

    //案例的修改页面 文字
    public function modi_cases_word($id){
        $info=Db::table('case')->where('id',$id)->find();
        $this->assign('info',$info);

        //获取案例的分类
        $sort=Db::table('casesort')->where('id','<>','')->select();
        $this->assign('sort',$sort);
        return $this->fetch();
    }

    //案例的修改页面 图片
    public function modi_cases_img($id){
        $info=Db::table('case')->where('id',$id)->find();
        $this->assign('info',$info);
        return $this->fetch();
    }

    //案例文字的修改  提交到数据库
    public function post_cases_word(){
        $id=$_POST['id'];
        Db::table('case')
            ->where('id', $id)
            ->update(['sortid'=>$_POST['sort'],'title' => $_POST['name'],'url'=>$_POST['url'],'des'=>$_POST['des']]);
        $this->redirect('{$Think.server.script_name}/focusAdmin/cases/index');
    }

    //案例图片的修改  提交到数据库
    public function post_cases_img(){
        $id=$_POST['id'];
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
            Db::table('case')
                ->where('id', $id)
                ->update(['img' => $path]);
            $this->redirect('{$Think.server.script_name}/focusAdmin/cases/index');
        } else {
            // 上传失败获取错误信息
            echo $file->getError() . "上传失败";
        }

    }

    //删除案例
    public function delete_cases($id){
        Db::table('case')->delete($id);
        $this->redirect('{$Think.server.script_name}/focusAdmin/cases/index');
    }

    //添加案例
    public function add_cases(){
        //获取分类
        $sort=Db::table('casesort')->where('id','<>','')->select();
        $this->assign('sort',$sort);
        return $this->fetch();
    }


    //添加案例 提交到数据库
    public function post_add_cases(){
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
            $this->error('请填写案例名称');
        }
        if(!$_POST['des']){
            $this->error('请填对这个案例进行简单介绍');
        }
        if(!$_POST['url']){
            $_POST['url']=1;
        }
        $data = ['img' => $path,'sortid'=>$_POST['sort'], 'title' => $_POST['name'],'des'=>$_POST['des'],'url'=>$_POST['url']];
        Db::table('case')->insert($data);
        $this->redirect('{$Think.server.script_name}/focusAdmin/cases/index');
    }

    //分类列表
    public function sort(){
        $list=Db::table('casesort')->where('id','<>','')->select();
        $this->assign('list',$list);

        return $this->fetch();
    }

    //删除分类
    public function delete_sort($id){
        Db::table('casesort')->delete($id);
        $this->redirect('{$Think.server.script_name}/focusAdmin/cases/sort');
    }

    //修改分类
    public function modi_sort($id){
        $info=Db::table('casesort')->where('id',$id)->find();
        $this->assign('info',$info);

        return $this->fetch();
    }

    //修改分类 提交到数据库
    public function post_sort(){
        $id=$_POST['id'];
        Db::table('casesort')
            ->where('id', $id)
            ->update(['name' => $_POST['name']]);
        $this->redirect('{$Think.server.script_name}/focusAdmin/cases/sort');

    }

    //添加分类
    public function add_sort(){
        return $this->fetch();
    }

    //添加分类 提交到数据库
    public function post_sort_add(){
        if(!$_POST['name']){
            $this->error('请填写案例分类名称');
        }
        $data = ['name' => $_POST['name']];
        Db::table('casesort')->insert($data);
        $this->redirect('{$Think.server.script_name}/focusAdmin/cases/sort');
    }


}
