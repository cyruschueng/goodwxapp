//index.js
const app = getApp()
const apiurl = 'https://pet.zealcdn.cn/index.php';
let sign = wx.getStorageSync('sign');
import tips from '../../utils/tips.js'
Page({
  data: {
    share:false, //分享好友
    bargain:false,
    finish: false
  },
  //事件处理函数
  onLoad: function (option) {
    console.log("option:", option);
    this.setData({
      bargain_id: option.bargain_id
    })
  },
  onShow: function () {
    let that = this;
    app.getAuth(function () {
      let userInfo = wx.getStorageSync('userInfo');
      let sign = wx.getStorageSync('sign');
      console.log(apiurl + "bargain/bargain-detail?sign=" + sign + '&operator_id=' + app.data.kid)
      // 详情
      wx.request({
        url: apiurl + "bargain/bargain-detail?sign=" + sign + '&operator_id=' + app.data.kid,
        data: {
          bargain_id: that.data.bargain_id
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("砍价详情", res.data.data);
          let goods_thumb = res.data.data.goods_thumb;
          let num1 = res.data.data.goods_price - res.data.data.bargain_price;
          if (res.data.data.bargain_count == res.data.data.bargain_count_all){
               that.setData({
                 finish:true
               }) 
          }
          that.setData({
            informAll: res.data.data,
            lunbo: goods_thumb,
            width: (num1 / res.data.data.goods_price).toFixed(2) * 100,
            bargain_price: parseInt(res.data.data.bargain_price) 
          })
          if (goods_thumb.length > 1) { //如果封面图length>1出现轮播点
            that.setData({
              indicatorDots: true,
              autoplay: true,
              interval: 3000,
              duration: 1000,
            })
          }
          wx.hideLoading()
        }
      })
      // 判断自己是否参与
      wx.request({
        url: apiurl + "bargain/goods-detail?sign=" + sign + '&operator_id=' + app.data.kid,
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          let status = res.data.status;
          if (status==1){
            console.log("自己是否", res.data.data);
            that.setData({
              already_bargain: res.data.data.already_bargain
            })
          }else{
            tips.alert(res.data.msg);
          }
          wx.hideLoading()
        }
      })
    })
  },
  //我也参加 关闭所有页面
  join(){
    wx.reLaunch({
      url: '../index/index'
    })
  },
  // 分享
  myself(){
    wx.reLaunch({
      url: '../inform/inform?bargain_id=' + this.data.already_bargain
    })
  },
  // 取消
  cancel(){
    this.setData({
      share: false
    })
  },
  //轮播图
  swipclick: function () { //图片预览
    const imgs = this.data.lunbo;
    console.log("const");
    wx.previewImage({
      current: imgs[this.data.currentIndex], // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  },
  // 海报
  poster(){
    wx.showLoading({
      title: '海报生成中',
    });
    console.log("prewImg:", this.data.imgUrl);
    wx.previewImage({
      current: this.data.imgUrl, // 当前显示图片的http链接
      urls: [this.data.imgUrl] // 需要预览的图片http链接列表
    })
    wx.hideLoading();
    this.setData({
      share: false
    })
  },
  mine(){
    this.setData({
        kanjia:false
    })
  },
  finishTap(){
    console.log("finishTap");
    this.setData({
      finish: false
    })
  },
  help(){
    let that = this;
    let sign = wx.getStorageSync('sign');
    wx.request({
      url: apiurl + "bargain/bargain?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        bargain_id: that.data.bargain_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("砍价", res);
        let status = res.data.status;
        if (status == 1){
            that.setData({
              cut_money:res.data.data,
              kanjia: true,
              bargain_price: that.data.bargain_price - res.data.data
            })
        }else{
          tips.alert(res.data.msg)
        }
      }
    })
  },
  onShareAppMessage: function (e) {
    console.log(e);
    var that = this;
    return {
      title: '快来帮我砍价',
      path: '/pages/index/index',
      success: function (res) {
        console.log(res);
        that.setData({
          share: false
        })
        // 转发成功
      },
      fail: function (res) {
        console.log(res);
        // 转发失败
      }
    }
  }
  
  





})
