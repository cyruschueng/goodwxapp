/**
 * @file 连击
 * @author hurry
 * @date 2018/01/22
 */
import config from '../../../../utils/config.js';
import pkConfig from '../../config';
Component({
    // behaviors: [],
    properties: {
        // 倒计时开始
        count: { // 属性名
            type: Number, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
            observer: function (newVal, oldVal) {
                // if (newVal >= 2 && newVal !== oldVal) {
                //     this.animation();
                // }
                this.setData({
                    displayType: pkConfig.DISPLAY_TYPE.SHOW
                });
                if (newVal > 1) {
                    setTimeout(() => {
                        this.setData({
                            displayType: pkConfig.DISPLAY_TYPE.HIDDEN
                        });
                    }, config.ANIMATION_INTERVAL.NORMAL);
                }
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
        displayType: pkConfig.DISPLAY_TYPE.SHOW
    }, // 私有数据，可用于模版渲染
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {},
    moved: function () {},
    detached: function () {},
    methods: {}
});