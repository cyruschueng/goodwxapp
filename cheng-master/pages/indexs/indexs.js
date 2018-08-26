// pages/indexs/indexs.js
var app = getApp();
var util = require('../../utils/util.js');
import tips from '../../utils/tips.js'

Page({
  data: {
    userInfo: wx.getStorageSync('userInfo'),
    formNum: 1, //formid
    setting:false,
    bank:false,
    math: Math.random(),
    hour:'00',
    minute:'60',
    second:'00',
    width:60,
    socktBtnTitle: '连接socket',
    music: false
  },
  onLoad: function (options) {
    let that = this;
    // 如果缓存是false
    if (wx.getStorageSync('music')==false){
      that.setData({
        music: false
      })
      wx.setStorageSync('music', false);
      console.log('stop');
      app.AppMusic.stop();
      app.AppMusic.onPause(() => {
        console.log('暂停播放');
      })
    }else{
      that.setData({
        music: true
      })
    }
    app.getAuth(function () {
      let that = this;
      
    });
  },
  onReady: function () {
  
  },
  onShow: function () {
    if (wx.openBluetoothAdapter) {
      wx.openBluetoothAdapter()
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
    let that = this;
   
    // 钱庄取钱剩余时间
    if (!wx.getStorageSync('sign')){
        app.getAuth(function () {
          that.setData({
            userInfo: wx.getStorageSync('userInfo'),
          })
          wx.request({
            url: app.data.apiurl + "guessipk/get-bank-time?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
            data: {
              guess_type: 'idiom'
            },
            header: {
              'content-type': 'application/json'
            },
            method: "GET",
            success: function (res) {
              console.log("钱庄取钱剩余时间:", res);
              var status = res.data.status;
              if (status == 1) {
                that.setData({
                  time: res.data.data
                })
              } else {
                console.log(res.data.msg)
              }
            }
          })
          // 金币基本信息
          wx.request({
            url: app.data.apiurl + "guessipk/user-point?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
            data: {
              guess_type: 'idiom'
            },
            header: {
              'content-type': 'application/json'
            },
            method: "GET",
            success: function (res) {
              console.log("金币基本信息:", res);
              var status = res.data.status;
              if (status == 1) {
                wx.setStorageSync('allPoint', res.data.data);
                that.setData({
                  allPoint: res.data.data
                })
              } else {
                console.log(res.data.msg)
              }
            }
          })
        });
    }else{
      wx.request({
        url: app.data.apiurl + "guessipk/get-bank-time?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
        data: {
          guess_type: 'idiom'
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("钱庄取钱剩余时间:", res);
          var status = res.data.status;
          if (status == 1) {
            that.setData({
              time: res.data.data
            })
            // 倒计时
            let minutes = '';
            let seconds = '';
            var maxtime = that.data.time; //一个小时，按秒计算，自己调整! 
            console.log(typeof (maxtime));
            var inter = setInterval(function () {

              if (maxtime <= 1) {
                clearInterval(inter);
              }
              if (maxtime >= 0) {
                minutes = Math.floor(maxtime / 60);
                seconds = Math.floor(maxtime % 60);
                let msg = minutes + "分" + seconds + "秒";
                that.setData({
                  time: msg
                })
                if (maxtime == 5 * 60) console.log('注意，还有5分钟!');
                --maxtime;
              }
              else {
                that.setData({
                  time: '有金币可领取'
                })
                clearInterval(inter);
                console.log("时间到，结束!");
              }
              maxtime--;
              //console.log(maxtime);
              that.setData({
                maxtime,
                inter
              })
            }, 1000)
          } else {
            console.log(res.data.msg)
          }
        }
      })
      // 金币基本信息
      wx.request({
        url: app.data.apiurl + "guessipk/user-point?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
        data: {
          guess_type: 'idiom'
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("金币基本信息:", res);
          var status = res.data.status;
          if (status == 1) {
            wx.setStorageSync('allPoint', res.data.data);
            that.setData({
              allPoint: res.data.data
            })
          } else {
            console.log(res.data.msg)
          }
        }
      })
    }
    that.setData({
      userInfo: wx.getStorageSync('userInfo'),
    })
  },
  onHide: function () {
  
  },
  // 保存formid
  formSubmit(e){
    let that = this;
    let formNum = that.data.formNum + 1;
    if (formNum > 6) {
      return;
    }
    // util.formSubmit(e);
    that.setData({
      formNum: formNum
    })
  },
  // 音效
  switch2Change: function (e) {
    let that = this;
    console.log('switch1 发生 change 事件，携带值为', e.detail.value);
    if (e.detail.value==true){
      console.log('play');
      that.setData({
        music:true
      })
      app.AppMusic.play();
      app.AppMusic.onPlay(() => {
        console.log('开始播放');
      }) 
    }else{
      wx.setStorageSync('music', false);
      console.log('stop');
      app.AppMusic.stop();
      app.AppMusic.onPause(() => {
        console.log('暂停播放');
      })
    }
  },
  // 推送
  switch1Change: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value);
    if (e.detail.value == true) {
      console.log('true');
    } else {
      console.log('stop');
    }
  },
  // 商店
  shopTap(){
    wx.navigateTo({
      url: '../shop/shop',
    })
  },
  // 排行
  rankTap(){
    wx.navigateTo({
      url: '../ranking/ranking',
    })
  },
  // 银行
  bankTap(){
    let that = this;
    if (that.data.time =='0分0秒'){
      that.setData({
        bank: true
      })
      //领取钱庄金币
      wx.request({
        url: app.data.apiurl + "guessipk/receive-bank-point?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
        data: {
          guess_type: 'idiom'
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("钱庄取钱剩余时间:", res);
          var status = res.data.status;
          if (status == 1) {
            that.setData({
              point: res.data.data.point + that.data.allPoint.bank_point
            })
          } else {
            console.log(res.data.msg)
          }
        }
      })
      wx.request({
        url: app.data.apiurl + "guessipk/get-bank-time?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
        data: {
          guess_type: 'idiom'
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("钱庄取钱剩余时间:", res);
          var status = res.data.status;
          if (status == 1) {
            that.setData({
              time: res.data.data
            })
            // 倒计时
            let minutes = '';
            let seconds = '';
            var maxtime = that.data.time; //一个小时，按秒计算，自己调整! 
            var inter = setInterval(function () {

              if (maxtime <= 1) {
                clearInterval(inter);
              }
              if (maxtime >= 0) {
                minutes = Math.floor(maxtime / 60);
                seconds = Math.floor(maxtime % 60);
                let msg = minutes + "分" + seconds + "秒";
                that.setData({
                  time: msg
                })
                if (maxtime == 5 * 60) console.log('注意，还有5分钟!');
                --maxtime;
              }
              else {
                that.setData({
                  time: '有金币可领取'
                })
                clearInterval(inter);
                console.log("时间到，结束!");
              }
              maxtime--;
              console.log(maxtime);
              that.setData({
                maxtime,
                inter
              })
            }, 1000)
          } else {
            console.log(res.data.msg)
          }
        }
      })
    }else{
      tips.alert('还不能收取');
    }
  },
  // 设置
  setTap(){
    let that = this;
    that.setData({
      setting: true
    })
  },
  // 关闭
  close(){
    let that = this;
    that.setData({
      setting: false
    })
  },
  // 关闭银行
  closeBank(){
    let that = this;
    that.setData({
      bank: false
    })
  },
  // 排位赛
  gameTap(){
      wx.navigateTo({
        url: '../mine/mine',
      })
  },
  hepulan(){
    util.jump()
  },
  // 分享
  onShareAppMessage: function (res) {
    let that = this;
    let userInfo = that.data.userInfo;
    return {
      title: '不服来战',
      path: '/pages/waita/waita?room_id=' + wx.getStorageSync('mid') + '&otherName=' + userInfo.nickName + '&otherImg=' + userInfo.avatarUrl,
      success: function (res) {
        wx.navigateTo({
          url: '../wait/wait',
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
 
})