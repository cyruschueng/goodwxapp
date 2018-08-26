var app = getApp();
var util = require('../t.js');
var db = true;
Page({
  data: {
    list:[],
    prize:'',
    pan_rot:0,
  },
  onShareAppMessage: function () {
    return {
      title: '中油平台白拿',
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ baseUrl: 'http://www.zyylpt.com/' })//设置全局的页面路径
    var that=this
    wx.request({
      url: app.globalData.apiBase+'index.php/free/jiangpin.html', 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        let lists = res.data.replace(/^\(|\)$/g, '');
        that.setData({ list: JSON.parse(lists)})
       // console.log(JSON.parse(lists))    
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        var ua = res.model;
        if (/iphone|ipad|ipod/i.test(ua)) {
         // console.log(ua)
          that.setData({ isIphone:true })
        }
      }
    })
  },
  
  getProdut() {//开始抽奖
    var info = wx.getStorageSync('flag');
    if (info != 3) {
      util.islogin();//判断是否是登录状态
    } else {  
      
      var that = this
      if(!db){
        wx.showModal({
          showCancel: false,
          content: "未到抽奖时间",
        })
        return
      } 
      db=false;
      setTimeout(function () {
        db = true;
      }, 60 * 1000)
      wx.request({
        url: app.globalData.apiBase + 'index.php/weixin/choujiang.html', //接口地址
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          id: app.globalData.uid
        },
        dataType: 'json',
        success: function (res) {
          
          if (res.data) {
            let d = JSON.parse(res.data.replace(/^\(|\)$/g, ''));
            
            if (d['nk'] == 'nointval' || d['nk'] == 'funointval') {
              wx.showModal({
                // title: '465456464',
                showCancel: false,
                content: "距离下次抽奖时间还有" + d['time'] + "分钟",
              })
            } else if (d[0] == 'needanswer') {
              wx.showModal({
                title: '答题',
                content: "needanswer",
              })
            } else {
              let rot = 360 + d[1] * 18 + 2 * 360; //要旋转的角度
              that.setData({ pan_rot: rot });
              setTimeout(function () {
                wx.showModal({
                  showCancel: false,
                  title: '提示',
                  content: "恭喜您抽中" + d[4],
                  /* confirmText:"查看余粮",
                  success:function(res){
                    if (res.confirm) {
                      wx.navigateTo({
                        url: '../goodstuff/goodstuff',
                      })
                    }
                  }*/
                })
              }, 5000)
            }
            
          }
        }
      })
    }
    
  },

  // rulecolse(){
  //   this.setData({isrule:false})
  // },
  // ruleShow(){
  //   this.setData({ isrule: true })
  // }
})