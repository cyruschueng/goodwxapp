// component/keyboard.js

const utils = require('../../utils/util.js')
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        boards: {
            type: Array,
            value: [''],
            // 属性更新后重置
            observer: function (ss) {
                this.setData({
                    boardsMatrix: [ss.slice(0, 9), ss.slice(9, 18), ss.slice(18)]

                })
            }
        },

    },

    /**
     * 组件的初始数据
     */
    data: {
        boardsMatrix: []
    },
    ready: function () {

        this.setData({
            boardsMatrix: [this.data.boards.slice(0, 9), this.data.boards.slice(9, 18), this.data.boards.slice(18)]
        })
    },

    /**
     * 组件的方法列表
     */
    methods: {

        log() {
            console.log('clicked')
        },
        // _clickHandle() {
        //   console.log('trigger event ')
        //   this.triggerEvent('randomKeyboard')
        // },
        _randomKeyBoard(detail) {
            console.log('random ++++   keyboard', detail.detail);
            this.triggerEvent('randomKeyboard', detail.detail)
        }
    }
})
