// var host = "https://wxapp.37hulian.com/ktc/"
// var host = "http://xcx-ct.tp5.com/ktc/";
var host = "https://yangzhiou.mqvt1.cn/public/index.php/index/"   //使用域名

var config = {
  // 下面的地址配合云端 Server 工作
  host,
  apiUrl: host,
  // 用code换取openId
  userOpenidUrl: `${host}User/openid`,
  //获取用户图像名称信息
  userInfoUrl: `${host}User/user`,
  //进入答题
  startplayUrl: `${host}Topic/start`,
  //挑战成功
  overplayUrl: `${host}Topic/over`, 
  //获取题库
  itemUrl: `${host}Topic/index`,
  // 用户智力排行榜
  ZuserlistUrl: `${host}Ranking/zlranking`,
  // 用户毅力排行榜
  YuserlistUrl: `${host}Ranking/ylranking`,
  //获取好友信息
  friendInfoUrl: `${host}Friends/addfriends`,
  //好友排行
  friendlistUrl: `${host}Ranking/friend`, 
  //获取formId
  formIdUrl: `${host}User/fromid`,   
  //奖品图片
  imgUrl: `${host}Img/wawa`,
  //我的奖品
  rankUrl: `${host}User/rank`,
  //跳小程序
  appidUrl: `${host}Img/tapp`,
  //分享群
  shareUrl: `${host}index/qun`,
  //跳链接
  ImgUrl: `${host}Img/imgs`,
};
module.exports = {
  host: host,
  config: config,
}
