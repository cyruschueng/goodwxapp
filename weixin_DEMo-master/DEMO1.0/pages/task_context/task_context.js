// pages/task_context/task_context.js
var app = getApp();
const AV = require('../../lib/av-weapp-min');
const Todo = require('../../model/Todo');
const Group=require('../../model/Group');
Page({
  data:{
    members:[],
    userInfo: {},
    title:"",
    content:"",
    List:{},
    countMember:0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    });
    var result=JSON.parse(options.res);
    this.setData({
      title: result.T_name,
      content:result.T_con,
      List:result
    });
    console.log(result);
    wx.showShareMenu({
      withShareTicket:true
    })
    if(options.scence==1044){
      wx.getShareInfo({
        shareTicket: options.shareTicket,
        success: function(res){
          var encryptedData=res.encryptedData;
          var iv=res.iv;
        }
      })
    }
    this.fetchMembers(result.Tag);
    

  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  onShareAppMessage:function(res){
    if(res.from==='button'){
      console.log("Button share");
    }
    var SData=this.data.List;
    return{
      title:"好友邀请你加入",
      path: '/pages/task_context/task_context?res=' + JSON.stringify(SData),
      success:function(res){
         console.log("Success");
         var shareTickets=res.shareTickets;
         if(shareTickets.lenth==0){
           return false;
         }
         wx.getShareInfo({
           shareTicket: shareTickets[0],
           success: function(res){
            var encryptedData=res.encreyptedData;
            var iv=res.iv;
           }
         })
      },
      fail:function(res){
        console.log("Faild")
      }
    }
  },
  AddGroup:function(){
    var acl = new AV.ACL();
    acl.setPublicReadAccess(true);
    acl.setPublicWriteAccess(false);
    acl.setReadAccess(AV.User.current(), true);
    acl.setWriteAccess(AV.User.current(), true);
    new Todo({
      T_name: this.data.List.T_name,
      T_con: this.data.List.T_con,
      T_date: this.data.List.T_date,
      user: AV.User.current(),
      Count: 0,
      Days: this.data.List.Days,
      ContD: '0',
      done: false,
      Jin: 0,
      Tag: this.data.List.Tag
    }).setACL(acl).save().then(function (todo) {
        todo.save();
      });
      var aclG = new AV.ACL();
      aclG.setPublicReadAccess(true);
      aclG.setPublicWriteAccess(false);
      aclG.setReadAccess(AV.User.current(), true);
      aclG.setWriteAccess(AV.User.current(), true);
      new Group({
        ListId: this.data.List.Tag,
        Count: 0,
        ImgUrl: app.globalData.userInfo.avatarUrl,
        UserName: app.globalData.userInfo.nickName,
        User: AV.User.current()
      }).setACL(aclG).save();
 
    wx.redirectTo({
      url: '../task_list/task_list'
    })
  },
  fetchMembers:function(tag){

    console.log('TagId',tag);
    const query = new AV.Query('Group').equalTo('ListId',tag).descending('Count');

  
    console.log(query);
    const setMembers=this.setMembers.bind(this);
    return AV.Promise.all(query.find().then(setMembers));
  },
  setMembers:function(members){
    this.setData({
      members
    });
    return members;
  }
})