var couponData = require('../../data/coupon.js')

Page({
    data:{
        color:'',
        backgroundColor:'',
        text:'立即领取',
        price:'',
        title:'',
        date:'',
        cuponPrice:'',
        bigImgSrc:''
    },
    getSuccess:function(event){

    },
    onLoad:function (option) {
        console.log(option.bigImgSrc)
        this.setData({
            price:option.price,
            title:option.title,
            date:option.date,
            cuponPrice:option.cuponPrice,
            bigImgSrc:option.bigImgSrc
        })
    },
    openConfirm: function () {
        var that = this
        console.log(that.data.bigImgSrc+'ddd')

        this.setData({
            color:'',
            text:'领取成功',
            backgroundColor:'#eeeeee'
        })
        wx.showToast({
            title: '领取成功',
            icon: 'loading',
            duration: 3000,
            'success': function () {
                setTimeout(function () {
                    wx.navigateTo({
                        url: '../coupon_center/coupon_center?bigImgSrc='+that.data.bigImgSrc
                    })
                },2000)
            }
        });
        wx.login({
            success: function (res) {
                var service_url = 'https://???/???/weixin/api/login?code=' + res.code;//需要将服务器域名添加到小程序的request合法域名中，而且必须是https开头
                wx.request({
                    url: service_url,
                    data: {},
                    method: 'GET',
                    success: function (res) {
                        console.log(res);
                        if (res.data != null && res.data != undefined && res.data != '') {
                            wx.setStorageSync("openid", res.data.openid);//将获取的openid存到缓存中
                        }
                    }
                });
            }
        });

        var that = this;
        var service_url = 'https://???/???/weixin/api/getCardSign?cardId=' + cardId;//需要将服务器域名添加到小程序的request合法域名中，而且必须是https开头
        wx.request({
            url: service_url,
            data: {},
            method: 'GET',
            success: function (res) {
                console.log(res);
                wx.addCard({
                    cardList: [{
                        cardId: that.data.cardId,
                        cardExt: '{"code":"","openid":"","timestamp":' + res.data.timestamp + ',"nonce_str":"' + res.data.nonceStr + '","signature":"' + res.data.signature + '"}'
                    }],//这里需要注意的是cardExt参数的value值是 String类型，不要使用对象发送；另外openid如果在创建优惠券的时候没有指定，则这边为空，千万不要填写当前用户的openid
                    success: function (result) {
                        console.log(res);

                        wx.showToast({
                            title: '领取成功',
                            icon: 'success',
                            duration: 2000,
                            'success': function () {
                                setTimeout(function () {
                                    wx.navigateTo({
                                        url: '../coupon_center/coupon_center?bigImgSrc='+that.data.bigImgSrc
                                    })
                                },2000)
                            }
                        });
                    },
                    fail: function (res) {
                        console.log('领取失败');
                        console.log(res);
                    }
                })

            }
        });

        // wx.showModal({
        //     title: '车蛛网',
        //     content: '请关注车蛛网公众号',
        //     confirmText: "关注使用",
        //     cancelText: "取消使用",
        //     success: function (res) {
        //         console.log(res);
        //         if (res.confirm) {
        //             wx.showToast({
        //                 title: '关注成功',
        //                 icon: 'success',
        //                 duration: 3100
        //             });
        //         }else{
        //             console.log('用户点击辅助操作')
        //         }
        //     }
        // });
    }
})