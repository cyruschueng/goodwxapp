//  ===========推广中心======pages/Promotion center/Promotion center.js
var app = getApp();
var urlData = require('../../utils/util.js');

var subordinateList = function (that) {
  var str = {
    "OperationType": "10016",
    "uid": wx.getStorageSync("uid"),
    "sort": "All",
    "state": 6,
    "page": that.data.page
  }
  console.log(that.data.page)
  //发起请求*
  wx.request({
    url: app.globalData.url,
    data: str,
    method: 'POST',
    header: { "content-type": "application/json" },
    success: function (res) {
      console.log(10016)
      console.log(res)
      if (res.data.CODE == "00") {
        var length = res.data.data.length;
        
        if(that.data.page<=1){
          var account = [],
            two_sdl = [],
            one_sdl = [],
            two_jms = [],
            one_jms = [],
            thr_shr = [],
            two_shr = [],
            one_shr = [];
        } else if (that.data.page >=2){
          console.log("page")
          console.log(that.data.account)
          var account = that.data.account,
            two_sdl = that.data.two_sdl,
            one_sdl = that.data.one_sdl,
            two_jms = that.data.two_jms,
            one_jms = that.data.one_jms,
            thr_shr = that.data.thr_shr,
            two_shr = that.data.two_shr,
            one_shr = that.data.one_shr;
        }
        for (var i = 0; i < length; i++) {
          if (res.data.data[i].sort == "account") {
            account.push(res.data.data[i])
          } else if (res.data.data[i].sort == "two_sdl") {
            two_sdl.push(res.data.data[i])
          } else if (res.data.data[i].sort == "one_sdl") {
            one_sdl.push(res.data.data[i])
          } else if (res.data.data[i].sort == "two_jms") {
            two_jms.push(res.data.data[i])
          } else if (res.data.data[i].sort == "one_jms") {
            one_jms.push(res.data.data[i])
          } else if (res.data.data[i].sort == "thr_shr") {
            thr_shr.push(res.data.data[i])
          } else if (res.data.data[i].sort == "two_shr") {
            two_shr.push(res.data.data[i])
          } else if (res.data.data[i].sort == "one_shr") {
            one_shr.push(res.data.data[i])
          }
        }

        console.log(one_shr)
        console.log(two_shr)
        console.log(thr_shr)
        console.log(one_jms)
        console.log(two_jms)
        console.log(one_sdl)
        console.log(two_sdl)
        console.log(account)
          that.setData({
            account: account,
            two_sdl: two_sdl,
            one_sdl: one_sdl,
            two_jms: two_jms,
            one_jms: one_jms,
            thr_shr: thr_shr,
            two_shr: two_shr,
            one_shr: one_shr
          })
        if (length == 15) {
          that.data.page++;
          console.log(that.data.page)
          subordinateList(that);
        }else{
          that.setData({
          arr: [
            {
              title: "高级合伙人",
              rate: "0.50%",
              num: one_shr.length
            },
            {
              title: "中级合伙人",
              rate: "0.55%",
              num: two_shr.length
            },
            {
              title: "初级合伙人",
              rate: "0.60%",
              num: thr_shr.length
            },
            {
              title: "高级加盟商",
              rate: "0.65%",
              num: one_jms.length
            },
            {
              title: "初级加盟商",
              rate: "0.70%",
              num: two_jms.length
            },
            {
              title: "高级代理",
              rate: "0.75%",
              num: one_sdl.length
            },
            {
              title: "初级代理",
              rate: "0.80%",
              num: two_sdl.length
            },
            {
              title: "会员",
              rate: "0.85%",
              num: account.length
            }
          ]
        })
        }
      }
    }
  })
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    uid: "",
    Mer: "",  //用户类别
    page: 1,
    totalMoney: '',  //总收益
    phone: '', //用户手机号
    display: '',
    num: '',  //还款笔数
    money: '', //还款金额
    subordinate: "",
    member: [],  //会员代理
    arr: [],
    account:[],
    two_sdl:[],
    one_sdl:[],
    two_jms:[],
    one_jms:[],
    thr_shr:[],
    two_shr:[],
    one_shr:[],
    user: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取下级
    console.log("aaa")
    // urlData.subordinateList(that, wx.getStorageSync("uid"), that.data.pro, that.data.city, that.data.count, that.data.mer, that.data.page)
    subordinateList(that)

  },


  //点击进入：代理页面
  ontip: function (e) {
    var that = this;
    console.log(e)
    var order = e.currentTarget.dataset.index;
    if (wx.getStorageSync("realName")) {
      //下级会员代理人数列表页面
      wx.navigateTo({
        url: '../membership/membership',
      })
      wx.setStorageSync("order", order)

    } else {
      wx.navigateTo({
        url: '../realName/realName',
      })
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
  onShow: function () {
    var that = this;
    that.setData({
      display: wx.getStorageSync("display"),
    })
  },
  //拨打电话
  calling: function (e) {
    var that = this;
    wx.showModal({
      title: '您是否拨打4000222058咨询升级具备条件。',
      content: "",
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.makePhoneCall({
            phoneNumber: "4000222058",
            success: function (res) {
              console.log(res)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')

        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      page:1
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