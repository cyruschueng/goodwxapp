// pages/user/red-packet/cash-record/index.js
import dg from '../../../../utils/dg.js';
import request from '../../../../utils/requestUtil.js';
import _DuoguanData, { duoguan_host_api_url as API_HOST } from '../../../../utils/data.js';
const baseUrl = API_HOST + '/index.php/addon/Wallet';

// import util from '../../../../utils/util.js';
import _ from '../../../../utils/underscore.js';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        listUrl: '/Api/record',
        search: [{ name: "type", value: "cash_withdrawal_record" }],
        list: [],
        pageNumber: 1, // 分页参数
        pageSize: 20,
        hasMore: true,
        isShowLoading: true,
        nodata: false, // 暂无数据
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
            list: [],
            pageNumber: 1,
            pageSize: 20,
            hasMore: true,
            isShowLoading: false,
            search: [{ name: "type", value: "redwallet_record" }],
        })
        let options = {}
        this.initialize(options);
        dg.stopPullDownRefresh();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        // 需要分页的调用
        let options = {
            pageNumber: this.data.pageNumber,
            pageSize: this.data.pageSize,
            hasMore: this.data.hasMore,
            url: this.data.listUrl,
            search: this.getSearch(),
        }
        this.reachBottom(options)
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
        // 需要分页的调用
        options = {
            pageNumber: 1,
            pageSize: this.data.pageSize,
            hasMore: true,
            url: this.data.listUrl,
            search: this.getSearch(),
        }
        this.reachBottom(options)
    },

    /**
     * 触底分页加载的通用方法
     */
    reachBottom: function (options) {
        if (!options.hasMore) {
            this.setData({ isShowLoading: false })
            return false
        }
        let requestUrl = baseUrl + options.url
        let requestData = { _p: options.pageNumber, _r: options.pageSize, search: options.search }
        request.get(requestUrl, requestData, (data) => {
            let orginData = this.data.list
            data = data || []
            if (data.length != 0) {
                _(data).map((item) => {
                    if (item.status == 0) { // 待审核 灰色
                        item.status_text_class = 'grey';
                    } else if (item.status == 1) { // 已提现 绿色
                        item.status_text_class = 'green';
                    } else if (item.status == 2) { // 已拒绝 红色
                        item.status_text_class = 'red';
                    } else {
                        item.status_text_class = 'grey';
                    }
                })
            }
            orginData = (options.pageNumber == 1) ? (data || []) : orginData.concat(data || [])
            this.setData({
                isShowLoading: false,
                hasMore: (data.length < this.data.pageSize) ? false : true,
                pageNumber: options.pageNumber + 1,
                list: orginData,
                nodata: orginData.length == 0 ? false : true,
            })
        }, this, { isShowLoading: this.data.isShowLoading })
    },

    /**
     * 获取搜索条件
     */
    getSearch: function () {
        return this.data.search;
    },

})