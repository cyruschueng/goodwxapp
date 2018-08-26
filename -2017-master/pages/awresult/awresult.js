// addbook.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    winH: '',
    page: 1,
    hasMore: true,
    question_id:'',
    q_option_id:'',
    title:'',
    is_must:2,
    img:'',
    is_correct:0,
    mycorrent:'',
    correct:''
  },
  upper: function (e) {
    console.log('up');
    wx.showLoading({
      title: '加载中...',
    });
    var that = this;
    wx.request({
      url: getApp().appApi.replyListMoreAPI,
      data: {
        p: that.data.page + 1,
        question_id: that.data.question_id,
        q_option_id: that.data.q_option_id
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
          wx.hideLoading();
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
      url: getApp().appApi.replyListMoreAPI,
      data: {
        p: 1,
        question_id: that.data.question_id,
        q_option_id: that.data.q_option_id
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
        if (res.data.code != 200) {
          wx.showModal({
            title: '请求失败！',
            content: res.data.msg,
            showCancel: false
          })
        } else {
          console.log(res.data.result.list.list);
          // console.log(res.data.result.list.total);

          that.setData({
            list: res.data.result.list.list,
            page: 1,
          });
          if (res.data.result.list.page_total == 1) {
            that.setData({
              hasMore: false
            });
          }
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      question_id: options.question_id,
      q_option_id: options.q_option_id
    });
    wx.showLoading({
      title: '加载中...',
    });
    console.log('down');
    var that = this;
    wx.request({
      url: getApp().appApi.replyListAPI,
      data: {
        uid: wx.getStorageSync('uid'),
        question_id: that.data.question_id,
        q_option_id: that.data.q_option_id
      },
      dataType: 'json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync('token'),
        'uid': wx.getStorageSync('uid')
      },
      success: function (res) {
        if (res.data.code == 1001) {
          getApp().userLogin();
          wx.reLaunch({
            url: '/pages/index/index',
          })
          // wx.navigateTo({
          //   url: '/pages/awresult/awresulte?question_id=' + that.data.question_id + '&q_option_id=' + that.data.q_option_id
          // })
        }
        if (res.data.code != 200) {
          wx.showModal({
            title: '请求失败！',
            content: res.data.msg,
            showCancel: false
          })
        } else {
          console.log(res.data);
          that.setData({
            img: res.data.result.item.img,
            title: res.data.result.item.title,
            is_must: res.data.result.item.is_must,
            correct: res.data.result.item.correct,
            mycorrent: res.data.result.item.my_answer,
            is_correct: res.data.result.item.is_correct
          });
          wx.hideLoading();
        }
      }
    });
    this.down(); 
    
    wx.getSystemInfo({
      success: (res) => { // 用这种方法调用，this指向Page
        this.setData({
          winH: res.windowHeight-60
        });
        console.log(res.windowHeight)
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
    console.log(e.currentTarget.dataset.id)
  }
})