// components/dialog/dialog.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // 弹窗标题
        // title: { // 属性名
        //     type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
        //     value: '标题' // 属性初始值（可选），如果未指定则会根据类型选择一个
        // },
        // 弹窗内容
        content: {
            type: String,
            value: '弹窗内容'
        },
        // 弹窗取消按钮文字
        // cancelText: {
        //     type: String,
        //     value: '取消'
        // },
        // 弹窗确认按钮文字
        // confirmText: {
        //     type: String,
        //     value: '确定'
        // }
    },

    /**
     * 组件的初始数据
     */

    data: {
        isShow: false,
    },

    /**
     * 组件的方法列表
     */

    methods: {
        toggleSharePopup:function(){
          this.triggerEvent("toggleSharePopup")
        },
        shareToChats: function() {

            this.triggerEvent("shareToChats")
        },
        shareToMoments: function() {

            this.triggerEvent("shareToMoments")
        },

        toggleShowDialog() {
            this.triggerEvent("showSharebutton")

        },
        stop(){
          
        }
        /*
         * 内部私有方法建议以下划线开头
         * triggerEvent 用于触发事件
         */
       
    }
})