<?php

/**
 * Created by PhpStorm.
 * User: code
 * Date: 1/15/2018
 * Time: 3:24 AM
 */
namespace app\manage\controller;
use think\Controller;
class BaseController extends Controller
{
    function _initialize()
    {
        $this->view->config("view_path",ROOT_PATH."templates".DS."manage".DS);
    }
}