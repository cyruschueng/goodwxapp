// pages/votersInfo/votersInfo.js
const app = getApp();
const utils = require('../../utils/util');
const basePath = app.globalData.basePath;
const imgPath = app.globalData.imgPath;
Page({
  data: {
    voters:[]
  },
  onLoad: function (options) {
    console.log(options)
    const page=this;
    const send_id = options.send_id;
    const vote_name = options.vote_name
    app.checkInfo(function () {
      try {
        var wxBizKey = wx.getStorageSync('wxBizKey');
        getInfoList(page, wxBizKey, send_id, vote_name)
      }
      catch (e) {
      }
    })
  },
  onShow: function () {
  
  },
})

function getInfoList(page, wxBizKey, send_id, vote_name){
  wx.showLoading({
    title: '加载中...',
  })
  wx.request({
    url: basePath + 'persion/index',
    data: {
      send_id: send_id,
      wxBizKey: wxBizKey,
      classify: '3',
      vote_name: vote_name   
    },
    method: 'POST',
    success: res => {
      console.log(res)
      if (res.data.statusCode == '200') {
        page.setData({
          voters: res.data.person_status
        })
      }
    },
    complete:function(){
      wx.hideLoading()
    }
  })
}