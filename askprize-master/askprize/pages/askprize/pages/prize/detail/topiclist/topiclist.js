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
    options: {
      qid: ''
    },
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
      num: 10,
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
    wx.hideLoading();
    console.log('非实时-上页带来的参数--', options);
    //页面参数
    that.data.options.qid = options.rid;
    // that.data.options.qid = '123';
    console.log(that.data.options.qid);

    that.userApi = new userApi(that);
    that.userApi.wxlogin();
    that.prizeApi = new prizeApi(that);

    //请求题目列表数据
    that.prizeApi.qlist(that.data.options.qid, '1', 'cb_qlist');
    wx.showShareMenu({
      // shareTicket 是获取转发目标群信息的票据，只有拥有 shareTicket 才能拿到群信息，用户每次转发都会生成对应唯一的shareTicket 。
      withShareTicket: true
    });


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
      //开始读取题目
      that._setQuestion();
    }
  },

  /**
   * 逐一设置问题
   */

  _setQuestion: function () {
    var that = this;
    //将选项设置为可点击状态
    that.data.selClick = true;
    that.data.timer.num = that.data.prize.answer_down_time;
    that.data.index++;

    if (typeof (that.data.questions[that.data.index]) != 'undefined') {
      console.log('设置问题', that.data.index);
      that.data.onColor = 'option-itemChecked';
      //每次进入下一题将问题答案置空
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
    //清除上一个定时任务
    clearInterval(that.data.timer.obj);

    if (that.data.timer.num < 0) {
      return false;
    }
    that.data.timer.obj = setInterval(function () {
      that.data.timer.num--;

      if (that.data.timer.num == 0) {
        console.log('倒计时结束');
        //倒计时结束 清除定时任务
        clearInterval(that.data.timer.obj);
        //将选项更新为不可点击状态
        that.data.selClick = false;
        //答案提交到服务器
        that._asyncAnswer();
        //2s之后显示弹窗
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

    //点击完之后不可再次点击
    if (!that.data.selClick) {
      return false;
    }

    that.data.onIndex = e.currentTarget.dataset.index;
    console.log('当前所选', that.data.onIndex);
    //选完答案清除定时任务
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
      //更新选中的结果
      that._showResult();
      //答题错误时将正确答案赋给模板
      that.setData({
        answers: that.data.subAnswer.answers
      })
    }, that.data.prize.answer_show_time * 1000)

  },

  // 答题结果同步至服务器
  _asyncAnswer: function () {
    var that = this;
    //请求提交答案接口显示loading
    wx.showLoading();
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
      //题目的正确答案
      that.data.subAnswer.answers = res.data.answers;
      //剩余分享次数
      that.data.subAnswer.remain_relive_num = res.data.remain_relive_num;
      //可分享的总次数
      that.data.subAnswer.relive_num = res.data.relive_num;
      //是否答题正确
      that.data.subAnswer.isright = res.data.isright;
    } else {
      wx.showToast({
        title: res.message,
        image: '/pages/images/warning.png'
      });
    }
    
    //倒计时完，未选择答案将正确答案赋给模板
    if (that.data.timer.num == 0) {
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
          //通关跳转至成功页 不可返回
          wx.redirectTo({
            url: '../../success/success?pid=' + that.data.options.qid + '&answerid=' + that.data.answerid + '&type=' + 1
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

    //选中选项的颜色变化 正确变绿色 错误变红色
    that.data.onColor = that.data.subAnswer.isright ? 'option-itemRight' : 'option-itemError';
    that.setData({
      onColor: that.data.onColor,
    });
  },




  //点击“我知道了”
  defeated: function () {
    var that = this;
    //弹窗消失
    that.setData({
      error: false
    });
    //跳回到首页 不可返回
    wx.redirectTo({
      url: '/pages/prize/index/index'
    });
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
    //有分享次数剩余，弹窗为马上复活
    if (that.data.subAnswer.remain_relive_num > 0) {
      that.setData({
        error: true,
        mayShare: true
      })
    } else {
      //无分享次数剩余，弹窗为答题失败
      that.setData({
        error: true,
        mayShare: false
      })
    }

  },

  /**
   * 用户点击右上角分享
   *    shareBtn：是否按钮转发（复活）
   *    isshare：是否分享成功  isshare=1 成功复活     isshare=0 复活失败
   */
  onShareAppMessage: function (res) {
    var that = this;
    console.log(res);

    if (res.from === 'button') {
      // 来自页面内转发按钮
      that.data.shareBtn = true;
    } else {
      //来自右上角转发
      that.data.shareBtn = false;
    }

    return {
      title: '自定义转发标题',
      path: 'pages/prize/index/index',
      complete: function (res) {

        if (res.errMsg == 'shareAppMessage:ok') {

          //分享为按钮转发
          if (that.data.shareBtn) {

            //判断是否分享到群
            if (res.hasOwnProperty('shareTickets')) {
              that.data.isshare = 1;
              //分享成功 弹窗消失
              that.setData({
                error: false
              })
            } else {
              // console.log('分享到个人--算做分享失败');
              that.data.isshare = 0;
              wx.showToast({
                title: '必须分享到群',
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
          qid: that.data.options.qid,
          answerid: that.data.answerid,
          questionid: that.data.questions[that.data.index].questionid,
          isshare: that.data.isshare,
        }

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
        that._setQuestion();

      } else {
        console.log('分享失败---后台返回');
      }
    }

  }
})