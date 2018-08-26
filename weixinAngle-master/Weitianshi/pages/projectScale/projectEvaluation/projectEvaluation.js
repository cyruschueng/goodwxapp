// pages/projectScale/projectEvaluation.js
var rqj = require('../../Template/Template.js');
var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
import * as ShareModel from '../../../utils/model/shareModel';
Page({
  data: {
    disabled: false,
    slivalue: 6,
    sliderValue: 6,
    leaveMessage: '',
    title: '智慧赛事',
    totalNum1: '--',
    score: [

    ],
    investScore: 6,
    score_list: [],
    score_list1: [],
    buttonOneText: '提交',
    nonet: true
  },
  onLoad: function (options) {
    this.setData({
      project_id: options.project_id,
      user_id: options.user_id,
      competition_id: options.competition_id
    });
    let that = this;
    app.netWorkChange(that);
  },
  onShow: function () {
    let that = this;
    this.history();

  },
  // 获取内容
  content() {
    let that = this;
    wx.request({
      url: url_common + '/api/project/scoreView',
      method: "POST",
      data: {
        user_id: that.data.user_id,
        project_id: that.data.project_id,
        competition_id: that.data.competition_id,
      },
      success: function (res) {
        app.log(that,'input填写', res);
        let score_list1 = res.data.data.list;
        // 历史消息接口没有这个最大值字段 需要人为添加到数组
        let view_id = [];
        let viewId = [];//暂存
        let maxScore = [];
        let historyDesc = [];
        let historyName = [];
        let name = [];
        for (let i = 0; i < score_list1.length; i++) {

          viewId.push(score_list1[i].index_id);

          if (viewId[i] != that.data.history_id[i]) {
            name.push(score_list1[i]);
            view_id.push(viewId[i]);
          }
        }

        let competition_name = res.data.data.competition_name;
        that.setData({
          score_list1: score_list1,
          maxScore: maxScore,
          historyDesc: historyDesc,
          historyName: historyName,
          view_id: view_id,
          competition_name: competition_name,
          name: name
        });

      }
    });
  },
  // 获取历史评分
  history() {
    let that = this;
    wx.request({
      url: url_common + '/api/project/getHistoryScore',
      method: "POST",
      data: {
        user_id: that.data.user_id,
        project_id: that.data.project_id,
        competition_id: that.data.competition_id,
      },

      success: function (res) {
        app.log(that,'历史', res);
        let list1 = res.data.data.score_list;
        let remark = res.data.data.remark;
        let competition_name = res.data.data.competition_name;
        let slider;
        let total = res.data.data.total_score;
        let score = that.data.score;
        let history_id = [];


        let score_list1 = Object.assign(list1, that.data.name);
        // console.log(score_list1);
        for (let i = 0; i < score_list1.length; i++) {
          score[i] = score_list1[i].index_score;
          history_id.push(score_list1[i].index_id);
        }
        // 滑块设置初始值
        if (res.data.data.invest_score == 0) {
          let slider = 6;
          that.setData({
            slider: 6
          });
        } else {
          let slider = res.data.data.invest_score;
          that.setData({
            slider: slider
          });
        }
        that.setData({
          score_list1: score_list1,
          score: score,
          competition_name: competition_name,
          introduce: remark,
          sliderValue: that.data.slider,
          slivalue: that.data.slider,
          totalNum1: total,
          history_id: history_id
        });
        if (that.data.totalNum1 == 0) {
          that.setData({
            totalNum1: '--'
          });
        }
        that.content();
      }

    });
  },
  // 滑块滑动
  sliderchange(e) {
    let that = this;
    that.setData({
      sliderValue: e.detail.value
    });
  },
  // 描述
  leaveMessage: function (e) {
    let leaveMessage = e.detail.value;
    let leaveMessage_length = e.detail.value.length;
    let that = this;
    if (leaveMessage_length <= 500) {
      this.setData({
        leaveMessage: leaveMessage
      });
    } else {
      app.errorHide(that, "不能超过500个数字", 1000);
    }
  },
  // 相加取值
  totalNum: function (e) {
    let that = this;
    let score = that.data.score;
    let score_list = that.data.score_list;
    // 初始值设置为0
    for (let i = 0; i < that.data.score_list1.length; i++) {
      score[i] = score[i] ? score[i] : '';
    }
    let id = e.currentTarget.dataset.id;
    score[id] = e.detail.value;
    let totalNum1 = 0;
    for (let i = 0; i < score.length; i++) {
      if (score[i] != '') {
        totalNum1 += parseInt(score[i]);
      }
    }
    if (totalNum1 == 0) {
      totalNum1 = '--';
    }
    that.setData({
      score: score,
      totalNum1: totalNum1
    });
    // console.log(that.data.score, that.data.totalNum1);
  },
  // 提交
  submit: function () {
    let that = this;
    let score = that.data.score;
    let score_list = that.data.score_list;
    let score_list1 = that.data.score_list1;
    let jsonArry = [];
    for (let i = 0; i < score.length; i++) {
      if (score[i] == '') {
        score[i] = 0;
      }
      if (score[i] == '') {
        app.errorHide(that, "请打分", 1500);
        that.setData({
          score_list: []
        });
        return;
      }
      else if (score[i] > score_list1[i].index_score) {
        // console.log(score[i], score_list1[i].index_score)
        app.errorHide(that, "请输入的值小于最大值", 1500);
        that.setData({
          score_list: []
        });
        return;

      } else if (that.data.leaveMessage.length > 500) {
        app.errorHide(that, "不能超过500个数字", 1000);
        return;
      } else {
        jsonArry.push([score[i], score_list1[i].index_id]);
        score_list.push({
          index_score: jsonArry[i][0],
          index_id: jsonArry[i][1]
        });
      }
    }
    that.setData({
      score_list: score_list
    });
    // console.log('score_list', score_list);
    // console.log('score_list1', score_list1);
    if (score_list.length < score_list1.length) {
      app.errorHide(that, "请打分", 1500);
      return;
    }
    // if (score_list1.length != 0) {
    //   if (that.data.score_list.length == 0) {    
    //   app.errorHide(that, "请打分", 1500);
    //     return
    //   }
    // }
    // if (that.data.score_list1.length == 0) {
    //     app.errorHide(that, "请打分", 1500);
    //     return
    // }
    // 提交中过渡态()
    app.disableButton(that);
    app.httpPost({
      url: url_common + '/api/project/saveScore',
      data: {
        user_id: that.data.user_id,
        project_id: that.data.project_id,
        competition_id: that.data.competition_id,
        invest_score: that.data.sliderValue,
        remark: that.data.leaveMessage,
        score_list: that.data.score_list
      },
    }, that).then(res => {
      if (res.data.status_code == 2000000) {
        app.errorHide(that, "提交成功", 3000);
        setTimeout(function () {
          wx.navigateBack({
            delta: 1 // 回退前 delta(默认为1) 页面
          });
        }, 2000);
      }
    }).catch(err => {
      app.errorHide(that, "提交失败", 3000);
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
  }
});