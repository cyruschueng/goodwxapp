//app.js
import Auth from "utils/auth"
import API from "utils/api"

App({
    onLaunch: function(options) {},

    onShow: function(options) {
        this.globalData.scene = options.scene

        if (options.scene == 1044) {
            this.globalData.shareTicket = options.shareTicket
        }

    },



    globalData: {
        userInfo: null,
        shareTicket: null,
        scene: 0,
        gid: 0,
        code: null,
        INVALID_TOKEN: 'illegal_access_token',
        shareTicket: '',
        deviceInfo: null,
        API_HOST: 'https://apple110.wpweixin.com',

    }
})