// app.js
// 小程序入口

import NetWork from './utils/Network'
import TabBar from '/pages/common/BottomTabBar.js'

App({
    onLaunch: function (options) {
        console.log("App.onLoad");

        console.log("App.onLoad, options:", options);

        // 判断入口
        // if (options.scene === 1044) {
        //     wx.getShareInfo({
        //         shareTicket: options.shareTicket,
        //         success: function (res) {
        //             console.log("from share, res:", res);
        //             let encryptedData = res.encryptedData;
        //             let iv = res.iv;
        //         }
        //     })
        // }

        // 登录，同步用户数据
        NetWork.syncUserInfo(this);


    },

    onShow: function () {
        console.log("App.onShow");
    },

    bottom_tabBar: new TabBar.BottomTabBar(),

    currentAuth: "",

    // 定义全局变量
    tempData: {
        unionId: "",
        currentCourseSubTab: "all_course",
        recurringRule: [],
        location: {}
    },

    globalData: {
        // 定义一些全局变量，在页面跳转的时候判断，方便其他的JS通过app调用

    }
})