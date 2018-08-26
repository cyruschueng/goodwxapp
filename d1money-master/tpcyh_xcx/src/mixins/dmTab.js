import wepy from 'wepy'

export default class extends wepy.mixin {
    data = {
        item:'ssss'
    }

    methods = {
        selectItem() {
            // console.log('啊哈哈哈');
        }
    }

    onShow() {
        // console.log('1111')
    }

    onLoad() {
        // console.log('222')
    }
}
