<?php

/* 在Controller中被包含 */

defined('BASE_PATH') OR exit('denied');


$frame = Frame_Controller::get_instance();
$frame->input = $_REQUEST;

if(!empty($frame->input['_DATA'])){
    $frame->input['_DATA'] = json_decode($frame->input['_DATA'], true);
}

if(!empty($frame->input['_FILTER'])){

    $where = $frame->input['_FILTER'];
    $_WHERE = '1';

    foreach($where as $k=>$v){
	   $_WHERE .=" AND ".$k.$v['compare'].$v['value'];
    }
}
