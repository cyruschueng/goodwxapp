// pages/myCenter/cash/cashRecord/cashRecord.js
const app = getApp();
var pages = 1;
Page({
  data: {
      Recordlist:[],
      msgtext:true,
  },
  onLoad: function (options) {
      pages=1;
      this.refreshRecord(pages);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
      pages=1;
      this.refreshRecord(pages,true);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    pages++;
    this.refreshRecord(pages);
  },
  //记录请求刷新
  refreshRecord:function(page,msg){
    console.log(page)
     var that = this;
    wx.request({
      url: app.globalData.url + '/cash/cashapply/myApplyRecord',
      method: 'get',
      data: {
          user_id: app.globalData.user_id,
          page: page,
          size:10
       },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        if (res.data.errcode==0){
            if (msg == true) {
              setTimeout(function () {
                that.showmsgtext("刷新成功");
                wx.stopPullDownRefresh();
              }, 1000)
            }
            if (res.data.data.length==0){
              that.setData({
                msgtext: false,
              })
            }else{
              var data = res.data.data.arr;
              var dataarr = [];
              for (var i = 0; i < data.length; i++) {
                dataarr.push(data[i])
                that.setData({
                    Recordlist: dataarr,
                })
              }
              that.setData({
                msgtext: true,
              })
            }
        }else{
            that.showmsgtext("网络错误");
        }
      }
    })
  },
  showmsgtext:function(e){
    wx.showToast({
      title: e,
      icon: 'success',
      duration: 1000
    })
  }
})