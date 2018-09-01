/**
 * @file awardRules dialog
 * @author niejianhui
 */
import * as t from '../../../../utils/loginKey';
import REPORT_LOG from '../../../../enums/REPORT_LOG';
var awardRulesDlgAni = wx.createAnimation({
    duration: 200,
    timingFunction: 'ease'
});
Component({
    properties: {
        showDialog: {
            type: Boolean,
            value: false,
            observer: function (newVal) {
                var me = this;
                if (newVal) {
                    setTimeout(function () {
                        awardRulesDlgAni.opacity(1).scale(1).step();
                        me.setData({
                            awardRulesDlgAniData: awardRulesDlgAni.export()
                        });
                    }, 300);
                }
            }
        }
    },
    data: {
        awardRulesDlgAniData: {}
    },
    attached: function () {
        
    },
    methods: {
        closeDialog: function () {
            t.requestLog('button', REPORT_LOG.MINI_RANK_IKNOW);
            var me = this;
            awardRulesDlgAni.opacity(0).scale(0.25).step();
            me.setData({
                awardRulesDlgAniData: awardRulesDlgAni.export()
            });
            setTimeout(function () {
                me.setData({
                    showDialog: false
                });
            }, 300);
        }
    }
});