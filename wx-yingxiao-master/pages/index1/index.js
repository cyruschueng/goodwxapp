//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    bannerImg:['/pages/source/images/bannerImg.png'],
    childItem: [],
    isloading:'1',
    menu:[
      { imageSrc: '/pages/source/images/menu01.png', title: '孕妈摄影', id: '11' },
      { imageSrc: '/pages/source/images/menu02.png', title: '新生儿摄影', id: '12'},
      { imageSrc: '/pages/source/images/menu03.png', title: '儿童摄影', id: '14'},
      { imageSrc: '/pages/source/images/menu04.png', title: '更多', id: '13'}     
    ],
    textTitle1:'商品推荐',
  },
  onLoad: function () {
    var that = this;
    // 商品组
    wx.request({
      url: 'https://xcx.bjletusq.com/index.php/home/product/index',
      method: 'POST',
      data: { admin_user_id: getApp().globalData.shopId },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        setTimeout(function () {
          that.setData({
            ishidden: '1',
            isloading: '0',
            childItem: res.data,
          })
        }, 800)
      },
    })
    // 轮播图,图片组
    wx.request({
      url: 'https://xcx.bjletusq.com/index.php/home/product/swiper',
      method: 'POST',
      data: { admin_user_id: getApp().globalData.shopId  },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        // res.data.splice(0,2);
        var imgboxLength = (1 / res.data.length).toFixed(2)*100+'%';
        console.log(imgboxLength)
        setTimeout(function () {
          that.setData({
            ishidden: '1',
            isloading: '0',
            swiperItem: res.data,
            imgboxLength:imgboxLength,
          })
        }, 800)
      },
    })
  },
  //事件处理函数
  toUrl: function (e) {
    // console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id
    })
  },
  toggle:function(e){
    var index = e.currentTarget.dataset.index;
    if(index==1){
      wx.navigateTo({
        url: '../paycar/paycar',
      })
    }else if(index==2){
      wx.navigateTo({
        url: '../mine/mine',
      })
    }
  },
  todetail:function(e){
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + this.data.childItem[index].id,
    })
  },
})
