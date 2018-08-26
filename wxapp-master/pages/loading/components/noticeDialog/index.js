/**
 * @file notice dialog  停机更新公告
 * @author niejianhui
 */
var noticeDlgAnimation = wx.createAnimation({
    duration: 200,
    timingFunction: 'ease'
});
Component({
    properties: {
        dialogData: {
            type: Object,
            value: null,
            observer: function (newVal) {
                var me = this;
                if (newVal) {
                    me.setData({
                        showDialog: true
                    });
                    setTimeout(function () {
                        noticeDlgAnimation.opacity(1).scale(1).step();
                        me.setData({
                            noticeDlgAniData: noticeDlgAnimation.export()
                        });
                    }, 500);
                }
            }
        }
    },
    data: {
        showDialog: false,
        noticeDlgAniData: {}
    },
    attached: function () {

    },
    methods: {

    }
});
