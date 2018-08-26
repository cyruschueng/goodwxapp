// pages/userList/userList.js
let app = getApp();
let PATH = app.globalData.PATH;


let IMG_PATH = app.globalData.IMG_PATH;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    IMG_PATH: IMG_PATH,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options);
    wx.request({
      url: PATH + '/resource-service/share/getActUser',
      method: 'GET',
      header: {
        'Access-Token': app.globalData.accessToken,
      },
      data: {
        userId: app.globalData.userId,
        id: options.id
      },
      //post success
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200 && res.data.status == 200) {
          that.setData({
            userList: res.data.result.actUserList
          })
        } else {
          tipModal(res.data.message);
        }
      }
    })
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
  goToShareList: function (e) {
    let id = e.currentTarget.dataset.id
    let that = this;
    wx.navigateTo({
      url: '../shareHistory/shareHistory?id=' + id
    });
  }
})

function tipModal(tip) {
  wx.showToast({
    title: tip,
    icon: 'loading',
    duration: 1500
  })
}