HTTP、WebSocket 等协议都是处于 OSI 模型的最高层： 应用层 。
而 IP 协议工作在网络层（第3层），
TCP 协议工作在传输层（第4层）

socket
Socket 不是一个协议。工作在 OSI 模型会话层（第5层），是为了方便大家直接使用更底层协议（一般是 TCP 或 UDP ）而存在的一个抽象层。



WebSocket、HTTP 与 TCP

HTTP、WebSocket 等应用层协议，都是基于 TCP 协议来传输数据的。我们可以把这些高级协议理解成对 TCP 的封装。

TCP 协议，那么大家的连接和断开，都要遵循 TCP 协议中的三次握手和四次握手 ，只是在连接之后发送的内容不同，或者是断开的时间不同。

对于 WebSocket 来说，它必须依赖 HTTP 协议进行一次握手 ，握手成功后，数据就直接从 TCP 通道传输，与 HTTP 无关了。


参考:
WebSocket（二）-WebSocket、Socket、TCP、HTTP区别
https://www.cnblogs.com/merray/p/7918977.html


TCP协议中的三次握手和四次挥手(图解)
http://blog.csdn.net/whuslei/article/details/6667471

OSI七层模型详解
http://blog.csdn.net/yaopeng_2005/article/details/7064869