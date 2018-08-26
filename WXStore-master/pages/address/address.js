// pages/address/address.js
let app = getApp();
let serverHost = app.globalData.serverHost;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    from: null,
    addressList: []
  },
  onLoad: function (options) {
    console.log(options);
    if (options.from == "person") {
      wx.setNavigationBarTitle({
        title: "地址管理",
      })
      this.setData({
        from: options.from || null
      })
    }
    //this.getAddressList();
  },
  onShow: function () {
    this.getAddressList();
  },
  onPullDownRefresh: function () {
    this.getAddressList();
  },
  getAddressList: function () {
    let userId = wx.getStorageSync("userid");
    console.log("userid=" + userId);
    let _this = this;
    wx.request({
      url: serverHost + 'address/user/' + userId,
      success: function (res) {
        if (res.statusCode != 200) {
          wx.showToast({
            title: '获取数据失败',
          })
          return;
        }
        _this.setData({
          addressList: res.data
        })
        wx.stopPullDownRefresh();
      },
      fail: function () {
        wx.showToast({
          title: '获取数据失败',
        })
      }
    })
  },
  addressChecked: function (e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let newList = this.data.addressList;
    let address = newList[index];
    console.log(address)
    app.globalData.userAddress = address;
    wx.navigateBack()
  },
  //删除地址
  deleteAddress: function (e) {
    let index = e.currentTarget.dataset.index;
    let newList = this.data.addressList;
    let addressId = e.currentTarget.dataset.id;
    newList.splice(index, 1);
    this.setData({
      addressList: newList
    })
    let _this = this;
    wx.request({
      url: serverHost + 'address/' + addressId,
      method: "DELETE",
      success: function (res) {
        console.log(res)
        if (res.data == '1') {
          wx.showToast({
            title: '删除成功',
          })
        } else {
          wx.showToast({
            title: '删除失败',
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '删除失败',
        })
      }
    })
  },
  //修改地址
  editAddress: function (e) {
    let index = e.currentTarget.dataset.index;
    let address = this.data.addressList[index];
    let str = JSON.stringify(address);
    wx.navigateTo({
      url: 'editAddress/editAddress?addressJson=' + str,
    })
  }
})