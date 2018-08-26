var util = require('../../utils/util.js');
const ctx = wx.createCanvasContext('shareCanvas');
const app = getApp();
var shareSrc = app.globalData.shareSrc;
var timeUrl = app.globalData.timeUrl;
var reportUrl = app.globalData.reportUrl;
var resultUrl = app.globalData.resultUrl;
var sign_key = app.globalData.sign_key;
var appSrc = app.globalData.appSrc;
var xcxSrc = app.globalData.xcxSrc;
var iconSrc = app.globalData.iconSrc;
var time,end,img_path='';
var canDraw = true;
Page({
  data: {
    head_url:'',
    // upper_show:true,
    // img_src:'',
    // width:0,
    // height:0,
    c_day:'00',
    c_hour:'00',
    c_min:'00',
    c_sis:'00',
    // beat:0,
    nickname:'',
    score:0,
    rank:null,
    appSrc:'',
    xcxSrc:'',
    timeStatus:null,
    fStatus:false,
    read_score:null,
    select_score:null,
    isIpx:app.globalData.isIpx?true:false,
    saveStatus:true,
    drawEnd:false,
    tranStatus:false,
    showMessage: false,
    messageContent: '',
  },
  onLoad: function (options) {
      wx.hideShareMenu();
      console.log(options);
      if(parseInt(options.rank)>0){
          if(options.fStatus=='true'){
              this.setData({fStatus:true,rank:options.rank,score:options.score})
          }else {
              this.setData({fStatus:false,rank:options.rank,score:options.score,read_score:options.read_score,select_score:options.select_score})
          }
      }else {
          this.getReport();
      }
      this.setData({'appSrc':appSrc,'xcxSrc':xcxSrc})
      let user = wx.getStorageSync('userInfo');
      let u =JSON.parse(user);
      // console.log(user);
      this.setData({head_url:u.avatarUrl});
  },
  getReport:function () {
      var phone = wx.getStorageSync('phoneNum');
      var grade = wx.getStorageSync('grade');
      console.log(phone)
      console.log(grade)
      var s = "phone"+phone+sign_key;
      var sign = util.SHA256(s);
      var str = "?phone="+phone+"&sign="+sign;
      var that = this;
      console.log(reportUrl+str);
      wx.showLoading({
          title: '计算成绩...',
      });
      wx.request({
          url: reportUrl+str,
          success: function (res) {
              console.log(res);
              wx.hideLoading();
              if(res.data.code == 200){
                  if(grade>9){
                      that.setData({fStatus:true,rank:res.data.data.ranking,score:parseInt(res.data.data.score)})
                  }else if(grade<=9){
                      console.log(res.data.data);
                      that.setData({fStatus:false,rank:res.data.data.ranking,score:res.data.data.score,read_score:parseInt(res.data.data.read_score),select_score:parseInt(res.data.data.select_score)})
                  }
              };
          },
          fail:function () {
              console.log('fffff')
          }
      })
  },
  hide_upper:function () {
    this.setData({'upper_show':false})
  },
    toResult:function () {
      console.log(this.data.timeStatus);
      if(this.data.timeStatus == 3){
          this.setData({tranStatus:true})
          var phone = wx.getStorageSync('phoneNum');
          var s = "phone"+phone+sign_key;
          var sign = util.SHA256(s);
          var re_str = "?phone="+phone+"&sign="+sign;
          var that = this;
          wx.request({
              url: resultUrl+re_str,
              success: function (res) {
                  console.log(res);
                  if(res.data.data.is_shortlisted){
                      wx.navigateTo({
                          url: '../../pages/result/result?result=1'
                      })
                  }else if(!res.data.data.is_shortlisted){
                      wx.navigateTo({
                          url: '../../pages/result/result?result=2'
                      })
                  };
              },
              fail:function () {
                  console.log('fffff');
                  this.setData({tranStatus:false})
              }
          });
      }
    },
    saveImg:function (e) {
      console.log(canDraw);
      if(canDraw){
          canDraw = false;
          var that = this;
          var grade = wx.getStorageSync('grade');
          console.log('grade',grade);
          console.log(img_path);
          if(grade>9){
              wx.showLoading({
                  title: '生成图片',
              });
              var scoreText;
              if(parseInt(that.data.score)<60){
                  scoreText = '多阅读多积累词汇，逐步掌握阅读技巧。'
              }else if(parseInt(that.data.score)>80){
                  scoreText = '注意读懂问题，灵活运用阅读技巧。'
              }else {
                  scoreText = '阅读的时候要更加注意细节内容哦！'
              }
              wx.getImageInfo({
                  src: shareSrc,
                  success: function (res) {
                      console.log(res);
                      ctx.save()
                      ctx.drawImage(res.path,0,0,375*2,667*2);
                      ctx.restore();
                      wx.getImageInfo({
                          src:iconSrc,
                          success:function (res) {
                              ctx.save()
                              ctx.drawImage(res.path,107*2,200*2,160*2,137.5*2);
                              ctx.restore();
                              wx.getImageInfo({
                                  src: xcxSrc,
                                  success: function (res) {
                                      console.log(res);
                                      ctx.save();
                                      ctx.drawImage(res.path,142.5*2,410*2,90*2,90*2);
                                      ctx.restore();
                                      ctx.save();
                                      ctx.setFontSize(36*2);
                                      ctx.setTextAlign('center');
                                      ctx.setFillStyle('#FFFDCA');
                                      ctx.fillText(that.data.score, 187*2, 260*2);
                                      ctx.restore();
                                      ctx.save();
                                      ctx.setFontSize(13*2);
                                      ctx.setTextAlign('center');
                                      ctx.setFillStyle('#000000');
                                      ctx.fillText('恭喜您提交成功！您是第'+that.data.rank+'个参赛者！', 187*2, 180*2)
                                      ctx.fillText(scoreText, 187*2, 380*2);
                                      ctx.fillText('小小学霸，ABCtime等你来闯关~', 187*2, 530*2);
                                      ctx.fillText('微信扫码，或长按识别小程序，我也要参赛', 187*2, 552*2);
                                      ctx.restore();
                                      ctx.draw();
                                      that.setData({drawEnd:true});
                                      wx.canvasToTempFilePath({
                                          x: 0,
                                          y: 0,
                                          width: 375*2,
                                          height: 667*2,
                                          destWidth: 375*2,
                                          destHeight: 667*2,
                                          canvasId: 'shareCanvas',
                                          success: function(data) {
                                              // var url = res.tempFilePath;
                                              // that.setData({img_src:res.tempFilePath});
                                              console.log(data.tempFilePath);
                                              wx.getSetting({
                                                  success(res){
                                                      console.log(res);
                                                      if(!res.authSetting['scope.writePhotosAlbum']){
                                                          wx.authorize({
                                                              scope:'scope.writePhotosAlbum',
                                                              success(){
                                                                  wx.saveImageToPhotosAlbum({
                                                                      filePath:data.tempFilePath,
                                                                      success: function (res) {
                                                                          wx.hideLoading();
                                                                          wx.showToast({
                                                                              title: '保存成功',
                                                                              duration: 2000
                                                                          })
                                                                          canDraw = true;
                                                                      },
                                                                      fail:function (res) {
                                                                          wx.hideLoading();
                                                                          if(res.errMsg=='saveImageToPhotosAlbum:fail system deny'){
                                                                              that.showMessage('请打开系统保存照片权限')
                                                                          }else {
                                                                              that.showMessage(res.errMsg)
                                                                          }
                                                                          canDraw = true;
                                                                      }
                                                                  })
                                                              },
                                                              fail(){
                                                                  wx.hideLoading();
                                                                  wx.showModal({
                                                                      title: '温馨提示',
                                                                      content: '“保存相册”授权失败，允许授权后才可保存图片到您的相册。点击授权，可重新使用',
                                                                      cancelText:'不授权',
                                                                      confirmText:'授权',
                                                                      success: res=>{
                                                                      if (res.confirm) {
                                                                      wx.openSetting({
                                                                          success: function (res) {
                                                                              if (!res.authSetting['scope.writePhotosAlbum']) {
                                                                                  wx.authorize({
                                                                                      scope: 'scope.writePhotosAlbum',
                                                                                      success() {
                                                                                          wx.saveImageToPhotosAlbum({
                                                                                              filePath:data.tempFilePath,
                                                                                              success: function (res) {
                                                                                                  wx.hideLoading();
                                                                                                  wx.showToast({
                                                                                                      title: '保存成功',
                                                                                                      duration: 2000
                                                                                                  })
                                                                                                  canDraw = true;
                                                                                              },
                                                                                              fail:function (res) {
                                                                                                  wx.hideLoading();
                                                                                                  if(res.errMsg=='saveImageToPhotosAlbum:fail system deny'){
                                                                                                      that.showMessage('请打开系统保存照片权限')
                                                                                                  }else {
                                                                                                      that.showMessage(res.errMsg)
                                                                                                  }
                                                                                                  canDraw = true;
                                                                                              }
                                                                                          })
                                                                                      },
                                                                                      fail() {
                                                                                          canDraw = true;
                                                                                      }

                                                                                  })
                                                                              }
                                                                          },
                                                                          fail:function () {
                                                                              canDraw = true;
                                                                          }
                                                                      })
                                                                  }else {
                                                                      canDraw = true;
                                                                  }
                                                              }
                                                              })
                                                              }
                                                          })
                                                      }else{
                                                          console.log('canSave');
                                                          wx.saveImageToPhotosAlbum({
                                                              filePath:data.tempFilePath,
                                                              success: function (res) {
                                                                  console.log(res);
                                                                  wx.hideLoading();
                                                                  wx.showToast({
                                                                      title: '保存成功',
                                                                      duration: 2000
                                                                  })
                                                                  canDraw = true;
                                                              },
                                                              fail:function (res) {
                                                                  wx.hideLoading();
                                                                  if(res.errMsg=='saveImageToPhotosAlbum:fail system deny'){
                                                                      that.showMessage('请打开系统保存照片权限')
                                                                  }else {
                                                                      that.showMessage(res.errMsg)
                                                                  }
                                                                  canDraw = true;
                                                              }
                                                          })
                                                      }
                                                  }
                                              })

                                          }
                                      })
                                  }
                              })

                          }
                      })

                  }
              });

              // }
              // if(!this.data.drawEnd){
          }else{
              wx.showLoading({
                  title: '生成图片',
              });
              var readText,selectText;
              if(parseInt(that.data.read_score)<30){
                  readText = '对单词发音、连读，重读进行针对模仿和提高。'
                  // readText = '多听多模仿，单词发音和连读需特别加强。'
              }else if(parseInt(that.data.read_score)>40){
                  readText = '对单词发音、连读，重读进行针对模仿和提高。'
                  // readText = '发音标准，语速适中，重读和连读较准确。'
              }else {
                  readText = '对单词发音、连读，重读进行针对模仿和提高。'
              }
              if(parseInt(that.data.select_score)<30){
                  selectText = '多阅读多积累词汇，逐步掌握阅读技巧。'
              }else if(parseInt(that.data.read_score)>40){
                  selectText = '注意读懂问题，灵活运用阅读技巧。'
              }else {
                  selectText = '阅读的时候要更加注意细节内容哦！'
              }
              wx.getImageInfo({
                  src: shareSrc,
                  success: function (res) {
                      console.log(res);
                      ctx.save()
                      ctx.drawImage(res.path,0,0,375*2,667*2);
                      ctx.restore();
                      wx.getImageInfo({
                          src:iconSrc,
                          success:function (res) {
                              ctx.save()
                              ctx.drawImage(res.path,107*2,190*2,160*2,137*2);
                              ctx.restore();
                              wx.getImageInfo({
                                  src: xcxSrc,
                                  success: function (res) {
                                      console.log(res);
                                      ctx.save();
                                      ctx.drawImage(res.path,142.5*2,450*2,90*2,90*2);
                                      ctx.restore();
                                      ctx.save();
                                      ctx.setFontSize(36*2);
                                      ctx.setTextAlign('center');
                                      ctx.setFillStyle('#FFFDCA');
                                      ctx.fillText(that.data.score, 187*2, 250*2);
                                      ctx.restore();
                                      ctx.save();
                                      ctx.beginPath();
                                      ctx.setStrokeStyle('#19405F');
                                      ctx.setLineCap('round');
                                      ctx.setLineWidth(7*2);
                                      ctx.moveTo(100*2,350*2);
                                      ctx.lineTo(300*2,350*2);
                                      ctx.stroke();
                                      ctx.restore();
                                      if(that.data.read_score>0){
                                          ctx.save();
                                          ctx.beginPath();
                                          ctx.setStrokeStyle('#F4A03B');
                                          ctx.setLineCap('round');
                                          ctx.setLineWidth(7*2);
                                          ctx.moveTo(100*2,350*2);
                                          ctx.lineTo(100*2+parseInt(that.data.read_score/50*200)*2,350*2);
                                          ctx.stroke();
                                          ctx.restore();
                                      }
                                      ctx.save();
                                      ctx.beginPath();
                                      ctx.setStrokeStyle('#19405F');
                                      ctx.setLineCap('round');
                                      ctx.setLineWidth(7*2);
                                      ctx.moveTo(100*2,400*2);
                                      ctx.lineTo(300*2,400*2);
                                      ctx.stroke();
                                      ctx.restore();
                                      if(that.data.select_score>0){
                                          ctx.save();
                                          ctx.beginPath();
                                          ctx.setStrokeStyle('#F4A03B');
                                          ctx.setLineCap('round');
                                          ctx.setLineWidth(7*2);
                                          ctx.moveTo(100*2,400*2);
                                          ctx.lineTo(100*2+parseInt(that.data.select_score/50*200)*2,400*2);
                                          ctx.stroke();
                                          ctx.restore();
                                      }
                                      ctx.save();
                                      ctx.setFontSize(14*2);
                                      ctx.setTextAlign('center');
                                      ctx.setFillStyle('#000000');
                                      ctx.fillText('恭喜您提交成功！您是第'+that.data.rank+'个参赛者！', 187*2, 170*2);
                                      ctx.fillText('微信扫码或长按识别小程序，我也要参赛', 187*2, 580*2);
                                      ctx.restore();
                                      ctx.save();
                                      ctx.setFontSize(12*2);
                                      ctx.setTextAlign('left');
                                      ctx.setFillStyle('#000000');
                                      ctx.fillText('跟读', 60*2, 355*2);
                                      ctx.fillText('答题', 60*2, 405*2);
                                      ctx.fillText(readText, 95*2, 380*2);
                                      ctx.fillText(selectText, 95*2, 430*2);
                                      ctx.restore();
                                      ctx.draw();
                                      that.setData({drawEnd:true});
                                      wx.canvasToTempFilePath({
                                          x: 0,
                                          y: 0,
                                          width: 375*2,
                                          height: 667*2,
                                          destWidth: 375*2,
                                          destHeight: 667*2,
                                          canvasId: 'shareCanvas',
                                          success: function(data) {
                                              img_path = data.tempFilePath;
                                              wx.getSetting({
                                                  success(res){
                                                      console.log(res);
                                                      if(!res.authSetting['scope.writePhotosAlbum']){
                                                          wx.authorize({
                                                              scope:'scope.writePhotosAlbum',
                                                              success(){
                                                                  wx.saveImageToPhotosAlbum({
                                                                      filePath:data.tempFilePath,
                                                                      success: function (res) {
                                                                          wx.hideLoading();
                                                                          console.log(data.tempFilePath);
                                                                          console.log(res);
                                                                          wx.showToast({
                                                                              title: '保存成功',
                                                                              duration: 2000
                                                                          })
                                                                          canDraw = true;
                                                                      },
                                                                      fail:function (res) {
                                                                          wx.hideLoading();
                                                                          if(res.errMsg=='saveImageToPhotosAlbum:fail system deny'){
                                                                              that.showMessage('请打开系统保存照片权限')
                                                                          }else {
                                                                              that.showMessage(res.errMsg)
                                                                          }
                                                                          canDraw = true;
                                                                      }
                                                                  })
                                                              },
                                                              fail(){
                                                                  wx.hideLoading();
                                                                  wx.showModal({
                                                                      title: '温馨提示',
                                                                      content: '“保存相册”授权失败，允许授权后才可保存图片到您的相册。点击授权，可重新使用',
                                                                      cancelText:'不授权',
                                                                      confirmText:'授权',
                                                                      success: res=>{
                                                                      if (res.confirm) {
                                                                      wx.openSetting({
                                                                          success: function (res) {
                                                                              if (!res.authSetting['scope.writePhotosAlbum']) {
                                                                                  wx.authorize({
                                                                                      scope: 'scope.writePhotosAlbum',
                                                                                      success() {
                                                                                          wx.hideLoading();
                                                                                          console.log(data.tempFilePath);
                                                                                          console.log(res);
                                                                                          wx.showToast({
                                                                                              title: '保存成功',
                                                                                              duration: 2000
                                                                                          })
                                                                                          canDraw = true;
                                                                                      },
                                                                                      fail:function (res) {
                                                                                          wx.hideLoading();
                                                                                          if(res.errMsg=='saveImageToPhotosAlbum:fail system deny'){
                                                                                              that.showMessage('请打开系统保存照片权限')
                                                                                          }else {
                                                                                              that.showMessage(res.errMsg)
                                                                                          }
                                                                                          canDraw = true;
                                                                                      }

                                                                                  })
                                                                              }
                                                                          },
                                                                          fail:function () {
                                                                              canDraw = true;
                                                                          }
                                                                      })
                                                                  }else {
                                                                      canDraw = true;
                                                                  }
                                                              }
                                                              })
                                                              }
                                                          })
                                                      }else{
                                                          wx.saveImageToPhotosAlbum({
                                                              filePath:data.tempFilePath,
                                                              success: function (res) {
                                                                  wx.hideLoading();
                                                                  wx.showToast({
                                                                      title: '保存成功',
                                                                      duration: 2000
                                                                  })
                                                                  canDraw = true;
                                                              },
                                                              fail:function (res) {
                                                                  wx.hideLoading();
                                                                  if(res.errMsg=='saveImageToPhotosAlbum:fail system deny'){
                                                                      that.showMessage('请打开系统保存照片权限')
                                                                  }else {
                                                                      that.showMessage(res.errMsg)
                                                                  }
                                                                  canDraw = true;
                                                              }
                                                          })
                                                      }
                                                  }
                                              })

                                          }
                                      })
                                  }
                              })

                          }
                      })

                  }
              });
          } ;
      }
  },
    showMessage: function(text) {
        var that = this;
        that.setData({
            showMessage: true,
            messageContent: text
        })
        setTimeout(function(){
            that.setData({
                showMessage: false,
                messageContent: ''
            })
        }, 2500)
    },
    onUnload: function () {

    },
    onShow: function () {
        canDraw = true;
        this.setData({tranStatus:false})
        var that = this;
        wx.request({
            url: timeUrl,
            success: function (res) {
                console.log('time',res);
                var info = res.data.data;
                console.log(info.status)
                switch (info.status){
                    case 1:
                        end = info.start_time;
                        that.setData({timeStatus:1})
                        break;
                    case 2:
                        end = info.end_time;
                        that.setData({timeStatus:2});
                        break;
                    case 3:
                        end = info.end_time;
                        that.setData({timeStatus:3})
                        break;
                    default:
                        break
                }
            },
            fail:function () {
                console.log('fffff')
            }
        });
        time = setInterval(this.countDown,1000);
    },
    countDown:function ()
    {
        var now = new Date();
        // var endDate = new Date(2018, 2, 1);
        // var leftTime=endDate.getTime()-now.getTime();
        var leftTime=end*1000-now.getTime();
        // console.log(leftTime);
        var dd = parseInt(leftTime / 1000 / 60 / 60 / 24, 10);//计算剩余的天数
        var hh = parseInt(leftTime / 1000 / 60 / 60 % 24, 10);//计算剩余的小时数
        var mm = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟数
        var ss = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
        dd = this.checkTime(dd);
        hh = this.checkTime(hh);
        mm = this.checkTime(mm);
        ss = this.checkTime(ss);//小于10的话加0
        this.setData({c_day:dd,c_hour:hh,c_min:mm,c_sis:ss});
        if(dd=='00'&&hh=='00'&&mm=='00'&ss=='00'){
            clearInterval(time)
        }
    },
    checkTime:function(i)
    {
        if (i < 10&&i>0) {
            i = "0" + i;
        }else if(i<=0){
            i = '00';
        }
        return i;
    },
})
