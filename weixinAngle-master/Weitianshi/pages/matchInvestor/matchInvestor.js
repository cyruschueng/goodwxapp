var app = getApp();
var url_common = app.globalData.url_common;
import * as CreateProject from '../../utils/model/createProjectBottom';
let RG = require('../../utils/model/register.js');
let register = new RG.register(); 
Page({
  data: {
    imgUrls: app.globalData.picUrl.page_matchInvestorEmpty,
    modalBox: 0,
    nonet: true
  },
  onLoad:function(){
    let that=this;
    this.getMyProject();
    app.initPage(that);
    app.loginPage((user_id) => {
      if (user_id == 0) {
        that.setData({
          noUserId: true
        });
      }
    });
    app.netWorkChange(that);

  },
  // 获取项目信息
  getMyProject() {
    let that = this;
    let user_id = wx.getStorageSync('user_id');
    wx.showLoading({
      title: 'loading',
    });
    wx.request({
      url: url_common + '/api/project/getMyProjectList',
      data: {
        user_id: user_id,
        type: 'match'
      },
      method: 'POST',
      success: function (res) {
        wx.hideLoading();
        let myProject = res.data.data;
        // 拼接industryArry和otherTag用于展示
        if (myProject) {
          myProject.forEach(x => {
            x.industryArr = '';
            x.otherTag = '';
            if (x.pro_industry.length != 0) {
              x.pro_industry.forEach((y, index) => {
                if (index != x.pro_industry.length - 1) {
                  x.industryArr += y.industry_name + '、';
                } else {
                  x.industryArr += y.industry_name;
                }
              });
            }

            let money = x.pro_scale.scale_money + '、';
            let stage = x.pro_stage.stage_name + '、';
            let area = x.pro_area.area_title;
            let stockAfter;//定义投后指数
            if (x.pro_finance_stock_after == 0.00) {
              x.pro_finance_stock_after = 0;
            } else {
              x.pro_finance_stock_after = x.pro_finance_stock_after;
            }//投后指数为空处理
            let after = x.pro_finance_stock_after + '%、';
            let after1 = x.pro_finance_stock_after + '%';
            if (x.pro_area == '' && x.pro_stage == '') {
              stockAfter = after1;
            } else {
              stockAfter = after;
            }//判断投后指数是不是最后一项（显示样式问题）
            if (x.pro_scale == '') {
              x.pro_scale = {};
              x.pro_scale.scale_money = " ";
              money = '';
            }
            else {
              money = x.pro_scale.scale_money + '、';
            }//投资金额为空判断
            if (x.pro_stage == '') {
              x.pro_stage = {};
              x.pro_stage.stage_name = " ";
              stage = '';
            }
            else {
              stage = x.pro_stage.stage_name + '、';
            }//投资轮次为空判断
            if (x.pro_area == '') {
              x.pro_area = {};
              x.pro_area.area_title = " ";
              area = '';
            }
            else {
              area = x.pro_area.area_title;
            }//投资地区为空判断
                 
            x.otherTag = money + stockAfter + stage + area;
          
          });
        }
        app.log('项目列表', myProject);
        //刷新数据
        that.setData({
          myProject: myProject,
        });
      }
    });
  },
  //发布融资项目
  publicBtn: function () {
    CreateProject.toCreateProject.call(this);
  },
  //一键推送
  goToMatchInvestor(e) {
    let id = e.currentTarget.dataset.proId;
    app.href('/pages/myProject/projectDetail/projectDetail?id=' + id + "&&currentTab=" + 1);
  },
  // 浏览
  viewProject: function (e) {
    let project_id = e.currentTarget.dataset.proid;
    app.href('/pages/message/viewProjectUser/viewProjectUser?project_id=' + project_id);
  },
  //申请查看
  applyPerson: function (e) {
    let proid = e.currentTarget.dataset.proid;
    app.href('/pages/message/applyPerson/applyPerson?id=' + proid);
  },
  //约谈
  hasMeeting: function (e) {
    let projectId = e.currentTarget.dataset.proid;
    app.href('/pages/message/contactProject/projectList/projectList?id=' + projectId);
  },
  //项目详情
  projectDetail(e) {
    let pro_id = e.currentTarget.dataset.id;
    app.href('/pages/myProject/projectDetail/projectDetail?id=' + pro_id);
  },
  //加载更多
  loadMore() {
    let that = this;
    let user_id = wx.getStorageSync('user_id');
    let currentPage = this.data.currentPage;
    let myProject = this.data.myProject;
    let request = {
      url: url_common + '/api/project/getMyProjectList',
      data: {
        user_id: user_id,
        type: 'match',
        page: currentPage
      },
    };
    app.loadMore2(that, request, res => {
      let newPage = res.data.data;
      let page_end = res.data.page_end;
      if (myProject) {
        myProject = myProject.concat(newPage);
        currentPage++;
        that.setData({
          myProject: myProject,
          page_end: page_end,
          requestCheck: true,
          currentPage: currentPage
        });
      }
      if (page_end == true) {
        app.errorHide(that, '没有更多了', 3000);
      }
    });
  },

  //----------------------创建项目引导------------------------------------------------ 
  // 跳转创建项目页面
  toCreateProject: function () {
    CreateProject.toCreateProject.call(this);
  },
  // 在电脑上创建
  createProjectPc() {
    CreateProject.createProjectPc();
  },
  //去电脑上传
  toPc: function () {
    app.checkUserInfo(this, res => {
      this.setData({
        modalBox: 1
      });
    })
  },
  //关闭模态框
  closeModal: function () {
    this.setData({
      modalBox: 0
    });
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
  },
  // 微信授权绑定
  getPhoneNumber(e) {
    register.getPhoneNumber.call(this, e);
  },
  // 手机号码绑定
  telephoneRegister() {
    register.telephoneRegister.call(this);
  },
  // 关闭绑定方式选择弹框
  closeRegisterModal() {
    register.closeRegisterModal.call(this);
  }
});