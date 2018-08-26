//app.js
import Auth from "utils/auth"
import API from "utils/api"

App({
    onLaunch: function(options) {
      console.log(options);
        // API.debugMode().then(res=>{
        //     let enable_debug = (res.debug)?true:false; 
        //     this.globalData.debug = res.debug;
        //     console.log(enable_debug);
        //     wx.setEnableDebug({
        //         enableDebug: enable_debug
        //     })
        // },err=>{
        //     console.log(err);
        // });
    },

    onShow: function(options) {
        this.globalData.userInfo = Auth.user();

        this.globalData.scene = options.scene;

        if (options.scene == 1044  && options.shareTicket) {
            this.globalData.shareTicket = options.shareTicket
        }

    },

    globalData: {
        debug: 0,
        userInfo: null,
        shareTicket: null,
        scene: 0,
        gid: 0,
        code: null,
        shareTicket: '',
    }
})