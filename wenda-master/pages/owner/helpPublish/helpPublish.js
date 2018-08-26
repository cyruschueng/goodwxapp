import {GET,POST,promisify} from '../../../libs/request.js';
import {server, imgServer, wxappServer } from '../../../libs/config.js';
var APP = getApp();
var arr = [];
var tempFilePath = "";
var recordingTime = "";

Page({
    data: {
        ifPublish: false,
        placeholder: '请输入问题内容，预计5分钟内即可收到回答。24小时内无人抢答，将会全额退款',
        picPath: [],
        textAreaVal: "",
        textLength: 0,
        recordingTime: "0:00",
        ifShowRule: true,
        inputFocus: false,
        ifShowToast: true,
        ifKeyboard: true,
        ifStartRecord: false,
        ifRecording: false,
        ifFinishRecord: false,
        playRecordIcon: true,
        fromLeftSide: true,
        recordSeconds: 0,
        recordSrc: "",
        pause: false
  },
  onLoad: function() {
    if (!APP.globalData.sid) {
        APP.login();
    }  
    wx.removeStorage({
      key: 'record',
      success: function(res){
        // success
      }
    })
  },
  onShow: function() {
      let This = this;
      wx.getStorage({
        key: 'record',
        success: function(res){
          This.setData({
              recordSeconds: This.formatToSeconds(res.data.recordingTime),
              ifStartRecord: true,
              ifFinishRecord: true,
              ifRecording : false,
              fromLeftSide: true,
          });
          tempFilePath = res.data.tempFilePath;
          console.log(tempFilePath)
        },
        fail: function() {
         tempFilePath = "";
        },
        complete: function() {
          // complete
        }
      })
  },
  onHide: function() {
    clearInterval(recordingTime);
    let This = this;
    let data = {};
    if (This.data.ifRecording) {
        console.log('开始');
        wx.stopRecord({
            success: function(){
                This.setData({
                    pause: true
                });
                console.log('进行中');
            },
            fail: function() {
            // fail
            },
            complete: function() {
            // complete
            }
        })
       
        setTimeout(function () {
            let data = {
                'tempFilePath': tempFilePath,
                'recordingTime': This.data.recordingTime
            }
            wx.setStorage({
                key: "record",
                data: data
            })
        },500)
    } 
     else if (this.data.ifFinishRecord) {
         let data = {
            'tempFilePath': tempFilePath,
            'recordingTime': this.data.recordingTime
         }
        wx.setStorage({
            key: "record",
            data: data
        })
    }       
  },
  
  changeInputState: function() {
    let This = this;
    let ifKeyboard = this.data.ifKeyboard
    if (!ifKeyboard && (this.data.ifRecording || this.data.ifFinishRecord)) {
          wx.showModal({
            title: '温馨提示',
            content: '是否放弃已录音内容',
            success: function(res) {
                if (res.confirm) {
                    if (This.data.ifRecording) {
                        This.stopRecordEv();
                    }
                    else {
                        clearInterval(recordingTime);    
                        This.giveUpRecording();
                    }
                }
            }
        })
      }
      else if (ifKeyboard && this.data.textAreaVal.length > 0) {
            wx.showModal({
            title: '温馨提示',
            content: '是否放弃已输入内容',
            success: function(res) {
                if (res.confirm) {
                    This.setData({
                        ifKeyboard: false,
                        ifStartRecord: false,
                        ifFinishRecord: false,
                        ifRecording : false,
                        textAreaVal: "",
                        textLength: 0
                    });
                }
            }
        })
      }
      else {
          this.setData({
            ifKeyboard: !ifKeyboard
          })
      }
  },
  textInput: function(e) {
     let result = this.bothTrim(e.detail.value);
     let length = result.length;
     this.setData({
         textLength: length,
         textAreaVal: result
     });
  },
  stopRecordEv: function() {
    let This = this; 
    wx.stopRecord({
        success: function(){
            
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
  },
  giveUpRecording: function() {
    tempFilePath = "";  
    this.setData({
        ifKeyboard: !this.data.ifKeyboard,
        fromLeftSide: true,
        ifStartRecord: false,
        ifFinishRecord: false,
        ifRecording : false,
        recordingTime: "0:00",
        recordSrc: "",
        recordSeconds: 0,
    });
  },
  startRecordEv: function() {
    let This = this;  
    this.setData({
        ifStartRecord: !this.data.ifStartRecord,
        ifRecording : !this.data.ifRecording
    });
    let n = 0;
    recordingTime = setInterval(function(){
        n++;
        This.setData({
            recordingTime: This.formatRecordTime(n)
        })
    },1000)
    console.log(this.data.navigationBarTitleText)
    wx.startRecord({
        success: function(res){
            clearInterval(recordingTime);
            if (This.data.ifRecording && !This.data.ifPublish && This.data.fromLeftSide && This.data.recordingTime != '1:00' && !This.data.pause) {
                This.giveUpRecording();
                return;
            }
            console.log('我到这里啦');  
            This.setData({
                ifFinishRecord: !This.data.ifFinishRecord,
                ifRecording : !This.data.ifRecording,
                recordSeconds: This.formatToSeconds(This.data.recordingTime),
                ifPublish: false
            });  
          tempFilePath = res.tempFilePath;
          let key = 'wxapp/vote' + new Date().getTime() + ".silk";
          This.voiceUploadServerEv(key,tempFilePath,0,This.voiceCompleteCb);
        },
        fail: function(res) {
          clearInterval(recordingTime);
          This.setData({
                ifStartRecord: false,
                ifRecording: false,
                ifFinishRecord: false,
                playRecordIcon: true,
                fromLeftSide: true,
                recordSeconds: 0,
                recordingTime: "0:00",
                recordSrc: "",
                pause: false
            }); 
        },
        complete: function() {
          clearInterval(recordingTime);
        }
      });
  },
  finishRecordEv: function() {
    this.stopRecordEv();
    this.setData({
        fromLeftSide: false
    })
  },
  playRecordEv: function() {
      wx.playVoice({
          filePath: tempFilePath,
          complete: function(){
        }
    })
  },
  reRecordEv: function() {
      clearInterval(recordingTime);
      tempFilePath = "";
        this.setData({
            ifStartRecord: false,
            ifFinishRecord: false,
            ifRecording : false,
            recordingTime: "0:00",
            fromLeftSide: true,
            recordSrc: "",
            recordSeconds: 0
        });
  },
  formatRecordTime: function(n) {
      if (n == 60) {
          clearInterval(recordingTime);
          return '1:00';
      }
      else {
        return n <= 9 ? '0:' + 0 + n :'0:'+ n; 
      }
  },
  formatToSeconds: function(time) {
    let arr = time.split(':');
    return arr[0] == '1' ? 60 : arr[1];
  },
  publishEv: function() {
      // this.setData({
      //     customSwitch: true
      // })
      if (!this.data.ifPublish) {
          this.setData({
              ifPublish: true
          });
          var This = this;
          let content = "";
          let voiceUrl = "";
          let helpType = 2;
          let web = 0;
          let data = {};
          setTimeout(function() {
              //var cardDesc = This.bothTrim(This.data.textAreaVal);
              if (This.data.ifKeyboard) {
                    content = This.data.textAreaVal;
                    if (!This.trim(content,"g")) {
                        This.showToast("请输入问题内容");
                        This.setData({
                            ifPublish: false
                        });
                        return;
                    }
                    else if (content.length < 4) {
                        This.showToast("内容不能少于4个字");
                        This.setData({
                            ifPublish: false
                        });
                        return;
                    } 
              } else {
                  helpType = 1;
                  if (This.data.recordSrc) {
                    voiceUrl = This.data.recordSrc.split('/wxapp/')[1];
                  } 
              }
              
              let sid = APP.globalData.sid;
              let arr = This.data.picPath;
              let resourcesArr = [];
              arr.forEach((item) => {
                  resourcesArr.push(item.split('/wxapp/')[1]);
              });
              if (helpType == 2) {
                  data = {content,helpType, sid,web}
              } else {
                  data = {voiceUrl,helpType, sid,web}
              }
              if (resourcesArr.length > 0) {
                  let resources = resourcesArr.join(",");
                   if (helpType == 2) {
                        data = {content,helpType,resources,sid,web}
                    } else {
                        data = {voiceUrl,helpType,resources,sid,web}
                    }
              }
              if (This.data.ifRecording) {
                    wx.showModal({
                        title: '温馨提示',
                        content: '确定停止录音吗',
                        success: function(res) {
                            if (res.confirm) {
                                This.stopRecordEv();
                            }
                            else {
                                This.setData({
                                    ifPublish: false
                                }); 
                            }
                        }
                    })
                    return;
              };
                if (!This.data.recordSrc && !This.data.ifKeyboard) {
                    This.showToast("录音内容不能为空");
                    This.setData({
                        ifPublish: false
                    });
                    return;
                }
              This.sendRequest(data);
          },500)
      }
  },
    sendRequest: function(data) {
        let This = this;
         wx.request({
            url: wxappServer + '/help/add',
            data: data,
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            }, // 设置请求的 header
            success: function (res) {
                if (res.data.suc === '200') {
                    let helpId = res.data.data.helpId;
                    setTimeout(function() {
                        This.payMoney(res.data.data.wxPay, helpId,res.data.errCode);
                    },300)
                }
                else {
                    This.setData({ifPublish: false});
                    arr = [];
                }
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
    },
     payMoney(obj,id,errCode) {
         let This = this;
         wx.requestPayment({
           timeStamp: obj.timeStamp,
           nonceStr: obj.nonceStr,
           package: obj.pack,
           signType: obj.signType,
           paySign: obj.sign,
           success: function(res){
            APP.globalData.helpId = id;
            wx.removeStorage({
                key: 'record',
                    success: function(res){
                        // success
                    }
                })
            if (errCode === 'WA_ERROR_20000029') {
                    This.setData({ifPublish: false});
                    wx.redirectTo({
                        url: '../helpTransitionTip/helpTransitionTip?keyWord=m'
                    })
                }
            else {
                wx.redirectTo({
                    url: '../helpDetail/helpDetail?fromPage=b&publish=t'
                })
            }    
           },
           fail: function(res) {
             This.setData({
                ifPublish: false
            });
           },
           complete: function(res) {
             // complete
           }
         })
     },
     trim: function(str,is_global) {
        var result;
        result = str.replace(/(^\s+)|(\s+$)/g,"");
        if(is_global.toLowerCase()=="g")
        {
            result = result.replace(/\s/g,"");
            }
        return result;
    },
     bothTrim: function(str) { //删除左右两端的空格
　　     return str.replace(/(^\s*)|(\s*$)/g, "");
　　 },
     showToast: function (title) {
        var This = this;
        this.setData({
            ifShowToast: false,
            toastTitle: title
        })
        setTimeout(function () {
            This.setData({
                ifShowToast: true,
                toastTitle: ''
            })
        }, 2000)
    },
    uploadPic:function() { 
      var This = this;
      if (this.data.ifRecording) {
        wx.showModal({
            title: '温馨提示',
            content: '确定停止录音吗',
            success: function(res) {
                if (res.confirm) {
                    This.finishRecordEv();
                }
            }
        })
      } else {
            wx.chooseImage({
            count: 4, 
            sizeType: ['original'], 
            sourceType: ['album'],
            success: function (res) {
                var tempFilePaths = res.tempFilePaths;
                for (let i = 0;i < tempFilePaths.length;i++) {
                    var key = 'wxapp/vote' + new Date().getTime() + ".jpg";
                    This.picUploadServerEv(key, tempFilePaths[i],i, This.textImgCompleteCb);
                }
            },
            fail: function (res) {
                //console.log(JSON.stringify(res));
                // fail
            },
            complete: function (res) {
                console.log(JSON.stringify(res));
                // complete
            }
        })
      }
  },
  picUploadServerEv(key, imgUrl, index, callback) {   //图片上传核心函数
        var This = this;
        wx.showToast({
            title: '上传中...',
            icon: 'loading',
            mask: true
        })
        wx.uploadFile({
            url: wxappServer + 'upload/img',
            filePath: imgUrl,
            name: key,
            header: { "Content-Type": "multipart/form-data" },
            formData: {
                sid: APP.globalData.sid
            },
            success: function (res) {
                var url = JSON.parse(res.data).data;
                wx.hideToast()
                callback.call(This, index, url);
            },
            fail: function () {
                wx.hideToast();
                wx.showToast({
                    title: '上传失败',
                    mask: true,
                    duration: 1000
                })
            },
            complete: function () {
                // complete
            }
        })
    },
    textImgCompleteCb(index, url) {
        let imgSrc = imgServer + url;
        if (this.data.picPath.length >= 4) {
            this.showToast("最多4张图片");
            return;
        }
        this.data.picPath.push(imgSrc);
        this.setData({
            picPath: this.data.picPath
        });
    },
    voiceUploadServerEv(key, imgUrl, index, callback) {   //图片上传核心函数
        var This = this;
        wx.uploadFile({
            url: wxappServer + 'upload/img',
            filePath: imgUrl,
            name: key,
            header: { "Content-Type": "multipart/form-data" },
            formData: {
                sid: APP.globalData.sid
            },
            success: function (res) {
                var url = JSON.parse(res.data).data;
                callback.call(This, index, url);
            },
            fail: function () {
               console.log('fail')
            },
            complete: function () {
                // complete
            }
        })
    },
    voiceCompleteCb(index, url) {
        let recordSrc = imgServer + url;
        this.setData({
            recordSrc: recordSrc
        });
    },
    textTextareaEv(e) {
        let detail = e.detail.value;
        this.setData({
            'textAreaVal': detail
        })
    },
    deletePicEv(e) {
        let index = e.currentTarget.dataset.index;
        this.data.picPath.splice(index,1);
        this.setData({
            picPath: this.data.picPath
        })
    },
    showRule() {  
        this.setData({
            'ifShowRule': false
        });
    },
    hideRules(){
        this.setData({
            ifShowRule:true
        })
  },
    getFocus() {
        this.setData({
            'inputFocus': true
        })
    }
})