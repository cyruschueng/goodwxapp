// create by zhangred 2017/11/17
const app = getApp();
const util = require('../utils/util.js');

Page({
  data: {
    userInfo:{},
    packword:'',
    packmoney:'',
    packnum:'',
    isajax:false,
    fee:0,
    cost:0,
    ajaxurl:app.globalData.apiurl,
    errormsg:{"w":true,"m":true,"n":true}
  },
  onLoad: function () {
    var self = this;
    // 页面设置
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ff4e3b'
    });
    wx.setNavigationBarTitle({
      title: '口令红包'
    });

    // 获取用户信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo
          })
        }
      })
    };
  },
  formInput:function(e){
    var v = e.detail.value,
      type = e.currentTarget.dataset.type;
    if(type=='w'){
      if(v.length>16){
        v = v.substr(0,16);
        this.openerror('w');
      };
      this.setData({
        packword: v
      })
    }else if(type=="m"){
      v = parseFloat(v)||0;
      if(v>10000){
        v = 10000;
        this.openerror('m');
      };
      this.setData({
        packmoney: v
      });
      this.getmoney();
    }else{
      v = parseFloat(v)||0;
      if(v>600){
        v = 600;
        this.openerror('n');
      };
      this.setData({
        packnum: v
      });
      this.getmoney();
    };
  },
  openerror:function(type){
    var errormsg = this.data.errormsg;
    errormsg[type] = false;
    this.setData({
      errormsg: errormsg
    });
    var self = this;
    setTimeout(function(){
      errormsg[type] = true;
      self.setData({
        errormsg: errormsg
      });
    },3000);
  },
  getmoney:function(){
    var total = (this.data.packmoney||0)*(this.data.packnum||0);
    this.setData({
      fee: total*0.01,
      cost:total*1.01
    })
  },
  newpack:function(){
    if(this.data.packword.length==0){
      wx.showModal({
        title: '提示',
        content: '请输入口令',
        showCancel:false
      });
      return false;
    }else if(this.data.cost==0){
      wx.showModal({
        title: '提示',
        content: '请输入金额或数量',
        showCancel:false
      });
      return false;
    };

    // 生成口令红包
    wx.showLoading({
      title: '正在生成\r\n口令红包'
    });
    var self = this;
    wx.request({
      url: self.data.ajaxurl+'red_packs?v='+(new Date().getTime()), //仅为示例，并非真实的接口地址
      method:"post",
      data:{
        red_pack:{
          watchword: self.data.packword,
          amount: self.data.packmoney,
          total: self.data.packnum
        }
      },
      header: {
          "Authorization":"PlainUserToken teststr"
      },
      success: function(res) {
        console.log(5,res)
        wx.hideLoading();
        if(res.statusCode==201){
          wx.redirectTo({
            url: '/pack/packshare?id='+res.data.id+'&type=new'
          })
        }else{
          wx.showModal({
            title: '提示',
            content: '提示错误信息字段',
            showCancel:false
          })
        };
      }
    })


  }
})
