import {GET,POST,promisify} from '../../../libs/request.js';
import {server, imgServer, wxappServer } from '../../../libs/config.js';
let APP = getApp();
let remindTime = null;

Page({
  data:{
    keyWord: 'm',
    time: 3
  },
  onLoad: function(e) {
    let key = e.keyWord;
    if (key) {
        this.setData({
        keyWord:  e.keyWord
      })
    }
  },
  onShow: function() {
    this.countDown();
  },
  toIndex: function() {
    clearInterval(remindTime);
    wx.switchTab({
      url: '../helpIndex/helpIndex',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  countDown: function() {
    let time = this.data.time;
    remindTime = setInterval(() => {
      if (time == 0) {
        this.toIndex();
        return;
      }
      this.setData({
        time: --time
      })
    },1000)
  },
  seeQue: function() {
    this.toIndex();
  },
})