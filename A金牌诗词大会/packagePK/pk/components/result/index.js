/**
 * @file 结果：金币、经验、结果
 * @author hurry
 * @date 2018/01/25
 */
import animationUtil from '../../util/animation.js';
import config from '../../../../utils/config.js';

Component({
    // behaviors: [],
    properties: {
        /**
         * 结果
         * @param {Object} result
         * @param {Boolean} result.counterattack 是否逆袭
         * @param {Number} result.gold  赏金
         * @param {Number} result.exp   经验
         * @param {Number} result.status 0: 平局，1：胜利，2：失败
         */
        result: {
            type: Object,
            observer: function (newVal) {
                this.initAnimation(newVal);
            }
        }
        // myProperty2: String // 简化的定义方式
    },
    data: {
        leftCloud: {
            top: '-80rpx',
            moveOffset: '-150',
            offsetX: '15%'
        },
        rightCloud: {
            top: '-110rpx',
            moveOffset: '-150',
            offsetX: '15%'
        }
    },
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {},
    moved: function () {},
    detached: function () {
        if (this.timer) {
            clearInterval(this.timer);
        }
    },
    methods: {
        initAnimation: function (result) {
            animationUtil
                .showResultUIAnimation(this, result)
                .then(() => {
                    this.setData({
                        isShowScene: true
                    });
                    // 循环显示场景信息
                    this.timer = setInterval(() => {
                        this.setData({
                            isShowScene: true
                        });
                        setTimeout(() => {
                            this.setData({
                                isShowScene: false
                            });
                        }, config.ANIMATION_INTERVAL.SLOWEST);
                    }, 5000);
                });
        }
    }
});