var util = require('../../utils/util.js')
var app = getApp()
var Zan = require('../../zanui/index');
var b_height=300;//按钮高度
const device = wx.getSystemInfoSync() // 获取设备信息
var deviceWidth = app.globalData.system_info.windowWidth // 示例为一个与屏幕等宽的正方形裁剪框
var deviceHeight = app.globalData.system_info.windowHeight
const height = device.windowHeight
// var width;//图片宽度  rpx
// var height;//图片高度  rpx
var pic;
var title;
var path;

Page(Object.assign({}, Zan.Toast, {
  data: {
  },
  save:function (e) {
    console.log("e",e);
    var lastImage = this.data.url
    let formId = e.detail.formId;
    util.dealFormIds(formId);
    var that = this
    if (wx.saveImageToPhotosAlbum) {
      wx.saveImageToPhotosAlbum({
        filePath:lastImage,
        success: function (res) {
          wx.showToast({
            title: '保存到相册啦',
            icon: 'success',
            duration: 2000
          })
        },
        fail: function (res) {
          console.log(res)
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: function (res) {
              console.log(res)
            },
            error: function (res) {
              util.previewSingalPic(pic)
              console.log(res)
            },
            fail: function (res) {
              util.previewSingalPic(pic)
              console.log(res)
            }
          })
        }
      })
    }else{
      util.previewSingalPic(pic)
    }
  },
  preview:function (e) {
    var previewImage = this.data.url
    util.previewSingalPic(previewImage);
  },
  onShareAppMessage: function () {
    return {
      title: title,
      path: path,
      imageUrl:pic
    }
  },
  dashang:function () {
    wx.navigateToMiniProgram({
      appId: 'wx18a2ac992306a5a4',
      path:'pages/apps/largess/detail?accountId=3300'
    })
  },
  select:function (e) {
    console.log("e",e);
    let formId = e.detail.formId;
    util.dealFormIds(formId);
  },
concact(){
  console.log(12312312)
  var that =this;


    var deskurl = this.data.pic_url;
    console.log("deskUrl",deskurl)
    // var share = this.data.tempFilePath
    var image = '../../images/WechatIMG103.jpeg'

    wx.getImageInfo({
      src: deskurl,
      success: function (res) {
        console.log("width",res.width)
        console.log("height",res.height)
        const ctx = wx.createCanvasContext('demo');
        const imageHeight = res.height/res.width*deviceWidth;
        ctx.drawImage(deskurl, 0,0,deviceWidth, imageHeight);
        ctx.drawImage(image, 0,imageHeight,deviceWidth, deviceHeight*0.12);
        // ctx.drawImage(image, width*0.8,height*0.85,width*0.2, width*0.2);
        // ctx.drawImage()
        ctx.draw('',res => {
          wx.canvasToTempFilePath({
            destWidth:deviceWidth,
            destHeight:deviceHeight,
            canvasId: 'demo',
            success: function(res) {
              console.log("tempFilePath",res.tempFilePath)

              that.setData({

                canvasHidden:true,
                pic_url: res.tempFilePath,
              })
              // setTimeout(()=>{
              //   that.setData({
              //     isShow:false,
              //   });
              //   wx.hideLoading();

              // },500)

            },
            error: function (res) {
              console.log(res)
            }
          })
        });
      }
    })
},

drawShare(){
  var that = this;

    const ctx = wx.createCanvasContext('share')
    console.log("width",width)
    ctx.setFontSize(18)
    ctx.fillText('我的工位,桌上有刀,桌下有猫', 10, 20)
    ctx.setFontSize(15)
    ctx.fillText('扫码定制你的理想工位', 10, 40)
    // ctx.drawImage(image, width*0.8, 10, 50, 50)
    ctx.draw()
    wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width:width,
        height: 50,
        destWidth: width,
        // destHeight: 50,
        canvasId: 'share',
        success: function(res) {
          console.log("tempFilePath",res.tempFilePath)
          that.setData({
            tempFilePath:res.tempFilePath,
            shareHidden:true
          })
          that.concact()
        },
        fail(){
          console.log("fail")
        }
      })
},


  onLoad: function (options) {
    app.globalData.system_info = wx.getSystemInfoSync()
    var that = this;
    pic = decodeURIComponent(options.pic)
    title=options.title
    path = decodeURIComponent(options.path)

    var widow_height = app.globalData.system_info.windowHeight/app.globalData.system_info.windowWidth*750 //rpx
    wx.getImageInfo({
      src: pic,
      success: function (res) {
        console.log(res.width)
        console.log(res.height)
        console.log(widow_height)
        // if((widow_height-b_height)>res.height){
        //   width=res.width;
        //   height=res.height;
        // }else{
        // }
        // height = widow_height-b_height;
        // width = res.width/res.height*(height);

        that.setData({
          pic_url:pic,
          // height:height,
          // width:width,
        })
        // that.drawShare()
        that.concact();

      }
    })


  }


}));
