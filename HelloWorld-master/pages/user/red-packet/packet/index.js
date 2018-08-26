// pages/user/red-packet/index.js
import dg from '../../../../utils/dg.js';
import request from '../../../../utils/requestUtil.js';
import _DuoguanData, { duoguan_host_api_url as API_HOST } from '../../../../utils/data.js';
const baseUrl = API_HOST + '/index.php/addon/Wallet';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isAli: dg.os.isAlipay(),
        from_page: "", // 页面来源onShow时使用
        balance_money: 0.00, //福包余额
        redwallet_money: 0.00, // 红包福利
        min_cash_withdrawal_money: 0, // 最小提现金额（满多少才能提现的值）
        cash_withdrawal_money: 0, // 已提现金额
        canIUseCash: false, // 是否可以提现
        canIUseTransferMembershipCard: false, // 是否可以转入会员卡
        is_card_member: false, // 是否有会员卡
        showHasRecord: '', // 展示是否还有提现记录
        bankCardInfo: {}, // 对象不空时可以更新银行卡提现信息
        customer_service_phone: '', // 客服电话
        is_show_fenxiao_record: false, // 是否显示 分销 奖励记录
        feixiao_money: 0.00, // 分销奖励
        is_show_activity_promot_record: false, // 是否显示 活动推广 分享奖励记录
        activity_promot_money: 0, // 活动推广 奖励
        is_show_tuan_record: false, // 是否显示  拼团 佣金
        tuan_money: 0, // 拼团 佣金总额
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
        // 优化
        if (this.data.from_page == 'cash') {
            this.setData({ from_page: "" });
            (this.data.isAli ? my : wx).startPullDownRefresh({});  
        }
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
        this.setData({
            showHasRecord: "",
            bankCardInfo: {},
        })
        this.initialize({});
        dg.stopPullDownRefresh();
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
        let requestUrl = baseUrl + "/Api/index";
        let requestData = {};
        request.get(requestUrl, requestData, (info) => {
            this.setData({
                ...info,
            });
        }, this, { isShowLoading: false });
    },

    /**
     * 跳转页面（保留当前页）
     */
    navigateTo: function (e) {
        let path = e.currentTarget.dataset.path;
        let params = e.currentTarget.dataset.params;
        let url = path + params;
        dg.navigateTo({
            url: url,
        })
    },

    /**
     * 获取formId
     */
    fromSubmit: function (e) {
        let _this = this;
        let form_id = e.detail.formId || '';
        let typeName = e.detail.target.dataset.type;
        let options = [];
        if (typeName == 'card') { // 转入会员卡
            this.setData({ canIUseTransferMembershipCard: false }); // 设置转入会员卡的disabled
            options['form_id'] = form_id;
            dg.confirm("余额将全部转入会员卡！", function(res) {
                if (res.cancel) {
                    _this.setData({ canIUseTransferMembershipCard: true });
                } else if (res.confirm) {
                    _this.transferMembershipCard(options);
                }                
            },"温馨提示");
        } else if (typeName == 'cash') { // 我要提现
            this.setData({ from_page: 'cash' }); // 优化
            let url = '../cash/index';
            dg.navigateTo({ url: url});
        }
    },

    /**
     * 转入会员卡
     */
    transferMembershipCard: function (options) {
        let form_id = options.form_id || 0;

        let requestUrl = baseUrl + "/Api/transferMembershipCard";
        let requestData = { form_id: form_id, balance_money: this.data.balance_money};
        request.get(requestUrl, requestData, (info) => {
            if (info == true) {
                this.initialize({}); // 刷新数据
            } else {
                this.setData({ canIUseTransferMembershipCard: false });
            }
        }, this, { isShowLoading: false });
    },

    /**
     * 更新银行卡提现的银行卡信息
     */
    updateBankCardInfo: function (e) {
        let bankCardInfo = this.data.bankCardInfo;
        if (JSON.stringify(bankCardInfo) == "{}") {
            return false;
        } else {
            this.setData({ from_page: 'cash' }); // 返回之后下拉刷新
            let values = bankCardInfo;
            values['customer_service_phone'] = this.data.customer_service_phone; // 客服电话
            let path = "../write-account/index";
            let params = "?values=" + JSON.stringify(values) + "&from_page=packet";
            let url = path + params;
            dg.navigateTo({ url: url });
        }
    },
})