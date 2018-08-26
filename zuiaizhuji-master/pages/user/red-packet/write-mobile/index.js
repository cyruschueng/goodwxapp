// pages/user/red-packet/write-mobile/index.js
import dg from '../../../../utils/dg';
import listener from '../../../../utils/listener';
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 设置导航条颜色
        dg.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#f35150',
            animation: {
                duration: 100,
                timingFunc: 'ease'
            }
        })
        const values = JSON.parse(options.values);
        this.setData({
            ...values,
        })
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
    // onShareAppMessage: function () {

    // },

    /**
     * 输入姓名
     */
    inputTrueName: function (e) {
        let value = e.detail.value;
        this.setData({
            true_name: value
        })
    },

    /**
     * 输入手机号码
     */
    inputTelephone: function (e) {
        let value = e.detail.value;
        this.setData({
            telephone: value
        })
    },

    /**
     * 保存
     */
    formSubmit: function (e) {
        let values = this.data;
        listener.fireEventListener('wallet.write.mobile', [values]);
        dg.navigateBack({});
    },

    /**
     * 返回
     */
    navigateBack: function (e) {
        listener.removeEventListener('wallet.write.mobile');
        dg.navigateBack({});
    },
})