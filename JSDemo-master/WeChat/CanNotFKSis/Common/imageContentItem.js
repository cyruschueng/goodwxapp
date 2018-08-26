// Common/imageContentItem.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        image: {
            type: String,
            value: '',
        },
        content: String,
        showNext: {
            type: Boolean,
            value: false
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        nextImage:'../image/share.png'
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onClicked: function (e) {
            console.log('组件自带事件')
            console.log(e.detail)
            var myEventDetail = {}
            var myOptionDetail = {}
            this.triggerEvent('')
        }
    }
})
