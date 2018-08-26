import * as api from './api'
import * as utils from '../../utils/util'

var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        cmsgIsShow: false,
        cmsgValue: '',
        isHideAddress: true,
        isHideSmzq: false,
        isHideKdwl: true,
        nameValue: '',
        phoneValue: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        //getType 
        //1.快递物流
        //2.上门自取

        console.log(' 物流领取options： ', options);

        var { entityId, title, address, phone, getType, entityName, advertiserName, advertiserIcon, entityIcon } = JSON.parse(options.data);

        // var getType = 2;

        if (getType == 1) {
            this.setData({
                isHideSmzq: true,
                isHideKdwl: false
            });
        }
        if (getType == 2) {
            this.setData({
                isHideSmzq: false,
                isHideKdwl: true
            });
        }


        this.setData({ entityId, title, oAddress: address, oPhone: phone, getType, entityName, advertiserName, advertiserIcon, entityIcon });

        // console.log('options:', this.options);
        // console.log('this.data:', this.data);

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    selectSmzq() {
        this.setData({
            isHideAddress: true,
            isHideSmzq: false,
            isHideKdwl: true
        })
    },
    selectKdwl() {
        this.setData({
            isHideSmzq: true,
            isHideKdwl: false
        });

        if (this.data.address) {
            this.setData({
                isHideAddress: false
            })
        }

    },
    submitSmzq() {
        var { nameValue, phoneValue, entityId, entityName, advertiserName, advertiserIcon, entityIcon, oPhone, oAddress } = this.data;

        if (!nameValue.trim()) {
            this.showCmsg('姓名不能为空！');
            return;
        }

        if (nameValue.trim().length < 2) {
            this.showCmsg('姓名最少2个字符!');
            return;
        }

        if (nameValue.trim().length > 12) {
            this.showCmsg('姓名最多12个字符！');
            return;
        }

        if (!phoneValue.trim()) {
            this.showCmsg('手机号不能为空！');
            return;
        }

        if (phoneValue.trim().length != 11) {
            this.showCmsg('手机号不正确！');
            return;
        }

        if (this.isSmzq) {
            return;
        }
        this.isSmzq = true;

        //提交信息
        app.getWatermark((watermark) => {
            api.inputLotteryAddress(watermark, 2, entityId, nameValue.trim(), phoneValue.trim(), '',
                (res) => {

                    this.isSmzq = false;

                    if (res) {
                        if (res.errCode == 0) {
                            var data = JSON.stringify({
                                entityName,
                                advertiserName,
                                advertiserIcon,
                                entityIcon,
                                oAddress,
                                oPhone,
                                code: res.data
                            });

                            wx.redirectTo({
                                url: `/pages/myPrizeCode/index?data=${data}`
                            });
                        }
                    }
                });
        });
    },
    submitKdwl() {

        var { userName, telNumbel, address, entityId } = this.data;

        if (address) {

            if (this.isKdwl) {
                return;
            }
            this.isKdwl = true;

            app.getWatermark((watermark) => {
                api.inputLotteryAddress(watermark, 1, entityId, userName, telNumbel, address,
                    (res) => {

                        this.isKdwl = false;

                        if (res) {
                            if (res.errCode == 0) {
                                wx.showModal({
                                    showCancel: false,
                                    title: '提交成功',
                                    content: '栏目组发货后您将会收到物流服务通知',
                                    success: (res) => {
                                        wx.navigateBack({
                                            delta: 2
                                        });
                                    }
                                })
                            }
                        }
                    });
            });
        }
    },
    getNameValue(e) {
        var { value } = e.detail;
        this.setData({
            nameValue: value
        });
    },
    getPhoneValue(e) {
        var { value } = e.detail;
        this.setData({
            phoneValue: value
        });
    },
    getAddress() {
        utils.wxAddress((res) => {
            this.setData({
                isHideAddress: false,
                userName: res.userName,
                telNumbel: res.telNumber,
                address: res.provinceName + res.cityName + res.countyName + res.detailInfo
            });
        });
    },
    showCmsg(value) {
        this.setData({
            cmsgValue: value
        });
        this.timer = setTimeout(() => {
            this.timer && clearTimeout(this.timer);
            this.timer = null;
            this.setData({
                cmsgValue: ''
            });
        }, 2000);
    }
})