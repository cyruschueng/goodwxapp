const app = getApp();
const utils = require('../../utils/util');
const basePath = app.globalData.basePath;
const imgPath = app.globalData.imgPath;
var applyName=''; //报名姓名
var applyPhone=''; //报名手机号码
Page({
  data: {
    infoId: '',
    applyDisabled:false,
    submitDisabled:true,
    applyPupHidden:true,
    infoData: {},
    viewers:{},
    active_flag:true
  },
  onLoad: function (options) {
    const _id = options.id;
    const page = this;
    const info_URL = basePath + 'look/campaign';
    this.setData({
      infoId: options.id
    })
    console.log(options)
    wx.showShareMenu({
      withShareTicket: true
    })
    app.checkInfo(function () {
      try {
        var wxBizKey = wx.getStorageSync('wxBizKey');
        utils.getInfo(page, info_URL, _id, wxBizKey)
        if(wx.getStorageSync('isShare')){
          let shareTicket = wx.getStorageSync('shareTicket')
          app.getShareInfo(wxBizKey,shareTicket)
        }
      }
      catch (e) {
      }
    })
  },
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '群活动',
    })
  },
  openLocation:function() {
    let page = this;
    wx.openLocation({
      name: page.data.infoData.address_name,
      latitude: parseInt(page.data.infoData.address_latitude),
      longitude: parseInt(page.data.infoData.address_longitude),
      scale: 28
    })
  },
  toggleApplyPupHandle:function(){ //弹窗显示、隐藏
    let page=this;
    let pupHidden = this.data.applyPupHidden;
    if (pupHidden){
      this.setData({
        applyPupHidden: false
      })
      if (page.data.infoData.phone_need == '0') {
        applyPhone='0'
      }
      if (page.data.infoData.name_need == '0') {
        applyName = '0'
      }
    }else{
      this.setData({
        applyPupHidden: true
      })
    }
  },
  applyNameInput:function(e){
    let page=this;
    applyName=e.detail.value;
    if (applyName != '' && applyPhone!=''){
      page.setData({
        submitDisabled:false
      })
    }
  },
  applyPhoneInput: function (e) {
    let page = this;
    applyPhone = e.detail.value;
    if (applyName != '' && applyPhone != '') {
      page.setData({
        submitDisabled: false
      })
    }
  },
  applySubmit:function(e){
    const page=this;
    let applyParam = e.detail.value;
    app.checkInfo(function () {
      try {
        var wxBizKey = wx.getStorageSync('wxBizKey');
        activityApply(page, wxBizKey, applyParam)
      }
      catch (e) {
      }
    })
  },
  applyHandle:function(e){
    const page=this;
    app.checkInfo(function () {
      try {
        var wxBizKey = wx.getStorageSync('wxBizKey');
        applyHandle(page, wxBizKey)
      }
      catch (e) {
      }
    })
  },
  toPublicHandle:function(e){
    utils.toAddHandle(e)
  },
  onShareAppMessage: function () {
    let _id = this.data.infoId;
    return {
      title: '群里有事',
      path: '/page/user?id=' + _id + '',
      success: function (res) {
        var shareTickets = res.shareTickets;
        console.log(res)
        if (shareTickets.length == 0) {
          return false;
        }
        app.getShareInfo(shareTickets[0])
      },
      fail: function (res) {
        // 转发失败
        console.log(res)
      }
    }
  }
})




function activityApply(page,wxBizKey,applyParam){
  const apply_URL = basePath +'receive/campaign';
  let openGId='';
  try {
    let value = wx.getStorageSync('openGId')
    if (value) {
      openGId = value
    }
  } catch (e) {
  }
  console.log(openGId)
  wx.request({
    url: apply_URL,
    data:{
      send_id: page.data.infoId,
      wxBizKey: wxBizKey,
      user_name: applyParam.applyName,
      user_phone: applyParam.applyPhone,
      openGId: openGId
    },
    method:'POST',
    success:res=>{
      console.log(res)
      if (res.data.statusCode=='200'){
        wx.showToast({
          title: '报名成功！',
          icon: 'success',
          duration: 2000,
          complete:function(){
            page.setData({
              applyPupHidden: true,
              applyDisabled:true,
              viewers:res.data.valid_person,
              active_flag:false
            })
          }
        })
      }
    },
    fail:res=>{
      console.log(res)
    }
  })
}

function applyHandle(page, wxBizKey){
  const apply_URL = basePath + 'receive/campaign';
  let openGId = '';
  try {
    let value = wx.getStorageSync('openGId')
    if (value) {
      openGId = value
    }
  } catch (e) {
  }
  console.log(openGId)
  wx.request({
    url: apply_URL,
    data: {
      send_id: page.data.infoId,
      wxBizKey: wxBizKey,
      openGId: openGId
    },
    method: 'POST',
    success: res => {
      console.log(res)
      if (res.data.statusCode == '200') {
        wx.showToast({
          title: '报名成功！',
          icon: 'success',
          duration: 2000,
          complete: function () {
            page.setData({
              viewers: res.data.valid_person,
              active_flag: false
            })
          }
        })
      }
    },
    fail: res => {
      console.log(res)
    }
  })
}