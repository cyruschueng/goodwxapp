// watermark.js
// var Api = require('../../utils/api.js');
var APP = getApp()
var Menu = require('../../utils/menu.js');
var BASE64 = require('../../utils/base64.js');
var GLOBAL_PAGE
Page({
  data: {
    grids: ["black","white","orangered",  "red", "blue", "yellow"],
    
    watermark:{
      img_url:"http://77fmtb.com1.z0.glb.clouddn.com/gogopher.jpg" ,
      style:"2",
      text:BASE64.encode("上车"),
      wx_text:"上车",

      font:"5b6u6L2v6ZuF6buR",
      fontsize:"24",
      wx_fontsize:"24px",

      fill:"YmxhY2s=", //YmxhY2s=  black，  d2hpdGU= white
      wx_fill:"black",

      dissolve:"85",
      wx_dissolve:0.85,

      gravity:"NorthWest",
      dx: 150,
      wx_offsetLeft: "150px",
      input_offset_x:4,

      dy: 150,
      wx_offsetTop: "150px",
      input_offset_y:4,
    },

    stageWidth:400,
    stageHeight:300,
    boxWidth:300,
    boxHeight:300,
    // ratio:1,
    maxFontSize:30,

    imgWidth:640,
    imgHeight:427,

    imgSuccess:"http://77fmtb.com1.z0.glb.clouddn.com/gogopher.jpg?watermark/2/text/5LiD54mb5LqR5a2Y5YKo/font/5b6u6L2v6ZuF6buR/fontsize/1000/fill/d2hpdGU=/dissolve/85/gravity/NorthWest/dx/20/dy/20",
    imgHistory:[],//历史记录

    touchStart:{x:1,y:2} //手指touch开始的位置 
  },


  Create: function(e) {
    var watermark = GLOBAL_PAGE.data.watermark //浅拷贝

    //坐标转换
    var t = GLOBAL_PAGE.transform(GLOBAL_PAGE.data.imgWidth,GLOBAL_PAGE.data.imgHeight,watermark.dx,watermark.dy,watermark.fontsize)
    var t_dx = t.x
    var t_dy = t.y
    var t_fontsize = t.fontsize
    
    var img_url = watermark.img_url
    var style = `?watermark/${watermark.style}/`
    var text = `text/${watermark.text}/`
    var font = `font/${watermark.font}/`
    var fontsize = `fontsize/${t_fontsize}/`
    var fill = `fill/${watermark.fill}/`
    var dissolve = `dissolve/${watermark.dissolve}/`
    var gravity = `gravity/${watermark.gravity}/`
    var dx = `dx/${t_dx}/`
    var dy = `dy/${t_dy}`
    var success_url = img_url + `${style}${text}${font}${fontsize}${fill}${dissolve}${gravity}${dx}${dy}`

    var imgHistory = GLOBAL_PAGE.data.imgHistory
    if ( imgHistory.length == 0 )
      imgHistory.push(success_url)
    else
      for(var i=0;i<imgHistory.length;i++) //避免重复
        if(success_url == imgHistory[i]) break
        else {
          imgHistory.push(success_url)
          break
        }
      
    console.log(imgHistory)
    GLOBAL_PAGE.setData({
      imgSuccess:success_url,
      imgHistory:imgHistory
    })

   
    //  if( wx.getStorageSync('is_water_share_info') == "")
    //   {
    //       wx.showModal({
    //           title: '分享提示',
    //           content:'点击右上角"⋮"，发送给朋友',
    //           showCancel:false,
    //           confirmText:"知道了",
    //           success: function(res) {
    //               wx.previewImage({
    //                 current: GLOBAL_PAGE.data.imgSuccess, // 当前显示图片的http链接
    //                 urls: GLOBAL_PAGE.data.imgHistory // 需要预览的图片http链接列表
    //               })
    //               wx.setStorageSync('is_water_share_info',1)
    //           }
    //       }) 
    //   }
      // else if( wx.getStorageSync('is_water_share_info') == 1 && GLOBAL_PAGE.data.imgHistory.length > 1)
    if(wx.getStorageSync('is_water_share_info') == "" && GLOBAL_PAGE.data.imgHistory.length > 1)
      {
           wx.showModal({
              title: '提示',
              content:'左右滑动查看临时记录，喜欢的请及时保存',
              // showCancel:false,
              confirmText:"预览",
              success: function(res) {
                  wx.previewImage({
                    current: GLOBAL_PAGE.data.imgSuccess, // 当前显示图片的http链接
                    urls: GLOBAL_PAGE.data.imgHistory // 需要预览的图片http链接列表
                  })
                  wx.setStorageSync('is_water_share_info',1)
              }
          }) 
      }
      else {
          wx.previewImage({
            current: GLOBAL_PAGE.data.imgSuccess, // 当前显示图片的http链接
            urls: GLOBAL_PAGE.data.imgHistory // 需要预览的图片http链接列表
          })
      }
      
  },


  transform:function(imgw,imgh,x,y,size){
    //以图片左上角为坐标系(0,0)
    // var bg_w = 500,bg_h = 500,bg_r = 2
    // var img_w = 640,img_h = 427
    // var ratio = 750 / APP.globalData.windowWidth,  // 1px 对应 rdp的值

    var stage_w = GLOBAL_PAGE.data.stageWidth, //舞台w,h
        stage_h = GLOBAL_PAGE.data.stageHeight

    var box_w = GLOBAL_PAGE.data.boxWidth,
        box_h = GLOBAL_PAGE.data.boxHeight
    var box_offset_x = (stage_w-box_w)/2, //正方形image控件显示框的偏移位置
        box_offset_y = 0 //y方向暂时不做偏移

    var img_w = parseInt(imgw), //背景图片w,h
        img_h = parseInt(imgh)

    

    var input_x = parseInt(x) - GLOBAL_PAGE.data.watermark.input_offset_x, //文本框计算偏移量后的位置
        input_y = parseInt(y) - GLOBAL_PAGE.data.watermark.input_offset_y

    if (img_w >= img_h){
      var ratio = img_w/box_w
      var bg_w = box_w, bg_h = img_h/ratio //以图片宽
      var offset_x = 0
      var offset_y = (box_h - bg_h)/2
    }
    else {
      var ratio = img_h/box_h
      var bg_h = box_h, bg_w = img_w/ratio //以图片宽
      var offset_x = (box_w - bg_w)/2
      var offset_y = 0
    }

    var text_x_new = parseInt(input_x - offset_x - box_offset_x)*ratio  //新X坐标，  原来坐标-图片压缩偏移量-image控件偏移量
    var text_y_new = parseInt(input_y - offset_y - box_offset_y)*ratio //新y坐标

    var fontsize = parseInt(size) //px
    var qiniu_twip = 20 //七牛转化比率 1px == 20 twip
    var fontsize_new = fontsize*qiniu_twip*ratio//新fontsize

    console.log(  {x:text_x_new,y:text_y_new,fontsize:fontsize_new})
    return {
      x: parseInt(text_x_new),
      y:parseInt(text_y_new),
      fontsize:parseInt(fontsize_new)}
  },


  inputChange: function(e) {
    console.log(e.detail.value)
    var _word = e.detail.value
    GLOBAL_PAGE.setData({
      word_mix:_word,
    })

    var watermark = GLOBAL_PAGE.data.watermark
    watermark.text = BASE64.encode(e.detail.value)
    watermark.wx_text = e.detail.value
    GLOBAL_PAGE.setData({watermark:watermark})

  },

  fill_change:function(e){
    var fill = e.currentTarget.dataset.fill
    var watermark = GLOBAL_PAGE.data.watermark
    watermark.fill = BASE64.encode(fill)
    watermark.wx_fill = fill
    GLOBAL_PAGE.setData({
      watermark:watermark
    })
  },

  dissolve_sliderchange: function(e) {
    var dissolve = e.detail.value
    var watermark = GLOBAL_PAGE.data.watermark
    watermark.dissolve = dissolve
    watermark.wx_dissolve = parseFloat(dissolve)/100
    GLOBAL_PAGE.setData({
      watermark:watermark
    })
  },
  size_sliderchange: function(e) {
    var font_size = e.detail.value

    var watermark = GLOBAL_PAGE.data.watermark
    watermark.fontsize = font_size
    watermark.wx_fontsize = font_size + "px"
    GLOBAL_PAGE.setData({
      watermark:watermark
    })
  },

  //touch时间改变x、y位置
  touchstart:function(event){
    // GLOBAL_PAGE.touchEvent(event)
    // console.log("start")
    GLOBAL_PAGE.setData({
        touchStart:{
          x:event.touches[0].clientX ,
          y:event.touches[0].clientY 
        }
    })
    // console.log(GLOBAL_PAGE.data.touchStart.x , GLOBAL_PAGE.data.touchStart.y)
  },
  touchmove:function(event){
    //  console.log("move")
    GLOBAL_PAGE.touchEvent(event)
  },
  touchend:function(event){

  },
  touchEvent:function(event){

    if ( event.touches[0].clientX <10 ||  event.touches[0].clientX > APP.globalData.windowWidth-10 )
      return
    if ( event.touches[0].clientY <10 ||  event.touches[0].clientY > 290 )
      return
    //touch位移
    var move_x = event.touches[0].clientX - GLOBAL_PAGE.data.touchStart.x 
    var move_y = event.touches[0].clientY - GLOBAL_PAGE.data.touchStart.y

    console.log(move_x ,move_y)
    var watermark = GLOBAL_PAGE.data.watermark
    // var ratio = 750 / app.globalData.windowWidth 
    // watermark.dx = parseInt( event.touches[0].clientX * ratio )
    // watermark.dy =  parseInt(event.touches[0].clientY * ratio )
    // console.log(event.touches[0].clientX ,event.touches[0].clientY)
    var dx = watermark.dx + move_x
    var dy = watermark.dy + move_y
    console.log(watermark.dx,watermark.dy,dx ,dy)
    watermark.dx = dx 
    watermark.dy = dy 
    
    watermark.wx_offsetLeft = dx - watermark.input_offset_x 
    watermark.wx_offsetLeft += "px"
    watermark.wx_offsetTop = dy - watermark.input_offset_y 
    watermark.wx_offsetTop += "px"

    GLOBAL_PAGE.setData({
      watermark:watermark,
      touchStart:{
        x:event.touches[0].clientX ,
        y:event.touches[0].clientY 
      }
    })    
  },

    onShareAppMessage: function () { 
        return {
            title: '表情袋',
            desc: '海量表情天天让你惊喜，斗图乐趣无限，ヽ(°◇° )ノ',
            path: '/pages/public/public'
        }
    },

  onLoad: function (option) {
    // options = {imgurl: "http://image.12xiong.top/19_20161230100647.jpg", width: "1280", height: "822"}
    var opt_imgurl = option.imgurl
    var opt_w = option.width
    var opt_h = option.height

    var stage_w = APP.globalData.windowWidth - 4*2,
        stage_h = 300,
        box_w = 300,
        box_h = 300

    if (opt_w >= opt_h){
      var ratio = opt_w/box_w
    }
    else {
      var ratio = opt_h/box_h
    }
    
    var maxFontSize = parseInt(190/ratio) // 213是七牛最大字体

    GLOBAL_PAGE = this
    //初始背景地址,w,h
    var watermark = GLOBAL_PAGE.data.watermark
    watermark.img_url = opt_imgurl
    this.setData({
      watermark:watermark, //更改背景图
      imgWidth:opt_w,
      imgHeight:opt_h,

      stageWidth:stage_w,
      stageHeight:stage_h,
      boxWidth:box_w,
      boxHeight:300,
      // ratio:1,
      maxFontSize:maxFontSize,
    })
    
      //必须要登陆以后再做的事情
      if(APP.globalData.isLogin == true)
          GLOBAL_PAGE.onInit(option)
      else
          APP.login(option)
  },

  //必须要登陆以后发起的请求，在这里完成
    onInit:function(option){
       //Todo 登陆过后做的请求
    },

})