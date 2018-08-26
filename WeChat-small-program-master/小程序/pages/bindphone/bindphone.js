//获取应用实例
var app = getApp();
var phoneareanum = require('../../utils/phoneareanum');
Page({
    data: {
        phone: '',
        smscode: '',
        code: true,
        sms_code: true,
        getmsg: '获取短信验证码',
        submit: true,
        options: [],
        telephone: '+86',
        gohome:false,
        areacode:'',
    },
    onShow:function () {
        var that = this;
        console.log(that.data.gohome,'这个gohome')
        if(that.data.gohome){
           /* wx.redirectTo({
                url: '../index/index'
            })*/
            wx.navigateTo({
                url:'../index/index'
            })
        }
    },
    onLoad: function (opt) {
        var that = this;
        var data = phoneareanum.phoneareanum, length = data.length, temarr = [];
        for (var i = 0; i < length; i++) {
            /* temarr.push({
                 name:data[i].num + ' ' + data[i].name.cn
             })*/
            temarr.push('+' + data[i].num + ' ' + data[i].name.cn,)
        }
        that.setData({
            options: temarr,
            telephone: '+86'
        });
        /* wx.redirectTo({
             url: '../index/index'
         })*/
    },
    bindPickerChange: function (e) {
        var ins = this.data.options[e.detail.value].split(' ')[0]; //取到的是索引在赋值一下
        this.setData({
            telephone: ins
        })
    },
    /**
     * 监听手机号输入
     */
    listenerPhoneInput: function (e) {
        this.data.phone = e.detail.value;
        var that = this;
        var regPhone = /^(13[0-9]|14[579]|15[0-9]|17[0-9]|18[0-9])+\d{8}$/;
        if (this.data.sms_code) {
            if (this.data.phone.length >= 11 && regPhone.test(this.data.phone)) { //手机号合法
                that.setData({
                    code: false,
                });
                if (this.data.smscode.length >= 4) { //验证码不为空
                    that.setData({
                        submit: false,
                    });
                }
            } else {
                that.setData({
                    code: true,
                })
            }
        }
    },

    /**
     * 监听验证码输入
     */
    listenerPasswordInput: function (e) {
        this.data.smscode = e.detail.value;
        var that = this;
        if (this.data.smscode.length >= 4 && this.data.phone.length >= 11) {
            that.setData({
                submit: false,
            });
        } else {
            that.setData({
                submit: true,
            });
        }
    },
    click_code: function () {
        var that = this;
        var data = {
            telephone:this.data.phone,
            action:'reg',
            areacode:86
        };
        wx.request({
            url: 'https://dev.classchimp.cn/api/ucpaas/sendcode',
            method: 'POST',
            data:data,
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log(res)
            }
        });




        var timer = 0;
        that.setData({
            getmsg: "60s后重新发送",
        })
        if (timer == 0) {
            var time = 5;
            var inter = setInterval(function () {
                that.setData({
                    sms_code: false,
                    getmsg: time + "s后重新发送",
                });
                time--;
                if (time < 0) {
                    timer = 1;
                    clearInterval(inter);
                    console.log(that.data.phone.length, '多少');
                    if (that.data.phone.length >= 11) {
                        that.setData({
                            sms_code: true,
                            code: false,
                        })
                    } else {
                        that.setData({
                            code: true,
                            sms_code: true
                        })
                    }

                }
            }, 1000)
        }
    },
    bind_submit: function () {
        wx.navigateTo({
            url: '../login/login?login=' + 1
        })
    },

});
