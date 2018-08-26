/**
 * Created by lip on 2016/6/3.
 */
//dayInfo&versionInfo
//d9.1.1
//v2.3

var $ = window.$ = require('jquery');
var React = require('react');
var ReactDom = require('react-dom');

var Dimensions = require('./Dimensions');
var Util = require('./Util');
var User = require('./User');
var Loading = require('./Loading');

//全局的
//工程中用到的
var style = require('./css/style.scss');
var DialogAlert = require('./component/DialogAlert');

var InnerRouter = require('./InnerRouter');
var BeforeStart = require('./GlobalFunc/BeforeStart');
var MyStorage = require('./GlobalFunc/MyStorage');
var GlobalExp = require('./GlobalFunc/GlobalExp');

let test = false;

//上报启动时间
let endTime = new Date().getTime();
let startTime = sessionStorage.getItem('startTime');
let totalTime = 0;
if(startTime) {
    totalTime = endTime - startTime;
    totalTime = totalTime/1000;
    // totalTime = parseInt(totalTime);
}
startTime = sessionStorage.setItem('startTime',totalTime);
window.dplus.track('js加载完毕',{'TotalCost': totalTime});

// alert('FinishRes' + totalTime);

//初始化用户信息
// alert("bundle ready");
$(document).ready(() => {
    // alert("html ready");
    User.listenUserInfoLoaded()
    if(!Util.isWeixin()){
        console.log('!is note wx');
        if(location.href.indexOf('ictProject') > 1 ) {
            console.log('is test wx');
            alert('请复制地址并在微信中打开');
            new Dimensions().init();
            //1设置固定id
            // User.setUserIdTest('9d00b607f691432dbab277e028f7fe64');
            // User.setUserIdTest('1f695351270d463181ab67d0cba12d9a');//自己的
            User.setUserIdTest('f71b5152e85a4ddeb87c6837f8b487fc');//自己的测试
            //2设置分享
            sessionStorage.setItem('wxshare',true);
            let goWhere = BeforeStart.init();
            ReactDom.render(<InnerRouter goWhere = {goWhere}/>, $('#root')[0]);
        } else {
            Loading.hideLoading();
            new Dimensions().init();
            ReactDom.render(<InnerRouter goWhere = 'initPage'/>, $('#root')[0]);
            // window.dialogAlertComp.show('提示','请复制地址并在微信中打开','知道啦',()=>{
            //     Loading.showLoading('请在微信中打开(微信扫码)...');
            // },()=>{},false);
        }
    } else {
        if( Util.getUrlPara('code') ) {
            new Dimensions().init();
            if (window.sessionStorage.getItem('wx-user-info')) {
                Loading.hideLoading();
            } else {
                Loading.showLoading('获取信息...');
            }
            //尺寸初始化
            let goWhere = BeforeStart.init();
            ReactDom.render(<InnerRouter goWhere = {goWhere}/>, $('#root')[0]);
            // alert("start react");
        }
    }

});
