var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
Page({
  data: {
    disabled: false,
    case_time: "请选择",
    industry: "请选择",
    stage: ["请选择"],
    stage_index: 0,
    case_stage_index: 0,
    buttonOne: {
      text: "保存"
    },
    industryCard: {
      text: "项目领域*",
      url: "/pages/form/industry/industry?current=3",
      css: "black",
      value: ["选择领域"],
      id: []
    },
    belongArea: {
      area_title: '',
      area_id: ''
    },
    buttonOneText: '保存',
    nonet: true
  },
  onLoad: function (options) {
    //获取当前时间,以备picker使用
    var d = new Date();
    var yearBefore = d.getFullYear() - 20;
    var yearNow = d.getFullYear();
    var month = (d.getMonth() + 1) > 9 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
    var day = d.getDate() > 9 ? d.getDate() : '0' + d.getDate();
    var timeBefore = yearBefore + '-' + month + '-' + day;
    var timeNow = yearNow + '-' + month + '-' + day;
    var that = this;
    app.netWorkChange(that);
    let stageId = [];
    let stage_arr = [];
    wx.request({
      url: app.globalData.url_common + '/api/category/getProjectCategory',
      method: 'POST',
      success: function (res) {
        var stage = res.data.data.stage;
        var stage_arr = [];
        stage.unshift({
          stage_id: 0,
          stage_name: "请选择"
        });

        stage.forEach((x) => {
          stage_arr.push(x.stage_name);
          stageId.push(x.stage_id);
        });
        that.setData({
          timeNow: timeNow,
          timeBefore: timeBefore,
          stage: stage,
          stageId: stageId,
          stage_arr: stage_arr
        });
        that.getInfo(options);
      },
    });
  },
  onShow: function () {
    var case_index = this.data.case_index;
    var tran_area = wx.getStorageSync('tran_area');
    let belongArea = this.data.belongArea;
    if (tran_area.length != 0) {
      belongArea.area_title = tran_area[1].area_title;
      belongArea.area_id = tran_area[1].area_id;
      this.setData({
        belongArea: belongArea,
        tran_area: tran_area
      });
    }


    // -------------------对industry相关数据进行处理---------------------------------

    //如果已经进入项目领域后时,对返回该页面的值进行修正
    var tran_industry = wx.getStorageSync('tran_industry');
    var industryCard = this.data.industryCard;
    if (tran_industry.length != 0) {
      industryCard.value = [];
      industryCard.id = [];
      tran_industry.forEach((x) => {
        industryCard.value.push(x.industry_name);
        industryCard.id.push(x.industry_id);
      });
    } else if (tran_industry.length == 0) {
      industryCard.value = "选择领域";
      industryCard.id = [];
    }
    this.setData({
      industryCard: industryCard
    });
  },
  //项目名称
  case_name: function (e) {
    var that = this;
    var case_name = e.detail.value;
    that.setData({
      case_name: case_name
    });
  },
  //项目阶段
  case_stage: function (e) {
    var stage_index = e.detail.value;
    var stage = this.data.stage;
    this.setData({
      case_stage: stage[stage_index],
      case_stage_index: stage_index
    });

  },
  //项目金额
  case_money: function (e) {
    var that = this;
    var case_money = e.detail.value;
    that.setData({
      case_money: case_money
    });
  },
  //项目时间
  case_time: function (e) {
    this.setData({
      case_time: e.detail.value
    });
  },
  // 投资地区
  case_local: function (e) {
    this.setData({
      case_city: e.detail.value
    });
    app.href('/pages/form/area1/area1?current=' + 2);
  },
  //保存
  buttonOne: function () {
    var that = this;
    var case_index = this.data.case_index;
    let case_id = this.data.case_id;
    var user_id = wx.getStorageSync('user_id');
    var case_name = this.data.case_name;
    var industry = this.data.industryCard.value;
    var case_industry = this.data.industryCard.id;
    let case_stage_index = this.data.case_stage_index;
    var case_money = this.data.case_money;
    var case_time = this.data.case_time;
    var tran_area = this.data.tran_area;
    let belongArea = this.data.belongArea;
    let reg = /^[1-9]\d*$/;
    if (tran_area) {
      var case_province = tran_area[0].area_id;
      var case_city = tran_area[1].area_id;
    } else {
      var case_province = this.data.belongArea.pid;
      var case_city = this.data.belongArea.area_id;
    }
    let case_stage_id = "";
    let stage = this.data.stage;
    stage.forEach((x, index) => {
      if (index == case_stage_index) {
        case_stage_id = x.stage_id;
      }
    });
    app.log(that,"名称,标签名,标签Id,阶段ID,金额,时间,省份ID,城市ID");
    // console.log(user_id, case_name, industry, case_industry, case_stage_id, case_money, case_time, case_province, case_city, tran_area)
    if (case_name == undefined) {
      app.errorHide(that, "项目名称不能为空", 1500);
    } else if (case_industry.length < 1) {
      app.errorHide(that, "领域不能为空", 1500);
    } else if (case_stage_id == 0) {
      app.errorHide(that, "轮次不能为空", 1500);
    } else if (case_money == undefined || case_money == "") {
      app.errorHide(that, "投资金额不能为空", 1500);
    } else if (case_time == '请选择') {
      app.errorHide(that, "交易时间不能为空", 1500);
    } else if (!case_city) {
      app.errorHide(that, "地区不能为空", 1500);
    } else if (!reg.test(case_money)) {
      app.errorHide(that, "请输入整数", 1500);
    } else {
      let submitData = {
        url: url_common + '/api/user/createUserProjectCase',
        data: {
          user_id: user_id,
          case_name: case_name,
          case_industry: case_industry,
          case_stage: case_stage_id,
          case_money: case_money,
          case_deal_time: case_time,
          case_province: case_province,
          case_city: case_city
        }
      };
      let successText = '创建投资案例成功';
      // 区别处理创建和编辑
      if (case_index) {
        submitData.url = url_common + '/api/user/editUserProjectCase';
        submitData.data.case_id = case_id;
        successText = '编辑投资案例成功';
      }
      app.buttonSubmit(that, submitData, that.data.buttonOneText, res => {
        app.errorHide(that, successText, 1000);
        setTimeout(res => {
          wx.navigateBack({
            delta: 1,
          });
        }, 1000);
      });
    }
  },
  // 获取项目信息() 
  getInfo: function (options) {
    let case_id = options.case_id;
    // 维护案例的情况下
    // 通过是否有Index传值进来来区别新建案例还是维护案例,index存在是編輯案例
    if (options.index) {
      var case_index = options.index;
      let industryCard = this.data.industryCard;
      let that = this;
      var user_id = wx.getStorageSync('user_id');
      wx.request({
        url: url_common + '/api/user/getOneUserProjectCase',
        data: {
          user_id: user_id,
          case_id: case_id
        },
        method: 'POST',
        success: function (res) {
          let invest_case = res.data.data;
          let tran_industry = invest_case.case_industry;
          let industryCard = that.data.industryCard;
          let tran_area = [];
          tran_area[0] = { area_id: invest_case.case_province, area_title: "" };
          tran_area[1] = { area_id: invest_case.has_one_city.area_id, area_title: invest_case.has_one_city.area_title };
          //----------------------------项目领域进行处理----------------------
          if (tran_industry) {
            industryCard.value = [];
            industryCard.id = [];
            tran_industry.forEach((x) => {
              industryCard.value.push(x.industry_name);
              industryCard.id.push(x.industry_id);
            });
          }
          wx.setStorageSync('tran_industry', tran_industry);
          wx.setStorageSync('tran_area', tran_area);
          // 处理轮次,让轮次的id对应上index下标
          let stage = that.data.stage;
          stage.forEach((x, index) => {
            if (x.stage_id == invest_case.case_stage.stage_id) {
              let case_stage_index = index;
              that.setData({
                case_stage_index: case_stage_index,
              });
            }
          });
          that.setData({
            case_name: invest_case.case_name,
            industryCard: industryCard,
            case_stage: invest_case.case_stage,
            case_money: invest_case.case_money,
            case_time: invest_case.case_deal_time,
            // case_city: invest_case.case_city,
            belongArea: invest_case.has_one_city
          });
        },
        fail: function (res) {
        },
      });
      this.setData({
        case_index: case_index,
        case_id: case_id
      });
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