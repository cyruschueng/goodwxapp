import { get_couplet, get_coupletType, creat_couplet} from "../../url.js"
var utils = require("../../utils/util.js")
const app = getApp();
var sessionKey = '';
Page({
  data: {
    coupletList:[],
    radioCheckVal:0,
    hideCustom:true,
    topWords:'',
    leftWords:'',
    rightWords:''
  },

  onLoad: function (options) {
    sessionKey = wx.getStorageSync("sessionKey");
    if (!sessionKey) {
      utils.getSessionKey(utils.getSetting);
      return;
    }
    
    this.getCoupletList();//获取对联列表
  },

  /*选择自定义*/
  bindTapCustom:function(){
    this.setData({
      hideCustom: !this.data.hideCustom
    })
  },

  /*监听自定义编辑*/
  inputTopWords:function(e){
    this.setData({
      topWords: e.detail.value,
      radioCheckVal: null
    })
  },

  inputLeftWords: function (e) {
    this.setData({
      leftWords: e.detail.value,
      radioCheckVal: null
    })
  },

  inputRightWords: function (e) {
    this.setData({
      rightWords: e.detail.value,
      radioCheckVal: null
    })
  },

  /*获取对联列表*/
  getCoupletList:function(){
    let that = this;
    let requestParams = JSON.stringify({
      OpenId: app.globalData.openId,
    })
    utils.requestLoading(get_couplet + "?sessionKey=" + sessionKey, "post", requestParams, "加载数据中...",
      function (res) {
        if (res.Status == 5) {
          wx.removeStorageSync("sessionKey");
          utils.getSessionKey(utils.getSetting);
        }

        that.setData({
          coupletList: res
        })
      }, function (res) {
        console.log(res);
      }
    )
  },

  /*选择对联*/
  radioCheckedChange:function(e){
    this.setData({
      radioCheckVal: e.currentTarget.dataset.checkindex
    })
    var pages = getCurrentPages();
    if(pages.length > 1){
      var prePage = pages[pages.length - 2];
      prePage.changeCouplet(e.currentTarget.dataset.couplettext);
    }
  },  

  /*确定使用*/
  backToSend:function(){
    let isSubmit = true;
    let that = this;
    let pages = getCurrentPages();
    if (this.data.radioCheckVal == null){
      if (that.data.topWords == ''){
        wx.showToast({
          title: '请输入横批',
          icon:'none'
        })
      } else if (that.data.leftWords == ''){
        wx.showToast({
          title: '请输入上联',
          icon: 'none'
        })
      } else if (that.data.rightWords == ''){
        wx.showToast({
          title: '请输入下联',
          icon: 'none'
        })
      } else if (!isSubmit){
        wx.showToast({
          title: '请求发送中',
          icon: 'loading'
        })
      }else{
        isSubmit = false;
        let requestParams = JSON.stringify({
          CreatebyName:app.globalData.userInfo.nickName,
          RightWords:that.data.rightWords,
          TopWords:that.data.topWords,
          LeftWords:that.data.leftWords
        })
        utils.requestLoading(creat_couplet+"?sessionKey="+sessionKey, "post", requestParams,'数据加载中...',
          function(res){
            isSubmit = true;
            if (res.Status == 5) {
              wx.removeStorageSync("sessionKey");
              utils.getSessionKey(utils.getSetting);
            }else if (res.Status == 1){
              if (pages.length > 1) {
                var prePage = pages[pages.length - 2];
                prePage.changeCouplet(
                  { 
                  "TopWords": that.data.topWords, 
                  "LeftWords": that.data.leftWords, 
                  "RightWords": that.data.rightWords, 
                  "ID": res.CoupletId
                  }
                );
                wx.navigateBack({
                  delta: 1
                })
              }
            }else if(res.Message){
              wx.showToast({
                title: res.Message,
                icon:'none'
              })
            }
          },function(res){
            console.log(res)
          }
        );
      }
    }else{
      wx.navigateBack({
        delta: 1
      })
    }
  }

})