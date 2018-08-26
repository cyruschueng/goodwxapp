const app = getApp()
import { $wuxToast } from '../../components/wux'

const request = require('../../utils/request.js')
var CONFIG = require('../../utils/config.js')
var util = require('../../utils/util.js')
var phone

Page({
        data: {
                tel:null,
                code:null,
                codeShow:false,
                codeImgUrl: null
        },
        successFun: function (id,res, selfObj) {
                var that = selfObj;
                if (res.res_code == 200) {
                        console.log(res)
                        wx.navigateTo({
                                url: '/pages/loginTwo/index?phone=' + phone,
                        }) 
                }else{
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
                
        },
        bindKeyInput: function (e) {
                console.log(e)
                var tel=e.detail.value
                if (util.isPhoneNumber(tel)){
                        var url = CONFIG.API_URL.GET_SecurityCode + "?mark=" + tel
                        this.setData({
                                codeImgUrl: url,
                                codeShow: true
                        })
                }else{
                        this.setData({
                                codeShow: false
                        })
                }
                this.setData({
                        tel: tel
                })
        },
        submitForm(e) {
                var that = this;
                phone = e.detail.value.tel.trim();
                var code = e.detail.value.code;
                if (phone == "") {
                        $wuxToast.show({
                                type: 'text',
                                timer: 2000,
                                color: '#fff',
                                text: '请填写手机号码'
                        })
                        return
                }
                if (!util.isPhoneNumber(phone)) {
                        $wuxToast.show({
                                type: 'text',
                                timer: 2000,
                                color: '#fff',
                                text: '请填写正确的手机号码'
                        })
                        return
                }
                if (code == "") {
                        $wuxToast.show({
                                type: 'text',
                                timer: 2000,
                                color: '#fff',
                                text: '请填写图形验证码'
                        })
                        return
                }

                var url = CONFIG.API_URL.GET_SendPhoneCode
                var params = {
                        phone: phone,
                        imgCode: code,
                        mark: "9"
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
                //   wx.navigateBack({
                //           delta: 2
                //   })
                wx.switchTab({
                        url: '../index/index?id=1'
                })
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