// pages/goodstuff/goodstuff.js
var util = require('../t.js');
var app = getApp();
Page({
  data: {
    lists:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
   // console.log(util)
    this.setData({ baseUrl: app.globalData.apiBase })//设置全局的页面路径
    var info = wx.getStorageSync('flag');
    if (info!=3){  //判断是否登录
      util.islogin();
    }else{
      load(this);   
    }   
  },
  onPullDownRefresh: function () {//下拉刷新
    this.setData({ baseUrl: app.globalData.apiBase })//设置全局的页面路径
    var info = wx.getStorageSync('flag');
    if (info != 3) {  //判断是否登录
      util.islogin();
    } else {
      load(this);
    }
  },
  onShareAppMessage: function () {//分享
    return {
      title:"我的余粮",
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log("失败")
      }
    }
  },
  change_: function (event) {//换米逻辑
    wx.showLoading({
      title: '加载中',
    })
    let id=event.currentTarget.dataset.id;
    let that=this;
    wx.request({
      url: app.globalData.apiBase +"index.php/app/infodisplay.html",
      data: { uid: app.globalData.uid,id:id},//用户id和产品id
      success:function(res){
        let d = JSON.parse(res.data.replace(/^\(|\)$/g, ''));
        wx.hideLoading()
        wx.showModal({
          title: '',
          content: '确认用' + d['forcharge'] + '斤换取大米' + d['dami']+'斤',
          success: function(res) {
            if(res.confirm){
              confirmEnter(id,that)  
            }
          },
        })
      },
      
    })
  }, 
  increase() {//加米详细
    wx.navigateTo({
      url: '/pages/goodstuff/increase',
    })
  }
})

function confirmEnter(id,self) {//确认换米
  wx.request({
    url: app.globalData.apiBase +"index.php/app/chargedami.html",
    data: { uid: app.globalData.uid, id: id },
    success:function(res){
      let d = res.data.replace(/^\(|\)$/g, '');
      if (d==1){
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000, 
          success: function () {
            self.onLoad()
          }
        })
      }      
    }
  })  
}
function load(self){//加载数据
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: app.globalData.apiBase +"index.php/weixin/myfood.html",
    data: { trd_session: app.globalData.trd_session },
    success: function (res) {
      wx.hideLoading();
      // console.log(app.globalData)
      if (res.data) {
        let d = JSON.parse(res.data.replace(/^\(|\)$/g, ''));
        self.setData({ lists: d });
      }
      wx.stopPullDownRefresh()//停止刷新
    },
    fail: function () {
      wx.hideLoading();
    }
  })
}
