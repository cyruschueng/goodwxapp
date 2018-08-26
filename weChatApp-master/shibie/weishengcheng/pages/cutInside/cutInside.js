/**
 * Created by sail on 2017/6/1.
 */
var weCropper = require('../../utils/weCropper')
var api = require('../../api.js')
var util = require('../../utils/util.js')
var Zan = require('../../zanui/index');
var upload = require('../../utils/upload.js')
var names = ['裁剪','生成换脸照','生成大头贴','生成美妆照','生成滤镜照','生成变妆照','生成头像','开始识别'];
const device = wx.getSystemInfoSync()
var model;
var source;
var type;
var cart;
Page(Object.assign({}, Zan.Toast, {
  data: {
    name:'',
    cropperOpt: {
      id: 'cropper',
      width: device.windowWidth,
      height: device.windowWidth,
      scale: 2.5,
      zoom: 8
    }
  },
  touchStart (e) {
    this.wecropper.touchStart(e)
  },
  touchMove (e) {
    this.wecropper.touchMove(e)
  },
  touchEnd (e) {
    this.wecropper.touchEnd(e)
  },
  getCropperImage () {
    var that = this;
    this.wecropper.getCropperImage((src) => {
      if (src) {
        if (parseInt(source) == 6) {
          wx.navigateTo({
            url: '/pages/facture/index/index?src='+src
          })
        } else {
          var that = this;
          wx.showNavigationBarLoading();
          wx.showToast({
            title: '上传中……',
            duration:20000,
            icon: 'loading'
          })

          upload.uploadSingleB({path: src, state: 1}, function (pic) {
            console.log(pic)
            if(pic){
              var tips_name='has_show_face_preview_tip'
              wx.showNavigationBarLoading();
              wx.showToast({
                title: '处理中……',
                duration:20000,
                icon: 'loading'
              })
              // console.log(pic.url)
              switch (parseInt(source)) {
                case 1: api.bianLian(pic.url, model, function(res) {
                  wx.hideNavigationBarLoading();
                  wx.hideToast();
                  util.downloadAndPreview(res.url,'军装照，卡通人物照，整蛊照，快来一键换脸吧！','/pages/zhuangx/list/list?type=2','生成中...')
                  //util.showPreviewTip(tips_name,'长按图片来保存哦',res.url)
                },function(res){
                  console.log(res)
                  wx.hideNavigationBarLoading();
                  wx.hideToast();
                  that.showZanToast(res);
                  setTimeout(function(){wx.navigateBack();},2000);
                });break;//换脸
                case 2: api.sticker(pic.url, model, function(res) {
                  wx.hideNavigationBarLoading();
                  wx.hideToast();
                  util.downloadAndPreview(res.url,'来做张大头贴吧？','/pages/datoutie/edit/edit','生成中...')
                  //util.showPreviewTip(tips_name,'长按图片来保存哦',res.url)
                },function(res){
                  console.log(res)
                  wx.hideNavigationBarLoading();
                  wx.hideToast();
                  that.showZanToast(res);
                  setTimeout(function(){wx.navigateBack();},2000);
                });break;//大头贴
                case 3: api.cosmetic(pic.url, model, function(res) {
                  wx.hideNavigationBarLoading();
                  wx.hideToast();
                  util.downloadAndPreview(res.url,'日系妆、韩妆、裸妆、主题妆...您想要的都在这里！','/pages/cosmetic/edit/edit','生成中...')
                  //util.showPreviewTip(tips_name,'长按图片来保存哦',res.url)
                },function(res){
                  console.log(res)
                  wx.hideNavigationBarLoading();
                  wx.hideToast();
                  that.showZanToast(res);
                  setTimeout(function(){wx.navigateBack();},2000);
                });break;//美妆
                case 4: api.peopleFilter(pic.url, model,type, function(res) {
                  wx.hideNavigationBarLoading();
                  wx.hideToast();
                  util.downloadAndPreview(res.url,'想要人脸滤镜效果，有我so easy！','/pages/peopleFilter/edit/edit','生成中...')
                  //util.showPreviewTip(tips_name,'长按图片来保存哦',res.url)
                },function(res){
                  console.log(res)
                  wx.hideNavigationBarLoading();
                  wx.hideToast();
                  that.showZanToast(res);
                  setTimeout(function(){wx.navigateBack();},2000);
                });break;//滤镜
                case 5: api.decoration(pic.url, model, function(res) {
                  wx.hideNavigationBarLoading();
                  wx.hideToast();
                  util.downloadAndPreview(res.url,'快来玩人脸变妆吧','/pages/decoration/edit/edit','生成中...')
                  //util.showPreviewTip(tips_name,'长按图片来保存哦',res.url)
                },function(res){
                  console.log(res)
                  wx.hideNavigationBarLoading();
                  wx.hideToast();
                  that.showZanToast(res);
                  setTimeout(function(){wx.navigateBack();},2000);
                });break;//变妆
                case 7: wx.navigateTo({url: '/pages/flower/flower?src='+pic.url+'&cart='+cart});break;//花草
              }

            }else{
              that.showZanToast('上传失败，请稍后再试呢');
            }
          });



        }
      } else {
        console.log('获取图片失败，请稍后重试')
      }
    })
  },
  onLoad (option) {
    var src =  option.src
    model = option.model
    source = option.source
    type = option.type
    cart = option.cart
    console.log(type)
    this.setData(
      {
        name:names[source]
      }
    )
    const { cropperOpt } = this.data

    new weCropper(cropperOpt)
    .on('ready', function (ctx) {
      console.log(`wecropper is ready for work!`)
    })
    .on('beforeImageLoad', (ctx) => {
      console.log(`before picture loaded, i can do something`)
      console.log(`current canvas context:`, ctx)
      wx.showToast({
        title: '上传中',
        icon: 'loading',
        duration: 20000
      })
    })
    .on('imageLoad', (ctx) => {
      console.log(`picture loaded`)
      console.log(`current canvas context:`, ctx)
      wx.hideToast()
    })
    this.wecropper.pushOrign(src)
  }
}));
