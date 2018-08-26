let utils = require('../../utils/util.js');
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
function checkUrl(urlString) {
  if (urlString != "") {
    var reg = /^(https)/ig;
    if (!reg.test(urlString)) {
      return false;
    } else {
      return true;
    }
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    limit:2,
    end_url:"",
    uploadlog:"",
    title:"",
    describe:"",
    sign: [
      { name: '记名', value: '1', checked: 'true',image:'../../images/4.png' },
      { name: '匿名', value: '2', image: '../../images/1.png' },
    ],
    statistics:[
      { name: '公开', value: '1', checked: 'true', image: '../../images/2.png' },
      { name: '不公开', value: '2', image: '../../images/5.png' },
    ],
    signVal:1,
    statisticsVal:1,
    date: '',
    time:'00:00',
    timestart:'00:00',
    datestart:'',
    endDate:"1",
    transpond:false,
    correctAnswer:false,
    is_limit:false,
    endAnswer:-1,
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: getApp().appApi.getUserInfoAPI,
      data: {
        id: wx.getStorageSync('uid')
      },
      dataType: 'json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync('token'),
        'uid': wx.getStorageSync('uid')
      },
      success: function (res) {
        console.log(res);
        console.log(res.data.result.item.department);
        console.log(res.data.result.item.username);
        if (res.data.result.item.department == null || res.data.result.item.username == null || res.data.result.item.department =="" || res.data.result.item.username ==""){
          wx.showModal({
            title: '温馨提示！',
            content: '创建问卷前必须完善用户信息，是否完善？',
            success: function (res) {
              if (res.confirm) {
                wx.reLaunch({
                  url: '/pages/user/user?key=1',
                })
              } else if (res.cancel) {
                wx.reLaunch({
                  url: '/pages/index/index',
                })
              }
            }
          })
        }
      }
    });
    wx.setStorageSync('answer', false);
    this.setData({
      datestart: utils.formatTime2(new Date()),
      date: utils.formatTime2(new Date()),
      timestart: utils.formatTime3(new Date())
    });
    let that = this;
    if (options.id){
      wx.request({
        url: getApp().appApi.detailAPI,
        data: {
          id: options.id
        },
        dataType: 'json',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'token': wx.getStorageSync('token'),
          'uid': wx.getStorageSync('uid')
        },
        success: function (res) {
          if (res.data.code != 200) {
            wx.showModal({
              title: '请求失败！',
              content: res.data.msg,
              showCancel: false
            })
          }
          if (res.data.result.question.is_anony == 2) {
            var sign = that.data.sign;
            sign[0].checked = false;
            sign[1].checked = true;
            that.setData({
              signVal: 2
            });
          }
          if (res.data.result.question.is_open == 2) {
            var statistics = that.data.statistics;
            statistics[0].checked = false;
            statistics[1].checked = true;
            that.setData({
              statisticsVal: 2
            });
          }
          if (res.data.result.question.has_correct == 1) {
            that.setData({
              endAnswer: 1
            });
          } else if (res.data.result.question.has_correct == 2){
            that.setData({
              endAnswer: -1
            });
          }
          if (res.data.result.question.is_relay == 1) {
            that.setData({
              transpond: true
            });
          }
          if (res.data.result.question.is_limit == 1) {
            console.log(new Date(res.data.result.question.limit_time * 1000));
            var date = utils.formatTime2(new Date(res.data.result.question.limit_time * 1000));
            var time = utils.formatTime3(new Date(res.data.result.question.limit_time * 1000));
            that.setData({
              limit: 1,
              date: date,
              time: time
            });
          }
          // console.log(res.data);
          that.setData({
            id: options.id,
            statistics: statistics,
            sign: sign,
            uploadlog: res.data.result.question.img,
            title: res.data.result.question.title,
            describe: res.data.result.question.describe,
            is_open: res.data.result.question.is_open,
            has_correct: res.data.result.question.has_correct,
            is_anony: res.data.result.question.is_anony
          });
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
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
  switch1Change: function (e) {
    this.setData({
      transpond: e.detail.value
    });
    // console.log('switch1 发生 change 事件，携带值为', this.data.transpond)
  },
  switch2Change: function (e) {
    var that = this;
    console.log(that.data.endAnswer);
    if (this.data.endAnswer == 1 || this.data.endAnswer==2){
      wx.showModal({
        title: '温馨提示！',
        content: '不能修改是否有正确答案',
        showCancel:false
      })
      that.setData({
        correctAnswer: that.data.endAnswer==1?true:false
      });
      try {
        wx.setStorageSync('answer', that.data.endAnswer == 1 ? true : false)
      } catch (e) {
      }
    }else{
      this.setData({
        correctAnswer: e.detail.value
      });
      try {
        wx.setStorageSync('answer', e.detail.value)
      } catch (e) {
      }
    }
  },
  bindDateChange: function (e) {
    let that = this;
    this.setData({
      date: e.detail.value
    });
    if (that.data.date == utils.formatTime2(new Date())){
      this.setData({
        timestart: utils.formatTime3(new Date()),
        time: utils.formatTime3(new Date()),
      });
    }else{console.log(111)
      this.setData({
        timestart: '00:00',
        time:'00:00'
      });
    }
    var timer = e.detail.value == 1 ? 1 : this.data.date + ' ' + this.data.time;
    this.setData({
      endDate: timer
    });
    console.log(this.data.endDate);
  },
  bindTimeChange: function (e) {
    var timer = e.detail.value == 1 ? 1 : this.data.date + ' ' + e.detail.value;
    this.setData({
      time: e.detail.value,
      endDate: timer,
      is_limit: true
    })
  },
  radioChange:function(e){
    this.setData({
      signVal: e.detail.value
    });
  },
  radioChange2: function (e) {
    this.setData({
      statisticsVal: e.detail.value
    });
  },
  radioChange3: function (e) {
    if(e.detail.value==1){
      this.setData({
        is_limit: false
      });
    }else{
      this.setData({
        is_limit: true
      });
    }
    let that = this;
    var timer = e.detail.value==1?1:this.data.date+' '+this.data.time;
    if (that.data.date == utils.formatTime2(new Date())) {
      this.setData({
        timestart: utils.formatTime3(new Date()),
        time: utils.formatTime3(new Date()),
        endDate: that.data.date + ' ' + utils.formatTime3(new Date())
      });
    }else{
      this.setData({
        endDate: timer
      });
    }
    
     console.log(this.data.endDate);
  },
  bindTitle:function(e){
    this.setData({
      title:e.detail.value
    });
  },
  bindDescribe: function (e) {
    this.setData({
      describe: e.detail.value
    })
  },
  uploadlog:function(){
    // console.log(this.data.title);
    // console.log(this.data.describe);
    // console.log(this.data.signVal);
    // console.log(this.data.statisticsVal);
    // console.log(this.data.dateVal);
    let that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // var tempFilePaths = res.tempFilePaths;
        // 设置精选去一张，所以 0 取得当前的路径地址  res.tempFilePaths[0];
        that.setData({
          uploadlog: res.tempFilePaths[0]
        });
        console.log(res.tempFilePaths[0])
      }
    })
  },
  check:function(){
    var end_json = {};
    let that = this;
    if (!trim(that.data.title)){
      wx.showToast({
        title: '标题不能为空！',
      });
      return false;
    }
    try {
      var value = wx.getStorageSync('answer')
      // console.log('是否有正确答案=' + value);
    } catch (e) {
    }
    
    // console.log('src=' + that.data.uploadlog);
    // console.log('title=' + that.data.title);
    // console.log('describe=' + that.data.describe);
    // console.log('是否记名=' + that.data.signVal);
    // console.log('统计结果=' + that.data.statisticsVal);
    // console.log('截至时间=' + that.data.endDate);
    // console.log('是否禁止转发=' + that.data.transpond);
    // console.log('是否有正确答案=' + that.data.correctAnswer);
    
    end_json['is_limit'] = that.data.is_limit == false ? 2 : 1;
    end_json['src'] = that.data.uploadlog;
    end_json['title'] = that.data.title;
    end_json['describe'] = that.data.describe
    end_json['signVal'] = that.data.signVal == 1 ? 1 : 2;
    end_json['statisticsVal'] = that.data.statisticsVal == 1 ? 1 : 2;
    end_json['endDate'] = that.data.endDate == 1 ? '' : that.data.endDate,
    end_json['transpond'] = that.data.transpond == true ? 1 : 2;
    end_json['correctAnswer'] = that.data.correctAnswer == true ? 1 : 2;
    end_json['id'] = that.data.id ? that.data.id : '';
    console.log(JSON.stringify(end_json));
    // console.log(that.data.id);
    // console.log(that.data.id ? that.data.id : '');
    // console.log(that.data.uploadlog);
    console.log(checkUrl(that.data.uploadlog));
    wx.showLoading({
      title: "提交中...",
      mask: true
    });
    if (that.data.uploadlog && !checkUrl(that.data.uploadlog)){
        wx.uploadFile({
          url: getApp().appApi.upImgAPI,
          filePath: that.data.uploadlog,
          name: 'file',
          success: function (res) {
            console.log(JSON.parse(res.data).result.file_path);
            let urls = JSON.parse(res.data).result.file_path
            
            getApp().wxRequest(getApp().appApi.createAPI, {
              uid: getApp().globalData.uid,
              id: that.data.id ? that.data.id:'',
              title: that.data.title,
              describe: that.data.describe,
              is_anony: that.data.signVal == 1 ? 1 : 2,
              is_limit: that.data.is_limit == false ? 2 : 1,
              is_open: that.data.statisticsVal == 1 ? 1 : 2,
              is_relay: that.data.transpond == true ? 1 : 2,
              has_correct: that.data.correctAnswer == true ? 1 : 2,
              is_modify: 2,
              limit_time: that.data.is_limit == false ? '' : that.data.endDate,
              img: JSON.parse(res.data).result.file_path
            }, 'POST');
          }
        });
    } else {
      getApp().wxRequest(getApp().appApi.createAPI, {
        uid: getApp().globalData.uid,
        title: that.data.title,
        id: that.data.id ? that.data.id : '',
        describe: that.data.describe,
        is_anony: that.data.signVal == 1 ? 1 : 2,
        is_limit: that.data.is_limit == false ? 2 : 1,
        is_open: that.data.statisticsVal == 1 ? 1 : 2,
        is_relay: that.data.transpond == true ? 1 : 2,
        has_correct: that.data.correctAnswer == true ? 1 : 2,
        is_modify: 2,
        id: that.data.id ? that.data.id : '',
        limit_time: that.data.is_limit == false ? '' : that.data.endDate,
        img: checkUrl(that.data.uploadlog) == true ? that.data.uploadlog : (getApp().globalData.userInfo['avatarUrl'] == undefined ? getApp().globalData.default_logo : getApp().globalData.userInfo['avatarUrl'])
      }, 'POST');
    }
  }
  
})