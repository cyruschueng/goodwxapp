//mall.js
// var _function = require('../../../utils/functionData');
import _ from '../../../utils/underscore';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import { urls } from '../../../utils/data';
import requestUtil from '../../../utils/requestUtil';
var app = getApp()
Page({
    data: {
        imgUrlPX: urls.hostUrl,
        cate_list: [],
        this_scroll_left_data: 0,
        this_item: 0,
        this_cate_id: 0,
        shop_quan_info: [],
        goods_list: [],
        hasMore: false,
        showLoading: false,
        isScrollY: true,
        this_page: 1,//当前页码
        pagesize: 10,//每页数量
        this_finish_page: 0,
        glo_is_load: true,
        search_view_show: false
    },
    //跳转商品详情
    detail: function (e) {
        wx.navigateTo({
            url: '../malldetail/malldetail?sid=' + e.currentTarget.id
        })
    },
    //跳转购物车
    mallcart: function () {
        wx.navigateTo({
            url: '../mallcart/mallcart'
        })
    },
    onLoad: function () {
        var that = this;
        //商品列表
        // 获取轮播和商品分类
        that.getSwiperAndGoodsCategoryAndGoodsList();
        //获取分享数据
        that.getShareInfo();

        listener.addEventListener('user.bind', this.onPullDownRefresh);
    },
    onUnload: function () {
        listener.removeEventListener('user.bind', this.onPullDownRefresh);
    },
    //获取分享数据
    getShareInfo: function () {
        //先隐藏分享按钮，等加载完数据之后再显示分享
        wx.hideShareMenu();
        //获取分享信息
        requestUtil.get(urls.public.share, { name: 'mall' }, (info) => {
            this.shareInfo = info;
            //显示分享按钮
            wx.showShareMenu();
        });
    },
    // 获取轮播和商品分类和商品列表
    getSwiperAndGoodsCategoryAndGoodsList: function () {
        var that = this;
        //获取轮播图
        requestUtil.get(urls.member.ad, { name: 'wx_mall' }, (data) => {
            that.setData({
                glo_is_load: false,
                swiperData: data
            })
        }, { completeAfter: this.aaa });
        //获取商品分类
        requestUtil.get(urls.shoping.goods.category, {}, (data) => {
            that.setData({
                cate_list: data,
            })
        }, { completeAfter: this.aaa });
        //获取商品列表
        that.getGoodsList();
    },
    //获取商品列表
    getGoodsList: function () {
        var that = this;
        //获取轮播图
        requestUtil.get(urls.shoping.goods.list, { p: that.data.this_page, cid: that.data.this_cate_id }, (data) => {
            console.log(data);
            if (that.data.this_page == 1) {
                //默认进来进来 或者刷新时调用
                that.data.goods_list.splice(0, that.data.goods_list.length);
                if (data.length > 0) {
                    that.data.goods_list = that.data.goods_list.concat(data);
                }
            }
            else {
                //加载更多数据
                if (data.length > 0) {
                    that.data.goods_list = that.data.goods_list.concat(data);
                }
            }
            that.data.this_page = that.data.this_page + 1;
            that.setData({
                goods_list: that.data.goods_list,
                showLoading: false
            })
        }, { completeAfter: this.aaa });
    },
    //选项卡操作 分类选择
    index_item_bind: function (e) {
        //获取分类id 然后动态加载所属分类商品
        var that = this
        var this_target = e.target.id;
        console.log(e.target.offsetLeft);
        that.setData({
            this_scroll_left_data: e.target.offsetLeft - 100,
            this_item: this_target,
            this_page: 1
        })
        var searchData = {};
        that.data.this_cate_id = this_target;
        that.data.this_page = 1;
        that.getGoodsList();
    },
    //下拉刷新
    onPullDownRefresh: function () {
        setTimeout(() => {
            wx.stopPullDownRefresh()
        }, 500)
        var that = this;
        console.log(this);
        that.data.this_page = 1;
        that.getSwiperAndGoodsCategoryAndGoodsList();


    },
    //上拉加载更多
    onReachBottom: function (e) {
        var that = this
        that.setData({
            showLoading: true
        })
        if (that.data.this_page > 1) {
            //加载更多数据
            that.getGoodsList();
        }
        else {
            //如果程序出错页面为1则不加载 防止重复第一页
            setTimeout(() => {
                this.setData({
                    showLoading: false,
                });
            }, 1000)
        }
    },
    //配置分享信息
    onShareAppMessage: function () {
        const title = this.shareInfo.title;
        const desc = this.shareInfo.description;
        return {
            title: title,
            desc: desc,
            path: 'pages/shop/mall/mall'
        };
    },
})