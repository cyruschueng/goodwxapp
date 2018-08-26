import { $wuxToast } from '../../components/wux'
const request = require('../../utils/request.js')
const CONFIG = require('../../utils/config.js')
const util = require('../../utils/util.js')
var deviceId;

function _next() {
        var that = this;
        if (this.data.progress <= 95) {
                this.setData({
                        progress: ++this.data.progress
                });
                setTimeout(function () {
                        _next.call(that);
                }, 20);
        }
}

Page({
        /**
         * 页面的初始数据
         */
        data: {
                progress: 0,
                msg: "开锁中..."
        },
        successFun: function (id,res, selfObj) {
                var that = selfObj;
                if (res.res_code == 200) {
                        that.setData({
                                progress: 100,
                                msg: res.res_msg
                        });
                } else {
                        that.setData({
                                progress: 0,
                                msg: res.res_msg
                        });
                        // $wuxToast.show({
                        //         type: 'text',
                        //         timer: 2000,
                        //         color: '#fff',
                        //         text: res.res_msg
                        // })
                }
                setTimeout(function () {
                        wx.reLaunch({
                                url: '/pages/index/index',
                        })
                }, 2000);
        },
        failFun: function (id,res, selfObj) {
                console.log('failFun', res)
        },
        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
                var that=this;
                console.log(options.lockcode)
                deviceId = options.lockcode;
                // deviceId="123456"

                _next.call(this);

                var url = CONFIG.API_URL.GET_openMotorHomesCar
                var params = {
                        deviceId: deviceId
                }
                setTimeout(function () {
                        request.GET(url, params, 100, true, that, that.successFun, that.failFun);
                }, 3000);
                
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
         * 页面相关事件处理函数--监听用户下拉动作
         */
        onPullDownRefresh: function () {

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

        }
})

