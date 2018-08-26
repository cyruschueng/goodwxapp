var Util = require('../../utils/util.js');
var Api = require('../../utils/GroupRequest.js');
var event = require('../../utils/event.js');
var User = require('../../utils/UserManager.js');
var app = getApp();
var voteId = '';
var onShareSuccess = function(shareInfo){
  Api.request({
    url:'/api/vote/v1/onShareSuccess',
    data:{
      encryptedData: shareInfo.encryptedData,
      iv:shareInfo.iv,
      sessionkey: User.Singleton.getInstance().getLoginUserInfo().session_key,
      voteId:voteId
    },
    success:function(data){
      console.log(data);
    }
  });
};

var getVote =  function(pageInstance) {
  wx.showLoading({
    title: '加载中',
  })
  Api.request({
    url: "/api/vote/v1/getVote",
    data: {
      voteId:voteId
    },
    success: function (data) {
      console.log(data);
      if (data.maxSelect > 1) {
        data.selectType = '最多选' + data.maxSelect + "项";
      } else {
        data.selectType = "单选";
      }
      var count = 0;
      var hasVote = false;
      var users = new Array();
      for (var i = 0; i < data.options.length; i++) {
        count += data.options[i].voteUsers.length;
        for (var j = 0; j < data.options[i].voteUsers.length; j++) {
          if (data.options[i].voteUsers[j].uid == User.Singleton.getInstance().getLoginUserInfo().uid) {
            hasVote = true;
            data.hasOptionId = data.options[i].id;
            data.options[i].checked = true;
          }
          var user = data.options[i].voteUsers[j];
          var info = user.rawData;
          info = JSON.parse(info);
          user.wxInfo = info;
          var added = false;
         for(var t = 0 ;t < users.length ; t ++){
           if(users[t].uid == user.uid){
              added = true;
              break;
           }
         }
         if(!added){
           users.push(user);
         }
        }
      }
      data.createTime = Util.formatTime(new Date(parseInt(data.createTime)));


      if (Util.convertDateFromString(data.endTime) > Util.convertDateFromString(Util.getNowFormatDate()+" "+Util.getNowFormatTime())) {
        data.voteTag = '进行中';
        data.isEnd = false;
      } else {
        data.voteTag = '已结束';
        data.isEnd = true;
      }
      if (data.anonymous == '0'){
        console.log('0')
      }
      if (data.anonymous == '1') {
        console.log('1')
      }
      if (User.Singleton.getInstance().getLoginUserInfo().uid == data.creater.uid){
        data.shouldVoteShow = true; //本人可以查看投票详情
      }else{
        if (data.anonymous == '0'){
          data.shouldVoteShow = true;
        }else{
          data.shouldVoteShow = false;
        }
      }
      var userInfo = data.creater.rawData;
      userInfo = JSON.parse(userInfo);
      data.creater.wxInfo = userInfo;
      data.users = users;
      data.selectCount = count;
      data.hasVote = hasVote;
      data.checkingCount = 0;
      pageInstance.setData({
        vote: data
      })
    },compelete:function(){
      wx.hideLoading();
    }
  })
}
var optionSelect = function(optionIds,pageInstance){
  wx.showLoading({
    title: '投票中',
  })
  var userId = User.Singleton.getInstance().getLoginUserInfo().uid;
  Api.request({
    url: "/api/vote/v1/addVoteUser",
    data: {
      optionIds: optionIds,
      userId:userId
    },
    success:function(data){
      var data = pageInstance.data;
      getVote(pageInstance);
    },compelete:function(){
      wx.hideLoading()
    }
    })
};
Page({
  onLoad:function(res){
    wx.showShareMenu({
      withShareTicket: true,
    })
    voteId = res.voteId;
    if (User.Singleton.getInstance().getLogin()) {
      getVote(this);
    } else {
      var that = this;
      app.getUserInfoFun()
      event.on('isLogin', this, function () {
        console.log('login success');
        getVote(that);
      })
    }
  }, 
  checkboxChange:function(e){
    var data = this.data;
    if (this.data.vote.hasVote || data.vote.isEnd){
      if (data.vote.options[e.currentTarget.dataset.index].showVoteUser){
        data.vote.options[e.currentTarget.dataset.index].showVoteUser = false;
      }else{
        data.vote.options[e.currentTarget.dataset.index].showVoteUser = true;
      }
      this.setData(data);
      return;
    }
    if (!data.vote.options[e.currentTarget.dataset.index].checked ){
      if (data.vote.checkingCount < parseInt(this.data.vote.maxSelect)) {
        data.vote.options[e.currentTarget.dataset.index].checked = true;
        data.vote.checkingCount = parseInt(data.vote.checkingCount) + 1;
      }
    }else{
      data.vote.options[e.currentTarget.dataset.index].checked = false;
      data.vote.checkingCount = parseInt(data.vote.checkingCount) - 1;
    }
    
    this.setData(data)
    //optionSelect();
  },
  lookBig:function(){
    var imgs = new Array();
    imgs.push(this.data.vote.imgurl);
    wx.previewImage({
      urls: imgs,
    })
  },
  submit:function(e){
    var vote = this.data.vote;
    var optionIds = '';
    for(var i = 0 ; i < vote.options.length ; i++){
      var option = vote.options[i];
      if(option.checked){
        optionIds += option.id + ',';
      }
    }
    optionIds = optionIds.substring(0, optionIds.length - 1);
    optionSelect(optionIds,this);
  },
  onUnload:function(){
    event.remove('isLogin',this);
  },
  onPullDownRefresh:function(res){

  },
  lookList: function (res) {
    wx.redirectTo({
      url: '../voteList/voteList',
    })
  },
  onShareAppMessage: function () {
    return {
      title: User.Singleton.getInstance().getWxUserInfo().userInfo.nickName + '发起了一个投票',
      desc: this.data.vote.theme,
      path: '/pages/voteDetail/voteDetail?voteId=' + voteId,
      success: function (res) {
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success:function(shareInfo){
            onShareSuccess(shareInfo);
          }
        })
      }
    }
  }

})