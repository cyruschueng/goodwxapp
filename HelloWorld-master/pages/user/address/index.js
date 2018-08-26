// pages/user/address/index.js
import dg from '../../../utils/dg.js'; const isAli = dg.os.isAlipay();
import request from '../../../utils/requestUtil.js';
import _DuoguanData, { duoguan_host_api_url as API_HOST } from '../../../utils/data.js';
const baseUrl = API_HOST + '/index.php/addon/DuoguanUser';

import $ from '../../../utils/underscore.js';
import listener from '../../../utils/listener.js';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isAli: true, // 是否为ali小程序，默认为是
        isCallback: false, // 是否为回调页面，默认为否 
        showPage: 'list', // list列表 form表单
        // 列表页面使用的数据
        listUrl: '/AddressApi/info',
        list: [],
        pageNumber: 1, // 分页参数
        pageSize: 20,
        hasMore: true,
        isShowLoading: false,
        // form表单使用的数据
        buttonIsDisabled: false,
        url: '/AddressApi/info',
        id: 0, // 默认为0表示添加操作
        label: 1,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            isAli: dg.os.isAlipay(), // 小程序类型
            isCallback: (typeof (options.isCallback) != "undefined") ? true : false,
        });

        this.setPageTitle('list');
        
        this.initialize(options);
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
        // 防止表单页面下拉刷新数据
        if (this.data.showPage == 'form') {
            dg.stopPullDownRefresh();
            return false;
        }

        this.setData({
            list: [],
            pageNumber: 1
        })

        let options = {}
        let search = {}
        // 需要分页的调用
        options = {
            pageNumber: 1,
            pageSize: this.data.pageSize,
            hasMore: true,
            url: this.data.listUrl,
            search: search,
        }
        this.reachBottom(options)
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let options = {}
        let search = {}
        // 需要分页的调用
        options = {
            pageNumber: this.data.pageNumber,
            pageSize: this.data.pageSize,
            hasMore: this.data.hasMore,
            url: this.data.listUrl,
            search: search,
        }
        this.reachBottom(options)
    },

    /**
     * 用户点击右上角分享
     */
    //   onShareAppMessage: function () {

    //   },

    // 以下为列表页面使用的方法

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
            search: [],
        }
        this.reachBottom(options)
    },

    /**
     * 触底分页
     */
    reachBottom: function (options) {
        // 分页加载通用模版
        if (!options.hasMore) {
            this.setData({ isShowLoading: false })
            dg.stopPullDownRefresh();
            return false
        }
        let requestUrl = baseUrl + options.url
        let requestData = { _p: options.pageNumber, _r: options.pageSize, search: options.search }
        request.get(requestUrl, requestData, (data) => {
            let orginData = this.data.list
            data = data || []
            if (data.length != 0) {
                $(data).map((item) => {
                    // 数据处理
                    return item
                })
            }
            orginData = (options.pageNumber == 1) ? (data || []) : orginData.concat(data || []);
            // 调整默认地址在最上面
            orginData = $(orginData).sortBy(function(item){
                return -item.is_default;
            })
            this.setData({
                isShowLoading: false,
                hasMore: (data.length < this.data.pageSize) ? false : true,
                pageNumber: options.pageNumber + 1,
                list: orginData,
                nodata: orginData.length == 0 ? false : true,
            })
        }, this, {
            isShowLoading: false,
            completeAfter: (e) => {
                dg.stopPullDownRefresh();
            }
        })
    },

    /**
     * 处理苹果手机 下拉刷新失败的情况
     */
    refresh: function() {
        this.setData({
            list: [],
            pageNumber: 1
        })

        let options = {}
        let search = {}
        // 需要分页的调用
        options = {
            pageNumber: 1,
            pageSize: this.data.pageSize,
            hasMore: true,
            url: this.data.listUrl,
            search: search,
        }
        this.reachBottom(options)
    },

    /**
     * 其它模块选择地址
     */
    radioChange: function (e) {
        const index = e.detail.value;
        const item = this.data.list[index];
        if (this.data.isCallback) { // 回调
            listener.fireEventListener('address.choose.confirm', [item]);
            dg.navigateBack();
        } else { // 设为默认地址
            let id = item.id;
            let requestUrl = baseUrl + "/AddressApi/setDefaultAddress";
            let requestData = {id: id};
            request.get(requestUrl, requestData, (info) => {
                this.refresh(); // 模拟下拉刷新
            }, this, { isShowLoading: false });
            return false;
        }
    },

    /**
     * 新增
     */
    add: function (e) {
        this.setPageTitle('add');

        this.setData({
            showPage: 'form',
            id: 0,
            name: '',
            gender: 1,
            mobile: '',
            address: '',
            detail_info: '',
            label: 1,
            postcode: '',
        })
        let requestUrl = baseUrl + "/RegionApi/info"
        let requestData = {}
        request.get(requestUrl, requestData, (info) => {
            this.setData({
                ...info,
                province_index: 0,
                city_index: 0,
                area_index: 0,
            })
        }, this)
    },

    /**
     * 编辑
     */
    edit: function (e) {
        this.setPageTitle('edit');

        let id = e.currentTarget.dataset.id;
        this.setData({
            showPage: 'form',
            id: id,
        })
        let values = { id: id }
        let requestUrl = baseUrl + this.data.url
        let requestData = values
        request.get(requestUrl, requestData, (info) => {
            // 省份选择
            info.province_index = 0;
            $(info.province_list).map((item, index)=>{
                if (item.id == info.province_id) info.province_index = index;
                return item
            })
            // 城市选择
            info.city_index = 0;
            $(info.city_list).map((item, index) => {
                if (item.id == info.city_id) info.city_index = index;
                return item
            })
            // 区域选择
            info.area_index = 0;
            $(info.area_list).map((item, index) => {
                if (item.id == info.area_id) info.area_index = index;
                return item
            })

            this.setData({
                ...info,
            })
        }, this)
    },

    // 以下为表单页面使用的方法

    /**
     * 选择App的收货地址
     * 
     * @date 2017-12-29
     * @todo 支付宝小程序此时没有相应的接口
     */
    chooseAppAddress: function (e) {
        let _this = this;
        wx.chooseAddress({
            success: function (res) {
                let item = {
                    name: res.userName,
                    mobile: res.telNumber,
                    postcode: res.postalCode,
                    address: res.provinceName + res.cityName + res.countyName,
                    all_address: res.provinceName + res.cityName + res.countyName + res.detailInfo,
                    detail_info: res.detailInfo
                };
                if (_this.data.isCallback) {
                    listener.fireEventListener('address.choose.confirm', [item]);
                    dg.navigateBack();
                }
            },
            fail: function(res) {
                if (res.errMsg.indexOf('deny') !== -1) {
                    dg.confirm("是否重新授权获取通讯地址？", function(res){
                        if (res.confirm) {
                            wx.openSetting({});                            
                        }
                    }, '授权失败');
                }
            }
        })
    },

    /**
     * 取消
     */
    cancel: function (e) {
        this.setPageTitle('list');

        this.setData({
            showPage: 'list',
            id: 0,
        })
    },

    /**
     * 删除
     */
    remove: function (e) {
        let _this = this;
        let id = e.currentTarget.dataset.id;
        dg.confirm("确定要删除收货地址吗？", function (res) { 
            if (res.confirm) {
                _this.deleting(id)
            }
        }, '删除提示');
    },

    /**
     * 删除请求
     */
    deleting: function (id) {
        let values = [];
        values['id'] = id;
        values['request_method'] = "DELETE"; // 删除请求

        this.setData({
            buttonIsDisabled: true,
        })
        let requestUrl = baseUrl + this.data.url;
        let requestData = values;
        request.get(requestUrl, requestData, (info) => {
            // 不做处理
            let data = data;
            // 提交是否成功
            if (data == "success") {
                dg.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 2000,
                })
            }
            this.setData({
                showPage: 'list',
                buttonIsDisabled: false,
                id: 0,
                name: '',
                gender: 1,
                mobile: '',
                address: '',
                detail_info: '',
                label: 1,
                postcode: '',
            })

            this.refresh(); // 模拟下拉刷新
        }, this, {isShowLoading: false});
    },

    /**
    * 选择性别
    */
    chooseGender: function (e) {
        let gender = e.currentTarget.dataset.gender || 1;
        this.setData({
            gender: gender
        })
    },

    /**
     * 选择地址标签
     */
    chooseLabel: function (e) {
        let label = e.currentTarget.dataset.label || 1;
        this.setData({
            label: label
        })
    },

    /**
     * 设置当前页面的标题
     */
    setPageTitle: function (type) {
        let title = "";
        if (type == 'add') {
            title = "新增收货地址";
        } else if (type == 'edit') {
            title = "编辑收货地址";
        } else if (type == 'list') {
            title = this.data.isCallback ? "选择收货地址" : "我的地址";
        }

        dg.setNavigationBarTitle({ title: title });
    },

    /**
     * form表单提交
     */
    formSubmit: function (e) {
        let values = e.detail.value;
        values.gender = this.data.gender;
        values.label = this.data.label;
        values.province_id = this.data.province_list[this.data.province_index]["id"];
        values.city_id = this.data.city_list[this.data.city_index]["id"];
        values.area_id = this.data.area_list[this.data.area_index]["id"];

        if (this.data.id == 0) { // 添加操作
            values.request_method = "POST";
        } else { // 编辑操作
            values.request_method = "PUT";
            values.id = this.data.id;
        }

        this.setData({
            buttonIsDisabled: true,
        })

        let requestUrl = baseUrl + this.data.url
        let requestData = values
        request.post(requestUrl, requestData, (info) => {
            // 不做处理
            let data = info;
            // 提交是否成功
            if (data.length == 0) {
                this.setData({
                    buttonIsDisabled: false,
                })
                return false;
            } else {
                dg.showToast({
                    title: '提交成功',
                    icon: 'success',
                    duration: 2000,
                })
                this.setData({
                    showPage: 'list',
                    id: 0,
                    buttonIsDisabled: false,
                })

                this.refresh(); // 模拟下拉刷新
            }
        }, this, {isShowLoading: false});
    },

    /**
     * 选择省份
     */
    selectRegionProvince: function (e) {
        let value = e.detail.value;
        let id = this.data.province_list[value]['id'];
        let requestUrl = baseUrl + '/RegionApi/getCityParam';
        let requestUrlData = { id: id };
        request.get(requestUrl, requestUrlData, (params) => {
            this.setData({
                ...params,
                province_index: value, 
            })
        }, this, {
            isShowLoading: false, completeAfter: (data) => {
                let e = { detail: { value: 0 } };
                this.selectRegionCity(e);
            }
        })
    },

    /**
     * 选择城市
     */
    selectRegionCity: function (e) {
        let value = e.detail.value;
        let id = this.data.city_list[value]['id'];
        let requestUrl = baseUrl + '/RegionApi/getAreaParam';
        let requestUrlData = { id: id };
        request.get(requestUrl, requestUrlData, (params) => {
            this.setData({
                ...params,
                city_index: value,
            })
        }, this, {
            isShowLoading: false, completeAfter: (data) => {
                let e = { detail: { value: 0 } };
                this.selectRegionArea(e);
            }
        })
    },

    /**
     * 选择城市区域
     */
    selectRegionArea: function (e) {
        let value = e.detail.value;
        let id = this.data.area_list[value]['id'];
        this.setData({
            area_index: value,
        });
    },
})