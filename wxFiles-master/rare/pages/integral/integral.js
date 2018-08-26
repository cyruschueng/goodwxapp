var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    integral:0,
    list:[],
    limit:6,
    page:1,
    vip: ['普通会员', '黄金会员', '铂金会员'],
    vflag: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    app.getUserInfo()
    app.load(that)
    this.setData({
      integral: app.globalData.integral
    })
    wx.request({
      url: app.url + 'ShowIndexPro/MsgSelect?SalesFalg=0&integralFlag=1&limit=6&pageIndex=1',
      success: function (res) {
        console.log(res)
        that.setData({
          list:res.data
        })
      }
    })
    if (app.globalData.countintegral < app.globalData.lv1) {
      this.setData({
        vflag: 0
      })
    } else if (app.globalData.countintegral >= app.globalData.lv2 && app.globalData.countintegral < app.globalData.lv3) {
      this.setData({
        vflag: 1
      })
    } else {
      this.setData({
        vflag: 2
      })
    }
  },
  navToIntegral: function(e){
    var that = this
    wx.navigateTo({
      url: '/pages/integralgoods/integralgoods?li=' + JSON.stringify(that.data.list[e.currentTarget.id]),
    })
  },
  
  onShow: function () {
    app.getUserInfo()
  },


  onPullDownRefresh: function () {
    wx.request({
      url: app.url + 'ShowIndexPro/MsgSelect?SalesFalg=0&integralFlag=1&limit=6&pageIndex=1',
      success: function (res) {
        wx.stopPullDownRefresh()
        console.log(res)
        that.setData({
          list: res.data
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    var page = that.data.page + 1
    
    wx.request({
      url: app.url + 'ShowIndexPro/MsgSelect?SalesFalg=0&integralFlag=1&limit='+that.data.limit+'&pageIndex='+ page,
      success: function (res) {
        console.log(res)
        var li = that.data.list

        for(var i=0;i<res.data.length;i++){
          li.push(res.data[i])
        }
        that.setData({
          list: li,
          page:page
        })
      }
    })
  },

  onShareAppMessage: function () {
  
  },

})