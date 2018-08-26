<?php

foreach ($_GET as $key=>$value)
{
    logger("Key: $key; Value: $value");
}
$postStr = $GLOBALS["HTTP_RAW_POST_DATA"];
logger($postStr);

if (isset($_GET)){
    echo "success";
}

//日志记录
function logger($log_content)
{
    //$max_size = 100000;
    //$log_filename = "log.xml";
    //if(file_exists($log_filename) and (abs(filesize($log_filename)) > $max_size)){unlink($log_filename);}
    
    error_log($log_content.'---'.PHP_EOL, 3, 'Application/Runtime/Logs/Money/wx_money_notify'.date('Y-m-d').'.log');
}
?>


