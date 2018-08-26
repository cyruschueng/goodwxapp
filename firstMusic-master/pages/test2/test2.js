// pages/test2/test2.js
const ctx = wx.createCanvasContext('myCanvas');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        canvas_hidden: true,//canvas的隐藏与否
        stars_timer: null,//定时器对象
        stars: [],//所有的星星对象
    },
    createStars: function (num) {//创建num个星星对象
        var that = this;
        var num = num || 1;
        var x, y, g, vy, w, h;
        for (let i = 0; i < num; i++) {
            x = that.data.windowWidth * Math.random();
            y = -300 * Math.random();
            g = (Math.floor((Math.random() * 10) + 1)) * 0.5;
            vy = Math.floor((Math.random() * 10) + 1);
            var rate = Math.random() * 0.3 + 0.3;
            w = 62 * rate;
            h = 60 * rate;

            that.data.stars[i] = { x: x, y: y, g: g, vy: vy, w: w, h: h };
        }
    },
    runStars: function (arrLength) {
        var that = this;
        ctx.clearRect(0, 0, that.data.windowWidth, that.data.windowHeight);//清除画布内容
        for (let i = 0; i < arrLength; i++) {
            ctx.drawImage('../img/lb_a_21.png', that.data.stars[i].x, that.data.stars[i].y, that.data.stars[i].w, that.data.stars[i].h);//定义下一帧时每个星星的位置
        }
        ctx.draw();//一次性描绘
        for (let i = 0; i < arrLength; i++) {//运动计算（向量）
            that.data.stars[i].vy += that.data.stars[i].g;
            that.data.stars[i].y += that.data.stars[i].vy;
            // if (that.data.stars[i].y >= that.data.windowHeight - that.data.stars[i].h){
            //     that.data.stars[i].y = that.data.windowHeight - that.data.stars[i].h;
            //     that.data.stars[i].vy = -0.6*that.data.stars[i].vy;
            // }
        }
    },
    startAnimation:function(){//开始动画
        var that = this;
        var arrLength = 20;//定义星星个数
        that.createStars(arrLength);
        that.setData({
            canvas_hidden: false,
        });
        that.data.stars_timer = setInterval(function () {
            that.runStars(arrLength);
        }, 50);
        setTimeout(function(){//由于小程序中canvas的层级最高，所以必须在某时刻自动结束动画
            that.stopAnimation();
        },2000);
    },
    stopAnimation:function(){//结束动画
        var that = this;
        that.setData({
            canvas_hidden: true,
        });
        that.data.stars.length = 0;
        clearInterval(that.data.stars_timer);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.getSystemInfo({//获取对应手机屏幕的宽与高
            success: function (res) {
                that.setData({
                    windowWidth: res.windowWidth,
                    windowHeight: res.windowHeight,
                });
            }
        });
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

    }
})