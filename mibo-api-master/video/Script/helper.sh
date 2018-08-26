#!/bin/bash
# Shell script helper
# Execute:include
# Author:Karson 
# Website:http://blog.iplaybus.com
# Date:2013-9-23 15:55:28
# --------------------------------------------------------------------

okstatus="[  \033[0;32;40mOK\033[0m   ]\n"  
failstatus="[ \033[0;31;40mERROR\033[0m ]\n"  
existstatus="[ \033[0;34;40mEXIST\033[0m ]\n"  
last_len=0
declare -a initresult

#more advantange echo 
function modeecho(){  
    local content="$1"  
    if [ "$content" == "OK" -o "$content" == "SUCCESS" ] ; then
        content=$okstatus
        content_len=0
    elif [ "$content" == "ERROR" -o "$content" == "FAILED" ] ; then
        content=$failstatus  
        content_len=0
	elif [ "$content" == "EXIST" -o "$content" == "INSTALLED" ] ; then  
        content=$existstatus  
        content_len=0  
    else  
        content_len=${#content}  
    fi
    if [ $last_len -ne 0 -a $content_len -eq 0 ] ; then
        ((blank_len=66-last_len))  
        printf "%${blank_len}s" " "  
    fi 
    echo -en "$content" 
    ((last_len=last_len+content_len))  
    if [ $content_len -eq 0 ] ; then 
        ((last_len=0))  
    fi  
}  

#color echo
function colorecho(){  
    local color=white  
	local content=""
    if [ $# -ge 2 ]; then  
        content="$1"
        color=$2
    elif [ $# -eq 1 ]; then  
        content="$1"  
    else  
        return  
    fi  
    case $color in   
        black)  color=30  ;;  
        red)  color=31  ;;  
        green)  color=32  ;;  
        yellow)  color=33  ;;  
        blue)  color=34  ;;  
        magenta)  color=35  ;;  
        cyan)  color=36  ;;  
        white)  color=37  ;;  
        *)  color=0  ;;  
    esac  
    if [ "$content" == "OK" -o "$content" == "SUCCESS" ] ; then  
        content=$okstatus  
        content_len=0  
    elif [ "$content" == "ERROR" -o "$content" == "FAILED" ] ; then  
        content=$failstatus  
        content_len=0  
	elif [ "$content" == "EXIST" -o "$content" == "INSTALLED" ] ; then  
        content=$existstatus  
        content_len=0  
    else  
        content_len=${#content}  
    fi  
    if [ $last_len -ne 0 -a $content_len -eq 0 ]; then  
        ((blank_len=66-last_len))  
        printf "%${blank_len}s" " "  
    fi  
    if [ $color -gt 0 ]; then  
        content="\033[0;${color};40m${content}\033[0m"  
    fi  
    echo -en "$content"  
    ((last_len=last_len+content_len))  
    if [ $content_len -eq 0 ]; then  
        ((last_len=0))  
    fi  
}
function showTime() {
	TIME="$(date +"%Y-%m-%d %H:%M:%S")"
	colorecho "exe time: $TIME" green
	echo ''
}

#error tips red
function error(){
	last_len=0
	len=${#initresult[@]}
	initresult[$len]="$1##red##ERROR"
	colorecho "$1" red
	modeecho "ERROR" 
}

#success tips green
function success(){
	last_len=0
	len=${#initresult[@]}
	initresult[$len]="$1##green##OK"
	colorecho "$1" green
	modeecho "OK"
}

#exist tips blue
function exist(){
	last_len=0
	len=${#initresult[@]}
	initresult[$len]="$1##blue##EXIST"
	colorecho "$1" blue
	modeecho "EXIST"
}

#tips
function tips(){
	last_len=0
	if [ "$2" == "" ] ; then
		color="yellow"
	else
		color=$2
	fi
	colorecho "$1\n" "$color"
}

#change config item
function configure(){
	if [ "$1" != "" ] ; then
		if [ -f "$3" ] ; then
			if [ "$4" != "" ] ; then
				NOTE="$4"
			else
				NOTE=""
			fi
			REPLACETEXT=`echo $2 | sed 's/\//\\\\\//g'`
			#$1=key $2=value $3=path $4=comment conf
			sed -i "s/\(;\|\#\)*\($1 =\|$1=\).*/$NOTE$1=$REPLACETEXT/g" $3
		else
			error "$3 not a valid filepath"
		fi
	else
		error "first param not a valid keyname"
	fi
}

#check service is installed
function checkservice(){
	for arg in $* ; do
		servicepath=`which $arg`
		len=${#initresult[@]}
		if [ "$servicepath" != "" ] ; then
			success "install $arg"
		else
			error "install $arg"
		fi
	done
}

#combined all result
function listresult(){
	tips "\n\nShell execute result:" "yellow"
	tips "---------------------------------------------------------------------------" "yellow"
	last_len=0
	for ((i = 0; i < ${#initresult[@]}; i++))
	do
		ret="${initresult[$i]}"
		msg=`echo "$ret"|awk -F '##' '{print $1} ' ` 
		color=`echo "$ret"|awk -F '##' '{print $2} ' ` 
		tag=`echo "$ret"|awk -F '##' '{print $3} ' ` 
		colorecho "$msg" "$color"
		modeecho "$tag"
	done
	unset initresult
}

#copyright info
function copyright(){
	tips "---------------------------------------------------------------------------" "cyan"
	tips "$1" "cyan"
	tips "Author:Karson" "cyan"
	tips "---------------------------------------------------------------------------" "cyan"
}

#get all virtualhost
function getvirtualhost(){
	OLDIFS=$IFS
	IFS=$'\n'
	if [ "$1" != "" ] ; then
		conflist[0]="$1"
	fi
	for line in `grep ServerAlias $CONF | sed -e 's/^ *//g' -e 's/ *$//g'`;do
		len=${#conflist[@]}
		#len=`expr $len + 1`
		conflist[$len]=$line
	done
	IFS=$OLDIFS
}

function in_array() {
    local hay needle=$1
    shift
    for hay; do
        [[ $hay == $needle ]] && return 0
    done
    return 1
}
