// pages/quesiton/quesiton.js
var common = require('../../common.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listQue: [],
    quesition: [],
    is_set: '',
    g_id: '',
    right: false,
    ok: false,
    no: false,
    listask: [],
    rightnum: '',
    actives: false,
    quesitionIndex: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var sign = wx.getStorageSync('sign');
    that.setData({
      friend_mid: options.friend_mid,
      g_id: options.g_id
    })
    //回调
    common.getSign(function () {
      var sign = wx.getStorageSync('sign');
      that.setData({
        sign: sign
      })
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
    var that = this;
    var sign = wx.getStorageSync('sign');
    // 获取好友问题
    wx.request({
      url: "http://friend-guess.playonwechat.com/guess/get-friend-guess-detail?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        g_id: that.data.g_id,
        friend_mid: that.data.friend_mid
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("问题列表:", res);
        console.log(res.data.data[0].choices);
        that.setData({
          quesition: res.data.data,
          nowTitle: res.data.data[0].title,
          nowque: res.data.data[0],
          choices: res.data.data[0].choices
        })
      }
    })
    wx.hideLoading()
  },
  // 设置答案
  checked: function (e) {
    console.log(e);
    var that = this;
    var q_id = e.currentTarget.dataset.q_id;
    var c_id = e.currentTarget.dataset.quesitionIndex;
    var checked = e.currentTarget.dataset.checked;
    var active = e.currentTarget.dataset.active;
    var questionquesitionIndex = that.data.questionquesitionIndex;
    var quesitionIndex = that.data.quesitionIndex;
    var both = [];//新建both对象
    var listask = that.data.listask;
    var choices = that.data.quesition[quesitionIndex];
    console.log(choices);
    // if (checked == false){  //选错
    //   var choices = that.data.choices;
    //     choices[c_id].active = true ;//显示正确答案
    //     that.setData({
    //       actives:true,
    //       choices 
    //     })
    // }else{
    //   that.setData({
    //     right:true
    //   })
    // }
    // var c_id = choices[c_id].c_id;
    // if (c_id == that.data.rightnum){   //判断答案是否正确
    //   that.setData({
    //     right: true
    //   })
    // }else{
    //   that.setData({
    //     no: true
    //   })
    // }
    var str = that.data.quesitionIndex + '|' + c_id;
    console.log("quesitionIndex11", quesitionIndex);
    listask[quesitionIndex] = str;
    console.log("listask:", listask);
    that.setData({
      c_id: c_id,
      listask: listask
    })
    wx.setStorageSync('listask', that.data.listask);
    setTimeout(function () {
      that.setData({
        right: false //上一题答对的话，重置
      })
      // 下一题
      var length = that.data.quesition.length;//总题说
      var nowlength = that.data.nowque.length; //现在题数
      console.log(nowlength);
      if (quesitionIndex == length) {
        that.setData({
          finish: true
        })
      }
      var listask = that.data.listask;
      var quesitionIndex = that.data.quesitionIndex;
      for (var i in listask) {
        var str = listask[i];
        console.log("iii:", i);
        listask.push(str);
        console.log("listask:", listask);
        var quesition = that.data.quesition;
        var quesitionIndex = that.data.quesitionIndex;
        if (quesitionIndex > length) {
          return
        }
        quesitionIndex += 1;
        console.log("传：", quesitionIndex);
        that.setData({
          quesitionIndex: quesitionIndex,
          nowque: quesition[quesitionIndex]
        })
        console.log("nowque:", that.data.nowque);
        console.log("choices:", that.data.choices);

      }
    }, 300)
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