
var GLOBAL_PAGE
var APP = getApp()
var API = require('../../utils/api.js');
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置


Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    hiddenDetail: false,
    hiddenSpecification: true,
    hiddenBrand: true,
    payNow: true,
    maskVisual: 'hidden',


  //   art:[
  //     {sn:"0",style:"text",msg:"第一篇文章\n\r是的"},
  //     {sn:"1",style:"text",msg:"第一篇文章"},
  //     {sn:"2",style:"image",msg:"http://odhng6tv1.bkt.clouddn.com/swiper25.png"},
  //     {sn:"3",style:"text",msg:"\n\r第一篇文章"},
  //     {sn:"1",style:"text",msg:"第一篇文章"},
  //     {sn:"1",style:"text",msg:"第一篇文章"},
  //     {sn:"1",style:"text",msg:"第一篇文章"},
  //   ]
    artId:1,
    art:[],  
    tao_bao:[],


index: 0,
 array: ['美国', '中国', '巴西', '日本'],

 radioItems: [
            {name: '广西南宁市云景路景晖巷8号广西广电网络大楼', value: '0'},
            {name: '广西南宁市竹园广园路口青年国际18栋1218室', value: '1', checked: true}
        ],



    tabs: ["图文信息", "详细参数", "注意事项"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,

    isPayPreview:true,

  },

  pay: function () {
      GLOBAL_PAGE.setData({
          isPayPreview:false,
      })
    //   wx.showModal()
    //   var order_msg = {
    //       brand:'苹果iphone',
    //       model:'6S',
    //       address:'广西南宁市云景路景晖巷8号广西广电网络大楼',
    //   }
    //   var check_msg = "手机品牌：" + order_msg.brand + "\n" +
    //       "手机型号：" + order_msg.model + "\n"   
    //   wx.showModal({
    //       title: '订单确认',
    //       content: check_msg,
    //       success: function (res) {
    //           if (res.confirm) {
    //               console.log('用户点击确定')
    //           } else if (res.cancel) {
    //               console.log('用户点击取消')
    //           }
    //       }
    //   })
   },
  
  payCheckSuccess: function () { 
      wx.showModal({
          title: '支付成功',
          success:function(){
              wx.switchTab({
                  url: '../relate/relate',
                  success: function(res) {},
                  fail: function(res) {},
                  complete: function(res) {},
              })
          },
      })
  },
  payCheckFail: function () {
      GLOBAL_PAGE.setData({
          isPayPreview: true,
      })
  },

  //品牌单选框
   radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value);

        var radioItems = this.data.radioItems;
        for (var i = 0, len = radioItems.length; i < len; ++i) {
            radioItems[i].checked = radioItems[i].value == e.detail.value;
        }

        this.setData({
            radioItems: radioItems
        });
    },
    //图文信息切换
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    console.log(options)
    var that = this
    GLOBAL_PAGE = this

     var that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });

  },

  test: function (options) {
      console.log(options)
      wx.request({
          url: API.ARTICALE() , 
          method:"GET",
          data: {
            "art_id":options.art_id
          },
          success: function(res) {
              console.log("collect success:",res.data)
              var object = res.data
              if (object.status == "true")
              {
                  // var art = GLOBAL_PAGE.data.art
                  // var new_art = art.concat( res.data.content_list );
                  // art.push({sn:"1",style:"text",msg:res.data.a})
                  console.log(res.data.tao_bao)
                  GLOBAL_PAGE.setData({
                      swiper:res.data.swiper,
                      title:res.data.title,
                      art: res.data.art,
                      tao_bao:res.data.tao_bao,
                  })
              }
          },
          fail:function(res){
            wx.showModal({
                title: '网络连接失败，请重试',
                showCancel:false,
            })
          }
      })
  },


  // 图片预览
  preview:function(e){
      var current = e.currentTarget.dataset.img_url
      var art = GLOBAL_PAGE.data.art
      var urls = []
      for (var i=0;i<art.length;i++)
          if(art[i].style == "image")
              urls.push(art[i].msg)
      wx.previewImage({
          current: current, // 当前显示图片的http链接
          urls: urls, // 需要预览的图片http链接列表
      })
  },

  qrPreview:function(e){
    
    wx.previewImage({
          current: e.currentTarget.dataset.url, // 当前显示图片的http链接
          urls: [e.currentTarget.dataset.url], // 需要预览的图片http链接列表
      })
  },

  //图片加载
  //动态设定加载图片的高，自适应全铺
  bindload:function(e){
    console.log(e.detail,e.currentTarget.dataset.index)
      var _index = e.currentTarget.dataset.index
      var art = GLOBAL_PAGE.data.art
      

      //长度小于屏幕
      if( e.detail.width < APP.globalData.windowWidth){
          art[_index].height = e.detail.height + "px"
      }else{ //长度大于屏幕
          var _r = e.detail.height
          art[_index].height = 690 * e.detail.height / e.detail.width 
          art[_index].height = art[_index].height + "rpx"
      }
     
      GLOBAL_PAGE.setData({
          art: art
      })
  },



  clipBoard:function(e){
      var text =  e.currentTarget.dataset.text
      wx.setClipboardData({
        data: text,
        success: function(res) {
          wx.getClipboardData({
            success: function(res) {
              // console.log(res.data) // data
                wx.showToast({
                  title: '下单链接复制成功',
                  icon: 'success',
                  duration: 2000
                })
            }
          })
        }
      })
  },


  onShareAppMessage: function () { 
      return {
        title: GLOBAL_PAGE.data.title,
        desc: GLOBAL_PAGE.data.art[0].msg + '...',
        path: '/pages/detail/detail?art_id='+GLOBAL_PAGE.data.artId,
        }
   },




  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },

})