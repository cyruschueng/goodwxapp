MongoDB 生态 – 可视化管理工具
http://www.mongoing.com/archives/3651

## window安装mongoddb
```
设置文件存放目录（不设置命令不会自动创建，而且不能启动成功。）
设置log（存放日志文件）

mongo.config：
dbpath=D:\mongodb\data\db
logpath=D:\mongodb\data\log\mongo.log  

D:\mongodb\bin>mongod --config D:\mongodb\mongo.config 
或
mongod --config D:\mongodb\mongo.config --install --serviceName "MongoDB"

services.msc查看服务可以看到MongoDB服务，点击可以启动

注意window cmd路径需要""

参考；
https://jingyan.baidu.com/article/d5c4b52bef7268da560dc5f8.html
```