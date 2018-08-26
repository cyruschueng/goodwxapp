var util = require('../../utils/util.js');
var wechat = require('../../utils/weChat.js');
var qiniuUploader = require('../../utils/qiniuUploader.js');
var app = getApp();
var sign_key = app.globalData.sign_key;
var binfoUrl = app.globalData.binfoUrl;
var addscoreUrl = app.globalData.addscoreUrl;
var qntokenUrl = app.globalData.qntokenSrc;
var isiOS9 = app.globalData.isiOS9;
var sysWidth = app.globalData.sysWidth;
// var audioUrl = app.globalData.audioUrl;
var page = 0,source=1,lowAudio;
var touchDot = 0,touchDotY = 0,scrollDot=0;//触摸时的原点
var time = 0;//  时间记录，用于滑动时且时间小于1s则执行左右滑动
var interval = "";// 记录/清理 时间记录
var endStatus,canAdd = true,_result=0,resultFlag=false,stopFlag=false,scopeRecord=false;
//缓存答题记录
var m_book_id=null,m_status=1,m_index=0,m_grade=null,m_page=0,m_ans,m_res,m_cid;
//答题时间
var durationStart,durationEnd;
var text='',isLogin=true,audioUrl,sTime,eTime,textContent='';
var _that,sArr=[{score:'',flag:false},{score:'',flag:false},{score:'',flag:false},{score:'',flag:false},{score:'',flag:false},{score:'',flag:false}
    ,{score:'',flag:false},{score:'',flag:false},{score:'',flag:false},{score:'',flag:false},{score:'',flag:false}],Length=0,step=0;
//监控有效录音
var START,END,audioTimer,audioCount=60,canRecord=true;
//音频控制
const innerAudioContext = wx.createInnerAudioContext();
if(!isiOS9){
    innerAudioContext.autoplay = true;
}
innerAudioContext.onPlay(() => {
    _that.setData({audioStatus:true})
});
innerAudioContext.onWaiting(() => {
    console.log('waiting!!!')
});
innerAudioContext.onPause(() => {
    _that.setData({audioStatus:false})
});
innerAudioContext.onStop(() => {
    _that.setData({audioStatus:false})
});
innerAudioContext.onEnded(() => {
    _that.setData({audioStatus:false})
});
innerAudioContext.onError((res) => {

});
//录音控制
const recorderManager = wx.getRecorderManager();
const options = {
    duration: 60000,
    sampleRate: 8000,
    numberOfChannels: 1,
    encodeBitRate: 48000,
    format: 'mp3',
    // frameSize: 50
};
recorderManager.onStart(() => {
    console.log('recorder start');
    if(!innerAudioContext.paused){
        innerAudioContext.pause();
    }
    resultFlag = true;
    if(stopFlag){
        recorderManager.stop();
    }
})
var tokenStr = "bucket"+"abctime-wechat"+sign_key;
var tokenSign = "&sign="+util.SHA256(tokenStr);
recorderManager.onResume(() => {
    console.log('recorder resume')
})
recorderManager.onPause(() => {
    console.log('recorder pause')
})
recorderManager.onStop((res) => {
    console.log(qntokenUrl+tokenSign);
    resultFlag = false;
    stopFlag=false;
    console.log(_result);
    if(_result<600){
        _that.setData({showMessage: false});
        _that.showMessage('录音时间过短');
        return;
    }else if(_result>59000){
        _that.setData({sub_bg:false});
        _that.showMessage('时间过长,请重新录音');
        return;
    }
    else{
        wx.showLoading({
            title: '语音测评中..',
        });
        _that.setData({sub_bg:true});
        var tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
        qiniuUploader.upload(tempFilePath, (res) => {
            console.log(res);
            if(res.error){
                qiniuUploader.init();
            };
        audioUrl = 'http://ozwvght2d.bkt.clouddn.com/'+res.key;
        var fd={isLogin:false,jsonText:JSON.stringify(text),audioUrl:audioUrl};
        console.log(fd);
        wx.request({
            url:'https://cn-shanghai.aliyun.webginger.cloud.ssapi.cn/',
            data:fd,
            method:'POST',
            header: {"Content-Type": "application/x-www-form-urlencoded"},
            success:function (res) {
                console.log('xsRe',res.data);
                canRecord = true;
                wx.hideLoading();
                if(!res||res.data.error){
                    _that.setData({sub_bg:false});
                    _that.showMessage('测评失败,请重新录音');
                    return;
                }
                eTime = new Date().getTime();
                if(res.data.result.overall>=0){
                    console.log(app.globalData.lowscoreSrc);
                    if(res.data.result.overall>=60){
                        _that.setData({pageScore:res.data.result.overall});
                        _that.audioCtx.seek(0)
                        _that.audioCtx2.play();
                        _that.ani();
                    }else if(res.data.result.overall<60){
                        _that.audioCtx2.seek(0)
                        _that.setData({pageScore:res.data.result.overall});
                        _that.audioCtx.play();
                        _that.ani();
                    }
                }else{
                    // wx.hideLoading();
                    _that.setData({sub_bg:false});
                    _that.showMessage('测评失败,请重新录音');
                };
            },
            fail:function (res) {
                wx.hideLoading();
                _that.setData({sub_bg:false});
                _that.showMessage('测评失败,请重新录音');
            }
        })
    }, (error) => {
        wx.hideLoading();
        _that.setData({sub_bg:false});
        _that.showMessage('测评失败,请重新录音');
    }, {
        region:'NCN',
            key:wx.getStorageSync('openid')+new Date().getTime()+'.mp3',
            uploadURL: 'NCN',
            domain: 'ozwvght2d.bkt.clouddn.com/',
            uptokenURL: qntokenUrl+tokenSign,
    })
    }
});

recorderManager.onFrameRecorded((res) => {
    const { frameBuffer } = res
    console.log('frameBuffer.byteLength', frameBuffer.byteLength)
});
//得分动画
var animation = wx.createAnimation({
    duration:1000,
    transformOrigin: "50% 50%",
    timingFunction: "ease",
    delay: 0
});
var aniTimer;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    recordPath:'',
    url:'',
    coverFlag:true,
    page:0,
    audioStatus:false,
    bookData:{
        book_name:'book_name',
        book_cover:'',
        author:'Tom',
        illustrator:'',
        read_score_max:0,
        is_read:0,
        cid:null,
        pic:''
    },
    book_pic:'',
    pageData:[],
    pageNum:0,
    pageScore:'',
    starLeft:0,
    scrLeft:0,
    scrboxLeft:0,
    scrbtnWidth:50,
    bookH:null,
    speaking:false,
    speakText:'按住开始',
    scoreArr:[],
    canSubmit:false,
    showMessage: false,
    sub_bg:false,
    messageContent: '',
    animation: {},
    animationStatus:false,
    isIpx:app.globalData.isIpx?true:false,
    isIp5:app.globalData.isiOS8?true:false,
    lowSrc:'https://qnfile.abctime.com/lowscore.mp3',
    highSrc:'https://qnfile.abctime.com/hightscore.mp3',
    resultSrc:'https://qnfile.abctime.com/getcards.mp3',
    starFloat:'',
    scoreAni:false,
    endScore:0,
    indicatorDots: false,
    autoplay: false,
    currentPage:0,
    starX:100,
    starY:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      _that = this;
      var id = options.id;
      var pic = options.pic;
      // this.setData({book_pic:'../../images/icon/default_img.png'})
      wx.hideShareMenu();
      if(isiOS9){
          this.setData({audioStatus:false})
      };
      console.log(options);
      source = options.source;
      m_book_id = options.id;
      m_index = options.index;
      m_grade = parseInt(options.grade);
      m_cid = parseInt(options.cid);
      m_page = options.page;
      m_ans = options.ans;
      m_status = options.status;
      m_res = options.res;
      if(m_grade<10 || m_cid<10){
         wx.getSetting({
              success(res) {
                  if (!res.authSetting['scope.record']) {
                      wx.authorize({
                          scope: 'scope.record',
                          success() {
                          },
                          fail(){
                              wx.getSetting({
                                  success(res) {
                                      if (!res.authSetting['scope.record']) {
                                          wx.authorize({
                                              scope: 'scope.record',
                                              success() {
                                                  this.setData({audioStatus:false,coverFlag:false});
                                                  durationStart = new Date().getTime();
                                                  innerAudioContext.src = this.data.pageData[0].audio_path;
                                                  textContent = this.data.pageData[0].page_content;
                                                  if(!isiOS9){
                                                      innerAudioContext.play();
                                                  }
                                              },
                                              fail(){
                                                  wx.showModal({
                                                      title: '温馨提示',
                                                      content: '“录音”授权失败，允许授权后才可使用“跟读”功能。点击授权，可重新使用',
                                                      cancelText:'不授权',
                                                      confirmText:'授权',
                                                      success: res=>{
                                                      if (res.confirm) {
                                                      wx.openSetting({
                                                          success: function (res) {
                                                              if (!res.authSetting['scope.record']) {
                                                                  wx.authorize({
                                                                      scope: 'scope.record',
                                                                      success() {
                                                                          _that.setData({audioStatus:false,coverFlag:false});
                                                                          durationStart = new Date().getTime();
                                                                          innerAudioContext.src = _that.data.pageData[0].audio_path;
                                                                          textContent = _that.data.pageData[0].page_content;
                                                                          if(!isiOS9){
                                                                              innerAudioContext.play();
                                                                          }
                                                                      },
                                                                      fail() {
                                                                      }

                                                                  })
                                                              }
                                                          }
                                                      })
                                                  }
                                              }
                                              })
                                              }
                                          })
                                      }else{
                                          _that.setData({audioStatus:false,coverFlag:false});
                                          durationStart = new Date().getTime();
                                          innerAudioContext.src = _that.data.pageData[0].audio_path;
                                          textContent = _that.data.pageData[0].page_content;
                                          if(!isiOS9){
                                              innerAudioContext.play();
                                          }
                                      }
                                  }
                              })
                          }
                      })
                  }
              }
          })
      }
      page=0;
      var s = "id"+id+sign_key;
      var sign = util.SHA256(s);
      console.log(sign);
      var str = "?id="+id+"&sign="+sign;
      console.log(str);
      sArr=[{score:'',flag:false},{score:'',flag:false},{score:'',flag:false},{score:'',flag:false},{score:'',flag:false},{score:'',flag:false}
          ,{score:'',flag:false},{score:'',flag:false},{score:'',flag:false},{score:'',flag:false},{score:'',flag:false}]
      //获取绘本信息
      wx.request({
          url:binfoUrl+str,
          success:res=>{
              Length = res.data.data.bookpages.length;
              step = (Length-5)/Length*210/(Length-5);
              this.setData({bookData:res.data.data,pageData:res.data.data.bookpages,book_pic:res.data.data.pic,pageNum:res.data.data.bookpages.length,scrbtnWidth:5/Length*210})
              // this.imgLoad(res.data.data.pic);
          }
      });
      this.setData({scoreArr:sArr});
  },
    startRead:function () {
      var _that = this;
        if(m_grade<10 || m_cid<10){
            wx.getSetting({
                success(res) {
                    if (!res.authSetting['scope.record']) {
                        wx.authorize({
                            scope: 'scope.record',
                            success() {
                                this.setData({audioStatus:false,coverFlag:false});
                                durationStart = new Date().getTime();
                                innerAudioContext.src = this.data.pageData[0].audio_path;
                                textContent = this.data.pageData[0].page_content;
                                if(!isiOS9){
                                    innerAudioContext.play();
                                }
                            },
                            fail(){
                                wx.showModal({
                                    title: '温馨提示',
                                    content: '“录音”授权失败，允许授权后才可使用“跟读”功能。点击授权，可重新使用',
                                    cancelText:'不授权',
                                    confirmText:'授权',
                                    success: res=>{
                                    if (res.confirm) {
                                    wx.openSetting({
                                        success: function (res) {
                                            if (!res.authSetting['scope.record']) {
                                                wx.authorize({
                                                    scope: 'scope.record',
                                                    success() {
                                                        _that.setData({audioStatus:false,coverFlag:false});
                                                        durationStart = new Date().getTime();
                                                        innerAudioContext.src = _that.data.pageData[0].audio_path;
                                                        textContent = _that.data.pageData[0].page_content;
                                                        if(!isiOS9){
                                                            innerAudioContext.play();
                                                        }
                                                    },
                                                    fail() {
                                                    }

                                                })
                                            }
                                        }
                                    })
                                }
                            }
                            })
                            }
                        })
                    }else{
                        _that.setData({audioStatus:false,coverFlag:false});
                        durationStart = new Date().getTime();
                        innerAudioContext.src = _that.data.pageData[0].audio_path;
                        textContent = _that.data.pageData[0].page_content;
                        if(!isiOS9){
                            innerAudioContext.play();
                        }
                    }
                }
            })
        }else {
            this.setData({audioStatus:false,coverFlag:false});
            durationStart = new Date().getTime();
            innerAudioContext.src = this.data.pageData[0].audio_path;
            textContent = this.data.pageData[0].page_content;
            if(!isiOS9){
                innerAudioContext.play();
            }
        }
    },
    changeIndicatorDots: function(e) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },
    changeAutoplay: function(e) {
        this.setData({
            autoplay: !this.data.autoplay
        })
    },
    imgLoad:function (e) {
        // console.log(e);
        var w = e.detail.width;
        var h = e.detail.height;
        if(w>h){
            this.setData({bookH:h/w*610})
        }else {
            this.setData({bookH:h/w*420})
        }
    },
    pageChange:function (e) {
        page = e.detail.current;
        var p = e.detail.current;
        console.log(step*(p-4));
        if(!isiOS9){
            innerAudioContext.autoplay = true;
        }
        this.setData({audioStatus:false,page:p,scrLeft:(sysWidth/750)*95*(p-4),scrboxLeft:step*(p-4)>0?step*(p-4):0});
        innerAudioContext.src = this.data.pageData[p].audio_path;
        textContent = this.data.pageData[p].page_content;
    },
    //录音事件
    startRecode:function(){
        if(canRecord){
            canRecord = false;
            innerAudioContext.stop();
            innerAudioContext.autoplay = false;
            if(!innerAudioContext.paused){
                innerAudioContext.pause();
            }
            this.setData({speakText:'松开结束',speaking:true,audioStatus:false});
            clearInterval(audioTimer);
            audioTimer = setInterval(this.auTime,1000);
            recorderManager.start(options);
        }
        START = new Date().getTime();
    },
    endRecode:function(){
        this.setData({speakText:'按住开始',speaking:false});
        END = new Date().getTime();
        console.log('END',END);
        _result = END-START;
        console.log('_result',_result);
        if(_result<600){
            console.log('<<<<600');
            console.log(resultFlag);
            if(resultFlag){
                this.setData({showMessage: false});
                this.showMessage('录音时间过短');
                recorderManager.stop();
            }else {
                stopFlag = true;
            }
            return;
        }else {
            text = wechat.getEvalJson('_test',textContent.toLowerCase());
            recorderManager.stop();
        }
    },
    starScroll:function (e) {
    },
    scrollLower:function () {
        this.setData({scrboxLeft:step*(Length-5)})
    },
    scrollUpper:function () {
        this.setData({scrboxLeft:0})
},
    //点击星星跳页
    goPage:function (e) {
        page = e.currentTarget.dataset.page;
        this.setData({currentPage:e.currentTarget.dataset.page});
        var that = this;
        if(!isiOS9){
            innerAudioContext.autoplay = true;
        }
        var p = e.currentTarget.dataset.page;
        console.log(e.currentTarget.dataset.page)
        page = p;
        console.log(step)
        this.setData({audioStatus:false,page:p});
        this.setData({audioStatus:false,page:p,scrLeft:(sysWidth/750)*95*(p-4),scrboxLeft:(sysWidth/750)*95*p,scrboxLeft:step*(p-4)>0?step*(p-4):0});
        innerAudioContext.src = this.data.pageData[p].audio_path;
        textContent = this.data.pageData[p].page_content;
    },
    addScore:function () {
        if(canAdd){
            canAdd = false;
            var that = this;
            var op = wx.getStorageSync('openid');
            var l = this.data.pageData.length,sStr='',scoreStr='';
            var sA = this.data.scoreArr;
            durationEnd = new Date().getTime();
            var du = durationEnd-durationStart;
            var totalScore = 0;
            if(this.data.canSubmit){
                switch (parseInt(source)){
                    case 1:
                        for(var i=0;i<l;i++){
                            totalScore += sA[i].score;
                            sStr += sA[i].score+',';
                        }
                        scoreStr = sStr.substring(0,sStr.length-1);
                        console.log(scoreStr);
                        var s = 'book_id'+this.data.bookData.id+'duration'+du+'openid'+op+'score'+scoreStr+sign_key;
                        var sign = util.SHA256(s);
                        var fd={book_id:this.data.bookData.id,duration:du,openid:op,score:scoreStr,sign:sign};
                        console.log(fd);
                        wx.request({
                            url:addscoreUrl,
                            // data:JSON.stringify(fd),
                            data:fd,
                            method:'POST',
                            header: {"Content-Type": "application/x-www-form-urlencoded"},
                            success:function (res) {
                                console.log(res);
                                if(res.data.code==200){
                                    // that.showMessage('提交成功!');
                                    that.setData({scoreAni:true,endScore:Math.ceil(totalScore/l)});
                                    if(!innerAudioContext.paused){
                                        innerAudioContext.pause();
                                    }
                                    that.audioCtx.seek(0);
                                    that.audioCtx2.seek(0);
                                    that.audioCtx3.play();
                                    setTimeout(function () {
                                        that.setData({scoreAni:false})
                                        wx.reLaunch({
                                            url: '../../pages/index/index'
                                        })
                                    },3000);
                                }else {
                                    that.showMessage(res.data.msg);
                                    canAdd = true;
                                };
                            },
                            fail:function (res) {
                                canAdd = true;
                            }
                        })
                        break;
                    case 2:
                        for(var i=0;i<l;i++){
                            totalScore += sA[i].score;
                        }
                        if(m_grade>9){
                            setTimeout(function () {
                                wx.redirectTo({
                                    url: '../../pages/match/match?flag=1&book_id='+m_book_id+'&index='+m_index+'&grade='+m_grade+"&time="+du+"&page="+m_page+'&duration='+du+'&ans='+m_ans+'&res='+m_res+'&status='+m_status,
                                })
                            },1200);
                            canAdd = true;
                        }else if(m_grade<=9){
                            that.setData({scoreAni:true,endScore:Math.ceil(totalScore/Length)});
                            if(!innerAudioContext.paused){
                                innerAudioContext.pause();
                            }
                            that.audioCtx.seek(0);
                            that.audioCtx2.seek(0);
                            that.audioCtx3.play();
                            setTimeout(function () {
                                that.setData({scoreAni:false})
                                wx.redirectTo({
                                    url: '../../pages/match/match?flag=1&book_id='+m_book_id+'&index='+m_index+'&grade='+m_grade+"&score="+parseInt(totalScore/Length)+"&time="+du+"&page="+m_page+'&duration='+du+'&ans='+m_ans+'&res='+m_res+'&status='+m_status,
                                })
                            },3000);
                            canAdd = true;
                        }
                        break;
                    default:
                        canAdd = true;
                        break;
                }
            }else {
                canAdd = true;
            };
        }
    },
    outScore:function () {
        console.log(parseInt(source));
        innerAudioContext.stop();
        durationEnd = new Date().getTime();
        var du = durationEnd-durationStart;
        switch (parseInt(source)){
            case 1:
                wx.reLaunch({
                    url: '../../pages/index/index'
                });
                break;
            case 2:
                if(m_grade>9){
                    wx.redirectTo({
                        url: '../../pages/match/match?flag=1&book_id='+m_book_id+'&index='+m_index+'&grade='+m_grade+"&time="+du+"&page="+m_page+'&duration='+du+'&ans='+m_ans+'&res='+m_res+'&status='+m_status,
                    })
                }
                break;
            default:
                break;
        }
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      this.animation = wx.createAnimation({
          duration:1200,
          timingFunction: 'ease',
          delay:100,
          transformOrigin: '50% 50%',
      });
      this.audioCtx = wx.createAudioContext('lowAudio');
      this.audioCtx2 = wx.createAudioContext('highAudio');
      this.audioCtx3 = wx.createAudioContext('resultAudio');
  },
  audioPlay:function () {
      if(!innerAudioContext.paused){
          innerAudioContext.pause();
      }else {
          innerAudioContext.play();
      };
  },
  showMessage: function(text) {
        var that = this
        that.setData({
            showMessage: true,
            messageContent: text
        })
        setTimeout(function(){
            that.setData({
                showMessage: false,
                messageContent: ''
            })
            canRecord = true;
        }, 1200)
    },
  auTime:function () {
    audioCount--;
    if(audioCount == 0){
        this.endRecode();
        clearInterval(audioTimer);
        audioCount = 60;
        return;
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      canAdd = true;
  },
    ani:function () {
        this.setData({animationStatus:true});
        aniTimer = setInterval(this.stopAni,2000)
    },
    stopAni:function () {
        this.setData({sub_bg:false});
        clearInterval(aniTimer);
        this.setData({animationStatus:false});
        // return;
        if(sArr[page].score==''||sArr[page].score<this.data.pageScore){
            sArr[page].score=this.data.pageScore;
            sArr[page].flag=true;
            this.setData({scoreArr:sArr});
        }
        for(var j=0;j<Length;j++){
            if(!sArr[j].flag){
                this.setData({canSubmit:false});
                return
            }else {
                this.setData({canSubmit:true});
            };
        }

    },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
      innerAudioContext.stop();
      recorderManager.stop();
      // recorderManager.pause();
      this.setData({speakText:'按住开始',speaking:false});
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
      innerAudioContext.stop();
      recorderManager.stop();
      // recorderManager.pause();
      this.setData({speakText:'按住开始',speaking:false});
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
})


