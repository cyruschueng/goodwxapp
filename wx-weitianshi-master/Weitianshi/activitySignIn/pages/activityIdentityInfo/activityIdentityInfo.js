var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
let RG = require('../../../utils/model/register.js');
let register = new RG.register();
Page({
  data: {
    name: '',
    brand: '',
    company: "",
    position: "",
    email: "",
    name: '',
    telephone: '',
    checkCode: '',
    checking: "0",//获取验证码请求是否发送
    time: "0",//获取验证码按钮是否可点
    loading: "0",//加载动画控制
    getCode: "获取验证码",
    endTime: 60,//多少秒后验证码得发
    nonet: true,
    user_info: ""
  },
  onLoad(options) {
    let that = this;
    let activity_id = options.activity_id;
    let competition_id = options.competition_id;
    let user_id = wx.getStorageSync("user_id");
    if (user_id) {
      this.userInfo(user_id)
      this.setData({
        user_id: user_id,
        activity_id: activity_id,
        competition_id: competition_id
      })
    } else {
      this.setData({
        activity_id: activity_id,
        user_id: user_id,
        competition_id: competition_id
      })
    }
  },
  //有user_id
  userInfo(user_id) {
    let that = this;
    app.httpPost({
      url: url_common + '/api/user/getUserBasicInfo',
      data: {
        user_id: user_id
      },
    }).then(res => {
      let user_info = res.data.user_info;
      let name = res.data.user_info.user_real_name;
      let email = user_info.user_email;
      let position = user_info.user_company_career;
      let company = user_info.user_company_name;
      let brand = user_info.user_brand;
      let telephone = user_info.user_mobile;
      let weChat = user_info.user_wechat;
      that.setData({
        name: name,
        email: email,
        position: position,
        company: company,
        brand: brand,
        telephone: telephone,
        weChat: weChat
      })
    })
  },
  //姓名
  name(e) {
    this.setData({
      name: e.detail.value
    })
  },
  //品牌验证
  checkBrand(e) {
    let brand = e.detail.value;
    brand = app.globalData.verify.deleteSymbol(brand)
    this.setData({
      brand
    });
  },
  //公司项的特殊符号过滤和值的双向绑定
  company(e) {
    let company = e.detail.value;
    company = app.globalData.verify.deleteSymbol(company);
    this.setData({
      company
    });
    // 传公司名称到后台以用于数据爬取
    app.httpPost({
      url: url_common + '/api/dataTeam/checkCompany',
      data: {
        com_name: company
      },
    }, this).then(res => { })
  },
  //职位项的特殊符号过滤和值的双向绑定
  position(e) {
    let position = e.detail.value;
    console.log(position)
    position = app.globalData.verify.deleteSymbol(position);
    this.setData({
      position
    });
  },
  //邮箱验证
  checkEmail(e) {
    let that = this;
    let email = e.detail.value;
    app.globalData.verify.email(this, email, res => {
    })
    that.setData({
      email
    })
  },
  //微信
  checkWechart(e) {
    this.setData({
      weChat: e.detail.value
    })
  },
  //手机号码验证
  checkPhone(e) {
    this.setData({
      telephone: e.detail.value
    })
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
    console.log(e)
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
  //注册过的用户
  signed() {
    let email = this.data.email;
    // 邮箱为非必填项,但是如果填写格式必须正确
    if (email == '') {
      register.identityRegister.call(this);
    } else {
      app.globalData.verify.email(this, email, res => {
        register.identityRegister.call(this);
      })
    }
  },
  //未注册的用户
  noSign() {
    let email = this.data.email;
    // 邮箱为非必填项,但是如果填写格式必须正确
    if (email == '') {
      register.identityRegister2.call(this);
    } else {
      app.globalData.verify.email(this, email, res => {
        register.identityRegister2.call(this);
      })
    }
  },
  //提交
  pushInfo() {
    let user_id = this.data.user_id;
    if (user_id) {
      this.signed(user_id)
    } else {
      this.noSign()
    }
  },
  //跳转
  jumpto(user_id,apply_id) {
    let competition_id = this.data.competition_id;
    let activity_id = this.data.activity_id;
    // 邮箱为非必填项,但是如果填写格式必须正确
    if (competition_id && competition_id != 0) {
      app.href("/pages/myProject/publishProject/publishProject?activity_id=" + activity_id + "&&competition_id=" + competition_id + "&apply_id=" + apply_id)
    } else {
      app.href("/activitySignIn/pages/activityIdentitySuccess/activityIdentitySuccess?user_id=" + user_id + "&&activity_id=" + activity_id)
    }
  }
})