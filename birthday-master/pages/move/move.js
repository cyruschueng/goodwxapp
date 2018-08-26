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
    arr :[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options:",options);
    let informAll = wx.getStorageSync('informAll');
    this.setData({
      types: options.types,
      g_id: options.g_id,
      informAll: informAll,
      members: informAll.members,
      group_name: informAll.group_info.group_name
    })
  },
  onShow: function () {
    let that = this;
    let sign = wx.getStorageSync('sign');
    let members = that.data.members;
    for (let i = 0; i < members.length; i++) {
      members[i].active = false
    }
    that.setData({
      members
    })
  },
  //选择
  checked(e){
    console.log(e);
    let that = this;
    let members = that.data.members;
    let mid = e.currentTarget.dataset.mid;
    let index = e.currentTarget.dataset.index;
    let active = e.currentTarget.dataset.active;
    
    members[index].active=!active;
    that.setData({
      members
    })
   
  },
  quxaio(){
    let informAll = this.data.informAll 
    this.setData({
      members:informAll.members,
      arr:[],
      str:''
    })
    wx.navigateBack({
      url: '../qunsetting/qunsetting?g_id=' + this.data.g_id
    })
  },
  move(){
    let that = this;
    let sign = wx.getStorageSync('sign');
    let arr = that.data.arr;
    let members = that.data.members;
    let str = ''
    for (let i = 0;i<members.length;i++){
      if (members[i].active == true) {
        console.log('true', i);
        arr.push(members[i].mid);
        str = arr.join(",");
        console.log('strtrue', str);
        that.setData({
          arr,
          str
        })
      }
    }
    
    wx.request({
      url: apiurl + "birth/remove-group-friend?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        g_id: that.data.g_id,
        mid: that.data.str
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("移除会员:", res);
        var status = res.data.status;
        if (status == 1) {
          tips.success('移除会员成功')
        } else {
          tips.alert(res.data.msg);
        }
      }
    })
  }


})