
import { $wuxCalendar } from '../../components/wux'
import { $wuxToast } from '../../components/wux'
const app = getApp()

const request = require('../../utils/request.js')
const CONFIG = require('../../utils/config.js')
const util = require('../../utils/util.js')

var camperCarDetail = new Object();
var moenyDesc = new Array;
var startDay="",  foregift;
var endDay="";
var orderInfo = new Object();
var camperCarOrder = new Object();

var invoiceObj = new Object();
var addressObj = new Object();
var showInvoiceAddress = false;
var dayNum = 0;
const postage = 10;
var roomPrice;
var invoice="0";
var strNickName, strPhone;
Page({
        data: {
                camperCarDetail: [],
                start: '',//入住时间
                end: '',  //离开时间
                day: '0',//入住晚数
                totalPrice: 0.00, //所有费用
                roomPrice: 0.00,//房车费用
                foregift: 0.00, //邮费
                NickName: '',
                Phone: '',
                showInvoiceAddress: false,
                postage: postage,
                invoiceInfo: "发票信息",
                addressInfo: "收货地址",
                invoiceEdit: "添加",
                addressEdit: "添加"

        },
        successFun: function (id, res, selfObj) {
                switch (id) {
                        case 100:
                                if (res.res_code == 100) {
                                        camperCarOrder = res.data;
                                        console.log(camperCarOrder)
                                        console.log(camperCarDetail)
                                        console.log(orderInfo)
                                        if (showInvoiceAddress){
                                                var url = CONFIG.API_URL.GET_AddInvoiceInfo
                                                var params = {
                                                        orderGuid: camperCarOrder.orderGuid,
                                                        headerType: invoiceObj.type,
                                                        headerTitle: invoiceObj.title,
                                                        number: invoiceObj.taxNumber,
                                                        invoiceFee: roomPrice,
                                                        remarks: "",
                                                        addressee: addressObj.userName,
                                                        contactNumber: addressObj.telNumber,
                                                        detailedAddress: addressObj.provinceName + addressObj.cityName + addressObj.countyName + addressObj.detailInfo
                                                }
                                                request.GET(url, params, 101, false, selfObj, selfObj.successFun, selfObj.failFun)
                                        }else{
                                                var camperCarOrders = JSON.stringify(camperCarOrder);
                                                var camperCarDetails = JSON.stringify(camperCarDetail);
                                                var orderInfos = JSON.stringify(orderInfo);
                                                wx.navigateTo({
                                                        url: '/pages/camperCarPay/index?camperCarOrder=' + camperCarOrders + '&camperCarDetail=' + camperCarDetails + '&orderInfo=' + orderInfos + '&roomPrice=' + roomPrice,
                                                })
                                        }
                                }else{
                                        $wuxToast.show({
                                                type: 'text',
                                                timer: 2000,
                                                color: '#fff',
                                                text: res.res_msg,
                                                success: () => console.log('文本提示')
                                        })
                                }
                                break;
                        case 101:
                                if (res.res_code == 200) {
                                        var camperCarOrders = JSON.stringify(camperCarOrder);
                                        var camperCarDetails = JSON.stringify(camperCarDetail);
                                        var orderInfos = JSON.stringify(orderInfo);
                                        wx.navigateTo({
                                                url: '/pages/camperCarPay/index?camperCarOrder=' + camperCarOrders + '&camperCarDetail=' + camperCarDetails + '&orderInfo=' + orderInfos + '&roomPrice=' + roomPrice,
                                        })
                                }else{
                                        $wuxToast.show({
                                                type: 'text',
                                                timer: 2000,
                                                color: '#fff',
                                                text: res.res_msg
                                        })
                                }
                                break;

                }



        },
        failFun: function (id, res, selfObj) {
                console.log('failFun', res)
        },
        onLoad: function (options) {
                startDay = ""
                endDay = ""
                moenyDesc = JSON.parse(options.moenyDesc);
                camperCarDetail = JSON.parse(options.camperCarDetail);
                foregift = camperCarDetail.Deposit;
                strNickName=app.globalData.eUserInfo.NickName;
                strPhone=app.globalData.eUserInfo.Phone
                this.setData({
                        camperCarDetail: camperCarDetail,
                        NickName: strNickName,
                        Phone: strPhone,
                        foregift: camperCarDetail.Deposit
                })
                if (options.camperCarDetail == null) {
                        wx.showToast({
                                title: '数据为空',
                        })
                }
        },
        modifyUserInfo:function(e){
                wx.navigateTo({
                        url: '/pages/modifyOrderUserInfo/index?orderName=' + strNickName + '&orderphone=' + strPhone
                })
        },
        checkboxChange: function (e) {
                console.log('checkbox：', e.detail.value)
                var strValue = e.detail.value
                if (strValue == "发票") {
                        showInvoiceAddress = true
                        invoice="1"
                        // roomPrice = dayNum * camperCarDetail.DailyPrice
                        roomPrice = this.data.roomPrice
                        var totalPrice = roomPrice + foregift + postage;
                        var otherTPrice = roomPrice + foregift
                        totalPrice = Math.round(parseFloat(totalPrice) * 100) / 100
                        this.setData({
                                totalPrice: totalPrice,
                                otherTPrice: otherTPrice,
                                showInvoiceAddress: true
                        })


                } else {
                        invoice = "0"
                        showInvoiceAddress = false
                        // roomPrice = dayNum * camperCarDetail.DailyPrice
                        roomPrice = this.data.roomPrice
                        var totalPrice = roomPrice + foregift;
                        totalPrice=Math.round(parseFloat(totalPrice) * 100) / 100
                        this.setData({
                                totalPrice: totalPrice,
                                otherTPrice: totalPrice,
                                showInvoiceAddress: false
                        })
                        
                }
        },
        chooseInvoice: function () {
                var that = this
                wx.getSetting({
                        success: res => {
                                if (res.authSetting['scope.invoiceTitle']) {
                                        wx.chooseInvoiceTitle({
                                                success:res=> {
                                                        invoiceObj = res;
                                                        console.log(JSON.stringify(res))
                                                        that.setData({
                                                                invoiceInfo: invoiceObj.title,
                                                                invoiceEdit:"修改"
                                                        })
                                                },
                                                fail:res=> {
                                                        console.log("chooseInvoiceTitle：" + res.toString())
                                                }
                                        })
                                }else{
                                        wx.openSetting({
                                                success: (res) => {
                                                        if (res.authSetting["scope.invoiceTitle"]) {

                                                        }
                                                }, fail: function (res) {
                                                }
                                        })
                                }
                        },
                        fail:res=>{

                        },complete:res=>{

                        }
                })
        },
        chooseAddress: function () {
                var that = this
                wx.getSetting({
                        success: res => {
                                if (res.authSetting['scope.invoiceTitle']) {
                                        wx.chooseAddress({
                                                success: function (res) {
                                                        addressObj = res
                                                        console.log(JSON.stringify(res))
                                                        that.setData({
                                                                addressInfo: addressObj.userName,
                                                                addressEdit: "修改"
                                                        })
                                                },
                                                fail: function (err) {
                                                        console.log(JSON.stringify(err))
                                                }
                                        })
                                } else {
                                        wx.openSetting({
                                                success: (res) => {
                                                        if (res.authSetting["scope.address"]) {

                                                        }
                                                }, fail: function (res) {
                                                }
                                        })
                                }
                        },
                        fail: res => {

                        }, complete: res => {

                        }
                })

                if (wx.chooseAddress) {
                        
                } else {
                        console.log('当前微信版本不支持chooseAddress');
                }
        },
        submitOrder: function (e) {
                console.error(this.data.totalPrice)
                if (this.data.start == '') {
                        $wuxToast.show({
                                type: 'text',
                                timer: 2000,
                                color: '#fff',
                                text: '请选择入住日期',
                                success: () => console.log('文本提示')
                        })
                        return
                }
                if (this.data.end == '') {
                        $wuxToast.show({
                                type: 'text',
                                timer: 2000,
                                color: '#fff',
                                text: '请选择退房日期',
                                success: () => console.log('文本提示')
                        })
                        return
                }
                if (this.data.totalPrice == 0.00) {
                        $wuxToast.show({
                                type: 'text',
                                timer: 2000,
                                color: '#fff',
                                text: '参数错误',
                                success: () => console.log('文本提示')
                        })
                        return
                }
                if (showInvoiceAddress){
                        console.log(invoiceObj)
                        console.log(addressObj)
                        
                        if (util.isEmpty(invoiceObj.title)){
                                $wuxToast.show({
                                        type: 'text',
                                        timer: 2000,
                                        color: '#fff',
                                        text: '请添加发票信息',
                                        success: () => console.log('文本提示')
                                })
                                return
                        }
                        if (util.isEmpty(addressObj.userName)) {
                                $wuxToast.show({
                                        type: 'text',
                                        timer: 2000,
                                        color: '#fff',
                                        text: '请添加收货地址',
                                        success: () => console.log('文本提示')
                                })
                                return
                        }
                }
                startDay=this.data.start
                endDay=this.data.end
                orderInfo.start = startDay;
                orderInfo.end = endDay;
                orderInfo.nickName = this.data.NickName
                orderInfo.phone = this.data.Phone
                orderInfo.totalMoney = this.data.totalPrice
                orderInfo.day = this.data.day
                orderInfo.showInvoiceAddress = showInvoiceAddress
                var token = wx.getStorageSync('token')

                var url = CONFIG.API_URL.POST_CamperOrder
                // bookingPersonName 预定人
                // bookingPersonPhone 预定人手机号
                // carGuid 车型id
                // bTime 预定开始日期2017- 09 - 22
                // eTime  预定结束日期2017- 09 - 22
                // currencyAmount-1 不用电子币支付抵扣
                // totalMoney 总金额
                // invoice  0 不需要邮费 1 需要邮费（不填默认为0）
                
                
                var params = {
                        bookingPersonName: this.data.NickName,
                        bookingPersonPhone: this.data.Phone,
                        carGuid: camperCarDetail.CarGuid,
                        bTime: startDay,
                        eTime: endDay,
                        currencyAmount: "-1",
                        totalMoney: this.data.otherTPrice,
                        invoice: invoice
                }
                console.log(params)
                request.GET(url, params, 100, true, this, this.successFun, this.failFun)
        },
        openCalendarS: function () {
                wx.navigateTo({
                        url: '/pages/calendar/index?moenyDesc=' + JSON.stringify(moenyDesc)+'&'
                })
        },
        openCalendarS_() {
                if (this.start) {
                        return this.start.show()
                }

                this.start = $wuxCalendar.init('start', {
                        // dateFormat: 'DD, MM dd, yyyy',
                        dayMoney: moenyDesc,
                        onChange(p, v, d) {
                                console.error("start:" + d)
                                console.error("endDay:" + endDay)
                                if (!util.isEmpty(endDay) && !util.isEmpty(d)) {
                                        dayNum = util.dateDifference(d, endDay)
                                        console.error("相差：" + dayNum)
                                        if (dayNum <= 0) {
                                                $wuxToast.show({
                                                        type: 'text',
                                                        timer: 2000,
                                                        color: '#fff',
                                                        text: '退房日期不能小于等于入住日期',
                                                        success: () => console.log('文本提示')
                                                })
                                        } else {
                                                roomPrice = dayNum * camperCarDetail.DailyPrice
                                                var totalPrice = roomPrice + foregift;
                                                var otherTPrice = roomPrice + foregift; 
                                                if (showInvoiceAddress) {
                                                        totalPrice = totalPrice + postage;
                                                }
                                                this.setData({
                                                        day: dayNum,
                                                        totalPrice: totalPrice,
                                                        otherTPrice: otherTPrice,
                                                        roomPrice: roomPrice,
                                                })
                                        }
                                }

                                this.setData({
                                        start: d.join(', ')
                                })
                                startDay = d.join(', ')
                        }
                })
        },
        openCalendarE() {
                if (this.end) {
                        return this.end.show()
                }
                this.end = $wuxCalendar.init('end', {
                        // dateFormat: 'DD, MM dd, yyyy',
                        dayMoney: moenyDesc,
                        onChange(p, v, d) {
                                if (!util.isEmpty(startDay) && !util.isEmpty(d)) {
                                        dayNum = util.dateDifference(startDay, d)
                                        console.error("相差：" + dayNum)
                                        if (dayNum <= 0) {
                                                $wuxToast.show({
                                                        type: 'text',
                                                        timer: 2000,
                                                        color: '#fff',
                                                        text: '退房日期不能小于等于入住日期',
                                                        success: () => console.log('文本提示')
                                                })
                                        } else {
                                                roomPrice = dayNum * camperCarDetail.DailyPrice
                                                var totalPrice = roomPrice + foregift;
                                                var otherTPrice = roomPrice + foregift;
                                                if (showInvoiceAddress) {
                                                        totalPrice = totalPrice + postage;
                                                }
                                                this.setData({
                                                        day: dayNum,
                                                        otherTPrice: otherTPrice,
                                                        totalPrice: totalPrice,
                                                        roomPrice: roomPrice,
                                                })
                                        }
                                }
                                this.setData({
                                        end: d.join(', ')
                                })
                                endDay = d.join(', ')
                        }
                })
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
                if (showInvoiceAddress){
                        roomPrice = this.data.roomPrice
                        var totalPrice = roomPrice + foregift + postage;
                        var otherTPrice = roomPrice + foregift
                        totalPrice = Math.round(parseFloat(totalPrice) * 100) / 100
                        this.setData({
                                totalPrice: totalPrice,
                                otherTPrice: otherTPrice,
                                showInvoiceAddress: true
                        })
                }else{
                        roomPrice = this.data.roomPrice
                        var totalPrice = roomPrice + foregift;
                        totalPrice = Math.round(parseFloat(totalPrice) * 100) / 100
                        this.setData({
                                totalPrice: totalPrice,
                                otherTPrice: totalPrice,
                                showInvoiceAddress: false
                        })
                }
        

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
                showInvoiceAddress = false;
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


 //   wx.chooseInvoiceTitle({
                //           success(res) {
                //                   console.log(res)
                //                   res.type//抬头类型（0：单位，1：个人）
                //                   res.title//抬头名称
                //                   res.taxNumber//抬头税号
                //                   res.companyAddress//单位地址
                //                   res.telephone//手机号码
                //                   res.bankName//银行名称
                //                   res.bankAccount//银行账号
                //                   res.errMsg//接口调用结果
                //           },
                //           complete(res) {// 接口调用失败 / 结束的回调函数
                //   }
                // })