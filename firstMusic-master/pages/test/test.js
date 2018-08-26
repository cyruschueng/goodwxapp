// pages/mainPage/mainPage.js
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        page_hide: '',
        stars_src: 'http://ovhvevt35.bkt.clouddn.com/music/lb_a_21.png',
        img_mode: 'aspectFit',
        stars: [
            { left: 0, top: 0, width: 81, height: 77 },
            { left: 83, top: 0, width: 52, height: 50 },
            { left: 137, top: 0, width: 63, height: 60 },
            { left: 202, top: 0, width: 42, height: 40 },
            { left: 246, top: 0, width: 73, height: 70 },
            { left: 321, top: 0, width: 68, height: 65 },
            { left: 391, top: 0, width: 52, height: 50 },
            { left: 445, top: 0, width: 84, height: 80 },
            { left: 531, top: 0, width: 47, height: 45 },
            { left: 580, top: 0, width: 71, height: 68 },
            { left: 653, top: 0, width: 57, height: 55 },
            { left: 712, top: 0, width: 42, height: 40 },
        ],
    },
    starsRun: function(){
        var that = this;
        function Stars(index) {
            this.x = that.data.stars[index].left;
            this.y = that.data.stars[index].top;
            this.a = 200;
            this.t = 80;
            this.run = function () {
                var self = this;
                var timerBall = setInterval(function () {
                    if (self.y <= 3000) {
                        self.y += self.a * self.t * self.t * 0.000001;
                        self.t += 50;
                        that.data.stars[index].left = self.x;
                        that.data.stars[index].top = self.y;
                        that.setData({
                            stars: that.data.stars,
                        });
                    } else {
                        clearInterval(timerBall);
                        that.starsStop();
                    }
                }, self.t);
            }
        }
        var stars = [];
        for (var i = 0; i < that.data.stars.length; i++) {
            (function (i) {
                stars[i] = new Stars(i);
                setTimeout(function () {
                    stars[i].run();
                }, 100 * Math.floor((Math.random() * 10) + 1));
            })(i);
        }
    },
    starsStop: function(){
        var that = this;
        for (let i = 0; i < that.data.stars.length; i++){
            that.data.stars[i].top = 0;
        }
        that.setData({
            page_hide: 'hidden',
            stars: that.data.stars,
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        that.starsRun();
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
    onShareAppMessage: function (res) {
    }
})