// pages/user/red-packet/write-account/index.js
import dg from '../../../../utils/dg.js';
import request from '../../../../utils/requestUtil.js';
import _DuoguanData, { duoguan_host_api_url as API_HOST } from '../../../../utils/data.js';
const baseUrl = API_HOST + '/index.php/addon/Wallet';

// import util from '../../../../utils/util.js';
import _ from '../../../../utils/underscore.js';
import listener from '../../../../utils/listener.js';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        picker_index: 0, // 所属银行
        telephone: '', // 手机号码
        bank_no: '', // 银行卡号
        true_name: '', // 真实姓名
        bank_code: '', // 银行code
        bank_name: '', // 银行名称
        from_page: '', // 来自哪个页面
        customer_service_phone: '', // 客服电话
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
            from_page: options.from_page || 'cash',
        })
        this.initialize(options);
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
     * 初始化
     */
    initialize: function (options) {
        let requestUrl = baseUrl + "/Api/getBankList";
        let requestData = {};
        request.get(requestUrl, requestData, (info) => {
            let index = 0;
            _(info['bank_list']).map((item, indexs) => {
                if (item['code'] == this.data.bank_code) index = indexs;
            })
            this.setData({
                ...info,
                bank_code: info['bank_list'][0]['code'],
                bank_name: info['bank_list'][0]['name'],
                picker_index: index
            });
        }, this, { isShowLoading: false });
    },

    /**
     * 选择所属银行
     */
    changeBankList: function (e) {
        let index = e.detail.value;
        const bank_list = this.data.bank_list;
        this.setData({
            picker_index: index,
            bank_code: bank_list[index]['code'], // 银行code
            bank_name: bank_list[index]['name'], // 银行名称
        })
    },

    /**
     * 输入银行卡号
     */
    inputBankNo: function (e) {
        let value = e.detail.value;
        this.setData({
            bank_no: value
        })
    },

    /**
     * 输入姓名
     * 
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
        values.bank_list = [];
        try {
            dg.setStorageSync('wallet_bank_list', values);
        } catch (e) {
            console.log('pages/user/red-packet/write-account/index'+'保存异常');
        }
        // 修改银行卡提现审核中的银行卡信息
        if (this.data.from_page == 'packet') {            
            this.updateBankCardInfo(values);
            return false;
        }
        listener.fireEventListener('wallet.choose.bank.account', [values]);
        dg.navigateBack({});
    },

    /**
     * 修改银行卡信息 
     */
    updateBankCardInfo: function (values) {
        let requestUrl = baseUrl + "/Api/updateBankCardInfo";
        let requestData = values;
        request.post(requestUrl, requestData, (res) => {
            if (res == true) {
                dg.alert("修改成功！", function (res) {
                    dg.navigateBack({});
                });
            }
        }, this, { isShowLoading: false });
    },

    /**
     * 返回
     */
    navigateBack: function (e) {
        listener.removeEventListener('wallet.choose.bank.account');
        dg.navigateBack({});
    },
    
})