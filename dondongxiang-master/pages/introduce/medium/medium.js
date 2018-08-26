var app = getApp();
Page({
  data: {
    currentTab: 0,
    currentindex: 0,
    currenttype: 0,//当前分享模块
    tabiconimg:[
      "/images/introduce/medium/tw_s.png",
      "/images/introduce/medium/hb_s.png",
      "/images/introduce/medium/vedio_s.png",
      "/images/introduce/medium/link_s.png",
    ],
    fromid:0,//分享者ID
    image_txt:'',
    getimage_txt:"",//获得的分享者的图文文字
    fontSize: 14,
    tempFilePaths: '/images/introduce/medium/add.png', //绑定image组件的src
    penpaths:"",//画布图片
    sharePaths:'',//要分享的图片路径
    pen: 3, //画笔粗细默认值
    color: '#cc0033', //画笔颜色默认值
    shareusericon:"",//分享者头像
    shareuserid:0,//分享者用户id
    showsharepicviewstate:false,//获取的图片显示状态
    showsharepicviewsrc:"/images/business/shop/demo_goods.jpg"//要显示的图片资源


  },
  onLoad: function (options) {
    var _this = this;
    /** 判断场景值，1044 为转发场景，包含shareTicket 参数 */
    // if (options.scene == 1044) {
    //   console.log("转发场景！！");
    //   wx.getShareInfo({
    //     shareTicket: options.shareTicket,
    //     success: function (res) {
    //       var encryptedData = res.encryptedData;
    //       var iv = res.iv;
    //       console.log("打印:" + iv);
    //     }
    //   })
    //   var currtype = options.type;
    // }
    console.log("打印页面参数formid:" + options.fromId);
    console.log("打印页面参数type:" + options.type);
    console.log("打印页面参数fromicon:" + options.fromicon);

    //一进页面刷新信息判断分享还是自己
    if (options.fromId > 0) {
      _this.setData({
        fromid: options.fromId,
        currentTab: options.type,
        currentindex: options.type
      })
      getCurrentPageUrlWithArgs();
      _this.getShareContent();
      _this.setData({
        shareusericon: options.fromicon,
      })
    }else{
      _this.setData({
        shareusericon: app.globalData.userinfo.avatarUrl,
        showsharepicviewstate:true
      })

    }
    // if (!app.globalData.from_id>0){
    //   getCurrentPageUrlWithArgs();
    // }
    
    //一进页面刷新信息判断分享还是自己
    // if (_this.data.fromid>0){
    //   _this.getShareContent();
    //   _this.setData({
    //     shareusericon: options.fromicon,
    //   })
    // }else{
    //   _this.setData({
    //     shareusericon: app.globalData.userinfo.avatarUrl,
    //   })
    // }

  },
  onReady: function () {
    
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
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
  //图文文字控件获取
  Image_txtInput: function (e) {
    this.setData({
      image_txt: e.detail.value
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    console.log(this.data.currentTab);
    var fromid = app.globalData.user_id;
    var fromicon = app.globalData.userinfo.avatarUrl
    if (res.from === 'button') {
      // 来自页面内转发按钮
      if (this.data.currentTab>0){
        this.CanScreenshot();
        this.setData({
          sharePaths: this.data.penpaths
        })
      }else{
        this.setData({
          sharePaths: this.data.tempFilePaths
        })
      } 
    }
    this.uploadshareimg(() => { });
    return {
      title: '分享式聊天太好玩啦',
      path: '/pages/introduce/medium/medium?fromId=' + fromid + '&type=' + this.data.currentTab + '&fromicon=' + fromicon,
      success:  (res)=>{
        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '转发失败',
          icon: 'success',
          duration: 2000
        })
      }
    }
  },
  slider3change(e) {
    this.setData({
      fontSize: 2*e.detail.value
    })
  },
  changeType:function(e){
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current,
      currentindex: e.target.dataset.current
    })
  },
  loinkindex:function(){
    wx.reLaunch({
      url: '../introduce'
    })
  },
  shareinfodata: function () {
    wx.reLaunch({
      url: '../introduce'
    })
  },
  //画布截图保存上传操作
  CanScreenshot:function(){
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 300,
      height: 200,
      destWidth: width,
      destHeight: height,
      canvasId: 'myCanvas',
      success: function (res) {
        console.log(res.tempFilePath);
        this.setData({
          penpaths: res.tempFilePath
        })
      }
    })
  },
  //选择图片
  choosesimg:function(){
    var _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths[0];
        _this.setData({
          tempFilePaths: tempFilePaths,
          
        })
      }
    })
  },
  //上传分享信息
  uploadshareimg: function (cb){
    console.log("制定");
    var _this = this;
    // if (_this.data.currentTab=0){
    //   _this.setData({
    //     sharePaths: _this.data.tempFilePaths
    //   })
    // }else{
    //     _this.CanScreenshot();
    //     _this.setData({
    //       sharePaths: _this.data.penpaths
    //     })
    // }
      _this.setData({
        sharePaths: _this.data.tempFilePaths
      })
    var shareimg =[];
    // shareimg.push(_this.data.sharePaths)
    // console.log(shareimg);
    wx.uploadFile({
      url: app.globalData.url +'/upload/upload/uploadSharePic', //仅为示例，非真实的接口地
      filePath: _this.data.sharePaths,
      name: 'share_img',
      formData: {
        user_id: app.globalData.user_id,
        type: _this.data.currentTab,
        image_txt: _this.data.image_txt,
        font_size: _this.data.fontSize
      },
      success: function (res) {
        console.log(res);
        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 2000
        })
        cb(res)
      }
    })
  },
  //获取分享聊天者信息
  getShareContent:function(){
    var _this = this;
    wx.request({
      url: app.globalData.url +'/upload/upload/getShareContent',
      method: 'get',
      data: {
        user_id: _this.data.fromid,
        type: _this.data.currentTab,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res);
        if (res.data.errcode == "0") {
          wx.showToast({
            title: '获取成功',
            icon: 'success',
            duration: 2000
          })
          _this.setData({
            getimage_txt: res.data.data.image_txt,
            shareusericon: res.data.data.headimgurl,
          })
          if (res.data.data.type==0){
            _this.setData({
              tempFilePaths: res.data.data.shareimg
            })
          }else{
            _this.setData({
              sharePaths: res.data.data.shareimg
            })
          }
        } else {
          wx.showToast({
            title: '获取失败',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },

  startX: 0, //保存X坐标轴变量
  startY: 0, //保存X坐标轴变量
  isClear: false, //是否启用橡皮擦标记
  //手指触摸动作开始
  touchStart: function (e) {
    //得到触摸点的坐标
    this.startX = e.changedTouches[0].x
    this.startY = e.changedTouches[0].y
    this.context = wx.createContext()
    if (this.isClear) { //判断是否启用的橡皮擦功能 ture表示清除 false表示画画
      this.context.setStrokeStyle('#F8F8F8') //设置线条样式 此处设置为画布的背景颜色 橡皮擦原理就是：利用擦过的地方被填充为画布的背景颜色一致 从而达到橡皮擦的效果 
      this.context.setLineCap('round') //设置线条端点的样式
      this.context.setLineJoin('round') //设置两线相交处的样式
      this.context.setLineWidth(20) //设置线条宽度
      this.context.save(); //保存当前坐标轴的缩放、旋转、平移信息
      this.context.beginPath() //开始一个路径 
      this.context.arc(this.startX, this.startY, 5, 0, 2 * Math.PI, true); //添加一个弧形路径到当前路径，顺时针绘制 这里总共画了360度 也就是一个圆形 
      this.context.fill(); //对当前路径进行填充
      this.context.restore(); //恢复之前保存过的坐标轴的缩放、旋转、平移信息
    } else {
      this.context.setStrokeStyle(this.data.color)
      this.context.setLineWidth(this.data.pen)
      this.context.setLineCap('round') // 让线条圆润 
      this.context.beginPath()
    }
  },
  //手指触摸后移动
  touchMove: function (e) {
    var startX1 = e.changedTouches[0].x
    var startY1 = e.changedTouches[0].y
    if (this.isClear) { //判断是否启用的橡皮擦功能 ture表示清除 false表示画画
      this.context.save(); //保存当前坐标轴的缩放、旋转、平移信息
      this.context.moveTo(this.startX, this.startY); //把路径移动到画布中的指定点，但不创建线条
      this.context.lineTo(startX1, startY1); //添加一个新点，然后在画布中创建从该点到最后指定点的线条
      this.context.stroke(); //对当前路径进行描边
      this.context.restore() //恢复之前保存过的坐标轴的缩放、旋转、平移信息
      this.startX = startX1;
      this.startY = startY1;
    } else {
      this.context.moveTo(this.startX, this.startY)
      this.context.lineTo(startX1, startY1)
      this.context.stroke()
      this.startX = startX1;
      this.startY = startY1;
    }
    //只是一个记录方法调用的容器，用于生成记录绘制行为的actions数组。context跟<canvas/>不存在对应关系，一个context生成画布的绘制动作数组可以应用于多个<canvas/>
    wx.drawCanvas({
      canvasId: 'myCanvas',
      reserve: true,
      actions: this.context.getActions() // 获取绘图动作数组
    })
  },
  //手指触摸动作结束
  touchEnd: function () {
  },
  //启动橡皮擦方法
  clearCanvas: function () {
    if (this.isClear) {
      this.isClear = false;
    } else {
      this.isClear = true;
    }
  },
  penSelect: function (e) { //更改画笔大小的方法
    console.log(e.currentTarget);
    this.setData({ pen: parseInt(e.currentTarget.dataset.param) });
    this.isClear = false;
  },
  colorSelect: function (e) { //更改画笔颜色的方法
    console.log(e.currentTarget);
    this.setData({ color: e.currentTarget.dataset.param });
    this.isClear = false;
  }

})

/*获取当前页带参数的url*/
function getCurrentPageUrlWithArgs() {
  wx.showToast({
    title: '获取fromId',
    icon: 'success',
    duration: 2000
  })
  var _this = this
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length - 1]    //获取当前页面的对象
  var url = currentPage.route    //当前页面url
  var options = currentPage.options    //如果要获取url中所带的参数可以查看options
  console.log("打印页面url:" + url);
  console.log("打印页面参数:" + options);
  console.log("打印页面参数formid:" + options.fromId);
  console.log("打印页面参数type:" + options.type);

  if (options.fromId>0){
    // _this.setData({
    //   fromid: options.fromId,
    // })
    //获取分享页fromid绑定我的推荐人
    wx.request({
      url: app.globalData.url +'/login/login/bindFromId',
      method: 'post',
      data: {
        user_id: app.globalData.user_id,
        fromid: options.fromId,

      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
      }
    })

  }
  
   return options
}
