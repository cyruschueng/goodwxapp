// pages/collection/collection.js
Page({
  data: {
    cancelCurrent:'999999',
    isShow:'0',
    textTitle1:'为您推荐',
    isNull:'0',  
  },
  onLoad: function () {
    //请求所有收藏
    var that = this;
    wx.request({
      url: 'https://xcx.bjletusq.com/index.php/home/user/getCollect',    
      data: {user_id:getApp().globalData.userid},
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: 'POST',
      success: function(res) {
        console.log(res)
        wx.request({
          url: 'https://xcx.bjletusq.com/index.php/home/product/index',
          method: 'POST',
          data: { admin_user_id: getApp().globalData.shopId },
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          //判断是否收藏为空
          success: function (res1) {
            if (res.data.length == 0) {
              that.setData({
                isNull: '1',
                childItem: res1.data,
              })
            }else{
              that.setData({
                detail: res.data,
                childItem: res1.data,
              })
            }
          },
        })
      },

    })
  },
  //删除收藏
  cancel:function(e){
    this.setData({
      isShow:'1',
      cancelIndex:e.currentTarget.dataset.index,
      cancelId: e.currentTarget.dataset.id
    })
  },
  //确认删除收藏
  sureCancel:function(){
    var that = this;
    var index = that.data.cancelIndex;
    var details = that.data.detail;
    var coDetail = [];
    wx.request({
      url: 'https://xcx.bjletusq.com/index.php/home/user/cancelCollect',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: { goods_id: that.data.cancelId, user_id: getApp().globalData.userid },
      method: 'POST',
      success: function (res) {
        //code为1 表示删除成功
        if(res.data.code=='1'){
          details.forEach(function (val, ind) {
            if (ind == index) {
              return false;
            }
            coDetail.push(val);
          })
          that.setData({
            detail: coDetail,
            isShow: '0',
          })
          if (coDetail.length == 0) {
            that.setData({
              isNull: '1',
            })
          }
        }
      },
    }) 
  },
  //收藏跳转查看商品详情
  todetail:function(e){
    wx.navigateTo({
      url: '/pages/detail/detail?id='+e.currentTarget.dataset.id,
    })
  },
  //取消删除收藏
  close:function(){
    this.setData({
      isShow:'0'
    })
  }
})