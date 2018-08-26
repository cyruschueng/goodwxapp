// pages/my/index.js
const app = getApp()
const util = require('../../utils/util.js')
Page({

        data: {
                items: [
                        {
                                icon: '../../images/my_order.png',
                                text: '我的订单',
                                path: '/pages/myOrder/index'
                        },
                        {
                                icon: '../../images/my_about.png',
                                text: '设置',
                                path: '/pages/setting/index'
                        }
                ],

                gridItems: [
                        {
                                icon: '../../images/my_sc.png',
                                text: '我的收藏',
                                path: '11'
                        },
                        {
                                icon: '../../images/my_kf.png',
                                text: '在线客服',
                                path: null,
                        },
                        {
                                icon: '../../images/my_tjyj.png',
                                text: '推荐有奖',
                                path: '11'
                        },
                        {
                                icon: '../../images/my_yjfk.png',
                                text: '建议反馈',
                                path: '/pages/feedBack/index'
                        },
                        {
                                icon: '../../images/my_wyhz.png',
                                text: '我要合作',
                                path: '/pages/cooperate/index'
                        },
                        {
                                icon: '../../images/my_about.png',
                                text: '关于我们',
                                path: '/pages/aboutUs/index'
                        }
                ],
                userInfo: null
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
                console.log("onload")
                var memeberguid = wx.getStorageSync("memberguid")

                if (util.isEmpty(memeberguid)) {
                        this.setData({
                                nickName: app.globalData.userInfo.nickName,
                                avatarUrl: app.globalData.userInfo.avatarUrl,
                        });
                } else {
                        this.setData({
                                nickName: app.globalData.eUserInfo.NickName,
                                avatarUrl: app.globalData.eUserInfo.HeadImg,
                        });
                }

        },
        toLogin: function (options) {
                var that = this;
                //未授权 去授权登录
                app.wxAuthorize()
                
        },
        navigateTo: function (e) {
                const index = e.currentTarget.dataset.index
                const path = e.currentTarget.dataset.path
                console.error(index + path)
                var my_authorize = wx.getStorageSync('wx_authorize')
                var token = wx.getStorageSync('token')
                switch (index) {
                        case 0:
                                if(my_authorize){
                                    if(token==''){
                                        wx.navigateTo({
                                          url: '../login/index?id=1'
                                        })
                                    }else{
                                        wx.navigateTo({
                                          url: path
                                        })
                                    }
                                    
                                }else{
                                    app.wxAuthorize();
                                }
                                break
                        default:
                                wx.navigateTo({
                                        url: path,
                                        success: function(res) {},
                                        fail: function(res) {},
                                        complete: function(res) {},
                                })
                }
        },
        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        onReady: function () {
                console.log("onReady")
        },

        /**
         * 生命周期函数--监听页面显示
         */
        onShow: function () {
                var that=this
                console.log("onShow")
                setTimeout(function () {
                        console.log("userInfo:" + app.globalData.userInfo)
                        var memeberguid=wx.getStorageSync("memberguid")
                        
                        if (util.isEmpty(memeberguid)){
                                that.setData({
                                        nickName: app.globalData.userInfo.nickName,
                                        avatarUrl: app.globalData.userInfo.avatarUrl,
                                });
                        }else{
                                that.setData({
                                        nickName: app.globalData.eUserInfo.NickName,
                                        avatarUrl: app.globalData.eUserInfo.HeadImg,
                                });
                        }
                       
                }, 2000);
        },

        /**
         * 生命周期函数--监听页面隐藏
         */
        onHide: function () {
                console.log("onHide")
        },

        /**
         * 生命周期函数--监听页面卸载
         */
        onUnload: function () {
                console.log("onUnload")
        },

        /**
         * 页面相关事件处理函数--监听用户下拉动作
         */
        onPullDownRefresh: function () {

        },

        /**
         * 页面上拉触底事件的处理函数
         */
        onReachBottom: function () {

        }
})