<?php
error_reporting(E_ERROR);
require_oLib 'phpqrcode/phpqrcode.php';
$url = urldecode($_GET["data"]);
QRcode::png($url);
