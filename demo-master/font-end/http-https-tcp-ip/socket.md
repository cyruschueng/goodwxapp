http://www.jb51.net/article/88954.htm


1、长连接，即服务器端不断开联系，PHP服务器端用ob系列函数来不停的读取输出，但是相当耗费服务器资源。
2、Flash socket，flash的as3语言，创建一个socket服务器用来处理信息。
3、轮询，顾名思义就是不停地发送查询消息，一有新消息立刻更新，但是会有多次无用请求。
4、长轮询，是轮询的升级版，需要服务器端的配合。
5、websocket，HTML5的通信功能，建立一个与服务器端的专用接口ws协议来进行通讯，兼容可能成为问题。


http://cangdu.org:8003/dialogue




websocket
http://www.ruanyifeng.com/blog/2017/05/websocket.html
WebSocket 服务器的实现，可以查看维基百科的列表。
常用的 Node 实现有以下三种。
µWebSockets
Socket.IO
WebSocket-Node


WebSocket（二）-WebSocket、Socket、TCP、HTTP区别
https://www.cnblogs.com/merray/p/7918977.html

OSI七层模型详解
http://blog.csdn.net/yaopeng_2005/article/details/7064869