const testPic = "../../images/test.jpeg";
const API = require("../../utils/api.js");
const Auth = require("../../utils/auth.js");
const App = getApp();
let that;
Page({
    data: {

        banner: API.getStorageSync('banner'),
        weapp: API.getStorageSync('weapp'),
        scrollData: [],

    },

    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
        that = this;
        that.setData({
            scrollData: [testPic, testPic, testPic, testPic, testPic, testPic, testPic]
        })
    },
    onShow: function() {


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
    onShareAppMessage: function() {
        return {
            title: '本群懒人排行榜，最懒的发红包！',
            path: '/pages/index/index',
            success(res) {
                console.log('share', res)
            }
        }
    },
})