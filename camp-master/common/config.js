/**
 * 小程序配置文件
 */
https://camp.theforward.xyz/img/thumbnail_demo.jpeg
var hosts = 'https://camp.theforward.xyz';

var config = {
  /**
   * 图片路径
   */
  imageServer: `${hosts}/photo/`,

  /**
   * hosts
   */
  hosts: hosts,

  /**
   * API
   */
  api: `${hosts}/api`,

  // 登录地址，用于建立会话
  loginUrl: `front/login`,

  // 发送模板消息接口
  templateMessageUrl: `front/template`,

  // 支付
  payUrl: `front/pay`,

  // 上传文件接口
  uploadFileUrl: `front/upload`,

  // 人民币符号
  dollar: '¥'
};

module.exports = config
