#!/bin/bash
# Shell script to update website
# Execute:anytime
# Author:dallon
# --------------------------------------------------------------------

#MYSQL="$(which mysql)"
BASE=$(cd "$(dirname "$0")"; pwd)
. $BASE/helper.sh
MYSQLDUMP="$(which mysqldump)"
MYSQL="$(which mysql)"
GZIP="$(which gzip)"

MYSQLHOST='127.0.0.1'
MYSQLROOTUSER='mibo'
MYSQLROOTPASS='mb4578~!@#$%^'

NOW="$(date +"%Y%m%d")"

tips "backup database start...."

$MYSQLDUMP -h$MYSQLHOST -u$MYSQLROOTUSER -p$MYSQLROOTPASS --default-character-set=utf8 mibo | $GZIP -f -1 > /data/backup/database/mibo_$NOW.sql.gz

success "backup done"


