// 我的银行卡pages/myCard/myCard.js
const date = new Date()
const days = []

for (let i = 1; i <= 30; i++) {
  days.push(i)
}

var urlData = require('../../utils/util.js');
var util = require('../../utils/animation.js');
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    show1: false,
    userData: wx.getStorageSync("userData"),
    list: wx.getStorageSync("cardList"),  //信用卡列表
    index: 0,
    bankName: "",    //银行名称
    acctType: '',
    cardIndex: "",   //银行卡序号
    bank_name: wx.getStorageSync("userData").bank,  //储蓄卡号
    Logo: wx.getStorageSync("userData").logo,  //储蓄卡号logo
    bankCard: '',   //储蓄卡号 
    bankcard: '',   //信用卡号
    cardId: wx.getStorageSync("cardId"),//银行卡号集合
    userData: wx.getStorageSync("userData"),
    //弹窗参数
    card: '',  //银行卡号
    valueBankName: '',  //开户银行
    arr: [],    //账单日
    arr1: [],    //还款日
    tele: "",
    cvn: '',
    index1: 0,
    date: "",
    dis: true,
    acctType: "",
    showModalStatus: false,
    wallets_password_flag: false,
    animation: "",
  },

  //点击添加信用卡
  add: function (e) {
    wx.navigateTo({
      url: '../add/add',
    })
  },

  //获取电话号码
  tele: function (e) {
    var that = this;
    that.setData({
      tele: e.detail.value
    })
    console.log(that.data.tele)
  },

  //获取cvn
  cvn: function (e) {
    this.setData({
      cvn: e.detail.value
    })
    console.log(this.data.cvn)
  },

  /*获取信用卡号*/
  getCard: function (e) {
    this.setData({
      card: e.detail.value
    })
    console.log(this.data.card)
  },

  //检查银行卡号是否正确 获取开户银行
  blur: function () {
    var that = this;
    urlData.queryBank(that, that.data.card, that.data.valueBankName, that.data.acctType)
  },

  //点击确认
  sure: function (e) {
    //动画关闭
    var currentStatu = e.currentTarget.dataset.statu;
    util.util(currentStatu)
    var that = this;
    //添加信用卡
    urlData.addCard(that, wx.getStorageSync('uid'), that.data.card, that.data.acctType, that.data.tele, that.date.cvn, that.data.date, that.data.arr[that.data.index], that.data.arr1[that.data.index1], that.data.valueBankName, that.data.showModalStatus, that.data.wallets_password_flag)

    that.setData({
      showModalStatus: false,
    })
  },

  //点击取消信用卡
  cancel: function () {
    this.setData({
      showModalStatus: false,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var reg = /^(\d{4})\d+(\d{4})$/;
    var bankCard = wx.getStorageSync("userData").bankCard.replace(reg, "$1****$2");
    if (wx.getStorageSync("cardList").length) {
      console.log("有信用卡")
      that.setData({
        show1: true,
        list: wx.getStorageSync("cardList"),
        cardId: wx.getStorageSync("cardId")
      })
    }
    that.setData({
      bank: wx.getStorageSync("userBankName") || wx.getStorageSync("amendUserBankName"),
      bankCard: bankCard,
      show: false,
      userData: wx.getStorageSync("userData")
    })
    console.log("1")
    console.log(this.data.userData)
  },

  amend: function () {

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
    //查看详情
    var that = this;
  },

  //删除信用卡
  alter: function (e) {
    console.log("删除信用卡")
    console.log(e)

    var that = this;
    var currentStatu = e.currentTarget.dataset.statu;
    var Index = e.currentTarget.dataset.index;
    that.setData({
      cardIndex: e.currentTarget.dataset.index
    })
    if (wx.getStorageSync("cardList")[Index].state == "还款中" || wx.getStorageSync("cardList")[Index].state == "还款异常" || wx.getStorageSync("cardList")[Index].state =="拉黑") {
      wx.showModal({
        title: '提示',
        content: '此信用卡' + wx.getStorageSync("cardList")[Index].state + "不能进行此操作",
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      var len = that.data.list[that.data.cardIndex].acctNo.length
      wx.showModal({
        title: '提示',
        content: '是否删除尾号为：' + that.data.list[that.data.cardIndex].acctNo.slice(len - 4, len) + "的信用卡",
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            //删除信用卡
            urlData.removeCard(that, that.data.list, Index, that.data.cardId)
            that.onLoad()
            that.onShow();
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  cancelDele: function (e) {
    this.setData({
      showModalStatus1: false,
    })
  },

  //修改储蓄卡：
  amend: function (e) {
    var that = this;
    that.setData({
      showModalStatus: true,
    })
    var currentStatu = e.currentTarget.dataset.statu;
    util.util(that, currentStatu)
    console.log(currentStatu)

  },

  //点击取消添加
  cancelAdd: function (e) {
    var that = this;
    var currentStatu = e.currentTarget.dataset.statu;
    util.util(that, currentStatu)
    that.setData({
      showModalStatus: false,
      valueBankName: "",
      bankcard: ''
    })
  },

  //获取修改的储蓄卡
  getCard: function (e) {
    var that = this;
    that.setData({
      bankcard: e.detail.value
    })
    console.log(that.data.bankcard)
    //查询开户银行
    if (that.data.bankcard.length >= 16 && that.data.bankcard.length <= 19) {
      // if (that.data.bankCard.length >= 6 ) {
      console.log(16)
      urlData.queryBank(that, that.data.bankcard, that.data.valueBankName, that.data.acctType)
      // if (that.data.acctType=="借记卡"){

      // }else{

      // }
    }
  },

  //检验银行卡号
  queryCard: function () {
    var that = this;
  },

  //确定添加
  sureAdd: function (e) {
    var that = this;
    if (that.data.acctType) {
      wx.showModal({
        title: '提示',
        content: '必须输入储蓄卡号！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      var reg = /^([1-9]{1})(\d{15}|\d{18})$/;
      var bool = (reg.test(that.data.bankcard));
      console.log(bool)
      if (bool) {
        if (that.data.bankcard && that.data.valueBankName) {

          console.log(that.data.valueBankName)
          console.log(that.data.valueBankName)

          wx.setStorageSync("amendUserBankName", that.data.valueBankName)
          wx.setStorageSync("amendUserBankId", that.data.bankcard)
          //绑定修改储蓄卡号
          var str = {
            "OperationType": "10013",
            "uid": wx.getStorageSync("uid"),
            "bank": that.data.valueBankName,
            "bankCard": that.data.bankcard
          }
          //发起请求*
          wx.request({
            url: app.globalData.url,
            data: str,
            method: 'POST',
            header: { "content-type": "application/json" },
            success: function (res) {
              if (res.data.CODE == "00") {
                wx.showToast({
                  title: res.data.MESSAGE,
                  image: '../../images/icon/s.png',
                  duration: 1000
                })
                var currentStatu = e.currentTarget.dataset.statu;
                util.util(that, currentStatu)
                var reg = /^(\d{4})\d+(\d{4})$/;
                var cardId = wx.getStorageSync("amendUserBankId").replace(reg, "$1****$2");
                console.log(cardId)
                that.setData({
                  showModalStatus: false,
                  bank: wx.getStorageSync("amendUserBankName"),
                  bankCard: cardId,
                  show: false,
                  valueBankName: ""
                })
              } else {
                wx.showToast({
                  title: res.data.MESSAGE,
                  image: '../../images/icon/f.png',
                  duration: 1000
                })
              }
              console.log(res)
            }
          })
        }
      } else {
        wx.showToast({
          title: '请输入正确卡号',
          image: "../../images/icon/f.png",
          duration: 1500,
          mask: true,
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var that = this;
    that.setData({
      showModalStatus: false,
      bankcard: "",
      valueBankName: ""
    })
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