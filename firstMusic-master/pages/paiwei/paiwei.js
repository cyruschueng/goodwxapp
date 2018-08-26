//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
import tips from '../../utils/tips.js'

Page({
  data: {
    userInfo: wx.getStorageSync('userInfo'),
    width:30,
    bg:false,
    point: wx.getStorageSync('point'),
    gold: wx.getStorageSync('point').gold,
    unlock:false,
    little:false,
    moreHeight:460,
    list:[
      {
        title:"第一关",
        unlock:true,
        use_gold:0
      },
      {
        title: "第一关",
        unlock: true,
        use_gold: 0
      }, {
        title: "第一关",
        unlock: true,
        use_gold: 0
      }, {
        title: "第一关",
        unlock: true,
        use_gold: 0
      }, {
        title: "第一关",
        unlock: true,
        use_gold: 0
      }, {
        title: "第一关",
        unlock: true,
        use_gold: 0
      }, {
        title: "第一关",
        unlock: true,
        use_gold: 0
      }, {
        title: "第一关",
        unlock: true,
        use_gold: 0
      }, {
        title: "第一关",
        unlock: true,
        use_gold: 0
      }, {
        title: "第一关",
        unlock: true,
        use_gold: 0
      }, {
        title: "第一关",
        unlock: true,
        use_gold: 0
      }, {
        title: "第一关",
        unlock: true,
        use_gold: 0
      }, {
        title: "第一关",
        unlock: true,
        use_gold: 0
      }, {
        title: "第一关",
        unlock: true,
        use_gold: 0
      }, {
        title: "第一关",
        unlock: true,
        use_gold: 0
      }, {
        title: "第一关",
        unlock: true,
        use_gold: 0
      }, {
        title: "第一关",
        unlock: true,
        use_gold: 0
      }, {
        title: "第一关",
        unlock: true,
        use_gold: 0
      }, {
        title: "第一关",
        unlock: true,
        use_gold: 0
      },
    ]
  },
  onLoad: function () {
    
  },
  onShow:function(){
    wx.onSocketOpen(function () {
      wx.closeSocket()
    })
    wx.removeStorageSync('question_list');
    wx.removeStorageSync('room_id');
    wx.removeStorageSync('robot_sign');
    wx.removeStorageSync('partner_is_robot');
    wx.removeStorageSync('otherName');
    wx.removeStorageSync('otherImg');
    wx.removeStorageSync('houseName');
    wx.removeStorageSync('houseImg');
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
    })
      //close 
      wx.closeSocket();





      // that.setData({
      //   list: res.data.data,
      //   moreHeight: 260 * arr.length * 1
      // })









      let that = this;
      // 获取排位关卡
      wx.request({
        url: app.data.apiurl2 + "guessmc/toll-gate?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
        data: {
          guess_type: 'music',
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("获取排位关卡:", res);
          var status = res.data.status;
          if (status == 1) {
            console.log('moreHeight:',260 * res.data.data.length * 1);
            
            var arr = [];
            for (var i in res.data.data) {
              arr.push(res.data.data[i]); //属性 arr.push(object[i]); //值 } console.log(arr);
            }
            that.setData({
              list: res.data.data,
              moreHeight: 260 * arr.length * 1
            })
            console.log(arr)
            console.log('moreHeight:', 260 * arr.length * 1);
          } else {
            console.log(res.data.msg)
          }
        }
      })
  },
  // 解锁
  lockTap(e){
      let that = this;
      let unlock = e.currentTarget.dataset.unlock;
      let goldPay = e.currentTarget.dataset.gold;
      let order = e.currentTarget.dataset.order;
      that.setData({
        order: e.currentTarget.dataset.order,
        goldPay: e.currentTarget.dataset.gold
      })
      // let payGold = false;
      console.log(unlock, goldPay, order);
      if (unlock==true){
          wx.navigateTo({
            url: '../battle/battle?order=' + order,
          })
      }else{ //请求接口
        that.setData({
          unlock:true,
          bg:true
        })
      }
  },
  // 取消
  noTap(){
    console.log('noTap');
    this.setData({
      bg:false,
      unlock: false,
      little: false
    })
  },
  // 解锁
  yesTap(){
    let that = this;
    console.log('yesTap');
    wx.request({
      url: app.data.apiurl2 + "guessmc/unlock-gate?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
      data: {
        guess_type: 'music',
        order: that.data.order
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("解锁", res);
        var status = res.data.status;
        if (status == 1) {
          wx.request({
            url: app.data.apiurl2 + "guessmc/toll-gate?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
            data: {
              guess_type: 'music',
            },
            header: {
              'content-type': 'application/json'
            },
            method: "GET",
            success: function (res) {
              console.log("获取排位关卡:", res);
              var status = res.data.status;
              if (status == 1) {
                
                var arr = [];
                for (var i in res.data.data) {
                  arr.push(res.data.data[i]); //属性 arr.push(object[i]); //值 } console.log(arr);
                }
                console.log(arr);
                that.setData({
                  list: res.data.data,
                  bg: false,
                  little: false,
                  moreHeight: 260 * arr.length * 1
                })
                console.log('moreHeight:', 260 * arr.length * 1);
              } else {
                console.log(res.data.msg)
              }
            }
          })
        } else {
          console.log(res.data.msg);
          that.setData({
            bg: true,
            little: true
          }) 
        }
      }
    })
  }
})
