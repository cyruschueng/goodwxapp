// pages/dx/dx.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
  */
     data:{
      levelInfo:{
          a:'恭喜您毕业进入下一轮，朝博士大奖前进吧',
          b:'恭喜您毕业进入下一轮，朝博士大奖前进吧',
          c:'恭喜您毕业进入下一轮，朝博士大奖前进吧',
          d:'恭喜您毕业进入下一轮，朝博士大奖前进吧',
          e:'恭喜您毕业进入下一轮，朝博士大奖前进吧'
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        this.setData({
          userInfo: app.globalData.userInfo
        })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    app.fetchData({
      func:'user.get_user_level'
    }).then(data=>{
        data.bonus = (data.bonus / 100 || 0).toFixed(2);
        this.setData({
          info:data
        })
        console.log('dx---------->',data);
    });
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

  },
  toIndex:function(){
    app.toPage('index');
  }
})
