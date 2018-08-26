// pages/me/children/tickets/tickets.js
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabTitles:['全场优惠券','店铺优惠券'],
    centents:[
      { isHaveData: true },
      { isHaveData: false },
      ],
    currentTab:0,
    screenHeight:''
  },

  //选项卡点击  
  tabAction(e){
     that.setData({
       currentTab: e.target.dataset.index
     })
  },
  //滑动
  switchTabContent(e){
     that.setData({
       currentTab: e.detail.current
     })
  },
  //使用
  useBtnAction(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     that=this;
     //系统信息
     wx.getSystemInfo({
       success: function (res) {
         var clientHeight = res.windowHeight,
           clientWidth = res.windowWidth,
           rpxR = 750 / clientWidth;
         that.setData({
           screenHeight: clientHeight * rpxR - 90,
         })
       },
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  }
})