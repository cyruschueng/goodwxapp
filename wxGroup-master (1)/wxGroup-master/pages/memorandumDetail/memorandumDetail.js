var Util = require('../../utils/util.js');
var Api = require('../../utils/GroupRequest.js');
var event = require('../../utils/event.js');
var User = require('../../utils/UserManager.js');
var Zan = require('../comm/index');
var app = getApp();
var memoId = '';
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
var getMemo = function(page){
  wx.showLoading({
    title: '加载中',
  })
  Api.request({
    url:'/api/memorandum/v1/getMemorandum',
    data:{
      memorandumId:memoId,
      uid:User.Singleton.getInstance().getUid()
    },
    success:function(data){
      var memo={};
      memo.title = data.title;
      memo.content = data.content;
      memo.endTimes = Util.formatTime(new Date(parseInt(data.endTime)));
      memo.endTime = data.endTime;
      memo.createTimes = Util.formatTime(new Date(parseInt(data.createTime)));
      memo.isMe = data.isMe;
      memo.isEnd = data.isEnd;
      memo.tag = data.isEnd?"已结束":"进行中";
      memo.createrUser = data.createrUser;
      memo.users = data.users;
      memo.hasAttend = data.hasAttend;
      memo.remainTime = Util.formatTime(new Date(parseInt(data.remainTime)));
      memo.excuted = data.excuted;
      memo.remain = data.remain;
      //memo.remain = data.
      page.setData({
        memo:memo
      })
      if(memo.excuted == '1'){
        page.setData({
          [`async.disabled`]:true
        })
      }else{
        page.setData({
          [`async.disabled`]: false
        })
      }
      if(memo.remain == '1'){
        page.setData({
          [`async.checked`]: true,
        })
      }else{
        page.setData({
          [`async.checked`]: false,
        })
      }
    }, compelete:function(){
      wx.hideLoading()
    }
  })
};
Page(Object.assign({}, Zan.Switch, {
  data: {
    async: {
      checked: true,
      loading: false
    },
    memo:{
    },
    remaindate: Util.getNowFormatDate(),
    remaintime: Util.getNowFormatTime(),
  },
  handleZanSwitchChange(e) {
    var componentId = e.componentId;
    var checked = e.checked;
    console.log(e)
    if (componentId == 'async') {
      // 异步开关
      this.setData({
        [`${componentId}.loading`]: true
      });
      var suc = false;
      Api.request({
        url:'/api/memorandum/v1/notRemain',
        data:{
          uid: User.Singleton.getInstance().getUid(),
          memorandumId:memoId,
          remain:checked?1:0
        },
        success:function(data){
          suc = true;
          this.setData({
            [`${componentId}.loading`]: false,
            [`${componentId}.checked`]: checked
          });
        },
        compelete:function(){
          if(!suc){
            this.setData({
              [`${componentId}.loading`]: false,
              [`${componentId}.checked`]: !checked
            });
          }
        }
      })
      setTimeout(() => {
        this.setData({
          [`${componentId}.loading`]: false,
          [`${componentId}.checked`]: checked
        });
      }, 500);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    memoId = options.memoId;
    if (User.Singleton.getInstance().getLogin()) {
      getMemo(this);
    } else {
      var that = this;
      app.getUserInfoFun()
      event.on('isLogin', this, function () {
        console.log('login success');
        getMemo(that);
      })
    }
  },
  switchhandle:function(e){
    this.setData({
      showRemain:e.detail.value
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
  submit:function(){
    var remainTime = this.data.remaindate + " " + this.data.remaintime;
    var endTime = this.data.endTime ;
    remainTime = Util.convertDateFromString(remainTime);
    remainTime = parseInt(remainTime);
    if (remainTime > endTime) {
      showTips(this, "提醒时间不能晚于结束时间");
      return;
    }
    var that = this;
    wx.showLoading({
      title: '努力加载中',
    })
    Api.request({
      url:"/api/memorandum/v1/addMemorandumUser",
      data:{
        memorandumId:memoId,
        userId:User.Singleton.getInstance().getUid(),
        remainTime:remainTime,
        remain:1
      },
      success:function(data){
        console.log(data)
        getMemo(that);
      },
      compelete:function(){
        wx.hideLoading()
      }
    })
  },
  onShareAppMessage: function () {
    var that = this;
    return {
      title: that.data.memo.createrUser.wxInfo.nickName + '邀请您加入一条备忘录',
      desc: that.data.memo.title,
      path: '/pages/memorandumDetail/memorandumDetail?memoId=' + memoId,
      success: function (res) {
      }
    }
  }
}));