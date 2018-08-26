// pages/addNotice/addNotice.js
const utils = require('../../utils/util');
const app = getApp();
const basePath = app.globalData.basePath;
const imgPath = app.globalData.imgPath;
Page({
  data: {
    imgUrls: [],
    userInfo: '',
    descWordsNum: 0,
    address:''
  },
  onLoad: function (options) {
    //调用应用实例的方法获取全局数据
    app.getUserInfo(userInfo => {
      this.setData({
        userInfo: userInfo
      })
    })
  },
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '新建群活动',
    })
  },
  descInput(e) {
    let wordsNum = e.detail.value.length;
    this.setData({
      descWordsNum: wordsNum
    })
  },
  uploadImg() {
    let page = this;
    let imgUrls = page.data.imgUrls;
    let count = 3 - page.data.imgUrls.length;
    if (count < 1) {
      wx.showModal({
        title: '提示',
        content: '最多上传3张图片',
        showCancel: false,
        success: function (res) {
          console.log('用户点击确定')
        }
      })
      return
    }
    utils.uploadImg(page, count, imgUrls)
  },
  delUploadImg(event) {
    const imgUrls = this.data.imgUrls;
    const imgUrl = event.currentTarget.dataset.url;
    let newArray = [];
    for (let item of imgUrls) {
      if (item != imgUrl) {
        newArray.push(item)
      }
    }
    this.setData({
      imgUrls: newArray
    })
  },
  chooseAddressHandle:function(e){
    wx.chooseLocation({
      success:res=>{
        console.log(res)
        this.setData({
          address:res
        })
      }
    })
  },
  formSubmit: function (e) {
    const page = this;
    const public_URL = basePath + 'post/campaign';
    const upload_URL = basePath + 'uploadimg/index';
    const entryType = 2;
    let imgUrls = page.data.imgUrls;
    let param = e.detail.value;
    let keywords = param.keywords.split(/[，,]/)
    param.keywords = keywords;
    param.classify = 2;
    if (page.data.address!=''){
      param.address_name = page.data.address.name;
      param.address_latitude = page.data.address.latitude;
      param.address_longitude = page.data.address.longitude;
    }
    if (param.title == '' || param.content == '') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '必填项必须输入内容',
        success: function (res) {
        }
      })
      return
    }
    utils.upLoadImg(app, page, upload_URL, entryType, public_URL, imgUrls, param)
  }
})

