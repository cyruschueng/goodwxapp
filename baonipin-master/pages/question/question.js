// pages/question/question.js
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
    quesitionIndex: -1,
    question:[
       {
         title:"包你拼-怎么玩？",
         child:"你可以设置一个带奖励的拼字或拼图，发给好友，好友在指定时间内拼成才能领取奖励",
         active:false
       },{
         title: "我创建了但没有发出去？",
         child: "请在主页【我的记录】中找到相应的记录，点击进入详情后点击【去转发】",
         active:false
       }
       , {
         title: "好友可以转发我的拼字或拼图么？",
         child: "请在主页【我的记录】中找到相应的记录，点击进入详情后点击【去转发】",
         active: false
       }
       , {
         title: "发包你拼会收取服务费吗？",
         child: "会收取2%的服务费",
         active: false
       }
       , {
         title: "未领取的金额会怎么样处理？",
         child: "",
         active: false
       }
       , {
         title: "如何提现到微信钱包？",
         child: "",
         active: false
       }
       , {
         title: "提现会收取服务费吗？",
         child: "",
         active: false
       }
       , {
         title: "如何联系客服？",
         child: "",
         active: false
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
  checked(e) {
    let that = this;
    console.log(e)
    let quesitionIndex = e.currentTarget.dataset.index;
    that.setData({
      quesitionIndex
    })
  }

})