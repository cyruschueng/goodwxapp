<?php
/**
 * Created by TalentBigData -> ddweb.com.cn @血狼.
 * User: XYC
 * Date: 2017/12/26
 * Time: 15:15
 */

return [
    'exception_handle'       => '\app\lib\exception\ExceptionHandler',

    'cache'                  => [
        // 驱动方式
        'type'   => 'File',
        'path'  =>  CACHE_PATH,
        'prefix'=>  'think',
        'expire'   => 0
    ] ,

    // API默认输出json
    'default_return_type'    => 'json',
];