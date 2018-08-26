var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate:'开始时间',
    endDate: '结束时间',
    sdate:'2017-07-01',
    edate:'2017-07-01',
    value:'—— ——',
    zong:'--',
    ok:'--',
    on:'--'
  },
  navToMysend: function (){
    wx.redirectTo({
      url: '/pages/send/qiang/qiang',
    })
  },
  bindDateChange: function (e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startDate: e.detail.value,
      sdate: e.detail.value,
    })
    this.load();
  },
  bindeDateChange: function (e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value,
      edate: e.detail.value
    })
    this.load();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  load: function () {
    var that = this;
    wx.request({
      url: app.globalData.IP + 'wx/psyfinshorder.do?plid=' + wx.getStorageSync("appid") + '&st=' + that.data.sdate + '&et=' + that.data.edate,
      method: 'post',
      success: function (res) {
        var temp1 = 0;
        var temp2 = 0;
        for(var i=0;i<res.data.length;i++){
          if(res.data[i].paystatus == '3'){
            temp1 ++
          }else{
            temp2 ++ 
          }
        }
        that.setData({
          zong:temp1+temp2,
          ok:temp1,
          on:temp2
        })
      }
    })
  },
  onLoad: function (options) {
    var that = this;
    this.load();
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

})