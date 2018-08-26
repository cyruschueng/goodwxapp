// pages/voteInfo/voteInfo.js
const app = getApp();
const utils = require('../../utils/util');
const basePath = app.globalData.basePath;
const imgPath = app.globalData.imgPath;
let vote_choice=[];
Page({
  data: {
    infoId: '',//将本页面详情ID
    userInfo: {}, 
    progressActive:true,
    infoData:{}, //本页面详情
    options: [], //选项
    voteFlag:true,//是否可以投票
    submitHidden:true  //投票按钮是否显示
  },
  onLoad: function (options) {
    //调用应用实例的方法获取全局数据
    var page=this;
    let id=options.id;
    this.setData({
      infoId: options.id //将本页面详情ID 存入infoId中
    })
    wx.showShareMenu({
      withShareTicket: true
    })
    app.checkInfo(function () {
      try {
        var wxBizKey = wx.getStorageSync('wxBizKey');
        getInfo(page, id, wxBizKey)
        if (wx.getStorageSync('isShare')) {
          let shareTicket = wx.getStorageSync('shareTicket')
          app.getShareInfo(wxBizKey, shareTicket)
        }
      }
      catch (e) {
      }
    })
  },
  onShow:function(){
    var page=this;
    wx.setNavigationBarTitle({
      title: '群投票',
    })
  },
  // 选择投票项
  vote: function (e) {//heshan代表选中，'1'为选中，'0'为不选中
    const page=this;
    let list = page.data.options;
    let vote_name = e.currentTarget.dataset.votename;
    let idx = e.currentTarget.dataset.idx;
    vote_choice=[];
    if (page.data.infoData.vote_classify == '0') {  //如果是投票是单选，只能有一个选中项
      list.forEach((val, index) => {
        if (idx == index) {
          val.heshan = 1
        }else{
          val.heshan = 0
        }
      });
    } else {//如果是投票是多选，选择项的heshan属性切换为0或1
      if (list[idx].heshan == 0) {
        list[idx].heshan = 1;
      } else {
        list[idx].heshan = 0;
      }
    }
    for (let item of list) { //遍历数组，将选中项加入vote_choice数组
      if (item.heshan == 1) {
        vote_choice.push(item.vote_name)
      }
    }
    if (vote_choice.length > 0) {
      page.setData({
        submitHidden: false
      })
    }else{
      page.setData({  //如果vote_choice为空，确定按钮隐藏
        submitHidden: true
      })
    }
    page.setData({
      options: list
    })
  },
  // 提交投票
  voteSubmit:function(e){
    const page = this;
    let send_id = page.data.infoId;
    app.checkInfo(function () {
      try {
        var wxBizKey = wx.getStorageSync('wxBizKey');
        vote(page, wxBizKey, vote_choice, send_id)
      }
      catch (e) {
      }
    })
  },
  // 跳转至投票人详情
  toVotersInfo:function(e){
    const page=this;
    let vote_name = e.currentTarget.dataset.votename;
    let send_id = page.data.infoId;
    wx.navigateTo({
      url: '../votersInfo/votersInfo?send_id=' + send_id + '&vote_name=' + vote_name+'',
    })
  },
  //带shareTickets的分享
  onShareAppMessage: function () {
    let _id = this.data.infoId;
    return {
      title: '群里有事',
      path: '/page/user?id=' + _id + '',
      success: function (res) {
        var shareTicket = res.shareTickets[0];
        console.log(res)
        if (!shareTicket || shareTicket=='undefined') {
          return false;
        }
        app.getShareInfo(shareTicket)
      },
      fail: function (res) {
        // 转发失败
        console.log(res)
      }
    }
  }
})

function getInfo(page, id, wxBizKey,cb){
  wx.showLoading({
    title: '加载中',
    mask: true
  })

  wx.request({
    url: basePath +'look/vote',
    data:{
      send_id:id,
      wxBizKey: wxBizKey
    },
    method:'POST',
    success:res=>{
      console.log(res)
      if (res.data.statusCode=='200'){
        page.setData({
          infoData:res.data,
          options: res.data.vote_status.vote_choice
        })
        if (res.data.active_flag == 1){
          page.setData({
            voteFlag:false
          })
        }
      }
    },
    complete:function(){
      wx.hideLoading()
    }
  })
}

function vote(page, wxBizKey, vote_choice, send_id){
  let openGId='';
  try {
    let value = wx.getStorageSync('openGId')
    if (value) {
      openGId = value
    }
  } catch (e) {
  }
  wx.request({
    url: basePath + 'receive/vote',
    data: {
      send_id: send_id,
      wxBizKey: wxBizKey,
      vote_choice: vote_choice,
      openGId: openGId
    },
    method: 'POST',
    success: res => {
      console.log(res)
      if (res.statusCode == 200){
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000,
          complete: function () {
            page.setData({
              options: res.data.vote_status.vote_choice,
              submitHidden:true
            })
          }
        })
      }
    }
  })
}