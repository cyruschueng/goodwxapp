<?php

$appid = 'wxfaf1e160e6da492e';
$screet = '49feb29ba8667060b3180ccbcc910a6d';
$code = "071VmAqw1Aapua0OFIow1CpNqw1VmAqE";
$url = "https://api.weixin.qq.com/sns/jscode2session?appid=" . $appid . "&secret=" . $screet . "&js_code=" . $code . "&grant_type=authorization_code";
$content = file_get_contents($url);
echo $content;
