业务中看到的常见的三种模式，问题的核心就是数据交给谁去处理。
数据交给后台处理，这是模式一，
数据交给前端处理，这是模式二，
数据交给前端分层处理，这是模式三。



阿里接口文档

IMS以及DIP




jsonp 只能使用 get 方式插入 script 节点去请求数据，但是 POST，只能呵呵了。

这里的处理也有多重方式可以参考：

1.修改 Hosts，让 mock 的域名指向开发域名
2.mock 设置 header 响应头，Access-Allow-Origin-Control



拿到跨域的接口信息，我也给出几个参考方案：

1.fiddler 替换包， 
2.HTTPX
3.	自己写一段脚本代理，也就是本地开一个代理服务器，这里需要考虑端口的占用问题。其实我不推荐监听端口，一个比较不错的方案是本地请求全部指向一个脚本文件，然后脚本转发URL，如：
原始请求：http://barretlee.com/api/test.json
在ajax请求的时候：
$.ajax({
  url: "http://<local>/api.php?path=/api/text.json"
});
php中处理就比较简单啦：

if(!isset($_GET["page"])){
  echo 0;
  exit();
}
echo file_get_contents($_GET["path"]);
Ctrl+S,保存把线上的接口数据到本地的api文件夹吧-_-||

