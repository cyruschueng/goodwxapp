import util from "../../../utils/util"
import { prizeApi } from '../../../utils/api/prizeApi.js';
import { userApi } from '../../../utils/api/userApi.js';
var app = getApp();//获取应用实例
Page({
    /**
     * 页面的初始数据
     */
    data: {
        downRefresh: false,
        maskBox: false,
        // 登录弾层（默认隐藏）
        loginShow: false,
        //首页详情信息
        prizelast: '',
        prizelastbox: true,
        navigateTo: '',
        //未开始1、10s倒计时2、进行中3、结束-1
        Istimestatus: 99,
        // prizemoneyend: false,
        // 有奖问答信息
        prize: {
            answer_down_time: 10,
            answer_show_time: 2
        },
        qid: '',
        // 问题列表
        questions: [],
        // 当前答题索引 -1代表未开始
        index: -1,
        // 报名answer信息
        answer: {},
        // 报名id
        answerid: 0,
        // 报名获取异步状态
        answer_async: false,
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
        // 有奖问答倒计时
        prizeInterval: '',
        //字母选项
        letterItems: ['A', 'B', 'C', 'D', 'E', 'F'],
        //答错提示弹窗
        error: false,
        right: 0,
        selColor: 'option-itemChecked',
        access: [],
        // 记录错误记录,内置格式见access变量
        fail: [],
        // 获取的奖金
        money: 0,
        // 答题正确数
        okNum: 0,
        test: 0
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        that.userApi = new userApi(that);
        that.prizeApi = new prizeApi(that);
        // that.prizeApi.qlist(that.data.qid, 'cb_qlist');
        // that.prizeApi.lastOne('cb_lastOne');
    },
    /**
   * 生命周期函数--监听页面显示
   */
    onShow: function () {
        var that = this;
        // 放置tabbar跳转出现showLoading
        wx.hideLoading();
        // 判断是否登录
        that.userApi.wxlogin('cb_login');

        console.log(that.data.Istimestatus)
    },
    cb_login: function (res, opt) {
        var that = this;
        console.log(res);
        that.data.userId = res.id;
        if (typeof (res.id) != 'undefined' && res.id == 0) {
            that.loginTips(1);
        } else {
            // 最新一条有奖问答信息
            that.setData({
                prizelastbox: true,
                // prizemoneyend: false
            })
            that.prizeApi.lastOne('cb_lastOne');
        }
    },
    _onSubmit: function () {
        var that = this;
        console.log('点击自定义组件的提交');
        that.setData({
            prizelastbox: true,
            // prizemoneyend: false
        })
        that.prizeApi.lastOne('cb_lastOne');
    },
    // 显示登录弾层
    loginTips: function (isshow) {
        var that = this;
        that.data.loginShow = isshow;
        that.setData({ loginShow: that.data.loginShow });
    },

    // 重置页面变量
    resetArgs: function () {
        var that = this;
        that.index = -1;

    },

    /**
     * 获取最新一条有奖问答
     * 
     * @param 
     *      
     */
    cb_lastOne: function (res, opt) {
        // 最新一条有奖问答信息详情展示

        console.log('cb_lastOne-----------------------------------');
        console.log(res);
        var that = this;
        if (res.code == 0) {
            wx.stopPullDownRefresh();
            that.data.qid = res.data.qid;
            that.data.prizelast = res.data;
            that.data.prize.answer_down_time = res.data.answer_down_time;
            that.data.prize.answer_show_time = res.data.answer_show_time;
            that.data.timer.num = that.data.prize.answer_down_time;
            that.data.okNum = 0;
            console.log('that.data.prize.answer_down_time', that.data.prize.answer_down_time);
            that.setData({
                // prizelastbox: true,
                prizelast: that.data.prizelast,
            })
            // var now_time = Date.parse(new Date()) / 1000
            var now_time = app.time();
            var timestamp = that.data.prizelast.start_time
            var end_time = that.data.prizelast.end_time
            // 测试
            // timestamp = now_time+10;
            // end_time = timestamp+10000;

            if (now_time > end_time && end_time > 0) {
                console.log("活动已结束")
                that.data.downRefresh = true;
                that.setData({
                    prizelast: that.data.prizelast,
                    // prizemoneyend: true,
                    Istimestatus: -1
                    // isendtime: false,
                    // isstartime: false
                })
                // that.prizeApi.money(that.data.qid, 'cb_money');
            } else {
                // 时间倒计时定时任务
                var downTime = util.downTimer(timestamp, app.time());
                console.log('time', util.downTimer(timestamp, app.time()));
                that.setData({
                    // isstartime: true,
                    Istimestatus: 1,
                    downTime: downTime,
                });

                // 获取问题列表
                if (downTime.ntime >= 0 && downTime.ntime < 11) {
                    that._asyncQuestions();
                }

                /**** 时间倒计时定时任务(start) ****/
                // 清除上一次定时任务
                clearInterval(that.data.prizeInterval);
                if (downTime.ntime >= 0) {
                    console.log("活动即将进行")
                    that.data.prizeInterval = setInterval(function () {
                        // 计算时间差
                        let downTime = util.downTimer(timestamp, app.time());
                        // 过期定时任务结束
                        if (downTime.ntime < 0) {
                            clearInterval(that.data.prizeInterval);
                            // 活动进行中
                            return false;
                        }
                        // 倒计时样式变更 未开始1、10s倒计时2、进行中3、结束-1
                        let Istimestatus = 1;
                        let prizelastbox = true;
                        if (downTime.ntime < 11 && downTime.ntime > 0) {
                            // 清除时间同步
                            if (app.timerAsync) {
                                clearInterval(app.timerAsync);
                            }
                            /*** 10秒倒计时 ***/
                            Istimestatus = 2;
                            // 获取问题列表
                            that._asyncQuestions();
                        } else if (downTime.ntime == 0) {
                            /*** 开始答题问题 ***/
                            prizelastbox = false;
                            // 设置问题未开始索引
                            that.data.index = -1;
                            // 开始答题
                            that._setQuestion();
                            // 标识状态
                            Istimestatus = 3;
                            // 清除当前定时任务
                            clearInterval(that.data.prizeInterval);
                        }

                        // 设置模板变量
                        that.setData({
                            // 倒计时层
                            prizelastbox: prizelastbox,
                            // 答题状态
                            Istimestatus: Istimestatus,
                            // 时间
                            downTime: downTime
                        });

                        console.log('---ntime', downTime.ntime);
                    }, 1000)
                } else {
                    console.log("活动正在进行中");
                    that.setData({
                        prizelastbox: true,
                        Istimestatus: 3
                    })
                }
            }
        }
    },

    // 获取问题列表
    _asyncQuestions: function () {
        var that = this;
        if (!that.data.answerid && !that.data.answer_async) {
            that.data.answer_async = true;
            that.prizeApi.qlist(that.data.qid, 'cb_qlist');
            // 设置超时重置异步请求
            setTimeout(function () {
                that.data.answer_async = false;
            }, 2000);
        }
    },

    cb_qlist: function (res, opt) {
        var that = this;
        // 异步获取成功
        that.data.answer_async = false;

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
            // // 设置一个问题
            // that._setQuestion();
        } else if (res.code == 3001) {

            that.data.navigateTo = 1
        }
    },
    /**
     *  逐一设置问题
     * 
     * 变量：
     *    index: 当前问题索引
     *    timer.num: 回答问题倒计时
     *    question: 当前问题内容
     *    listData: 问题列表
     *    selColor: 颜色
     *    selIndex: 用户选中的选项索引
     *    error: 显示错误弹窗为false
     * 
     */
    _setQuestion: function () {
        var that = this;
        // 问题判断
        if (!that.data.questions.length) {
            that.onShow();
            return false;
        }
        console.log('当前答了第几题------' + that.data.okNum);
        console.log('问题总数-------' + that.data.questions.length);
        // 答题倒计时
        that.data.timer.num = that.data.prize.answer_down_time;
        console.log('----setQuestion', that.data.timer.num);
        // 下一道题索引自增
        that.data.index++;

        if (typeof (that.data.questions[that.data.index]) != 'undefined') {
            that.data.selColor = 'option-itemChecked';
            that.setData({
                index: that.data.index,
                timer: that.data.timer,
                listData: that.data.questions,
                selColor: that.data.selColor,
                selIndex: -1,
                error: false,
                question: that.data.questions[that.data.index],
            });
            console.log('question set data--timer.num', that.data.timer.num)
            // 定时任务倒计时
            that._timer();

        } else if (that.data.navigateTo == 1) {
            that.setData({
                prizelastbox: true,
                Istimestatus: 3
            })
        } else {
            console.log('that.data.okNum------' + that.data.okNum);
            console.log('问题总数-------' + that.data.questions.length);
            if (that.data.okNum == that.data.questions.length && that.data.questions.length > 0 && that.data.answerid != 'undefined' && that.data.answerid > 0) {
                console.log('成功跳转!!!!!!!!!!!');
                wx.navigateTo({
                    url: '../success/success?pid=' + that.data.qid + '&answerid=' + that.data.answerid
                })
            }
            // that.prizeApi.money('1', 'cb_money');
        }
    },

    // 答题计时down_time
    _timer: function () {
        var that = this;
        // 清除上一个定时任务
        clearInterval(that.data.timer.obj);
        if (that.data.timer.num < 0) {
            return false;
        }
        // 答题倒计时
        that.data.timer.obj = setInterval(function () {
            that.data.timer.num--;
            if (that.data.timer.num == 0) {
                // 计时结束,清除定时任务,显示答案
                that._showResult();
                that.data.timer.num = -1;
                clearInterval(that.data.timer.obj);
            };

            // 倒计时
            that.setData({
                timer: that.data.timer
            });
        }, 1000);
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
        that.setData({
            selIndex: selIndex
        })
    },


    // 显示结果
    _showResult: function () {
        var that = this;
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
            that.data.okNum++;
            right = 1;
            // 记录正确答案
            console.log('答题正确');
            setTimeout(function () {
                // 判断是否有下一道题
                if (typeof (that.data.questions[that.data.index + 1]) != 'undefined') {
                    console.log('qqqq->nextquestion')
                    that._setQuestion();
                } else if (that.data.questions.length > 0 && that.data.okNum == that.data.questions.length && that.data.answerid > 0) {
                    console.log('qqq->access')
                    // 通关
                    wx.navigateTo({
                        url: '../success/success?pid=' + that.data.qid + '&answerid=' + that.data.answerid
                    })
                }
            }, that.data.prize.answer_show_time * 1000);
        } else {
            console.log('答题错误--');
            setTimeout(function () {
                that.setData({
                    // prizelastbox: true,
                    // isendtime: true,
                    // error: false,
                    error: true
                })
                console.log('答题正确2333333333');
            }, that.data.prize.answer_show_time * 1000)
        }
        // 设置选中颜色
        console.log("设置选中颜色")
        that.data.selColor = right ? 'option-itemRight' : 'option-itemError';
        that.setData({
            selColor: that.data.selColor,
        });
        that._asyncAnswer();
    },
    // 答题结果同步至服务器
    _asyncAnswer: function (questionid, selIndex) {
        console.log("---------答题11111111111")
        var that = this;
        console.log(that.data.index + "that.data.index")
        var args = {
            answerid: that.data.answerid,
            questionid: that.data.questions[that.data.index].questionid,
            answers: that.data.selIndex
        }
        console.log(args);
        that.prizeApi.answer(args.answerid, args.questionid, args.answers, 'cb_answer');

    },
    cb_answer: function (res, opt) {
        var that = this;
        // 异常提交处理
        if (res.code) {
            wx.showToast({
                title: res.message,
                image: '/pages/images/warning.png'
            });
            that.onShow();
        }
        // that.data.okNum = res.data.ok;
        console.log(res);
    },
    //答题失败后点击按钮
    defeated: function () {
        var that = this;
        that.setData({
            prizelastbox: true,
            // isendtime: true,
            error: false,
            Istimestatus: 3
            // isstartime: false,
        })
        that.data.downRefresh = true;
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
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
        var that = this;
        console.log('下拉刷新是否请求数据-------' + that.data.downRefresh);

        if (that.data.downRefresh) {
            // 清除相关定时任务
            clearInterval(that.data.prizeInterval);
            clearInterval(that.data.timer.obj);

            // 获取最新一条有奖问答
            that.prizeApi.lastOne('cb_lastOne');
        } else {
            wx.stopPullDownRefresh();
        }
        // that.onShow()
        // that.userApi.wxlogin('cb_login');
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
        var that = this;
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '参加电动邦有奖问答，瓜分' + that.data.prizelast.money + '元',
            path: '/pages/prize/detail/detail',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    },

    onRule: function (e) {
        var that = this;
        console.log('答题规则');
        that.setData({
            maskBox: true
        })
    },

    closeMask: function (e) {
        var that = this;
        that.setData({
            maskBox: false
        })
    }

})