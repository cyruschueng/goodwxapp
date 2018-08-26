// pages/self/goodsDetail/goodsDetail.js
var app = getApp();
var pages = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabindex:0,
    bodyindex:0,
    j: 1,//帧动画初始图片
    isSpeaking: false,//是否正在说话
    voidelist: [],//音频数组
    time: 0,
    checkstate:1,
    checkvoide:0,
    goods_id:0,
    goods_desc:"",//产品详情描述
    goods_name:"",//产品名字
    goods_imgs:[],//产品图片
    price:0,// 产品价格
    shop_id:0,//店铺的ID
    goods_num:0 //加入购物车数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      goods_id: options.goodsid,
      shop_id: options.shop_id
    })
    this.refreshGoodsDetail(options.goodsid);
    pages=1;
    this.getvoidlist(pages);
  },
  initfileList: function (voidfile,time) {
    var _this = this;
    wx.uploadFile({
        url: app.globalData.url +'/shop/Goodsmanager/uploadGoodsVoice',
        filePath: voidfile,
        name: 'goods_voice',
        formData: {
          user_id: app.globalData.user_id,
          goods_id: _this.data.goods_id,
          voice_length: time
        },
        header: {
          'content-type': 'multipart/form-data'
        }, 
        success: function (res) {
          var data = JSON.parse(res.data);
          if (data.errcode==0){
            _this.showToast("录音成功");
            pages = 1;
            _this.getvoidlist(pages);
          } else if (data.errcode == 400){
            _this.showToast("不能重复录音");
          }else{
            _this.showToast("录音不正常");
          }
        }
    })
  },
  //手指按下
  touchdown: function () {
    var eTime = (new Date()).getTime();
    this.setData({
      time: eTime
    })
    var _this = this;
    speaking.call(this);
    this.setData({
      isSpeaking: true
    })
    //开始录音
    wx.startRecord({
      success: function (res) {
        var sTime = (new Date()).getTime();
        if (sTime - eTime > 60000) {
          _this.setData({
            isSpeaking: false,
          })
        }
        if (sTime - eTime < 1000) {
          _this.showToast("录音时间太短");
          setTimeout(function () {
            wx.stopRecord()
            return false;
          }, 200)
        } else {
          var tempFilePath = res.tempFilePath
          _this.initfileList(tempFilePath, sTime - eTime);
        }

      },
      fail: function (res) {
        //录音失败
        _this.showToast("录音的姿势不对");
      }
    })
  },
  //手指抬起
  touchup: function () {
    if ((new Date()).getTime() - this.data.time < 1000) {
      setTimeout(function () {
        wx.stopRecord()
      }, 200)
    }
    this.setData({
      isSpeaking: false,
    })
    clearInterval(this.timer)
    wx.stopRecord()
  },
  //点击播放录音
  gotoPlay: function (e) {
    this.setData({
      checkvoide: e.currentTarget.dataset.index,
    })
    var _this = this;
    wx.playVoice({
      filePath: e.currentTarget.dataset.key,
    })
    setTimeout(function () {
      _this.setData({
          checkvoide:0,
      })
      wx.stopVoice();
    }, e.currentTarget.dataset.time)
  },
  showToast: function (val) {
    wx.showToast({
      title: val,
      icon: 'success',
      duration: 500
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //加入购物车
  addcart:function(){
    var _this = this;
    //上传到服务器购物车接口
    wx.request({
      url: app.globalData.url +'/ordermanage/orders/addCart',
      method: "POST",
      data: {
        user_id: app.globalData.user_id, //购买者用户id
        goods_id: _this.data.goods_id,  //产品ID
        goods_price: _this.data.price, //产品价格
        shop_id: _this.data.shop_id,  //店铺ID
        sales_id: 1  //销售id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.errcode==0){
          _this.showToast("加入成功");
          _this.setData({
            goods_num: res.data.data.goods_num,//返回购物车产品数量
          })
        }else{
          _this.showToast("加入失败");
        }
        
      }
    })
  },
  //立即购买

  //跳到购物车
  gocart:function(e){
    wx.navigateTo({
      url: "/pages/myCenter/shop/chatblock/chatblock"
    })
  },
  changeType:function(e){
      var index = e.currentTarget.dataset.index;
      this.setData({
        bodyindex: index,
        tabindex: index
      })
  },

  showbuy:function(){
    var cart = 0;
    wx.navigateTo({
      url: '/pages/myCenter/shop/showbuy/showbuy?goodsid=' + this.data.goods_id + '&shop_id=' + this.data.shop_id + '&sales_id=' + this.data.sales_id + '$cart=' + cart
    })
  },
  changeCheck:function(e){
      this.setData({
          checkstate: e.currentTarget.dataset.index,
      })
  },
  //获取产品详情
  refreshGoodsDetail: function (goodsid){
    var _this = this;
    wx.request({
      url: app.globalData.url +'/shop/shop/getGoodsInfo',
      method: "get",
      data: {
        goods_id: goodsid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res);
        var data = res.data.data;
        _this.setData({
          goods_name: data.goods_name,
          org_price: data.org_price,
          price: data.price,
          goods_desc: data.goods_desc,
          goods_desc_imgs: data.goods_desc_imgs,
          goods_imgs: data.goods_imgs,
          material: data.material,
          stock_number: data.stock_number,
        })
      }
    })
  },
  //获取语音列表
  getvoidlist:function(page,msg){
    var _this = this;
    wx.request({
      url: app.globalData.url + '/shop/Goodsmanager/getGoodsVoiceList',
      method: "get",
      data: {
        goods_id: _this.data.goods_id,  //产品ID
        page:page,
        size:30,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
          console.log(res);
          if (res.data.errcode==0){
              var data = res.data.data.arr;
              var daarr = [];
              for (var i = 0; i < data.length;i++){
                daarr.push(data[i]);
                _this.setData({
                  voidelist: daarr
                })
              }
          }else{
            _this.showToast("网络错误");
          }
      }
    })
  }
})
//麦克风帧动画
function speaking() {
  var _this = this;
  //话筒帧动画
  var i = 1;
  this.timer = setInterval(function () {
    i++;
    i = i % 5;
    _this.setData({
      j: i
    })
  }, 200);
}