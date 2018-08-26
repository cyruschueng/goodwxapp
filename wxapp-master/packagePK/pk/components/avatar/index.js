/**
 * @file 头像
 * @author hurry
 * @date 2018/01/23
 */
import config from '../../config';

Component({
    // behaviors: [],
    properties: {
        /**
         * 包括：
         *  avatarUrl、nickName、province、level、appearanceFee
         */
        userInfo: {
            type: Object,
            observer: function (newVal) {
            }
        },
        isHiddenOtherInfo: {
            type: Boolean,
            value: true
        },
        // 是否隐藏
        isHidden: {
            type: Boolean,
            value: false,
            observer: function (newVal, oldVal) {} 
        },
        // 是否是发起者
        isMaker: {
            type: Boolean,
            value: false
        }
        // myProperty2: String // 简化的定义方式
    },
    // 私有数据，可用于模版渲染
    data: {
        animationData: {}
    }, 
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
    },
    moved: function () {},
    detached: function () {
    },
    methods: {
        // animation: function (offset) {
            
        // }
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