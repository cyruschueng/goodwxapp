var app = getApp()
Page({
  data:{
    array: ['美国', '中国', '巴西', '日本'],
    index:0,
    numValue: 1,
    payStyle:['微信','支付宝','银联']
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  
  onLoad:function(options){
    this.setData({
      numValue: options.numValue
    })
    app.getDefAddress(this)
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