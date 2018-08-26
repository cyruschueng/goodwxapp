// pages/question_index.js
import util from "../../../utils/util"
import { prizeApi } from '../../../utils/api/prizeApi.js';
let app = getApp();//获取应用实例
Page({

    /**
     * 页面的初始数据
     */
    data: {
        prizelast: '',
        //倒计时答题状态：未开始:Istimestatus=1,10s倒计时:Istimestatus=2,进行中:Istimestatus=3,结束:Istimestatus=-1,
        Istimestatus: 99,
        //问答详情定时器
        prizeInterval: '',
        //闯关答题状态：未布置:IsPasstatus=0,未开始:IsPasstatus=1,无答题机会:IsPasstatus=2,有答题机会:IsPasstatus=3,结束:IsPasstatus=-1,
        IsPasstatus: 2,
        //闯关答题:Isrecordto=1,我的战绩:Isrecordto=2
        Isrecordto: 1,
        //奖金状态:不可提现:Isextract=1,可提现:Isextract=2,处理中:Isextract=3
        Isextract: 1,
        //弹窗状态：分享:Ispopup=1,倒计时3s:Ispopup=2;
        Ispopup: 0,
        isjoinval:'',
        // 定时任务变量,num倒计时描述，obj定时任务
        starttimer: {
            num:3,
            obj: ''
        },

    },
    /** 
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        that.prizeApi = new prizeApi(that);
        that.prizeApi.lastOne('cb_lastOne');
        that.prizeApi.reallast('cb_reallast');
    },
    cb_lastOne: function (res, opt) {
        let that = this;
        if (res.code == 0) {
            that.data.prizelast = res.data;
            that.setData({
                prizelast: that.data.prizelast,
            })
            let now_time = app.time();
            let timestamp = that.data.prizelast.start_time;
            let end_time = that.data.prizelast.end_time;
            //测试时间
            // timestamp = now_time + 13;
            // end_time = timestamp + 10000;
            console.log(now_time + "+" + timestamp + "+" + end_time)
            if (now_time > end_time && end_time > 0) {
                //活动已结束
                that.setData({
                    Istimestatus: -1
                })
            } else {
                //活动未结束
                let downTime = util.downTimer(timestamp, app.time());
                console.log("倒计时", util.downTimer(timestamp, app.time()))
                that.setData({
                    Istimestatus: 1,
                    downTime: downTime,
                });
                clearInterval(that.data.prizeInterval)
                if (downTime.ntime >= 0) {
                    //活动即将进行
                    that.data.prizeInterval = setInterval(function () {
                        let downTime = util.downTimer(timestamp, app.time());
                        let Istimestatus = 1;
                        that.setData({
                            downTime: downTime,
                        });
                        if (downTime.ntime > 0 && downTime.ntime < 11) {
                            Istimestatus = 2;
                        } else if (downTime.ntime == 0) {
                            Istimestatus = 3;
                            clearInterval(that.data.prizeInterval)
                        }
                        that.setData({
                            downTime: downTime,
                            Istimestatus: Istimestatus
                        });
                    }, 1000)
                } else {
                    //活动正在进行
                    that.setData({
                        Istimestatus: 3
                    })
                }

            }
        }
    },
    cb_reallast: function (res, opt) {
        let that = this;
        if (res.code == 0) {
            that.data.prizelast = res.data;
            that.setData({
                prizelast: that.data.prizelast,
            })
        }
    },
    myrecord: function () {
        //点击我的战绩
        let that = this;
        that.setData({
            Isrecordto: 2
        })
    },
    passanswer: function () {
        //点击闯关答题
        let that = this;
        that.setData({
            Isrecordto: 1
        })
    },
    /**
     * 点击开始闯关答题按钮
     */
    startwork: function () {
        let that = this;
        that.prizeApi.isjoin('123', 'cb_isjoin');
    },
    cb_isjoin: function (res, opt) {
        let that = this;
        if (res.code == 0) {
            that.data.isjoinval = res.data;
            if (that.data.isjoinval.remain_user_answers_count > 0) {
                that.setData({
                    Ispopup: 2,
                    down_time: that.data.starttimer.num
                })
                // 开始计时
                that.data.starttimer.obj = setInterval(function () {
                    that._starttimer();
                }, 1000);
            } else {
                that.setData({
                    isjoinval: that.data.isjoinval,
                    Ispopup: 1
                })
            }
        }
    },
    closepopup: function () {
        let that = this;
        that.setData({
            Ispopup: 0
        })
    },
    // 答题计时down_time
    _starttimer: function (num) {
        var that = this;
        that.data.starttimer.num--;
        if (!that.data.starttimer.num && that.data.starttimer.num==0) {
            // 计时结束,清除定时任务
            clearInterval(that.data.starttimer.obj);
            that.setData({
                Ispopup: 0
            })
        }else{
            // 倒计时
            that.setData({
                down_time: that.data.starttimer.num
            });
        }
       
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