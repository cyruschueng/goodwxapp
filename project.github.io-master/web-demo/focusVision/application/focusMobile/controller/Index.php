<?php
namespace app\focusMobile\controller;
use think\Controller;
use app\focusMobile\model\Banner;
class Index extends Controller
{
    public function index()
    {
        //实例化模型
        $banner=new Banner();
        //查询数据集
        $banner=$banner->where('id',2)->find();
        $this->assign('bannerAraay',$banner);
        // 渲染模板输出
        return $this->fetch();
    }
}
