import { get_bonusDetailList, get_serviceFeeExplain, get_serviceMsg} from "../../url.js";
var utils = require("../../utils/util.js");
var sessionKey = '';
const innerAudioContext = wx.createInnerAudioContext();
Page({
  data: {
    serviceMsg: '',
    hideModalBg:true,
    bonusId:'',
    bonusCount:'',
    openCount:'',
    amountSum:'',
    myMoney:'',
    avatarUrl:'',
    nickName:'',
    detailList:[],
    bonusStatus:'',
    voiceUrl:'',
    isShowVoice:'hidden',
    share_bgUrl:'',
    wxaCode_url:'',
  },

  onLoad: function (options) {
    sessionKey = wx.getStorageSync("sessionKey");
    if (!sessionKey) {
      utils.getSessionKey(utils.getSetting);
      return;
    }

    var bounsId = options.id;
    if (bounsId == null){
      bounsId = wx.getStorageSync('bounsId');
      this.getRecord(bounsId);//获取红包领取结果
    }else{
      wx.setStorageSync('bounsId', bounsId);
      this.getRecord(bounsId);
    }
    this.getFeeExplain();//获取服务费声明
  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    let bounsId = wx.getStorageSync('bounsId');
    this.getRecord(bounsId);
  },

  concatFun: function () {
    utils.requestLoading(get_serviceMsg + "?sessionKey=" + sessionKey, "post", JSON.stringify({ Type: "image" }), '数据加载中...',
      function (res) {
        if (res.Status == 5) {
          wx.removeStorageSync("sessionKey");
          utils.getSessionKey(utils.getSetting);
          return;
        }
        console.log(res);
      }, function (res) {
        console.log(res);
      })
  },

  //服务费声明
  getFeeExplain: function () {
    let that = this;
    utils.requestLoading(get_serviceFeeExplain + "?sessionKey=" + sessionKey, "post", "", "数据加载中...",
      function (res) {
        if (res.Status == 5) {
          wx.removeStorageSync("sessionKey");
          utils.getSessionKey(utils.getSetting);
          return;
        }

        if (res.wechatMsg != 'none') {
          that.setData({
            serviceMsg: res.wechatMsg
          })          
        }
      }, function (res) {
        console.log(res);
      }
    );
  },

  /*播放语音*/
  tapPlayVoice: function () {
    innerAudioContext.obeyMuteSwitch = false;
    innerAudioContext.src = this.data.voiceUrl;
    innerAudioContext.autoplay = true;
    innerAudioContext.play()
  },

  getRecord: function (bounsId){
    let that = this;
    utils.requestLoading(get_bonusDetailList + "?sessionKey=" + sessionKey, "post",
      JSON.stringify({ bonusId: bounsId }), "数据加载中...",
      function (res) {
        // console.log(res)
        wx.hideNavigationBarLoading() //完成停止加载
        setTimeout(function(){
          wx.stopPullDownRefresh() //停止下拉刷新
        },500);
        if (res.Msg == ""){
          if (res.VoiceUrl){
            that.setData({
              voiceUrl: res.VoiceUrl,
              isShowVoice:'show'
            })
          }
          that.setData({
            bonusId: res.BonusId,
            bonusCount: res.BonusCount,
            openCount: res.OpenCount,
            amountSum: res.AmountSum,
            myMoney: res.MyMoney,
            avatarUrl: res.HeadImgUrl,
            nickName: res.NickName,
            bonusStatus: res.BonusStatus,
            detailList: res.DetailList,
            share_bgUrl: res.BackGroundImgUrl,
            wxaCode_url: res.WXACodeUrl
          })
        }else if(res.Status == 5){
          wx.removeStorageSync("sessionKey");
          utils.getSessionKey(utils.getSetting);
        }else{
          wx.showToast({
            title: res.Msg,
            icon: 'none'
          })
        }
      }, function (res) {
        console.log(res)
      }
    )
  },

  transpondFun:function(){
    let that = this;
    this.goTopFun();
    setTimeout(function () {
      that.onShareAppMessage()
    }, 1000);
  },

  /*发送好友或群*/
  onShareAppMessage: function (res) {
    let that = this;
    if (res.from === 'button') {
      // console.log(res.target)
    }
    return {
      title: '我的心意，请收下',
      // imageUrl: '../../images/share_url_img.png',
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
      icon: 'loading',
      duration: 3000
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
      destWidth: 530,
      destHeight: 752,
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
      hideModalBg: true,
    });
  },

  //返回顶部
  goTopFun: function (e) {
    var _top = this.data.scroll_top;//发现设置scroll-top值不能和上一次的值一样，否则无效，所以这里加了个判断  
    if (_top == 1) {
      _top = 0;
    } else {
      _top = 1;
    }
    this.setData({
      'scroll_top': _top
    });
  }, 

  bindTapWithdraw:function(){
    wx.navigateTo({
      url: '/pages/redPacket_withdraw/redPacket_withdraw'
    })
  },

  bindTapSend: function () {
    wx.navigateTo({
      url: '/pages/redPacket_send/redPacket_send',
    })
  },
})