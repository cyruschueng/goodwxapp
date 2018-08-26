/**
 * @file 
 * @author hurry
 * @date 2018/02/04
 */

Component({
    // behaviors: [],
    properties: {
        // /**
        //  * 树叶个数
        //  * @param {Number} 树叶个数
        //  */
        // leafCount: {
        //     type: Number,
        //     value: 4,
        //     observer: function (newVal, oldVal) {
        //         if (newVal > 2) {
        //             this.initAnimation();
        //         }
        //     }
        // }
    },
    // 私有数据，可用于模版渲染
    data: {
        animationData: null
    }, 
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {},
    moved: function () {},
    detached: function () {},
    methods: {
        // initAnimation: function () {
        //     const me = this;
        //     const animation = wx.createAnimation({
        //         duration: comConfig.ANIMATION_INTERVAL.QUICKER,
        //         timingFunction: 'ease',
        //     });
        //     animation.opacity(1).step({
        //         duration: comConfig.ANIMATION_INTERVAL.QUICKER,
        //     });
        //     animationUtil
        //         .questionOptionsAnimation(this, animation.export())
        //         .then(() => {
        //             this.triggerEvent('animationendevent');
        //         });
        // }
    }
});