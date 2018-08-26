let app = getApp();
let url = app.globalData.url;
let url_common = app.globalData.url_common;
let RG = require('../../../utils/model/register.js');
let register = new RG.register();
Page({
  data: {
    name: '',
    telephone: '',
    checkCode: '',
    checking: "0",//获取验证码请求是否发送
    time: "0",//获取验证码按钮是否可点
    loading: "0",//加载动画控制
    getCode: "获取验证码",
    endTime: 60,//多少秒后验证码得发
    nonet: true
  },
  onShow() {
    app.netWorkChange(this)
  },
  // 清除记时器(辅助函数)
  clearTime() {
    if (this.data._time) {
      this.setData({
        time: "1"
      })
    } else {
      // 清零短信倒计时
      this.setData({
        time: "0"
      })
    }
  },
  //手机号码验证
  checkPhone(e) {
    let telephone = e.detail.value;
    this.setData({
      telephone
    })
  },
  //获取验证码按钮倒计时动效
  checkCode(e) {
    e.detail.disabled = true;
    let telephone = this.data.telephone;
    let checking = this.data.checking;
    let that = this;
    let endTime = this.data.endTime
    endTime = 60;
    app.globalData.verify.mobile(this, telephone, res => {
      that.setData({
        checking: "1",
        time: "1",
      });
      that.getCaptcha(that, telephone, endTime);
    })
  },
  // 请求验证码
  getCaptcha(that, user_mobile, endTime) {
    app.httpPost({
      url: url_common + '/api/auth/authCaptcha',
      data: {
        user_mobile
      },
    }, this, res => {
      that.setData({
        checking: "0",
        time: '0'
      });
    }).then(res => {
      let _time = setInterval(function () {
        that.setData({
          checking: "0"
        });
        if (endTime > 1) {
          endTime--;
          that.setData({
            getCode: endTime + 's后重新获取'
          })
        }
      }, 1000)
      setTimeout(function () {
        that.setData({
          time: "0",
          getCode: "获取验证码"
        });
        clearInterval(_time)
      }, 60000);
    }).catch(res => {
      this.setData({
        checking: "0",
        time: '0'
      });
    })
  }, 

  // 获取验证码的值 
  checkCode2(e) {
    let that = this;
    that.setData({
      checkCode: e.detail.value
    });
  },
  // personInfo点击跳转
  nextPage() {
    register.personInfoRegister.call(this);
  },
});