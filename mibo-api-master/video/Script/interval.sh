#!/bin/bash
# Shell script menu
# Execute:only one
# Author:Dallon
# Date:2016-10-11 19:14:18
# Des: 针对米播项目的脚本程序
# --------------------------------------------------------------------


#!/bin/bash

while [ true ]; do
/bin/sleep 1
/usr/local/php/bin/php /data/wwwroot/mibo.yahalei.com/Public/mibo/test.php
# echo "$(date +"%Y-%m-%d%H%M")"
echo "<--->$(date +"%Y-%m-%d %T")"
done
