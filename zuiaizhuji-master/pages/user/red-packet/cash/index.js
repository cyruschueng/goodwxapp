// pages/user/red-packet/cash/index.js
import dg from '../../../../utils/dg'; const isAli = dg.os.isAlipay();
import request from '../../../../utils/requestUtil';
import _DuoguanData, { duoguan_host_api_url as API_HOST } from '../../../../utils/data';
const baseUrl = API_HOST + '/index.php/addon/Wallet';

import listener from '../../../../utils/listener';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        balance_money: 0.00, //福包余额
        telephone: '', // 手机号码
        bank_no: '', // 银行卡号
        true_name: '', // 真实姓名
        bank_code: '', // 银行code
        bank_name: '', // 银行名称
        canIUseCash: false, // 是否可以申请提现
        is_use_bank: false, // 提现
        is_use_app_balance: false, // 提现到余额
        app_user_name: '', // APP用户昵称
        cash_type: 0, // 提现类型：0为银行卡，1为APP余额
        is_show_confirm: false, // 是否展示关闭提示弹框
        confirm_content: '', // 提示弹框内容
        // showHasRecord: '', // 展示是否还有提现记录
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

        try {
            let values = dg.getStorageSync('wallet_bank_list')
            if (values) {
                this.setData({
                    ...values
                })
            }
        } catch (e) {
            // Do something when catch error
        }

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
        let requestUrl = baseUrl + "/Api/cashWithdrawal";
        let requestData = {};
        request.get(requestUrl, requestData, (info) => {
            this.setData({
                ...info,
            });
            if (this.data.is_show_confirm) {
                dg.alert(this.data.confirm_content, function () {}, '温馨提示');
            }
        }, this, { isShowLoading: false });
    },

    /**
     * 选择账号
     */
    chooseAccount: function (e) {
        let that = this;
        if (this.data.is_use_bank == false && this.data.is_use_app_balance == false) {
            dg.alert("后台未设置提现信息");
        } else if (this.data.is_use_bank == true && this.data.is_use_app_balance == true) {
            let app_name = "微信余额";
            if (isAli) app_name = "支付宝余额";
            
            let dgTemp = wx;
            if (isAli) dgTemp = my;
            /**
             * @date 2017-12-29
             * @author Hehe
             * 未兼容 showActionSheet API
             */
            if (isAli) { // 支付宝
                my.showActionSheet({
                    items: ['请选择提现方式', app_name, '银行卡'],
                    success: function (res) {
                        if (res.index == 1) {
                            that.setData({ cash_type: 1 });
                            that.writeMobile(that);
                        } else if (res.index == 2) {
                            that.setData({ cash_type: 0 });
                            that.writeBankAccount(that);
                        }
                    }
                })
            } else { // 微信
                wx.showActionSheet({
                    itemList: ['请选择提现方式', app_name, '银行卡'],
                    success: function (res) {
                        if (res.tapIndex == 1) {
                            that.setData({ cash_type: 1 });
                            that.writeMobile(that);
                        } else if (res.tapIndex == 2) {
                            that.setData({ cash_type: 0 });
                            that.writeBankAccount(that);
                        }
                    }
                })
            }
        } else if (this.data.is_use_bank == true) {
            that.writeBankAccount(that);
        } else if (this.data.is_use_app_balance == true) {
            // 转入APP余额中
            that.writeMobile(that);
        }
        return false;
    },

    /**
     * 填写银行卡号
     */
    writeBankAccount: (that)=>{
        listener.addEventListener('wallet.choose.bank.account', (res) => {
            if (res.length != 0) {
                that.setData({
                    ...res,
                })
            }
        });
        const data = that.data;
        let values = {
            telephone: data.telephone,
            bank_no: data.bank_no,
            true_name: data.true_name,
            bank_code: data.bank_code,
            bank_name: data.bank_name,
        };
        dg.navigateTo({
            url: '../write-account/index?values=' + JSON.stringify(values),
        })
    },

    /**
     * 填写手机号码
     */
    writeMobile: (that)=>{
        listener.addEventListener('wallet.write.mobile', (res) => {
            if (res.length != 0) {
                that.setData({
                    ...res,
                })
            }
        });
        dg.navigateTo({
            url: '../write-mobile/index?values=' + JSON.stringify({ telephone: that.data.telephone, true_name: that.data.true_name }),
        })
    },

    /**
     * 申请提现
     */
    formSubmit: function (e) {
        let values = this.data;
        values['form_id'] = e.detail.formId || "";
        values['cash_type'] = this.data.cash_type;
        let requestUrl = baseUrl + "/Api/cashWithdrawal";
        let requestData = values;
        request.post(requestUrl, requestData, (info) => {
            if (info.id > 0) {
                dg.navigateTo({
                    url: '../cash-waiting/index',
                })
            } else {
                dg.startPullDownRefresh();
            }
        }, this, { isShowLoading: false });
    }
})