#!/bin/bash
# Shell script menu
# Execute:only one
# Author:Dallon 
# Date:2016-10-10 19:14:18
# --------------------------------------------------------------------

BASE=$(cd "$(dirname "$0")"; pwd)
. $BASE/helper.sh

function menu(){
	tips 
	tips 
	tips "深圳和聚网络科技有限公司  脚本菜单：" "green"
	tips "-----------------------------------------------------"
	tips "0.  [退出]"
	tips "1.  [重启]  Apache"
	tips "2.  [停止]  Apache"
	tips "3.  [重启]  MySQL"
	tips "4.  [重启]  Nginx"
	tips "5.  [更新]  Script脚本"
	tips "10. [更新]  米播服务端代码"
	tips "11. [备份]  米播服务端代码"
	tips "12. [备份]  <米播> 数据库 "


	tips "-----------------------------------------------------"
	read -e -p "请输入序号:"
	showTime 
	if [ "$REPLY" != "" ] ; then 
		if echo $REPLY | grep -q "^[0-9]\{1,3\}$" ; then
			return $REPLY
			break
		else
			tips "输入的字符没找到" "red"
		fi
	fi
}

while true
do
	menu
	case $? in 
		0) exit 0 ;;
		1) service httpd stop && service httpd start ;;
		2) service httpd stop ;;
		3) service mysql stop &&  service mysql start ;;
		4) service nginx reload ;;
		5) svn update /data/wwwroot/mibo.yahalei.com/Script/ && chmod 775  /data/wwwroot/mibo.yahalei.com/Script/* -R ;;

		10) svn update /data/wwwroot/mibo.yahalei.com/ ;;
		11) $BASE/backup_code.sh ;;
		12) $BASE/backup_database.sh ;;

		*) ;;
	esac
done
