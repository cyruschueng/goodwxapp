<?php
date_default_timezone_set('Asia/Shanghai');
header("Content-type:text/html;charset=utf-8");
/******************************************************************************
 *
 * 参数说明:
 * $max_file_size  : 上传文件大小限制, 单位BYTE
 * $destination_folder : 上传文件路径
 * $watermark   : 是否附加水印(1为加水印,其他为不加水印);
 *
 * 使用说明:
 * 1. 将PHP.INI文件里面的"extension=php_gd2.dll"一行前面的;号去掉,因为我们要用到GD库;
 * 2. 将extension_dir =改为你的php_gd2.dll所在目录;
 ******************************************************************************/

$dir = isset($_REQUEST['dir'])? trim($_REQUEST['dir']): "pub";  //路径
$filter = isset($_REQUEST['filter'])? trim($_REQUEST['filter']): "";  //简单的签名

//上传文件类型列表
$uptypes = array('image/jpg', 'image/jpeg', 'image/png', 'image/pjpeg', 'image/gif', 'image/bmp', 'image/x-png');
$max_file_size = 2000000;     //上传文件大小限制, 单位BYTE
$destination_folder = "img".DIRECTORY_SEPARATOR.$dir.DIRECTORY_SEPARATOR.date("Ym").DIRECTORY_SEPARATOR; //上传文件路径
$watermark = 0;      //是否附加水印(1为加水印,其他为不加水印);
$watertype = 1;      //水印类型(1为文字,2为图片)
$waterposition = 1;     //水印位置(1为左下角,2为右下角,3为左上角,4为右上角,5为居中);
$waterstring = "http://www.mibolive.com/";  //水印字符串
$waterimg = "mibo.gif";    //水印图片
$imgpreview = 0;      //是否生成预览图(1为生成,其他为不生成);
$imgpreviewsize = 1 / 2;    //缩略图比例


function setResult($ret = 400, $msg = "", $data = null) {
    return json_encode(array('ret'=> $ret, 'msg'=> $msg, 'data'=> $data));
}


if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    if (empty($filter) || $_FILES["upfile"]['name'] != $filter) {
        exit(setResult(400,'非法请求'));
    }

    if (!is_uploaded_file($_FILES["upfile"]['tmp_name'])) //是否存在文件
    {
        exit(setResult(401,'图片不存在'));
    }

    $file = $_FILES["upfile"];
    if ($max_file_size < $file["size"]) //检查文件大小
    {
        exit(setResult(402, '文件太大!'));
    }

    if (!in_array($file["type"], $uptypes)) //检查文件类型
    {
        exit(setResult(403, "文件类型不符!" . $file["type"]));
    }

    if (!file_exists($destination_folder)) {
        mkdir($destination_folder, 0777, true);
    }

    $filename = $file["tmp_name"];
    $image_size = getimagesize($filename);
    $pinfo = pathinfo($file["name"]);
    $ftype = $pinfo['extension'];
    $destination = $destination_folder . time() . "." . $ftype;
    if (file_exists($destination) && $overwrite != true) {
        exit(setResult(404, "同名文件已经存在了"));
    }

    if (!move_uploaded_file($filename, $destination)) {
        exit(setResult(405, "移动文件出错"));
    }

    $pinfo = pathinfo($destination);
    $fname = $pinfo['basename'];

    $file_info = array(
        'width'=>$image_size[0],
        'height'=>$image_size[1],
        'size'=>$file["size"],
        'desc'=>"宽高单位为px,大小单位为Bytes",
    );
//    echo " <font color=red>已经成功上传</font><br>文件名:  <font color=blue>" . $destination_folder . $fname . "</font><br>";
//    echo " 宽度:" . $image_size[0];
//    echo " 长度:" . $image_size[1];
//    echo "<br> 大小:" . $file["size"] . " bytes";

    if ($watermark == 1) {
        $iinfo = getimagesize($destination, $iinfo);
        $nimage = imagecreatetruecolor($image_size[0], $image_size[1]);
        $white = imagecolorallocate($nimage, 255, 255, 255);
        $black = imagecolorallocate($nimage, 0, 0, 0);
        $red = imagecolorallocate($nimage, 255, 0, 0);
        imagefill($nimage, 0, 0, $white);
        switch ($iinfo[2]) {
            case 1:
                $simage = imagecreatefromgif($destination);
                break;
            case 2:
                $simage = imagecreatefromjpeg($destination);
                break;
            case 3:
                $simage = imagecreatefrompng($destination);
                break;
            case 6:
                $simage = imagecreatefromwbmp($destination);
                break;
            default:
                exit(setResult(406, "不支持的文件类型"));
        }

        imagecopy($nimage, $simage, 0, 0, 0, 0, $image_size[0], $image_size[1]);
        imagefilledrectangle($nimage, 1, $image_size[1] - 15, 80, $image_size[1], $white);

        switch ($watertype) {
            case 1:   //加水印字符串
                imagestring($nimage, 2, 3, $image_size[1] - 15, $waterstring, $black);
                break;
            case 2:   //加水印图片
                $simage1 = imagecreatefromgif("xplore.gif");
                imagecopy($nimage, $simage1, 0, 0, 0, 0, 85, 15);
                imagedestroy($simage1);
                break;
        }

        switch ($iinfo[2]) {
            case 1:
                //imagegif($nimage, $destination);
                imagejpeg($nimage, $destination);
                break;
            case 2:
                imagejpeg($nimage, $destination);
                break;
            case 3:
                imagepng($nimage, $destination);
                break;
            case 6:
                imagewbmp($nimage, $destination);
                //imagejpeg($nimage, $destination);
                break;
        }

        //覆盖原上传文件
        imagedestroy($nimage);
        imagedestroy($simage);
    }

    if ($imgpreview == 1) {
        echo "<br>图片预览:<br>";
        echo "<img src=\"" . $destination . "\" width=" . ($image_size[0] * $imgpreviewsize) . " height=" . ($image_size[1] * $imgpreviewsize);
        echo " alt=\"图片预览:\r文件名:" . $destination . "\r上传时间:\">";
    }
    // $file_info['file_url'] = "http://mibores.yahalei.com".DIRECTORY_SEPARATOR.$destination;
    $file_info['file_url'] = "http://image.cdn.mibolive.com".DIRECTORY_SEPARATOR.$destination;
    exit(setResult(200,'ok', $file_info));
}

exit(setResult(555, "非法请求，请联系管理员"));
