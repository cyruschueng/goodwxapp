//index.js 
//获取应用实例 
var app = getApp()
var UTIL = require('../../utils/util.js');
var GUID = require('../../utils/GUID.js');
var NLI = require('../../utils/NLI.js');

const appkey = require('../../config').appkey
const appsecret = require('../../config').appsecret

//微信小程序新录音接口，录出来的是aac或者mp3，这里要录成mp3
const mp3Recorder = wx.getRecorderManager()
const mp3RecoderOptions = {
  duration: 60000,
  sampleRate: 16000,
  numberOfChannels: 1,
  encodeBitRate: 48000,
  format: 'mp3',
  //frameSize: 50
}

//弹幕定时器
var timer;
var pageSelf = undefined;

var doommList = [];
class Doomm {
  constructor() {
    this.text = UTIL.getRandomItem(app.globalData.corpus);
    this.top = Math.ceil(Math.random() * 40);
    this.time = Math.ceil(Math.random() * 8 + 6);
    this.color = getRandomColor();
    this.display = true;
    let that = this;
    setTimeout(function () {
      doommList.splice(doommList.indexOf(that), 1);
      doommList.push(new Doomm());
      pageSelf.setData({
      doommData: doommList
      })
    }, this.time * 1000)
  }
}
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({ 
  onShareAppMessage: function () {
    var that = this
    console.log(that.data.id)
    return {
      title: '微信小程序之语音红包',
      desc: '最具人气的语音红包游戏!',
      path: '/pages/receiveMoney/receiveMoney?cid=' + that.data.id,
      success: function (res) {
        //console.log(that.data.id)
       }
    } 
  },
  data: {
    showView: false,
    showView1: true,
    showView2: true,
    showView3: false,
    openId: "",
    id:"",
    cid:"",
    items:"",
    m:1,
    j: 1,//帧动画初始图片 
    isSpeaking: false,//是否正在说话
    isPlay:false,
    outputTxt: "", //输出识别结果
    doommData: []
  },
  globalData: { 
    qid:"",   
    hid:'',
    words:'',
    RTtempFilePath:"",
  },
  initDoomm: function () {
    doommList.push(new Doomm());
    doommList.push(new Doomm());
    doommList.push(new Doomm());
    this.setData({
      doommData: doommList
    })
  },

  onLoad: function (res) {  
    if (res.cid){
      var hid= res.cid
    }else{
      var hid = getApp().globalData.id
    }
    getApp().globalData.qid = hid
    console.log("qid"+getApp().globalData.qid)
    var that = this

    
        //请求我的记录发出的接口数据
        wx.request({
          url: 'https://www.mqtp8.cn/applet/pay/hongBao', //红包页面的接口
          method: 'GET',
          header: {
            'Content-Type': 'application/json'
          },
          data: {
            openId: getApp().globalData.openId,
            id: getApp().globalData.qid,   
          },
          success: function (res) {
            var num = res.data[0].num
            // var record = res.data.record[0].openid
            var my = res.data.my
            getApp().globalData.words = res.data[0].words
            var isItem= res.data.record
            var my=res.data.my
            //console.log("my" + my)
            if (res.data[0].num == res.data[0].no){
              that.data.showView2 = false;
              that.data.showView3 = true;
              that.setData({
                showView2: false,
                showView3: true,
                items: res.data.record,
                my: res.data.my,
                id: res.data[0].id,
                words: res.data[0].words,
                imgUrl: res.data[0].headimgurl,
                name: res.data[0].nickname,
                publishTime: res.data[0].create_time,
                much: res.data[0].money,
                no: res.data[0].no,
                totle: res.data[0].num,
              })
            }
            if (res.data.my > 0) {
              console.log("dayu")
              var my = that.data
              console.log(that.data)
              that.data.showView = false;
              that.data.showView1 = true;
              console.log(that.data.showView1 )
              that.setData({
                showView: false,
                showView1: true,
                items: res.data.record,
                my:res.data.my,
                id: res.data[0].id,
                words: res.data[0].words,
                imgUrl: res.data[0].headimgurl,
                name: res.data[0].nickname,
                publishTime: res.data[0].create_time,
                much: res.data[0].money,
                no: res.data[0].no,
                totle: res.data[0].num,
              })
            }else {
              that.data.showView = true;
              that.data.showView1 = false;
              if (isItem == 0) {
                that.setData({
                  showView: true,
                  showView1: false,
                  id: res.data[0].id,
                  words: res.data[0].words,
                  imgUrl: res.data[0].headimgurl,
                  name: res.data[0].nickname,
                  publishTime: res.data[0].create_time,
                  much: res.data[0].money,
                  no: res.data[0].no,
                  totle: res.data[0].num,
                })
              }
              else {
                that.setData({
                  showView: true,
                  showView1: false,
                  items: res.data.record,
                  id: res.data[0].id,
                  words: res.data[0].words,
                  imgUrl: res.data[0].headimgurl,
                  name: res.data[0].nickname,
                  publishTime: res.data[0].create_time,
                  much: res.data[0].money,
                  no: res.data[0].no,
                  totle: res.data[0].num,
                })
              }
              }

            }   
    })


    pageSelf = this;
    this.initDoomm();
    // this.setData({
    //   name: app.globalData.nickName,
    //   imgUrl: app.globalData.avatarUrl,
    // });
    //onLoad中为录音接口注册两个回调函数，主要是onStop，拿到录音mp3文件的文件名（不用在意文件后辍是.dat还是.mp3，后辍不决定音频格式）
    mp3Recorder.onStart(() => {
      UTIL.log('mp3Recorder.onStart()...')
    })
    mp3Recorder.onStop((res) => {
      UTIL.log('mp3Recorder.onStop() ' + res)
      var tempFilePath = res.tempFilePath
      getApp().globalData.RTtempFilePath = res.tempFilePath;
      var urls = "https://api.happycxz.com/wxapp/mp32asr";
      console.log('dsafasdfasdfasdfasdfasf:' + getApp().globalData.RTtempFilePath)
      processFileUploadForAsr(urls, tempFilePath, this);
    })
  },
//语音播放
  playVoice: function(e){
    var id = e.currentTarget.dataset.openid;
    var vurl =e.currentTarget.dataset.vurl
    var _this = this;
    play.call(this);
    wx.playBackgroundAudio({
      dataUrl: e.currentTarget.dataset.vurl,
      success: function (res) {
        wx.onBackgroundAudioStop(
          function () {
            _this.setData({
              isPlay: false
            })
          }
        )
      },
    })
    this.setData({
      isPlay: id
    })
  },
  //我要发按钮
  goIndex: function () {
    wx.navigateTo({
      url: '../index/index'
    })
  },
  /////////////////////////////////////////////////////////////// 以下是调用新接口实现的录音，录出来的是 mp3
  touchdown: function () {
    //touchdown_mp3: function () {
    UTIL.log("mp3Recorder.start with" + mp3RecoderOptions)
    var _this = this;
    speaking.call(this);
    this.setData({
      isSpeaking: true
    })
    mp3Recorder.start(mp3RecoderOptions);
  },
  touchup: function () {
    //touchup_mp3: function () {
    UTIL.log("mp3Recorder.stop")
    this.setData({
      isSpeaking: false,
    })
    mp3Recorder.stop();
  },


  //切换到老版本
  turnToOld: function () {
    wx.navigateTo({
      url: '../index/index',
    })
  },

  /////////////////////////////////////////////////////////////// 以下是调用老接口实现的录音，录出来的是 silk_v3
  //手指按下 
  touchdown_silk: function () {
    //touchdown: function () {
    UTIL.log("手指按下了... new date : " + new Date)
    var _this = this;
    speaking.call(this);
    this.setData({
      isSpeaking: true
    })
    //开始录音 
    wx.startRecord({
      success: function (res) {
        //临时路径,下次进入小程序时无法正常使用
        var tempFilePath = res.tempFilePath;
        UTIL.log('record SUCCESS file path:' + tempFilePath)
        _this.setData({
          recordPath: tempFilePath
        });
      },
      fail: function (res) {
        //录音失败 
        wx.showModal({
          title: '提示',
          content: '录音的姿势不对!',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              UTIL.log('用户点击确定')
              return
            }
          }
        })
      }
    })
  },
  //手指抬起 
  touchup_silk: function () {
    //touchup: function () {
    UTIL.log("手指抬起了...")
    this.setData({
      isSpeaking: false,
    })
    clearInterval(this.timer)
    wx.stopRecord()

    var _this = this
    setTimeout(function () {
      var urls = "https://api.happycxz.com/wxapp/silk2asr/";
      UTIL.log(_this.data.recordPath);
      processFileUploadForAsr(urls, _this.data.recordPath, _this);
    }, 1000)
  },
})

//上传录音文件到 api.happycxz.com 接口，处理语音识别和语义，结果输出到界面
function processFileUploadForAsr(urls, filePath, _this) {
  wx.uploadFile({
    url: urls,
    filePath: filePath,
    name: 'file',
    formData: { "appKey": appkey, "appSecret": appsecret, "userId": UTIL.getUserUnique()},
    header: { 'content-type': 'multipart/form-data' },
    success: function (res) {
      console.log("返回路径查询"+res.data);
      var nliResult = getNliFromResult(res.data);
      console.log('nliResult:' + nliResult);
      var stt = getSttFromResult(res.data);
      console.log('stt:' + stt);

      var sentenceResult;
      try {
        sentenceResult = NLI.getSentenceFromNliResult(nliResult);
      } 
      catch (e) {
        console.log('touchup() 错误' + e.message + '发生在' + e.lineNumber + '行');
        sentenceResult = '没明白你说的，换个话题？'
      }
      var lastOutput = stt;
      _this.setData({
        outputTxt: lastOutput,
      });
      if (lastOutput == getApp().globalData.words){

          console.log("匹配成功")
          wx.uploadFile({
            url: 'https://www.mqtp8.cn/applet/getvoice/getvoice',
            filePath: filePath,
            name: 'file',
            success: function (res) {
              console.log(res.data)
              getApp().globalData.vurl = res.data;
              wx.request({
                url: 'https://www.mqtp8.cn/applet/pay/getMoney',
                method: 'GET',
                data: {
                  openid: getApp().globalData.openId,
                  hid: getApp().globalData.qid,
                  vurl: getApp().globalData.vurl
                },
                success: function (res) {
                  console.log("领取成功"+res)
                  wx.request({
                    url: 'https://www.mqtp8.cn/applet/pay/hongBao', //红包页面的接口
                    method: 'GET',
                    header: {
                      'Content-Type': 'application/json'
                    },
                    data: {
                      openId: getApp().globalData.openId,
                      id: getApp().globalData.qid,
                    },
                    success: function (res) {
                      _this.data.showView = false;
                      _this.data.showView1 = true;
                         _this.setData({                       
                             showView: false,
                             showView1: true,
                             items: res.data.record,
                             my: res.data.my,  
                             no: res.data[0].no,               
                        })
                         wx.showToast({
                           title: '领取成功',
                           icon: '',
                           duration: 1000
                         })
                        console.log(res.data)
                    }
                  })
                  
                }
              })
            }
          })
      }else{
        console.log("匹配失败")
      }
      wx.hideToast();
    },
    fail: function (res) {
      console.log(res);
      wx.showModal({
        title: '提示',
        content: "网络请求失败，请确保网络是否正常",
        showCancel: false,
        success: function (res) {
        }
      });
      wx.hideToast();
    }
  });
}

function getNliFromResult(res_data) {
  var res_data_json = JSON.parse(res_data);
  var res_data_result_json = JSON.parse(res_data_json.result);
  return res_data_result_json.nli;
}

function getSttFromResult(res_data) {
  var res_data_json = JSON.parse(res_data);
  var res_data_result_json = JSON.parse(res_data_json.result);
  return res_data_result_json.asr.result;
}
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
//语音播放动画
function play() {
  var _this = this;
  //话筒帧动画 
  var i = 1;
  this.timer = setInterval(function () {
    i++;
    i = i % 4;
    _this.setData({
      m: i
    })
  }, 200);
} 
