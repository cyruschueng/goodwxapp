//index.js
const app = getApp()
const apiurl = 'https://pet.zealcdn.cn/index.php/';
let sign = wx.getStorageSync('sign');
import tips from '../../utils/tips.js'
Page({
  data: {
    index:1, //tab切换
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    activity:true
  },
  //事件处理函数
  onLoad: function (options) {
    let that = this;
    if (options.scene) {
      let scene = decodeURIComponent(options.scene);
      console.log("scene:", scene);
      var strs = new Array(); //定义一数组 
      strs = scene.split("_"); //字符分割 
      console.log(strs);
      console.log("bargain_id:", strs[1]);
      var bargain_id = strs[1];
      that.setData({
        bargain_id: bargain_id
      })
      
    }
    
  },
  onShow: function () {
    let that = this;
    wx.showLoading({
      title: '加载中...',
    })
    app.getAuth(function () {
      let userInfo = wx.getStorageSync('userInfo');
      let sign = wx.getStorageSync('sign');
      if (that.data.bargain_id){
        wx.navigateTo({
          url: '../share/share?bargain_id=' + that.data.bargain_id,
        })
      }else{
          // banner
          wx.request({
            url: apiurl + "bargain/banner?sign=" + sign + '&operator_id=' + app.data.kid,
            header: {
              'content-type': 'application/json'
            },
            method: "GET",
            success: function (res) {
              console.log("获取轮播图", res);
              let status = res.data.status;
              if (status == 1) {
                that.setData({
                  banner: res.data.data
                })
              } else {
                console.log(res.data.msg);
                
              }
            }
          })
          wx.request({
            url: apiurl + "bargain/goods-detail?sign=" + sign + '&operator_id=' + app.data.kid,
            header: {
              'content-type': 'application/json'
            },
            method: "GET",
            success: function (res) {
              let status = res.data.status;
              if (status == 1) {
                console.log("商品详情", res.data.data);
                let goods_desc = res.data.data.goods_desc;
                wx.setStorageSync('goods_desc', goods_desc);
                wx.setStorageSync('rules', res.data.data.rules);
                that.setData({
                  informAll: res.data.data,
                  goods_thumb: res.data.data.goods_thumb,
                  goods_desc: goods_desc,
                  already_bargain: res.data.data.already_bargain,
                  stock: res.data.data.total_count - res.data.data.sale_count
                })
                if (res.data.data.total_count - res.data.data.sale_count<1) { //如果库存为0
                  that.setData({
                    activity: false
                  })
                }
              } else {
                console.log(res,'失败')
                //tips.alert(res.data.msg);
              }
              wx.hideLoading()
            }
          })
      }
    })
  },
  // 切换
  checkTap(e){
      this.setData({
        index:e.currentTarget.dataset.index
      })
  },
  // 取消
  cancel(){
    this.setData({
      share: false
    })
  },
  // 领取
  receive(e){
    // 发起砍价
    let that = this;
    let stock = that.data.stock;
    let sign = wx.getStorageSync('sign');
    console.log('库存：',stock);;
    console.log('bargain_id:',that.data.bargain_id);
    console.log('already_bargain',that.data.already_bargain);
    if (stock > 0){ //have
      console.log('砍价already_bargain',that.data.already_bargain)
      if (that.data.already_bargain == false){ //未发起过
        console.log('未发起过')
          console.log("请求砍价id：",apiurl + "bargain/create-bargain?sign=" + sign + '&operator_id=' + app.data.kid +'&goods_id='+that.data.informAll.goods_id)
        wx.request({
          url: apiurl + "bargain/create-bargain?sign=" + sign + '&operator_id=' + app.data.kid,
          data: {
            goods_id: that.data.informAll.goods_id
          },
          header: {
            'content-type': 'application/json'
          },
          method: "GET",
          success: function (res) {
            console.log("砍价id  index", res);
            let status = res.data.status;
            if (status==1){
              console.log("bargain_id", res.data.data);
              that.setData({
                bargain_id: res.data.data
              })
              wx.navigateTo({
                url: '../inform/inform?bargain_id=' + that.data.bargain_id
              })
            }else{
              console.log(res.data.data);
              tips.alert('获取bargain_id失败！')
            }
            wx.hideLoading()
          }
        })
      }else{ 
        console.log('已发起过')
        wx.navigateTo({
          url: '../inform/inform?bargain_id=' + that.data.already_bargain
        })
      }
    }else{ //nohave
      console.log('没有库存')
      if (that.data.already_bargain == false) { //未发起过
        wx.showModal({
          content: '已无更多库存，无法发起活动',
          showCancel: false,
          confirmText: "确定"
        })
      } 
      else {
        wx.navigateTo({
          url: '../inform/inform?bargain_id=' + that.data.already_bargain
        })
      }
      
    }
     
  },
  //轮播图
  swipclick: function () { //图片预览
    const imgs = this.data.lunbo;
    console.log("swipclick");
    wx.previewImage({
      current: imgs[this.data.currentIndex], // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  },
  onShareAppMessage: function (e) {
    console.log(e);
    var that = this;
    return {
      title: '',
      path: '/pages/index/index',
      success: function (res) {
      },
      fail: function (res) {
        console.log(res);
      }
    }
  }
  
  





})
