<?php
/**
 * 以下配置为系统级的配置，通常放置不同环境下的不同配置
 */

return array(
    /**
     * 默认环境配置
     */
    'debug'           => true,

    'api_url_host'  => 'https://mibo.yahalei.com',
    //'api_url_host'  => 'http://t.com/mibotest.yahalei.com/public',
    //'api_url_host'  => 'http://mibotest.yahalei.com',

    /**
     * qvod项目允许debug地址
     */
    'ip_white_list' => array(
        '127.0.0.1',
        '121.42.41.5',
        '114.215.148.88',
        '114,215,68,209',
        '183.14.16.125',
    ),

    /**
     * MC缓存服务器参考配置
     */
    'mc'              => array(
        'host' => '127.0.0.1',
        'port' => 11211,
    ),

    /**
     * 加密
     */
    'crypt'           => array(
        'mcrypt_iv' => '12345678',      //8位
    ),
    /**
     * 加密
     */
    'Mycrypt'         => array(
        'key' => '2wsxcde3',      //8位
    ),
    /**
     * 签名
     */
    'sign'            => array(
        'key'        => "@mibo@",
        'key_secret' => "5b8f771b455023a6526fb1f969132dc8",
        'method'     => 'md5',
    ),
);
