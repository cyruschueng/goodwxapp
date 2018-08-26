const app = getApp();
const common = require('../../common.js');
const apiurl = 'https://friend-guess.playonwechat.com/';
let sign = wx.getStorageSync('sign');
import tips from '../../utils/tips.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    birthdayList:[
      {
        title:'生日密码',
        img:'https://static.shengri.cn/uploads/game/find/birthdayMima1.png?imageslim'
      }, {
        title: '明星生日',
        img: 'https://static.shengri.cn/uploads/game/find/birthdayMima1.png?imageslim'
      }, {
        title: '性格档案',
        img: 'https://static.shengri.cn/uploads/game/find/birthdayMima1.png?imageslim'
      }, {
        title: '解密命运',
        img: 'https://static.shengri.cn/uploads/game/find/birthdayMima1.png?imageslim'
      }, {
        title: '生日密码',
        img: 'https://static.shengri.cn/uploads/game/find/birthdayMima1.png?imageslim'
      }, {
        title: '可能认识的朋友',
        img: 'https://static.shengri.cn/uploads/game/find/birthdayMima1.png?imageslim'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  findInform(e){
    let sign = wx.getStorageSync('sign');   
    let index = e.currentTarget.dataset.index;
    let inx = index+1;
    console.log(index);
    wx.navigateTo({
      url: "../find" + inx + "/find" + inx +""
    })
  }

 
})