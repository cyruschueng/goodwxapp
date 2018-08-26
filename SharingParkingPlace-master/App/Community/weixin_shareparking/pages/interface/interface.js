var Bmob = require('../../utils/bmob.js');
var common=require('../../utils/common.js');
var app = getApp()
var grids = [
  { "name": "创建车位", "ico": "icon_API_HL copy.png", "url": "code/code" },
  { "name": "编辑个人车位", "ico": "edits.png", "url": "../explain/explain" },
   {"name":"订单查询","ico":"pay.png","url":"../pay/pay"},
   { "name": "附近车位查询", "ico": "location.png", "url": "../explain/explain" },
   
   
  
];
Page({    
    data: {        
        userInfo: {},
        grids: grids
    
    },
    onLoad:function(){
        var that = this 
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            console.log(userInfo)
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
    },
    autuLogin:function(){
        common.showModal("App.js实现小程序访问则将数据写入系统User表，具体代码请查看App.js。")
    },


})