//setting.js
import StorageUtils from '../../../utils/StorageUtils'

const app = getApp();

Page({
    data: {
        userInfo: {},
        bottom_tabBar: app.bottom_tabBar,

        list: [
            {
                list_tool: [
                    {
                        img: "../../image/friend_64px.png",
                        name: "个人信息",
                        url: "../../normalpages/user/modify/modify"
                    },
                    // {
                    //     img: "../../image/writing_64px.png",
                    //     name: "切换角色",
                    //     url: "../../normalpages/set_role/set_role"
                    // },
                ]
            },
            {
                list_tool: [
                    {
                        img: "../../image/information_64px.png",
                        name: "已购服务",
                        url: "../../normalpages/set_notice/set_notice"
                    },
                    {
                        img: "../../image/information_64px.png",
                        name: "通知推送",
                        url: "../../normalpages/set_notice/set_notice"
                    },
                ]
            },
            {
                list_tool: [

                    {
                        img: "../../image/support_64px.png",
                        name: "关于知新",
                        url: "../../normalpages/about/about"
                    },
                    {
                        img: "../../image/settings_64px.png",
                        name: "软件设置",
                        url: "../../normalpages/config/config"
                    },
                    {
                        img: "../../image/support_64px.png",
                        name: "提点建议",
                        url: "../../normalpages/feedback/feedback"
                    }
                ]
            },
        ],
    },

    goToPage: function (event) {
        console.log("going to page: ", event.currentTarget.dataset.log);
        wx.navigateTo({
            url: event.currentTarget.dataset.url + "?model=fromSetting",
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        app.bottom_tabBar.changeTab();

        this.setData({
            bottom_tabBar: app.bottom_tabBar,
            userInfo: StorageUtils.loadUserInfo(),
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
});
