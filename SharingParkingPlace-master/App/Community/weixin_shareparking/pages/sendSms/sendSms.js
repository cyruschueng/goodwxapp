var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var app = getApp()
Page({
    data: {
        userInfo: {},
        verifySmsCode: '',
        phone: '',
        userId: null,
        equipId: null,
        description: null

    },
    onLoad: function (e) {
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            console.log(userInfo)
            //更新数据
            that.setData({
                userInfo: userInfo,
                userId: e.userId,
                equipId: e.equipId,
                description: e.description
            })
        })
    },
    sendSms: function (event) {
        var that = this
        var userId = event.detail.value.userId;
        var equipId = event.detail.value.equipId;
        var description = event.detail.value.description;
        if (userId != "" && equipId != "" && description!= "") {
  wx.request({
    url: 'http://127.0.0.1:8080/equipment/reserve',
    data: {
      userId: userId,
      equipId: equipId,
      description: description
    },
    // 请求头
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: "POST",
    success: function (res) {
      console.log(res.data);
      if (res.data['res'] == 1) {
        common.showTip('预约成功！');
        setTimeout(function () {
          wx.redirectTo({
            url: '../alltimeinfo/alltimeinfo'
          });
        }, 2000);
      }else {
        common.showTip('预约失败！');
      }
    }
  })
        }else {
          wx.showLoading({
            title: '车位信息错误！',
          });
          setTimeout(function() {
            wx.hideLoading();
          },1500)
        }


    },
    verifySmsCode: function (event) {
        var phone = this.data.phone;
        var verifyCode = event.detail.value.verifyCode;
        if (!phone) {
            common.showTip('请发送短信后再验证');
            return false;
        } else if (!verifyCode) {
            common.showTip('请输入验证码');
            return false;
        }

        Bmob.Sms.verifySmsCode(phone, verifyCode).then(function (obj) {
            common.showTip('验证成功' + "smsId:" + obj.msg);
            that.setData({
                verifySmsCode: "验证成功"
            })
        }, function (err) {
            common.showTip('验证失败' + err);
            that.setData({
                verifySmsCode: "验证失败"
            })
        });
    }
})