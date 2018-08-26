// pages/test/topiclist/topiclist.js
import util from "../../../utils/util"
import { prizeApi } from '../../../utils/api/prizeApi.js';
import { userApi } from '../../../utils/api/userApi.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //是否来自按钮转发
    shareBtn: false,
    //分享到不同群的信息
    shareArr: [],
    //当前所选
    onIndex: -1,
    //是否最后一道题
    isEnd: false,
    //复活分享成功标志
    isshare: 1,
    //是否可分享
    mayShare: false,
    //设置选项可点击状态
    selClick: true,
    //报名answer信息
    answer: {},
    // 报名id
    answerid: 0,
    //前台显示的题目总数
    questionLen: 0,
    //提交答案返回的信息
    subAnswer: {
      //每道题的正确答案
      answers: 0,
      //剩余分享次数
      remain_relive_num: 0,
      //列表总分享次数
      relive_num: 0,
      //答题正确与否  0错误  1正确
      isright: 0
    },
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
      num: 3,
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

    that.userApi = new userApi(that);
    that.userApi.wxlogin();
    that.prizeApi = new prizeApi(that);
    that.prizeApi.qlist('123', '1', 'cb_qlist');
    wx.showShareMenu({
      // shareTicket 是获取转发目标群信息的票据，只有拥有 shareTicket 才能拿到群信息，用户每次转发都会生成对应唯一的shareTicket 。
      withShareTicket: true
    })

  },
  cb_qlist: function (res, opt) {
    var that = this;
    console.log(res);
    if (res.code == 0) {
      if (typeof (res.data.answer) != 'undefined') {
        that.data.answer = res.data.answer;
        that.data.answerid = that.data.answer.answerid;
        that.data.questionLen = that.data.answer.questions;
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
    that.data.selClick = true;
    that.data.timer.num = that.data.prize.answer_down_time;
    // console.log(that.data.index);
    // console.log(that.data.questions);
    that.data.index++;
    if (typeof (that.data.questions[that.data.index]) != 'undefined') {
      console.log('设置问题', that.data.index);
      that.data.onColor = 'option-itemChecked';
      that.data.subAnswer.answers = 0;
      that.setData({
        index: that.data.index,
        timer: that.data.timer,
        questionLen: that.data.questionLen,
        onIndex: -1,
        question: that.data.questions[that.data.index],
        selClick: that.data.selClick,
        onColor: that.data.onColor,
        answers: that.data.subAnswer.answers,
      });
      that._timer();
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
        wx.showLoading({
          title: '提交中...',
        })
        clearInterval(that.data.timer.obj);
        //将选项更新为不可点击状态
        that.data.selClick = false;
        //答案提交到服务器
        that._asyncAnswer();
        setTimeout(function () {
          that.shareShade();
        }, that.data.prize.answer_show_time * 1000);
      }
      that.setData({
        selClick: that.data.selClick,
        timer: that.data.timer
      })
    }, 1000);
  },

  //选择选项
  selOption: function (e) {
    var that = this;
    if (!that.data.selClick) {
      return false;
    }
    wx.showLoading({
      title: '提交中...',
    })
    that.data.onIndex = e.currentTarget.dataset.index;
    console.log(e);
    console.log('当前所选', that.data.onIndex);
    clearInterval(that.data.timer.obj);
    //将选项更新为不可点击状态
    that.data.selClick = false;
    //答案提交到服务器
    that._asyncAnswer();
    that.setData({
      onIndex: that.data.onIndex,
      selClick: that.data.selClick
    });

    setTimeout(function () {
      that._showResult();
      //显示正确答案
      that.setData({
        answers: that.data.subAnswer.answers
      })
    }, that.data.prize.answer_show_time * 1000)

  },

  // 答题结果同步至服务器
  _asyncAnswer: function () {
    var that = this;
    console.log('当前需要提交问题答案的下标', that.data.index);
    var args = {
      answerid: that.data.answerid,
      questionid: that.data.questions[that.data.index].questionid,
      answers: that.data.onIndex,
      type: '1'
    }
    console.log('提交答案接口传参--', args);
    that.prizeApi.answer(args.answerid, args.questionid, args.answers, args.type, 'cb_answer');

  },
  cb_answer: function (res, opt) {
    var that = this;
    // 异常提交处理
    if (res.code == 0) {
      wx.hideLoading();
      // console.log('提交答案--',res.data);
      that.data.subAnswer.answers = res.data.answers;
      that.data.subAnswer.remain_relive_num = res.data.remain_relive_num;
      that.data.subAnswer.relive_num = res.data.relive_num;
      that.data.subAnswer.isright = res.data.isright;
    } else {
      wx.showToast({
        title: res.message,
        image: '/pages/images/warning.png'
      });
      // that.onShow();
    }
    if (that.data.timer.num <= 0) {
      that.setData({
        answers: that.data.subAnswer.answers
      })
    }

  },


  /** 显示结果
   *    isEnd:是否最后一题
   *    isright:题是否正确
   *    questionLen:列表显示的最大题数
   */
  _showResult: function () {
    var that = this;
    // console.log('当前下标：', that.data.index);
    // console.log('正确答案：', that.data.subAnswer.answers);
    // console.log('题列表总长度', that.data.questions.length);
    // console.log('剩余分享次数----显示结果中--' + that.data.subAnswer.remain_relive_num);
    // console.log('是否答题正确', that.data.subAnswer.isright);

    //给最后一题添加标识 isEnd
    if (that.data.index + 1 >= that.data.questionLen) {
      console.log('列表显示最后一题');
      that.data.isEnd = true;
    } else {
      console.log('不是最后一题');
      that.data.isEnd = false;
    }

    // 答题结果  that.data.subAnswer.isright
    if (that.data.subAnswer.isright) {
      // right = 1;
      setTimeout(function () {
        console.log('回答正确');
        if (that.data.isEnd) {
          console.log('通关');
          wx.showToast({
            title: '恭喜通关',
            image: '/pages/images/success.png',
          })
        } else {
          that._setQuestion();
        }
      }, that.data.prize.answer_show_time * 1000);
    } else {
      setTimeout(function () {
        console.log('回答错误');
        that.shareShade();
      }, that.data.prize.answer_show_time * 1000);
    }

    that.data.onColor = that.data.subAnswer.isright ? 'option-itemRight' : 'option-itemError';
    that.setData({
      onColor: that.data.onColor,
    });
  },




  //点击“我知道了”
  defeated: function () {
    var that = this;
    that.setData({
      error: false
    })
  },

  /**
   * 答题弹窗（复活/错误）
   *  error:true 显示弹窗   false 弹窗消失
   *  mayShare:true 显示复活
   * 
   */
  shareShade: function () {
    var that = this;
    console.log('剩余分享次数----' + that.data.subAnswer.remain_relive_num);
    if (that.data.subAnswer.remain_relive_num > 0) {
      that.setData({
        error: true,
        mayShare: true
      })
    } else {
      that.setData({
        error: true,
        mayShare: false
      })
    }

  },

  /**
   * 用户点击右上角分享
   *    shareBtn：是否按钮转发（复活）
   *    isshare：是否分享成功
   */
  onShareAppMessage: function (res) {
    var that = this;
    console.log(res);
    if (res.from === 'button') {
      // 来自页面内转发按钮
      that.data.shareBtn = true;
    } else {
      that.data.shareBtn = false;
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      complete: function (res) {
        // console.log('都会执行的分享信息--', res);
        if (res.errMsg == 'shareAppMessage:ok') {
          //分享为按钮转发
          if (that.data.shareBtn) {
            //判断是否分享到群
            if (res.hasOwnProperty('shareTickets')) {
              // console.log('分享群信息', res.shareTickets[0]);
              // console.log('分享到群啦');
              that.data.isshare = 1;
              // wx.showToast({
              //   title: '分享成功',
              // })
            } else {
              // console.log('分享到个人--算做分享失败');
              that.data.isshare = 0;
              wx.showToast({
                title: '必须分享到群才算复活',
                image: '/pages/images/warning.png'
              });
            }
          }

        } else {
          wx.showToast({
            title: '分享失败',
            image: '/pages/images/error.png'
          })
          that.data.isshare = 0;
        }

        var args = {
          qid: '123',
          answerid: that.data.answerid,
          questionid: that.data.questions[that.data.index].questionid,
          isshare: that.data.isshare,
        }
        // console.log(args);
        // console.log('是否是按钮转发', that.data.shareBtn);
        //分享到群且为按钮分享--请求接口
        if (that.data.isshare == 1 && that.data.shareBtn) {
          that.prizeApi.isrelive(args.qid, args.answerid, args.questionid, args.isshare, 'cb_isrelive');
        }

      },
    }
  },

  cb_isrelive: function (res, opt) {
    var that = this;
    if (res.code == 0) {
      that.data.isshare = res.data.isshare;
      if (that.data.isshare == 1 && that.data.subAnswer.remain_relive_num > 0) {
        console.log('分享成功，进入下一题');
        that.setData({
          error: false
        })
        that._setQuestion();

      } else {
        console.log('分享失败---后台返回');
      }
    }
  }
})