<?php
namespace app\focusAdmin\controller;
use think\Controller;
use think\Db;
class News extends Controller
{

    public function index()
    {
        $list=Db::table('news')->select();
        $this->assign('list',$list);
        return $this->fetch();
    }

    //删除新闻
    public function delete($id){
        Db::table('news')->delete($id);
        $this->redirect('{$Think.server.script_name}/focusAdmin/news/index');
    }

    //修改新闻
    public function modi($id){
        $info=Db::table('news')->where('id',$id)->find();
        $this->assign('info',$info);
        return $this->fetch();
    }

    //新闻修改 提交到数据库
    public function post_modi(){
        $id=$_POST['id'];
        if(!$_POST['title']){
            $this->error('请填写标题');
        }
        if(!$_POST['content']){
            $this->error('请填写新闻内容');
        }
        Db::table('news')
            ->where('id', $id)
            ->update(['title' => $_POST['title'],'content'=>$_POST['content']]);
        $this->redirect('{$Think.server.script_name}/focusAdmin/news/index');
    }

    //发布新闻
    public function add(){
        return $this->fetch();
    }

    //发布新闻 提交到数据库
    public function post_add(){
        if(!$_POST['title']){
            $this->error('请填写标题');
        }
        if(!$_POST['content']){
            $this->error('请填写新闻内容');
        }
        $date=date('Y-m-d');
        $data = ['title' => $_POST['title'],'content'=>$_POST['content'],'date'=>$date];
        Db::table('news')->insert($data);
        $this->redirect('{$Think.server.script_name}/focusAdmin/news/index');
    }




}
