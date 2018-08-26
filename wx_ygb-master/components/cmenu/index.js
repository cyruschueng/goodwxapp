import * as utils from '../../utils/util'
var app = getApp();
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        isShowMenu: {
            type: Boolean,
            value: false
        },
        menuMoney: {
            type: Number,
            value: 0
        },
        icon: {
            type: String,
            value: ''
        },
        nickName: {
            type: String,
            value: ''
        },
        isFull: {
            type: Boolean,
            value: false
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        version:''
    },
    attached() {

        var { version } = wx.getExtConfigSync();
        this.setData({ version });

    },
    /**
     * 组件的方法列表
     */
    methods: {
        // showMenu() {
        //     this.setData({
        //         isShowMenu: true
        //     });

        //     app.getWatermark((watermark) => {
        //         api.getUserMoney(watermark, (res) => {
        //             var { money } = res.data;
        //             money = utils.toFixed(money);
        //             this.setData({
        //                 menuMoney: money
        //             });
        //         });
        //     });
        // },
        hideMenu() {
            this.setData({
                isShowMenu: false
            });
        },
        menuAddress() {
            // console.log(this.data)
            utils.wxAddress();
        },

        menuMyPrize() {
            wx.navigateTo({
                url: `/pages/myPrize/index`,
                success: () => {
                    this.hideMenu();
                }
            });
        },

        menuMyWallet() {
            wx.navigateTo({
                url: `/pages/myWallet/index`,
                success: () => {
                    this.hideMenu();
                }
            });
        },
        stopPropagation() {
            return;
        }
    }
})