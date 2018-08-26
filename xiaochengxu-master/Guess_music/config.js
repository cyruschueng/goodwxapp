// var host = "https://wxapp.37hulian.com/ktc/"
// var host = "http://xcx-ct.tp5.com/ktc/";
var host = "https://caimusic4.mytp8.cn/public_html/index.php/ktc/"   //使用域名

var config = {
  // 下面的地址配合云端 Server 工作
  host,
  apiUrl: host,
  //获取数据
  itemUrl: `${host}wxapi/getitem`,
  //用户等级
  userlvUrl: `${host}user/getlv`, 
  //获取题库
  itemlvUrl: `${host}items/getlv`,
  //更新用户信息
  userInfoUrl: `${host}user/userupdate`, 
  //微测试所需要模块
  // 用code换取openId
  openIdUrl: `${host}user/openid`,
  // 登录地址，用于建立会话
  userinfoUrl: `${host}user/userinfo`,
  //获取formId
  formIdUrl: `${host}user/usersetformid`,   
};
module.exports = {
  host: host,
  config: config,
}
