<?php
namespace app\focusAdmin\controller;
use think\Controller;
use think\Db;
class Online extends Controller
{

    public function index()
    {
        $list=Db::table('online')->select();
        $this->assign('list',$list);
        return $this->fetch();
    }

    //删除留言
    public function delete($id){
        Db::table('online')->delete($id);
        $this->redirect('{$Think.server.script_name}/focusAdmin/online/index');
    }

}
