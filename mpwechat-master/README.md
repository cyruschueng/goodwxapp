# mpwechat
微信小程序开发

# 遇到的问题
---
1. 使用`ovetflow:scroll`后，页面局部滚动会卡顿
 解决方法：父级元素 添加`position:relative`

2. wx.request POST 方法 参数传输服务器接收不到的bug
 解决方法：wx.request post的content-type 默认为‘application/json’,如果服务器没有用到json解释的话，可以把 header 中content-type设置为：application/x-www-form-urlencoded

3. session_key有效时间 即wx.checkSession 过期时间
 解决方法：session_key在微信服务器有效期是30天，建议服务端缓存session_key不超过30天。

 11111