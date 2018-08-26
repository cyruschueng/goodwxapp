/**
 * 模块配置
 * Created by lip on 2016/7/13.
 */
var ENVIRONMENT = false;
if( location.href.indexOf('h5.ichangtou.com') > -1 ){
    //正式环境
    ENVIRONMENT = true;
}else {
    ENVIRONMENT = false;
}


var Config = {

    OAUTH_SUCCESS: "OAUTH_SUCCESS", // 登录成功的广播字段

    refresher: false,//刷新模块

    follower: true,//跟随者数量

    rank: false, //排行榜

    wxPay: true, //微信支付

    gift: false, //好友赠送

    courseImage: true, //课程广告图片

    mappLink: false, //m站链接

    ghQrcode: true, //公号二维码

    reward: false, //打赏

    others: false, //其他迷你课

    free: false, //面向免费

    limitFree: false, //限时免费

    tabbar: false, //底部的tabbar

    inputer: true, //评论输入

    summary: true, //迷你课汇总

    environment: ENVIRONMENT //正式环境or测试环境
};

module.exports = Config;
