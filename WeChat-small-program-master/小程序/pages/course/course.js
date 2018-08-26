//test.js
//获取应用实例
var app = getApp()
Page({
    data: {
        id: '',
        coursetypename: '',
        courseInfo: {},
        winWidth: 0,
        winHeight: 0,
        // tab切换
        currentTab: 0,
        lessons: [],
        clientHeight: 0,
        lengthPx: 100,
        fixedHeight:0,
        navbar: ['课程概览', '课时列表'],
        class_info:true,
        lessons_li:true,
    },
    onLoad: function (options) {
        var that = this;
        // 页面初始化 options为页面跳转所带来的参数
        this.setData({
            id: options.id,
            coursetypename: options.coursetypename,
        });
        // 获取系统信息
        wx.getSystemInfo({
           success:function (res) {
               that.setData({
                   fixedHeight:res.windowHeight
               })
           }
        });
        // 获取课程详情
        wx.request({
            url: 'https://dev.classchimp.cn/api/product/' + options.id,
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                that.setData({
                    courseInfo: res.data.data,
                    lessons: res.data.data.lessons
                });
                var length = res.data.data.lessons.length;
                if (length ==0 ) {
                    that.setData({
                        lessons_li: false
                    })
                }else{
                    that.setData({
                        lessons_li: false
                    })
                }
                if(res.data.data){
                    that.setData({
                        class_info: false
                    })
                }else{
                    that.setData({
                        class_info: false
                    })
                }
            }
        });
    },
    navbarTap: function(e){
        this.setData({
            currentTab: e.currentTarget.dataset.idx
        })
        console.log( e.currentTarget.dataset.idx,'点击')
    },
   /* //滑动切换
    swiperTab: function (e) {
        var that = this;
        that.setData({
            currentTab: e.detail.current
        });
    },
    //点击切换
    clickTab: function (e) {
        var that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
    }*/
});
