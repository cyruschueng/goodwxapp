// pages/errand/lotteryDraw/lotteryDraw.js
import requestUtil from '../../../../utils/requestUtil.js';
import util from '../../../../utils/util.js';
import _ from '../../../../utils/underscore';
const _DuoguanData = require('../../../../utils/data');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        this_id: 0,
        this_market_data: null,
        this_jiangpin_data: null,
        nam: 1800,
        animationData: {
            duration: 3000,
            timingFunction: 'linear',
            rotate: 0
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.hideShareMenu();

        var this_id = options.id || 0;
        this.setData({ this_id: this_id });
        this.onPullDownRefresh();
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php/addon/MarketingLuckDraw/Api/getMarketInfo', { id: this.data.this_id }, (info) => {
            console.log(info)
            this.setData({ this_market_data: info, this_jiangpin_data: info.jiangpin_data });
            wx.setNavigationBarTitle({ title: info.title });
            wx.showShareMenu();
        }, this, {
                error: (code, msg) => {
                    if (code == 404) {
                        wx.showModal({
                            title: '温馨提示',
                            content: msg,
                            showCancel: false,
                            success: function (res) {
                                wx.navigateBack();
                            },
                        });
                        return false;
                    }
                },
                isShowLoading: true,
                completeAfter: wx.stopPullDownRefresh
            });

        const url = _DuoguanData.duoguan_host_api_url + '/index.php/addon/MarketingLuckDraw/Api/getLuckDrawLog';
        requestUtil.get(url, { id: this.data.this_id, _r: 10, }, (data) => {
            this.setData({ luck_user_log: data });
        });
    },

    /**
     * 跳转页面
     */
    onNavigateTap: function (e) {
        const dataset = e.detail.target ? e.detail.target.dataset : e.currentTarget.dataset;
        const url = dataset.url, type = dataset.type, nav = { url: url };
        if (dataset.invalid) return;

        if (e.detail.formId) requestUtil.pushFormId(e.detail.formId);
        if ("switch" == type) {
            nav.fail = function () {
                wx.navigateTo({ url: url });
            };
            wx.switchTab(nav);
        } else {
            wx.navigateTo(nav);
        }
    },

    /**
     * 开始转到
     */
    onStartTap: function () {
        util.trySyncUserInfo();
        this.onStartRequest();
    },

    onStartRequest: function () {
        if (requestUtil.isLoading(this.startRQID)) return;

        //复原
        if (this.data.animationData.rotate != 0) {
            this.setData({
                animationData: {
                    duration: 0,
                    timingFunction: 'linear',
                    rotate: 0
                }
            });
        }

        let rotate = 0, isStop = false, speed = 1080, prize = '', prizeImg = '', is_kongjiang = true, isFail = true, failMsg = '';
        const animationHandler = function () {
            rotate += speed;
            if (isStop) {
                this.setData({
                    animationData: {
                        duration: isFail ? 0 : 2000,
                        timingFunction: isFail ? 'linear' : 'ease-out',
                        rotate: isFail ? 0 : rotate
                    }
                });

                if (isFail) {
                    this.setData({ isRequestFail: true, failMsg: failMsg });
                } else {
                    setTimeout(() => {
                        this.setData({
                            isRequestFail: isFail ? true : (is_kongjiang ? true : false),
                            is_kongjiang: is_kongjiang, failMsg: failMsg,
                            prize: prize, prizeImg: prizeImg,
                            this_market_data: this.data.this_market_data
                        });
                    }, 2500);
                }
            } else {
                this.setData({
                    animationData: {
                        duration: 2000,
                        timingFunction: 'linear',
                        rotate: rotate
                    }
                });
                setTimeout(animationHandler.bind(this), 2000);
            }
        };
        animationHandler.bind(this).call();

        const url = _DuoguanData.duoguan_host_api_url + '/index.php/addon/MarketingLuckDraw/Api/makeLottery';
        this.startRQID = requestUtil.get(url, { id: this.data.this_id }, (info, _r, opts) => {
            opts.delay = 5500;

            isFail = false;
            is_kongjiang = info.is_kongjiang == 1;
            failMsg = is_kongjiang ? info.prize : '';
            this.data.this_market_data.user_data.user_jiang_num = info.user_jiang_num;
            this.data.this_market_data.user_data.user_jiner_num = info.user_jiner_num;
            if (!is_kongjiang) {
                prize = info.prize;
                prizeImg = info.l_jp_pic;
            }

            setTimeout(() => {
                isStop = true;
                speed = info.id * 60 + 360;
            }, 500);
        }, this, {
                error: (code, msg) => {
                    failMsg = msg;
                    return false;
                },
                completeAfter: () => {
                    isStop = true;
                },
                isShowLoading: false,
                delay: 3000
            });
    },

    /**
     * 设置Page data 中的值
     */
    onSetValueTap: function (e) {
        const dataset = e.currentTarget.dataset, isMulti = dataset.isMulti || false;
        if (isMulti) {
            const data = JSON.parse(dataset.value);
            for (let x in data) {
                data[x] = Object.assign(this.data[x] || {}, data[x]);
            }
            this.setData(data);
        } else {
            const name = dataset.name, value = dataset.value;
            const data = {};
            data[name] = value;
            this.setData(data);
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: this.data.this_market_data.title,
            path: getCurrentPages()[0].__route__,
            success: () => {
                const url = _DuoguanData.duoguan_host_api_url + '/index.php/addon/MarketingLuckDraw/ApiShare/shareSetData';
                requestUtil.get(url, { id: this.data.this_id }, () => {
                    this.onPullDownRefresh();
                });
            }
        };
    }
})