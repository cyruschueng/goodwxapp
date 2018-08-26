/**
 * @file 云图
 * @author hurry
 * @date 2018/01/23
 */
import config from '../../../utils/config.js';

Component({
    // behaviors: [],
    properties: {
        // 是否隐藏
        isShow: {  
            type: Boolean,
            value: false,
            observer: function (newVal, oldVal) {
                if (!newVal) {
                    return;
                }
                this._initAnimation();
            } // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        },
        // 距离顶部位置
        top: {
            type: String,
            value: '20%',
            observer: function (newVal) {
            }
        },
        /**
         * direction == 'left'，相当于left偏移量
         * direction == 'right'，相当于right偏移量
         */
        offsetX: {
            type: String,
            value: '20%',
            observer: function (newVal) {
            }
        },
        /**
         * 移动偏移量
         * direction == 'left'，从左到右
         * direction == 'right'，从右到左
         */
        moveOffset: {
            type: Number,
            value: -100,
            observer: function (newVal) {
            }
        },
        // 方向
        direction: { // 属性名
            // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            type: String, 
            // 方向，left
            value: config.DIRECTION.LEFT
        }
        // myProperty2: String // 简化的定义方式
    },
    data: {
        animationData: {}
    }, // 私有数据，可用于模版渲染
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
        if (!this.data.isShow) {
            return;
        }
        this._initAnimation();
    },

    // moved: function () {},
    // detached: function () {},
    methods: {
        _initAnimation: function () {
            var animation = wx.createAnimation({
                duration: 1000,
                timingFunction: 'ease',
            });
        
            this.animation = animation;
            animation.top(this.data.top);
            if (this.data.direction === config.DIRECTION.LEFT) {
                animation.left(this.data.offsetX).rotateY(180);
            } else {
                animation.right(this.data.offsetX);
            }
            animation.step();
        
            // this.setData({
            //     animationData: animation.export()
            // });
            // setTimeout(function() {
            //     animation.translateX(this.data.moveOffset).opacity(0).step({
            //         duration: 2000,
            //     });
            //     this.setData({
            //         animationData: animation.export()
            //     }, function () {
            //     })
            // }.bind(this), 100);

            this.setData({
                animationData: animation.export()
            });

            setTimeout(() => {
                animation.opacity(1).translateX(-10).step({duration: 100});
                animation.opacity(1).translateX(this.data.moveOffset + 30).step();
                // animation.opacity(1).translateX(this.data.moveOffset + 20).step();
                animation.opacity(0).translateX(this.data.moveOffset).step({duration: 100});
                this.setData({ animationData: animation.export() });
            }, config.ANIMATION_INTERVAL.QUICKEST);

            

            // leftCloudAnimation.opacity(1).translateX(10).step({duration: 100});
            // leftCloudAnimation.opacity(1).translateX(140).step();
            // leftCloudAnimation.opacity(1).translateX(150).step();
            // leftCloudAnimation.opacity(0).translateX(160).step({duration: 100});
            // rightCloudAnimation.opacity(1).translateX(-10).step({duration: 100});
            // rightCloudAnimation.opacity(1).translateX(-140).step();
            // rightCloudAnimation.opacity(1).translateX(-150).step();
            // rightCloudAnimation.opacity(0).translateX(-160).step({duration: 100});
        }
    }
});