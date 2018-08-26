/**
 * Created by lip on 2016/6/3.
 */
var $ = window.$ = require('jquery');
var React = require('react');
var ReactDom = require('react-dom');


var Config = require('./Config');
var Main = require('./component/Main');

var Dimensions = require('./Dimensions');
var Util = require('./Util');
var AudioMessage = require('./AudioMessage');
var User = require('./User');
var Group = require('./Group');
var Loading = require('./Loading');

var GHGuider = require('./component/GHGuider');
var Tabbar = require('./component/Tabbar');

var style = require('./css/style.scss');

var InnerRouter = require('./InnerRouter');

if( !Util.getUrlPara('code') ) {
    User.redirectToBaseInfo();
}

$(document).ready(() => {

    // alert("3");

    Util.postCnzzData('进入页面');

    //尺寸初始化
    new Dimensions().init();

    Loading.showLoading('获取信息...');

    if(!Util.isWeixin()){
        Loading.hideLoading();
        window.dialogAlertComp.show('提示','请复制地址并在微信中打开','知道啦',()=>{
            Loading.showLoading('获取信息...');
        },()=>{},false);
    }

    ////初始化用户信息
    User.initAccessInfo();

    ReactDom.render(<InnerRouter/>, $('#root')[0]);
});
