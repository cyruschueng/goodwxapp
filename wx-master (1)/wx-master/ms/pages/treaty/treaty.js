// pages/treaty/treaty.js
var urlData = require('../../utils/util.js');
var app = getApp()

//10045扣款短信
var debit_msg = function (that) {
  var str = {
    "OperationType": "10045",
    "order_id": that.data.orderNumber,
    "ISRepeat": true
  }
  console.log(that.data.orderNumber)
  // console.log(res.data.orderID)
  wx.request({
    url: app.globalData.url,
    data: str,
    method: 'POST',
    header: { "content-type": "application/json" },
    success: function (res) {
      console.log(10002)
      console.log(res)
      if (res.data.CODE == "00") {
        wx.showToast({
          title: res.data.MESSAGE,
          image: "../../images/icon/s.png",
          duration: 1000,
          mask: true,
        })
      } else {
        console.log("01")
        wx.showModal({
          title: '提示',
          content: res.data.MESSAGE,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }
  })
}
//扣款步骤
var deduct_steps = function(that,Code){
  //10047===>10044（）===10045
  var str = {
    "OperationType": "10047",
    "uid": wx.getStorageSync("uid"),
    "OrderID": that.data.orderNumber,  //10025生成的订单号
    "BO_ID": that.data.BO_ID,     //10025生成的BO_ID
    "ISMoney": that.data.choose     //判断是否是钱包支付还是快捷支付
  }

  console.log(that.data.orderNumber);
  console.log(that.data.BO_ID);
  console.log(that.data.choose);

  wx.request({
    url: app.globalData.url,
    data: str,
    method: 'POST',
    header: { "content-type": "application/json" },
    success: function (res) {
      console.log("10047")
      console.log(res)
      if (res.data.CODE == "00") {
        if (!that.data.choose) {
          //10044 扣款手续费
          var str = {
            "OperationType": "10044",
            "uid": wx.getStorageSync("uid"),
            "orderNo": res.data.orderID,  //10047生成的订单号
            "smsCode":Code,   //第一次传递空字符串
            "cardID": that.data.cardId,  //扣款银行卡
            "BO_ID": res.data.BO_ID, //10047生成的BO_ID
            "PayType": 1   //平台借款
          }

          console.log(res.data.orderID)
          console.log(Code)
          console.log(that.data.cardId)
          console.log(res.data.BO_ID)

          wx.request({
            url: app.globalData.url,
            data: str,
            method: 'POST',
            header: { "content-type": "application/json" },
            success: function (res) {
              console.log(10044)
              console.log(res)
              if (res.data.CODE == "00") {

                //扣款成功===》显示订单详情
                wx.showModal({
                  title: res.data.MESSAGE,
                  // content: '这是一个模态弹窗',
                  success: function (res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                      //显示扣款详情-----
                      that.setData({
                        payOrder: true,
                        show: false,
                        msg_disable: false
                      })

                    } else if (res.cancel) {
                      console.log('用户点击取消')
                      that.setData({
                        payOrder: true,
                        show: false,
                        msg_disable: false
                      })

                    }
                  }
                })
              } else {
                //扣款失败返回信息===》显示验证码提示
                wx.showModal({
                  title: res.data.MESSAGE,
                  content: "点击确定重新发送",
                  success: function (res) {
                    if (res.confirm) {
                      console.log('用户点击确定')

                      //发送验证码  10045
                      debit_msg(that);
                      //验证码提示显示

                      that.setData({
                        show1: true,
                        msg_state:true,
                        msg_disable: true
                      })

                    } else if (res.cancel) {
                      console.log('用户点击取消')
                      wx.switchTab({
                        url: '../bill/bill',
                      })
                    }
                  }
                })
              }
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.MESSAGE,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.switchTab({
                  url: '../wallet/wallet',
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
                wx.switchTab({
                  url: '../wallet/wallet',
                })
              }
            }
          })
        }
      }else{
        wx.showModal({
          title: '提示',
          content: res.data.MESSAGE,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }
  })
}
Page({

  /**
   * 页面的初始数据
   */

  data: {
    disable:true,
    checked:false,
    payOrder:false,
    orderNumber: '',//订单号
    cardId: '', //信用卡号
    lastDate: '',
    billDate: '', 
    realName:'',
    ID: '',
    bankName: '',
    code:"",//扣款短信
    quota: '',  //银行透支金额
    rate: '', //手续费率
    repayList:[],
    poundaqe: '',
    BO_ID:"",

    popup_state: false,  //请求后状态的返回弹窗

    tips_content: "",//请求后返回的提示语

    choose: "", //选择付款方式

    show: false, //判断是否银行返送扣款验证码。

    show1: false,  //默认先显示选择支付方式
    pay_disable:true,  //支付按钮状态
    msg_disable: true  , //判断是否输入扣款验证码
    msg_state:false   //扣款验证码的
  },

//1先提交申请借款接口 ----->接收返回参数(生成预订单1)--无论选择哪种方式都经过10047--->10047 接口--接收返回参数 00成功(生成预订单2)===.10044
//--01 失败 (如果提示验证码错误, ---10045重发短信)

  //确认协议
  checkboxChange:function(e){
    var that = this;
    that.setData({
      checked:!that.data.checked,
      disable:!that.data.disable
    })
  },
  //点击确认
  sure:function(e){
    var that = this;
    console.log("最新借款订单列表")
  //借款订单列表----生成预订单1
    var str = {
      "OperationType": "10025",
      "uid": wx.getStorageSync('uid'),
      "cardID": wx.getStorageSync('chooseCard').id,
      "borrowMoney": wx.getStorageSync('repayMoney'),
      "cvn2": wx.getStorageSync('chooseCard').cvn2,
      "expDate": wx.getStorageSync('chooseCard').expDate,
      "hk_Date": wx.getStorageSync('repayDate'),
      "genre": wx.getStorageSync('method')
    }

    console.log(wx.getStorageSync('chooseCard').id)
    console.log(wx.getStorageSync('repayMoney'))
    console.log(wx.getStorageSync('chooseCard').cvn2)
    console.log(wx.getStorageSync('chooseCard').expDate)
    console.log(wx.getStorageSync('repayDate'))
    console.log(wx.getStorageSync('method'))

    //发起请求*
    wx.request({
      url: app.globalData.url,
      data: str,
      method: 'POST',
      header: { "content-type": "application/json" },
      success: function (res) {
        console.log("最新申请还款订单")
        console.log(res)
        if(res.data.CODE="00"){

          //缓存要用到的新添加的订单
          wx.setStorageSync("latestBorrowListSystr", res.data)

          that.setData({
            orderNumber: res.data.orderID,  //订单号
            poundaqe: res.data.poundage,   //手续费
            BO_ID:res.data.BO_ID,
             show:true  //验证码发送框出现
          })

          console.log(that.data.poundaqe)
          console.log(res.data.orderID)
          console.log(that.data.show)
          console.log(that.data.BO_ID)

        }
      }
    })
  },

  //选择付款方式：
  choose: function (e) {
    console.log(e)
    var that = this;
    //选择钱包余额付款：
    if (e.currentTarget.dataset.method == "wallet") {
      that.setData({
        choose: true,
        pay_disable:false
        // show:false

      })
      // deduct_steps(that,"")
    }
    //选择信用卡扣款
    if (e.currentTarget.dataset.method == "kj") {
      that.setData({
        choose: false,
        pay_disable: false
        // show:false
      })
      // deduct_steps(that,"")
      
    }
  },

  //支付取消
  pay_cancel:function(){
    this.setData({
      show: false
    })
  },

//确定支付
  pay_sure:function(){
    this.setData({
      show: false,
      pay_disable: true
    })
    var that = this;
    deduct_steps(that, "")
  },

  //点击确认添加扣款：
  msg_sure: function () {
    var that = this;
    deduct_steps(that,that.data.Code)
  },

  //获取验证码的值
 CODE: function (e) {
    var that = this;
    this.setData({
      Code: e.detail.value
    })
    //验证码长度为6时，确认按钮可点击
    if (that.data.code.length == 6) {
      that.setData({
        msg_disable: false
      })
    }
  },

  //取消扣款：
  msg_cancel: function () {
    //关闭弹窗
    this.setData({
      msg_state: false,
      Code: "",
    })
    wx.redirectTo({
      url: '../bill/bill',
    })
  },


  //关闭close
 close:function(e){
  this.setData({
    show:false
  })
 },


  sureOrder:function(){
    //跳转到bill页面
    wx.redirectTo({
      url: '../bill/bill',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var that = this;
    that.setData({
     // orderNumber: wx.getStorageSync("borrowListSystr"),//订单号
      cardId: wx.getStorageSync("chooseCard").acctNo, //信用卡号
      lastDate: wx.getStorageSync("chooseCard").zd_date,
      billDate: wx.getStorageSync("chooseCard").hk_date,
      realName: wx.getStorageSync("realName"),
      ID: wx.getStorageSync("userData").idCard,
      bankName: wx.getStorageSync("chooseCard").bankName,
      quota: wx.getStorageSync("repayMoney"),  //银行透支金额
      rate: wx.getStorageSync("userData").rate, //手续费率
      repayList: [],
      poundaqe: ((wx.getStorageSync("repayMoney") * wx.getStorageSync("userData").rate) / 100).toFixed(2)
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