let app = getApp();
let url = app.globalData.url;
let url_common = app.globalData.url_common;
let RG = require('../../../utils/model/register.js');
let register = new RG.register();
Page({
  data: {
    name: '',
    brand: '',
    company: "",
    position: "",
    email: "",
    nonet: true
  },
  //onLoad
  onLoad(options) {
    let that = this;
    let company = options.user_company;
    let position = options.user_career;
    let email = options.user_email;
    let user_id = wx.getStorageSync('user_id');
    this.getUserInfo(user_id);
    app.netWorkChange(that);
  },
  //请求用户信息
  getUserInfo(user_id) {
    let that = this;
    app.httpPost({
      url: url_common + '/api/user/checkUserInfo',
      data: {
        user_id
      },
    }, this).then(res => {
      let company = res.data.user_company_name;
      let position = res.data.user_company_career;
      let email = res.data.user_email;
      let brand = res.data.user_brand;
      [company, position, email, brand].map(res => {
        if (res == 'null') return res = ''
      })
      that.setData({
        company: res.data.user_company_name,
        position: res.data.user_company_career,
        email: res.data.user_email,
        brand: res.data.user_brand,
        name: res.data.user_real_name
      });
    })
  },
  //姓名
  name(e) {
    this.setData({
      name:e.detail.value
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
  //点击跳转
  backHome() {
    let email = this.data.email;
    // 邮箱为非必填项,但是如果填写格式必须正确
    if(email == ''){
      register.companyInfoRegister.call(this);
    }else{
      app.globalData.verify.email(this, email, res => {
        register.companyInfoRegister.call(this);
      })
    }
  },
  // 重新加载
  refresh() {
    let timer = '';
    wx.showLoading({
      title: 'loading',
      mask: true
    });
    timer = setTimeout(x => {
      wx.hideLoading();
      this.onShow();
    }, 1500);
  }
});