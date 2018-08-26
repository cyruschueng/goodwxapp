var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
Page({
  data: {
    nonet: true
  },
  onLoad: function (options) {
    let user_name = options.name;
    let user_brand = options.brand;
    let user_company = options.company;
    let user_career = options.career;
    let user_email = options.email;
    let user_weChat = options.writeWeChat;
    let user_describle = options.writeDescrible;
    let type = options.type;
    let that = this;
    app.netWorkChange(that)
    that.setData({
      user_name: user_name,
      user_brand: user_brand,
      user_company: user_company,
      user_career: user_career,
      user_email: user_email,
      user_weChat: user_weChat,
      user_describle: user_describle,
      type: type
    })
  },
  // 姓名
  nameEdit: function (e) {
    let user_name = e.detail.value;
    let user_name_length = e.detail.value.length;
    let that = this;
    if (user_name_length <= 20) {
      this.setData({
        user_name: user_name
      })
    } else {
      app.errorHide(that, "不能超过20个字", 100)
    }
  },

  // 品牌
  brandEdit: function (e) {
    let user_brand = e.detail.value;
    let user_brand_length = e.detail.value.length;
    let that = this;
    if (user_brand_length <= 40) {
      this.setData({
        user_brand: user_brand
      })
    } else {
      app.errorHide(that, "不能超过40个数字", 1000)
    }
  },
  // 公司
  companyEdit: function (e) {
    let user_company_name = e.detail.value;
    let user_company_name_length = e.detail.value.length;
    let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    let rs = "";
    let that = this;
    for (var i = 0; i < user_company_name.length; i++) {
      rs = rs + user_company_name.substr(i, 1).replace(pattern, '');
    }
    if (user_company_name_length <= 40) {
      this.setData({
        user_company_name: rs
      })
    } else {
      app.errorHide(that, "不能超过40个数字", 1000)
    }
  },
  // 职位
  careerEdit: function (e) {
    let user_career = e.detail.value;
    let user_career_length = e.detail.value.length;
    let that = this;
    if (user_career_length <= 40) {
      this.setData({
        user_career: user_career
      })
    } else {
      app.errorHide(that, "不能超过40个数字", 1000)
    }
  },
  // 邮箱
  emailEdit: function (e) {
    let user_email = e.detail.value;
    let user_email_length = e.detail.value.length;
    this.setData({
      user_email: user_email
    })
  },
  // 微信
  weChat: function (e) {
    let user_weChat = e.detail.value;
    let user_weChat_length = e.detail.value.length;
    let that = this;
    if (user_weChat_length <= 40) {
      this.setData({
        user_weChat: user_weChat
      })
    } else {
      app.errorHide(that, "不能超过40个数字", 1000)
    }
  },
  // 个人描述
  personDescrible: function (e) {
    let user_describle = e.detail.value;
    let user_describle_length = e.detail.value.length;
    let that = this;
    if (user_describle_length <= 500) {
      this.setData({
        user_describle: user_describle
      })
    } else {
      app.errorHide(that, "不能超过500个数字", 1000)
    }
  },
  save: function () {
    let that = this;
    let user_id = wx.getStorageSync('user_id');
    let user_name = this.data.user_name;
    let user_brand = this.data.user_brand;
    let user_company_name = this.data.user_company_name;
    let user_career = this.data.user_career;
    let user_email = this.data.user_email;
    let user_describle = this.data.user_describle;
    let user_weChat = this.data.user_weChat;
    let type = this.data.type;
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    let prevPage = pages[pages.length - 2];
    let user_info = prevPage.data.user_info;

    // 姓名type:0 手机type:1 品牌type:2 公司type:3 职位type:4 邮箱type:5 微信type:6 个人描述type:7
    if (type == 0) {
      user_info.user_real_name = user_name;
      if (user_name != '') {
        prevPage.setData({
          user_info: user_info
        })
        wx.navigateBack({
          delta: 1
        })
      } else {
        app.errorHide(that, "姓名不能为空", 1500)
      }

    } else if (type == 2) {
      user_info.user_brand = user_brand;
      prevPage.setData({
        user_info: user_info
      })
      wx.navigateBack({
        delta: 1
      })
    } else if (type == 3) {
      user_info.user_company_name = user_company_name;
      if (user_company_name != '') {
        prevPage.setData({
          user_info: user_info
        })
        wx.navigateBack({
          delta: 1
        })
      } else {
        app.errorHide(that, "公司不能为空", 1500)
      }
    } else if (type == 4) {
      user_info.user_company_career = user_career;
      if (user_career != '') {
        prevPage.setData({
          user_info: user_info
        })
        wx.navigateBack({
          delta: 1
        })
      } else {
        app.errorHide(that, "职位不能为空", 1500)
      }
    } else if (type == 5) {
      user_info.user_email = user_email;
      let that = this;
      if (app.checkEmail(user_email) || user_email == '') {
        prevPage.setData({
          user_info: user_info
        })
        wx.navigateBack({
          delta: 1
        })
      } else {
        app.errorHide(that, "请填写正确格式的邮箱", 1500)
      }
    }
    else if (type == 6) {
      user_info.user_wechat = user_weChat;
      prevPage.setData({
        user_info: user_info
      })
      wx.navigateBack({
        delta: 1
      })
    }
    else if (type == 7) {
      user_info.user_intro = user_describle;
      prevPage.setData({
        user_info: user_info
      })
      wx.navigateBack({
        delta: 1
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
    }, 1500)
  }
})