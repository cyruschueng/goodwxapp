var couponData = require('../../data/coupon.js')
console.log(couponData)

Page({
    data: {
        message: 'kjhkljghj',
    },
    onTap: function (event) {
        console.log(event)
        wx.navigateTo({
            url: '../coupon_detail/coupon_detail?id=1'
        })
    },
    onLoad: function () {
        this.setData({
            message: 'aaaaaafdsfasdfa',
            postList: couponData.postList
        })
    },
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '免费领取优惠券',
            path: '/pages/coupon/coupon?id=123',
            imageUrl: '/pages/images/poster/springFestival.jpg',
            success: function (res) {
                // 转发成功
                console.log(res)
            },
            fail: function (res) {
                // 转发失败
            }
        }
    },

})