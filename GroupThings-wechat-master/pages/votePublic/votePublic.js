// pages/addVote/addVote.js
const app = getApp();
const utils = require('../../utils/util');
const basePath = app.globalData.basePath;
const imgPath = app.globalData.imgPath;
let optionLastId=1
Page({
  data: {
    submitDisabled:false,
    options:[0,1],//选项，最少2项
    userInfo:'',
    voteType:[
      {
        value: '单项选择',
        name: '0', 
        checked: 'true'
      }, {
        value: '多项选择',
        name: '1'
      }
    ],
    curDate:'',
    strDate:'',
    strTime:'',
    curTime:''
  },
  onLoad: function (options) {
    var page=this;
    var now = new Date()
    var now2 = new Date(now.getTime() + 10 * 60 * 1000);
    var date = utils.formatTime(now).split(' ');
    var strDatetime = utils.formatTime(now2).split(' ')
    wx.setNavigationBarTitle({
      title: '新建投票',
    })
    page.setData({
      curDate: date[0],
      curTime:date[1],
      strDate: strDatetime[0],
      strTime: strDatetime[1].substring(0, strDatetime[1].lastIndexOf(':'))
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(userInfo => {
      this.setData({
        userInfo: userInfo
      })
    })
  },
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '新建群投票',
    })
  },
  //增加选项
  addOption:function(){
    var page=this;
    var optionsArray = page.data.options;
    optionLastId = optionLastId+1;
    optionsArray.push(optionLastId);
    page.setData({
      options: optionsArray
    })
  },
  //删除当前选项
  delOption:function(e){
    var page=this;
    var idx = e.currentTarget.dataset.idx;
    var optionsArray = page.data.options;
    //console.log(optionsArray)
    optionsArray.splice(idx,1);
    page.setData({
      options: optionsArray
    })
  },
  bindDateChange:function(e){
    let date=e.detail.value;
    this.setData({
      strDate:date
    })
  },
  bindTimeChange: function (e) {
    let time = e.detail.value;
    this.setData({
      strTime: time
    })
  },
  //表单提交
  formSubmit:function(e){
    const page=this;
    const public_URL = basePath + 'post/vote';
    const entryType= 3;
    let param =e.detail.value;
    let optionsData=[];
    if (param.title == '' || param.option_0 == '' || param.option_1 == ''){
      wx.showModal({
        title: '提示',
        content: '必填项必须输入内容',
        showCancel: false,
        success: function (res) {}
      })
      return
    }
    for (let index in param) {  //将投票选项拼成一个数组
      if (index.indexOf('option_') > -1) {
        optionsData.push(param[index])
        delete param[index]
      }
    }
    param.vote_name = optionsData;
    param.classify=3;
    console.log(param)
    app.checkInfo(function () {
      try {
        var wxBizKey = wx.getStorageSync('wxBizKey');
        console.log('new.wxBizKey = ' + wxBizKey);
        param.wxBizKey = wxBizKey;
        utils.publicHandle(public_URL,  entryType, param)
      }
      catch (e) {
      }
    })
  }
})
