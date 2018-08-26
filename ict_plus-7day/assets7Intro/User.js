/**
 * 登录授权
 * Created by lip on 2016/6/7.
 */
var $ = require('jquery');
var React = require('react');
var ReactDom = require('react-dom');
var Util = require('./Util');
var Config = require('./Config');
var OnFire =require('onfire.js');
var PayController = require('./PayController');
var RankingList = require('./RankingList');
var GHGuider = require('./component/GHGuider');
var DoneToast = require('./component/DoneToast');
var Loading = require('./Loading');
var WxConfig = require('./WxConfig');

const ACCESS_TOKEN_API = Util.getAPIUrl('authorization');
const USER_LEVEL_GENERAL = 0; //普通用户
const USER_LEVEL_VIP = 1;   //VIP用户（已付费）

//用户信息
var userInfo = null;
var userProfile = null;
//免费期限
var FREE_DEADLINE = '2016/7/22 12:0:0';

class User {

    /**
     * 获取用户信息
     * @returns {*}
     */
    static getUserInfo() {
        return userInfo || {};
    }




    /**
     * 初始化用户信息
     * 非微信浏览器不加载数据
     */
    static initAccessInfo() {
        if( !Util.isWeixin() ) {
            //QQ浏览器中不加载数据
            return;
        }

        //初始化微信通用接口
        // User.signWxApi();
        WxConfig.initWxConfig();
        //sharefix

        //蓝号进行授权后的
        if(Util.getUrlPara('istopay')){
            //设置支付APPID
            Util.setPayAppId();
            //从服务器上获取用于支付的openId
            User.getPayOpenIdFromSever();

            return;
        }


        //获取微信用户信息
        if(User.getWxUserInfoFromServer()) {
            //重定向走之后结束动作
            return;
        }
    }

    /**
     * 拉取服务器端的微信用户信息
     */
    static getWxUserInfoFromServer() {
        //携带在地址栏的code信息
        let code = Util.getUrlPara('code'),
            APIUrl = Util.getAPIUrl('base_login');

        if( !code ) {
            //地址栏里没有code 信息则重定向去微信静默授权
            User.redirectToBaseInfo(false);
            return true;
        }

        let jsonData = JSON.stringify({'code': code});
        if( Util.getUrlPara('isuserinfo') ) {
            //如果正在请求用户信息，则发送注册请求
            APIUrl = Util.getAPIUrl('userinfo_authorization');

            //增加channel
            jsonData =  JSON.stringify({'code': code , 'channel': '7'});
        }

        $.ajax({
            url: APIUrl,//静默授权登录
            data: jsonData,
            type: 'post',
            cache: false,
            contentType: 'application/json;charset=utf-8',
            dataType:'json',
            headers: {
                Accept:"application/json"
            },
            beforeSend: (request) => {
                request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
            },
            success: (data)=>{
                User.onGetWxInfoSuccess(data)
            },
            error: ()=>{
                User.onGetWxInfoError(false)
            }
        });

    }

    /**
     * 请求微信数据后的回调函数
     * @param data
     */
    static onGetWxInfoSuccess(data) {
        if( !data || !data.userId ) {
            //如果后台没有数据，代表没有授权过，去往snsapi_userinfo授权
            User.redirectToUserinfo(false);
            return;
        }

        //保存用户信息
        userInfo = {};
        userInfo.userId = data.userId;
        userInfo.sessionId = data.sessionId;
        userInfo.openId = data.openId;
        userInfo.nickName = data.nickName;
        if( userInfo.nickName && userInfo.nickName.length > 10 ){
            userInfo.nickName = userInfo.nickName.substr(0, userInfo.nickName.length-6);
        }

        userInfo.headImage = data.headImage;

        userInfo.subscribe = data.subscribe;//是否关注公众号
        // console.log('userInfo.subscribe ', userInfo.subscribe);

        userInfo.unionId = data.unionId;

        // TODO 检测用户nickName是否为空并上报
        console.log('userInfo.nickName = '+ userInfo.nickName);
        if(!userInfo.nickName) {
            Util.postCnzzData('获取用户名为空', 'nickName=' + userInfo.nickName + ';' + 'userId=' + userInfo.userId);
        }

        //配置分享内容
        WxConfig.shareConfig();

        console.log('unionId'+userInfo.unionId);


        //查询是否有支付的openId，没有就去做支付账号的登录，
        if(data.payOpenId){

            userInfo.payOpenId = data.payOpenId;

            //设置用户信息缓存 此处缓存是为了第二次蓝号授权后，可以使用用户的其他信息
            localStorage.setItem('user-info',JSON.stringify(userInfo));

            Util.postCnzzData("用户登录");

            //触发登录成功事件
            OnFire.fire('OAUTH_SUCCESS',data);

            Loading.hideLoading();
        }
        else{
            //设置用户信息缓存 此处缓存是为了第二次蓝号授权后，可以使用用户的其他信息
            localStorage.setItem('user-info',JSON.stringify(userInfo));

            //设置支付APPID
            Util.setPayAppId();

            //静默授权（使用可支付公号的APPID）
            console.log('静默授权（使用可支付公号的APPID）');
            User.redirectToBaseInfo(true);
        }


    }

    /**
     * 从服务器上获取用于支付的openId
     */
    static getPayOpenIdFromSever() {
        //携带在地址栏的code信息
        let code = Util.getUrlPara('code'),
            APIUrl = Util.getAPIUrl('get_pay_openid');

        if( !code ) {
            //地址栏里没有code 信息则重定向去微信静默授权
            console.log(' 从服务器上获取用于支付的openId地址栏里没有code 信息则重定向去微信静默授权');
            User.redirectToBaseInfo(true);
            return true;
        }

        userInfo = JSON.parse(localStorage.getItem('user-info'));
        console.log('userInfo'+userInfo);

        let jsonData = JSON.stringify({
            'code': code,
            'unionId': userInfo.unionId
        });

        $.ajax({
            url: APIUrl,//静默授权登录
            data: jsonData,
            type: 'post',
            cache: false,
            contentType: 'application/json;charset=utf-8',
            dataType:'json',
            headers: {
                Accept:"application/json"
            },
            beforeSend: (request) => {
                request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
                request.setRequestHeader("X-iChangTou-Json-Api-User",userInfo.userId);
            },
            success: (data)=>{
                console.log('从服务器上获取用于支付的openId',data);

                userInfo.payOpenId = data.openId;

                Util.postCnzzData("用户登录");

                OnFire.fire('OAUTH_SUCCESS',userInfo);

                Loading.hideLoading();
                console.log('userInfo',userInfo);
            },
            error: ()=>{
                User.onGetWxInfoError(true)
            }
        });

    }


    /**
    **
    * 21天获取用户的基本信息
    * nickName
    * portrait
    * bonusPoint
    * @returns {*}
     */

    static getUserProfileFromServer(userId){

        return $.ajax({
            url: Util.getAPIUrl('user_profile'),
            type: 'get',
            cache: false,
            contentType: 'application/json;charset=utf-8',
            dataType:'json',
            headers: {
                Accept:"application/json"
            },
            beforeSend: (request)=>{
                request.setRequestHeader("X-iChangTou-Json-Api-User", userId);
                request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
            },
            success: (data) => {
               // alert('success data',data);
               // userProfile =data;

            }
        });

    }

    /**
    * 21天报名获取用户信息
    * */

    static getUserProfile(){
        return userProfile
    }

    /**
     * 根据openId，向服务器请求用户详细信息
     * @param openId
     */
    static getUserInfoById(userId, successCallBack, failureCallBack) {
        $.ajax({
            url: Util.getAPIUrl('get_userinfo_byid'),
            type: 'get',
            cache: false,
            contentType: 'application/json;charset=utf-8',
            dataType:'json',
            headers: {
                Accept:"application/json"
            },
            beforeSend: (request)=>{
                request.setRequestHeader("X-iChangTou-Json-Api-User", userId);
                request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
            },
            success: (data) => {
                successCallBack && successCallBack(data);
            },
            error: (err) => {
                failureCallBack && failureCallBack(err);
            }
        });
    }

    /**
     * 获取微信数据失败
     */
    static onGetWxInfoError(topay) {
        console.log('获取微信数据失败');
        User.redirectToUserinfo(topay);
    }

    /**
     * 重定向到微信的静默授权页面
     */
    static redirectToBaseInfo(istopay) {
        if( Util.getDebugFlag() ) {
            return;
        }

        if( !Util.isWeixin() ){
            //QQ中打开不跳转
            return;
        }

        //不带code的话，强制去静默授权
        let redirectUri = Util.getRedirectUri(false,istopay),
            scope = 'snsapi_base';//snsapi_userinfo;


        let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + Util.getAppId() +
            '&redirect_uri=' + redirectUri +
            '&response_type=code' +
            '&scope=' + scope +
            '&state=minic&connect_redirect=1#wechat_redirect';

        console.log('url'+url);

        window.location.href = url;
    }

    /**
     * 重定向到微信的userInfo授权（会弹出绿色的授权界面）
     */
    static redirectToUserinfo(topay) {
        if( !Util.isWeixin() ){
            //QQ中打开不跳转
            return;
        }

        //不带code的话，强制去静默授权
        let redirectUri = Util.getRedirectUri(true,topay),
            scope = 'snsapi_userinfo';//snsapi_userinfo;


        //记录请求次数，超过3次，则不再请求
        let errCounter = 0;
        if( localStorage.getItem('userInfoErrCounter') ){
            errCounter = parseInt(localStorage.getItem('userInfoErrCounter'));
        }
        if( errCounter > 3 ) {
            localStorage.removeItem('userInfoErrCounter');
            Loading.hideLoading();
            return;
        }else {
            localStorage.setItem('userInfoErrCounter', errCounter+1);
        }

        let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + Util.getAppId() +
            '&redirect_uri=' + redirectUri +
            '&response_type=code' +
            '&scope=' + scope +
            '&state=minic#wechat_redirect';

        console.log('url'+url);

        location.href = url;
    }

}
window.User = User;

module.exports = User;
