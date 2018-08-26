// pages/user/letter/letter.js
import moment from "../../../libs/moment";
let app = getApp();
let PATH = app.globalData.PATH;



let IMG_PATH = app.globalData.IMG_PATH;


Page({

  data: {
    IMG_PATH: IMG_PATH,
    value: ''
  },

  onLoad: function (options) {
    console.log(options);
    let that = this;
    that.setData({
      nick: options.nick,
      id: options.id,
      myId: app.globalData.userId
    })
  },

  onReady: function () {
  
  },

  onShow: function () {
    let that = this;
    getLetter(that);
  },
  bindInput: function (e) {
    let that = this;
    that.setData({
      value: e.detail.value
    })
  },
  bindReply: function () {
    let that = this;
    console.log(that.data.value);
    if (that.data.value == '') {
      return;
    }
    wx.request({
      url: PATH + "/resource-service/chat/postChat",
      header: {
        'Access-Token': app.globalData.accessToken,
      },
      method: "POST",
      data: {
        fromUser: app.globalData.userId,
        toUser: that.data.id,
        content: that.data.value
      },
      success: function (res) {
        console.log(res);
        if (res.data.status == 200) {
          that.setData({
            value: ''
          })
          getLetter(that);
        }
      },
    });
  }
})

function getLetter(that) {
  wx.request({
    url: PATH + "/resource-service/chat/getChatList",
    header: {
      'Access-Token': app.globalData.accessToken,
    },
    method: "GET",
    data: {
      fromUser : app.globalData.userId,
      toUser: that.data.id
    },
    success: function (res) {
      console.log(res);
      for (let i = 0; i < res.data.result.data.length; i ++) {
        
        res.data.result.data[i].chat_date = moment(res.data.result.data[i].chat_date).format("YYYY-MM-DD HH:mm");
      }
      if (res.data.status == 200) {
        that.setData({
          list: res.data.result.data
        })
      }
    },
  });
}

function tipModal(tip) {
  wx.showToast({
    title: tip,
    icon: 'loading',
    duration: 1500
  })
}