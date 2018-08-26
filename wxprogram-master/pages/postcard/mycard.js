const app = getApp()
Page({
  data: {
      selected: [],
      showedit: true,
      confirmdiag: false,
      noalert: false,
      collect: [],
      userInfo: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this
    wx.request({
      url: app.globalData.apiURL + '/memberPostcard/list',
      header: {
        memberId: wx.getStorageSync('memberid'),
        token: wx.getStorageSync('token'),
      },
      success: function (res) {
        //console.log(res.data.result)
        self.setData({
          userInfo: app.globalData.userInfo,
          collect: res.data.result,
        })
      }
    })
    wx.setNavigationBarTitle({
      title: '我的明信片'
    })  
  },
  carddetail: function(e) {
    var fr = e.currentTarget.dataset.fr
    var to = e.currentTarget.dataset.t
    var content = e.currentTarget.dataset.content
    var pic = e.currentTarget.dataset.pic
    var mark = e.currentTarget.dataset.mark
    wx.navigateTo({
      url: 'postcardShare?mark=' + mark + '&fr=' + fr + '&to=' + to + '&content=' + content + '&pic=' + pic
    })
  }
})