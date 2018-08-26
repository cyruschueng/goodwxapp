import Util from '../../utils/util';
const API = require("../../utils/api.js");
const Auth = require("../../utils/auth.js");
const App = getApp();
let that;
Page({
    data: {
        isGroup:false,
        share_title: '转发到其他微信群PK手速',
        app_title: '点击生成小程序码',
        scene: getApp().globalData.scene,
        banner: '',
        weapp: '',
        gid: '',
        userData: Auth.user(),
        speedsData: [{},{},{}], //前3名
        speedsList: [], //步数列表
    },

    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
        that = this;
        if(options.event_id){
            that.setData({ 
                event_id: options.event_id,
            });
        }
        API.getBanner().then(res => {
            that.setData({
                banner: res.banner,
                weapp: res.weapp
            });
        }, err => {
            console.log('获取Banner失败', res);
        });
    },
    onShow: function() {
        wx.showShareMenu({ withShareTicket: true });
        let gid         = getApp().globalData.gid;
        let scene       = getApp().globalData.scene;
        that.setData({ 
            userData: Auth.user(),
            scene: scene,
        });
        let args={};
        if (scene == 1044) {
            that.setData({ isGroup: true});
            Auth.checkSession().then(code=>{
                if(code){
                    args.code = code;
                }
                Auth.checkOrGetUserInfo().then(user_res=>{
                if(user_res.iv){
                    args.iv = user_res.iv;
                    args.encrypted_data = user_res.encryptedData;
                }

                that.setData({ 
                    args:args,
                    userData: user_res.userInfo
                });
                wx.setStorageSync('user', user_res.userInfo);
                args.event_id = that.data.event_id;
                if(gid){
                    args.gid = gid;
                    that.getGroupSpeeds(args);
                }else if(getApp().globalData.shareTicket){
                    wx.getShareInfo({
                        shareTicket: getApp().globalData.shareTicket,
                        success: function(share_res) {
                            args.share_iv = share_res.iv;
                            args.share_encrypted_data = share_res.encryptedData;
                            that.getGroupSpeeds(args);
                        },
                        fail: function(err) {
                            console.log(err);
                        }
                    });
                }
            }, err=>{
                console.log(err);
            });
            }, err=>{
               console.log(err);
            });
        }else{
            Auth.checkOrLogin().then(res=>{//登录
                that.setData({
                    userData: res
                });
            });
          
        }
    },

    getGroupSpeeds: function(args, setdata=true){
        console.log("args", args);
        return new Promise(function(resolve, reject) {
            API.getGroupSpeeds(args).then(res=>{
                console.log("resLLL:",res);
                if(setdata){
                    let args={};
                  if(res.user){//第一次请求保存信息，onShareAppMessage
                        API.storageUser(res.user);
                        args.userData = Auth.user();
                    }

                    if(res.gid){
                        getApp().globalData.gid = res.gid;
                    }
                    
                    if(res.speeds){
                        let speedsData = (res.speeds.length >= 3) ? res.speeds.slice(0, 3) : res.speeds;
                        if (speedsData.length == 1) {
                            speedsData = [].concat(speedsData, [{},{}]);
                        } else if (speedsData.length == 2) {
                            speedsData = [].concat(speedsData, [{}]);
                        }

                        if (speedsData.length) {
                            let temp = speedsData[0];
                            speedsData[0] = speedsData[1];
                            speedsData[1] = temp;
                        }

                        let speedsList = res.speeds;
                        args.speedsList = speedsList;
                        args.speedsData = speedsData;
                        //args.gid = res.gid;
                        //getApp().globalData.gid = res.gid;
                    }
                    that.setData(args);
                    console.log("data", that.data);

                }
                resolve(res);
            },err=>{
                reject(err);
            });
        });
    },
    // 预览图片功能
    previewImageTap: function(e) {
        if (this.data.weapp.appid) {
            wx.navigateToMiniProgram({
                appId: this.data.weapp.appid,
                path: this.data.weapp.path,
                envVersion: this.data.weapp.version,
                success(res) {
                    // 打开成功
                    console.log('跳转成功');
                }
            })
        } else {
            wx.previewImage({
                current: this.data.banner,
                urls: [this.data.banner]
            })

        }
    },
   
    onReady: function() {
        // 页面渲染完成
    },

    onHide: function() {
        // 页面隐藏
    },
    onUnload: function() {
        // 页面关闭
    },
    // 分享页面功能
    onShareAppMessage: function(res) {
        var event_id = Util.uuid();
        that.setData({ 
                event_id:event_id
            });
        // 来自页面内转发按钮
        return {
            title: '本群手速排行榜，最慢的发红包！',
            path: '/pages/index/index?event_id='+event_id,
            success(res) {
                let data = {};
                data.event_id = event_id;
                that.getGroupSpeeds(data);
            }
        }
    },


})