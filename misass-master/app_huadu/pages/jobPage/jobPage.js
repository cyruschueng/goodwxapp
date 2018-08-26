// pages/jobPage/jobPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    interestList: [],
    status: null,
    recordIndividual:'0',
    recordCompany:'0'
  },

  //跳转到招聘详情
  toWorkInfo: function (e) {
    if(getApp().globalData.status == 0) {
      var workid = e.currentTarget.dataset.itemIndex;
      wx.navigateTo({
        url: '../workInfo/workInfo?workid=' + workid,
      })
    } else if (getApp().globalData.status == 1) {
      var jobid = e.currentTarget.dataset.itemIndex;
      wx.navigateTo({
        url: '../workInfo/workInfo?jobid=' + jobid,
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      status: getApp().globalData.status
    });

    if(getApp().globalData.status == 1) {
      wx.request({
        url: 'https://xcx.misass.com/huadu/index.php?s=/api/hiring/hiring_fine', //加姓名、性别 字段 招聘版
        method: 'POSt',
        data: {
          cid: options.cid,
          wecha_id: getApp().globalData.wecha_id
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: res => {
          console.log(res)
          this.setData({
            interestList: res.data.hiring,
            recordIndividual: res.data.count,
            recordCompany: res.data.count,
          })
        }
      })
    } else if (getApp().globalData.status == 0) {
      wx.request({
        url: 'https://xcx.misass.com/huadu/index.php?s=/api/release/release_fine', //加个 招聘企业 的字段 个人版
        method: 'POST',
        data: {
          cid: options.cid,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: res => {
          //console.log(res)
          this.setData({
            interestList: res.data.hiring,
            recordIndividual: res.data.count,
            recordCompany: res.data.count,
          })
        }
      })
    }

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})