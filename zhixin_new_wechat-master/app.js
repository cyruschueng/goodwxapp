// app.js
// 小程序入口

import SyncUtils from './utils/SyncUtils'
import StroageUtils from './utils/StorageUtils'
import TabBar from '/pages/common/BottomTabBar.js'

App({
    onLaunch: function (options) {
        let version = "v0.0.14, modify " + 1;
        console.log("App version is:", version);

        // 打印一下当前存储使用量，方便后期观察
        wx.getStorageInfo({
            success: function (res) {
                console.log("App.onLoad, localStorage key:", res.keys);
                console.log("App.onLoad, localStorage currentSize:", res.currentSize);
                console.log("App.onLoad, localStorage limitSize:", res.limitSize);
            }
        });

        console.log("App.onLoad, options:", options);

        // 判断入口
        if (options.scene === 1044 || options.scene === 1007) {
            // 如果从分享进来，先看课程，愿意加入，再去判断是否注册
            wx.getShareInfo({
                shareTicket: options.shareTicket,
                success: function (res) {
                    console.log("from share, res:", res);
                    let encryptedData = res.encryptedData;
                    let iv = res.iv;
                }
            });
        } else {
            // 登录，同步用户数据
            SyncUtils.syncUserInfo(false);
            this.loadTab();
        }

    },

    onShow: function () {
        console.log("App.onShow");

    },

    loadTab: function () {
        this.bottom_tabBar = new TabBar.BottomTabBar();
        if (this.bottom_tabBar.list.length > 1) {
            wx.redirectTo({
                url: this.bottom_tabBar.list[0].pagePath,
            });
        }

    },

    bottom_tabBar: new TabBar.BottomTabBar(),

    currentAuth: "",

    userInfo: {},

    // 定义全局变量
    tempData: {
        unionId: "",
        currentCourseSubTab: "all_course",
        recurringRule: [],
        request_header: {},
        location: {}
    },

    joinCourse: {
        currentRole: "", //当前以什么身份加入
        courseId: "",
        course: {},
        nextPageUrl: ""
    },

    globalData: {
        // 定义一些全局变量，在页面跳转的时候判断，方便其他的JS通过app调用

    }
})