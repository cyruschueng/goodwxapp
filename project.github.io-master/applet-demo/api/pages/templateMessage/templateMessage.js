// pages/templateMessage/templateMessage.js
var config = require("../../utils/config.js");
var app =  getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

    },

    /**
     * 表单提交
     */
    formSubmit: function (e) {
        console.log(e);
        let formId = e.detail.formId;
        //获取access_token
        let promise1 = new Promise(function(resolve, reject){
            wx.request({
                url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appid}&secret=${config.secret}`,
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function(res) {
                    console.log(res.data);
                    resolve(res);
                }
            })
        }).then(function(res){
            let access_token = res.data.access_token;
            //获取小程序模板库标题列表
            wx.request({
                url:`https://api.weixin.qq.com/cgi-bin/wxopen/template/library/list?access_token=${access_token}`,
                method:'POST',
                data:{
                    "access_token" : access_token,
                    "offset" : 0,
                    "count" : 20
                },
                success:function (res) {
                    console.log(res);
                }
            });
            //获取模板库某个模板标题下关键词库
            wx.request({
                url:`https://api.weixin.qq.com/cgi-bin/wxopen/template/library/get?access_token=${access_token}`,
                method:'POST',
                data:{
                    "id" : "AT0243"
                },
                success:function (res) {
                    console.log(res);
                }
            });
            //组合模板并添加至帐号下的个人模板库
            wx.request({
                url:`https://api.weixin.qq.com/cgi-bin/wxopen/template/add?access_token=${access_token}`,
                method:'POST',
                data:{
                    "access_token" : access_token,
                    "id" : "AT0243",
                    "keyword_id_list" : [1,2,7]
                },
                success:function (res) {
                    console.log(res);
                }
            });
            //获取帐号下已存在的模板列表
            wx.request({
                url:`https://api.weixin.qq.com/cgi-bin/wxopen/template/list?access_token=${access_token}`,
                method:'POST',
                data:{
                    "access_token" : access_token,
                    "offset" : 0,
                    "count" : 4
                },
                success:function (res) {
                    console.log(res);
                }
            });
            // 发送模板消息
            var openid = app.globalData.openid;
            wx.request({
                url:`https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=${access_token}`,
                method:'POST',
                data:{
                    "touser": openid,
                    "template_id": "27l1X_GDQWbrYnAavvoplFsB01hLHna0vSfauu7ntws",
                    "page": "pages/index/index",
                    "form_id": formId,
                    "data": {
                        "keyword1": {
                            "value": "339208499",
                            "color": "#173177"
                        },
                        "keyword2": {
                            "value": "2018年01月01日 12:30",
                            "color": "#173177"
                        },
                        "keyword3": {
                            "value": "深圳市南山区科技园",
                            "color": "#173177"
                        } ,
                        "keyword4": {
                            "value": "软件产业基地",
                            "color": "#173177"
                        }
                    },
                    "emphasis_keyword": "keyword1.DATA"
                },
                success:function (res) {
                    console.log(res);
                }
            });
        });
    }

})