// pages/severs/jubao.js
import _ from '../../../utils/underscore';
import requestUtil from '../../../utils/requestUtil';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import baseList from '../base-list';
import urls from '../urls';

Page({
    /**
     * 文档标识
     */
    docId: 0,
    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad (options) {
        this.docId = options.id;
    },
    /**
     * 提交数据源
     */
    onPushSubmit (e) {
        if (requestUtil.isLoading(this.pushRQId)) return;

        const values = _.extend({
            form_id: e.detail.formId,
            doc_id: this.docId,
        }, e.detail.value);

        this.pushRQId = requestUtil.post(urls.document.jubao, values, () => {
            wx.showModal({
                title: '温馨提示',
                content: '已举报，抵制不良信息还我一个干净的世界！',
                showCancel: false,
                success () {
                    wx.navigateBack();
                }
            });

        });
    }
})