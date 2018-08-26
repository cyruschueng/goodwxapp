<?php
defined('APP_PATH') OR exit('denied');

$mysqlDB = 
['db_list'=>
array(
    
    'mysql0'=>array(
        'host' => 'rdsg4hgebq8827g143m5.mysql.rds.aliyuncs.com',
        'user' => 'query1',
        'password' => 'cds_123456',
        'dbname' => 'pingtu'
    ),
    'mysql1'=>array(
        'host' => 'localhost',
        'user' => 'root',
        'password' => '',
        'dbname' => 'weilingd_app'
    ),
    'mysql2'=>array(
        'host' => 'localhost',
        'user' => 'root',
        'password' => '',
        'dbname' => 'part3'
    ),
)];

$GLOBALS['mysqlDB'] = $mysqlDB;
