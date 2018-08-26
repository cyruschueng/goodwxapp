//test.js
//获取应用实例
var app = getApp()
Page({
    data: {
        minute:'10 分钟',
        timers:[]
    },
    onLoad: function () {
        var that =this;
        var ary =[];
        var timer=[5,10,15,20,25,30,35,40,45,50,55,60];
        timer.map(function (item) {
            ary.push(item +' 分钟')
        });
        that.setData({
            timers:ary
        });
    },
    switchChange: function (e){
        console.log('switch 发生 change 事件，携带值为', e.detail.value)
    },
    bindPickerChange:function (e) {
        var minute = this.data.timers[e.detail.value]; //取到的是索引在赋值一下
        this.setData({
            minute: minute
        })
    }
});
