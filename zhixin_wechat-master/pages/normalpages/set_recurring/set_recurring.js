// pages/normalpages/set_recurring/set_recurring.js
// 设置重复规则页面
import StorageUtils from '../../../utils/StorageUtils'

const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        weekVisual: [
            {id: 0, value: '日', longValue: "周日", name: "Sun", selected: false},
            {id: 1, value: '一', longValue: "周一", name: "Mon", selected: false},
            {id: 2, value: '二', longValue: "周二", name: "Tue", selected: false},
            {id: 3, value: '三', longValue: "周三", name: "Wed", selected: false},
            {id: 4, value: '四', longValue: "周四", name: "Thu", selected: false},
            {id: 5, value: '五', longValue: "周五", name: "Fri", selected: false},
            {id: 6, value: '六', longValue: "周六", name: "Sat", selected: false}
        ],

        selectedDateArray: [],
        selectedDateLongValue: []
    },

    initPageData: function () {
        let weekVisual = this.data.weekVisual;
        for (let item of weekVisual) {
            item.selected = app.tempData.recurringRule.includes(item.name);

        }

        this.setData({
            weekVisual: weekVisual
        });
    },

    /**
     * 核心函数
     * 响应周期列表点击，设置周期选中状态
     * @param e
     */
    onSelectDay: function (e) {
        let weekVisual = this.data.weekVisual;
        let selectedDateIdx = parseInt(e.currentTarget.id);

        // 高亮选中日期，提取选择日期
        for (let item of weekVisual) {
            if (item.id === selectedDateIdx) {
                item.selected = !item.selected;
            }
        }

        this.setData({
            weekVisual: weekVisual,
        });

    },

    /**
     * 确定，提取周期信息
     */
    onConfirm: function () {
        let weekVisual = this.data.weekVisual;
        let selectedDateArray = [];
        let selectedDateLongValue = [];

        // 提取选择日期
        for (let item of weekVisual) {
            if (item.selected) {
                selectedDateArray.push(item.name);
                selectedDateLongValue.push(item.longValue);
            }
        }

        app.tempData.recurringRule = selectedDateArray;
        console.log(app.tempData.recurringRule, selectedDateLongValue);
        wx.navigateBack({});
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.initPageData();
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
})