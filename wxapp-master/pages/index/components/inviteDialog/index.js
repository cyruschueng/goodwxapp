/**
 * @file invite dialog
 * @author niejianhui
 */
import wxService from '../../../../utils/wxService';
import util from '../../../../utils/util';
import config from '../../../../utils/config';
const bgAudioManager = util.audioManager;
const bgMusics = util.getBgMusics;
var inviteDlgAnimation = wx.createAnimation({
    duration: 200,
    timingFunction: 'ease'
});
Component({
    properties: {

    },
    data: {
        showDialog: false,
        inviteDlgAniData: {}
    },
    attached: function () {
        var me = this;
        var hasPracticed = wx.getStorageSync('HASPRACTICED');
        if (!hasPracticed) {
            me.setData({
                showDialog: true
            });
            setTimeout(function () {
                inviteDlgAnimation.opacity(1).scale(1).step();
                me.setData({
                    inviteDlgAniData: inviteDlgAnimation.export()
                });
            }, 500);
        }
    },
    methods: {
        closeDialog: function () {
            var me = this;
            inviteDlgAnimation.opacity(0).scale(0.25).step();
            me.setData({
                inviteDlgAniData: inviteDlgAnimation.export()
            });
            setTimeout(function () {
                me.setData({
                    showDialog: false
                });
                wx.setStorageSync('HASPRACTICED', true);
            }, 300);
        },
        joinPractice: function () {
            bgAudioManager.play(bgMusics.CLICK_BTN);
            this.closeDialog();
            wx.navigateTo({
                url: '/packagePK/pk/index?rateType=practice&appearanceFee=0'
            });
        }
    }
});
