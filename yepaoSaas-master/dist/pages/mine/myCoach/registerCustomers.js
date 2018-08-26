// pages/mine/myCoach/registerCustomers.js

import * as mineService from '../../../services/mine-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    textareaPlaceHidden: false,
    taskContent: '',

    selectCustName: '点击选择会员',

    infoTransferSelectMem: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  onShow: function (options) {
    var meminfo = wx.getStorageSync('ptdjkhzlSelectCust');
    if (meminfo) {
      console.log('ptdjkhzlSelectCust .. ' + JSON.stringify(meminfo));
      this.setData({
        infoTransferSelectMem: meminfo,
        selectCustName: meminfo.name
      })
      wx.removeStorage({
        key: 'ptdjkhzlSelectCust',
      })
    }
  },

  bindTextareaInpput(e) {
    var value = e.detail.value;

    this.setData({
      taskContent: value,
      textareaPlaceHidden: true
    })
  },
  // 失去焦点时
  bindTextareaBlur(e) {
    var value = e.detail.value;
    if (value == '') {
      this.setData({
        textareaPlaceHidden: false
      })
    }
  },
  // 选择会员
  bindSelectedMemTap () {
    wx.navigateTo({
      url: '../selectedMem?memIdentity=ptdjkhzl',
    })
  },
  // 加入任务列表
  bindJoinTaskListTap() {

    mineService.uploadRegisterCust(this.data.infoTransferSelectMem.id, this.data.taskContent).then((result) => {

      wx.navigateBack({
        delta: 1
      })

    }).catch((error) => {
      console.log(error);
    })
  }

})