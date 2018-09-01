/**
 * @file 问题选项
 * @author hurry
 * @date 2018/01/23
 */
import numUtil from '../../../../utils/number';
import config from '../../config';

Component({
    // behaviors: [],
    properties: {
        score: {
            type: Number,
            value: 0,
            observer: function (newVal, oldVal) {
                if (!newVal) {
                    return;
                }
                this.animation();
            }
        }
    },
    // 私有数据，可用于模版渲染
    data: {
        // // 总得分，每次score累加
        // preScore: 0
    }, 
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
        this.setData({
            // 更新属性和数据的方法与更新页面数据的方法类似
            score: 0
        });
    },
    moved: function () {},
    detached: function () {},
    methods: {
        animation: function () {
            // var totalScore = this.data.totalScore + this.data.score;
            // this.setData({
            //     // 更新属性和数据的方法与更新页面数据的方法类似
            //     preScore: totalScore
            // });
            var animation = wx.createAnimation({
                duration: 1000,
                timingFunction: 'ease',
            });
            // this.animation = animation;
        
            animation.step();
        
            this.setData({
                animationData: animation.export()
            });
            setTimeout(function() {
                // 高度百分比
                var heightPercent = numUtil.round(this.data.score / config.TOTAL_SCORE, 2) * 100;
                animation.height(heightPercent + '%').step({
                    duration: 500,
                });
                this.setData({
                    animationData: animation.export()
                })
            }.bind(this), 100);
        },
    //   _myPrivateMethod: function(){
    //     // 内部方法建议以下划线开头
    //     this.replaceDataOnPath(['A', 0, 'B'], 'myPrivateData') // 这里将 data.A[0].B 设为 'myPrivateData'
    //     this.applyDataUpdates()
    //   },
    //   _propertyChange: function(newVal, oldVal) {
  
    //   }
    }
});