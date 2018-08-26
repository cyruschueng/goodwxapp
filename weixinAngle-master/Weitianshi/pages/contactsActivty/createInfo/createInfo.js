var app = getApp();
Page({
  data: {},
  onLoad: function (options) {
    let that = this;
    app.netWorkChange(that);
    let type = options.type;

    let user_real_name = options.user_real_name;
    let user_company_name = options.user_company_name;
    let user_brand = options.user_brand;
    let user_company_career = options.user_company_career;
    that.setData({
      type: type,
      user_real_name: user_real_name,
      user_company_name: user_company_name,
      user_brand: user_brand,
      user_company_career: user_company_career
    });
    if (options.team_name != "undefined") {
      let team_name = options.team_name;
      that.setData({
        team_name: team_name
      });
    } 
    if (options.team_founder != "undefined") {
      let team_founder = options.team_founder;
      app.log('team_founder', team_founder);
      that.setData({
        team_founder: team_founder
      });
    }
  },
  onShow: function () { },
  //战队名
  warNameEdit: function (e) {
    let team_name = e.detail.value;
    let team_nameLength = e.detail.value.length;
    let that = this;
    if (team_nameLength <= 20) {
      this.setData({
        team_name: team_name
      });
    } else {
      app.errorHide(that, "不能超过20个字", 100);
    }
  },
  //创始人信息填写
  createPersonEdit: function (e) {
    let that=this;
    let team_founder = e.detail.value;
    app.log('team_founder', team_founder);
    let team_founderLength = e.detail.value.length;
    if (team_founderLength <= 40) {
      this.setData({
        team_founder: team_founder
      });
    } else {
      app.errorHide(that, "不能超过40个字", 100);
    }
  },
  userNameEdit: function (e) {
    let user_real_name = e.detail.value;
    let user_real_nameLength = e.detail.value.length;
    let that = this;
    if (user_real_nameLength <= 20) {
      this.setData({
        user_real_name: user_real_name
      });
    } else {
      app.errorHide(that, "不能超过20个字", 100);
    }
  },
  companyEdit: function (e) {
    let user_company_name = e.detail.value;
    let user_company_nameLength = e.detail.value.length;
    let that = this;
    if (user_company_nameLength <= 40) {
      this.setData({
        user_company_name: user_company_name
      });
    } else {
      app.errorHide(that, "不能超过40个字", 100);
    }
  },
  brandEdit: function (e) {
    let user_brand = e.detail.value;
    let user_brandLength = e.detail.value.length;
    let that = this;
    if (user_brandLength <= 40) {
      this.setData({
        user_brand: user_brand
      });
    } else {
      app.errorHide(that, "不能超过40个字", 100);
    }
  },
  positionEdit: function (e) {
    let user_company_career = e.detail.value;
    let user_company_careerLength = e.detail.value.length;
    let that = this;
    if (user_company_careerLength <= 40) {
      this.setData({
        user_company_career: user_company_career
      });
    } else {
      app.errorHide(that, "不能超过40个字", 100);
    }
  },
  //保存
  save: function () {
    let that=this;
    let type = this.data.type;
    let team_name = this.data.team_name;
    let team_founder = this.data.team_founder;
    let user_real_name = this.data.user_real_name;
    let user_company_name = this.data.user_company_name;
    let user_brand = this.data.user_brand;
    let user_company_career = this.data.user_company_career;
    let pages = getCurrentPages();
    // let currPage = pages[pages.length - 1];
    let prevPage = pages[pages.length - 2];
    let user_info = prevPage.data.user_info;
    if (type == 2) {
      if (team_name != '') {
        prevPage.setData({
          team_name: team_name
        });
        wx.navigateBack({
          delta: 1
        });
      } else {
        app.errorHide(that, "战队名不能为空", 1500);
      }
    } else if (type == 3) {
      if (team_founder != '') {
        prevPage.setData({
          team_founder: team_founder
        });
        wx.navigateBack({
          delta: 1
        });
      }
    }
    else if (type == 3) {
      if (team_founder != '') {
        prevPage.setData({
          team_founder: team_founder
        });
        wx.navigateBack({
          delta: 1
        });
      }
    } else if (type == 4) {
      if (user_real_name != '') {
        user_info.user_real_name = user_real_name;
        prevPage.setData({
          user_info: user_info
        });
        wx.navigateBack({
          delta: 1
        });
      }
    } else if (type == 5) {
      if (user_company_name != '') {
        user_info.user_company_name = user_company_name;
        prevPage.setData({
          user_info: user_info
        });
        wx.navigateBack({
          delta: 1
        });
      }
    } else if (type == 6) {
      user_info.user_brand = user_brand;
      prevPage.setData({
        user_info: user_info
      });
      wx.navigateBack({
        delta: 1
      });
    }
    else if (type == 7) {
      if (user_company_career != '') {
        user_info.user_company_career = user_company_career;
        prevPage.setData({
          user_info: user_info
        });
        wx.navigateBack({
          delta: 1
        });
      }
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