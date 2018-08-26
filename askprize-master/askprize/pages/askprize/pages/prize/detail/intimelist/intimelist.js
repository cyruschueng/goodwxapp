// pages/test/topiclist/topiclist.js
import util from "../../../../utils/util"
import { prizeApi } from '../../../../utils/api/prizeApi.js';
import { userApi } from '../../../../utils/api/userApi.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //首页传过来的参数
    options:{
      qid:''
    },
    //报名answer信息
    answer: {},
    // 报名id
    answerid: 0,
    // 问题列表
    questions: [],
    // 当前答题索引 -1代表未开始
    index: -1,
    // 有奖问答信息
    prize: {
      answer_down_time: 3,
      answer_show_time: 2
    },
    // 定时任务变量,num倒计时描述，obj定时任务
    timer: {
      num: 10,
      obj: ''
    },
    //字母选项
    letterItems: ['A', 'B', 'C', 'D'],
    //选中的颜色
    onColor: 'option-itemChecked',
    //是否出现错误弹窗
    error: false,
    // 答题正确数
    okNum: 0,
    //选中结果
    onIndex:-1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    console.log('实时-上页带来的参数--', options);
    that.data.options.qid = options.qid;

    that.prizeApi = new prizeApi(that);
    that.prizeApi.qlist(that.data.options.qid, '0', 'cb_qlist');

  },
  cb_qlist: function (res, opt) {
    var that = this;
    console.log(res);
    if (res.code == 0) {
      if (typeof (res.data.answer) != 'undefined') {
        that.data.answer = res.data.answer;
        that.data.answerid = that.data.answer.answerid;
      }
      if (typeof (res.data.list) != 'undefined') {
        that.data.questions = res.data.list;
      }
      that._setQuestion();
    }
  },

  /**
   * 逐一设置问题
   */

  _setQuestion: function () {
    var that = this;
    that.data.timer.num = that.data.prize.answer_down_time;
    that.data.index++;
    if (typeof (that.data.questions[that.data.index]) != 'undefined') {
      that.data.onColor = 'option-itemChecked';
      that.setData({
        index: that.data.index,
        timer: that.data.timer,
        onColor: that.data.onColor,
        listData: that.data.questions,
        onIndex: -1,
        question: that.data.questions[that.data.index],
      });
      that._timer();
    }else{
      if (that.data.okNum == that.data.questions.length && that.data.questions.length > 0 && that.data.answerid != 'undefined' && that.data.answerid > 0) {
        console.log('成功跳转!!!!!!!!!!!');
        wx.navigateTo({
          url: '../../success/success?pid=' + that.data.options.qid + '&answerid=' + that.data.answerid + '&type=' + 0
        })
      }
    }
  },

  //倒计时
  _timer: function () {
    var that = this;
    clearInterval(that.data.timer.obj);
    if (that.data.timer.num < 0) {
      return false;
    }
    that.data.timer.obj = setInterval(function () {
      that.data.timer.num--;
      if (that.data.timer.num == 0) {
        console.log('倒计时结束');
        that._showResult();
        clearInterval(that.data.timer.obj);
      }
      that.setData({
        timer: that.data.timer
      })
    }, 1000);
  },

  //选择选项
  selOption: function (e) {
    var that = this;
    if (!that.data.timer.num) {
      return false;
    }
    let onIndex = e.currentTarget.dataset.index;
    // console.log('点击事件中的index',onIndex);
    that.setData({
      onIndex: onIndex
    })
  },


  // 显示结果
  _showResult: function () {
    var that = this;
    // 当前问题
    var question = that.data.questions[that.data.index];
    // console.log('选中结果',that.data.onIndex);
    // 选中结果
    var onIndex = that.data.onIndex;
    // 问题正确答案
    var answers = question.answers.split(',');
    console.log('回答问题的正确答案',answers);
    // 答题结果   0:不正确  1:正确
    var right = 0;
    if (onIndex == answers) {
      that.data.okNum++;
      right = 1;
      // 记录正确答案
      console.log('答题正确');
      setTimeout(function () {
        // 判断是否有下一道题
        if (typeof (that.data.questions[that.data.index + 1]) != 'undefined') {
          console.log('进入下一题');
          that._setQuestion();
        } else if (that.data.questions.length > 0 && that.data.okNum == that.data.questions.length && that.data.answerid > 0) {
          console.log('恭喜通关');
          // 通关
          wx.navigateTo({
            url: '../../success/success?pid=' + that.data.options.qid + '&answerid=' + that.data.answerid + '&type=' + 0
          })
        }
      }, that.data.prize.answer_show_time * 1000);
    } else {
      console.log('答题错误--');
      setTimeout(function () {
        that.setData({
          error: true
        })
      }, that.data.prize.answer_show_time * 1000)
    }
    // 设置选中颜色
    that.data.onColor = right ? 'option-itemRight' : 'option-itemError';
    that.setData({
      onColor: that.data.onColor,
    });
    that._asyncAnswer();
  },


  // 答题结果同步至服务器
  _asyncAnswer: function (questionid, onIndex) {
    var that = this;
    console.log('同步到服务器的问题的下标',that.data.index)
    var args = {
      answerid: that.data.answerid,
      questionid: that.data.questions[that.data.index].questionid,
      answers: that.data.onIndex,
      type:'0'
    }
    console.log(args);
    that.prizeApi.answer(args.answerid, args.questionid, args.answers, args.type, 'cb_answer');

  },
  cb_answer: function (res, opt) {
    var that = this;
    // 异常提交处理
    if (res.code) {
      wx.showToast({
        title: res.message,
        image: '/pages/images/warning.png'
      });
      // that.onShow();
    }
    console.log(res);
  },

  defeated: function () {
    var that = this;
    that.setData({
      error: false
    });
    wx.redirectTo({
      url: '/pages/prize/index/index'
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