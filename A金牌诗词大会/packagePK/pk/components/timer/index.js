/**
 * @file 倒计时
 * @author hurry
 * @date 2018/01/22
 */
import config from '../../config';
import comConfig from '../../../../utils/config';

Component({
    // behaviors: [],
    properties: {
        type: {
            type: String,
            value: config.CAL_TYPE.MINUS
        },
        // 倒计时开始
        count: { // 属性名
            type: Number, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
            observer: function (newVal, oldVal) {
                if (newVal > -1) {
                    if (this.timer) {
                        clearInterval(this.timer);
                    }
                    this.beginTimer();
                }
            } 
        },
        // 是否隐藏
        isHidden: {
            type: Boolean,
            value: true,
            observer: function (newVal, oldVal) {
                if (!newVal) {
                    this.setData({
                        // count: this.orignCount,
                        isHiddenDom: false
                    }, function () {
                        // this.beginTimer();
                    });
                }
                if (newVal) {
                    if (this.timer) {
                        clearInterval(this.timer);
                    }
                    // setTimeout(() => {
                        this.setData({
                            count: -1,
                            isHiddenDom: true
                            // count: this.orignCount
                        });
                    // });
                }
            } 
        }
        // myProperty2: String // 简化的定义方式
    },
    data: {
        isHiddenDom: false
    }, // 私有数据，可用于模版渲染
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {},
    moved: function () {},
    detached: function () {
        this.clearTimer();
    },
    methods: {
        clearTimer: function () {
            if (this.timer) {
                clearInterval(this.timer);
            }
        },
        beginTimer: function () {
            this.clearTimer();
            this.timer = setInterval(() => {
                const count = this.data.type === config.CAL_TYPE.MINUS ? --this.data.count : ++this.data.count;
                // 结束
                if ((this.data.type === config.CAL_TYPE.MINUS && count === 0) || (this.data.type === config.CAL_TYPE.ADD && count === 11)) {
                    clearInterval(this.timer);
                    // 倒计时回调
                    this.triggerEvent('countdownendevent');
                    return;
                }
                if (count > 10 || count < 1) {
                    return;
                }
                this.setData({
                    count: count
                });
            }, 1000);
        }
        // onMyButtonTap: function(){
        //     this.setData({
        //     // 更新属性和数据的方法与更新页面数据的方法类似
        //     })
        // },
    //   _myPrivateMethod: function(){
    //     // 内部方法建议以下划线开头
    //     this.replaceDataOnPath(['A', 0, 'B'], 'myPrivateData') // 这里将 data.A[0].B 设为 'myPrivateData'
    //     this.applyDataUpdates()
    //   },
    //   _propertyChange: function(newVal, oldVal) {
  
    //   }
    }
});