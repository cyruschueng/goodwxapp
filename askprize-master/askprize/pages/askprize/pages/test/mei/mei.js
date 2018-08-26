const util = require('../../../utils/util.js');
var app = getApp();//获取应用实例
import { prizeApi } from '../../../utils/api/prizeApi.js';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 有奖问答信息
    prize: {
      answer_down_time: '3',
      answer_show_time: '2'
    },
    // 问题列表
    questions: [],
    // 当前答题索引 -1代表未开始
    index: -1,
    // 报名answer信息
    answer: {},
    /**
     * 
     *  记录用户正确回答记录
     *    内置格式：
     *      {
     *        questionid: '问题id',
     *        answers:'assii选项', 
     *        // 答案是否提交至服务器
     *        'submit'=>[0|1]
     *      }; 
     */
    access: [],
    // 记录错误记录,内置格式见access变量
    fail: [],
    // 定时任务变量,num倒计时描述，obj定时任务
    timer: {
      num: 10,
      obj: ''
    },
    letterItems: ['A', 'B', 'C', 'D', 'E','F'],
    //答错提示弹窗
    error: false,
    right: 0,
    selColor: 'option-itemChecked',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    that.prizeApi = new prizeApi(that);
    that.prizeApi.qlist('123', 'cb_qlist');
    console.log(getApp().accredit);
    wx.showShareMenu({
      // shareTicket 是获取转发目标群信息的票据，只有拥有 shareTicket 才能拿到群信息，用户每次转发都会生成对应唯一的shareTicket 。
      withShareTicket: true
    })
  },

  cb_qlist: function (res, opt) {
    var that = this;
    console.log(res);
    if (res.code == 0) {
      // 获取报名anserid
      if (typeof (res.data.answer) != 'undefined') {
        that.data.answer = res.data.answer;
        // 报名id
        that.data.answerid = that.data.answer.answerid;
      }
      // 有奖问答问题列表
      if (typeof (res.data.list) != 'undefined') {
        that.data.questions = res.data.list;
      }

      // 设置一个问题
      that._setQuestion();
    }
  },

  // 逐一设置问题
  _setQuestion: function () {
    var that = this;

    if (that.data.index+1 < that.data.questions.length) {
      // 倒计时总时长
      that.data.timer.num = that.data.prize.answer_down_time;
      // 下一道题索引自增
      that.data.index++;
      console.log(that.data.index);
      that.data.selColor = 'option-itemChecked';

      that.setData({
        index: that.data.index,
        question: that.data.questions[that.data.index],
        down_time: that.data.timer.num,
        listData: that.data.questions,
        selColor: that.data.selColor,
        selIndex: -1
      });
      // that.data.timer.num--;
      // 开始计时
      that.data.timer.obj = setInterval(function () {
        that._timer();
      }, 1000);
    }else{
      console.log('恭喜通关！');
      wx.showToast({
        title: '恭喜通关！',
      })
    }
  },

  // 跟踪选中状态selIndex
  selOption: function (e) {
    var that = this;
    if (!that.data.timer.num) {
      return false;
    }
    // 当前问题
    var question = that.data.questions[that.data.index];
    // 当前选中项值
    var selIndex = e.currentTarget.dataset.index;
    console.log(e.currentTarget.dataset.index);

    that.setData({
      selIndex: selIndex
    })
  },

  // 答题计时down_time
  _timer: function (num) {
    var that = this;
    that.data.timer.num--;
    if (!that.data.timer.num) {
      // 计时结束,清除定时任务
      clearInterval(that.data.timer.obj);
    }
    // 倒计时
    that.setData({
      down_time: that.data.timer.num
    });

    // 显示答案
    if (!that.data.timer.num) {
      that._showResult();
    }

  },

  // 显示结果
  _showResult: function () {
    var that = this;
    console.log('显示结果');
    // 当前问题
    var question = that.data.questions[that.data.index];
    // 选中结果
    var selIndex = that.data.selIndex;
    // 问题正确答案
    var answers = question.answers.split(',');
    console.log(answers);
    // 答题结果   0:不正确  1:正确
    var right = 0;
    if (selIndex == answers) {
      right = 1;
      // 记录正确答案
      console.log('答题正确');
      setTimeout(function () {
        that._setQuestion();
      },that.data.prize.answer_show_time*1000)

    } else {
      setTimeout(function () {
        that.setData({
          error: true
        })
      },that.data.prize.answer_show_time*1000)
    }
    // 设置选中颜色
    that.data.selColor = right ? 'option-itemRight' : 'option-itemError';
    that.setData({
      selColor: that.data.selColor,
    });

    that._asyncAnswer();
  },

  // 答题结果同步至服务器
  _asyncAnswer: function (questionid, selIndex) {
    var that = this;
    var args = {
      answerid: that.data.answerid,
      questionid: that.data.questions[that.data.index].questionid,
      answers: that.data.selIndex
    }
    console.log(args);

    that.prizeApi.answer(args.answerid, args.questionid, args.answers, 'cb_answer');
  },


  cb_answer: function (res, opt) {
    console.log(res);
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
    wx.showShareMenu({
      withShareTicket: true
    })
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
  onShareAppMessage: function (res) {
    return {
      title: '详情页',
      path: '/pages/test/mei/mei',
      success(res) {
        console.log(res)
        if ((!res.hasOwnProperty('shareTickets')) || (!shareTickets) ){
          console.log('分享个人');
          return false;
        }
        var shareTickets = res.shareTickets
        if (!shareTickets) {
          return false
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success(res) {
            // 是微信群
            // res.errMsg; // 错误信息
            var encryptedData = res.encryptedData;
            var iv = res.iv;
          },
          fail(){
            // 不是微信群
          }
        })
      },
      fail(res) {
        // console.log(res)
        console.log('转发失败')
      }
    }
  }
})