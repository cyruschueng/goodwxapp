var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    List : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.setNavigationBarTitle({
      title: '称重列表'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.weightList()
  },

  query(e){
    this.weightList(e.detail.value)
  },

  weightList(deskNo){
    
    var subdata = {}

    if (deskNo){
      subdata.deskNo = deskNo
    }

    app.commonAjax('/shop/manage/menu/weightList', ['shopId'], subdata, (res) => {

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
          List: res.data.data.rows
        })
      } else {
        wx.showToast({
          title: res.data.message,
          image: '/image/i/x.png',
          duration: 2000
        })
      }

    }, app, 'get')
  }


})