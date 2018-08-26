<?php
defined('BASE_PATH') OR exit('No direct script access allowed');


/*********************************
 **********   各种定义    ***********
 *********************************/


/***************
 * 跨域请求
 ***************/

header("Access-Control-Allow-Origin: *");


/***************
 * 定义开发模式  TEST或ONLINE
 ***************/

define('DATACONFIG_PATH', APP_PATH.'Config/Database/');

define('ENVIRONMENT', 'TEST');

/*san*/
$GLOBALS['KEY'] = [
    'TENCENT'=>[
        'WX_XCX'=>[
            'appid'=>'wx3d00770652053edd',
            'secret'=>'e51701c63f8f80a4a715f15282eb925e',
	    'mchid'=>'1418910502',
	    'key'=>'t9RRtRNYJkL2Dfe6CwiKO27f128AsERs',
	    'cert_cert_file'=>LIB_PATH.'WxpayAPI_php_v3.0.1/cert/apiclient_cert.pem',
	    'cert_key_file'=>LIB_PATH.'WxpayAPI_php_v3.0.1/cert/apiclient_key.pem',
        ],
    ]
];

$GLOBALS['KEY2'] = [
    'TENCENT'=>[
        'WX_XCX'=>[
            'appid'=>'wxd727ee9e47b2faa6',
            'secret'=>'9c98fabf2d3301d83fd1452299ced66f',
	    'mchid'=>'1445950302',
	    'key'=>'yJAwHgu1wzaDLcz1iS3pg0hZBLTldKoS',
	    'cert_cert_file'=>LIB_PATH.'WxpayAPI_php_v3.0.1/cert/2/apiclient_cert.pem',
	    'cert_key_file'=>LIB_PATH.'WxpayAPI_php_v3.0.1/cert/2/apiclient_key.pem',
        ],
    ]
];

$GLOBALS['CURRENT_KEY']=$GLOBALS['KEY2'];
//print_r($GLOBALS);exit;

?>
