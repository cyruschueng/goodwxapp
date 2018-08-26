<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/5/5
 * Time: 9:13
 */

namespace app\focusMobile\controller;
use think\Controller;
use app\focusMobile\model\Contactus;
class Map extends Controller
{
    public function map()
    {
        $contactus=new contactus();
        $contactArray=$contactus->limit(1)->order('id','desc')->select();
        $map=$contactArray[0]['map'];
        $this->assign('map',$map);
        return $this->fetch();
    }
}