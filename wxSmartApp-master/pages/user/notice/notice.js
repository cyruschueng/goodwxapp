// pages/user/notice/notice.js
import { goToShareDetail } from "../../../libs/router";
import moment from "../../../libs/moment";
let app = getApp();
let PATH = app.globalData.PATH;
Page({

  data: {
    notice: 'comment', // letter
  },

  onLoad: function (options) {
    console.log(options);
    
  },

  onReady: function () {
  
  },

  onShow: function () {
    let that = this;
    if (that.data.notice == 'comment') {
      getComment(that);
    } else {
      getLetter(that);
    }
  },
  bindToReplay: function (e){
    let that = this;
    let index = e.currentTarget.dataset.index;
    console.log(index);
    if (that.data.notice == 'comment') {
      let id = that.data.list[index].shareId;
      let read_id = that.data.list[index].id
      console.log(id);
      wx.navigateTo({
        url: '../../shareDetail/shareDetail?id=' + id + '&read_id=' + read_id,
      })
    } else {
      let id = that.data.list[index].userId;
      let nick = that.data.list[index].nick_name;
      wx.navigateTo({
        url: '../../user/letter/letter?id=' + id + '&nick=' + nick,
      })
    }
  },
  bindChangeNotice: function () {
    let that = this;
    if (that.data.notice == 'comment') {
      that.setData({
        notice: 'letter'
      });
      getLetter(that);
    } else {
      that.setData({
        notice: "comment"
      });
      getComment(that);
    }
  }
})

function getComment(that) {
  wx.request({
    url: PATH + "/resource-service/share/getActMeList",
    header: {
      'Access-Token': app.globalData.accessToken,
    },
    method: "GET",
    data: {
      userId: app.globalData.userId
    },
    success: function (res) {
      console.log(res);
      for (let i=0;i<res.data.result.length;i++) {
        res.data.result[i].actDate = moment(res.data.result[i].actDate).format("YYYY-MM-DD HH:mm");
      }
      if (res.data.status == 200) {
        that.setData({
          list: res.data.result
        })
      }
    },
  });
}

function getLetter(that) {
  wx.request({
    url: PATH + "/resource-service/chat/getToMeChat",
    header: {
      'Access-Token': app.globalData.accessToken,
    },
    method: "GET",
    data: {
      toUser: app.globalData.userId
    },
    success: function (res) {
      console.log(res); 
      for (let i = 0; i < res.data.result.data.length; i++) {
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