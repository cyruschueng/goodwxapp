//index.js
//获取应用实例
var app = getApp()
var utils = require('../../utils/util.js')
var timeArr
var timeIndex = 0
var detail = {}
var index

Page({
    data: {
    },
    onLoad: function (options) {
        detail = utils.getDetail()

        index = wx.getStorageSync('current_comment_index')
        if(utils.isEmptyObject(detail.comments)){detail.comments = [];}
        if(!index){index = 0;}

        timeArr = [(index+1)+'分钟前','1小时前','昨天','5天前','2016年5月1日 10:00']

        if(utils.isEmptyObject(detail.comments[index])){detail.comments[index] = {};}
        if(!detail.comments[index].time){detail.comments[index].time = timeArr[0];}
        this.setData({
            detail:detail,
            index:index
        })
    },
    formSubmit: function (e) {
        var time = e.detail.value.time;
        detail.comments[index].time = time
        //wx.setStorageSync("detail", detail)
        utils.saveDetail(detail)
        wx.navigateBack();
    },
    changeTime:function () {
        if(timeIndex==(timeArr.length-1)){
            timeIndex = 0
        }else{
            timeIndex++
        }

        if(timeArr[timeIndex] == detail.comments[index].time){
            if(timeIndex==(timeArr.length-1)){
                timeIndex = 0
            }else{
                timeIndex++
            }
        }

        detail.comments[index].time = timeArr[timeIndex]
        this.setData({
            detail: detail
        })
    }
})
