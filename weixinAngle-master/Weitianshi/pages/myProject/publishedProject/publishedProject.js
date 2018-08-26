var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
Page({
  data: {
    disabled: false,//保存按钮是否禁用
    describe: "",
    area_title: "选择城市",
    provinceNum: 0,
    cityNum: 0,
    // ---------------------picker----------------------
    stage: [],
    stage_index: 0,
    stage_arry: [],
    scale: [],
    scale_index: 0,
    scale_arry: [],
    exclusive_arry: ['请选择', '独家签约', '非独家签约', '其他'],
    // ---------------------picker----------------------
    tips: ["其他", "独家签约", "非独家"],
    tips_index: 4, //独家效果
    pro_goodness: "",
    service_fa: 0,
    service_yun: 0,
    service_ps_bp: 0,
    industryCard: {
      text: "项目领域*",
      url: "/pages/form/industry/industry?current=0",
      css: "",
      value: ["选择领域"],
      id: []
    },
    pro_total_score: 14.4,
    pro_finance_stock_after: 0,
    open_status: 1,
    power_share_status: 1,
    power_investor_status: 1,
    company_open_status: 0,
    subscribe: {
      white_company: 0,
      white_user: 0,
      black_company: '',
      black_user: ''
    },
    modalBox: 0,
    buttonOneText: '保存',
    nonet: true
  },
  onLoad: function (options) {
    console.log(options);
    let that = this;
    let editProId = options.pro_id;
    let edit = options.edit;
    let fromPublish = options.fromPublish;
    let stage = wx.getStorageSync('stage');
    let scale = wx.getStorageSync('scale');
    let stage_arry = [];
    let scale_arry = [];
    // picker 初始数据预处理
    this._pickerDeal(stage, stage_arry, 'stage_name', 'stage', 'stage_arry');
    this._pickerDeal(scale, scale_arry, 'scale_money', 'scale', 'scale_arry');
    // 如果是编辑项目入口
    if (editProId) { this._editProject(editProId); }
    this.setData({
      fromPublish: fromPublish
    });
    app.netWorkChange(that);
  },
  //页面显示
  onShow: function () {
    // 项目领域取值
    this._tranIndustryDeal();
    this._tranAreaDeal();
    this._privacyData();
  },
  onReady() {
    console.log(this.data);
  },
  //picker数据预处理
  _pickerDeal(item, itemArr, itemName, string_item, string_itemArr) {
    if (string_itemArr == 'stage_arry') {
      item.unshift({ stage_name: '选择阶段' });
    } else {
      item.unshift({ scale_money: '选择金额' });
    }
    item.forEach(x => {
      itemArr.push(x[itemName]);
    });
    this.setData({
      [string_item]: item,
      [string_itemArr]: itemArr
    });
  },
  //tran_industry取值处理
  _tranIndustryDeal() {
    let tran_industry = wx.getStorageSync('tran_industry');
    let industryCard = this.data.industryCard;
    if (tran_industry.length != 0) {
      industryCard.value = [];
      industryCard.id = [];
      tran_industry.forEach(x => {
        industryCard.value.push(x.industry_name);
        industryCard.id.push(x.industry_id);
      });
      //字体颜色改变
      industryCard.css = 'black';
    } else {
      industryCard.value = ['最多选择5个'];
      industryCard.css = '';
      industryCard.id = [];
    }
    this.setData({
      industryCard: industryCard
    });
  },
  //tran_area取值处理
  _tranAreaDeal() {
    let tran_area = wx.getStorageSync('tran_area');
    if (tran_area.length != 0) {
      this.setData({
        area_title: tran_area[1].area_title,
        provinceNum: tran_area[0].area_id,
        cityNum: tran_area[1].area_id
      });
    }
  },
  //私密性取值
  _privacyData() {
    let setPrivacy = wx.getStorageSync('setPrivacy');
    console.log(setPrivacy);
    if (setPrivacy) {
      this.setData({
        open_status: setPrivacy.open_status,
        power_share_status: setPrivacy.power_share_status,
        power_investor_status: setPrivacy.power_investor_status,
        company_open_status: setPrivacy.company_open_status,
        white_company: setPrivacy.white_company,
        white_user: setPrivacy.white_user,
        black_company: setPrivacy.black_company,
        black_user: setPrivacy.black_user,
        subscribe: setPrivacy.subscribe
      });
    }
  },
  // 编辑项目入口,数据获取
  _editProject(editProId) {
    let that = this;
    wx.request({
      url: url_common + '/api/project/getProjectEditInfo',
      data: {
        user_id: wx.getStorageSync('user_id'),
        project_id: editProId
      },
      method: 'POST',
      success: function (res) {
        let projectEditInfo = res.data.data;
        console.log('projectEditInfo', res.data.data);
        // 编辑-industry处理
        let industryCard = that.data.industryCard;
        industryCard.value = _industryDeal(projectEditInfo.pro_industry).industryValue;
        industryCard.id = _industryDeal(projectEditInfo.pro_industry).industryId;
        industryCard.css = 'black';
        if (industryCard.value.length == 0) {
          industryCard.value = '选择领域';
          industryCard.css = '';
        }
        wx.setStorageSync('tran_industry', projectEditInfo.pro_industry);
        // 编辑-stage和scale处理
        _editPickerDeal(that, projectEditInfo.pro_stage, projectEditInfo.pro_scale);
        // 编辑-area处理
        let editArea = projectEditInfo.pro_area;
        wx.setStorageSync('tran_area', [{ area_id: editArea.pid, area_title: '' }, { area_id: editArea.area_id, area_title: editArea.area_title }]);
        that.setData({
          pro_id: editProId,
          projectName: projectEditInfo.pro_name,
          companyName: projectEditInfo.pro_company_name,
          describe: projectEditInfo.pro_intro,
          industryCard: industryCard,
          area_title: editArea.area_title,
          provinceNum: editArea.pid,
          cityNum: editArea.area_id,
          tips_index: projectEditInfo.is_exclusive,
          pro_goodness: projectEditInfo.pro_goodness,
          pro_finance_stock_after: projectEditInfo.pro_finance_stock_after,
          service_fa: projectEditInfo.service_fa,
          service_ps_bp: projectEditInfo.service_ps_bp,
          service_yun: projectEditInfo.service_yun,
          buttonOneText: '维护项目'
        });
      }
    });
    // 编辑-industry处理
    let _industryDeal = (pro_industry) => {
      let industryValue = [];
      let industryId = [];
      pro_industry.forEach(x => {
        industryValue.push(x.industry_name);
        industryId.push(x.industry_id);
      });
      return {
        industryValue, industryId
      };
    };
    // 编辑-stage和scale处理
    function _editPickerDeal(that, pro_stage, pro_scale) {
      let stage = that.data.stage;
      let scale = that.data.scale;
      stage.forEach((x, index) => {
        if (x.stage_id == pro_stage.stage_id) {
          that.setData({
            stage_index: index
          });
        }
      });
      scale.forEach((x, index) => {
        if (x.scale_id == pro_scale.scale_id) {
          that.setData({
            scale_index: index
          });
        }
      });
    }
  },
  //下拉刷新
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  //项目名称
  projectName: function (e) {
    this.setData({
      projectName: e.detail.value
    });
  },
  //公司名称
  companyName: function (e) {
    this.setData({
      companyName: e.detail.value
    });
  },
  //项目介绍
  bindTextAreaBlur: function (e) {
    this.setData({
      describe: e.detail.value
    });
  },
  //投后股份
  projectFinance: function (e) {
    this.setData({
      pro_finance_stock_after: e.detail.value
    });
  },
  //项目亮点
  slectInput: function (e) {
    this.setData({
      pro_goodness: e.detail.value
    });
  },
  //是否独家的效果实现
  tipsOn: function (e) {
    this.setData({
      tips_index: e.detail.value
    });
  },
  //项目阶段
  stage: function (e) {
    this.setData({
      stage_index: e.detail.value,
    });
  },
  //期望融资
  scale: function (e) {
    this.setData({
      scale_index: e.detail.value,
    });
  },
  //关闭模态框
  closeModal: function () {
    this.setData({
      modalBox: 0
    });
  },
  //去电脑上传
  toPc: function () {
    this.setData({
      modalBox: 1
    });
  },
  //需要Bp美化
  switchChange1: function (e) {
    this.setData({
      service_ps_bp: e.detail.value
    });
  },
  //需要融资股份(FA)服务
  switchChange2: function (e) {
    this.setData({
      service_fa: e.detail.value
    });
  },
  //是否需要云投行服务
  switchChange3: function (e) {
    this.setData({
      service_yun: e.detail.value
    });
  },
  //私密性跳转
  initPrivacy: function () {
    let project = this.data.pro_id;
    if (project) {
      app.href('/pages/myProject/initPrivacy/initPrivacy?project=' + project);
    } else {
      app.href('/pages/myProject/initPrivacy/initPrivacy');
    }
  },
  //私密性处理(辅助函数)
  privacyDeal() {
    let subscribe = this.data.subscribe;
    Number(subscribe.white_company);
    Number(subscribe.white_user);
    this.setData({
      subscribe: subscribe
    });
    this.totalScore(this.data.projectName);
    this.totalScore(this.data.pro_company_name);
    this.totalScore(this.data.pro_finance_stock_after);
    this.totalScore(this.data.service_yun);
    this.totalScore(this.data.service_fa);
    this.totalScore(this.data.service_ps_bp);
    return {
      open_status: this.data.open_status,
      power_share_status: this.data.power_share_status,
      power_investor_status: this.data.power_investor_status,
      company_open_status: this.data.company_open_status,
    };

  },
  //完整度(辅助函数)
  totalScore: function (name) {
    let pro_total_score = this.data.pro_total_score;
    if (name) {
      pro_total_score = pro_total_score + 2.4;
      this.setData({
        pro_total_score: pro_total_score
      });
    }
  },
  //到电脑
  upLoadPc: function () {
    let that = this;
    let privacy = this.privacyDeal();
    let type = 'create';
    if (that.data.pro_id) {
      type = 'update';
    }
    wx.scanCode({
      success: function (res) {
        wx.request({
          url: app.globalData.url_common + '/api/auth/writeUserInfo',
          data: {
            type: type,
            user_id: wx.getStorageSync('user_id'),
            project_id: that.data.pro_id,
            credential: res.result,//二维码扫描信息
            pro_data: {
              pro_intro: that.data.describe,
              industry: that.data.industryCard.id,
              pro_finance_stage: that.data.stage[that.data.stage_index].stage_id || '',
              pro_finance_scale: that.data.scale[that.data.scale_index].scale_id || '',
              pro_area_province: that.data.provinceNum,
              pro_area_city: that.data.cityNum,
              is_exclusive: that.data.tips_index,
              pro_goodness: that.data.pro_goodness,
              pro_company_name: that.data.companyName,
              pro_name: that.data.projectName,
              pro_finance_stock_after: that.data.pro_finance_stock_after,
              service_fa: that.data.service_fa,
              service_yun: that.data.service_yun,
              service_ps_bp: that.data.service_ps_bp,
              subscribe: that.data.subscribe,
              pro_total_score: that.data.pro_total_score,
              open_status: privacy.open_status,
              power_share_status: privacy.power_share_status,
              power_investor_status: privacy.power_investor_status,
              company_open_status: Number(!privacy.company_open_status),
            }
          },
          method: 'POST',
          success: function (res) {
            if (res.data.status_code == 2000000) {
              //清除数据
              wx.setStorageSync('tran_industry', []);
              wx.setStorageSync('tran_area', []);
              wx.removeStorageSync('setPrivacy');
              app.href('/pages/myProject/bpScanSuccess/bpScanSuccess');
              that.setData({
                modalBox: 0
              });
            }
          }
        });
      },
    });
  },
  //项目领域
  industryChoice() {
    app.href('/pages/form/industry/industry?current=0');
  },
  //点击发布
  public: function () {
    let that = this;
    let type = this.data.type;
    let theData = this.data;
    let privacy = this.privacyDeal();
    // --------------------表单的各项值-------------------------------------
    let describe = that.data.describe;
    let industry = that.data.industryCard.id;
    let pro_finance_stage = that.data.stage[that.data.stage_index].stage_id;
    let pro_finance_scale = that.data.scale[that.data.scale_index].scale_id;
    let pro_area_province = that.data.provinceNum;
    let pro_area_city = that.data.cityNum;
    let is_exclusive = that.data.tips_index;
    let pro_goodness = that.data.pro_goodness;
    let pro_finance_stock_after = that.data.pro_finance_stock_after;
    let projectName = that.data.projectName;
    let fromPublish = this.data.fromPublish;
    //处理下投后股份数据类型 
    if (isNaN(pro_finance_stock_after)) {
    } else {
      pro_finance_stock_after = Number(Number(pro_finance_stock_after).toFixed(2));
    }
    if (typeof pro_finance_stock_after != 'number' || pro_finance_stock_after < 0 || pro_finance_stock_after > 100) {
      if (pro_finance_stock_after < 0) {
        app.errorHide(that, '投后股份项应该为大于等0的数字', 3000);
      } else if (pro_finance_stock_after > 100) {
        app.errorHide(that, '投后股份项应该为小于等于100的小数位不超过两位的数字', 3000);
      } else if (typeof pro_finance_stock_after != 'number') {
        console.log(pro_finance_stock_after);
        app.errorHide(that, '投后股份项应该为数字', 3000);
      }
      return;
    }

    // 表单检验和发送表单
    // if (describe == '') {
    //   app.errorHide(that, '请填写项目介绍', 3000)
    // } else if (industry.length == 0) {
    //   app.errorHide(that, '请选择项目领域', 3000)
    // } else if (!pro_finance_stage) {
    //   app.errorHide(that, '请选择项目阶段', 3000)
    // } else if (!pro_finance_scale) {
    //   app.errorHide(that, '请选择期望融资', 3000)
    // } else if (pro_area_city == '') {
    //   app.errorHide(that, '请选择所在地区', 3000)
    // } else if (is_exclusive == 4) {
    //   app.errorHide(that, '请选择是否独家', 3000)
    // } else if (pro_goodness == '') {
    //   app.errorHide(that, '请填写项目亮点', 3000)
    // } 
    if (!projectName) {
      app.errorHide(that, '请填写项目名称', 3000);
    } else {
      // 区别处理创建项目和维护项目
      let httpUrl = '/api/project/createProject';
      let successText = '成功创建融资项目';
      if (that.data.pro_id) {
        httpUrl = '/api/project/updateProject';
        successText = '维护项目成功';
      }
      // 防反复提交处理
      let submitData = {
        url: url_common + httpUrl,
        data: {
          user_id: wx.getStorageSync('user_id'),
          project_id: that.data.pro_id || '',
          pro_intro: describe,
          industry: industry,
          pro_finance_stage: pro_finance_stage,
          pro_finance_scale: pro_finance_scale,
          pro_area_province: pro_area_province,
          pro_area_city: pro_area_city,
          is_exclusive: is_exclusive,
          pro_goodness: pro_goodness,
          pro_finance_stock_after: pro_finance_stock_after,
          pro_company_name: that.data.companyName,
          pro_name: that.data.projectName,
          service_ps_bp: that.data.service_ps_bp,
          service_fa: that.data.service_fa,
          service_yun: that.data.service_yun,
          subscribe: that.data.subscribe,
          pro_total_score: that.data.pro_total_score,
          open_status: privacy.open_status,
          power_share_status: privacy.power_share_status,
          power_investor_status: privacy.power_investor_status,
          company_open_status: Number(!privacy.company_open_status),
        },
      };
      app.buttonSubmit(that, submitData, that.data.buttonOneText, res => {
        //数据清空
        wx.setStorageSync('tran_industry', []);
        wx.setStorageSync('tran_area', []);
        wx.removeStorageSync('setPrivacy');
        app.errorHide(that, successText, 1000);
        // 提交中过渡态处理
        if (that.data.pro_id && fromPublish != 3) {
          setTimeout(x => {
            wx.navigateBack({
              delta: 1
            });
          }, 1000);
        } else if (that.data.pro_id && fromPublish == 3) {
          app.href('/pages/discoverProject/discoverProject');
        } else {
          setTimeout(x => {
            app.href('/pages/myProject/publishSuccess/publishSuccess?type=' + type);
          }, 1000);
        }
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