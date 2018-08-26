<?php
$t = isset($_GET['t']) ? $_GET['t'] : 'num';
$callback = isset($_GET['callback']) ? $_GET['callback'] : 'fn1';

$arr1 = array('111111','22222222','33333333','4444444','555555555555555555555');
$arr2 = array('aaaaaaaaaaaa','bbbbbbbb','cccccccccccc','ddddddddd','eeeeeeeeeeee');

if ($t == 'num') {
	$data = json_encode($arr1);
} else {
	$data = json_encode($arr2);
}

echo $callback.'('.$data.');';