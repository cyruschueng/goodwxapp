#! /bin/bash
echo 'pre_build'

baseDir=$(dirname $0)
cd $baseDir
echo 'current dir:' 
pwd 
ls -al
cnpm install

