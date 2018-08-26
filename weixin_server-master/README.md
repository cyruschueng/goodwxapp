# 微信暗恋小程序
> 开发者QQ 2620631
# 结构
* 1.Program 为小程序源码.可以直接使用开发者工作提交到后台.
* 2.Server 服务端程序.使用thinkphp 5编写
# 安装环境
* php 7以上的环境 (请勿使用低版本PHP,以兔导致很多未知的问题)
* mysql 或者 mariadb 5.6+
# 安装方式
* 1.导入Server里的 database-cutom.sql到数据库
* 2.将 Server 的全部文件上传到空间.
## 上传方式如下 请注意:
>将Server 下的文件上传到空间的上一级目录 . <br />
	比如空间的目录是 root_www <br />
	则将 Server\public_html 上传到空间的根目录 .即 root_www <br />
	将Server下除public_html文件夹的其他文件上传到空间的根目录的上一级 .即root_www的上级. <br />
	这样做的原因是因为安全. <br />
	thinkphp 5默认的构架. 
* * *
* 3.application\database.php 文件,使数据库连接正常
* 4.修改 Program\utils\config.js 里的域名配置 http://www.xxx.com/ 注意后面有个 /
* 5.后台路径http://www.xxx.com/manage/u/c/weixinheddinlike/admin/login 
* 6.后台密码 admin 123456
* * *
- 更新日期 2018.1.18


