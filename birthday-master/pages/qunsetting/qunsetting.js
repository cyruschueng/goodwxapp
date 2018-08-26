let tcity = require("../../utils/citys.js");
let app = getApp();
let sign = wx.getStorageSync('sign');
let common = require('../../common.js');
let apiurl = 'https://friend-guess.playonwechat.com/';
import tips from '../../utils/tips.js' 
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  onLoad: function (options) {
    console.log("options:", options);
    let informAll = wx.getStorageSync('informAll');
    this.setData({
      informAll: informAll,
      group_name:informAll.group_info.group_name,
      g_id: options.g_id
    })
  },
  onShow: function () {
    let that = this;
    let sign = wx.getStorageSync('sign');
    let informAll = that.data.informAll;
    //是否订阅了本群生日通知
    if (informAll.config.subscribe == 0) {
      that.setData({
        checked1: false
      })
    } else {
      that.setData({
        checked1: true
      })
    }
    //show_year是否展示出生年
    if (informAll.config.show_year == 0) {
      that.setData({
        checked2: false
      })
    } else {
      that.setData({
        checked2: true
      })
    }
    //是否允许微信群好友加入
    if (informAll.group_info.only_wechat_group == 0) {
      that.setData({
        checked3: false
      })
    }else{
      that.setData({
        checked3: true
      })
    }
  },
  // 订阅群生日
  switch1Change(e){
    let that = this;
    let sign = wx.getStorageSync('sign');
    let informAll = that.data.informAll;
    console.log('switch1 发生 change 事件，携带值为', e.detail.value);
    if (e.detail.value == true) {
      that.setData({
        yes: 1
      })
    } else {
      that.setData({
        yes: 0
      })
    }
    wx.request({
      url: apiurl + "birth/subscribe-group-birth?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        g_id: that.data.g_id,
        yes: that.data.yes
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("订阅群生日:", res);
        var status = res.data.status;
        if (status == 1) {
          tips.success('设置成功')
        } else {
          console.log(res.data.msg);
          tips.alert(res.data.msg);
        }
      }
    })
  },
  // 群成员可加入
  switch3Change(e) {
    let that = this;
    let sign = wx.getStorageSync('sign');
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    if (e.detail.value == true) {
      that.setData({
        checked3: 1
      })
    } else {
      that.setData({
        checked3: 0
      })
    }
    wx.request({
      url: apiurl + "birth/change-group-only?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        g_id: that.data.g_id,
        yes: that.data.checked3
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("订阅群生日:", res);
        var status = res.data.status;
        if (status == 1) {
          tips.success('设置成功')
        } else {
          tips.alert(res.data.msg);
        }
      }
    })
  },
  // 设置生日可见
  switch2Change(e) {
    let that = this;
    let sign = wx.getStorageSync('sign');
    // show0否 1是
    if (e.detail.value==true){
      that.setData({
        show:1
      })
    }else{
      that.setData({
        show: 0
      })
    }
    console.log('switch2 发生 change 事件，携带值为', e.detail.value)
    wx.request({
      url: apiurl + "birth/change-show-year?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        g_id: that.data.g_id,
        show: that.data.show
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("设置生日可见:", res);
        var status = res.data.status;
        if (status == 1) {
          tips.success('设置成功')
        } else {
          console.log(res.data.msg);
          tips.alert(res.data.msg);
        }
      }
    })
  },
  // 退出群
  out(){
    let that = this;
    let sign = wx.getStorageSync('sign');
    wx.request({
      url: apiurl + "birth/quit-group?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        g_id: that.data.g_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("退出群:", res);
        var status = res.data.status;
        if (status == 1) {
          tips.success('成功退出群');
          wx.switchTab({
            url: '../qun/qun'
          })
        } else {
          console.log(res.data.msg);
          tips.alert(res.data.msg);
        }
      }
    })
  },
  //myself
  myself(){
    wx.navigateTo({
      url: '../myself/myself'
    })
  },
  move(e){
    wx.navigateTo({
      url: '../move/move?g_id=' +this.data.g_id
    })
  },
  
  qunmove(e){
    wx.navigateTo({
      url: '../qunmove/qunmove?g_id=' + this.data.g_id
    })
  },
  //群昵称
  qunNicename(e){
    let that = this;
    let sign = wx.getStorageSync('sign');
    console.log(e.detail.value);
    that.setData({
      group_name: e.detail.value
    })
    wx.request({
      url: apiurl + "birth/change-group-name?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        g_id: that.data.g_id,
        name: that.data.group_name
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("修改群昵称:", res);
        var status = res.data.status;
        if (status == 1) {
          tips.success('修改群昵称成功')
        } else {
          tips.alert(res.data.msg);
        }
      }
    })
  },
  // 成员昵称
  qunName(){
    wx.navigateTo({
      url: '../qunname/qunname?g_id=' + this.data.g_id
    })
  }


})