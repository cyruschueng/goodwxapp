var utils = require("../../utils/util.js");
var drawText = utils.drawText;
Page({
  data: {
    coupletText:{},
    topWordsStyle:"font-size:64rpx;",
    verticalWordsStyle: "font-size:60rpx;",
    share_bgUrl:'',
    wxaCode_url:'',
    hideModalBg: true,
    bonusId:'',
    avatarUrl:''
  },

  onLoad: function (options) {
    let that = this;
    wx.getStorage({
      key: 'bonusSend_cacheData',
      success: function(res) {
        console.log(res)
        if (res.data.coupletTxt.TopWords.length < 4){
            that.setData({
              topWordsStyle:"font-size:90rpx;"
            })
        }

        if (res.data.coupletTxt.LeftWords.length > 7){
          that.setData({
            verticalWordsStyle: "font-size:50rpx;line-height:1.1;"
          })
        }

        that.setData({
          coupletText: res.data.coupletTxt,
          share_bgUrl: res.data.shareBgUrl,
          wxaCode_url: res.data.codeUrl,
          bonusId: res.data.bonusId,
          avatarUrl: res.data.headImgUrl
        })
      },
    })
  },

  /*发送好友或群*/
  onShareAppMessage: function (res) {
    var that = this;
    if (res.from === 'button') {
      // console.log(res.target)
    }
    return {
      title: '我的心意，请收下',
      imageUrl: '../../images/share_url_img.png',
      path: '/pages/redPacket_index/redPacket_index?id=' + that.data.bonusId,
      success: function (res) {
        wx.showShareMenu({
          withShareTicket: true
        });
      },
      fail: function (res) {
        console.log(res.shareAppMessage);
      }
    }
  },

  /*生成分享朋友圈图片*/
  bindShareTap: function () {
    wx.showToast({
      title: '图片生成中',
      icon:'loading',
      duration:3000
    })
    var that = this;
    that.setData({
      hideModalBg: false
    });
    var ctx = wx.createCanvasContext('myCanvas');
    ctx.setFillStyle("#ffffff");
    ctx.fillRect(0, 0, 478, 770);
    wx.getImageInfo({
      src: that.data.wxaCode_url,
      success: function (res) {
        ctx.drawImage(res.path, 85, 253, 70, 70);
        ctx.draw(true);
        console.log(that.data.avatarUrl);
        wx.getImageInfo({
          src: that.data.avatarUrl,
          success: function (res) {
            ctx.drawImage(res.path, 23, 320, 40, 40);
            ctx.draw(true);
            wx.getImageInfo({
              src: that.data.share_bgUrl,
              success: function (res) {
                ctx.drawImage(res.path, 0, 0, 239, 385);
                ctx.draw(true);
              },
              fail: function (res) {
                console.log(res);
              }
            });
          },
          fail: function (res) {
            console.log(res);
          }
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },

  //生成临时文件
  bindSaveImageTap: function () {
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      destWidth: 478,
      destHeight: 770,
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showModal({
              title: '成功保存图片',
              showCancel: false,
              content: '已成功为你保存图片到手机相册，请自行前往朋友圈分享',
              success: function (res) { }
            })
          },
          fail(res) {
            console.log("图片保存失败");
          }
        })
      }
    })
  },

  //收起模态窗口
  bindModalTap: function () {
    this.setData({
      hideModalBg: true
    });
  }
  
})