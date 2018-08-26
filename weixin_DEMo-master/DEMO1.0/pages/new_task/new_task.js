// pages/new_task/new_task.js
const AV = require('../../lib/av-weapp-min');
const Todo = require('../../model/Todo');
const Group=require('../../model/Group');
var util = require('../../utils/util');
var app = getApp();
Page({
  data: {
    date: '点我设置截至日期',
    date_f: '0',
    date_l: '0',
    T_name: '',
    T_con: '',
    DeadLine: '',
    NowTime: '',
    array: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
    index: 0,
    done: false,
    objId:'',
    userInfo:{}
  },
  login:function(){

    return AV.Promise.resolve(AV.User.current()).then(user=>user ?(user.isAuthenticated().then(authed=>authed?user:null)):null
    ).then(user=>user?user:AV.User.loginWithWeapp());

  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
     this.login();  
     console.log(app.globalData.userInfo.nickName);
  },
  bindDateChange: function (e) {
    this.setData({
      index:parseInt(e.detail.value)
    })
    var cont = parseInt(e.detail.value) + 1;
    if (e.detail.value < 9) {
      this.setData({
        date_f: '0',
        date_l: parseInt(e.detail.value) + 1,
        date: util.DateDiff(cont)
      })
    } else if(e.detail.value==9){

       this.setData({
        date_f:'1',
        date_l: '0',
        date: util.DateDiff(10)
      })
    }else {
      var arr = [];
      arr = e.detail.value.split("");
      this.setData({
        date_f: arr[0],
        date_l: parseInt(arr[1]) + 1,
        date: util.DateDiff(cont)
      })

    }

  },

  onReady: function () {
    // 页面渲染完成
   
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  add_ok: function () {
    var value_name=this.data.T_name;
    var value_date=this.data.date;
    var d=this.data.index+1;
    if(!value_name){return;}
    var value_context=this.data.T_con;
    if(!value_context){return;}
    var acl=new AV.ACL();
    acl.setPublicReadAccess(true);
    acl.setPublicWriteAccess(false);
    acl.setReadAccess(AV.User.current(),true);
    acl.setWriteAccess(AV.User.current(),true);
    new Todo({
      T_name:value_name,
      T_con:value_context,
      T_date:value_date,
      user:AV.User.current(),
      Count:0,
      Days:d,
      ContD:'0',
      done:false,
      Jin:0,
      Tag:'0'
    }).setACL(acl).save().then(function(todo){
      var objectId=todo.id;
       todo.set('Tag',objectId);
       todo.save();
       var aclG=new AV.ACL();
       aclG.setPublicReadAccess(true);
       aclG.setPublicWriteAccess(false);
       aclG.setReadAccess(AV.User.current(), true);
       aclG.setWriteAccess(AV.User.current(), true);
       new Group({
         ListId:objectId,
         Count:0,
         ImgUrl: app.globalData.userInfo.avatarUrl,
         UserName: app.globalData.userInfo.nickName,
         User:AV.User.current()
       }).setACL(aclG).save();
    });
  
    wx.redirectTo({
      url: '../task_list/task_list'
    })

  },
  updateTName: function ({detail: {value}}) {
    if (!value) return;
    this.setData({ T_name: value });
  },
  updateTCon: function ({detail: {value}}) {
    if (!value) return;
    this.setData({ T_con: value });
  },
  cancle:function(){
    wx.redirectTo({
      url: '../task_list/task_list'
    })
  },
})