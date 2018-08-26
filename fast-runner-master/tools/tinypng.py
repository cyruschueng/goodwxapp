# -*- coding: UTF-8 -*-
import os
import sys
import commands
import json, hashlib

pngquant_path = './pngquant'
build_path = '../build/wechatgame/res/raw-assets/'

def execute(cmd):
    # print cmd
    commands.getstatusoutput(cmd)

def main():
    for (root, dirs, files) in os.walk(build_path):
        for file in files:
            split_path = os.path.splitext(file)
            basename = split_path[0]
            extname = split_path[1]
            if (basename[-4:] != '-fs8' and extname == '.png'):
                png_path = os.path.join(root, file)
                tinypng_path = os.path.join(root, split_path[0] + '-fs8' + extname)

                # execute
                cmd = pngquant_path + ' -f ' + png_path
                execute(cmd)

                # rm
                cmd = 'rm ' + png_path
                execute(cmd)

                # mv
                cmd = 'mv ' + tinypng_path + ' ' + png_path
                execute(cmd)

                print '%s translated' % png_path


if __name__ == '__main__':
    main()
