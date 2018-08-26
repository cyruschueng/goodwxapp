var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
Page({
  data: {
    user_info: {
      user_avatar_url: '',
      user_mobile: '',
      user_real_name: '',
      user_company_name: '',
      user_brand: '',
      user_company_career: '',
    },
  },
  onLoad: function (options) {
    var that = this;
    var user_id = wx.getStorageSync('user_id');
    app.netWorkChange(that);
    wx.showLoading({
      title: 'loading',
      mask:true
    });

    //获取用户信息
    wx.request({
      url: url_common + '/api/user/getUserAllInfo',
      data: {
        share_id: 0,
        user_id: user_id,
        view_id: user_id
      },
      method: 'POST',
      success: function (res) {
        wx.hideLoading();
        let user_info = res.data.user_info;
        app.log('用户信息', user_info);
        that.setData({
          user_id: user_id,
          user_info: user_info,
        });
      },
    });
  },
  onShow: function () {

  },
  //头像
  headPic() {
    let that = this;
    app.headPic(that);
  },
  //信息填写或更改
  writeNewThing: function (e) {
    let type = e.currentTarget.dataset.type;
    let user_real_name = this.data.user_info.user_real_name;
    let user_company_name = this.data.user_info.user_company_name;
    let user_brand = this.data.user_info.user_brand;
    let user_company_career = this.data.user_info.user_company_career;
    if (type == 4) {
      app.href('/pages/contactsActivty/createInfo/createInfo?type=' + type + '&user_real_name=' + user_real_name);
    }
    else if (type == 5) {
      app.href('/pages/contactsActivty/createInfo/createInfo?type=' + type + '&user_company_name=' + user_company_name);
    }
    else if (type == 6) {
      app.href('/pages/contactsActivty/createInfo/createInfo?type=' + type + '&user_brand=' + user_brand);
    }
    else if (type == 7) {
      app.href('/pages/contactsActivty/createInfo/createInfo?type=' + type + '&user_company_career=' + user_company_career);
    }
  },
  //提交
  save() {
    let that = this;
    let user_id = this.data.user_id;
    let user_real_name = this.data.user_info.user_real_name;
    let user_company_name = this.data.user_info.user_company_name;
    let user_brand = this.data.user_info.user_brand;
    let user_company_career = this.data.user_info.user_company_career;
    let user_info = this.data.user_info;
    let image_id = this.data.image_id;
    if (user_real_name.length === 0) {
      app.errorHide(that, '请填写姓名', 3000);
    } else if (user_company_name.length === 0) {
      app.errorHide(that, '请填写公司名称', 3000);
    } else if (user_company_career.length === 0) {
      app.errorHide(that, '请填写职位名称', 3000);
    } else {
      app.log('image_id', image_id);
      wx.request({
        url: url_common + '/api/user/updateUser',
        data: {
          user_id: user_id,
          user_real_name: user_real_name,
          user_company_name: user_company_name,
          user_company_career: user_company_career,
          user_brand: user_brand,
          user_email: user_info.user_email,
          user_intro: user_info.user_intro,
          user_avatar: image_id
        },
        method: 'POST',
        success: function (res) {
          if (res.data.status_code == 2000000) {
            wx.showModal({
              title: '报名成功',
              content: '分享您的投资名片可快速拓展人脉',
              showCancel: true,
              cancelText: '完成',
              cancelColor: '#333',
              confirmText: '分享名片',
              confirmColor: '#333',
              success: function(res) {
                if(res.confirm===true){
                  app.href('/pages/my/qrCode/qrCode?type=1&&user_id=' + user_id);
                }else if(res.cancel===true){
                  app.href('/pages/contactsActivty/activtyDetail/activtyDetail');
                }
              },
            });
          } else {
            wx.showModal({
              title: "错误提示",
              content: res.data.error_msg,
              showCancel: false
            });
          }
        },
        fail: function (res) {
          app.log('fail',res);
        },
      });
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