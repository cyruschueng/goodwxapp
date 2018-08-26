// pages/myOrder/index.js
import { $wuxPrompt } from '../../components/wux'
const sliderWidth = 96
var CONFIG = require('../../utils/config.js')
const request = require('../../utils/request.js')
const util = require('../../utils/util.js')
var status = 0
var camperCarDetail = new Object
var orderInfo = new Object
var orders
var index
Page({

        /**
         * 页面的初始数据
         */
        data: {
                tabs: ['全部', '待付款', '待使用'],
                activeIndex: '0',
                sliderOffset: 0,
                sliderLeft: 0,
                order: [],
                refresh: false,
                statuStr: [],
                btnStr: []
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {

                
        },

        /**
         * 接口调用成功处理
         */
        successFun: function (id, res, selfObj) {

                switch (id) {
                        case 100:

                                if (res.res_code == 200) {
                                        orders = res.dtOrderCar;
                                        var oo = [];
                                        var ss = [];
                                        var btn = [];
                                        console.log("length:" + orders.length)
                                        if (orders.length > 0) {
                                                if (status == 0) {
                                                        for (var i = 0; i < orders.length; i++) {
                                                                var obj = orders[i]
                                                                var str = ""
                                                                var b = ""
                                                                switch (obj.OrderStatus) {
                                                                        case 1://待付款
                                                                                str = "待付款"
                                                                                b = "立即支付"
                                                                                break;
                                                                        case 3://待入住
                                                                                str = "待入住"
                                                                                b = "扫码开锁"
                                                                                break;
                                                                        case 4://已入住
                                                                                str = "已入住"
                                                                                b = "扫码开锁"
                                                                                break;
                                                                        case 6://已完成 
                                                                                str = "已完成"
                                                                                b = ""
                                                                                break;
                                                                        case 7://已取消  
                                                                                str = "已失效"
                                                                                b = "删除订单"
                                                                                break;
                                                                        case 8://关闭订单
                                                                                str = "关闭订单"
                                                                                b = "删除订单"
                                                                                break;
                                                                }
                                                                ss.push(str);
                                                                btn.push(b);
                                                                obj.Img = util.spiltStr(obj.CarImg)[0] + "_" + 200 + "X" + 200 + ".jpg";
                                                                obj.i = i;
                                                                oo.push(obj);
                                                        }
                                                        selfObj.setData({
                                                                statuStr: ss,
                                                                btnStr: btn,
                                                        })
                                                } else if (status == 1) {
                                                        for (var i = 0; i < orders.length; i++) {
                                                                var obj = orders[i]
                                                                if (obj.OrderStatus == 1) {
                                                                        var str = ""
                                                                        var b = ""
                                                                        switch (obj.OrderStatus) {
                                                                                case 1://待付款
                                                                                        str = "待付款"
                                                                                        b = "立即支付"
                                                                                        break;
                                                                                case 3://待入住
                                                                                        str = "待入住"
                                                                                        b = "扫码开锁"
                                                                                        break;
                                                                                case 4://已入住
                                                                                        str = "已入住"
                                                                                        b = "扫码开锁"
                                                                                        break;
                                                                                case 6://已完成 
                                                                                        str = "已完成"
                                                                                        b = ""
                                                                                        break;
                                                                                case 7://已取消  
                                                                                        str = "已失效"
                                                                                        b = "删除订单"
                                                                                        break;
                                                                                case 8://关闭订单
                                                                                        str = "关闭订单"
                                                                                        b = "删除订单"
                                                                                        break;
                                                                        }
                                                                        ss.push(str);
                                                                        btn.push(b);
                                                                        obj.Img = util.spiltStr(obj.CarImg)[0] + "_" + 200 + "X" + 200 + ".jpg";
                                                                        obj.i = i;
                                                                        oo.push(obj);
                                                                }
                                                        }
                                                        selfObj.setData({
                                                                statuStr: ss,
                                                                btnStr: btn,
                                                        })
                                                } else if (status == 3) {
                                                        for (var i = 0; i < orders.length; i++) {
                                                                var obj = orders[i]
                                                                if (obj.OrderStatus == 3) {
                                                                        var str = ""
                                                                        var b = ""
                                                                        switch (obj.OrderStatus) {
                                                                                case 1://待付款
                                                                                        str = "待付款"
                                                                                        b = "立即支付"
                                                                                        break;
                                                                                case 3://待入住
                                                                                        str = "待入住"
                                                                                        b = "扫码开锁"
                                                                                        break;
                                                                                case 4://已入住
                                                                                        str = "已入住"
                                                                                        b = "扫码开锁"
                                                                                        break;
                                                                                case 6://已完成 
                                                                                        str = "已完成"
                                                                                        b = ""
                                                                                        break;
                                                                                case 7://已取消  
                                                                                        str = "已失效"
                                                                                        b = "删除订单"
                                                                                        break;
                                                                                case 8://关闭订单
                                                                                        str = "关闭订单"
                                                                                        b = "删除订单"
                                                                                        break;
                                                                        }
                                                                        ss.push(str);
                                                                        btn.push(b);
                                                                        obj.Img = util.spiltStr(obj.CarImg)[0] + "_" + 200 + "X" + 200 + ".jpg";
                                                                        obj.i = i;
                                                                        oo.push(obj);
                                                                }
                                                        }
                                                        selfObj.setData({
                                                                statuStr: ss,
                                                                btnStr: btn,
                                                        })
                                                } else if (status == 8) {

                                                }
                                        }

                                        selfObj.setData({
                                                order: oo
                                        });
                                } else if (res.res_code == -100) {
                                        selfObj.setData({
                                                order: []
                                        });
                                }

                                $wuxPrompt.init('msg1', {
                                        title: '空空如也',
                                        text: '暂时没有相关数据',
                                }).show()

                                $wuxPrompt.init('msg2', {
                                        // icon: '../../images/iconfont-order.png',
                                        // title: '您还没有相关的订单',
                                        // text: '可以去看看有哪些想买',
                                        // buttons: [
                                        //   {
                                        //     text: '随便逛逛'
                                        //   }
                                        // ],
                                        // buttonClicked(index, item) {
                                        //   console.log(index, item)
                                        // },
                                        title: '空空如也',
                                        text: '暂时没有相关数据',
                                }).show()

                                $wuxPrompt.init('msg3', {
                                        title: '空空如也',
                                        text: '暂时没有相关数据',
                                }).show()

                                $wuxPrompt.init('msg4', {
                                        title: '空空如也',
                                        text: '暂时没有相关数据',
                                }).show()
                                break;
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
                                                        //this.data.
                                                        camperCarDetail.BTimeDate = orders[index].BTimeDate;
                                                        camperCarDetail.ETimeDate = orders[index].ETimeDate;
                                                        camperCarDetail.CheckInTime = orders[index].CheckInTime;
                                                        camperCarDetail.CheckOutTime = orders[index].CheckOutTime;
                                                        camperCarDetail.CamperTypeName = orders[index].CamperTypeName;
                                                        camperCarDetail.CampShortName = orders[index].CampShortName;
                                                        orderInfo.nickName = orders[index].BookingPersonName;

                                                        var camperCarDetails = JSON.stringify(camperCarDetail);
                                                        var orderInfos = JSON.stringify(orderInfo);
                                                        console.log(camperCarDetails)
                                                        console.log(orderInfos)
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
                        case 102:
                                if (res.res_code == 200) {
                                        this.getData();
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
        failFun: function (id, res, selfObj) {
                console.log('failFun', res)
        },

        getSystemInfo: function () {
                const that = this
                wx.getSystemInfo({
                        success(res) {
                                that.setData({
                                        sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                                })
                        }
                })
        },
        tabClick: function (e) {
                this.setData({
                        sliderOffset: e.currentTarget.offsetLeft,
                        activeIndex: e.currentTarget.id,
                })
                switch (this.data.activeIndex) {
                        case '0':
                                console.log("全部");
                                status = 0;
                                this.getData();
                                break;
                        case '1':
                                console.log("代付款");
                                status = 1;
                                this.getData();
                                break;
                        case '2':
                                console.log("待使用");
                                status = 3;
                                this.getData();
                                break;
                        case '3':
                                // console.log("退款");
                                // this.setData({ status: 8 })
                                this.setData({
                                        statuStr: [],
                                        btnStr: [],
                                        order: [],
                                })
                                break;
                }
                // this.getData();
        },

        goScan: function () {//扫码开锁
                var token = wx.getStorageSync('token')
                if (token == "") {
                        wx.navigateTo({
                                url: '../login/index?id=1'
                        })
                } else {
                        wx.scanCode({
                                onlyFromCamera: true,
                                success: (res) => {
                                        var result = res.result.replace("?", "\?")
                                        console.log(result)
                                        var parameterObject = util.getQueryObject(result)
                                        wx.reLaunch({
                                                url: '../openLockIng/index?lockcode=' + parameterObject.lockcode
                                        });
                                }, fail: (res) => {
                                        // console.log("fail" + res)
                                        // wx.reLaunch({
                                        //         url: '../index/index'
                                        // });
                                }, complete: (res) => {
                                        console.log("complete")
                                }
                        })
                }
        },

        getData: function () {
                var url = CONFIG.API_URL.GET_MyOrderData
                var params = {}
                request.GET(url, params, 100, true, this, this.successFun, this.failFun)
        },

        btnClick: function (e) {
                index = parseInt(e.currentTarget.id);
                console.log(this.data.btnStr[index])
                switch (this.data.btnStr[index]) {
                        case "立即支付":
                                var openid = wx.getStorageSync('wx_openid')
                                var url = CONFIG.API_URL.GET_WxPay
                                var params = {
                                        orderno: this.data.order[index].OrderNo,
                                        openid: openid,
                                        flag: "1"
                                }
                                request.GET(url, params, 101, true, this, this.successFun, this.failFun)
                                break;
                        case "扫码开锁":
                                this.goScan();
                                break;
                        case "删除订单":
                                var url = CONFIG.API_URL.GET_DelMyOrder
                                var params = {
                                        orderno: this.data.order[index].OrderNo,
                                        orderGuid: this.data.order[index].OrderGuid,
                                        type: "3"
                                }
                                request.GET(url, params, 102, true, this, this.successFun, this.failFun)
                                break;
                }
        },

        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        onReady: function () {

        },

        /**
         * 生命周期函数--监听页面显示
         */
        onShow: function (options) {
                // var my_authorize = wx.getStorageSync('wx_authorize')
                // var token = wx.getStorageSync('token')
                // if (my_authorize) {
                        // if (token == '') {
                        //         wx.navigateTo({
                        //                 url: '../login/index?id=1'
                        //         })
                        // } else {
                                this.getSystemInfo()
                                status = 0
                                
                                this.getData()
                        // }
                // } else {
                //         app.wxAuthorize();
                // }

                
                // //删除 修改状态后 返回刷新
                // console.log(this.data.refresh)
                // if (this.data.refresh) {
                //         this.setData({
                //                 refresh: false
                //         })
                //         this.getData()
                // }
        },

        /**
         * 生命周期函数--监听页面隐藏
         */
        onHide: function () {

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

})