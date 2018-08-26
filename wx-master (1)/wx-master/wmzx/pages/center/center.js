//  ===========推广中心======pages/Promotion center/Promotion center.js
var app = getApp();
var urlData = require('../../utils/util.js');
var forx = function (that) {

}
var subordinateList = function (that) {
  var str = {
    "OperationType": "10016",
    "uid": wx.getStorageSync("uid"),
    "sort": that.data.sort,
    "state": 6,
    "page": that.data.page
  }
  //发起请求*
  wx.request({
    url: "http://ppp.zhybpay.com:1155/ashx/XYK_Server.ashx",
    data: str,
    method: 'POST',
    header: { "content-type": "application/json" },
    success: function (res) {
      console.log(10016)
      console.log(res)
      if (res.data.CODE == "00") {
        var length = res.data.data.length;
        var reg = /^(\d{3})\d+(\d{4})$/;
        if (that.data.page <= 1) {
          that.data.user = [];
        } else {
          var user = that.data.user
        }
        if (length) {
          for (var i = 0; i < length; i++) {
            res.data.data[i].username = res.data.data[i].username.replace(reg, "$1****$2");
            if (that.data.sort == "Agpro") {
              res.data.data[i].sort = "省代理"
            } else if (that.data.sort == "Agcity") {
              res.data.data[i].sort = "市代理"
            } else if (that.data.sort == "Agcount") {
              res.data.data[i].sort = "县代理"
            } else if (that.data.sort == "Mer") {
              res.data.data[i].sort = "会员"
            }

            if (res.data.data[i].state == 0) {
              res.data.data[i].state = "注册中"
            } else if (res.data.data[i].state == 1) {
              res.data.data[i].state = "未审核"
            } else if (res.data.data[i].state == 2) {
              res.data.data[i].state = "审核通过"
            } else if (res.data.data[i].state == 3) {
              res.data.data[i].state = "开通"
            } else if (res.data.data[i].state == 4) {
              res.data.data[i].state = "退回"
            } else if (res.data.data[i].state == 5) {
              res.data.data[i].state = "禁止"
            }
            if (that.data.page <= 1) {

            } else {
              user.push(res.data.data[i])
            }
          }
          if (that.data.page <= 1) {
            that.setData({
              user: res.data.data,
              show2:false
            })
          } else {
            that.setData({
              user: user
            })
          }
        } else {
        if (that.data.page <= 1) {
          that.setData({
            show2: true
          })
        } else {
          that.data.page--;
          console.log(that.data.page)
          wx.showToast({
            title: '没有数据了',
            image: "../../images/icon/f.png",
            duration: 1000,
            mask: true,
          })
        }
      }
    }
    }
  })
}

var count = function (that) {
  var str = {
    "OperationType": "10036",
    "uid": wx.getStorageSync("uid"),
  }
  //发起请求*
  wx.request({
    url: app.globalData.url,
    data: str,
    method: 'POST',
    header: { "content-type": "application/json" },
    success: function (res) {
      console.log(10034)
      console.log(res)
      if (res.data.CODE == "00") {
        that.setData({
          zt: res.data.PushCount,
          jt: res.data.total_Count
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
    uid: "",
    sort: "Agpro",  //用户类别
    page: 1,
    totalMoney: '',  //总收益
    phone: '', //用户手机号
    display: '',
    subordinate: "",
    member: [],  //会员代理
    // pro: [],
    // city:[],
    // count: [],
    // mer: [], //下级用户人数
    user: [],
    zt: "",//直推人数
    jt: "",//间推人数
    active: "",  //显示哪一种会员人数
    // classN:"",  //类名添加
    show: true, //控制页面显示部分
    show2: '',
    num: [
      {
        classN: true,
        ag: "省代理",
        Ag: "Agpro"
      },
      {
        classN: false,
        ag: "市代理",
        Ag: "Agcity"
      },
      {
        classN: false,
        ag: "县代理",
        Ag: "Agcount"
      },
      {
        classN: false,
        ag: "会员",
        Ag: "Mer"
      }
    ]
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
    count(that)
  },
  //我的推广
  promote: function () {
    var that = this;
    that.setData({
      show: false
    })
  },

  //点击展示
  choosed: function (e) {
    var that = this;
    console.log(e)
    var index = e.currentTarget.dataset.index;
    for (var i = 0; i < 4; i++) {
      if (i == index) {
        that.data.num[i].classN = true
      } else {
        that.data.num[i].classN = false
      }
    }
    console.log(that.data.num)
    that.setData({
      sort: that.data.num[index].Ag,
      page:1,
      user:[]
    })
    subordinateList(that)
    that.onShow()
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
      display: wx.getStorageSync("display")
     
    })
  },
  // //拨打电话
  // calling: function (e) {
  //   var that = this;
  //   wx.showModal({
  //     title: '您是否拨打4000222058咨询升级具备条件。',
  //     content: "",
  //     success: function (res) {
  //       if (res.confirm) {
  //         console.log('用户点击确定')
  //         wx.makePhoneCall({
  //           phoneNumber: "4000222058",
  //           success: function (res) {
  //             console.log(res)
  //           }
  //         })
  //       } else if (res.cancel) {
  //         console.log('用户点击取消')

  //       }
  //     }
  //   })
  // },

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
    var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    that.data.page++;

    subordinateList(that)
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
      console.log("点击分享button")
    }
    return {
      title: '完美智信',
      path: '/page/index/index',
      imageUrl: "../../images/about/logo.png",
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})