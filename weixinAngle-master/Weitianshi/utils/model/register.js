let app = getApp();
let url_common = app.globalData.url_common;
export class register {
  constructor() {

  }
  // 微信授权绑定 - 弹窗
  getPhoneNumber(e) {
    let encryptedData = e.detail.encryptedData;
    let iv = e.detail.iv;
    let _this = this;
    wx.login({
      success: function (login) {
        let code = login.code;
        app.httpPost({
          url: 'https://www.weitianshi.cn/api/wx/returnWxOauthMobile',
          data: {
            app_key: app.globalData.app_key,
            code: code,
            encryptedData: encryptedData,
            iv: iv
          }
        }, this).then(res => {
          let telephone = res.data.user_mobile;
          _this.setData({
            registerModalShow: false,
          })
          // 微信授权绑定 - 注册
          let open_session = wx.getStorageSync('open_session')
          app.httpPost({
            url: url_common + '/api/user/bindUser',
            data: {
              user_mobile: telephone,
              open_session: open_session,
              oauth: "wx_oauth"
            },
          }, _this).then(res => {
            wx.setStorageSync('user_id', res.data.user_id);
            app.globalData.user_id = res.data.user_id;
            app.href('/pages/register/companyInfo/companyInfo?user_career=' + res.data.user_career + "&&user_company=" + res.data.user_company + "&&uer_email=" + res.data.uer_email)
          })
          // 跳转
          app.getCurrentRouter();
        })
      }
    })
  }

  // 微信授权绑定 - 注册
  wxRegister(telephone) {
    _this = this;
    let open_session = wx.getStorageSync('open_session')
    app.httpPost({
      url: url_common + '/api/user/bindUser',
      data: {
        user_mobile: telephone,
        open_session: open_session,
        oauth: "wx_oauth"
      },
    }, this).then(res => {
      wx.setStorageSync('user_id', res.data.user_id);
      app.globalData.user_id = res.data.user_id;
      app.href('/pages/register/companyInfo/companyInfo?user_career=' + res.data.user_career + "&&user_company=" + res.data.user_company + "&&uer_email=" + res.data.uer_email)
    })
  }

  // 手机验证注册
  telephoneRegister() {
    let _this = this;
    app.getCurrentRouter();
    _this.setData({
      registerModalShow: false
    })
    app.href('/pages/register/personInfo/personInfo');
  }

  // 关闭注册方式选择弹框
  closeRegisterModal() {
    let _this = this;
    _this.setData({
      registerModalShow: false
    })
  }

  // 手机验证码绑定 - 注册(personInfo)
  personInfoRegister() {
    let _this = this;
    wx.login({
      success: function (res) {
        let user_mobile = _this.data.telephone;
        let captcha = _this.data.checkCode;
        let code = res.code;
        let open_session = wx.getStorageSync('open_session');
        if (!user_mobile) {
          app.errorHide(_this, '手机号码不能为空', 3000)
        } else if (!captcha) {
          app.errorHide(_this, '验证码不能为空', 3000)
        } else {
          app.httpPost({
            url: url_common + '/api/user/bindUser',
            data: {
              user_mobile,
              captcha,
              code,
              open_session,
            },
          }, _this).then(res => {
            wx.setStorageSync('user_id', res.data.user_id);
            app.globalData.user_id = res.data.user_id;
            app.redirectTo('/pages/register/companyInfo/companyInfo?user_career=' + res.data.user_career + "&&user_company=" + res.data.user_company + "&&uer_email=" + res.data.uer_email + '&&user_real_name=' + res.data.user_real_name)
          })
        }
      }
    })
  }

  // 注册相关信息填写(compnayInfo)
  companyInfoRegister() {
    let _this = this;
    let name = this.data.name;
    let company = this.data.company;
    let position = this.data.position;
    let brand = this.data.brand;
    let email = this.data.email;
    let user_id = wx.getStorageSync('user_id');
    if (!name) {
      app.errorHide(this, '姓名不能为空')
    } else if (!company) {
      app.errorHide(this, '公司不能为空')
    } else if (!position) {
      app.errorHide(this, '职位不能为空')
    } else {
      // 更新用户信息
      app.httpPost({
        url: url_common + '/api/user/updateUser',
        data: {
          user_real_name: name,
          user_id: user_id,
          user_company_name: company,
          user_company_career: position,
          user_email: email,
          user_brand: brand
        },
      }, this).then(res => {
        let followed_user_id = wx.getStorageSync('followed_user_id');
        // 是否要加人脉
        if (followed_user_id) {
          let driectAdd = wx.getStorageSync("driectAdd");
          // 是否是直接加人脉
          if (driectAdd) {
            app.httpPost({
              url: url_common + '/api/user/followUser',
              data: {
                user_id,
                followed_user_id
              },
            }, _this).then(res => {
              wx.removeStorageSync("driectAdd");
              wx.removeStorageSync('followed_user_id');
            })
          } else {
            app.htttpPost({
              url: url_common + '/api/user/UserApplyFollowUser',
              data: {
                user_id,
                applied_user_id
              },
            }, _this).then(res => {
              wx.removeStorageSync("driectAdd");
              wx.removeStorageSync('followed_user_id');
            })
          }
        }
        let path = app.globalData.registerInitPage;
        app.href(path);
      })
    }
  }
}