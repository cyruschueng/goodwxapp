// page/schedule/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     price:"",
     listData:"",
     totalPrices:"",
     location:"",
     amount:"",
     complete:"",
     deskNo:"",
     Id:""


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    this.idleList()
  },

  queryList(e) {
    this.idleList(e.detail.value)
 },
  idleList(deskNo) {
    var subdata = {}
    if (deskNo) {
      subdata.deskNo = deskNo
    }
    app.commonAjax('/shop/manage/schedule/list', ['shopId'], subdata, (res) => {
      if (res.data.code == 0) {

        //没有数据 返回上页
        if (res.data.data.rows.length == 0) {
          wx.showToast({
            title: '暂无数据',
            image: '/image/i/x.png',
            duration: 2000,
            success: () => {
              setTimeout(() => {
                // wx.navigateBack({
                //   delta: 1
                // })
              }, 2000)
            }
          })
        }

        this.setData({
          listData: res.data.data.rows
        })
      } else {
        wx.showToast({
          title: res.data.message,
          image: '/image/i/x.png',
          duration: 2000
        })
      }

    }, app, 'POST')
  },

  desk_detail(e){
    var deskTypeId = e.currentTarget.id
    var deskNo = e.currentTarget.dataset.deskno
    wx.navigateTo({ url: "/page/verifymenu/index?deskTypeId=" + deskTypeId + "&deskNo=" + deskNo  })
  }, 
  changTable(e){
    var deskTypeId = e.currentTarget.id
    wx.navigateTo({ url: "/page/changeTable/index?id="+deskTypeId})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */

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
  onLoad(){
    wx.setNavigationBarTitle({
      title: '餐桌列表'
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})