var app = getApp();
var event = require('../../utils/event.js');
var Api = require('../../utils/GroupRequest.js');
var Util = require('../../utils/util.js');
var websocket = require('../../utils/WebSocketUtil.js');
var User = require('../../utils/UserManager.js');
var currentIndex=0;
var getUserMenus = function(uid,pageInstance){
  wx.showLoading({
    title: '加载中',
  })
  Api.request({
    url:'/api/user/v1/getMenus',
    data:{
      uid:uid
    },
    success:function(data){
      // for(var i = 0 ; i < data.menus.length ; i ++){
      //   if(i == 0){
      //     data.menus[i].jumpUrl = '../voteList/voteList';
      //   }else if(i == 1){
      //     data.menus[i].jumpUrl = '../memoList/memoList';
      //   }else{
      //     data.menus[i].jumpUrl = '../memorandumDetail/memorandumDetail';
      //   }
      // }
      pageInstance.setData({
        imgUrls:data.imgs,
        grids:data.menus
      })
    },compelete:function(){
      wx.hideLoading()
    }
  });
}
Page({
    data: {
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
    },
    onLoad:function(res){
      if (User.Singleton.getInstance().getLogin()){
        getUserMenus(User.Singleton.getInstance().getLoginUserInfo().uid, this);
      }else{
        var that = this;
        event.on('isLogin',true,function(){
          getUserMenus(User.Singleton.getInstance().getLoginUserInfo().uid, that);
        })
      }
      websocket.openConnect({
        url:'wss://presocket.atling.cn/group/memorandumSocket',
        onMessage:function(data){
          console.log(data)
          if(currentIndex >= data.msg.length){
              currentIndex =0;
          }
          wx.setTopBarText({
            text: data.msg[currentIndex++].memorandumTitle
          })
        },
        onSocketOpen:function(){
         // setTimeout(send, 60000);
        }
      })
    }
});