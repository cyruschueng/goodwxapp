//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userSrc:'../images/user1.jpg',
    passSrc:'../images/pass1.jpg',
    studentPhone:'',
    studentPassword:'',
    shortMessage:'',
    hasStudent: true,//是否有这个学生
    show: true,
    text:'获取验证码',
  },
  onLoad: function(res){
    // console.log(res)
    var queryArr = res.id.split(',')
    wx.setStorageSync('queryArr',queryArr)
    
    //已登录就不再次登陆
    if(wx.getStorageSync('studentMessage')){
      wx.redirectTo({ url: '/pages/taskCardProgress/taskCardProgress'})
      return;
    }
  },
  // 获取输入账号  
  phoneChange: function (e) {
    this.setData({
      studentPhone: e.detail.value
    })
  },  
  // 获取输入密码  
  passwordChange: function (e) {
    this.setData({
      studentPassword: e.detail.value
    })
  },
  shortMessageChange: function(e){
    this.setData({
      shortMessage: e.detail.value
    })
  },
  getCode: function(){
    var total = 60;
    var that = this;
    setInterval(function(){
      total--;
      if(total <=0){
        that.setData({
          text:'重新获取'
        })
        return
      }
      that.setData({
        text:total+'秒'
      })
    },1000)

    // 获取验证码
    var linkTel = this.data.studentPhone;
    var regPh = /^1[34578]\d{9}$/; //校验手机号的正则
    if(!(regPh.test(linkTel))){
      wx.showModal({
        title: '提示',
        content: '您输入的手机号码不正确',
        showCancel: false
      })
      return;
    }
    var _Url = 'https://teacherapi.gaosiedu.com/api/StudentPhoneLogin?phone=' + linkTel+'&appid=web' ;//这个由后台或者你们公司的短信平台提供，一般是http://ip:prot/短信验证项目和具体地址

    wx.request({
      url: _Url,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        if (res.data.ResultType == 0) {
          wx.showModal({
            title: '提示',
            content: '发送验证码成功！',
            showCancel: false
          })
        }
      },
      fail: function (err) {
        console.log("error res=")
      }
    });
  },
  goPass:function(){
    this.setData({
      show:true
    })
  },
  goMessage:function(){
    this.setData({
      show:false
    })
  },
  // 密码登陆
  login: function () {

    // wx.redirectTo({ url: '/pages/taskCardProgress/taskCardProgress'})

    var that = this;
    // 校验表单
    if (this.data.studentPhone.length == 0 || this.data.studentPassword.length == 0) {
      wx.showModal({
        title: '提示',
        content: '账号密码不能为空',
        showCancel: false
      })
      return;
    }else {

      // 校验表单成功
      wx.login({
        success: function(response){
          if(response.code){
            wx.request({
              url: 'https://teacherapi.gaosiedu.com/api/StudentLogin', 
              method:'post',
              data: {
                "loginPhone": that.data.studentPhone,
                "password": that.data.studentPassword,
                "kind": 99,
                "appId": "web"
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              // dataType: JSON,
              success: function(res) {
                // console.log(res)
                var resData = res.data;
                if(resData.ResultType == 0){
                  that.setData({hasStudent: true})
                  // console.log(resData.Message)
                  // wx.setStorageSync('teacherToken',resData.Message)
                  wx.setStorageSync('studentMessage',resData.Message)
                  
                }else if(resData.ResultType == 3){
                  that.setData({hasStudent: false})
                }else{
                  wx.showModal({
                    title: '提示',
                    content: '您输入的账号或密码不正确，请重新输入',
                    showCancel: false
                  })
                  return;
                }
                //更新hasStudent的值
                wx.setStorageSync('hasStudent',that.data.hasStudent);
                wx.setStorageSync('studentTask',resData.AppendData);
                wx.redirectTo({ url: '/pages/taskCardProgress/taskCardProgress'});
              },
              fail: function(err){
                // console.log(err)
              }
            })
          }
        }
      })
    }
  },

  


 // 验证码登陆
  login1: function () {
    // wx.redirectTo({ url: '/pages/taskCardProgress/taskCardProgress'})

    var that = this;

      // 校验表单成功
      wx.login({
        success: function(response){
          if(response.code){
            wx.request({
              url: 'https://teacherapi.gaosiedu.com/api/StudentPhoneLogin', 
              method:'post',
              data: {
                "phone": that.data.studentPhone,
                "code": Number(that.data.shortMessage),
                "kind": '99',
                "appId": "web"
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              // dataType: JSON,
              success: function(res) {
                console.log(res)
                var resData = res.data;
                if(resData.ResultType == 0){
                  that.setData({hasStudent: true})
                  // wx.setStorageSync('teacherToken',resData.Message)
                  wx.setStorageSync('studentMessage',resData.Message)
                  
                }else if(resData.ResultType == 3){
                  that.setData({hasStudent: false})
                }
                //更新hasStudent的值
                wx.setStorageSync('hasStudent',that.data.hasStudent);
                wx.setStorageSync('studentTask',resData.AppendData);
                wx.redirectTo({ url: '/pages/taskCardProgress/taskCardProgress'});
              },
              fail: function(err){
                console.log(err)
              }
            })
          }
        }
      })
  },
})
