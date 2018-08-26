
import { $wuxCountDown } from '../../components/wux'
const app = getApp()

const request = require('../../utils/request.js')
const CONFIG = require('../../utils/config.js')
const util = require('../../utils/util.js')

var amapFile = require('../../libs/amap-wx.js');

var camperOrderDetail;
var orderNo;
var width;
var height;
var myAmapFun;
var longitude, latitude, campShortName, campOwerAddress, campOwerTel;
var InvoiceInfo;
Page({

        /**
         * 页面的初始数据
         */
        data: {
                camperOrderDetail: [],
                invoiceInfo: {},
                amapSrc: ""
        },
        successFun: function (id, res, selfObj) {
                switch (id) {
                        case 100:
                                if (res.res_code == 200) {
                                        camperOrderDetail = res.data[0];
                                        InvoiceInfo = res.InvoiceInfo;
                                        console.log(res.data)

                                        // "OrderStatus": 订单状态1 待付款 3待入住/ 待登记 4 已入住/ 已登记 6 已消费 7 已取消  8 关闭订单,
                                        // "PayStatus":支付状态(1待支付2已支付, ),

                                        longitude = camperOrderDetail.Longitude;
                                        latitude = camperOrderDetail.Latitude;
                                        campShortName = camperOrderDetail.CampShortName;
                                        campOwerAddress = camperOrderDetail.CampOwerAddress;
                                        campOwerTel = camperOrderDetail.CampOwerTel;

                                        selfObj.setData({
                                                camperOrderDetail: camperOrderDetail,
                                                invoiceInfo: InvoiceInfo,
                                        })

                                        var d1 = new Date();
                                        var d2 = new Date(camperOrderDetail.CreateTime.replace(/-/g, "/"));
                                        
                                        console.error("d1 - d2:" + parseInt(d1 - d2))
                                        var iCountdown = 60 * 1000 * 60 * 24 - parseInt(d1 - d2);
                                        console.error("iCountdown:"+iCountdown)
                                        if (iCountdown > 0) {
                                                selfObj.c1 = new $wuxCountDown({
                                                        date: +(new Date) + iCountdown,
                                                        render(date) {
                                                                //   const years = this.leadingZeros(date.years, 4) + ' 年 '
                                                                //   const days = this.leadingZeros(date.days, 3) + ' 天 '
                                                                const hours = this.leadingZeros(date.hours, 2) + '时'
                                                                const min = this.leadingZeros(date.min, 2) + '分'
                                                                const sec = this.leadingZeros(date.sec, 2) + '秒'
                                                                selfObj.setData({
                                                                        c1: hours + min + sec,
                                                                })
                                                        },
                                                })
                                        }
                                        //高德静态地图
                                        var key = CONFIG.APP_KEY.AmapKey;
                                        myAmapFun = new amapFile.AMapWX({ key: key });
                                        var size = width + "*" + parseInt(height / 2);
                                        myAmapFun.getStaticmap({
                                                zoom: 13,
                                                size: size,
                                                scale: 2,
                                                location: camperOrderDetail.Longitude + "," + camperOrderDetail.Latitude,
                                                markers: "large,0xFF0000,A:" + camperOrderDetail.Longitude + "," + camperOrderDetail.Latitude,
                                                labels: camperOrderDetail.CampShortName + ",2,0,32,0xFFFFFF,0x008000:" + camperOrderDetail.Longitude + "," + camperOrderDetail.Latitude,
                                                success: function (data) {
                                                        selfObj.setData({
                                                                amapSrc: data.url
                                                        })
                                                },
                                                fail: function (info) {
                                                        wx.showModal({ title: info.errMsg })
                                                }
                                        })
                                } else {
                                        wx.showToast({
                                                title: res.res_msg,
                                        })
                                }
                                break;
                        //支付
                        case 101:
                                if (res.res_code == 200) {
                                        var wxPay = res.data;
                                        console.log(wxPay)
                                        wx.requestPayment({
                                                'timeStamp': wxPay.timeStamp,
                                                'nonceStr': wxPay.nonceStr,
                                                'package': wxPay.package,
                                                'signType': 'MD5',
                                                'paySign': wxPay.paySign,
                                                'success': function (res) {
                                                        console.log("支付成功")

                                                        var camperCarDetail = new Object();
                                                        camperCarDetail.CamperTypeName = camperOrderDetail.CamperTypeName;
                                                        camperCarDetail.CampShortName = camperOrderDetail.CampShortName;
                                                        camperCarDetail.CheckInTime = camperOrderDetail.CheckInTime;
                                                        camperCarDetail.CheckOutTime = camperOrderDetail.CheckOutTime;
                                                        camperCarDetail.BTimeDate = camperOrderDetail.BTimeDate;
                                                        camperCarDetail.ETimeDate = camperOrderDetail.ETimeDate;

                                                        var camperCarDetails = JSON.stringify(camperCarDetail);

                                                        var orderInfo = new Object();
                                                        orderInfo.nickName = camperOrderDetail.BookingPersonName;

                                                        var orderInfos = JSON.stringify(orderInfo);

                                                        wx.navigateTo({
                                                                url: '/pages/camperCarPayResult/index?camperCarDetail=' + camperCarDetails + '&orderInfo=' + orderInfos,
                                                        })
                                                },
                                                'fail': function (res) {
                                                        console.log("支付失败")
                                                }
                                        })
                                } else {
                                        wx.showToast({
                                                title: res.res_msg,
                                        })
                                }
                                break;
                        //删除订单
                        case 102:
                                if (res.res_code == 200) {
                                        var pages = getCurrentPages();
                                        var currPage = pages[pages.length - 1];   //当前页面
                                        var prevPage = pages[pages.length - 2];  //上一个页面
                                        prevPage.setData({
                                                refresh: true
                                        })
                                        wx.navigateBack({
                                                delta: 1
                                        })
                                } else {
                                        wx.showToast({
                                                title: res.res_msg,
                                        })
                                }
                                break;
                        case 103:

                                if (res.res_code == 200) {
                                        var pages = getCurrentPages();
                                        var currPage = pages[pages.length - 1];   //当前页面
                                        var prevPage = pages[pages.length - 2];  //上一个页面
                                        prevPage.setData({
                                                refresh: true
                                        })
                                        wx.navigateBack({
                                                delta: 1
                                        })
                                } else {
                                        wx.showToast({
                                                title: res.res_msg,
                                        })
                                }
                                break;
                }
        },
        /**
         * 接口调用失败处理
         */
        failFun: function (res, selfObj) {
                console.log('failFun', res)
        },
        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
                width = app.globalData.width;
                height = app.globalData.height;

                console.log(options.orderNo)
                orderNo = options.orderNo;

                var url = CONFIG.API_URL.GET_CamperOrderInfo
                var params = {
                        orderNo: orderNo
                }
                request.GET(url, params, 100, true, this, this.successFun, this.failFun)


        },
        orderPay: function (e) {
                var openid = wx.getStorageSync('wx_openid')
                var url = CONFIG.API_URL.GET_WxPay
                var params = {
                        orderno: camperOrderDetail.OrderNo,
                        openid: openid,
                        flag: "1"
                }
                request.GET(url, params, 101, true, this, this.successFun, this.failFun)
        },
        orderDel: function (e) {
                var url = CONFIG.API_URL.GET_DelMyOrder
                var params = {
                        orderno: camperOrderDetail.OrderNo,
                        orderGuid: camperOrderDetail.OrderGuid,
                        type: "3"
                }
                request.GET(url, params, 102, true, this, this.successFun, this.failFun)
        },
        orderCancel: function (e) {
                var url = CONFIG.API_URL.GET_UpMyOrder
                var params = {
                        orderno: camperOrderDetail.OrderNo,
                        orderGuid: camperOrderDetail.OrderGuid,
                        orderStatus: "7",
                        type: "3"
                }
                request.GET(url, params, 103, true, this, this.successFun, this.failFun)
        },
        goTel: function () {
                app.tel(campOwerTel);
        },
        goMap: function () {
                app.map(latitude, longitude, 28, campShortName, campOwerAddress);
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