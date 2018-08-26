var app = getApp();
import * as utils from '../../utils/util'
import * as api from '../main/api'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isHideQunQiangPopup: true,
        noWin:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        wx.showLoading({
          title: '搜寻红包中...',
        })
        console.log('packagePopup options:', options);
        console.log('app scene:', app.scene);

        var { redpackId, share, banner, title } = options;

        utils.setPageTile(title);
        this.setData({ banner, title, redpackId })

        /**
         * 带 shareTicket 的小程序消息卡片（详情)
         * 1044场景进来的用户才可以，显示领红包弹窗
         */
        if (app.scene == '1044' && share == 'package') {
            this.showPackagePopup(options);
        } else {
            wx.hideLoading();
            wx.showModal({
                showCancel: false,
                title: '提示',
                content: '分享到群，才能领红包哦~！',
                success:function(res){
                  wx.reLaunch({
                    url: '/pages/main/main',
                  })
                }

            })
        }
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

    /**
     * status = 1 // 显示抢红包弹窗
     
     * status = 2 // 跳页面-抢光了
     * status = 3 // 跳页面-这个群不能抢
     */
    showPackagePopup(options) {

        app.getOpenGId(options.redpackId, (res) => {
            wx.hideLoading();
            console.log('获取红包状态res：', res);
            
            if (!res || res.errCode !=0){
              console.log("错误",res);
              try {
                wx.removeStorageSync(app.program_code + '_watermark');
              } catch (e) {
                // Do something when catch error
              }
              this.setData({
                noWin:false
              });
              return;
            }

            var { advertiserIcon, totalMoney, advertiserName, lotteryRedpackSendId, status } = res.data;

            if (totalMoney || totalMoney == 0) {
                totalMoney = utils.toFixed(totalMoney);
            }

            if (advertiserIcon) {
                advertiserIcon = utils.getUrl(advertiserIcon);
            }

            //红包弹窗显示需要的参数
            this.setData({ totalMoney, advertiserIcon, advertiserName });

            // 1 抢红包弹窗
            if (status == '1') {
                this.showQunQiangPopup();
                return;
            }

            // 2 抢光了不弹窗-跳页面 
            // 3 这个群不能抢-跳页面
            if (status == '2' || status == '3') {

                var obj = JSON.stringify({
                    banner: options.banner,
                    title: options.title,
                    advertiserIcon,
                    advertiserName,
                    lotteryRedpackSendId,
                    status,
                    totalMoney,
                    redpackId: options.redpackId
                });

                wx.redirectTo({
                    url: `/pages/packageDetail/index?obj=${obj}`,
                    complete: () => {
                        this.hideQunQiangPopup();
                    }
                });
            };
            if (status == '4' ) {
              wx.showModal({
                showCancel: false,
                title: '提示',
                content: '该次红包领取次数已达上限~！',
                success: function (res) {
                  wx.reLaunch({
                    url: '/pages/main/main',
                  })
                }
              })
            }

        });
    },
    hideQunQiangPopup() {
        this.setData({
            isHideQunQiangPopup: true
        });
    },
    showQunQiangPopup() {
        this.setData({
            isHideQunQiangPopup: false
        });
    },
    /**
     * 点击“开”，调用lottery接口
     * lottery接口 status == 0 才是中奖了，其它状态都没中奖；
     */
    toPackageDetail() {


        //防止重复点击
        if (this.isToPackageDetail) {
            return;
        }
        this.isToPackageDetail = true;

        app.getWatermark((watermark) => {

            var { title, redpackId, banner } = this.data;
            wx.showLoading({
              title: '红包开启中...',
            })
            api.lottery(watermark, redpackId, (res) => {

                var { hasLottery, id, isLottery, money, status } = res.data;

                //默认没中奖
                var oStatus = 3;

                money = utils.toFixed(money);

                // lottery接口statu 0中奖了， 1红包结束了， 2 没有群ID 3. 这个群已经抽过奖了， 6 已经抢了2次；
                if (status == 0) {
                    oStatus = 1
                }

                var obj = JSON.stringify({
                    banner,
                    status: oStatus,
                    redpackId: redpackId,
                    title,
                    hasLottery, 
                    id,
                    isLottery,
                    money
                });

                if (res.data) {
                     
                    wx.redirectTo({
                        url: `/pages/packageDetail/index?obj=${obj}`,
                        complete: () => {
                            this.hideQunQiangPopup();
                        }
                    });
                }

                this.isToPackageDetail = false;
            });
        });


    },
    noWinfun(){
      wx.reLaunch({
        url: `/pages/main/main`,
        success: () => { }
      });
    }
})