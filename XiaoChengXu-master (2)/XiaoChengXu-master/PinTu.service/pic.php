<?php

$t = json_encode($_FILES);
$ti = data('Y-m-d H:i:s');
logger('111222333----'.$ti.'+'.$t);


//日志记录
function logger($log_content)
{
    //$max_size = 100000;
    //$log_filename = "log.xml";
    //if(file_exists($log_filename) and (abs(filesize($log_filename)) > $max_size)){unlink($log_filename);}
    
    error_log($log_content.'---'.PHP_EOL, 3, 'Application/Runtime/Logs/Money/apple'.date('Y-m-d').'.log');
}
?>


