var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    head:'',
    name:'',
    value:'选择学校，进入蜗居',
    slist:[],
    school:[],
    flag:-1,
    index:0
  },
  bindPickerChange: function(e){
    var that = this;
    this.setData({
      value:that.data.slist[e.detail.value],
      flag: e.detail.value,
      index:e.detail.value
    })
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];

    prevPage.setData({
      loads:true
    });
    wx.setStorageSync('school', that.data.school[e.detail.value].id)
    wx.navigateBack({
      delta:1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
        if (!wx.showLoading){
          wx.showModal({
            title: '提示',
            content: '您的微信版本过低，请升级微信版本',
          })
        } else {
          wx.setStorageSync('ho', '1');
          wx.showLoading({
            title: '加载中...',
            mask: true
          })
          var that = this;
          app.getWindow(this);
          app.login(options.pid, function (res) {
            that.setData({
              name: res.nickName,
              head: res.avatarUrl
            })
            wx.request({
              url: app.globalData.IP + "wx/slistajax.do",
              success: function (res) {
                wx.hideLoading();
                var temp = []
                for (var i = 0; i < res.data.length; i++) {
                  temp.push(res.data[i].name)
                }
                that.setData({
                  school: res.data,
                  index: 0,
                  slist: temp,
                })
              }, fail: function () {
                wx.showModal({
                  title: '抱歉',
                  content: '服务器被外星人攻击了，给您造成不便请谅解',
                  confirmText: '朕知道了',
                  confirmColor: '#06c1ae',
                  showCancel: false
                })
              }
            })
          });
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

})