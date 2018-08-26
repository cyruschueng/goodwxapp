Page({
  data:{
    success:{
      msg:'',
      icon:'success'
      
    },
  },
  onLoad:function(options){
    this.setData({
      'success.msg':options.msg,
    })
  },
  navigateBack: function() {
    wx.switchTab({
      url: '../indexcb/indexcb'
    })
  }
})