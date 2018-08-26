nginx(运行)
php,leravel（运行）
linux系统文件，防火墙，root和其他用户 & bin和sbin （理解）
docker（linux+nginx+mysql+mongodb+php+node）配置

# linux
```
<<<<<<< HEAD
运维:为什么要dockerhttp://www.cnblogs.com/Leo_wl/p/8467912.html
=======
运维:为什么要docker
http://www.cnblogs.com/Leo_wl/p/8467912.html
>>>>>>> 21535b91052afb53abae66c7d89c0008676ace1f
```

```
安装软件：
1.二进制包。
2.rpm包。
3.源码。

find /-name php
rpm -qal | grep php
systemctl start nigix.service

$ tar -zxf git-1.7.2.2.tar.gz
$ cd git-1.7.2.2
$ make prefix=/usr/local all
$ sudo make prefix=/usr/local install
```

#其他

```
127.0.0.1 = localhost != 本地ip
127.0.0.1 = localhost = 本地ip(做映射关联)

host文件，域名解析，先读取本地，再到外面域名解析。
```

#常见命令
```
telnet 47.91.219.27 27017
netstat -lanp | grep '27017'

ps -ef | grep nginx
ps -aux|grep node

kill -9  进程号

lsof -i:27017
./mongodb 172.31.90.96/27017
ps -ef
tail -f nohup.out
nohup /root/  &
ipconfig

owner/group/others
read/write/execute=4/2/1


更改权限：
chown [–R] 属主名 文件名
chown [-R] 属主名：属组名 文件名
chown root:root test,用户名和用户组

chmod -R 775 test;

ls: 列出目录（ll）
cd：切换目录
pwd：显示目前的目录
mkdir：创建一个新的目录
rmdir：删除一个空的目录
cp: 复制文件或目录
rm: 移除文件或目录	

vi/vim
命令模式（Command mode），
输入模式（Insert mode）,
底线命令模式（Last line mode）

i/:wq/:q/:q!
i 切换到输入模式，以输入字符。
x 删除当前光标所在处的字符。
: 切换到底线命令模式，以在最底一行输入命令。

```


##阿里云
```
# question and soloved
1.添加安全组规则，添加22/22端口范围（同事，ls帮忙解决）。
2.403没有访问权限，修改root的可读可写的权限（同事，wyp解决）。
```
#shell 登录
```
/bin, /sbin, /usr/bin, /usr/sbin: 这是系统预设的执行文件的放置目录，比如 ls 就是在/bin/ls 目录下的。
值得提出的是，/bin, /usr/bin 是给系统用户使用的指令（除root外的通用户），而/sbin, /usr/sbin 则是给root使用的指令

/usr/sbin：
超级用户使用的比较高级的管理程序和系统守护程序。
/sbin：
s就是Super User的意思，这里存放的是系统管理员使用的系统管理程序。

/bin：
bin是Binary的缩写, 这个目录存放着最经常使用的命令。
/usr：
 这是一个非常重要的目录，用户的很多应用程序和文件都放在这个目录下，类似于windows下的program files目录。
/usr/bin：
系统用户使用的应用程序。


http://www.runoob.com/linux/linux-tutorial.html
```


#lamp一键安装
```
http://yumlamp.com/install.html

$ yum install curl-devel expat-devel gettext-devel \
  openssl-devel zlib-devel

$ apt-get install libcurl4-gnutls-dev libexpat1-dev gettext \
  libz-dev libssl-dev
之后，从下面的 Git 官方站点下载最新版本源代码：

在git-scm.org上下载tar包，地址：https://www.kernel.org/pub/software/scm/git/git-2.11.1.tar.gz
http://git-scm.com/download
然后编译并安装：
```


#环境变量
```
暂时性修改环境变量
export PATH=$PATH:/usr/local/MATLAB/R2013b/bin
export

永久性修改环境变量
1 /etc/profile 全局的环境变量，对所有用户生效
2 .bash_profile对当前用户启作用
```



#数据库
```
./mongod服务器进程
./mongo客户端
```
#后台运行
```
nohup和&后台运行，进程查看及终止
nohup /usr/local/node/bin/node /www/im/chat.js >> /usr/local/node/output.log 2>&1 &
jobs -l
https://www.cnblogs.com/baby123/p/6477429.html
```

# 参考
``` 
#Linux中vi编辑器的使用详解
https://jingyan.baidu.com/article/59703552e2e1e38fc107405a.html

# CentOS7 + node.js + nginx + MySQL搭建服务器全过程
http://www.jb51.net/article/107075.htm

# centos7.0之Lnmp和Lamp详细介绍
http://www.jb51.net/article/98504.htm
```
