import { get_couplet, pay_redPacket, get_serviceFee, UploadVoice, get_serviceFeeExplain } from "../../url.js"
var utils = require("../../utils/util.js")
const app = getApp();
const recorderManager = wx.getRecorderManager();
const innerAudioContext = wx.createInnerAudioContext();
var tempFilePath = '';
var sessionKey = '';
Page({
  data: {
    hideModalBg: true,
    isHasVioce:false,
    coupletId:'',
    coupletText:'',
    money:0,
    num:0,
    serviceFee: "0.00",
    headImgUrl:'',
    j: 1,//帧动画初始图片  
    isSpeaking: false,
    totalPay:"0.00"
  },

  onLoad: function (options) {
    sessionKey = wx.getStorageSync("sessionKey");
    if (!sessionKey) {
      utils.getSessionKey(utils.getSetting);
      return;
    }

    this.setData({
      headImgUrl: app.globalData.userInfo.avatarUrl
    })
    this.getCouplet();//获取对联
    this.getFeeExplain();//获取服务费声明
  },

  getCouplet: function (){
    var that = this;
  
    let requestParams = JSON.stringify({
      OpenId: app.globalData.openId
    });
    utils.requestLoading(get_couplet + "?sessionKey=" + sessionKey, "post", requestParams, "加载数据中...",
      function (res) {
        if (res.Status == 5) {
          wx.removeStorageSync("sessionKey");
          utils.getSessionKey(utils.getSetting);
          return;
        }
        that.setData({
          coupletText: res[0],
          coupletId: res[0].ID
        })
      }, function (res) {
        console.log(res);
      }
    )
  },

  //更换对联
  changeCouplet:function(coupletxt){
    this.setData({
      coupletText: coupletxt,
      coupletId: coupletxt.ID
    })
  },

  //发送红包
  sendFun: function (){
    let isSubmit = true;
    let that = this;
    if (that.data.money == 0){
      wx.showToast({
        title: '请输入红包金额',
        icon:'none'
      })
    } else if (that.data.num == 0){
      wx.showToast({
        title: '请输入红包数量',
        icon: 'none'
      })
    } else if (!isSubmit){
      wx.showToast({
        title: '请求发送中...',
        icon: 'loading'
      })
    }else{
      isSubmit = false;
      let requestParams = JSON.stringify({
        BonusMoney: Number(that.data.money),
        ServiceCharge: that.data.serviceFee,
        BonusCount: Number(that.data.num),
        BonusVoiceUrl: that.tempFilePath,
        CoupletId: that.data.coupletId
      });
      utils.requestLoading(pay_redPacket + "?sessionKey=" + sessionKey, "post", requestParams,'',
        function(res){
          if(res.Msg == ""){
            let share_bgUrl = res.BackGroundImgUrl;
            let wxaCode_url = res.WXACodeUrl;
            let bonusId = res.BonusId; 
            let headImgUrl = res.HeadImgUrl;
            
            //调用微信支付
            wx.requestPayment({
              'timeStamp': res.TimeStamp,
              'nonceStr': res.NonceStr,
              'package': res.Package ,
              'signType': res.SignType,
              'paySign': res.PaySign,
              'success': function (res) {
                isSubmit = true;
                
                wx.setStorage({
                  key: 'bonusSend_cacheData',
                  data: {
                    "coupletTxt": that.data.coupletText,
                    "shareBgUrl": share_bgUrl,
                    "codeUrl": wxaCode_url,
                    "bonusId":bonusId,
                    "headImgUrl": headImgUrl
                  }
                })

                    if (that.tempFilePath) {
                      that.UploadVoiceFun(UploadVoice, that.tempFilePath, bonusId);//上传语音            
                    }

                wx.navigateTo({
                  url: '/pages/redPacket_afterPay/redPacket_afterPay',
                })
              },
              'fail': function (res) {
                console.log(res)
                console.log("支付失败")
              }
            })
          } else if (res.Status == 5) {
            wx.removeStorageSync("sessionKey");
            utils.getSessionKey(utils.getSetting);
          }else{
            wx.showToast({
              title: res.Msg,
              icon:'none'
            })
          }
        },function(res){
          console.log(res)
        }
      )
    }
  },

  inputMoney:function(e){
    this.setData({
      money:e.detail.value
    })
  },

  inputNum:function(e){
    this.setData({
      num:e.detail.value
    })
  },

  //计算服务费
  CaculateServiceFee:function(){
    let that = this;
    utils.requestLoading(get_serviceFee + "?sessionKey=" + sessionKey, "post", JSON.stringify({ bonusAmount: Number(that.data.money)}),'',
      function(res){
        if (res.Status == 5) {
          wx.removeStorageSync("sessionKey");
          utils.getSessionKey(utils.getSetting);
          return;
        }

        let totalMoney = res + Number(that.data.money)
        that.setData({
          serviceFee:res,
          totalPay:totalMoney        
        });
      },function(res){
        console.log(res)
      }
    )
  },

  //服务费声明
  getFeeExplain:function(){
    let that = this;
    utils.requestLoading(get_serviceFeeExplain + "?sessionKey=" + sessionKey, "post", "", "数据加载中...",
      function (res) {
        if (res.Status == 5) {
          wx.removeStorageSync("sessionKey");
          utils.getSessionKey(utils.getSetting);
          return;
        }
        
        if (res.wechatMsg != 'none') {
          wx.setStorageSync("serviceMsg", res.wechatMsg);
        }
      }, function (res) {
        console.log(res);
      }
    );
  },

  //语音提交微信服务器
  UploadVoiceFun: function (url,filePath,bonusId){
    console.log(filePath);
    wx.uploadFile({
      url: url+"?sessionKey="+sessionKey,
      filePath: filePath,
      formData: {
        'bonusId': bonusId
      },
      name: 'uploadfile_voice',
      header: {
        'content-type': 'multipart/form-data'
      },
      success: function (res) {
        if (res.Status == 5) {
          wx.removeStorageSync("sessionKey");
          utils.getSessionKey(utils.getSetting);
          return;
        }
        console.log("语音上传成功");
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },

  //开始录音
  touchdown:function(){
    let that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.record']) {
          that.starRecord();
        }else{
          wx.authorize({
            scope: 'scope.record',
            success() {
              return;
            }
          })
        }
      }
    });
  },

  starRecord:function(){
    let that = this;
    const options = {
      duration: 10000,
      sampleRate: 16000,
      numberOfChannels: 1,
      encodeBitRate: 96000,
      format: 'mp3',
      frameSize: 50,
    }
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log('recorder start')
      speaking.call(that);
      that.setData({
        isSpeaking: true
      })
    });
    recorderManager.onError((res) => {
      console.log(res);
    })
  },

  //停止录音
  touchup:function(){
    let that = this;
    wx.authorize({
      scope: 'scope.record',
      success() {
        recorderManager.stop();
        recorderManager.onStop((res) => {
          that.tempFilePath = res.tempFilePath;
          that.setData({
            isHasVioce: true,
            isSpeaking: false,
          });
          clearInterval(that.timer)
          // console.log('停止录音', res.tempFilePath)
        })
      }
    })
  },

  //播放录音
  playvoice:function(){
    console.log("点击播放")
    innerAudioContext.autoplay = true
    innerAudioContext.obeyMuteSwitch = false
    innerAudioContext.src = this.tempFilePath
    innerAudioContext.play()
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },

  //重置录音
  resetvoice:function(){
    innerAudioContext.stop();
    this.setData({
      isHasVioce: false
    });
    this.tempFilePath = '';
  },

  //选择对联
  chooseCouplet:function(){
    wx.navigateTo({
      url: '/pages/custom_couplet/custom_couplet'
    })
  },

  checkRecord:function(){
    wx.navigateTo({
      url: '/pages/redPacket_record/redPacket_record'
    })
  },

  withdrawTap:function(){
    wx.navigateTo({
      url: '/pages/redPacket_withdraw/redPacket_withdraw'
    })
  },

  //收起模态窗口
  bindModalTap: function () {
    this.setData({
      hideModalBg: true
    });
  },

  checkExplain:function(){
    wx.navigateTo({
      url: '/pages/serviceFee_statement/serviceFee_statement'
    })
  },

  askHelp: function () {
    wx.navigateTo({
      url: '/pages/questions/questions'
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