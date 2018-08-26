//获取应用实例

var app = getApp();
Page({
    data: {
        userInfo: {},
        openid: "",
        question: "",
        questionArr: [],
        answerArr: { text: "Hello，我是您的私人助手，需要我为您做些什么呢？", code: 100000 },
        Arr: [],
        windowHeight: 600,
        domHeight: 0,
        scrollHeight: 0,
        flag: false,
        disabled: true,
        focus:false,
    },
    onLoad: function() {
        var that = this
            //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo, openid) {
            //更新数据
            that.setData({
                userInfo: userInfo,
                openid: openid
            })
        });

        that.data.Arr.push(that.data.answerArr);
        that.setData({ Arr: that.data.Arr });

        wx.getSystemInfo({
            success: function(res) {
                that.setData({ windowHeight: res.windowHeight });
            }
        })

    },
    askquestion: function(e) {
        var that = this;
        var currHeight = 0;
        var text = e.detail.value;
        this.setData({
            question: text
        });
        if (text.length) {
            this.setData({
                disabled: false
            })
        } else {
            this.setData({
                disabled: true
            })
        }
        if (!this.data.question) return;
    },
    scrollSet: function(e) {
        if (e.detail.deltaY > 0) { //向上滚动
        } else { //向下滚动
            if (this.data.flag) { //如果是输入造成的滚动就set,如果是手动就不作处理
                this.setData({
                    scrollHeight: e.detail.scrollHeight,
                    domHeight: e.detail.scrollHeight,
                    flag: false
                })
            }
        }
    },
    bindfocus: function(e) {
        this.setData({
            domHeight: this.data.scrollHeight,
        })
    },
    submitques: function() {
        var that = this;
        var currHeight = 0;
        var ques = this.data.question;
        var map = {
            code: -1, //用来区别q&a
            text: this.data.question,
        }
        that.data.Arr.push(map);
        if (that.data.scrollHeight == 0) {
            currHeight = that.data.domHeight + 250;
        } else {
            currHeight = that.data.scrollHeight;
        }

        that.setData({
            Arr: that.data.Arr,
            question: "",
            domHeight: currHeight,
            flag: true,
            disabled: true,
        });
        setTimeout(function() { //目的是为了触发滚动
            that.setData({
                domHeight: currHeight,
                flag: true,
            });
        }, 0)


        wx.request({
            url: 'https://api.h6vr.com/bot_ty/get_from_bot',
            data: {
                msg: ques,
                
            },
            method: 'get',
            
            success: function(res) {
                console.log(res)
                var answer={
                    text:res.data,
                    code:100000
                }
               
                    console.log(answer.text);
                
                if (answer.code == 100000) {
                    that.data.Arr.push(answer);

                    if (that.data.scrollHeight == 0) {
                        currHeight = that.data.domHeight + 200;
                    } else {
                        currHeight = that.data.scrollHeight;
                    }

                    that.setData({
                        Arr: that.data.Arr,
                        domHeight: currHeight,
                        flag: true
                    });
                    setTimeout(function() { //目的是为了触发滚动
                        that.setData({
                            domHeight: currHeight + 20,
                            flag: true,
                        });
                    }, 0)
                } else {}

            }
        })
    },

    onShareAppMessage: function() {
        return {
            title: '【不懂？就问智能助手吧】',
            desc: '',
            path: 'pages/helper/helper'
        }
    }
})