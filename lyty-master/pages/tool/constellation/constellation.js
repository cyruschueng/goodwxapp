// pages/index/index.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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
  showDetail: function(e) {
    var name = e.currentTarget.dataset.name
    console.log(name);
    wx.navigateTo({
      url: '/pages/tool/constellation/constellation-detail/index?name='+name
    })
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: '【星座运势 每日更新】', // 分享标题
      desc: '', // 分享描述
      path: '/pages/tool/constellation/constellation' // 分享路径
    }
  }
})