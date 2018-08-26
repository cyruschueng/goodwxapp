/**
 * @file 问题选项
 * @author hurry
 * @date 2018/01/23
 */
import animationUtil from '../../util/animation.js';
import bgAudioUtil from '../../util/bgAudio.js';
import config from '../../config';
import comConfig from '../../../../utils/config';
import util from '../../../../utils/util';
import innerAudioUtil from '../../../../utils/innerAudioUtil';
import * as t from '../../../../utils/loginKey';
import REPORT_LOG from '../../../../enums/REPORT_LOG';

Component({
    // behaviors: [],
    properties: {
        /**
         * @params {Arrary<string>}
         *  例如：["文成公主", "高阳公主", "平阳公主", "太平公主"]
         */
        options: {
            type: Array,
            observer: function (newVal, oldVal) {
                if (!Array.isArray(newVal) || !newVal.length) {
                    return;
                }
                this.setData({
                    // 更新属性和数据的方法与更新页面数据的方法类似
                    selectedIndex: -1,
                    result: null,
                    animationData: null,
                    isQuestionOver: false
                }, () => {
                    this._initAnimation();
                });
            }
        },
        /**
         * 是否隐藏
         */
        isHidden: {
            type: Boolean,
            value: true
        },
        /**
         * 选择情况，下标从1开始
         * @param {Object} result
         * @param {Number} result.correctIndex
         * @param {Number} result.enemySelectedIndex
         */
        result: {
            type: Object,
            observer: function (newVal, oldVal) {
                if (this.data.selectedIndex > 0) {
                    this.setData({
                        isQuestionOver: true
                    }, function () {
                        this.triggerEvent('questionoverevent', { selectedIndex: this.data.selectedIndex });
                    });
                    return;
                }
                // 倒计时结束
                if (this.data.isQuestionOver) {
                    this.triggerEvent('questionoverevent', { selectedIndex: this.data.selectedIndex });
                }
            }
        },
        isQuestionOver: {
            type: Boolean,
            value: false
        }
        // myProperty2: String // 简化的定义方式
    },
    // getRowClassName: function () {
    //     result ? (result.correctOption === index + 1 ? 'win' : (result.enemyOption === index + 1 || selectedIndex === index + 1 ? 'wrong' : '')) : (selectedIndex === index + 1 ? 'selected' : '')
    // },
    // 私有数据，可用于模版渲染
    data: {
        selectedIndex: -1,
        animationData: null
    }, 
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
    },
    moved: function () {},
    detached: function () {
        this.setData({
            // 更新属性和数据的方法与更新页面数据的方法类似
            selectedIndex: -1
        });
    },
    methods: {
        _initAnimation: function () {
            // const me = this;
            // const animation = wx.createAnimation({
            //     duration: comConfig.ANIMATION_INTERVAL.QUICKER,
            //     timingFunction: 'ease',
            // });
            // animation.opacity(1).step({
            //     duration: comConfig.ANIMATION_INTERVAL.QUICKER,
            // });
            animationUtil
                .questionOptionsAnimation(this)
                .then(() => {
                    this.triggerEvent('animationendevent');
                });
        },
        onOptionTap: function (event) {
            t.requestLog('button', REPORT_LOG.MINI_PK_OPTION);
            if (this.data.selectedIndex > 0) {
                return;
            }
            var selectedIndex = +event.target.dataset.index;
            this.setData({
                // 更新属性和数据的方法与更新页面数据的方法类似
                selectedIndex: selectedIndex,
                isQuestionOver: !!this.data.result
            }, function () {
                if (this.data.result) {
                    this.triggerEvent('questionoverevent', { selectedIndex: this.data.sselectedIndex });
                }
            });
            this.triggerEvent('selectedoptionsevent', { selectedIndex: selectedIndex });
            innerAudioUtil.clickAudio({
                src: util.getBgMusics.CLICK_BTN
            });
    //         let context = wx.createInnerAudioContext();
    // context.src = util.getBgMusics.CLICK_BTN;
    // context.autoplay = true;
            // bgAudioUtil.playAudio(util.getBgMusics.CLICK_BTN);
        }
    }
});