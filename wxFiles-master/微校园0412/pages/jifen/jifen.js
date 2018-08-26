// pages/jifen/jifen.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jifen:[
      { active: false, label:'*2000积分（可兑换18~88元的现金红包）' },
      { active: false, label:'*3000积分（可兑换28~288元的现金红包）'},
      { active: false, label:'*5000积分（可兑换68~688元的现金红包）'}
    ]
  },
  initJ:function(){
    var jf = this.data.jifen;
    for(var item in jf){
      jf[item].active = false;
    }
    this.setData({
      jifen:jf
    })
  },
  chooseIt: function (e) {
    var jf = this.data.jifen;
    if(jf[e.currentTarget.dataset.index].active){
      jf[e.currentTarget.dataset.index].active = false;
      this.setData({
        jifen:jf
      })
    }else{
      this.initJ();
      jf[e.currentTarget.dataset.index].active = true;
      this.setData({
        jifen: jf
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

   luck:function(){
     wx.request({
       url: app.globalData.IP + 'wx/luck.do',
       data: { id: app.globalData.ID, sid: app.globalData.sid },
       success: function (res) {
         wx.showModal({
           title: '提示',
           content: res.data,
           showCancel: false,
           confirmText: '朕知道了'
         })
       }
     })
   }
})