//index.js
//获取应用实例
var app = getApp()
var utils = require('../../utils/util.js')
var api = require('../../api.js')

Page({
    data: {
        detail:{}
    },
    onLoad: function (options) {
        this.data.detail = utils.getDetail()
        console.log(this.data.detail)
        if(utils.isEmptyObject(this.data.detail.likes)){this.data.detail.likes = '';}
        this.setData({
            detail:this.data.detail
        })
    },
    formSubmit: function (e) {
        utils.saveDetail(this.data.detail)
        wx.navigateBack();
    },
    bindLikes:function(e){
        console.log(e)
        this.data.detail.likes = e.detail.value
        utils.saveDetail(this.data.detail)
    },
    random:function () {
        var  that = this
        wx.showNavigationBarLoading();
        wx.showToast({
            title: 'Loading……',
            duration:2000,
            icon: 'loading'
        })
        api.random(function(res) {
            if(utils.endWith(that.data.detail.likes,',') || !that.data.detail.likes){
                that.data.detail.likes += res.user.name
            }else{
                that.data.detail.likes += ','+res.user.name
            }

            that.setData({
                detail: that.data.detail
            })
            wx.hideToast()
            wx.hideNavigationBarLoading();
        });
    }
})
