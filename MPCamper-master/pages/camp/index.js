// pages/camp/index.js
const app = getApp()

const request = require('../../utils/request.js')
var CONFIG = require('../../utils/config.js')
const util = require('../../utils/util.js')
var width;
var height;

Page({

        /**
         * 页面的初始数据
         */
        data: {
                camp: [],
                width: '',
                hight: '',
                telstatus: true
        },
        goTel: function (e) {
                app.tel("");
        },
        /**
         * 接口调用成功处理
         */
        successFun: function (id,res, selfObj) {
                if (res.res_code == 200) {
                        var camp = res.data;
                        var camps = [];
                        console.log("length:" + camp.length)
                        if (camp.length > 0) {
                                for (var i = 0; i < camp.length; i++) {
                                        var obj = camp[i]
                                        obj.Img = util.spiltStr(obj.Imgs)[0] + "_" + parseInt(width) + "X" + parseInt(width / 2) + ".jpg";
                                        obj.i = i;
                                        camps.push(obj);
                                }
                        }
                        selfObj.setData({
                                camp: camps
                        });
                }
                wx.stopPullDownRefresh(); //停止下拉刷新
        },
        /**
         * 接口调用失败处理
         */
        failFun: function (id,res, selfObj) {
                console.log('failFun', res)
        },
        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
                width=app.globalData.width;
                height=app.globalData.height;
                if (!util.isEmpty(options.inviteId)) {
                        console.log("inviteId:" + options.inviteId)
                        wx.setStorageSync('inviteId', options.inviteId)
                }
                this.getList(this);
        },
        /**
         * 页面相关事件处理函数--监听用户下拉动作
         */
        onPullDownRefresh: function () {
                var that = this;
                console.log("下拉刷新")
                this.getList(that);
        },
        getList: function (that) {
                //获取营地列表
                var url = CONFIG.API_URL.GET_CampOwerData
                var params = {}
                request.GET(url, params, 100, true, that, that.successFun, that.failFun)
        },
        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        onReady: function () {

        },

        /**
         * 生命周期函数--监听页面显示
         */
        onShow: function () {

        },

        /**
         * 生命周期函数--监听页面隐藏
         */
        onHide: function () {

        },

        /**
         * 生命周期函数--监听页面卸载
         */
        onUnload: function () {

        },

        

        /**
         * 页面上拉触底事件的处理函数
         */
        onReachBottom: function () {

        },

        /**
         * 用户点击右上角分享
         */
        onShareAppMessage: function () {
                var inviteId = wx.getStorageSync('memberguid')
                console.log("inviteId:" + inviteId)
                console.log('onShareAppMessage')
                var shareObj = {
                        title: '房车行',
                        desc: '房车行',
                        path: '/pages/camp/index?inviteId=' + inviteId,
                        success: function (res) {
                                console.log('success')
                        },
                        fail: function () {
                                console.log('fail')
                        },
                        complete: function () {
                        }
                };

                return shareObj;
        }
})