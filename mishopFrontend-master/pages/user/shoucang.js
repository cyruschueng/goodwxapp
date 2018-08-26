var app = getApp();
// pages/user/shoucang.js
Page({
  data: {
    page: 1,
    productData: [],
  },
  onLoad: function (options) {
    //this.loadProductData();
  },
  onShow: function () {
    // 页面显示
    this.loadProductData();
  },
  /**
   * 收藏列表
   */
  loadProductData: function () {
    var that = this;
    console.log(this.data);
    wx.request({
      url: app.d.hostUrl + '/api/product/collectlist',
      method: 'post',
      data: {
        uid: app.d.userId,
        // pageindex: that.data.page,
        // pagesize:100,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //console.log(res);
        //--init data
        var data = res.data;

        that.setData({
          //productData: that.data.productData.concat(data), //这个是合并数组 但是返回时 读取页面会多一层产品
          productData: data,
        });
        //endInitData
      },
    });
  },
  /**
   * 取消收藏
   */
  removeFavorites: function (e) {
    var pid = e.currentTarget.dataset.favId;

    var that = this;


    wx.showModal({
      title: '提示',
      content: '你确认移除吗',
      success: function (res) {
        res.confirm && wx.request({
          url: app.d.ceshiUrl + '/Api/Product/col',
          method: 'post',
          data: {
            uid: app.d.userId,
            pid: pid,
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            // //--init data        
            var data = res.data;
            if (data.status == 1) {
              wx.showToast({
                title: '操作成功！',
                duration: 2000
              });
              that.loadProductData();
            } else {
              wx.showToast({
                title: data.err,
                duration: 2000
              });
            }
          },
          fail: function () {
            // fail
            wx.showToast({
              title: '网络异常！',
              duration: 2000
            });
          }
        });
      }
    });



  },
  /**
   * 格式化输出图片地址和价格
   * 但这部分现在移交到服务器处理了
   */
  initProductData: function (data) {
    for (var i = 0; i < data.length; i++) {
      //console.log(data[i]);
      var item = data[i];

      item.Price = item.Price / 100;
      item.ImgUrl = app.d.hostImg + item.ImgUrl;

    }
  },
});