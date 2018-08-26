/**
 * @file award dialog
 * @author niejianhui
 */
import config from '../../../../utils/config';
import wxService from '../../../../utils/wxService';
import util from '../../../../utils/util';
const bgAudioManager = util.audioManager;
const bgMusics = util.getBgMusics;
const PATHS = config.PATHS;
const serverHost = config.SERVER_HOST;
var awardDlgAnimation = wx.createAnimation({
    duration: 200,
    timingFunction: 'ease'
});
Component({
    data: {
        showDialog: false
    },
    attached: function () {
        this.isShowDialog();
    },
    methods: {
        closeDialog: function () {
            var me = this;
            awardDlgAnimation.opacity(0).scale(0.25).step();
            me.setData({
                awardDlgAniData: awardDlgAnimation.export()
            });
            setTimeout(function () {
                me.setData({
                    showDialog: false
                });
            }, 300);
        },
        isShowDialog: function () {
            var me = this;
            var hasPracticed = wx.getStorageSync('HASPRACTICED');
            if (hasPracticed) {
                wxService({
                    url: serverHost + PATHS.CHECK_INFO,
                    data: {},
                    success: function (backendData) {
                        if (backendData.coin) {
                            me.setData({
                                showDialog: true,
                                coin: backendData.coin
                            });
                            setTimeout(function () {
                                me.closeDialog();
                            }, 3000);
                        } else {
                            me.setData({
                                showDialog: false
                            });
                        }
                    }
                });
            }
        }
    }
});
