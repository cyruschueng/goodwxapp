var util = require('../../utils/util.js');
var wechat = require('../../utils/weChat.js');
var qiniuUploader = require('../../utils/qiniuUploader.js');
var app = getApp();
var sign_key = app.globalData.sign_key;
var binfoUrl = app.globalData.binfoUrl;
var addscoreUrl = app.globalData.addscoreUrl;
var audioBaseUrl = app.globalData.audioBaseUrl;
var addspeakUrl = app.globalData.addspeakUrl;
var qntokenUrl = app.globalData.qntokenSrc;
var isiOS9 = app.globalData.isiOS9;
var sysWidth = app.globalData.sysWidth;
var page = 0,source=1,lowAudio,readTimes=0,member_id,id;
var endStatus,canAdd = true,_result=0,resultFlag=false,stopFlag=false,scopeRecord=false;
var durationStart,durationEnd;
var text='',isLogin=true,audioUrl,sTime,eTime,textContent='';
var _that,sArr=[{score:'',flag:false},{score:'',flag:false},{score:'',flag:false},{score:'',flag:false},{score:'',flag:false},{score:'',flag:false},{score:'',flag:false},{score:'',flag:false},{score:'',flag:false},
    {score:'',flag:false},{score:'',flag:false},{score:'',flag:false},{score:'',flag:false},{score:'',flag:false}],Length=0,step=0;
var auArr = ['','','','','','','','','','','','','','','','','','','',''];
//监控有效录音
var START,END,audioTimer,audioCount=60,canRecord=true;
//音频控制
const innerAudioContext = wx.createInnerAudioContext();
if(!isiOS9){
    innerAudioContext.autoplay = true;
}
innerAudioContext.onPlay(() => {
    console.log('onplay...')
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
    console.log(res)
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
console.log(qntokenUrl+tokenSign);
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
        audioUrl = audioBaseUrl+res.key;
        console.log(audioUrl);
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
                    readTimes++;
                    if(res.data.result.overall>=60){
                        _that.setData({pageScore:res.data.result.overall,audioUrl:audioUrl});
                        _that.audioCtx.seek(0)
                        _that.audioCtx2.play();
                        _that.ani();
                    }else if(res.data.result.overall<60){
                        _that.audioCtx2.seek(0)
                        _that.setData({pageScore:res.data.result.overall,audioUrl:audioUrl});
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
            // domain: 'ozwvght2d.bkt.clouddn.com/',
            domain: audioBaseUrl,
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
    words_num:0,
    pageScore:'',
    audioUrl:'',
    starLeft:0,
    scrLeft:0,
    scrboxLeft:0,
    scrbtnWidth:50,
    bookH:null,
    speaking:false,
    speakText:'按住开始',
    scoreArr:[],
    audioArr:[],
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
      id = options.id;
      var pic = options.pic;
      if(isiOS9){
          this.setData({audioStatus:false})
      };
      page=0;
      member_id = wx.getStorageSync('memberId');
      // var s = "member_id"+member_id+"id"+id+sign_key;
      var s = "id"+id+sign_key;
      var sign = util.SHA256(s);
      var str = "?id="+id+"&sign="+sign;
      // var str = "?member_id="+member_id+"&id="+id+"&sign="+sign;
      console.log(binfoUrl+str);
      sArr=[{score:'',flag:false},{score:'',flag:false},{score:'',flag:false},{score:'',flag:false},{score:'',flag:false},{score:'',flag:false},{score:'',flag:false},{score:'',flag:false},{score:'',flag:false}
          ,{score:'',flag:false},{score:'',flag:false},{score:'',flag:false},{score:'',flag:false},{score:'',flag:false}]
      //获取绘本信息
      wx.request({
          url:binfoUrl+str,
          success:res=>{
              console.log(res);
              Length = res.data.data.bookpages.length;
              step = (Length-5)/Length*210/(Length-5);
              this.setData({bookData:res.data.data,pageData:res.data.data.bookpages,book_pic:res.data.data.pic,words_num:res.data.data.words_num,pageNum:res.data.data.bookpages.length,scrbtnWidth:5/Length*210})
              // this.imgLoad(res.data.data.pic);
          }
      });
      this.setData({scoreArr:sArr});
      // wx.getSetting({
      //     success(res) {
      //         if (!res.authSetting['scope.record']) {
      //             wx.authorize({
      //                 scope: 'scope.record',
      //                 success() {
      //                 },
      //                 fail(){
      //                     wx.getSetting({
      //                         success(res) {
      //                             if (!res.authSetting['scope.record']) {
      //                                 wx.authorize({
      //                                     scope: 'scope.record',
      //                                     success() {
      //                                         this.setData({audioStatus:false,coverFlag:false});
      //                                         durationStart = new Date().getTime();
      //                                         innerAudioContext.src = this.data.pageData[0].audio_path;
      //                                         textContent = this.data.pageData[0].page_content;
      //                                         if(!isiOS9){
      //                                             innerAudioContext.play();
      //                                         }
      //                                     },
      //                                     fail(){
      //                                         wx.showModal({
      //                                             title: '温馨提示',
      //                                             content: '“录音”授权失败，允许授权后才可使用“跟读”功能。点击授权，可重新使用',
      //                                             cancelText:'不授权',
      //                                             confirmText:'授权',
      //                                             success: res=>{
      //                                             if (res.confirm) {
      //                                             wx.openSetting({
      //                                                 success: function (res) {
      //                                                     if (!res.authSetting['scope.record']) {
      //                                                         wx.authorize({
      //                                                             scope: 'scope.record',
      //                                                             success() {
      //                                                                 _that.setData({audioStatus:false,coverFlag:false});
      //                                                                 durationStart = new Date().getTime();
      //                                                                 innerAudioContext.src = _that.data.pageData[0].audio_path;
      //                                                                 textContent = _that.data.pageData[0].page_content;
      //                                                                 if(!isiOS9){
      //                                                                     innerAudioContext.play();
      //                                                                 }
      //                                                             },
      //                                                             fail() {
      //                                                             }
      //
      //                                                         })
      //                                                     }
      //                                                 }
      //                                             })
      //                                         }
      //                                     }
      //                                     })
      //                                     }
      //                                 })
      //                             }else{
      //                                 _that.setData({audioStatus:false,coverFlag:false});
      //                                 durationStart = new Date().getTime();
      //                                 innerAudioContext.src = _that.data.pageData[0].audio_path;
      //                                 textContent = _that.data.pageData[0].page_content;
      //                                 if(!isiOS9){
      //                                     innerAudioContext.play();
      //                                 }
      //                             }
      //                         }
      //                     })
      //                 }
      //             })
      //         }
      //     }
      // });
  },
    toRank:function () {
      wx.navigateTo({
        url: '../../pages/rankinglist/rankinglist?name='+this.data.bookData.book_name+'&book_id='+this.data.bookData.id+'&member_id='+member_id,
      })
    },
    startRead:function () {
      var _that = this;
      console.log(this.data.pageData);
      wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.record']) {
                    wx.authorize({
                        scope: 'scope.record',
                        success() {
                            console.log('111111111');
                            _that.setData({audioStatus:false,coverFlag:false});
                            durationStart = new Date().getTime();
                            innerAudioContext.src = _that.data.pageData[0].audio_path;
                            textContent = _that.data.pageData[0].page_content;
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
                                                    console.log('22222222');
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
                    console.log('333333333');
                    console.log(_that.data.pageData[0].audio_path);
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
        this.setData({audioStatus:false,page:p,scrLeft:(sysWidth/750)*100*(p-4),scrboxLeft:step*(p-4)>0?step*(p-4):0});
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
        this.setData({audioStatus:false,page:p,scrLeft:(sysWidth/750)*100*(p-4),scrboxLeft:(sysWidth/750)*100*p,scrboxLeft:step*(p-4)>0?step*(p-4):0});
        innerAudioContext.src = this.data.pageData[p].audio_path;
        textContent = this.data.pageData[p].page_content;
    },
    addScore:function () {
        if(canAdd){
            canAdd = false;
            var that = this;
            var op = wx.getStorageSync('openid');
            var l = this.data.pageData.length,sStr='',scoreStr='',auStr='',audios = [];
            var sA = this.data.scoreArr;
            durationEnd = new Date().getTime();
            var du = durationEnd-durationStart;
            var totalScore = 0;
            if(this.data.canSubmit){
                for(var i=0;i<l;i++){
                    totalScore += sA[i].score;
                    sStr += sA[i].score+',';
                    auStr += that.data.audioArr[i]+',';
                    audios.push(this.data.audioArr[i])
                }
                scoreStr = sStr.substring(0,sStr.length-1);
                console.log(scoreStr);
                var s = 'audio_json'+auStr+'book_id'+this.data.bookData.id+'cid'+this.data.bookData.cid+'duration'+du+'member_id'+member_id+'score'+scoreStr+'words_num'+this.data.bookData.words_num+sign_key;
                var sign = util.SHA256(s);
                var fd={audio_json:auStr,book_id:this.data.bookData.id,cid:this.data.bookData.cid,duration:du,member_id:member_id,score:scoreStr,words_num:this.data.bookData.words_num,sign:sign};
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
                            var d = new Date();
                            var today = d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate();
                            console.log(parseInt(wx.getStorageSync(today)));
                            console.log(du);
                            wx.setStorageSync(today, parseInt(wx.getStorageSync(today)||0)+du);
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
                                wx.redirectTo({
                                    url: '../../pages/rankinglist/rankinglist?myAudio='+JSON.stringify(audios)+'&name='+that.data.bookData.book_name+'&book_id='+that.data.bookData.id+'&member_id='+member_id+'&score='+parseInt(totalScore/l)
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
            }else {
                canAdd = true;
            };
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
      this.setData({audioStatus:!this.data.audioStatus});
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
      readTimes = 0;
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
            auArr[page]=this.data.audioUrl;
            console.log(page)
            console.log(this.data.audioUrl)
            console.log(auArr);
            this.setData({scoreArr:sArr,audioArr:auArr});
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
      console.log(readTimes);
      var s = 'member_id'+member_id+'speak_num'+readTimes+sign_key;
      var sign = util.SHA256(s);
      var fd={member_id:member_id,speak_num:readTimes,sign:sign};
      console.log(fd);
      wx.request({
          url:addspeakUrl,
          data:fd,
          method:'POST',
          header: {"Content-Type": "application/x-www-form-urlencoded"},
          success:function (res) {
              console.log(res);
              if(res.data.code==200){

              }else {
              };
          },
          fail:function (res) {
          }
      })
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
  onShareAppMessage: function (res) {
      var that = this;
      return {
          title: '和我一起来ABCtime开口说英语吧！',
          path: '/pages/index/index?to=book&id='+id,
          imageUrl:'/images/index/share_readingUrl.png',
          success: function(res) {
              console.log(res);
          },
          fail: function(res) {
              console.log(res);
          }
      }
  }
})


