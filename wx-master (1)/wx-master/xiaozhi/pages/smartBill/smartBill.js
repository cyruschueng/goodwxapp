// 智能账单

var mask = require("../../utils/numberMask.js")
var urlData = require('../../utils/util.js');
var util = require('../../utils/animation.js');
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */

  data: {
    jine: "",  
    arr:"",   
    arr1: ["1"],
    listData: [],  //选择的信用卡数据
    money: '',  ////还款金额
    show: false,
    index: 0,
    phone :"",  //手机号
    cardId: "",  //银行卡号
    getBtnText:"发送验证码",
    disa:false,
    dis:false,  //提交按钮状态
    repayment: "还款金额(元)",
    method:wx.getStorageSync("method"),
    MM:"",
    yy:"",
    cvn:"",
    my:"",
    focus:false,
    show1:"",
    code:"",
    //弹窗参数
    showModalStatus:false
  },

  //选择期望天数
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    console.log(this.data.index)
    console.log(this.data.arr1[this.data.index])
    wx.setStorageSync("repayDate", this.data.arr1[this.data.index])
  },
//点击进入信用卡管理
  bindCard: function (e) {
    wx.navigateTo({
      url: "../card/card"
    })
  },

  mm:function(e){
    this.setData({
      MM:e.detail.value
    })
    if (this.data.MM.length == 2) {
      this.setData({
        focus:true
      })
    }
  },

  // getCode:function(){
  //   this.setData({
  //     code: e.detail.value
  //   })
  // },

  //点击跳转到card
 bindCard:function(){
   wx.setStorageSync("smartToCard", true)
    wx.navigateTo({
      url: "../card/card"
    })
    this.setData({
      show:false
    })
   
    console.log(this.data.show)
  },

  //获取还款金额
  bindMoney:function(e){
    this.setData({
      money: e.detail.value
    })
    console.log(this.data.money.length)
    var that = this;
    
    if (that.data.money >= 1000 && that.data.money <= 3000) {
      that.setData({
        arr1: ["1"]
      })
    } else if (that.data.money > 3000 && that.data.money <= 5000) {
      that.setData({
        arr1: [ "1", "2", "3"]
      })
    } else if (that.data.money > 5000 && that.data.money <= 15000) {
      that.setData({
        arr1: [ "3", "4", "5"]
      })
    } else if (that.data.money > 15000 && that.data.money <= 25000) {
      that.setData({
        arr1: [ "5", "6", "7", "8", "9", "10"]
      })
    } else if (that.data.money > 25000 && that.data.money <= 50000) {
      that.setData({
        arr1: [ "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]
      })
    } else if (that.data.money > 50000 && that.data.money <= 80000) {
      that.setData({
        arr1: [ "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]
      })
    } else if (that.data.money > 80000 && that.data.money <= 100000) {
      that.setData({
        arr1: [ "13", "14", "15", "16", "17", "18", "19", "20"]
      })
    } else if (that.data.money > 100000 && that.data.money <= 150000) {
      that.setData({
        arr1: [ "16", "17", "18", "19", "20"]
      })
    } 
  },

//失去焦点时：
  blurMoney:function(e){
    var that = this;
    console.log(this.data.money)
    wx.setStorageSync("repayMoney", that.data.money)
    if (that.data.money < 1000) {
      wx.showToast({
        title: '低于最小金额',
        image: '../../images/icon/f.png',
        duration: 1000
      })
      that.setData({
        arr1: ["1"]
      })
    } else if (that.data.money > 150000){
      wx.showToast({
        title: '超出最大金额',
        image: '../../images/icon/f.png',
        duration: 1000
      })
    }
  },

  //cvn
  CVN:function(e){
    var that = this;
    that.setData({
      cvn:e.detail.value
    })
    if(that.data.cvn.length==3){
      if(that.data.cvn!=wx.getStorageSync("chooseCard").cvn2){
        wx.showModal({
          title: '提示',
          content: "请输入正确的cvn",
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              that.setData({
                cvn:""
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
              that.setData({
                cvn: ""
              })
            }
          }
        })
      }
    }
  },

  //mm
  mm:function(e){
    var that = this;
    that.setData({
      mm: e.detail.value
    })
    if(that.data.mm.length==2){
      that.setData({
        focus:true
      })
    }
  },

  //yy
  yy: function (e) {
    var that = this;
    that.setData({
      yy: e.detail.value
    })
    if(that.data.yy.length==2){
      var expDate = that.data.mm+that.data.yy;
      console.log(expDate)
      if (expDate!=wx.getStorageSync("chooseCard").expDate){
        wx.showModal({
          title: '提示',
          content: "请输入正确的有效日期",
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              that.setData({
                MM: "",
                yy:""
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
              that.setData({
                MM: "",
                yy: ""
              })
            }
          }
        })
      }
    }
  },
//发送验证码
  // sendCode:function(){
  //   var that = this;
  //   console.log("sendCode")
  //   console.log(that.data.money)
  //   console.log(that.data.arr1)
  //   if (that.data.show && that.data.money && that.data.arr1){
  //     urlData.sendCode(that, that.data.phone, that.data.disa, that.data.getBtnText)
  //   }else{
  //     wx.showToast({
  //       title: '信息不完整',
  //       image: '../../images/icon/f.png',
  //       duration: 1000
  //     })
  //   }
  // },

  //提交按钮
  bindSubmit: function (e) {
    var that = this;
    if(wx.getStorageSync("repayData")){
    }else{
      wx.setStorageSync("repayDate", this.data.arr1[0])
    }
    if(!wx.getStorageSync("method")){
      if (that.data.show){
        if (that.data.money && that.data.arr1 && that.data.cvn && that.data.mm && that.data.yy) {
          console.log(that.data.cvn)
          that.setData.my = that.data.mm + that.data.yy;
          console.log(that.setData.my)

          that.setData({
            showModalStatus: true,
            wallets_password_flag: true
          })
          var currentStatu = e.currentTarget.dataset.statu;
          util.util(that, currentStatu)

        } else {
          wx.showToast({
            title: '信息不完整',
            image: '../../images/icon/f.png',
            duration: 1000
          })
        }
      }else{
        wx.showModal({
          title: '提示',
          content: '您没有选择信用卡',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }else{
      if (that.data.show&&that.data.money && that.data.arr1 && that.data.disa&&that.data.code) { 
        that.setData({
          showModalStatus: true,
          wallets_password_flag: true
        })
        var currentStatu = e.currentTarget.dataset.statu;
        util.util(that, currentStatu)
      } else {
        wx.showToast({
          title: '信息不完整',
          image: '../../images/icon/f.png',
          duration: 1000
        })
      }
    }
  },

    //弹窗
  cancelDele:function(){
    var that = this;
    that.setData({
      showModalStatus: false
    })
  },

  sureDele:function(e){
    var that = this;
    var currentStatu = e.currentTarget.dataset.statu;
    //支付弹窗显示
    util.util(that,currentStatu)
    that.setData({
      showModalStatus: false,
    })
    wx.navigateTo({
      url: '../treaty/treaty',
    })
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
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
    console.log(1111)
    console.log(this.data.method)
    if (wx.getStorageSync("method")) {
      this.setData({
        show1: true
      })
      wx.setNavigationBarTitle({
        title: '智能账单'
      })
    } else {
      this.setData({
        show1: false
      })
      wx.setNavigationBarTitle({
        title: '申请还款'
      })
    }
    if (wx.getStorageSync("listIndex")){
      var listIndex = wx.getStorageSync("listIndex")
      var acctNo = listIndex.acctNo;

      var reg = /^(\d{4})\d+(\d{4})$/;
      acctNo = acctNo.replace(reg, "$1****$2");
      console.log(acctNo)
      if (listIndex) {
        this.setData({
          listData: listIndex,
          show: true,
          cardId: acctNo,
          phone: listIndex.phoneNo
        })
      }
    }
    
  },

  //获取验证码的值
  // getCode: function (e) {
  //   this.setData({
  //     code: e.detail.value
  //   })
  //   console.log(this.data.code.length)
  // },
  
  // blur:function(){
  //   if (this.data.code.length < 6) {
  //     wx.showToast({
  //       title: '请输入正确的验证码',
  //       image: '../../images/icon/f.png',
  //       duration: 1000
  //     })
  //   }    
  // },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
      wx.removeStorageSync("listIndex")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
     wx.removeStorageSync("listIndex")
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