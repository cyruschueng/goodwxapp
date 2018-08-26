const app = getApp();
import _ from '../../../../utils/underscore';
import util from '../../../../utils/util';
import listener from '../../../../utils/listener';
import { urls } from '../../../../utils/data';
import requestUtil from '../../../../utils/requestUtil';

Page({
    data: {
        imgUrlPX: urls.hostUrl,
        postlist: [],
        orderlist:[],
        this_weiba_id: 0,
        hasMore: false,
        showLoading: false,
        isScrollY: true,
        this_page: 1,//当前页码
        pagesize: 10,//每页数量
        this_nav_name: 'index',
        this_is_jinghua: 0,
        this_finish_page: 0,
        glo_is_load: true
    },
    //订单详情
    user_orderinfo_bind: function (e) {
        var oid = e.currentTarget.id;
        wx.navigateTo({
            url: '../info/index?oid=' + oid
        })
        //        wx.navigateTo({
        //     url: '../comment/index?oid=' + oid
        // })
    },
    //删除订单
    delete_user_order: function (e) {
        var that = this
        var oid = e.currentTarget.id;
        wx.showModal({
            title: '提示',
            content: "确认要删除该订单吗?",
            success: function (res) {
                if (res.confirm == true) {
                    requestUtil.get(urls.shoping.order.delete,{id:oid}, (data) => {
                        //获取订单列表
                        that.getOrderList();
                    }, { completeAfter: that.aaa });
                }
            }
        })
    },
    onShow: function () {
        var that = this
        that.setData({
            this_page: 1
        })
        //获取订单列表
        that.getOrderList();
    },
    //获取订单列表
    getOrderList: function () {
        var that=this;
        requestUtil.get(urls.shoping.order.list, {p:that.data.this_page}, (data) => {
      if (that.data.this_page == 1) {
        //默认进来进来 或者刷新时调用
        that.data.orderlist.splice(0, that.data.orderlist.length);
        if (data.length > 0) {
          that.data.orderlist = that.data.orderlist.concat(data);
        }
      }
      else {
        //加载更多数据
        if (data.length > 0) {
          that.data.orderlist = that.data.orderlist.concat(data);
        }
      }
      that.data.this_page = that.data.this_page + 1;

            that.setData({
                orderlist: that.data.orderlist,
                glo_is_load: false,
                 showLoading: false
            })
        }, { completeAfter: that.aaa });
    },
    //下拉刷新
    onPullDownRefresh: function () {
        var that = this
        that.data.this_page=1;
        setTimeout(() => {
            wx.stopPullDownRefresh()
        }, 1000)
          that.getOrderList();
    },
    //滚动加载
    indexscrolltolower: function () {
        var that = this
        var this_target = this.data.this_items
        if (that.data.this_finish_page != that.data.this_page) {
            // _function.getUserOrderList(wx.getStorageSync("utoken"), that.data.this_page + 1, that.data.pagesize, that.initUserOrderListLoadData, this)
                //获取订单列表
      
        }
    },
    initUserOrderListLoadData: function (data) {
        var that = this
        if (data.info == null) {
            that.setData({
                isScrollY: false,
                showLoading: false
            })
        } else {
            if (data.info.length >= that.data.pagesize) {
                that.setData({
                    isScrollY: true,
                    showLoading: true
                })
            } else {
                that.setData({
                    isScrollY: false,
                    showLoading: false
                })
            }
            that.setData({
                postlist: that.data.postlist.concat(data.info),
                this_page: that.data.this_page + 1
            })
        }
        that.setData({
            this_finish_page: that.this_finish_page + 1
        })
    },
    onReachBottom: function (e) {
        var that = this
         that.setData({
      showLoading: true
    })
    if (that.data.this_page > 1) {
      //加载更多数据
      that.getOrderList();
    }
    else {
      //如果程序出错页面为1则不加载 防止重复第一页
      setTimeout(() => {
        this.setData({
          showLoading: false,
        });
      }, 1000)
    }
    }
})