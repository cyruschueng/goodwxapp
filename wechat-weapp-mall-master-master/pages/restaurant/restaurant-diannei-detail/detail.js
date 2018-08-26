var con = require('../../../utils/api');
var app = getApp();
Page({
  data: {
    dishid: '',
    glo_is_load: true,
    goods: [],
    id: [1,2,3,4],
    pingjia: '',
    count: 0,
    chose: '',
    cid: ''
  },

  bindbtn:function(e){
    var that = this;
    var len = e.currentTarget.dataset.id;
    that.setData({
      chose: len  
    });
    wx.redirectTo({
      url: '../../restaurant/restaurant-detail-eva/eva?id='+len+ '&dishid='+that.data.dishid,
    });
     
  },
  onLoad:function(options){
    var that = this;
    var opt = options.id;
    // console.log(options);
    that.setData({
      dishid: opt,
      cid: options.cid
    });
    that.onShow();
  },
  onShow:function(){
    var that = this;
    wx.request({
      url: con.getdishbyid_detail,
      method: "GET",
      data: {
        wxappid: con.wxappid,
        id: that.data.dishid
      },
      header: {
        'content-type': 'application/json'
      },
      success:function(res){
       that.setData({
         goods: res.data.info,
         glo_is_load: false
       })
        
      },
      
    })

    
    wx.request({
      url: con.pingjia_list,
      method: "GET",
      data: {
        wxappid: con.wxappid,
        dishid: that.data.dishid,
        levelid: that.data.chose,
        cid: that.data.cid
      },
      header: {
        'content-type': 'application/json'
      },
      success:function(res){
        // console.log(res);
        that.setData({
          count: res.data.info.count_all,
          level: res.data.info,
          pingjia: res.data.info.pingjia_list
        });
      }
    })

  },
  onPullDownRefresh: function () {
    var that = this;
    that.onShow();
    wx.showNavigationBarLoading() //在标题栏中显示加载
    setTimeout(() => {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh();
    }, 1000);
  }

})