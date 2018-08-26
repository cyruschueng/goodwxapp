// pages/test/topiclist/topiclist.js
import util from "../../../utils/util"
import { prizeApi } from '../../../utils/api/prizeApi.js';
import { userApi } from '../../../utils/api/userApi.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
      answer_down_time: 10,
      answer_show_time: 2
    },
    // 定时任务变量,num倒计时描述，obj定时任务
    timer: {
      num: 2,
      obj: ''
    },
    //字母选项
    letterItems: ['A', 'B', 'C', 'D'],
    //选中的颜色
    onColor: 'option-itemChecked',
    //是否出现错误弹窗
    error: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    that.prizeApi = new prizeApi(that);
    that.prizeApi.qlist('123', 'cb_qlist');

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
      that.setData({
        index: that.data.index,
        timer: that.data.timer,
        onIndex: -1,
        question: that.data.questions[that.data.index],
      });
      that._timer();
    }
  },

  //倒计时
  _timer: function () {
    var that = this;
    clearInterval(that.data.timer.obj);
    if (that.data.timer.num < 0) {
      console.log('xiao')
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
    that.setData({
      onIndex: onIndex
    })
  },


  //显示结果
  _showResult: function () {
    var that = this;
    console.log(that.data.index);
    //记录问题的正确答案
    let answers = that.data.questions[that.data.index].answers.split(',');
    console.log(answers);
    // 答题结果   0:不正确  1:正确
    let right = 0;
    if (answers == that.data.onIndex) {
      right = 1;
      setTimeout(function () {
        console.log('回答正确');
        console.log(that.data.questions[that.data.index + 1]);
        if (typeof (that.data.questions[that.data.index + 1]) != 'undefined') {
          that._setQuestion();
        }
      }, that.data.prize.answer_show_time * 1000);
    } else {
      setTimeout(function () {
        console.log('回答错误');
        that.setData({
          error: true
        })
      }, that.data.prize.answer_show_time * 1000)
    }

    that.data.onColor = right ? 'option-itemRight' : 'option-itemError';
    that.setData({
      onColor: that.data.onColor,
    });
  },

  defeated: function () {
    var that = this;
    that.setData({
      error: false
    })
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