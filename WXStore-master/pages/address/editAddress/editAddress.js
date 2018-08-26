// pages/address/editAddress/editAddress.js
let app = getApp();
let serverHost = app.globalData.serverHost;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: null,
    region: ['山东省', '济南市', '历下区'],
    //customItem: '全部'
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let address = JSON.parse(options.addressJson);
    console.log(address);
    this.setData({
      address: address,
      region: [
        address.provinceName,
        address.cityName,
        address.countyName]
    });
  },
  formSubmit: function (e) {
    let detailValue = e.detail.value;
    let _this = this;
    console.log('form发生了submit事件，携带数据为：', detailValue)
    wx.request({
      url: serverHost + 'address/' + detailValue.addressId,
      method: "PUT",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        address: JSON.stringify(detailValue),
        region: JSON.stringify(_this.data.region)
      },
      success: function (res) {
        console.log(res.data);
        if (res.statusCode == 200 && res.data == '1') {
          wx.showToast({
            title: '保存成功',
            complete: function () {
              //wx.navigateBack()
            }
          })
        } else {
          wx.showModal({
            title: '发生错误',
            content: res.data,
          })
        }
      },
      fail: function () {
        wx.showModal({
          title: '发生错误',
          content: '保存失败',
        })
      }
    })
  },
  saveAddress: function () {
    let addressId = e.currentTarget.dataset.id;
    wx.request({
      url: serverHost + 'address/',
    })
    wx.navigateBack()
  }
})