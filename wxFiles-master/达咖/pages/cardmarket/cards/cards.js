var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    loading:false
  },
  changes(e){
    var that = this;
    wx.showModal({
      title: '温馨提示',
      content: '使用前，请与收银人员确认好，以免发生不必要的争执！！是否确认？',
      success:function(res){
        if(res.confirm){
          app.wxRequest('order/wx/usecard.do',{
            id:e.currentTarget.dataset.id
          },function(res){
            if(res == 1){
              wx.showModal({
                title: '提示',
                content: '成功兑换了一杯咖啡！！！请给收银员查看结果！！！',
                showCancel:false,
                success:function (res){

                }
              })
              that.getOrder();
            }else{
              wx.showModal({
                title: '提示',
                content: '兑换失败了！！！',
                showCancel: false,
                success: function (res) {

                }
              })
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getOrder(){
    var that = this;
    this.setData({ loading: true })
    app.wxRequest('order/wx/myorder.do', {
      type: 3,
      userid: wx.getStorageSync("openid"),
      start: 0
    }, function (res) {
      that.setData({
        list: res,
        loading: false
      })
    })
  },
  onLoad: function (options) {
    this.getOrder();
  },

  
})