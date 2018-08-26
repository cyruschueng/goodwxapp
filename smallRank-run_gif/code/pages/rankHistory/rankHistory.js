//logs.js

const app = getApp()
Page({
    data: {
        list: [],
        info:{}
    },

    onLoad: function () {
        this.getList()
    },
    onShow:function () {
        var animation = wx.createAnimation({
            duration:'1000',
            timingFunction: 'linear',
            delay:'400'
        })
        animation.top(0+'rpx').step()
        this.setData({
            animationData:animation.export()
        });
    },
    goGroup:function (event) {
        console.log(event)
        let pkIdVal = event.currentTarget.id
        console.log(pkIdVal)
        wx.navigateTo({
            url: '../groupDetail/groupDetail?pkId='+pkIdVal
        })
    },
    getList:function () {
        let _this= this;
        wx.request({
            url: app.API_URL + "werun/get/PKList",
            method: "POST",
            data: {
                userId : app.getUserId(),
                rows :5,
                page : 1
            },
            success: function (data) {
                console.log(data.data.data);
                _this.setData({
                    list: data.data.data
                })
            }
        })
    }
})
