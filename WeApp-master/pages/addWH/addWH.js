
const URL = "https://xcx.toupaiyule.com";
var app = getApp();

Page({
  data:{
    newWH_name: '',
    exists: false,
    possible: [],
    hasChecked: false
  },
  newWHName: function(e){
    this.setData({
     newWH_name: e.detail.value
    });
  },
  checkExists:function(e){
    var that=this;
    if (this.data.newWH_name.length == 0) {
      wx.showToast({
        title: '请先输入网红名',
        icon: 'success',
        duration: 2000
      });
    }else{
      // that.check(function (data, num) {
      //   that.setData({
      //     numWH: num,
      //     whsList: data
      //   });
      // });
      wx.request({
        url: URL+'/wanghong/checkExists/' + this.data.newWH_name,
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if(res.data.exists){
              that.setData({
                hasChecked: true,
                exists: true,
                possible: res.data.data
              });
          }else{
            that.setData({
              hasChecked: true,
              exists: false
            });
          }
        }
      });
    }
  },
  cancel : function (e) {
    wx.navigateTo({
      url: '../addWH/addWH'
    });
  },
  create: function(e){
    wx.navigateTo({
      url: '../whinfo/whinfo'
    });
  }
})