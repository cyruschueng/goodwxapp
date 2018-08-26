// pages/circle/cricle.js
var app = getApp();
var pageshow = 1;
var requestShopList = function (ele,obj) {
  wx.request({
    url: app.globalData.url + '/user/user/getDynamicList',
    data: {
      user_id: app.globalData.user_id,
      page: obj==1?1:pageshow,
      size: 10
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      console.log(res);
      if (res.data.data.length <= 0) {
        ele.setData({
          msgtext: false,
        })
      } else {
        var resdata = res.data.data.data;
        var qwqlist = ele.data.reqdata;
        for (var i = 0; i < resdata.length;i++){
          qwqlist.push(resdata[i]);
          ele.setData({
              reqdata: qwqlist,
              msgtext: true
          });
        }
        ele.setData({
          spage:obj
        })
        pageshow++;
      }
    }
  })
}
Page({
  data: {
    reqdata: [],
    msgtext:true,
    spage:1,
    hiddenfunction: true,//
  },
  onLoad: function (){
      this.setData({
        avatarUrl: app.globalData.userinfo.avatarUrl,
        nickName: app.globalData.userinfo.nickName,
        position: app.globalData.position
      })
      requestShopList(this);
      if (app.globalData.development_mode > 0) {
        this.setData({
          hiddenfunction: false
        })
      };
      
  },
  onShow:function(){
    requestShopList(this,1);
  },
  //下拉加载
  onPullDownRefresh: function () {
      requestShopList(this,1);
      setTimeout(function () {
        wx.stopPullDownRefresh();
        wx.showToast({
          title: '更新成功',
          icon: 'success',
          duration: 1000
        })
      }, 500)
  },
  onReachBottom: function (){
      requestShopList(this,2);
  },
  issuestate:function(){
    wx.navigateTo({
      url: "/pages/circle/issuestate/issuestate"
    })
  },
  previewImage: function (e) {
    var itemimgarr = e.currentTarget.dataset.src;
    var current = e.currentTarget.dataset.src;
    var imgarr = [];
    for (var i = 0; i < itemimgarr.length; i++) {
      imgarr.push(itemimgarr[i]);
    }
    wx.previewImage({
      current: current,
      urls: imgarr
    })
  }
})