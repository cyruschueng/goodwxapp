Page({
  data:{},
  navToCompany:function(){
    wx.navigateTo({
      url: '/pages/own/about/company/company'
    })
  },
  navToBanben:function(){
    wx.navigateTo({
      url: '/pages/own/about/banben/banben'
    })
  }
})