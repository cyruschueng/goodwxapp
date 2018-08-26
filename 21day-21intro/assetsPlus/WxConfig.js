/**
 * Created by lip on 2016/7/20.
 */

var $ = require('jquery');
var OnFire= require('onfire.js');
var shareConfigFlag = true;
const Tools = require('./GlobalFunc/Tools');

class WxConfig {
    /**
     * 初始化微信配置
     */
    static initWxConfig() {
        // Util.isWeixin() && WxConfig.signWxApi().done((data)=>{
        //   WxConfig.wxconfig(data)
        // });
    }

    /**
     * 初始化为微信的普通API
     */
    static signWxApi() {
        let url = JSON.stringify({'url': location.href});

        return $.ajax({
            url: Util.getAPIUrl('wx_sign'),
            data: url,
            type: 'post',
            cache: false,
            contentType: 'application/json;charset=utf-8',
            dataType:'json',
            headers: {
                Accept:"application/json"
            },
            beforeSend: (request)=>{
                request.setRequestHeader("X-iChangTou-Json-Api-Token", Util.getApiToken());
            }
        });
    }

    /**
     * 配置微信
     * @param data
     */
    static wxconfig(data) {
        data = data || {};
        wx.config({
            //debug: true,
            appId: data.wechat_appid,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'chooseWXPay'
            ]
        });

        wx.ready( () => {
            //sharefix
            // 登录后再配置微信分享
            let userId = User.getUserInfo().userId;
            Tools.fireRace(userId,"OAUTH_SUCCESS").then(()=>{
                userId = User.getUserInfo().userId;
                sessionStorage.setItem('wxshare',true);
                OnFire.fire('wxshare');
            });
        });
    }
    /**
     * 触发额外分享的对应编号
     * 额外参数为自定义的分享链接参数
     * @param sharePage
     */
    static shareConfig(sharePage,data) {
        let link,title,desc,channel;
        //这个保证了 1)有userId 2)ready之后
        let params = data;
        // for(let i = 1 ; i < arguments.length; i++) {
        //     params.push(arguments[i]);
        // }
            let imgUrl;
            let userInfo = User.getUserInfo();
            if (userInfo) {
                imgUrl = userInfo.headImage;
            }

            let courseId = sessionStorage.getItem('courseId');
            //默认 or 界面跟多的分享?
            let pathNow = sharePage ? sharePage : sessionStorage.getItem('pathNow');
            let shareInfo = GlobalConfig.getShareInfo(courseId,pathNow,params);


            let originLink = Util.getShareLink();
            link =  originLink + shareInfo.link;
            desc =  shareInfo.desc;
            title = shareInfo.title;

            if( !imgUrl ) {
                imgUrl = 'https://h5test.ichangtou.com/minic/assetsPlus/image/logo.png';
            }

            let type = "img";

            let timelineOpt = {
                title,
                desc,
                link,
                imgUrl,
                type,
                success: ()=>{
                    Util.onShareSuccess('朋友圈',channel || '');
                },
                cancel: ()=>{
                    Util.onShareFailure('朋友圈',channel || '');
                }
            }, messageOpt = {
                title,
                desc,
                link,
                imgUrl,
                type,
                success: ()=>{
                    Util.onShareSuccess('消息',channel || '');
                },
                cancel: ()=>{
                    Util.onShareFailure('消息',channel || '');
                }
            }, QQOpt = {
                title,
                desc,
                link,
                imgUrl,
                success: ()=>{
                    Util.onShareSuccess('QQ',channel || '');
                },
                cancel: ()=>{
                    Util.onShareFailure('QQ',channel || '');
                }
            }, weiboOpt = {
                title,
                desc,
                link,
                imgUrl,
                success: ()=>{
                    Util.onShareSuccess('weibo',channel || '');
                },
                cancel: ()=>{
                    Util.onShareFailure('weibo',channel || '');
                }
            };

            wx.onMenuShareTimeline(timelineOpt);
            wx.onMenuShareAppMessage(messageOpt);
            wx.onMenuShareQQ(QQOpt);
            wx.onMenuShareWeibo(weiboOpt);

            shareConfigFlag = false;
        
    }
}
module.exports = WxConfig;
