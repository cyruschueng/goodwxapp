// pages/sing_room/sing_room.js
let qcloud = require('../../vendor/wafer2-client-sdk/index')
let config = require('../../config')
let util = require('../../utils/util.js')

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questions: [],
    currentNo: 0,
    successCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.pageGetUserInfo(this)
    let sortId = options.sortId;
    qcloud.request({
      login: false,
      data: {
        sortId: sortId
      },
      url: `${app.appData.baseUrl}getQuestions`,
      success: (res) => {
        let questions = res.data.data;
        questions.forEach((item, index)=> {
          item.answer = JSON.parse(item.answer)
        })
        console.log(questions)
        this.setData({
          questions: questions
        })
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      },
    });
  },
  answerResult(e) {
    if (this.data.lock) {
      return;
    }
    this.setData({
      lock: true
    });
    let item = e.target.dataset.item;
    let answerIndex = e.target.dataset.answerIndex;
    let questionIndex = e.target.dataset.questionIndex;
    let questions = this.data.questions;
    let question = questions[questionIndex];
    let answer = question.answer;
    let duration = 4000;
    if (item.right) {
      duration = 2000;
      wx.showToast({
        title: '答对了',
        icon: 'success',
        duration: 2000
      });
      item.type = 'primary';
      this.setData({
        successCount: this.data.successCount+1
      });
    }
    else {
      item.type = 'warn';
      wx.showToast({
        title: '答错咯~~',
        icon: 'warn',
        duration: 2000
      });
      setTimeout(() => {
        answer.forEach((answerItem, index) => {
          if (answerItem.right) {
            answerItem.type = 'primary';
            this.setAnswerType(answerItem, questionIndex, index);
          }
        });
      }, 2000);
    }
    
    this.setAnswerType(item, questionIndex, answerIndex);
    if (this.data.currentNo >= this.data.questions.length-1) {

      qcloud.request({
        login: true,
        data: {
          count: this.data.successCount,
          openId: this.data.openId
        },
        url: `${app.appData.baseUrl}signSuccess`,
        success: (res) => {
          
        }
        
      });
      wx.showToast({
        title: '签到任务完成',
        icon: 'warn',
        duration: 2000
      });
      setTimeout(() => {
        wx.reLaunch({
          url: '../entry/entry',
        });
      }, 2000);

      return;
    }
    setTimeout(() => {
      this.setData({
        currentNo: this.data.currentNo+1,
        lock: false
      });
    }, duration);
    
  },

  setAnswerType(item, questionIndex, answerIndex) {
    let questions = this.data.questions;
    let question = questions[questionIndex];
    let answer = question.answer;
    this.setData({
      questions: [
        ...questions.slice(0, questionIndex),
        {
          ...question,
          answer: [
            ...answer.slice(0, answerIndex),
            item,
            ...answer.slice(answerIndex + 1)
          ]
        },
        ...questions.slice(questionIndex + 1)
      ]
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})