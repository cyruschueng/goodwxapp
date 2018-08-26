var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [],//地址信息
  },
  //删除地址
  dela: function (e) {
    wx.showModal({
      title: '提示',
      content: '确定删除？',
      success:function(res){
        if(res.confirm){
          wx.request({
            url: app.url + 'WxUserAddress/UpdateDel?addressid=' + e.currentTarget.dataset.id,
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {

              wx.showToast({
                title: res.data.message,
                icon: 'success',
                duration: 800
              });
              setTimeout(function(){
                wx.redirectTo({
                  url: '/pages/address/address',
                })
              },800)
            }
          });
        }
      }
    })
    
  },
  //编辑更新地址
  UpdateAddress: function (e) {
    var that = this,
      Index = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/address/addressAdd/addressAdd?opty=update&sets=' + JSON.stringify(that.data.addressList[Index]),
    });
    console.log(that.data.addressList[Index])
  },
  //添加地址
  navToAddressAdd: function (e) {
    wx.navigateTo({
      url: '/pages/address/addressAdd/addressAdd?opty=insert',
    })
  },
  onLoad: function (options) {
    var that = this
    app.load(that)
  },
  onShow: function () {
    var that = this;
    //获取用户地址信息
    wx.request({
      url: app.url + 'WxUserAddress/select',
      data: {
        openid: app.globalData.openid,
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        that.setData({
          addressList: res.data.rows
        })
      }
    });
  },
})