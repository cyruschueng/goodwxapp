<?php
/*
 *原代码如下
return [
    '__pattern__' => [
        'name' => '\w+',
    ],
    '[hello]'     => [
        ':id'   => ['cms/hello', ['method' => 'get'], ['id' => '\d+']],
        ':name' => ['cms/hello', ['method' => 'post']],
    ],

];
*/
use think\Route;
/*
 * 路由表达式,路由地址,请求类型[GET,POST,PUT,DELETE,*]
 * 路由参数['https'=>true]  变量规则
 * 遵循3段式设计
*/
Route::rule("api/:version/:controller/:action","api/:version.:controller/:action","GET|POST");


/*
 * 所有用户管理员的管理路由
 * */
Route::rule("manage/u/c/:p/:controller/:action","manage/user.customization.:p.:controller/:action","GET|POST");


/*
 * 所有管理员的管理路由
 * */