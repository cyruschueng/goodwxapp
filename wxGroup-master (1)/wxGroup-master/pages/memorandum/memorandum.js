var Util = require('../../utils/util.js');
var Api = require('../../utils/GroupRequest.js');
var User = require('../../utils/UserManager.js');
var showTips = function (that, msg) {
  that.setData({
    showTopTips: true,
    tipMsg: msg
  });
  setTimeout(function () {
    that.setData({
      showTopTips: false,
    });
  }, 3000);
}
Page({
  data: {
    date: Util.getNowFormatDate(24 * 60 * 60 * 1000),
    time: Util.getNowFormatTime(24 * 60 * 60 * 1000),
    remaindate: Util.getNowFormatDate(22 * 60 * 60 * 1000),
    remaintime: Util.getNowFormatTime(22 * 60 * 60 * 1000),
    contentCount: "0/80"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  switchhandle:function(e){
    console.log(e.detail.value)
    this.setData({
      showRemain: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  remainDateChange: function (e) {
    this.setData({
      remaindate: e.detail.value
    })
  },
  remainTimeChange: function (e) {
    this.setData({
      remaintime: e.detail.value
    })
  },
  publish:function(){
    if (!this.data.title) {
      showTips(this, "请填写备忘标题吧");
      return;
    }
    if (!this.data.content) {
      showTips(this, "至少描述下啊");
      return;
    }
    var remainTime = this.data.remaindate + " " + this.data.remaintime;
    var endTime = this.data.date + " " + this.data.time;
    remainTime = Util.convertDateFromString(remainTime);
    endTime = Util.convertDateFromString(endTime);
    remainTime = parseInt(remainTime);
    endTime = parseInt(endTime);

    if(remainTime > endTime){
      showTips(this, "提醒时间不能晚于结束时间");
      return;
    }
    wx.showLoading({
      title: '努力加载中',
    })
  Api.request({
    url:'/api/memorandum/v1/addMemorandum',
    data:{
      createrId:User.Singleton.getInstance().getUid(),
      title:this.data.title,
      content:this.data.content,
      endTime:endTime,
      remainTime:remainTime,
      remain:this.data.showRemain
    },
    method:'POST',
    success:function(data){
      console.log(data);
      wx.redirectTo({
        url: '../memorandumDetail/memorandumDetail?memoId='+data.memorandumId,
      })
    }, compelete:function(){
      wx.hideLoading()
    }
  })
  },
  titleInput:function(e){
    this.setData({
      title:e.detail.value
    })
  },
  contentInput: function (e) {
    var contentCount = e.detail.value.length;
    this.setData({
      content: e.detail.value,
      contentCount: contentCount+"/80"
    })
  },
})