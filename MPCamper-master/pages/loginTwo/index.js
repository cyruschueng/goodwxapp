const app = getApp()
import { $wuxToast } from '../../components/wux'
const request = require('../../utils/request.js')
var CONFIG = require('../../utils/config.js')
var util = require('../../utils/util.js')
var codeId;//邀请人memberguid
var unionid, phone, openid;
Page({

        data: {

        },
        successFun: function (id,res, selfObj) {
                var that = selfObj;
                if (res.res_code == 200) {
                        console.log(res)
                        app.globalData.eUserInfo = res.data;

                        console.log("memberguid:" + res.data.GUID)
                        wx.setStorageSync('wx_unionid', res.data.unionid)
                        wx.setStorageSync('token', res.data.token)
                        wx.setStorageSync('memberguid', res.data.GUID)

                        wx.navigateBack({
                                delta: 2, // 回退前 delta(默认为1) 页面
                        })
                } else {
                        $wuxToast.show({
                                type: 'text',
                                timer: 2000,
                                color: '#fff',
                                text: res.res_msg
                        })
                }
        },

        failFun: function (id,res, selfObj) {
                console.log('failFun', res)
        },

        onLoad: function (options) {
                console.log(options.phone)
                phone = options.phone
                unionid = wx.getStorageSync('wx_unionid')
                openid = wx.getStorageSync('wx_openid')

        },
        submitForm(e) {
                var that = this;
                var code = e.detail.value.code;
                if (code == "") {
                        $wuxToast.show({
                                type: 'text',
                                timer: 2000,
                                color: '#fff',
                                text: '请输入短信验证码'
                        })
                        return
                }
                codeId = wx.getStorageSync('inviteId')
                if (util.isEmpty(codeId)) {
                        codeId=""
                }
                var url = CONFIG.API_URL.GET_BindWxPhone
                var params = {
                        flag: "1",
                        openid: openid,
                        unionid: unionid,
                        phone: phone,
                        codeId: codeId,
                        code: code
                }
                request.GET(url, params, 100, true, this, this.successFun, this.failFun)
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