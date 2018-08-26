var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    array:[],
    arrayid:[],
    tit:'请选择',
    sid:'',
    ftype:1
  },
  changetype: function(e){
    this.setData({
      ftype:e.currentTarget.dataset.id
    })
  },
  submit: function(e){
    wx.showToast({
      title: '提交中...',
      icon:'loading',
      duration:5000
    })
    var that = this
    if (e.detail.value.name == ''){
      wx.showToast({
        title: '请填写真实姓名',
        image: '/images/60.png',
        duration: 800
      })
    } else if (e.detail.value.phone == '') {
      wx.showToast({
        title: '请填写手机号',
        image: '/images/60.png',
        duration: 800
      })
    }else{
      wx.request({
        url: app.globalData.IP + 'wx/psyadd.do',
        data: {
          name: e.detail.value.name,
          phone: e.detail.value.phone,
          sid: wx.getStorageSync("school"),
          userid: app.globalData.ID,
          type:that.data.ftype
        },
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res){
          wx.hideToast();
          wx.navigateBack({
            delta:1
          })
        }
      })
    }
    
  },
  showPho: function(e){
    wx.previewImage({
      urls: [e.currentTarget.dataset.url],
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.getWindow(this);
    var sn = '无';
    if (wx.getStorageSync("schoolname")!=null){
      sn = wx.getStorageSync("schoolname");
    }
    this.setData({
      sid:app.globalData.sid,
      tit:sn,
      array:wx.getStorageSync("wsc"),
      arrayid: wx.getStorageSync("wscid")
    })

  },
  bindPickerChange: function (e) {
    var that = this;
    this.setData({
      tit: that.data.array[e.detail.value],
      sid: that.data.arrayid[e.detail.value]
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


})