
ajax 
 XMLHttpRequest 对象的三个重要的属性：readyState,status,onreadystatechange

readyState 改变时，就会触发 onreadystatechange 事件。
readyState 属性存有 XMLHttpRequest 的状态信息。

status
服务器常用的状态码及其对应的含义如下：
 200：服务器响应正常。
 304：该资源在上次请求之后没有任何修改（这通常用于浏览器的缓存机制，使用GET请求时尤其需要注意）。
 400：无法找到请求的资源。
 401：访问资源的权限不够。
 403：没有权限访问资源。
 404：需要访问的资源不存在。
 405：需要访问的资源被禁止。
 407：访问的资源需要代理身份验证。
 414：请求的URL太长。
 500：服务器内部错误。