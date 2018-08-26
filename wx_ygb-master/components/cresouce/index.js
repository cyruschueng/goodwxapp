// components/cresouce/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        message: {
            type: String,
            value: ''
        },
        nickName:{
            type: String,
            value:''
        },
        icon:{
            type: String,
            value: ''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onShare(){
            this.triggerEvent('onShare')
        }
    }
})