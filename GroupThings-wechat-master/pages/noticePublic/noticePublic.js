// pages/addNotice/addNotice.js
const utils=require('../../utils/util');
const app = getApp();
const basePath = app.globalData.basePath;
const imgPath = app.globalData.imgPath;
Page({
  data: {
    imgUrls:[],
    userInfo: '',
    descWordsNum:0,
    template:{
      address: "https://develop.mmmee.cn/cmd/qunxiao/public/static/template/infoTemplat6.png",
      checked:true,
      footer:"https://develop.mmmee.cn/cmd/qunxiao/public/static/template/infoTemplat1_foot.png",
      hearder:"https://develop.mmmee.cn/cmd/qunxiao/public/static/template/infoTemplat1_head1.png",
      template_id:"6"
    }
  },
  onLoad: function (options) {
    //调用应用实例的方法获取全局数据
    app.getUserInfo(userInfo=> {
      this.setData({
        userInfo: userInfo
      })
    })
  },
  onShow: function () {
    let page=this;
    wx.setNavigationBarTitle({
      title: '新建群通知',
    })
    try {
      let value = wx.getStorageSync('template')
      if (value) {
        page.setData({
          template:value
        })
        wx.removeStorageSync('template')
      }
    } catch (e) {
      // Do something when catch error
    }
  },
  descInput(e){
    let wordsNum = e.detail.value.length;
    this.setData({
      descWordsNum: wordsNum
    })
  },
  uploadImg(){
    let page=this;
    let imgUrls = page.data.imgUrls;
    let count = 3 - page.data.imgUrls.length;
    if(count < 1){
      wx.showModal({
        title: '提示',
        content: '最多上传3张图片',
        showCancel:false,
        success: function (res) {
            console.log('用户点击确定')
        }
      })
      return
    }
    utils.uploadImg(page,count,imgUrls)
  },
  delUploadImg(event){
    const imgUrls = this.data.imgUrls;
    const imgUrl = event.currentTarget.dataset.url;
    let newArray=[];
    for (let item of imgUrls){
      if (item != imgUrl){
        newArray.push(item)
      }
    }
    this.setData({
      imgUrls: newArray
    })
  },
  choseTemplate(){
    let tpl = this.data.template.address
    wx.navigateTo({
      url: '../choseInfoTemplate/choseInfoTemplate?tpl=' + tpl+'',
    })
  },
  formSubmit: function (e) {
    const page=this;
    const public_URL = basePath +'post/notice';
    const upload_URL = basePath + 'uploadimg/index';
    const entryType=1;
    let imgUrls = page.data.imgUrls;
    let param = e.detail.value;
    let keywords = param.keywords.split(/[，,]/)
    param.keywords = keywords;
    param.classify = 1;
    //param.template = 2
    console.log(parseInt(page.data.template.template_id))
    param.template = parseInt(page.data.template.template_id);
    if (param.theme == '' || param.content == '') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '必填项必须输入内容',
        success: function (res) {
        }
      })
      return
    }
    utils.upLoadImg(app, page,upload_URL, entryType, public_URL, imgUrls, param)
  }
})