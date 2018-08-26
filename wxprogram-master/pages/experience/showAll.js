const app = getApp()

Page({
  data: {
    shops: [],
    shoptid: 0,
    currentpage: 2,
    perpage: 20,
    isLoading: false,
    nomore: false,
  },
  onLoad: function (option) {
    const self = this
    wx.request({
      url: app.globalData.apiURL + '/shop/pageByShopTypeId?pageNumber=1&pageSize='+this.data.perpage+'&cityId=' + app.globalData.cityid + '&shopTypeId=' + option.shoptypeid + '&lat=' + wx.getStorageSync('latitude') + '&lon=' + wx.getStorageSync('longitude'),
      success: function (res) {
        self.setData({
          shops: res.data.result.list,
          shoptid: option.shoptypeid
        });
      }
    })
    if (option.shoptext == undefined) {
      wx.setNavigationBarTitle({
        title: '显示全部'
      })
    } else {
      if (option.shoptypeid == 1) {
        wx.setNavigationBarTitle({
          title: option.shoptext
        })
      } else {
        wx.setNavigationBarTitle({
          title: option.shoptext
        })
      }
    }
    
  },
  enterdetail: function (event) {
    wx.navigateTo({
      url: '../detail/viewDetail?id=' + event.currentTarget.id
    })
  },
  onReachBottom: function () {
    this.setData({
      isLoading: true
    })
    var contents = this.data.shops
    var pn = this.data.currentpage
    const self = this
    wx.request({
      url: app.globalData.apiURL + '/shop/pageByShopTypeId?pageNumber=' + pn + '&pageSize=' + this.data.perpage + '&cityId=' + app.globalData.cityid + '&shopTypeId=' + this.data.shoptid + '&lat=' + wx.getStorageSync('latitude') + '&lon=' + wx.getStorageSync('longitude'),
      success: function (res) {
        if (res.data.result.list.length > 0) {
          contents = contents.concat(res.data.result.list)
          pn += 1
        } else {
          self.setData({
            nomore: true
          });
        }
        self.setData({
          shops: contents,
          currentpage: pn,
          isLoading: false
        });
      }
    })
  }
})
