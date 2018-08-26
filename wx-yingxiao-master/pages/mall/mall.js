Page({
  onLoad: function (options) {
    var that = this;
    if(getApp().globalData.userphone!=null){
      that.setData({
        tobindphone:'0'
      })
    }
    //请求推荐列表
    wx.request({
      url: 'https://xcx.bjletusq.com/index.php/home/product/index',
      method: 'POST',
      data: { admin_user_id: getApp().globalData.shopId },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        that.setData({
          childItem: res.data,
        })
      },     
    })
    //请求分类列表
    wx.request({
      url: 'https://xcx.bjletusq.com/index.php/home/common/getCat',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: { admin_user_id: getApp().globalData.shopId },
      success: function (res) {
        var nav = [];
        res.data.forEach(function (val, index) {
          if (index <= '2') {
            nav[index] = val;
          }
        })
        that.setData({
          mallMenu: nav,
        })
      },
    })
    //请求活动列表
    wx.request({
      url: 'https://xcx.bjletusq.com/index.php/home/common/indexActivity',
      data: { admin_user_id: getApp().globalData.shopId },
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },      
      success: function(res) {
        res.data.forEach(function(val,index){
          if(val.is_distribution=='1'){
            val.tip = '/pages/source/images/distribution.png'
          }else{
            val.tip = '/pages/source/images/group.png'
          }
        })
        if(res.data.length=='0'){
          that.setData({
            push:'null'
          })
        }else{
          that.setData({
            vipContent: res.data,
          })
        }

      },
    })
    //请求轮播图
    wx.request({
      url: 'https://xcx.bjletusq.com/index.php/home/product/swiper',
      method: 'POST',
      data: {banner_type:'2', admin_user_id: getApp().globalData.shopId },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        console.log(res.data)
        that.setData({
          swiperItem: res.data,
        })
      },
    })
  },
  onShow:function(){
    var that = this;

    if (getApp().globalData.userphone!= null) {
      that.setData({
        tobindphone: '0'
      })
    }
  },
  toSell:function(e){
    // console.log(e.currentTarget.dataset.cat);
    var cat = e.currentTarget.dataset.cat;
    if (cat =='1'){
      wx.navigateTo({
        url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id ,
      })
    }else{
        wx.navigateTo({
          url: '/pages/group/group?id=' + e.currentTarget.dataset.id,
        })
    }
  },
  tocatlist:function(e){
    wx.navigateTo({
      url: '/pages/catlist/catlist?cat='+e.currentTarget.dataset.index,
    })
  },
  toDetail:function(e){
    wx.navigateTo({
      url: '/pages/detail/detail?id='+e.currentTarget.dataset.id ,
    })
  },
  //绑定手机
  bindphone: function () {
    wx.navigateTo({
      url: '/pages/bindphone/bindphone',
    })
  },
  onShareAppMessage:function(){}
})