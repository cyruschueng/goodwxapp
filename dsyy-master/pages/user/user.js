var util = require('../../utils/util.js')
const qiniuUploader = require("../../utils/qiniuUploader");
var vm = null
//获取应用实例
var app = getApp()

var qnToken = ""
// 初始化七牛相关参数
function initQiniu() {
  var options = {
    region: 'ECN', // 华东区
    uptoken: qnToken
  };
  console.log("initQiniu options:" + JSON.stringify(options))
  qiniuUploader.init(options);
}

Page({
  data: {
    title: "资料修改",
    nick_name: "",
    avatar: "",
    phonenum: "",
    gender: "",
    gender_f:"",
    type: 0,
    toastHidden: true,
    notice_str: ""
  },
  onLoad: function (options) {
    vm = this
    var title = vm.data.title
    wx.setNavigationBarTitle({ title: title })
    util.showLoading('加载数据');   //加载数据
    var nick_name = app.globalData.userInfo.nick_name;  //获取昵称
    var avatar = app.globalData.userInfo.avatar;    //获取头像
    var phonenum = app.globalData.userInfo.phonenum;  //获取电话
    var gender = app.globalData.userInfo.gender;    //获取性别
    var gender_f = gender==1?"男":"女"
    var type = app.globalData.userInfo.type;    //
    vm.setData({
      nick_name: nick_name,
      avatar: avatar,
      phonenum: phonenum,
      gender: gender,
      gender_f: gender_f,
      type: type
    })
    //结束加载
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },
  //更改用户头像
  editImg: function (e) {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0]
        console.log("tempFilePaths:" + JSON.stringify(tempFilePaths))
        vm.setData({
          avatar: tempFilePaths
        })
        var param = {}
        //获取七牛上传token
        util.getQnToken(param, function (res) {
          console.log(JSON.stringify(res));
          if (res.data.result) {
            qnToken = res.data.obj;
            console.log("qiniu upload token:" + qnToken)
            initQiniu();
            //获取token成功后上传图片
            qiniuUploader.upload(tempFilePaths, (res) => {
              console.log("qiniuUploader upload res:" + JSON.stringify(res));
              vm.setData({
                avatar: util.getImgRealUrl(res.key)
              })
            }, (error) => {
              console.error('error: ' + JSON.stringify(error));
            })
          }
        }, null);

      }
    })
  },
  //更改用户信息
  formSubmit: function (e) {
    console.log('form submit：', e.detail.value)
    var nick_name = e.detail.value.nick_name 
    var phonenum = e.detail.value.phonenum == "" ? vm.data.phonenum : e.detail.value.phonenum
    var gender = e.detail.value.gender == "" ? vm.data.gender : e.detail.value.gender
    gender = gender == "男" ? "1" : "2"
    var type = vm.data.type == "" ? "" : vm.data.type
    var token = app.globalData.userInfo.token
    vm.setData({
      phonenum: phonenum,
      gender: gender
    })
    var param = {
      nick_name: nick_name,
      phonenum: phonenum,
      gender: gender,
      type: type,
      token: token
    }
    console.log(JSON.stringify(param))
    util.updateUserInfo(param, function (ret) {
      console.log("更新用户信息：" + JSON.stringify(ret))
      if (ret.data.code == "200") {
        var userInfo = app.globalData.userInfo
        console.log("获取缓存：" + JSON.stringify(userInfo))
        userInfo.phonenum = vm.data.phonenum
        userInfo.gender = vm.data.gender
        userInfo.type = vm.data.type
        userInfo.token = vm.data.token
        app.globalData.userInfo = userInfo
        console.log("new userInfo：" + JSON.stringify(app.globalData.userInfo))
        app.storeUserInfo(userInfo)  //更新缓存
        vm.setData({
          toastHidden: false,
          notice_str: "提交成功"
        })
      }
    })

  },
  toastChange: function (e) {
    vm.setData({
      toastHidden: true,
      notice_str: ""
    })
  },
})