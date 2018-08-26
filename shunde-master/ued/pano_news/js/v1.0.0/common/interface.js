/**
 * @description: 接口
 * @author: Franco
 * @update:
 */

// server_cemp_host= 'http://192.168.1.242:8080';
define('common/interface', [], function(){
    return {
        /**
         * 接口连接配置
         */
        getApiUrl : function(){
            return {
                tockenGet : server_luna_host+'/access-token/apply', //新闻认证获取签名
                tockenLogin : server_news_host+'/rest/auth/tokenLogin', //新闻认证登录地址
                loginUrl : server_news_host + '/rest/auth/login', //登录 ../json/login.json
                logoutUrl : server_news_host + '/rest/auth/logout', //'../json/logout.json', //退出登录    ../json/logout.json
                permission: base_host + 'json/permission.json',
                getDirectories: server_news_host + '/rest/user/getDirectories',
                createAlbumUrl : server_news_host + '/rest/album/create', //新建相册
                getAlbumUrl : server_news_host + '/rest/album/get', //根据相册id获取相册信息
                getSignature : server_news_host + '/rest/cos/signature',//获取上传图片签名
                setAlbumUrl : server_news_host + '/rest/album/update', //根据相册id保存相册信息
                getPanoInfoUrl : server_news_host + '/rest/pano/search',//根据关键字、设备类型、时间查询全景信息
                getDeviceModelsUrl: server_news_host + '/rest/pano/getDeviceModels',//获取添加图片时可选取的设备类型
                getAlbumAll: server_news_host + '/rest/album/all',
                getAlbumList: server_news_host + '/rest/album/search', //获取新闻列表
                changeStatus: server_news_host + '/rest/album/changeStatus',  //编辑新闻状态
                getUserStatusUrl : '/api/isLogin', //获取登录状态
                getBaseInfoUrl : base_host+'json/base.json', //获取分享内容
                getShareInfoUrl : base_host+'json/share.json', //获取分享内容
                getAllMarkersFromPanoUrl : 'http://data.pano.visualbusiness.cn/rest/album/view/{0}',   //从国vpano服务器获取所有marker点信息
                searchTodayVisit: server_news_host + '/rest/album/statist/searchTodayVisit',
                getVisit: server_news_host + '/rest/album/statist/getVisit',
                uploadToLuna: 'http://luna.visualbusiness.cn' + '/luna-web/common/merchant/upload',

                //微信
                wxlogin : server_wx_host+'/pay-service/identity/wx/userInfo?appId='+server_wx_appid+'&redirectUrl={0}',//微信登陆获取头像等用户信息
                wxSilentLogin : server_wx_host+'/pay-service/identity/wx/openId?appId='+server_wx_appid+'&redirectUrl={0}',//微信登陆只要openid 不需要用户其他信息
                wxGetCode :'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0822f1c3513405ef&redirect_uri={0}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect',//
                wxGetUserOpenID :server_wx_host+'/pay-service/identity/wx?code={0}&state={1}',//获取用户openID
                
                

                getUrlNone:"/" //无地址

            }
        }
    }

});