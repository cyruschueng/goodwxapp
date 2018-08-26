// pages/introduce/edit/edit.js
var app = getApp();
var nicknameval= "";//昵称
var phoneInput="";//手机
var companyName="";//公司名称
var postInput="";//职位
var wechatvalue="";//微信
var addressinfo="";//地址
var TextAreaBlur="";//介绍
Page({
  data: {
    imgs:[],
      loadimglist: [],
      nicknameval:"",//昵称
      phoneInput:"",//手机
      companyName:"",//公司名称
      postInput:"",//职位
      wechatvalue:"",//微信
      addressinfo:"",//地址
      TextAreaBlur:"",//介绍
      uploaduserimg:""
  },
  //一键获取手机号码
  getPhoneNumber:function(e){
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData) 
    console.log(app.globalData.third_session);
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      var _this = this;
      var datacen = e.detail.encryptedData;
      var dataiv = e.detail.iv;
      wx.request({
        url: app.globalData.url + '/login/login/decodePhoneInfo',
        method: 'post',
        data: {
          third_session: app.globalData.third_session,
          encrypted_data: datacen,
          vi: dataiv,
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res);
          var resdata = res.data.data;
          _this.setData({
            phoneInput: resdata.phoneNumber
          })
        }
      })
    }else{
        wx.showModal({
            title: '提示',
            showCancel: false,
            content: '未授权..获取失败'
        })
    }  
  },
  onLoad: function (options) {
     var that = this;
     that.refreshinfo();
  },
  //刷新数据
  refreshinfo:function(){
    var _this = this;
    wx.request({
      url: app.globalData.url + '/login/Login/getUserInfo',
      method: 'get',
      data: { user_id: app.globalData.user_id },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var resdata = res.data.data;
        console.log(resdata);
        _this.setData({
          nicknameval: resdata.nickname,//昵称
          phoneInput: resdata.mobile,//手机
          companyName: resdata.company,//公司名称
          postInput: resdata.position,//职位
          wechatvalue: resdata.wechat,//微信
          addressinfo: resdata.address,//地址
          TextAreaBlur: resdata.introduce,//介绍
          loadimglist: resdata.photos,
          uploaduserimg: app.globalData.userinfo.avatarUrl
        })
      }
    })
  },
  //上传多图
  chooseImg:function(e){
    var that = this;
    wx.chooseImage({
      count: 5,
      sizeType: ['original'],
      success: function (res) {
        var imgsrc = res.tempFilePaths;
        var imgs = that.data.imgs;
        for (var i = 0; i < imgsrc.length; i++) {
          wx.uploadFile({
            url: app.globalData.url +'/login/login/setPhotos', //仅为示例，非真实的接口地
            filePath: imgsrc[i],
            name: 'file[]',
            formData: {
              user_id: app.globalData.user_id
            },
            success: function (res) {
              console.log(res.data);
              that.refreshinfo();
              wx.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 2000
              })
            }
          })
        }
      }
    })
  },
  //删除图片
  deletePic:function(e){
    var that = this;
    console.log(e.currentTarget.dataset.id);
    wx.request({
      url: app.globalData.url + '/commons/common/deletePic',
      method: "POST",
      data: {
        id: e.currentTarget.dataset.id,
        type:1
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.refreshinfo();
      }
    })
  },
  nicknameval:function(e){
    this.setData({
      nicknameval: e.detail.value
    })
    nicknameval=e.detail.value
  },
  phoneInput: function (e) {
    this.setData({
      phoneInput: e.detail.value
    })
    phoneInput = e.detail.value
  },
  companyName: function (e) {
    this.setData({
      companyName: e.detail.value
    })
    companyName = e.detail.value
  },
  postInput: function (e) {
    this.setData({
      postInput: e.detail.value
    })
    postInput = e.detail.value
  },
  wechatvalue: function (e) {
    this.setData({
      wechatvalue: e.detail.value
    })
    wechatvalue = e.detail.value
  },
  addressinfo: function (e) {
    this.setData({
      addressinfo: e.detail.value
    })
    addressinfo = e.detail.value
  },
  TextAreaBlur: function (e) {
    this.setData({
      TextAreaBlur: e.detail.value
    })
    TextAreaBlur = e.detail.value
  },
  submit:function(){
    if (this.data.nicknameval ==""){
      this.showToastconn("昵称");
    } else if (this.data.phoneInput == ""){
      this.showToastconn("手机");
    } else if (this.data.companyName == ""){
      this.showToastconn("公司");
    } else if (this.data.postInput == ""){
      this.showToastconn("职务");
    } else if (this.data.wechatvalue == ""){
      this.showToastconn("微信");
    } else if (this.data.addressinfo == "") {
      this.showToastconn("地址");
    } else if (this.data.TextAreaBlur == ""){
      this.showToastconn("介绍");
    }else{
      this.setUserdata(app.globalData.user_id);
    }
  },
  showToastconn:function(objtext){
    wx.showToast({
      title: objtext + '不能为空',
      icon: 'success',
      duration: 2000
    })
  },
  setUserdata: function (user_id){
      wx.request({
        url: app.globalData.url +'/login/Login/setUserInfo',
        method: 'post',
        data: {
          user_id: user_id,
          wechat: wechatvalue,
          mobile: this.data.phoneInput,
          nickname: nicknameval,
          position: postInput,
          company: companyName,
          introduce: TextAreaBlur,
          address:addressinfo
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res);
          if (res.data.errcode == "0"){
              wx.showToast({
                title: '设置成功',
                icon: 'success',
                duration: 2000
              })
              setTimeout(function(){
                wx.reLaunch({
                  url: '../introduce'
                })
              },2000)
          }else{
            wx.showToast({
              title: '设置失败',
              icon: 'success',
              duration: 2000
            })
          }
        }
      })
  }
})

