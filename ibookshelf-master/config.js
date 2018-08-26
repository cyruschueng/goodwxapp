/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

// var backendHost = "91885721.ibookshelfs.com"
var backendHost = "127.0.0.1:3000"

var doubanApi = "api.douban.com"

var config = {

  // query book info
  queryBookInfoUrl: `https://api.douban.com/v2/book/isbn/`,

  // check ownedbook info
  chkBookInfoUrl: `http://${backendHost}/chkownedbooks/`,

  // url 4 get openid
  openidUrl: `http://${backendHost}/openid/`,

  // url 4 operation to userinfo
  userInfoUrl: `http://${backendHost}/userInfo/`,

  // url 4 get UserConf
  userConfUrl: `http://${backendHost}/userConf/`,

  // url 4 get the count of ownedbooks
  countOwnedBooksUrl: `http://${backendHost}/countOwnedBooks/`,

  // url 4 get ownedbooks
  ownedbooksUrl: `http://${backendHost}/ownedbooks/`,

  // url 4 search everything
  searchUrl: `http://${backendHost}/search/`,

  // url 4 decrypt
  decryptUrl: `http://${backendHost}/decrypt/`,

};

module.exports = config
