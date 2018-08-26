<?php
namespace app\focusAdmin\controller;
use think\Controller;
use think\Db;
class Technology extends Controller
{

    public function index()
    {
        $list=Db::table('technology')->select();
        $this->assign('list',$list);
        return $this->fetch();
    }

    //删除文章
    public function delete($id){
        Db::table('technology')->delete($id);
        $this->redirect('{$Think.server.script_name}/focusAdmin/technology/index');
    }

    //修改文章
    public function modi($id){
        $info=Db::table('technology')->where('id',$id)->find();
        $this->assign('info',$info);
        $list=Db::table('technologysort')->select();
        $this->assign('list',$list);
        return $this->fetch();
    }

    //文章修改 提交到数据库
    public function post_modi(){
        $id=$_POST['id'];
        if(!$_POST['title']){
            $this->error('请填写标题');
        }
        if(!$_POST['content']){
            $this->error('请填写文章内容');
        }
        Db::table('technology')
            ->where('id', $id)
            ->update(['title' => $_POST['title'],'sortid'=>$_POST['sort'],'des'=>$_POST['content']]);
        $this->redirect('{$Think.server.script_name}/focusAdmin/technology/index');
    }

    //发布文章
    public function add(){
        $list=Db::table('technologysort')->select();
        $this->assign('list',$list);
        return $this->fetch();
    }

    //发布文章 提交到数据库
    public function post_add(){
        if(!$_POST['title']){
            $this->error('请填写标题');
        }
        if(!$_POST['content']){
            $this->error('请填写文章内容');
        }
        $date=date('Y-m-d');
        $data = ['title' => $_POST['title'],'sortid'=>$_POST['sort'],'des'=>$_POST['content'],'date'=>$date];
        Db::table('technology')->insert($data);
        $this->redirect('{$Think.server.script_name}/focusAdmin/technology/index');
    }

    public function sort()
    {
        $list=Db::table('technologysort')->select();
        $this->assign('list',$list);
        return $this->fetch();
    }

    //删除分类
    public function delete_sort($id){
        Db::table('technologysort')->delete($id);
        $this->redirect('{$Think.server.script_name}/focusAdmin/technology/sort');
    }

    //修改分类
    public function modi_sort($id){
        $info=Db::table('technologysort')->where('id',$id)->find();
        $this->assign('info',$info);
        $list=Db::table('technologysort')->select();
        $this->assign('list',$list);
        return $this->fetch();
    }

    //分类修改 提交到数据库
    public function post_modi_sort(){
        $id=$_POST['id'];
        if(!$_POST['title']){
            $this->error('请填写分类名称');
        }
        if(!$_POST['url']){
            $_POST['url']=1;
        }
        Db::table('technologysort')
            ->where('id', $id)
            ->update(['name' => $_POST['title'],'url'=>$_POST['url']]);
        $this->redirect('{$Think.server.script_name}/focusAdmin/technology/sort');
    }

    //添加分类
    public function add_sort(){

        return $this->fetch();
    }

    //添加分类 提交到数据库
    public function post_add_sort(){
        if(!$_POST['title']){
            $this->error('请填写分类名称');
        }
        if(!$_POST['url']){
            $_POST['url']=1;
        }
        $data = ['name' => $_POST['title'],'url'=>$_POST['url']];
        Db::table('technologysort')->insert($data);
        $this->redirect('{$Think.server.script_name}/focusAdmin/technology/sort');
    }



}
