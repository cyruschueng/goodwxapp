var app = getApp()
Page({

  data: {
    couponlist:'',
  },

  onLoad (options) {
    wx.setNavigationBarTitle({
      title: '领取优惠券',
    })

    console.log(app.globalData.appid)

  },

  onShow(){
    app.commonAjax('/miniapp/cat/couponInfo/valid', ['memberId','bizId'], { couponType:0}, (res) =>  {
      this.setData({
        couponlist:res.data.data
      })

    }, app.globalData, 'get')
  },
  // 领取优惠券
  getcoupon(e){
       let couponid = e.currentTarget.dataset.id
       let couponindex = e.currentTarget.dataset.index
       let couponlist = this.data.couponlist
       app.commonAjax('/miniapp/cat/couponLink/receive', ['memberId'], { couponId: couponid}, (res) => {

         if(res.data.code == 0){
           wx.showToast({
             title: '领取成功', 
             icon: 'success',
             duration: 2000
           })
           couponlist[couponindex].num--
           couponlist[couponindex].receivedCount++
           if (couponlist[couponindex].receivedCount == couponlist[couponindex].memberMaxNum) {
             couponlist[couponindex].canReceive = false
           }
           this.setData({
             couponlist: couponlist,
           })
         //console.log(this.data.couponlist)
         }
         
       }, app.globalData, 'post')
  }
})