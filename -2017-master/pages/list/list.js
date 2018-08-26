let utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: {},
    list: [],
    winH:'',
    page: 1,
    hidden: false,
    hasMore:true,
    n:0
  },
go:function(e){
  wx.reLaunch({
    url: '/pages/addsOver/addsOver?id='+e.currentTarget.dataset.id,
  })
  console.log(e.currentTarget.dataset.id);
},
upper:function(e){
  console.log('up');
  wx.showLoading({
    title: '加载中...',
  });
  var that = this;
  wx.request({
    url: getApp().appApi.squareAPI,
    data: {
      p: that.data.page + 1,
    },
    dataType: 'json',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'token': wx.getStorageSync('token'),
      'uid': wx.getStorageSync('uid')
    },
    success: function (res) {
      if (res.data.code != 200) {
        wx.showModal({
          title: '请求失败！',
          content: res.data.msg,
          showCancel: false
        })
      } else {
        console.log(that.data.page);
        if (res.data.result.list.list.length<10){
          that.setData({
            hasMore: false
          });
        }
        if (res.data.result.list.list.length>0){
          console.log(res.data.result.list.list);
          var list = that.data.list;
          console.log(list);
          list.push(res.data.result.list.list[0]);
          that.setData({
            list: list,
            page: that.data.page + 1,
          });
        } 
        wx.hideLoading();
      }
    }
  });
},
down: function(e) {
  wx.showLoading({
    title: '加载中...',
  });
  console.log('down');
  var that = this;
  wx.request({
    url: getApp().appApi.squareAPI,
    data: {
      p: 1
    },
    dataType: 'json',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'token': wx.getStorageSync('token'),
      'uid': wx.getStorageSync('uid')
    },
    success: function (res) { 
      console.log(res);
      setTimeout(() => {
        wx.hideLoading();
      }, 100);
      if (res.data.code != 200) {
        wx.showModal({
          title: '请求失败！',
          content: res.data.msg,
          showCancel: false
        })
      } else {
        console.log(res.data.result);
        // console.log(res.data.result.list.total);
        if (res.data.result.list.page_total==1){
          that.setData({
            hasMore:false
          });
        }
          that.setData({
            list: res.data.result.list.list,
            page:1,
        });
      }
    }
  });
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.down();
    wx.getSystemInfo({
      success: (res) => { // 用这种方法调用，this指向Page
        this.setData({
          winH: res.windowHeight
        });
      }
    });
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
    // wx.showModal({
    //   title: '',
    //   content: wx.getStorageSync('token'),
    // });
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
 am:function(){
   var that = this;
   var n = that.data.n;
   n = n+1080;
   that.setData({
    n:n
   });
   var animation = wx.createAnimation({
     transformOrigin: "50% 50%",
     duration: 500,
     timingFunction: 'ease', 
   });
   this.animation = animation;
     animation.rotate(that.data.n).step();
     that.setData({
       animationData: animation.export()
     });
     setTimeout(function(){
       wx.reLaunch({
         url: '/pages/list/list',
       })
     }, 500)
     
  }
})