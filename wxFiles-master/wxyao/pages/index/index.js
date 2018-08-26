var app = getApp()
Page({
  data: {
    innerHeight: 0,
    innerWidth: 0,
    hidden: true,
    model: '',
    isScroll:true,
    animationData: {},
    toast:'',
  },
  bindModel: function (e) {
    if(e.target.dataset.model == 'cancel'){
      this.setData({isScroll:true})
    }else if(e.target.dataset.model == 'confirm'){
      this.setData({isScroll:true})
    }
    this.setData({ model: e.target.dataset.model })
  },
  bindToast:function (e){
    this.setData({ toast: e.target.dataset.toast })
    var that = this
    setTimeout(function(){
      that.setData({ toast: '' })
    },4000)
  },
  onLoad: function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          innerHeight: res.windowHeight,
          innerWidth: res.windowWidth
        })
        console.log(res)
      }
    })
  },
  navToEditPanel: function () {
    wx.navigateTo({
      url: '/pages/editPanel/editPanel'
    })
  }
})
