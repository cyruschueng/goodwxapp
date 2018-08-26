var app = getApp();
Page({
  data:{
    uid:0,
    list:[],
    benid:wx.getStorageSync('userInfo').id
  },
  onLoad:function(options){
    var that = this
    wx.request({
      url: app.api + 'act/' + options.aid,
      data: {},
      method: 'get',
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function (res) {
        console.log("------meact");
        console.log(res)
        that.setData({
          uid: res.data.data.uid
        });
      }
    })
    wx.request({
      url: app.api + 'act/commentAll',
      data: {
        id:options.aid,
        uid:that.data.uid
      },
      method: 'post',
      header: {
        'content-type': 'application/json'
      },
      success: function(res){
        console.log("----sc")
        console.log(res)
        for(var i=0;i<res.data.data.list.length;i++){
          res.data.data.list[i].content = res.data.data.list[i].content.split('|')
        }
        console.log(res.data)
        that.setData({list:res.data.data.list})
      },
      fail: function(res) {
      },
      complete: function(res) {
      }
    })
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
  }
})