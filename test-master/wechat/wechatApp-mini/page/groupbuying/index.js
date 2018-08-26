var app = getApp();
Page({
  data: {
    groupPurchaseList:'',
    imgUrls: [
      'https://lingju360.com/miniapp/resources/images/groupBuying/group-buying-banner.png'
    ]
  },

  onLoad(){
    wx.setNavigationBarTitle({
      title: '团购套餐',
    })
  },

  onShow () {
    app.commonAjax('/miniapp/cat/groupPurchase/list', ['shopId'], {}, (res) => {

      if (res.data.code == 0) {

        if (res.data.data.lenght == 0){
          wx.showToast({
            title: '暂无团购活动',
            image: '/image/i/x.png',
            duration: 2000
          })
        }

        this.setData({
          groupPurchaseList:res.data.data
        })

      } else {
        wx.showToast({
          title: res.data.message,
          image: '/image/i/x.png',
          duration: 2000
        })
      }

    }, app.globalData, 'post')
  },

  //跳转到活动详情
  toGroupdetail(e){

    console.log(e.currentTarget.dataset.id)

    wx.navigateTo({
      url: '/page/groupbuying/groupdetail/index?id=' + e.currentTarget.dataset.id,
    })

  }

})