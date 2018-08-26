/**
 * @file 动画服务，所有动画这里控制，通过wx:if控制ui的显示与隐藏
 * @author hurry
 * @date 2018/01/25
 */
import config from '../config';
import comConfig from '../../../utils/config';
import util from '../../../utils/util';
import innerAudioUtil from '../../../utils/innerAudioUtil';
import bgAudioUtil from './bgAudio';
const bgAudioManager = util.audioManager;
const bgMusics = util.getBgMusics;

function getBlanksTilte(title) {
    if (title.indexOf(config.TITLE_FLAG) === -1) {
        return [{
            name: 'span',
            children: [{
                type: 'text',
                text: title
            }]
        }];
    }
    let children = [];
    const arrs = title.split(config.TITLE_FLAG);
    const len = arrs.length;
    arrs.forEach((item, index) => {
        children.push({
            name: 'span',
            children: [{
                type: 'text',
                text: item
            }]
        });
        if (index === len - 1) {
            return;
        }
        children.push({
            name: 'span',
            attrs: {
                class: 'blanks'
            },
            children: [{
                type: 'text',
                text: '?'
            }]
        });
    });
    return children;
}

export default {
    /**
     * 通过setData控制ui动画
     * @params {Object} ctt 上下文
     * @params {Object} data setData中指定的对象 
     * @params {Number} interval 和ui动画时间匹配，默认250
     * @params {Function} cb setData回调函数
     */
    dataAnimation: function (ctt, data, interval, cb) {
        return new Promise(function (resolve) {
            ctt.setData(data, function () {
                if (cb) {
                    cb();
                }
                setTimeout(() => {
                    resolve();
                }, interval || comConfig.ANIMATION_INTERVAL.NORMAL);
            });
        });
    },
    // 寻找陌生人pk动画
    findStrangerAnimation: function (ctt) {
        const me = this;
        function animation() {
            // 显示
            return me.dataAnimation(ctt, {
                'avatar.isHiddenOtherInfo': false,
                isShowFindEnemyTips: true
            }, comConfig.ANIMATION_INTERVAL.SLOWER)
            .then(function () {
                return me.dataAnimation(ctt, {
                    isShowCloud: true
                });
            })
        }
        return animation();
    },
    // 寻找对手动画
    introduceThenPkAnimation: function (ctt, data) {
        const me = this;
        function animation() {
            // 先隐藏计数器
            return me.dataAnimation(ctt, {
                'timer.isShow': false,
                isShowFindEnemyTips: false
            }, comConfig.ANIMATION_INTERVAL.QUICKER).then(function () {
                // 拔剑声音
                innerAudioUtil.drewSwordAudio({
                    src: bgMusics.DREW_SWORD
                });
                // bgAudioUtil.loopPlay(bgMusics.DREW_SWORD);
                // 显示对手信息
                return me.dataAnimation(ctt, {
                    'enemyInfo.baseInfo': data.enemy,
                    'enemyInfo.isShowAvatar': true
                });
            }).then(function () {
            // 显示vs图标
                return me.dataAnimation(
                    ctt,
                    { isShowVs: true },
                    comConfig.ANIMATION_INTERVAL.SLOW,
                    () => {
                        // 呼的一声
                        innerAudioUtil.windAudio({
                            src: bgMusics.WIND
                        });
                        // bgAudioUtil.loopPlay(bgMusics.WIND);
                    }
                );
            }).then(function () {
                // 隐藏头像和vs图标
                return me.dataAnimation(ctt, {
                    'userInfo.isShowAvatar': false,
                    'enemyInfo.isShowAvatar': false,
                    isShowVs: false
                });
            }).then(function () {
                // 进入下个页面显示pk双方头像
                return me.dataAnimation(ctt, {
                    'game.status': config.GAME_STATUS.PK,
                    'avatar.isHiddenOtherInfo': true,
                    'userInfo.isShowAvatar': true,
                    'enemyInfo.isShowAvatar': true
                }, null, () => {
                    // 把寻找对手的背景声音关闭
                    bgAudioUtil.stop();
                    // bgAudioUtil.loopPlay(bgMusics.ANSWERING);
                });
            });
        }
        return animation();
    },
    // 开始好友pk
    beginFriendQuestion: function (ctt, data) {
        const me = this;
        function animation() {
            // 进入下个页面显示pk双方头像
            return me.dataAnimation(ctt, {
                isShowVs: false,
                'game.status': config.GAME_STATUS.PK,
                'avatar.isHiddenOtherInfo': true,
                'userInfo.isShowAvatar': true,
                'enemyInfo.isShowAvatar': true
            }, null, () => {
                // bgAudioUtil.loopPlay(bgMusics.ANSWERING);
            });
        }
        return animation();
    },
    // 显示问题动画
    questionAnimation: function (ctt, data) {
        // bgAudioUtil.loopPlay(bgMusics.ANSWERING);
        const me = this;
        function animation() {
            // 显示标签和第几题
            return me.dataAnimation(ctt, {
                isShowMyCombo: false,
                isShowEnemyCombo: false,
                'question.isQuestionOver': false,
                'question.result': null,
                'question.isShowQuestionOptions': false,
                'question.tag': data.tag,
                'question.currentRound': data.currentRound,
                'question.tagDisplayType': config.DISPLAY_TYPE.SHOW,
                'question.isShowQustionTitle': false
            }).then(function () {
                // 隐藏标签和第几题
                return me.dataAnimation(ctt, {
                    'question.tagDisplayType': config.DISPLAY_TYPE.HIDDEN
                }, comConfig.ANIMATION_INTERVAL.QUICK);
            }).then(function () {
                // 最后一题显示双倍暴击
                if (data.currentRound === config.LAST_ROUND_INDEX) {
                    return me.dataAnimation(ctt, { 'isShowDoubleCombo': true }, comConfig.ANIMATION_INTERVAL.SLOWEST, () => {
                        innerAudioUtil.windAudio({
                            src: bgMusics.WIND
                        });
                        // bgAudioUtil.playAudio(bgMusics.WIND);
                        // let context = wx.createInnerAudioContext();
                        // context.src = bgMusics.WIND;
                        // context.autoplay = true;
                        // context.loop = false;
                    });
                } else {
                    return Promise.resolve()
                }
            }).then(function () {
                const children = getBlanksTilte(data.question);
                // 显示问题标题
                return me.dataAnimation(ctt, {
                    // 'question.title': data.question,
                    'nodes': [{
                        name: 'span',
                        attrs: {
                            class: 'blanks-wrap'
                        },
                        children: children
                    }],
                    'question.isShowQustionTitle': true
                }, comConfig.ANIMATION_INTERVAL.QUICKER);
            }).then(function () {
                // 显示问题选项
                return me.dataAnimation(ctt, {
                    'question.isShowQuestionOptions': true,
                    'question.options': data.options,
                });
            }).then(function () {
                // 显示倒计时
                return me.dataAnimation(ctt, {
                    'timer.num': config.COUNT_DOWN_NUM,
                    'timer.type': config.CAL_TYPE.MINUS,
                    'timer.isShow': true
                });
            });
        }
        return animation();
    },
    // 显示问题动画
    questionOptionsAnimation: function (ctt, data) {
        const me = this;
        const animation = wx.createAnimation({
            duration: comConfig.ANIMATION_INTERVAL.QUICKER,
            timingFunction: 'ease',
        });
        animation.opacity(1);
        function beginAnimation() {
            return me.dataAnimation(
                ctt,
                {
                    'animationData.0': animation.step({
                        duration: comConfig.ANIMATION_INTERVAL.QUICKEST,
                    }).export()
                }, 
                comConfig.ANIMATION_INTERVAL.QUICKEST
            ).then(function() {
                return me.dataAnimation(
                    ctt,
                    {
                        'animationData.1': animation.top(0).step({
                            duration: comConfig.ANIMATION_INTERVAL.QUICKEST,
                        }).export()
                    },
                    comConfig.ANIMATION_INTERVAL.QUICKEST
                );
            }).then(function () {
                return me.dataAnimation(
                    ctt,
                    {
                        'animationData.2': animation.top('20rpx').step({
                            duration: comConfig.ANIMATION_INTERVAL.QUICKEST,
                        }).export()
                    }, 
                    comConfig.ANIMATION_INTERVAL.QUICKEST
                );
            }).then(function () {
                return me.dataAnimation(
                    ctt,
                    {
                        'animationData.3': animation.top('40rpx').step({
                            duration: comConfig.ANIMATION_INTERVAL.QUICKEST,
                        }).export()
                    },
                    comConfig.ANIMATION_INTERVAL.QUICKEST
                );
            });
        }
        return beginAnimation();
    },
    // 问题结束动画
    questionOverAnimation: function (ctt, selectedIndex, data) {
        const me = this;
        function animation() {
            // 隐藏倒计时和非选择项
            return me.dataAnimation(ctt, {
                'timer.isShow': false,
                myScore: data.totalScore,
                enemyScore: data.enemyTotalScore
            }, null, () => {
                if (selectedIndex) {
                    if (selectedIndex === data.correctOption) {
                        // 正确
                        innerAudioUtil.correctAudio({
                            src: bgMusics.CORRECT
                        });
                        // bgAudioUtil.playAudio(bgMusics.CORRECT);
                    } else {
                        // 错误
                        // bgAudioUtil.playAudio(bgMusics.WRONG);
                        innerAudioUtil.wrongAudio({
                            src: bgMusics.WRONG
                        });
                    }
                }
            }).then(function () {
                // 连击
                return me.dataAnimation(ctt, {
                    isShowMyCombo: data.combo > 1,
                    isShowEnemyCombo: data.enemyCombo > 1
                }, null, () => {
                    if (data.combo > 1 || data.enemyCombo > 1) {
                        innerAudioUtil.drewSwordAudio({
                            src: bgMusics.DREW_SWORD
                        });
                        // let context = wx.createInnerAudioContext();
                        // context.src = bgMusics.WIND;
                        // context.autoplay = true;
                        // context.loop = false;
                        // bgAudioUtil.playAudio(bgMusics.DREW_SWORD);
                    }
                });
            });
        }
        return animation();
    },
    // 显示结果页面动画
    showGameOverPageAnimation: function (ctt, data) {
        const me = this;
        function animation() {
            // 隐藏pk页的头像信息
            return me.dataAnimation(ctt, {
                'userInfo.isShowAvatar': false,
                'enemyInfo.isShowAvatar': false,
                'game.status': config.GAME_STATUS.OVER,
            }).then(function () {
                // 结果页展示头像
                return me.dataAnimation(ctt, {
                    'userInfo.isShowAvatar': true,
                    'enemyInfo.isShowAvatar': true,
                }, comConfig.ANIMATION_INTERVAL.QUICKER);
            }).then(function () {
                // 展示分数和获胜者王冠
                return me.dataAnimation(ctt, {
                    'userInfo.isWinner': data.status === config.GAME_RESULT_STATUS.WIN,
                    'enemyInfo.isWinner': data.status === config.GAME_RESULT_STATUS.FAIL,
                    'result.isShowTotal': true,
                    'result.totalScore': data.totalScore,
                    'result.enemyTotalScore': data.enemyTotalScore,
                }, comConfig.ANIMATION_INTERVAL.QUICKER);
            }).then(function () {
                // 展示pk结果和背景图
                // 展示获取的金币、经验值及标签
                // 展示pk结果场景
                return me.dataAnimation(ctt, {
                    finalReport: {
                        counterattack: data.counterattack,
                        status: data.status,
                        gold: data.gold,
                        exp: data.exp
                    }
                }, comConfig.ANIMATION_INTERVAL.QUICKER);
                
            }).then(function () {
                // 再来一局/继续挑战
                return me.dataAnimation(ctt, {
                    'isShowResultAgainBtn': ctt.data.game.type !== config.GAME_TYPE.INVITE || (ctt.data.game.type === config.GAME_TYPE.INVITE && ctt.data.userId === ctt.data.userInfo.baseInfo.userId),
                    'isShowResultShareBtn': true
                });
            });
            // 分享
            // await me.dataAnimation(ctt, {  });
        }
        return animation();
    },
    // 显示展示结果ui动画
    showResultUIAnimation: function (ctt, data) {
        const me = this;
        // if (data.status === config.GAME_RESULT_STATUS.FAIL) {
        //     bgAudioUtil.loopPlay(bgMusics.DEFEAT_WIND);
        // }
        function animation() {
            // 背景图
            return me.dataAnimation(ctt, { 'isShowBgImg': true }, comConfig.ANIMATION_INTERVAL.QUICKER, () => {
                if (data.status === config.GAME_RESULT_STATUS.WIN) {
                    // 挑战胜利
                    // bgAudioUtil.playAudio(bgMusics.VICTORY);
                    bgAudioManager.play(bgMusics.VICTORY);
                } else if (data.status === config.GAME_RESULT_STATUS.FAIL) {
                    // 挑战失败
                    // bgAudioUtil.playAudio(bgMusics.DEFEAT);
                    bgAudioManager.play(bgMusics.DEFEAT);
                } else {
                    // 平局
                    // bgAudioUtil.playAudio(bgMusics.DOGFALL);
                    bgAudioManager.play(bgMusics.DOGFALL);
                }
            }).then(function () {
                // 文案
                return me.dataAnimation(ctt, { 'isShowTipsImg': true }, comConfig.ANIMATION_INTERVAL.QUICKER);
            }).then(function () {
                // 奖励
                return me.dataAnimation(ctt, { 'isShowReward': true });
            });
            // // 场景
            // await me.dataAnimation(
            //     ctt,
            //     { 'isShowScene': true },
            //     data.status === config.GAME_RESULT_STATUS.FAIL && comConfig.ANIMATION_INTERVAL.SLOWEST
            // );
        }
        return animation();
    }
};