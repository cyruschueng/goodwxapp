var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
Page({

  data: {
    tags: '',
    com_id: 0,
    nonet:true
  },

  onLoad: function (options) {
    let that = this;
    let company = options.company;
    let user_id = options.user_id;
    let type = options.type;
    app.netWorkChange(that)
    that.setData({
      company_name: company,
      type: type,
      user_id: user_id
    })
  },

  onShow: function () {

  },
  //获取输入内容
  inputValue: function (e) {
    let companyName = e.detail.value;
    let that = this;
    that.setData({
      company_name: companyName
    })
  },
  // 查找公司名字
  searchCompany: function () {
    let that = this;
    let company_name = this.data.company_name;
    var user_id = wx.getStorageSync('user_id');
    let com_id = this.data.com_id;
    wx.request({
      url: url_common + '/api/dataTeam/selectCompany',
      data: {
        user_id: user_id,
        company_name: company_name
      },
      method: 'POST',
      success: function (res) {
        let company = res.data.data;
        that.setData({
          company: company,
          com_id: com_id
        })
      }
    })
  },
  // 选择其中的一个
  checkOne: function (e) {
    let tags = e.currentTarget.dataset.id;
    let company_name = e.currentTarget.dataset.name;
    let that = this;
    that.setData({
      com_id: tags,
      company_name: company_name
    })

  },
  // 保存公司名称
  save: function () {
    let that = this;
    let type = this.data.type;
    let user_id = this.data.user_id;
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    let prevPage = pages[pages.length - 2];
    if (type == 3) {
      let user_info = prevPage.data.user_info;
      let company_name = this.data.company_name;
      user_info.user_company_name = company_name;
      if (company_name != '') {
        prevPage.setData({
          user_info: user_info
        })
        wx.navigateBack({
          delta: 1
        })
      } else {
        app.errorHide(that, "公司不能为空", 1500)
      }
    } else if (type == 8) {
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      let project = prevPage.data.project;
      let companyName = this.data.company_name;
      project.pro_company_name = companyName;
      let id = project.project_id;
      let options = {
        id: id
      };
      if (companyName != '') {
        wx.request({
          url: url_common + '/api/project/updateProjectByField',
          data: {
            user_id: user_id,
            pro_company_name: companyName,
            project_id: id
          },
          method: 'POST',
          success: function (res) {
            prevPage.setData({
              project: project,
              options: {
                id: id,
                companyName: companyName
              }
            })
            wx.navigateBack({
              delta: 1
            })
            prevPage.onLoad(options)
          }
        })
      } else {
      app.errorHide(that, "公司不能为空", 1500)
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
    }, 1500)
  }
}) 