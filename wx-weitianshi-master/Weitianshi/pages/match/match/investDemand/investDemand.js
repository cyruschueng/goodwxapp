var app = getApp();
var url = app.globalData.url;
var save = true;
Page({
  data: {
    describe: "",
    domainValue: "选择领域",
    payArea: "选择城市",
    payStage: "选择阶段",
    expect: [],
    expect_index: 0,
    expect_arry: [],
    console_stage: "",
    error: '0',
    error_text: "",
    loading: '0',
    picker: 0,
    industryCard: {
      text: "项目领域*",
      url: "/pages/form/industry/industry?current=1",
      css: "checkOn",
      value: ["选择领域"],
      id: []
    },
    buttonOneText:'发布',
    nonet: true
  },
  onLoad: function (options) {
    var user_id = wx.getStorageSync('user_id');
    var that = this;
    app.netWorkChange(that);
    var current = options.current;
    this.setData({
      current: current
    });
    // var y_area = '';
    //检查是否发布过投资信息
    wx.request({
      url: url + '/api/investor/checkInvestorInfo',
      data: {
        user_id: user_id
      },
      method: 'POST',
      success: function (res) {
        var thisData = res.data.data;
        let tran_industry = thisData.industry_tag;
        let tran_scale = thisData.scale_tag;
        let tran_stage = thisData.stage_tag;
        let tran_hotCity = thisData.area_tag;
        if (res.data.data != '') {
          //获取已存有的投资领域,投资阶段,投资金额,投資地区
          // var industry = wx.getStorageSync('industry');//项目领域总数
          var y_describe = thisData.investor_desc;
          that.setData({
            tran_industry: tran_industry,
            tran_stage: tran_stage,
            tran_scale: tran_scale,
            tran_hotCity: tran_hotCity,
            describe: y_describe
          });
          //投资领域
          wx.setStorageSync('tran_industry', tran_industry);
          // //投资阶段
          wx.setStorageSync('tran_stage', tran_stage);
          // //投资金额
          wx.setStorageSync("tran_scale", tran_scale);
          // //投资地区
          wx.setStorageSync("tran_hotCity", tran_hotCity);
          // 具体描述
          wx.setStorageSync('y_describe', y_describe);
        }
      },
    });
  },
  //页面显示
  onShow: function () {
    var that = this;
    var y_describe = wx.getStorageSync('y_describe');
    var tran_industry = wx.getStorageSync('tran_industry');
    var tran_hotCity = wx.getStorageSync('tran_hotCity');
    var tran_stage = wx.getStorageSync('tran_stage');
    var tran_scale = wx.getStorageSync('tran_scale');
    that.setData({
      tran_industry: tran_industry,
      y_describe: y_describe,
      tran_scale: tran_scale,
      tran_hotCity: tran_hotCity,
      tran_stage: tran_stage
    });
  },
  //给所有添加checked属性
  for: function (name) {
    for (var i = 0; i < name.length; i++) {
      name[i].checked = false;
    }
  },

  //下拉刷新
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },

  //文本框输入
  bindTextAreaBlur: function (e) {
    var that = this;
    wx.setStorageSync('y_describe', e.detail.value);
    that.setData({
      y_describe: e.detail.value
    });
  },


  //期望融资
  expect: function (e) {
    var picker = 1;
    this.setData({
      expect_index: e.detail.value,
      console_expect: this.data.expect[this.data.expect_index].scale_id,
      picker: picker
    });
  },


  //点击发布
  public: function () {
    save = !save;
    var that = this;
    var theData = that.data;
    var y_describe = theData.y_describe;
    var user_id = wx.getStorageSync('user_id');
    var industryValue = this.data.tran_industry;
    var payStage = this.data.tran_stage;
    var payMoney = this.data.tran_scale;
    var payArea = this.data.tran_hotCity;
    let industryId = [];
    let payMoneyId = [];
    let payStageId = [];
    let payAreaId = [];
    // 根据接口转化数据格式
    if (industryValue != "") {
      industryValue.forEach((x) => {
        industryId.push(x.industry_id);
      });
    }
    if (payStage != "") {
      payStage.forEach((x) => {
        payStageId.push(x.stage_id);
      });
    }
    if (payMoney != "") {
      payMoney.forEach((x) => {
        payMoneyId.push(x.scale_id);
      });
    }
    if (payArea != "") {
      payArea.forEach((x) => {
        payAreaId.push(x.area_id);
      });
    }


    if (industryValue !== "" && payMoney != "" && payArea !== "" && payStage !== "") {
      // 防反复提交表单处理
      let submitData = {
        url: url + '/api/investor/updateOrCreateInvestor',
        data: {
          user_id: user_id,
          investor_industry: industryId,
          investor_stage: payStageId,
          investor_scale: payMoneyId,
          investor_area: payAreaId,
          investor_desc: y_describe
        }
      };
      app.buttonSubmit(that, submitData, that.data.buttonOneText, res => {
        wx.removeStorageSync("tran_industry");
        wx.removeStorageSync("tran_scale");
        wx.removeStorageSync("tran_stage");
        wx.removeStorageSync("tran_hotCity");
        let current = that.data.current;
        app.errorHide(that, '投资需求提交成功', 1000);
        setTimeout(x => {
          if (current == 1) {
            wx.navigateBack({
              delta: 1
            });
          } else {
            app.href('/pages/discoverProject/discoverProject');
          }
        }, 1000);
      });
    } else {
      that.setData({
        error: "1"
      });
      setTimeout(function () {
        that.setData({
          error: "0"
        });
      }, 1500);
      if (industryId == 0) {
        that.setData({
          error_text: "领域不能为空"
        });
      } else if (payStageId == 0) {
        that.setData({
          error_text: "阶段不能为空"
        });
      } else if (payMoneyId == 0) {
        that.setData({
          error_text: "金额不能为空"
        });
      } else if (payAreaId == 0) {
        that.setData({
          error_text: "地区不能为空"
        });
      }
    }
  },

  onUnload: function () {
    app.initTran();
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