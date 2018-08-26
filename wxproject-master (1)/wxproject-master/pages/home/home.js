// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: [{
      url: '../../images/img1.jpg',
      title: '动听的音乐就像是飞舞的蝴蝶在空中翩翩起舞...',
      id: 4
    },
    {
      url: '../../images/img2.jpg',
      title: '歌声余音绕梁，三日不绝，细细听来，一种深沉却...',
      id: 5
    },
    {
      url: '../../images/img3.jpg',
      title: '最初的时候，我很偏执，我的世界里除了摇滚就...',
      id: 27
    },
    {
      url: '../../images/img4.jpg',
      title: '在上班的烦躁中爱上了钢琴的清澈甜美，优美的....',
      id: 16
    }],
    newList: [],
    ischecked: true
    
  },
  more() {
    this.setData({
      ischecked: false
    })
    wx.switchTab({
      url: '../yueku/yueku',
    })
  },
  // 页面刷新
  // refesh: function (e) {
  //   var that = this;
  //   that.setData({
  //     hasRefesh: true,
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    wx.request({
      url: "https://route.showapi.com/213-4?showapi_appid=53050&showapi_sign=3efebeba00b94897be10e80c7dc6fe5e&topid=3",
      success(res) {
        console.log(res.data);
        var list = res.data.showapi_res_body.pagebean.songlist;
        var newlist = list.slice(50, 65);
        for (var i = 0; i < newlist.length; i++) {
          newlist[i].id = 3
        }
        that.setData({
          newList: newlist
        })
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
    this.setData({
      ischecked: true
    })
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