<?php
defined('APP_PATH') OR exit('denied');


class Router{
    
    /* 地址栏路由解析 */
    function run(){
        
        /* 获得文件 */
        $toDir = API_PATH.$_REQUEST['_C'].'Ctl.php';
        file_exists($toDir) or die('this file is not exist :"'.$toDir.'"');
        
        
        include_once $toDir;
        $class = new $_REQUEST['_C'];
        $functionName = $_REQUEST['_A'];
        
        /* 加载参数处理 */
        require_once BASE_PATH.'Core/Input.php';
        
        $class->$functionName();
    }
}
?>