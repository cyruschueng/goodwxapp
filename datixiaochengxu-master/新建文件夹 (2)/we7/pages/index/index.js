var app = getApp();
Page({
    data: {
        navs: [],
        slide: [],
        commend: [],
        userInfo: {}
    },
    onLoad: function e() {
        var a = this;
        app.util.footer(a);
        app.util.request({
            url: "wxapp/home/nav",
            cachetime: "30",
            success: function e(s) {
                if (!s.data.message.errno) {
                    console.log(s.data.message.message);
                    a.setData({
                        navs: s.data.message.message
                    })
                }
            }
        });
        app.util.request({
            url: "wxapp/home/slide",
            cachetime: "30",
            success: function e(s) {
                if (!s.data.message.errno) {
                    a.setData({
                        slide: s.data.message.message
                    })
                }
            }
        });
        app.util.request({
            url: "wxapp/home/commend",
            cachetime: "30",
            success: function e(s) {
                if (!s.data.message.errno) {
                    a.setData({
                        commend: s.data.message.message
                    })
                }
            }
        })
    }
});