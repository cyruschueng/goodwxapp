var app=getApp();
var lib=require("../../utils/util.js");
var ctx=null;
ctx = wx.createCanvasContext('myCanvas')
Page({
  data: {
    userInfo:null,
    changeNum:0,
    hasChanged:0,
    nToy:0,
    showMask:'none',
    bShowXcx:'none',
    shareImgSrc:null
  },
  bShow(){
      if(this.data.showMask=='none'){
          this.setData({
              showMask:'block'
          })
      }else{
          this.setData({
              showMask:'none'
          })
      }
  },
  onShareAppMessage(res) {
        var randomImg=app.shareImages[Math.floor(Math.random()*app.shareImages.length)];
        var that=this;
        var title=app.globalData.userInfo.nickName;
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title:`${title}+邀请您挑战`,
            path: '/pages/index/index',
            imageUrl:`${randomImg}`,
            success: function(res) {
                var shareTickets = res.shareTickets;
                if (shareTickets.length == 0){
                    return false;
                }
                wx.getShareInfo({
                    shareTicket: shareTickets[0],
                    success: function(res){
                        var encrypt = res.encryptedData;
                        var iv = res.iv;
                        wx.request({
                            url:'https://xcx3.zhuozhida.cn/aes/PHP/demo.php',
                            header: {
                                'content-type': 'application/x-www-form-urlencoded' // 默认值
                            },
                            method:'POST',
                            data:{
                                encrypt:encrypt,
                                iv:iv,
                                sessionKey:app.globalSession
                            },
                            success:function(res){
                                let bShare=true;
                                for(var i=0;i<app.globalData.arrOpenGId.length;i++){
                                    if(app.globalData.arrOpenGId[i]==res.data.openGId){
                                        wx.showToast({
                                            title: '请转发到不同群',
                                            icon: 'none',
                                            duration: 1000
                                        });
                                        bShare=false;
                                        return
                                    }
                                };
                                if(bShare){
                                    app.globalData.changeNum+=1;
                                    wx.showToast({
                                        title: '转发成功',
                                        icon: 'success',
                                        duration: 1000
                                    });
                                    app.globalData.arrOpenGId.push(res.data.openGId);
                                    wx.setStorage({
                                        key:'userData2',
                                        data:app.globalData
                                    })
                                }
                            }
                        })
                    }
                });

            },
            fail: function(res) {
                wx.showToast({
                    title: '请转发到群哦',
                    icon: 'none',
                    duration: 2000
                });
            }
        }
    },
  onLoad: function () {
      wx.showShareMenu({
          withShareTicket:true
      })
      this.setData({
          userInfo:app.globalData.userInfo,
          changeNum:app.globalData.changeNum,
          hasChanged:app.globalData.hasChanged,
          nToy:app.globalData.nToy
      })
  },
  onShow: function () {
      this.setData({
          userInfo:app.globalData.userInfo,
          changeNum:app.globalData.changeNum,
          hasChanged:app.globalData.hasChanged,
          nToy:app.globalData.nToy
      })
  },
  exchange(){
      if(this.data.nToy<=0){
          wx.showToast({
              title: '话费卡数量不足,无法兑换',
              icon: 'none',
              duration: 2000
          })
          return;
      }
      var that=this;
      wx.showModal({
          title: '提示',
          content: '您是否兑换话费卡,获得3次挑战机会？',
          success: function(res) {
              if (res.confirm) {
                  that.setData({
                      changeNum:that.data.changeNum+3,
                      nToy:that.data.nToy-1
                  });
                  app.globalData.changeNum+=3;
                  app.globalData.nToy-=1;
                  console.log('挑战次数'+app.globalData.changeNum);
                  lib.setUser(app);
                  wx.showToast({
                      title: '已获得3次挑战机会',
                      icon: 'success',
                      duration: 1000
                  });
              } else if (res.cancel) {
                  console.log('用户点击取消')
              }
          }
      })
  },
  createXcx(){
      var that=this;
      var userImgSrc=app.globalData.userInfo.avatarUrl;
      console.log(userImgSrc)
      if(this.data.bShowXcx=='block'){
          this.setData({
              bShowXcx:'none'
          })
          return
      }else{
          this.setData({
              bShowXcx:'block'
          })
      }
      let promise1 = new Promise(function (resolve, reject) {
          wx.getImageInfo({
              src: '../../img/shareXcx.jpg',
              success: function (res) {
                  console.log(res)
                  resolve(res);
              }
          })
      });
      let promise2 = new Promise(function (resolve, reject) {
          wx.getImageInfo({
              src: '../../img/xcx.jpg',
              success: function (res) {
                  resolve(res);
              }
          })
      });
      let promise3 = new Promise(function (resolve, reject) {
          wx.getImageInfo({
              src:userImgSrc ,
              success: function (res) {
                  resolve(res);
              }
          })
      });

      Promise.all([
          promise1, promise2, promise3
      ]).then(res => {
          ctx.setFillStyle('#3a9bfb')
          ctx.fillRect(0,0,400,800)
          //主要就是计算好各个图文的位置
          ctx.drawImage('../../' + res[0].path, -10, -30,280,420);
          ctx.drawImage('../../' + res[1].path, 90, 210,70,70);
          ctx.drawImage(res[2].path, 105, 15, 40, 40);
           ctx.setTextAlign('center');
           ctx.setFillStyle('red');
           ctx.setFontSize(12)
          ctx.fillText(`${app.globalData.userInfo.nickName}`, 125, 69)

          ctx.stroke()
          ctx.draw(false,()=>{
              wx.showLoading({
                  title: '努力生成中...'
              })
              setTimeout(()=>{
                  wx.canvasToTempFilePath({
                      x: 0,
                      y: 0,
                      width: 400,
                      height: 620,
                      destWidth: 400,
                      destHeight:620,
                      fileType:'jpg',
                      quality:1,
                      canvasId: 'myCanvas',
                      success: function (res) {
                          wx.hideLoading();
                          wx.getSetting({
                              success(res){
                                  if(!res.authSetting["scope.writePhotosAlbum"]){
                                      wx.authorize({
                                          scope:'scope.writePhotosAlbum',
                                          success(){
                                              console.log('授权成功');
                                          }
                                      })
                                  }
                              }
                          })
                          wx.saveImageToPhotosAlbum({
                              filePath: res.tempFilePath,
                              success(res) {
                                  console.log(res);
                              }
                          })
                      },
                      fail: function (res) {
                          console.log(res);
                          setTimeout(function(){
                              wx.hideLoading();
                              wx.showToast({
                                  title: '保存图片失败',
                                  icon: 'none',
                                  duration: 2000
                              })
                          },3000)
                      }
                  })
              },1000)

          });

      })

  },
  cancelXcx(){
      this.setData({
          bShowXcx:'none'
      })
  },
  doNone(){
    console.log('什么都不做')
  },
  toForm(){
      wx.navigateTo({
          url:'../form/form'
      })
  },
})