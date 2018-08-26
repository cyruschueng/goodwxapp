//index.js
const app = getApp();
const common = require('../../common.js');
const apiurl = 'https://friend-guess.playonwechat.com/';
let sign = wx.getStorageSync('sign');
import tips from '../../utils/tips.js' 

Page({
  data: {
  },
  
  onLoad: function (options) {
    console.log("options:",options);
    if (wx.getStorageSync('idol_id')){
      this.setData({
        idol_id: wx.getStorageSync('idol_id')
      })
      wx.navigateTo({
        url: '../goodInform/goodInform?idol_id=' + wx.getStorageSync('idol_id')
      })
    }
     
    wx.setStorageSync("navto", 1)
    //回调
    //common.getSign(function () { })
  },
  onShow(){
    let that = this;
    // 滚动结束
    app.getAuth(function () {
      let userInfo = wx.getStorageSync('userInfo');
      let sign = wx.getStorageSync('sign');
      let mid = wx.getStorageSync("mid");
      that.setData({
        userInfo: userInfo,
        mid: mid
      })
      wx.showLoading({
        title: '加载中',
      });
      // 历史上的今天
      wx.request({
          url: apiurl + "birth/history-today?sign=" + sign + '&operator_id=' + app.data.kid,
          header: {
            'content-type': 'application/json'
          },
          method: "GET",
          success: function (res) {
            console.log("历史上的今天:", res);
            var status = res.data.status;
            if (status == 1) {
              that.setData({
                history: res.data.data
              })
            } else {
              console.log(res.data.msg)
            }
          }
      })
      // 今天生日的明星
      wx.request({
        url: apiurl + "birth/today-birth-idol?sign=" + sign + '&operator_id=' + app.data.kid,
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("今天生日的明星:", res);
          var status = res.data.status;
          if (status == 1) {
            that.setData({
              birthIdol: res.data.data
            })
          } else {
            console.log(res.data.msg)
          }
        }
      })
      //亲友数量
      wx.request({
        url: apiurl + "birth/friend-count?sign=" + sign + '&operator_id=' + app.data.kid,
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("亲友数量:", res);
          that.setData({
            count : res.data.data
          })
        }
      })
      //可能认识的好友
      wx.request({
        url: apiurl + "birth/might-known?sign=" + sign + '&operator_id=' + app.data.kid,
        data:{
          
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("可能认识的好友:", res);
          that.setData({
            known: res.data.data
          })
        }
      })
      //一个月后的生日
      wx.request({
        url: apiurl + "birth/month-later-birth?sign=" + sign + '&operator_id=' + app.data.kid,
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("一个月后的生日:", res);
          that.setData({
            later: res.data.data
          })
        }
      })
      //近期过生日的朋友
      wx.request({
        url: apiurl + "birth/recent-birth?sign=" + sign + '&operator_id=' + app.data.kid,
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("近期过生日:", res);
          that.setData({
            monthBirth: res.data.data
          })
        }
      })
      //即将过生日（7天内）
      wx.request({
        url: apiurl + "birth/soon-birth?sign=" + sign + '&operator_id=' + app.data.kid,
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("即将过生日:", res);
          that.setData({
            soon: res.data.data
          })
        }
      })
      // 自己是否绑定了手机
      wx.request({
        url: apiurl + "birth/is-build-phone?sign=" + sign + '&operator_id=' + app.data.kid,
        data: {
          mf_id: 0
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("自己是否认证:", res);
          var status = res.data.status;
          if (status == 1) {
            console.log("myselfName:",res.data.data.flag);
            wx.setStorageSync('myselfName', res.data.data.flag);
          } else {
            console.log(res.data.msg)
          }
        }
      })
      //获取年月日，首页明星当月生日，回去当月月份缓存
      // 获取当前日期
      var date = new Date();
      // 获取当前月份
      var nowMonth = date.getMonth() + 1;
      // 获取当前是几号
      var strDate = date.getDate();
      // 添加分隔符“-”
      var seperator = "-";
      // 对月份进行处理，1-9月在前面添加一个“0”
      // if (nowMonth >= 1 && nowMonth <= 9) {
      //   nowMonth = "0" + nowMonth;
      // }
      // 对天数进行处理，1-9号在前面添加一个“0”
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
      var nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
      wx.setStorageSync('nowDate', nowDate); 
      wx.setStorageSync('getFullYear', date.getFullYear); 
      wx.setStorageSync('nowMonth', nowMonth); 
      wx.setStorageSync('strDate', strDate); 
      that.setData({
        nowMonth: nowMonth,
        strDate: strDate
      })
      wx.hideLoading()
    })
  },
  //search
  search(){
      wx.navigateTo({
        url: '../seach/seach'
      })
  },
  // 添加好友
  findAdd(){
    wx.navigateTo({
      url: '../addfriends/addfriends'
    })
  },
  //历史上的今天详情inform
  inform(e){
    console.log(e);
    let that = this;
    let day = e.currentTarget.dataset.day;
    wx.navigateTo({
      url: '../inform/inform?day=' + day
    })
  },
  // birthdayInfo
  birthdayInfo(e) {
    let mf_id = e.currentTarget.dataset.mf_id;
    let url = e.currentTarget.dataset.url;
    console.log(mf_id, url);
    wx.navigateTo({
      url: '../hinform/hinform?mf_id=' + mf_id + '&url=' + url
    })
  },
  more(){
    wx.navigateTo({
      url: '../more/more'
    })
  },
  // 明星详情
  idolInform(e){
    let idol_id = e.currentTarget.dataset.idol_id;
    wx.navigateTo({
      url: '../goodInform/goodInform?idol_id=' + idol_id
    })
  },
  // 互相加好友
  sendShare() {
    let that = this;
    let sign = wx.getStorageSync('sign');
    wx.request({
      url: apiurl + "birth/make-friend?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        invite_mid: that.data.mid,
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("互相加好友:", res);
        var status = res.data.status;
        if (status == 1) {
          tips.success('互相加好友成功');
        } else {
          console.log(res.data.msg);
          tips.success(res.data.msg);
        }
      }
    })
  },
  close(){
    this.setData({
      birthIdol:false
    })
  }
  
})
