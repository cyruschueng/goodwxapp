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
        //未开始1、10s倒计时2、进行中3、结束-1
        Istimestatus: 99,
        //问答详情定时器
        prizeInterval: ''
    },
    /** 
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        that.prizeApi = new prizeApi(that);
        that.prizeApi.lastOne('cb_lastOne');
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
            timestamp = now_time + 13;
            end_time = timestamp + 10000;
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
    // cb_lastOne: function (res, opt) {
    //     var that = this;
    //     if (res.code == 0) {
    //         that.data.prizelast = res.data;
    //         that.setData({
    //             prizelast: that.data.prizelast,
    //             timer: timer,
    //         })
    //         // var timestamp = that.data.prizelast.start_time
    //         var timestamp = 1521099019;
    //         var timer = util.downTimer(timestamp);
    //         if (timer.ntime > 0) {
    //             var intervalId = setInterval(function () {
    //                 var timer = util.downTimer(timestamp);

    //                 timestamp = timestamp--;
    //                 that.setData({
    //                     isstartime: true,
    //                     timer: timer,
    //                 })
    //                 if (timer.day == 0 && timer.hour == 0 && timer.minute == 0 && timer.second == 10) {
    //                     //倒计时10秒
    //                     that.setData({
    //                         istentime: true,
    //                     })
    //                 } else if (timer.day == 0 && timer.hour == 0 && timer.minute == 0 && timer.second == 1) {
    //                     //倒计时0秒  开始做题
    //                     console.log("1111111")
    //                     clearInterval(intervalId);
    //                 }
    //             }, 1000)
    //         } else {
    //             console.log("datizhong")
    //             that.setData({
    //                 isendtime: true
    //             })
    //         }





    //     }


    // },

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