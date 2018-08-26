<?php
/**
 * Created by TalentBigData -> ddweb.com.cn @血狼.
 * User: XYC
 * Date: 2017/12/26
 * Time: 16:52
 */

namespace app\api\controller\v1;

use app\api\model\ClientsUser;
use app\lib\exception\LoginException;

class Qrcode
{
    /*二维码接口*/
    public function index()
    {
        //生成当前的二维码
        $qrCode = new \Endroid\QrCode\QrCode();
        if($id) {
            //想显示在二维码中的文字内容，这里设置了一个查看文章的地址
            $url = url('index/article/read/'.$id,'',true,true);
            $qrCode->setText($url)
                ->setSize(300)
                ->setPadding(10)
                ->setErrorCorrection('high')
                ->setForegroundColor(array('r' => 0, 'g' => 0, 'b' => 0, 'a' => 0))
                ->setBackgroundColor(array('r' => 255, 'g' => 255, 'b' => 255, 'a' => 0))
                ->setLabel('thinkphp.cn')
                ->setLabelFontSize(16)
                ->setImageType(\Endroid\QrCode\QrCode::IMAGE_TYPE_PNG);
            $qrCode->render();
        }
    }
}