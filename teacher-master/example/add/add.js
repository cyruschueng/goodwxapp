var util = require("../../utils/util.js")
var app = getApp();
var that;
const date = new Date();
const cur_year = date.getFullYear();
const cur_month = date.getMonth() + 1;
const cur_day = date.getDate();
const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
const config = require('../../config')
const recorderManager = wx.getRecorderManager();
var innerAudioContext = '';
var fileSize = 0;
Page({
  data: {
    showTopTips: false,
    class_items: [],
    selectedImgs: [],
    selectedAnswerImgs: [],
    date: '',
    dateEx: '',
    startdate: '',
    enddate: '',
    time: "12:01",
    title: "",
    feedback_types: ["拍照", "签名", "录语音", "语音+拍照", "拍视频"],
    feedback_type_index: 0,
    need_feedback: 1,
    btn_disable: false,
    btn_loadding: false,
    loaded: false,
    need_check: 0,
    multiArray: [],
    teach_role: 0,
    subject: "",
    multiIndex: [0, 0, 0],
    type: 0,
    statsArray: [],
    winWidth: '',
    winHeight: '',
    mode:'add',
    recordAnimation: {},
    playAnimation: {}
  },

  onLoad: function (options) {

    app.globalData.notifyReload = 1;
    // 页面初始化 options 为页面跳转所带来的参数
    that = this
    wx.showLoading({
      title: '加载中....',
    });
    var need_check = options.need_check;
    var inform = options.inform;
    if (need_check) {
      that.setData({ need_check: 1, need_feedback: 1 })
    }
    if (inform) {
      that.setData({ type: 1 })
    }
    that.setData({ winWidth: app.globalData.winWidth, winHeight: app.globalData.winHeight })
    that.initClass();
    that.initDatePicker();

  },

  onShow: function (obj) {

    app.globalData.memberReload = 0;
    var subject = app.globalData.currentSubjectPublish;
    if (subject) {
      var title = util.formatTime(new Date(), 2) + subject + '作业';
      that.setData({ subject: subject, title: title });
      app.globalData.currentSubjectPublish = ""
    }
  },

  initClass: function () {
    app.getImprint(function (imprint) {
      util.AJAX1(config.ClassByImprintUrl, {}, "post", { imprint: imprint }, function (res) {
        console.log(res)
        wx.hideLoading();
        if (res.data.status == "ok" && res.data && res.data.classes) {
          var classes = res.data.classes;
          var teacher_name = res.data.teacher_name;
          var class_items = Array();
          classes.forEach(function (item) {
            class_items.push({ name: item.class_name, gid: item.open_gid, value: item._id });
          });
          if (class_items.length == 1) {
            class_items[0].checked = true;
          }
          var teach_role = res.data.teach_role;
          var subject = "选择科目";
          if (teach_role > -1) {
            subject = util.GetSubjectList()[teach_role]
          }
          var title = util.formatTime(new Date(), 2) + subject + '作业';

          if (that.data.type == 1) {
            title = util.formatTime(new Date(), 2) + '班级通知';
          }
          that.setData({ loaded: true, teach_role: teach_role, class_items, class_items, title: title, date: util.addDate(new Date(), 1), subject: subject })
        }
      });
    });
  },

  initDatePicker: function () {
    var multiArray = [];
    var multiIndex = [];
    var years = [];
    for (var i = 0; i < 2020; i++) {
      var yy = 2018 + i;
      years.push(yy + '年');
      if (yy == cur_year) {
        multiIndex[0] = i
      }
    }
    var months = [];
    for (var j = 0; j < 12; j++) {
      var mm = j + 1;
      months.push(mm + '月');
      if (mm == cur_month) {
        multiIndex[1] = j
      }
    }

    var days = [];
    var day = util.getThisMonthDays(cur_year, cur_month);
    for (var m = 0; m < day; m++) {
      var dd = m + 1;
      if (dd == cur_day) {
        multiIndex[2] = m + 1;
        days.push(dd + '日' + " (今天) 星期" + weeks_ch[util.getDayOfWeek(cur_year, cur_month, dd)]);
      } else if ((dd - 1) == cur_day) {
        days.push(dd + '日' + "(明天) 星期" + weeks_ch[util.getDayOfWeek(cur_year, cur_month, dd)]);
      } else if ((dd - 2) == cur_day) {
        days.push(dd + '日' + "(后天) 星期" + weeks_ch[util.getDayOfWeek(cur_year, cur_month, dd)]);
      } else {
        days.push(dd + '日' + " 星期" + weeks_ch[util.getDayOfWeek(cur_year, cur_month, dd)]);
      }
    }

    multiArray = [years, months, days];
    that.setData({ multiArray: multiArray, multiIndex: multiIndex, enddate: (multiIndex[0] + 2018) + "-" + (multiIndex[1] + 1) + "-" + (multiIndex[2] + 1) })

  },


  bindMultiPickerChange: function (e) {
    var multiIndex = e.detail.value;

    that.setData({
      multiIndex: e.detail.value,
      enddate: (multiIndex[0] + 2018) + "-" + (multiIndex[1] + 1) + "-" + (multiIndex[2] + 1)
    })

  },

  bindMultiPickerColumnChange: function (e) {
    if (e.detail.column == 1) {
      var multiArray = that.data.multiArray;
      var multiIndex = that.data.multiIndex;
      multiIndex[e.detail.column] = e.detail.value;
      var days = [];
      const select_year = multiIndex[0] + 2018;
      const select_month = multiIndex[1] + 1;
      const select_day = multiIndex[2] + 1;
      var day = util.getThisMonthDays(select_year, select_month);
      for (var m = 1; m <= day; m++) {
        if (select_year == cur_year && select_month == cur_month && m == select_day) {
          days.push(m + '日' + " (今天) 星期" + weeks_ch[util.getDayOfWeek(select_year, select_month, m)]);
        } else if (select_year == cur_year && select_month == cur_month && (m - 1) == select_day) {
          days.push(m + '日' + " (明天) 星期" + weeks_ch[util.getDayOfWeek(select_year, select_month, m)]);
        } else if (select_year == cur_year && select_month == cur_month && (m - 2) == select_day) {
          days.push(m + '日' + " (后天) 星期" + weeks_ch[util.getDayOfWeek(select_year, select_month, m)]);
        } else {
          days.push(m + '日' + " 星期" + weeks_ch[util.getDayOfWeek(select_year, select_month, m)]);
        }
      }
      multiArray[2] = days;
      that.setData({ multiArray: multiArray, multiIndex: multiIndex })
    }
  },



  classChange: function (e) {
    var class_items = this.data.class_items, values = e.detail.value;
    for (var i = 0, lenI = class_items.length; i < lenI; ++i) {
      class_items[i].checked = false;
      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (class_items[i].value == values[j]) {
          class_items[i].checked = true;
          break;
        }
      }
    }
    this.setData({
      class_items: class_items
    });
  },



  removeImg: function (event) {
    console.log(event)
    var id = event.currentTarget.id;
    var imageType = event.currentTarget.dataset.type;
    if (imageType == 1) {
      var imgs = that.data.selectedAnswerImgs;
      for (var i = 0; i < imgs.length; i++) {
        if (imgs[i] == id) {
          imgs.splice(i, 1)
          break;
        }
      }
      that.setData({
        selectedAnswerImgs: imgs
      })
    } else {
      var imgs = that.data.selectedImgs;
      for (var i = 0; i < imgs.length; i++) {
        if (imgs[i] == id) {
          imgs.splice(i, 1)
          break;
        }
      }
      that.setData({
        selectedImgs: imgs
      })
    }

  },

  // 提交 TODO
  submit: function (event) {
    if (app.globalData.isExpOpenid) {
      wx.showToast({
        title: '体验者无权限',
      })
      return;
    }

    var class_items = [];
    that.data.class_items.forEach(function (m) {
      if (m.checked) {
        class_items.push(m);
      }
    });
    if (class_items.length == 0) {
      wx.showToast({
        title: '选择班级',
      })
      return;
    }

    var notify_type = 0;
    var end_day = that.data.enddate;
    var need_feedback = that.data.need_feedback;
    var feedback_type = that.data.feedback_type_index;
    var text_content = event.detail.value.text_content;
    var answer_text_content = event.detail.value.answer_text_content;
    var need_check = that.data.need_check;
    var subject = that.data.subject;
    var type = that.data.type;
    if(subject=="选择科目"&&type==0){
      wx.showToast({
        title: '请选择科目',
      })
      return;
    }
    var stats_list = event.detail.value.stats_list;
    if (need_check == 1 && stats_list.replace(/\s/g, '').length == 0) {
      wx.showModal({
        title: '提示',
        content: '填写信息不完整',
      })
      return;
    }
    if (stats_list){
      var end = stats_list.substring(stats_list.length - 1, stats_list.length);
      if (end == '/') {
        stats_list = stats_list.substring(0, stats_list.length - 1);
      }
    }
    var title = that.data.title;
    var creator_teach_role = that.data.teach_role;
    var selectedImgs = that.data.selectedImgs;
    var selectedAnswerImgs = that.data.selectedAnswerImgs;

    var image_files = [];
    selectedImgs.forEach(function (item) {
      var image_file = { url: item, category: 0 };
      image_files.push(image_file);
    });
    selectedAnswerImgs.forEach(function (item) {
      var image_file = { url: item, category: 1 };
      image_files.push(image_file);
    })
    
    if(that.data.tmp_record){
      var record_file = { url: that.data.tmp_record, category: 2};
      image_files.push(record_file);
    }

    if (that.data.tmp_video) {
      var video_file = { url: that.data.tmp_video, category: 3};
      image_files.push(video_file);
    }


    var form_id = event.detail.formId;
    that.setData({ btn_disable: true, btn_loadding: true });
    wx.showLoading({
      title: '提交中....',
      mask:true
    });
    fileSize = image_files.length;
    wx.showNavigationBarLoading()
    app.getImprint(function (imprint) {
      if (image_files.length > 0) {
        var class_item = class_items.pop();
        var tmpfile = image_files.pop();
        var formdata = {
          file_type: "images", cls: class_item.value, class_name: class_item.name, gid: class_item.gid, notify_type: notify_type, end_day: end_day, need_feedback: need_feedback, creator_teach_role: creator_teach_role, feedback_type: feedback_type, text_content: text_content, answer_text_content: answer_text_content, stats_list: stats_list, title: title, image_category: tmpfile.category, type: type, need_check: need_check, subject: subject, form_id: form_id
        }
        if (formdata.image_category==2){
          formdata.record_duration = that.data.duration
        }
        console.log(formdata);
        wx.uploadFile({
          url: config.addNotifyWithFileUrl,
          filePath: tmpfile.url,
          name: 'file',
          header: { imprint: imprint }, // 设置请求的 header
          formData: formdata, // HTTP 请求中其他额外的 form data
          success: function (res) {
            console.log(res);
            var result = JSON.parse(res.data);
            var notify_id = result.notify_id;
            if (result.status == "ok" && image_files.length > 0) {
              that.uploadPic(image_files, notify_id, function () {
                that.notifyCopyAndRedirect(class_items, notify_id, imprint)
              });
            } else {
              that.notifyCopyAndRedirect(class_items, notify_id, imprint)
            }
          },
          fail: function (msg) {
            that.setData({ btn_disable: false, btn_loadding: false })
            console.log(msg)
          },
          complete: function () { // 重置数据
          }
        })
      } else {
        //这个后端会自动copy到对应的班级的 
        var formdata = { file_type: "images", class_items: class_items, notify_type: notify_type, end_day: end_day, need_feedback: need_feedback, creator_teach_role: creator_teach_role, feedback_type: feedback_type, text_content: text_content, stats_list: stats_list, title: title, type: type, need_check: need_check, subject: subject, form_id: form_id }
        console.log(formdata)
        util.AJAX1(config.addNotifyWithTextUrl, formdata, "post", { imprint: imprint }, function (res) {
          wx.hideLoading();
          if (res.data.status == "ok") {
            wx.redirectTo({
              url: '../share/share?notify_ids=' + res.data.notify_ids.join("@")
            })
          } else {
            that.setData({ btn_disable: false, btn_loadding: false });
            wx.showToast({
              title: '发生错误..',
            })
          }
        });
      }
    })
  },


  notifyCopyAndRedirect: function (class_items, notify_id, imprint) {
    console.log(class_items);
    if (class_items.length > 0) {
      var formdata = { class_items: class_items, notify_id: notify_id }
      util.AJAX1(config.notifyCopyUrl, formdata, "post", { imprint: imprint }, function (res) {
        wx.hideLoading();
        console.log(res)
        if (res.data.status == "ok") {
          var notify_ids = res.data.notify_ids;
          console.log('../share/share?notify_ids=' + notify_ids.join("@"))
          wx.redirectTo({
            url: '../share/share?notify_ids=' + notify_ids.join("@")
          })
        }
      });
    } else {
      wx.redirectTo({
        url: '../share/share?notify_ids=' + notify_id
      })
    }
  },



  uploadPic: function (tmpfiles, notify_id, fn) {
    if (tmpfiles.length > 0) {
      if (fileSize > 1) {
        var title = "上传第" + (fileSize - tmpfiles.length + 1) + "张..";
        wx.showLoading({
          title: title,
          mask: true
        });
      }
      var that = this;
      var tmpfile = tmpfiles.pop();
      app.getImprint(function (imprint) {
        var formData={ notify_id: notify_id, image_category: tmpfile.category };
        if (tmpfile.category== 2) {
          formData.record_duration = that.data.duration
        }
        console.log(formData)
        wx.uploadFile({
          url: config.notifyUploadFileUrl,
          filePath: tmpfile.url,
          name: 'file',
          header: { imprint: imprint }, // 设置请求的 header
          formData: formData , // HTTP 请求中其他额外的 form data
          success: function (res) {
            var result = JSON.parse(res.data);
            if (result.status == "ok") {
              if (tmpfiles.length > 0) {
                that.uploadPic(tmpfiles, notify_id, fn)
              } else {
                fn();
              }
            }
          },
          fail: function (msg) {
            console.log(msg)
          },
          complete: function () { // 重置数据

          }
        })
      });
    } else {
      fn();
    }
  },



  needFeedbackChange: function (e) {
    that.setData({ need_feedback: e.detail.value ? 1 : 0 })
  },

  feedBackChange: function (e) {
    if (e.detail.value==4){
      wx.showModal({
        title: '温馨提示',
        content: '由于微信的限制,视频的长度需要在60秒以内',
        showCancel:false,
        success: function (res) {
          that.setData({
            feedback_type_index: e.detail.value
          });
        }
      })
    }else{
      that.setData({
        feedback_type_index: e.detail.value
      });
    }
   
   
  },

  chooseImage: function (e) {
    var imageType = e.currentTarget.dataset.type;
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        if (imageType == 1) {
          var selectedAnswerImgs = that.data.selectedAnswerImgs.concat(res.tempFilePaths);
          if (selectedAnswerImgs.length >9) {
            selectedAnswerImgs = selectedAnswerImgs.slice(0, 9);
            wx.showToast({
              title: '最多9张图片',
            })
          }
          that.setData({
            selectedAnswerImgs: selectedAnswerImgs
          });
        } else {
          var selectedImgs = that.data.selectedImgs.concat(res.tempFilePaths);
          if (selectedImgs.length > 9) {
            selectedImgs = selectedImgs.slice(0, 9);
            wx.showToast({
              title: '最多9张图片',
            })
          }
          that.setData({
            selectedImgs: selectedImgs
          });
        }
      }
    })
  },
  previewImage: function (e) {
    var imageType = e.currentTarget.dataset.type;
    if (imageType == 1) {
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.data.selectedAnswerImgs // 需要预览的图片http链接列表
      })
    } else {
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.data.selectedImgs // 需要预览的图片http链接列表
      })
    }

  },

  statsTextAreaBlur: function (e) {
    var stats_list = e.detail.value.replace(/\s/g, '');
    if (stats_list) {
      var end = stats_list.substring(stats_list.length - 1, stats_list.length);
      if (end == '/') {
        stats_list = stats_list.substring(0, stats_list.length - 1);
      }
      var statsArray = stats_list.split('/');
      that.setData({ statsArray: statsArray })
    } else {
      that.setData({ statsArray: [] })
    }
  },




//录音相关开始

  record: function () {
    console.log("开始录音")
    var recordStatus = that.data.recording;
    that.setData({ recording: !recordStatus })
    if (that.data.recording) {
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.record']) {
            wx.authorize({
              scope: 'scope.record',
              success() {
                console.log("获取授权成功")
                // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                that.recordStart()
              },
              fail() {
                wx.showModal({
                  title: '提示',
                  content: '录音需要获取您的录音权限,请允许',
                  success: function (res) {
                    if (wx.openSetting) {
                      wx.openSetting({
                        success: (res) => {
                          that.recordStart()
                        }
                      })
                    } else {
                      wx.redirectTo({
                        url: '../authfail/authfail',
                      })
                    }
                  }
                });
              }
            })
          } else {
            that.recordStart();
          }
        }
      })
    } else {
      console.log("结束录音")
      that.recordEnd();
    }
  },




  recordStart: function () {
    that.recordAnimation();
    const options = {
      sampleRate: 12000,
      numberOfChannels: 1,
      encodeBitRate: 30000,
      format: 'mp3',
      duration: 600000,
      frameSize: 50
    }
    recorderManager.start(options)
    recorderManager.onStart(() => {
      console.log('---------------recorder start')
    });
    recorderManager.onStop((res) => {
      wx.hideLoading();
      that.setData({ recording: false, time_counter: 0, mode:"add", tmp_record: res.tempFilePath, duration: Math.round(res.duration / 1000) });
      const { tempFilePath } = res
    })

    recorderManager.onError((res) => {
      wx.showToast({
        title: '发生错误',
      })
    })
  },





  recordEnd: function () {
    wx.showLoading({
      title: '处理中,请耐心等待....',
    })
    that.setData({ record_btn_show: false, recording: false })
    recorderManager.stop();
  },

  rerecord: function () {
    that.setData({ mode: 'recording', record_btn_show: true });
  },


  playStart: function (e) {
   
    if (!innerAudioContext) {
      innerAudioContext = wx.createInnerAudioContext();
    }

    var tempFilePath = that.data.tmp_record;
    innerAudioContext.autoplay = true
    innerAudioContext.src = tempFilePath;
    console.log(tempFilePath);
    innerAudioContext.onPlay(() => {
      console.log('开始播放');
      that.setData({ playing: true });
      that.playAnimation();

    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    });
    innerAudioContext.onEnded(() => {

      that.setData({ playing: false });
      console.log('开始结束');
    })

    innerAudioContext.onStop(() => {
      // playStatus = 'stop';
      // that.setData({ playing: false });
      console.log('暂时一个');
    })
  },

  recordAnimation: function () {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })

    this.animation = animation
    this.setData({
      recordAnimation: animation.export()
    })
    var n = 0;
    that.setData({ time_counter: 0 })
    //连续动画需要添加定时器,所传参数每次+1就行
    var interval = setInterval(function () {
      if (!that.data.recording) {
        this.animation.scale(1, 1).step();
        clearInterval(interval);
      }
      n = n + 1;
      console.log(n);
      if (n % 2 == 0) {
        var time_counter = that.data.time_counter + 1;
        that.setData({ time_counter: time_counter });
        this.animation.scale(0.8, 0.8).step()

      } else {
        this.animation.scale(1, 1).step()
      }
      this.setData({
        recordAnimation: this.animation.export()
      })
    }.bind(this), 500)

  },

  playAnimation: function () {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })

    this.animation = animation
    this.setData({
      playAnimation: animation.export()
    })
    var n = 0;
    //连续动画需要添加定时器,所传参数每次+1就行
    var interval = setInterval(function () {
      if (!that.data.playing) {
        clearInterval(interval);
      }
      n = n + 1;
      console.log(n);
      if (n % 2 == 0) {
        this.animation.scale(0.5, 0.5).step();
        if (!that.data.playing) {
          this.animation.scale(1, 1).step();
        }

      } else {
        this.animation.scale(1, 1).step()
      }
      //this.animation.rotate(180 * (n)).step()
      this.setData({
        playAnimation: this.animation.export()
      })
    }.bind(this), 500)

  },

  removeRecord: function () {
    that.setData({ tmp_record: "" })
  },


  removeVideo: function () {
    that.setData({ tmp_video: "" })
  },

  revideo: function () {
    
    wx.showModal({
      title: '温馨提示',
      content: '由于微信的限制,视频的长度需要在60秒以内',
      showCancel: false,
      success: function (res) {
          wx.chooseVideo({
            sourceType: ['album', 'camera'],
            maxDuration: 60,
            camera: 'back',
            success: function (res) {
              if(res.duration>60){
                  wx.showToast({
                    title: '长度超过60s',
                    icon:"none"
                  })
              }else{
                that.setData({
                  tmp_video: res.tempFilePath
                })
              }
            }
          })
      }
    })

    
  },

//录音相关结束


  bindContentTextAreaBlur: function (e) {
    that.setData({ text_content: e.detail.value })
  },


  goHelp: function (e) {
    var href ="https://ab.welife001.com/minProgramHelpDetail?category=photo_video";
    util.goWebView(href);
  },

});