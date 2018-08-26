// addbook.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    animationData: {},
    winH: '',
    page: 1,
    hidden: false,
    hasMore: true,
    go_del:false,
    go_over:false
  },
  go: function (e) {
    wx.reLaunch({
      url: '/pages/addsOver/addsOver?id='+e.currentTarget.dataset.id,
    })
    console.log();
  },
  upper: function (e) {
    console.log('up');
    wx.showLoading({
      title: '加载中...',
    });
    var that = this;
    wx.request({
      url: getApp().appApi.myIssueAPI,
      data: {
        p: that.data.page + 1,
        uid: wx.getStorageSync('uid')
      },
      dataType: 'json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync('token'),
        'uid': wx.getStorageSync('uid')
      },
      success: function (res) {
        setTimeout(() => {
          wx.hideLoading();
        }, 100);
        if (res.data.code == 1001) {
          getApp().userLogin();
          wx.navigateTo({
            url: '/pages/index/index',
          })
        }
        if (res.data.code != 200) {
          wx.showModal({
            title: '请求失败！',
            content: res.data.msg,
            showCancel: false
          })
        } else {
          console.log(that.data.page);
          if (res.data.result.list.list.length < 10) {
            that.setData({
              hasMore: false
            });
          }
          if (res.data.result.list.list.length > 0) {
            console.log(res.data.result.list.list);
            var list = that.data.list;
            console.log(list);
            list.push(res.data.result.list.list[0]);
            that.setData({
              list: list,
              page: that.data.page + 1,
            });
          }
        }
      }
    });
  },
  down: function (e) {
    wx.showLoading({
      title: '加载中...',
    });
    console.log('down');
    var that = this;
    wx.request({
      url: getApp().appApi.myIssueAPI,
      data: {
        p: 1,
        uid: wx.getStorageSync('uid')
      },
      dataType: 'json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync('token'),
        'uid': wx.getStorageSync('uid')
      },
      success: function (res) {console.log(res)
        if (res.data.code==1001){
          getApp().userLogin();
          wx.navigateTo({
            url: '../myCreate/myCreate',
          })
        }
        if (res.data.code != 200) {
          wx.showModal({
            title: '请求失败！',
            content: res.data.msg,
            showCancel: false
          })
        } else {
          console.log(res.data.result);
          if (res.data.result.list.page_total == 1) {
            that.setData({
              hasMore: false
            });
          }
          that.setData({
            list: res.data.result.list.list,
            page: 1,
          });
          wx.hideLoading();
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
          winH: res.windowHeight-60
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log(2222222);
  },
  shift:function(){
    this.setData({
      go_del:true,
      go_over:true
    })
  },
  shift_two:function(){
    this.setData({
      go_del: false,
      go_over: false
    })
  },
  del:function(e){
    var that = this;
    wx.showModal({
      title: '温情提示',
      content: '此问卷是否删除？',
      success: function (res) {
        if (res.confirm) {
          console.log(e.currentTarget.dataset.id);
          wx.request({
            url: getApp().appApi.deleteAPI,
            data: {
              id: e.currentTarget.dataset.id
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
                that.down();
              }
            }
          });
        } else if (res.cancel) {

        }
      }
    })
  },
  am: function () {
    var that = this;
      wx.redirectTo({
        url: '/pages/myCreate/myCreate',
      })
  }
})