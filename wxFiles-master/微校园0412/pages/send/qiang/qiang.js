var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    barflag: 0,
    list: [],
    list1: [],
    list2: [],
    loading: true,
    url:null
  },
  changeBar: function (e) {
    var id = e.currentTarget.dataset.id;
    this.setData({ barflag: id })
  },

  navToDetail: function (e) {
    wx.navigateTo({
      url: '/pages/order/orderDetail/orderDetail?value=1&id=' + e.currentTarget.dataset.na,
    })
  },
  navToMysend: function(e){
    wx.redirectTo({
      url: '/pages/mysend/mysend',
    })
  },
  dook: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.IP + 'wx/sure.do',
      data: { id: that.data.list1[e.currentTarget.dataset.id].id },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        
          var li = that.data.list1;
          var temp = [];
          temp.push(li[e.currentTarget.dataset.id]);
          li.splice(e.currentTarget.dataset.id, 1);
          wx.showToast({
            title: '确认成功',
            duration: 800
          })
          var l2 = that.data.list2;

          for (var i = 0; i < l2.length; i++) {
            temp.push(l2[i])
          }
          that.setData({ list1: li, list2: temp });
        
      },
    })
    // wx.request({
    //   url: app.globalData.IP + 'wx/psyplsure.do',
    //   data: { id: that.data.list1[e.currentTarget.dataset.id].id, psyid: wx.getStorageSync("appid") },
    //   success: function (res) {
        // if (res.data == 1) {
        //   var li = that.data.list1;
        //   var temp = [];
        //   temp.push(li[e.currentTarget.dataset.id]);
        //   li.splice(e.currentTarget.dataset.id,1);
        //   wx.showToast({
        //     title: '确认成功',
        //     duration: 800
        //   })
        //   var l2 = that.data.list2;

        //   for (var i = 0; i < l2.length; i++) {
        //     temp.push(l2[i])
        //   }
        //   that.setData({ list1: li, list2: temp });
        // } else {
        //   wx.showToast({
        //     title: '确认失败',
        //     duration: 800,
        //     image: '/images/60.png'
        //   })
        // }
    //   }
    // })
  },
  recapt: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.IP + 'wx/psypljs.do',
      data: { id: that.data.list[e.currentTarget.dataset.id].id, psyid: wx.getStorageSync("appid") },
      success: function (res) {
        if (res.data == 1) {
          var li = that.data.list;
          var temp = [];
          temp.push(li[e.currentTarget.dataset.id]);
          li.splice(e.currentTarget.dataset.id,1);
          wx.showToast({
            title: '抢单成功',
            duration: 800
          })
          var l1 = that.data.list1;

          for (var i = 0; i < l1.length; i++) {
            temp.push(l1[i])
          }
          that.setData({ list: li, list1: temp });
        } else {
          wx.showToast({
            title: '手慢啦~单子被抢走啦',
            duration: 800,
            image: '/images/60.png'
          })
        }
      }
    })
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.IP + 'wx/psyplorder.do',
      data: { psyid: wx.getStorageSync("appid") },
      success: function (res) {
        var l = [];
        var l1 = [];
        var l2 = [];
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].paystatus == '5') {
            l.push(res.data[i]);
          } else if (res.data[i].paystatus == '6' ) {
            l1.push(res.data[i])
          } else if (res.data[i].paystatus == '3'){
            l2.push(res.data[i])
          }
        }
        that.setData({ list: l, list1: l1, list2: l2, loading: false, url: app.globalData.IP + "controller/" })
      }
    })
    wx.request({
      url: app.globalData.IP + 'wx/psyplfind.do',
      data: { psyid: wx.getStorageSync("appid") },
      success: function (res) {
       
        
        that.setData({ list: res.data, loading: false })
      }
    })
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },


  onPullDownRefresh: function () {
    var that = this;
    wx.request({
      url: app.globalData.IP + 'wx/psyplfind.do',
      data:{psyid: wx.getStorageSync("appid")},
      success: function(res){
        wx.stopPullDownRefresh();
        var l = [];
        var list = [];
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].paystatus == '5') {
            l.push(res.data[i]);
          } 
        }
        for (var i = 0; i < list.length; i++){
          l.push(list[i]);
        }
        
        that.setData({ list: l,  loading: false })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

})