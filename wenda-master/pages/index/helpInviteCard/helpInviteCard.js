import {GET,POST,promisify} from '../../../libs/request.js';
import {server, imgServer, wxappServer } from '../../../libs/config.js';
var app = getApp();
let imgBaseSrc = 'http://image.qunmee.com/';

Page({
  data: {
      imgSrc: "",
      loading: true
  },
  onLoad(options) {
    if(options.helpId) {
      app.globalData.helpId = options.helpId;
    }
  },
  getData: function() {
    let timeStamp = new Date().getTime();
    wx.showToast({
      title: '正在生成',
      icon: 'loading',
      duration: 10000
    })
    let sid = app.globalData.sid;
    let id = app.globalData.helpId;
    var This = this;
    wx.request({
      url: wxappServer + "help/invitation/" + id + "?sid=" + sid,
      method: 'GET',
      "content-type": "application/x-www-form-urlencoded", 
      success: function(data){
       if (data.data.suc == '100') return;
       else if (data.data.suc == '200') {
         let imgSrc = data.data.data + '?' + timeStamp;
         wx.hideToast();
         This.setData({
           'imgSrc': imgBaseSrc + imgSrc
         })
       }
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  previewPic() {
    var This = this;
    wx.previewImage({
        urls: [This.data.imgSrc],
    })
  },
  onShareAppMessage: function () {
    //return hotapp.onShare(this, '群通知', '微信群内好用的群通知工具，赶快来体验一下吧!');
    return {
      title: '红包求助邀请|我一直觉得你是个人才,求解决!求转发!',
      desc: '帮助他人， 快乐自己， 还有红包等着你。',
      path: '/pages/help/helpInviteCard/helpInviteCard?helpId=' + app.globalData.helpId
    }
  },
  onShow: function () {
    app.login(this.getData, this);
    //this.getData();
  }
})
