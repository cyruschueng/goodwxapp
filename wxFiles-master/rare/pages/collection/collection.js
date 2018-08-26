var app = getApp()
Page({
  data: {
    list:[],
    so:[],
    showdel:false
  },
  delcol: function (e) {
    var buy = []
    buy.push(e.currentTarget.dataset.id)
    wx.showModal({
      title: '提示',
      content: '确定删除？',
      success: function (res) {
        if(res.confirm){
          wx.request({
            url: app.url + 'WxUserMsgL/updatedel?ids='+buy,
            success: function (res) {
              console.log(res)
              if(res.data.code == 100){
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration:800
                })
                wx.redirectTo({
                  url: '/pages/collection/collection',
                })
              }else{
                wx.showToast({
                  title: '删除失败',
                  icon: 'success',
                  image:'/img/60.png',
                  duration: 800
                })
              }
            }
          })
        }
      }
    })
  },
  checked: function (e){
    var so = this.data.so
    so[e.currentTarget.dataset.id] = 1
    this.setData({
      so: so
    })
    this.setData({
      showdel: false
    })
    for(var i =0; i< so.length; i++){
      if(so[i] == 1){
        this.setData({
          showdel: true
        })
      }
    }
  },
  nochecked: function (e) {
    var so = this.data.so
    so[e.currentTarget.dataset.id] = 0
    this.setData({
      so: so
    })
    this.setData({
      showdel: false
    })
    for (var i = 0; i < so.length; i++) {
      if (so[i] == 1) {
        this.setData({
          showdel: true
        })
      }
    }
  },
  onLoad: function (options) {
    var that = this
    app.load(this)
    wx.request({
      url: app.url + 'WxUserMsgL/selectget',
      data:{
        openid: app.globalData.openid
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'post',
      success: function (res) {
        console.log(res)
        if(res.data.length > 0 ){
          var li = res.data;
          var so = []
          for (var i = 0; i < res.data.object.length; i++){
            so.push(0)
          }
          that.setData({
            so: so
          })
        }
        that.setData({
          list: res.data.object
        })
      }
    })
  }, 
  navToGoods: function (e) {
    wx.navigateTo({
      url: '/pages/goods/goods?id='+e.currentTarget.dataset.id,
    })
  },
  onReady: function () {
  
  },

  onShow: function () {
  
  },

  onHide: function () {
  
  },

  onUnload: function () {
  
  },

  onPullDownRefresh: function () {
  
  },

  onReachBottom: function () {
  
  },

  onShareAppMessage: function () {
  
  },

  onReachBottom: function () {
  
  },

  onPullDownRefresh: function () {
  
  }
})