var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
Page({
  data: {
    nonet: true,
    disabled: false,//保存按钮是否禁用
    describe: "",
    area_title: "请选择",
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
    tips_index: 0, //独家效果
    loading: '0',
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
  },
  onLoad: function (options) {
    let that = this;
    let editProId = options.pro_id;
    let edit = options.edit;
    let stage = wx.getStorageSync('stage');
    let scale = wx.getStorageSync('scale');
    let stage_arry = [];
    let scale_arry = [];
    let belongArea_arry = [];
    // picker 初始数据预处理
    this._pickerDeal(stage, stage_arry, 'stage_name', 'stage', 'stage_arry');
    this._pickerDeal(scale, scale_arry, 'scale_money', 'scale', 'scale_arry');
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
  },
  //picker数据预处理
  _pickerDeal(item, itemArr, itemName, string_item, string_itemArr) {
    if (string_itemArr == 'stage_arry') {
      item.unshift({ stage_name: '请选择' });
    } else{
      item.unshift({ scale_money: '请选择' });
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
    app.log(that,setPrivacy);
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
  //项目领域
  industryChoice() {
    app.href('/pages/form/industry/industry?current=0');
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
  //地区跳转
  areaJump(){
    app.href('/pages/form/area1/area1?current=0');
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
              industry: that.data.industryCard.id,
              pro_finance_stage: that.data.stage[that.data.stage_index].stage_id || '',
              pro_finance_scale: that.data.scale[that.data.scale_index].scale_id || '',
              pro_area_province: that.data.provinceNum,
              pro_area_city: that.data.cityNum,
              is_exclusive: that.data.tips_index,
              pro_name: that.data.projectName,
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
  //点击发布
  public: function () {
    let that = this;
    let theData = this.data;
    let privacy = this.privacyDeal();
    // --------------------表单的各项值-------------------------------------
    // let describe = that.data.describe;
    let industry = that.data.industryCard.id;
    let pro_finance_stage = that.data.stage[that.data.stage_index].stage_id;
    let pro_finance_scale = that.data.scale[that.data.scale_index].scale_id;
    let pro_area_province = that.data.provinceNum;
    let pro_area_city = that.data.cityNum;
    let is_exclusive = that.data.tips_index;
    let  projectName = that.data.projectName;

    // 表单检验和发送表单
    if (!projectName) {
      app.errorHide(that, '请填写项目名称', 3000);
    } else {
      // 区别处理创建项目和维护项目
      let httpUrl = '/api/project/createProject';
      let successText = '成功创建融资项目';
      // 防反复提交处理
      let submitData = {
        url: url_common + httpUrl,
        data: {
          user_id: wx.getStorageSync('user_id'),
          project_id: that.data.pro_id || '',
          industry: industry,
          pro_finance_stage: pro_finance_stage,
          pro_finance_scale: pro_finance_scale,
          pro_area_province: pro_area_province,
          pro_area_city: pro_area_city,
          is_exclusive: is_exclusive,
          pro_name: that.data.projectName,
          service_ps_bp: that.data.service_ps_bp,
          service_fa: that.data.service_fa,
          service_yun: that.data.service_yun,
          pro_total_score: that.data.pro_total_score,
          open_status: privacy.open_status,
          power_share_status: privacy.power_share_status,
          power_investor_status: privacy.power_investor_status,
          company_open_status: Number(!privacy.company_open_status),
        },
      };
      app.buttonSubmit(that, submitData, that.data.buttonOneText, res => {
        let projectId = res.data.project_id;
        //数据清空
        wx.setStorageSync('tran_industry', []);
        wx.setStorageSync('tran_area', []);
        wx.removeStorageSync('setPrivacy');
        app.errorHide(that, successText, 1000);
        // 提交中过渡态处理
        setTimeout(x => {
          app.href('/pages/myProject/publishSuccess/publishSuccess?type=' + 8 + '&&projectId=' + projectId);
        }, 1000);
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