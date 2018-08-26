import {GET,POST,promisify} from '../../../libs/request.js';
import {server, imgServer, wxappServer } from '../../../libs/config.js';
var mta = require('../../../libs/mta_analysis.js');
var APP = getApp();
var arr = [];
var tempFilePath = "";
var recordingTime = "";
var id = null;
Page({
    data: {
        ifPublish: false,
        placeholder: '请输入回答内容（必填，4~300字）',
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
        closeImg:"../../../images/wrong.png"

  },
  onLoad: function(options) {
    if (!APP.globalData.sid) {
        APP.login();
    }
    id = APP.globalData.helpId;
  },
//   changeInputState: function() {
//     let This = this;
//     let ifKeyboard = this.data.ifKeyboard
//     if (!ifKeyboard && (this.data.ifRecording || this.data.ifFinishRecord)) {
//           wx.showModal({
//             title: '温馨提示',
//             content: '是否放弃已录音内容',
//             success: function(res) {
//                 if (res.confirm) {
//                     if (This.data.ifRecording) {
//                         This.stopRecordEv();
//                     }
//                     else {
//                         clearInterval(recordingTime);    
//                         This.giveUpRecording();
//                     }
//                 }
//             }
//         })
//       }
//       else if (ifKeyboard && this.data.textAreaVal.length > 0) {
//             wx.showModal({
//             title: '温馨提示',
//             content: '是否放弃已输入内容',
//             success: function(res) {
//                 if (res.confirm) {
//                     This.setData({
//                         ifKeyboard: false,
//                         ifStartRecord: false,
//                         ifFinishRecord: false,
//                         ifRecording : false,
//                         textAreaVal: "",
//                         textLength: 0
//                     });
//                 }
//             }
//         })
//       }
//       else {
//           this.setData({
//             ifKeyboard: !ifKeyboard
//           })
//       }
//   },
  textInput: function(e) {
     //let result = this.bothTrim(e.detail.value);
     let length = e.detail.value.length;
     this.setData({
         textLength: length
     });
  },
      getTextValue: function(e) {
        let result = e.detail.value;
         this.setData({
             textAreaVal: result
        });
    },
//   stopRecordEv: function() {
//     let This = this; 
//     wx.stopRecord({
//         success: function(){
            
//         },
//         fail: function() {
//           // fail
//         },
//         complete: function() {
//           // complete
//         }
//       })
//   },
//   giveUpRecording: function() {
//     tempFilePath = "";  
//     this.setData({
//         ifKeyboard: !this.data.ifKeyboard,
//         fromLeftSide: true,
//         ifStartRecord: false,
//         ifFinishRecord: false,
//         ifRecording : false,
//         recordingTime: "0:00",
//         recordSrc: "",
//         recordSeconds: 0
//     });
//   },
//   startRecordEv: function() {
//     let This = this;  
//     this.setData({
//         ifStartRecord: !this.data.ifStartRecord,
//         ifRecording : !this.data.ifRecording
//     });
//     let n = 0;
//     recordingTime = setInterval(function(){
//         n++;
//         This.setData({
//             recordingTime: This.formatRecordTime(n)
//         })
//     },1000)
//     wx.startRecord({
//         success: function(res){
//             clearInterval(recordingTime);
//             if (This.data.ifRecording && !This.data.ifPublish && This.data.fromLeftSide && This.data.recordingTime != '1:00') {
//                 This.giveUpRecording();
//                 return;
//             }  
//             This.setData({
//                 ifFinishRecord: !This.data.ifFinishRecord,
//                 ifRecording : !This.data.ifRecording,
//                 recordSeconds: This.formatToSeconds(This.data.recordingTime),
//                 ifPublish: false
//             });  
//           tempFilePath = res.tempFilePath;
//           let key = 'wxapp/vote' + new Date().getTime() + ".silk";
//           This.voiceUploadServerEv(key,tempFilePath,0,This.voiceCompleteCb);
//         },
//         fail: function(res) {
//           console.log(res)
//         },
//         complete: function() {
//           clearInterval(recordingTime);
//         },
//         confirm: function() {
//             console.log("sq")
//         },
//         cancel: function() {
//             console.log('wsq')
//         }
//       });
//   },
//   finishRecordEv: function() {
//     this.stopRecordEv();
//     this.setData({
//         fromLeftSide: false
//     })
//   },
//   playRecordEv: function() {
//       wx.playVoice({
//           filePath: tempFilePath,
//           complete: function(){
//         }
//     })
//   },
//   reRecordEv: function() {
//       clearInterval(recordingTime);
//       tempFilePath = "";
//         this.setData({
//             ifStartRecord: false,
//             ifFinishRecord: false,
//             ifRecording : false,
//             recordingTime: "0:00",
//             fromLeftSide: true,
//             recordSrc: "",
//             recordSeconds: 0
//         });
//   },
//   formatRecordTime: function(n) {
//       if (n == 60) {
//           clearInterval(recordingTime);
//           return '1:00';
//       }
//       else {
//         return n <= 9 ? '0:' + 0 + n :'0:'+ n; 
//       }
//   },
//   formatToSeconds: function(time) {
//     let arr = time.split(':');
//     return arr[0] == '1' ? 60 : arr[1];
//   },
    publishEv: function(ev) {
        // this.setData({
        //     customSwitch: true
        // })
        mta.Event.stat("commitclickanswer",{})
        let formId = ev.detail.formId;

        if(this.data.ifPublish){
            return;
        }
        this.setData({
            ifPublish: true
        });
        var This = this;
        let content = This.data.textAreaVal;
        let contentType = 2;
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
        let sid = APP.globalData.sid;
        let arr = This.data.picPath;
        let resourcesArr = [];
        let data = {};
        arr.forEach((item) => {
            resourcesArr.push(item.split('/wxapp/')[1]);
        });
        if (resourcesArr.length > 0) {
            let resources = resourcesArr.join(",");
            data = {formId, id, content, contentType, resources, sid};
        }else{
            data = {formId, id, content, contentType, sid};
        }
        console.log(data);
        wx.request({
            url: wxappServer + '/help/submit',
            data: data,
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            }, // 设置请求的 header
            success: function (res) {
                if (res.data.suc === '200') {
                    if(res.data.errCode === 'WA_ERROR_20000024'){
                        This.showToast("只允许回答一次");
                        setTimeout(function(){
                            wx.navigateBack({
                                delta: 1, // 回退前 delta(默认为1) 页面
                            });
                        },1000);
                    }else if(res.data.errCode === 'WA_ERROR_20000029'){
                        wx.redirectTo({
                            url: '../helpTransitionTip/helpTransitionTip?keyWord=m'
                        });
                    }else{
                        wx.navigateBack({
                            delta: 1, // 回退前 delta(默认为1) 页面
                        });
                    }
                }
                else{
                    This.showToast("提交失败");
                    This.setData({ifPublish: false});
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
    trim: function(str,is_global) {
        var result;
        result = str.replace(/(^\s+)|(\s+$)/g,"");
        if(is_global.toLowerCase()=="g"){
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
      mta.Event.stat("commitclickaddpic",{})
      var This = this;
      wx.chooseImage({
          count: 4, 
          sizeType: ['original'], 
          success: function (res) {
              console.log(res.tempFilePaths);
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
        console.log(this.data.picPath.length)
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
               console.log(2222)
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
    hideRules(){
        this.setData({
            ifShowRule:false
        })
    },
    showRule() {
        mta.Event.stat("commitclickrule",{})
        let ifShowRule = this.data.ifShowRule;
        this.setData({
            'ifShowRule': !ifShowRule
        });
    },
    getFocus() {
        this.setData({
            'inputFocus': true
        })
    }
})