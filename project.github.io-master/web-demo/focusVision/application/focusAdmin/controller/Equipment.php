<?php
namespace app\focusAdmin\controller;
use think\Controller;
use think\Db;
class Equipment extends Controller
{
    //设备列表
    public function index()
    {
        $info=Db::table('equipment')->where('id','<>','')->select();
        $this->assign('info',$info);
        return $this->fetch();
    }

    //设备的修改页面 文字
    public function modi_equipment_word($id){
        $info=Db::table('equipment')->where('id',$id)->find();
        $this->assign('info',$info);

        //获取设备的分类
        $sort=Db::table('equipmentsort')->where('id','<>','')->select();
        $this->assign('sort',$sort);
        return $this->fetch();
    }

    //设备的修改页面 图片
    public function modi_equipment_img($id){
        $info=Db::table('equipment')->where('id',$id)->find();
        $this->assign('info',$info);
        return $this->fetch();
    }

    //设备文字的修改  提交到数据库
    public function post_equipment_word(){
        $id=$_POST['id'];
        Db::table('equipment')
            ->where('id', $id)
            ->update(['sort'=>$_POST['sort'],'name' => $_POST['name'],'des'=>$_POST['des']]);
        $this->redirect('{$Think.server.script_name}/focusAdmin/equipment/index');
    }

    //设备图片的修改  提交到数据库
    public function post_equipment_img(){
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
            Db::table('equipment')
                ->where('id', $id)
                ->update(['img' => $path]);
            $this->redirect('{$Think.server.script_name}/focusAdmin/equipment/index');
        } else {
            // 上传失败获取错误信息
            echo $file->getError() . "上传失败";
        }

    }

    //删除设备
    public function delete_equipment($id){
        Db::table('equipment')->delete($id);
        $this->redirect('{$Think.server.script_name}/focusAdmin/equipment/index');
    }

    //添加设备
    public function add_equipment(){
        //获取分类
        $sort=Db::table('equipmentsort')->where('id','<>','')->select();
        $this->assign('sort',$sort);
        return $this->fetch();
    }


    //添加设备 提交到数据库
    public function post_add_equipment(){
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
            $this->error('请填写设备名称');
        }
        if(!$_POST['des']){
            $this->error('请填对这个设备进行简单介绍');
        }
        $data = ['img' => $path,'sort'=>$_POST['sort'], 'name' => $_POST['name'],'des'=>$_POST['des']];
        Db::table('equipment')->insert($data);
        $this->redirect('{$Think.server.script_name}/focusAdmin/equipment/index');
    }

    //分类列表
    public function sort(){
        $list=Db::table('equipmentsort')->where('id','<>','')->select();
        $this->assign('list',$list);

        return $this->fetch();
    }

    //删除分类
    public function delete_sort($id){
        Db::table('equipmentsort')->delete($id);
        $this->redirect('{$Think.server.script_name}/focusAdmin/equipment/sort');
    }

    //修改分类
    public function modi_sort($id){
        $info=Db::table('equipmentsort')->where('id',$id)->find();
        $this->assign('info',$info);

        return $this->fetch();
    }

    //修改分类 提交到数据库
    public function post_sort(){
        $id=$_POST['id'];
        Db::table('equipmentsort')
            ->where('id', $id)
            ->update(['name' => $_POST['name']]);
        $this->redirect('{$Think.server.script_name}/focusAdmin/equipment/sort');

    }

    //添加分类
    public function add_sort(){
        return $this->fetch();
    }

    //添加分类 提交到数据库
    public function post_sort_add(){
        if(!$_POST['name']){
            $this->error('请填写设备分类名称');
        }
        $data = ['name' => $_POST['name']];
        Db::table('equipmentsort')->insert($data);
        $this->redirect('{$Think.server.script_name}/focusAdmin/equipment/sort');
    }


}
