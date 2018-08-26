/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://emodpztl.qcloud.la'
// var host = 'https://jcoizrzz.pengcier.cn'

var config = {

  host,

  // 登录地址，用于建立会话
  loginUrl: `${host}/weapp/login`,

  // 测试的请求地址，用于测试会话
  requestUrl: `${host}/weapp/user`,

  // 测试的信道服务地址
  tunnelUrl: `${host}/weapp/tunnel`,

  // 上传图片接口
  uploadUrl: `${host}/weapp/upload`,


  // 数据解密
  decryptData: `${host}/weapp/decryptData`,
  // 创建接龙
  createSequence: `${host}/weapp/createSequence`,
  // 获取参与的接龙
  getJoinSequence: `${host}/weapp/getJoinSequence`,
  // 获取围观的接龙
  getFollowSequence: `${host}/weapp/getFollowSequence`,
  // 获取今日接龙排行榜
  getTodaySequenceRank: `${host}/weapp/getTodaySequenceRank`,
  // 获取今日用户排行榜
  getTodayUserRank: `${host}/weapp/getTodayUserRank`,
  // 获取总接龙排行榜
  getAllSequenceRank: `${host}/weapp/getAllSequenceRank`,
  // 获取总用户排行榜
  getAllUserRank: `${host}/weapp/getAllUserRank`,
  // 获取接龙
  getSequence: `${host}/weapp/getSequence`,
  // 设置用户接龙关系
  setUserSequenceMap: `${host}/weapp/setUserSequenceMap`,
  // 保存分享信息
  saveShareInfo: `${host}/weapp/saveShareInfo`,
  // 获取成语列表
  getIdioms: `${host}/weapp/getIdioms`,
  // 点赞、点踩
  setLike: `${host}/weapp/setLike`,
  // 保存成语
  saveIdiom: `${host}/weapp/saveIdiom`
}

module.exports = config