/**
 * 小程序配置文件
 */

var host = "55251326.qcloud.la"

var config = {

  // 下面的地址配合云端 Server 工作
  host,

  // 请求地址，用于设置会面
  requestUrl: `https://${host}/servlet/GPMeeting`,

  // 与openId有关的请求处理
  openIdUrl: `https://${host}/servlet/OpenID`,

  // 与openGId有关的请求处理
  openGIdUrl: `https://${host}/servlet/HelloServlet`,

  // 与提醒有关的请求地址
  formIdUrl: `https://${host}/servlet/Remind`,
  
  // 发送模板消息接口
  templateMessageUrl: `https://${host}/servlet/SendMessage`,
};

module.exports = config