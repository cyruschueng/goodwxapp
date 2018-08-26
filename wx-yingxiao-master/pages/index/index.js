//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    loading:'1',
  },
  onLoad:function(){
    var that = this;
    //加载接口数据,渲染
    setTimeout(function(){
      //请求首页图片数据
      wx.request({
        url: 'https://xcx.bjletusq.com/index.php/home/common/indexRecommend',
        method: 'POST',
        data: { admin_user_id: getApp().globalData.shopId },
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        success: function (res) {
          console.log(res)
          that.setData({
            kind: res.data,
            loading: '0',
          })
          //请求轮播图数据
          wx.request({
            url: 'https://xcx.bjletusq.com/index.php/home/product/swiper',
            method: 'POST',
            data: {banner_type:'1', admin_user_id: getApp().globalData.shopId },
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            success: function (res) {
              that.setData({
                swiperItem: res.data,
              })
            },
          })
        },
      })
  },1500)

  },
  // onShow:function(){
  //   var that = this;
  //   wx.request({
  //     url: 'https://xcx.bjletusq.com/index.php/home/product/swiper',
  //     method: 'POST',
  //     data: { admin_user_id: getApp().globalData.shopId },
  //     header: { "Content-Type": "application/x-www-form-urlencoded" },
  //     success: function (res) {
  //       console.log(res.data)
  //       that.setData({
  //         swiperItem: res.data,
  //       })
  //     },
  //   })
  //   wx.request({
  //     url: 'https://xcx.bjletusq.com/index.php/home/common/indexRecommend',
  //     method: 'POST',
  //     data: { admin_user_id: getApp().globalData.shopId },
  //     header: { "Content-Type": "application/x-www-form-urlencoded" },
  //     success: function (res) {
  //       setTimeout(function () {
  //         that.setData({
  //           kind: res.data,
  //           loading: '0',
  //         })
  //       }, 5000)
  //     },
  //   })
  // },

  //获取首页数据,点击查看预览图片(微信API)
  toUrl:function(e){
    console.log(e.currentTarget.dataset.id)
    var that = this;
    wx.request({
      url: 'https://xcx.bjletusq.com/index.php/home/common/indexRecommendInfo',
      method: 'POST',
      data: { id: e.currentTarget.dataset.id },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: res => {
        console.log(res)
        var imgs = [];
        imgs[0] = e.currentTarget.dataset.cover;
        if(res.data.length!=0){
          res.data.forEach(function (val) {
            imgs.push(val.sample_img)
          })
        } 
        wx.previewImage({
          urls: imgs,
        })
      },
    })  
  },
  onShareAppMessage:function(){}
})
