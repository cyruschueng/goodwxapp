var app = getApp()
Page({
  data: {
    toShow: 'A',
    li: [],
    list: []
  },
  bindInput:function(e){
    var that = this
    var l = []
    console.log(e.detail.value)
    for(var i=0;i<that.data.li.length;i++){
      if(that.data.li[i].name.indexOf(e.detail.value) != -1){
        l.push(that.data.li[i])
      }
    }
    this.setData({list:l})
    if(e.detail.value == ''){
      this.setData({list:that.data.li})
    }
  },
  onLoad: function (options) {
    var that = this
    var lit = []
    wx.request({
      url: app.api + 'me/getMbook',
      data: {
        uid: wx.getStorageSync('userInfo').id,
      },
      method: 'post',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({ list: res.data.data ,li:res.data.data})
      }
    })
    console.log(lit)

    console.log(this.data.wxSortPickerData)
  },
  phonecall: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.mobile,
    })
  },
  delphone: function (e) {
    console.log(e.currentTarget.dataset.id+':'+e.currentTarget.dataset.uid)
    wx.showModal({
      title: '提示',
      content: '确定要删除吗',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.api + 'me/delMBook',
            data: {
              id:e.currentTarget.dataset.id,
            },
            method: 'post',
            header: {
              'content-type': 'application/json'
            }, 
            success: function(res){
              wx.redirectTo({
                url: '/pages/own/friends/friends',
                success: function(res){
                  // success
                },
                fail: function(res) {
                  // fail
                },
                complete: function(res) {
                  // complete
                }
              })
            },
            fail: function(res) {
              // fail
            },
            complete: function(res) {
              // complete
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})