nginx + node 

---------认识，思考--------------
nginx,apach,tomaca
apach配置麻烦


Nginx+Node比较好。
单用node也有不少坑。。。
二次转发对性能有损伤，也会有不少坑需要踩。
我还是习惯在服务器上搞个nginx，以后再要新加站点来的方便。

Nginx优势
1.Nginx来处理静态文件请求和记录web访问日志，负载均衡，反向代理和静态资源，静态服务和动态服务。
2.Nginx proxy pass到Node转发损失不了多少性能。有坑可百度。
3.单个IP多个Virtual Host，Nginx好。

node
1.单机node的负载均衡用cluster，多机的话用nginx靠谱。
2.nginx和node做反向代理时的占用，单独的node占用资源少。