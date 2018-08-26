// pages/RestPassword/RestPassword.js
Page({
  data: {
    VerifyCode:"获取验证码",
    linkTel:''
  },
  //手机输入框遗失光标则获取value然后把数据放入this.data.linkTel中去
  blurTel: function (e) {
    var linkTel = e.detail.value.replace(/\s/g, "");
    this.setData({
      linkTel: linkTel
    })
  },
  //点击发送验证码
  setVerify: function (e) {
    var linkTel = this.data.linkTel;
    var regPh = /^1[34578]\d{9}$/; //校验手机号的正则
    if(!(regPh.test(linkTel))){
      wx.showModal({
        title: '提示',
        content: '您输入的手机号码不正确',
        showCancel: false
      })
      return;
    }
    var _Url = 'https://teacherapi.gaosiedu.com/api/Password?phone=' + linkTel ;//这个由后台或者你们公司的短信平台提供，一般是http://ip:prot/短信验证项目和具体地址

    var total_micro_second = 60 * 1000;    //表示60秒倒计时，想要变长就把60修改更大
    //验证码倒计时
    count_down(this, total_micro_second);
    wx.request({
      url: _Url,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      // data: [{
      //   agentLinktel: linkTel
      // }],
      success: function (res) {
        console.log(res);
        if (res.data.ResultType == "00") {
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
  //确认重置密码
  saveVerify: function(e){
    console.log(e)
    var regPs = /^(?![^a-z]+$)(?!\\D+$).{8,32}$/;  //校验密码的正则
    var _Url = 'https://teacherapi.gaosiedu.com/api/Password';
    if(!(regPs.test(e.detail.value.password))){
      wx.showModal({
        title: '提示',
        content: '您输入的密码格式不正确，格式为包含字母和数字的至少8长度',
        showCancel: false
      })
      return;
    }
    if(e.detail.value.password != e.detail.value.againPassword){
      wx.showModal({
        title: '提示',
        content: '两次密码输入不一致',
        showCancel: false
      })
      return;
    }
     wx.request({
      url: _Url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        phone:e.detail.value.phone,
        code: e.detail.value.code,
        password:e.detail.value.password
      },
      success: function (res) {
        console.log(res);
        if (res.data.ResultType == "00") {
          wx.showModal({
            title: '提示',
            content: '重置密码成功成功！',
            showCancel: false
          })
        }
        setTimeout(function(){
          wx.redirectTo({ url: '/pages/index/index' })
        },1000)
      },
      fail: function (err) {
        console.log("error res=")
      }
    });
  }
})


//下面的代码在page({})外面
/* 毫秒级倒计时 */
function count_down(that, total_micro_second) {
  if (total_micro_second <= 0) {
    that.setData({
      VerifyCode: "重新发送"
    });
    // timeout则跳出递归
    return;
  }

  // 渲染倒计时时钟
  that.setData({
    VerifyCode: date_format(total_micro_second) + " 秒"
  });

  setTimeout(function () {
    // 放在最后--
    total_micro_second -= 10;
    count_down(that, total_micro_second);
  }, 10)

}

// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
function date_format(micro_second) {
  // 秒数
  var second = Math.floor(micro_second / 1000);
  // 小时位
  var hr = Math.floor(second / 3600);
  // 分钟位
  var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
  // 秒位
  var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
  // 毫秒位，保留2位
  var micro_sec = fill_zero_prefix(Math.floor((micro_second % 1000) / 10));
  return sec;
}
// 位数不足补零
function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}