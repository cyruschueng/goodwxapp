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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options:", options);
    this.setData({
      g_id: options.g_id
    })
  },
  onShow: function () {
    let that = this;
    let sign = wx.getStorageSync('sign');
    wx.request({
      url: apiurl + "birth/get-group-member-nickname?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        g_id: that.data.g_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("所有会员昵称:", res);
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            allList:res.data.data
          })
        } else {
          console.log(res.data.msg);
          tips.alert(res.data.msg);
        }
      }
    })
  },
  edit(e){
    this.setData({
      showModalStatus:true,
      mid: e.currentTarget.dataset.mid
    })
  },
  //name
  name(e){
    console.log(e.detail.value);
    this.setData({
      name: e.detail.value
    })
  },
  btn_no(){
    this.setData({
      showModalStatus: false
    })
  },
  btn_ok() {
    let that = this;
    let sign = wx.getStorageSync('sign');
    wx.request({
      url: apiurl + "birth/change-group-nickname?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        g_id: that.data.g_id,
        mid: that.data.mid,
        name: that.data.name
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("修改昵称:", res);
        var status = res.data.status;
        if (status == 1) {
          tips.success('修改成功');
          that.setData({
            showModalStatus: false
          })
        } else {
          console.log(res.data.msg);
          tips.alert(res.data.msg);
        }
      }
    })
  }
  
})