#!/bin/bash
# Shell script to update website
# Execute:anytime
# Author:dallon
# --------------------------------------------------------------------

#MYSQL="$(which mysql)"

BASE=$(cd "$(dirname "$0")"; pwd)
. $BASE/helper.sh

NOW="$(date +"%Y%m%d")"
TIME="$(date +"%Y%m%d%H%M%S")"

tips  "backup code start...."

zip -q -r /data/backup/code/mibo_$TIME.zip  /data/wwwroot/mibo.yahalei.com/

success "backup done"


