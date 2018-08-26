# 小程序获取群聊 `openGId` 测试

该 Demo 可以模拟小程序获取群聊唯一 ID `openGId` 的方法，包括小程序的加密数据获取，以及 Node.js 服务器解密示例。

调试状态下获取加密数据的方法：

1. 将项目引入至微信开发者工具中。
2. 点击页面左侧「自定义编译」按钮（「编译」按钮下方），选择场景值 `1044`，再选择一个测试群聊。之后，重新编译会在控制台输出加密后的相应群聊唯一 ID 信息。
3. 点击右上角的「更多」-「转发」，模拟转发到一个群，控制台也会输出加密后的目标群聊 ID。

获取解密后的数据的方法：

1. 安装 Node.js（废话……）
1. 先向微信请求 `session_key`（代码中已有 `wx.login` 调试输出 `code` 的步骤，可用 Postman 等工具进行模拟请求，具体获取方法见 [这里](https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html)）。
2. 将加密数据、`session_key`、小程序 `appid` 等信息填入 `Node` 文件夹中的 `demo.js` 文件相应的部分。
3. 使用终端（Terminal）进入 `Node` 文件夹，执行 `node demo.js` 即可。

