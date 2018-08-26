const app = getApp();
import _ from '../../../utils/underscore';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import { urls } from '../../../utils/data';
import requestUtil from '../../../utils/requestUtil';
var WxParse = require('../../../wxParse/wxParse.js');

Page({
    data: {
        imgUrlPX: urls.hostUrl,
        goods_info: [],
        goods_specification: [],
        wxParseData: '',
        shop_config: [],
        this_goods_id: 0,
        this_g_nav: 1,
        is_add_cart_view: false,
        cart_default_number: 1,
        goods_attr_select: {},
        btn_add_cart_disabled: false,
        glo_is_load: true,
        indicatorDots: false,
        this_page: 1,//当前页码
        comment_list: [],
        swiperCurrent: 0,
    },
    swiperChange: function (e) {
        this.setData({
            swiperCurrent: e.detail.current
        })
    },
    onLoad: function (options) {
        var that = this
        var post_id = options.sid;
        that.data.this_goods_id = post_id;
        //请求商品详情
        that.getGoodsInfo();
        //获取分享数据
        that.getShareInfo();
        that.getCommentList();
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
    getGoodsInfo: function () {
        var that = this;
        //请求商品详情
        requestUtil.get(urls.shoping.goods.info, { id: that.data.this_goods_id }, (data) => {
            that.setData({
                glo_is_load: false,
                goods_info: data
            })
            var handler = {
                setData: (bindData) => {
                    _.each(bindData.content.images, (item, index) => {
                        if (item.attr.src.indexOf('http') !== 0) {
                            item.attr.src = urls.hostUrl + item.attr.src;
                            bindData.content.imageUrls[index] = item.attr.src;
                        }
                    });
                    console.log(bindData);
                    this.setData(bindData);
                }
            };
            WxParse.wxParse('content', 'html', data.content, handler, 0)
            this.wxParseImgLoad = handler.wxParseImgLoad;
            this.wxParseImgTap = handler.wxParseImgTap;

        }, { completeAfter: this.aaa });

    },
    getCommentList: function () {
        var that = this;
        //获取商品评论
        requestUtil.get(urls.shoping.goods.comment, { goods_id: that.data.this_goods_id, p: that.data.this_page }, (data) => {
            for (var i = 0; i < data.length; i++) {
                data[i]['addtime'] = util.formatSmartTime(parseInt(data[i]['create_time']) * 1000);
            }
            if (that.data.this_page == 1) {
                //默认进来进来 或者刷新时调用
                that.data.comment_list.splice(0, that.data.comment_list.length);
                if (data.length > 0) {
                    that.data.comment_list = that.data.comment_list.concat(data);
                }
            }
            else {
                //加载更多数据
                if (data.length > 0) {
                    that.data.comment_list = that.data.comment_list.concat(data);
                }
            }
            that.data.this_page = that.data.this_page + 1;

            that.setData({
                commentList: that.data.comment_list,
                showLoading: false
            })
            WxParse.wxParse('article', 'html', data.content, that, 0)
        }, { completeAfter: this.aaa });
    },
    //选项卡 商品详情 评论 
    goods_nav_bind: function (e) {
        var that = this
        var this_target = e.target.id;
        that.setData({
            this_g_nav: this_target
        })
    },
    //加入购物车
    bind_goods_add_cart: function () {
        var that = this
        that.setData({
            is_add_cart_view: true
        })
    },
    //隐藏购物车
    add_cart_close_bind: function () {
        var that = this
        that.setData({
            is_add_cart_view: false
        })
    },
    //减少数量
    bind_cart_number_jian: function () {
        var that = this
        var this_default_number = parseInt(that.data.cart_default_number)
        if (this_default_number > 1) {
            that.setData({
                cart_default_number: this_default_number - 1
            })
        } else {
            that.setData({
                cart_default_number: 1
            })
        }
    },
    //增加数量
    bind_cart_number_jia: function () {
        var that = this
        var this_default_number = parseInt(that.data.cart_default_number)
        that.setData({
            cart_default_number: this_default_number + 1
        })
    },
    //加入购物车
    goods_add_cart: function () {
        var that = this;
        that.setData({
            btn_add_cart_disabled: true
        });

        var that = this;
        //添加购物车
        requestUtil.get(urls.shoping.cart.add, { goods_id: that.data.this_goods_id, num: that.data.cart_default_number }, (data) => {
            wx.showModal({
                title: '提示',
                content: "添加购物车成功! 点确定进入下单页面,取消留在该页面",
                success: function (res) {
                    if (res.confirm == true) {
                        wx.navigateTo({
                            url: '../mallcart/mallcart'
                        });
                    } else {
                        that.setData({
                            is_add_cart_view: false
                        })
                    }
                }
            })
        }, { completeAfter: that.addCartComplete() });
    },
    //加入购物车 请求完成
    addCartComplete: function () {
        var that = this;
        that.setData({
            btn_add_cart_disabled: false
        });
    },

    //进入购物车
    bind_go_cart: function () {
        wx.redirectTo({
            url: '../mallcart/mallcart'
        })
    },
    set_close: function () {
        this.setData({
            is_add_cart_view: false
        })
    },
    onPullDownRefresh: function () {
        var that = this
        that.setData({
            this_page: 1
        })
        that.data.this_page = 1;
        //请求商品详情
        setTimeout(() => {
            wx.stopPullDownRefresh()
        }, 1000)
        that.getGoodsInfo();
        //获取分享数据
        that.getCommentList();
    },
    //联系客服
    // bind_contant_kefu:function(){
    //   var that = this
    //   wx.makePhoneCall({
    //     phoneNumber: that.data.shop_config.kefu_contant
    //   })
    // },
    //属性选择
    // select_attr_bind:function(e){
    //   var that = this
    //   var this_attr_id = e.currentTarget.id
    //   var this_attr_name = e.currentTarget.dataset.type
    //   var datas = that.data.goods_specification
    //   var this_spec_price = 0;
    //   var a_datas = that.data.goods_attr_select
    //   var g_datas = that.data.goods_info
    //   for(var i=0;i<datas.length;i++){
    //       if(datas[i].name == this_attr_name){
    //               a_datas[datas[i].name] = null
    //           for(var j=0;j<datas[i].values.length;j++){
    //               datas[i].values[j].ischeck = false
    //               if(datas[i].values[j].id == this_attr_id){
    //                 datas[i].values[j].ischeck = true
    //                 a_datas[datas[i].name] = this_attr_id
    //                 if(datas[i].values[j].format_price > 0){
    //                     g_datas.shop_price = datas[i].values[j].format_price
    //                 }
    //               }
    //           }
    //       }
    //   }
    //   that.setData({
    //     goods_specification:datas,
    //     goods_attr_select:a_datas,
    //     goods_info:g_datas
    //   })
    // },
    //下拉刷新

    //滚动加载
    // indexscrolltolower:function(){
    //   var that = this
    //   that.setData({
    //       hasMore:true
    //   })
    //   var this_target = this.data.this_items
    // },
    // initReplyLoadData:function(data){
    //   var that = this
    //   if(data.info == null){
    //       that.setData({
    //         is_scroll_y:false,
    //       })
    //     }else{
    //         if(data.info.length >= that.data.pagesize){
    //             that.setData({
    //                 is_scroll_y:true,
    //             })
    //         }else{
    //             that.setData({
    //                 is_scroll_y:false,
    //             })
    //         }
    //       that.setData({
    //         reply_items:that.data.reply_items.concat(data.info),
    //         this_page:that.data.this_page + 1
    //       })
    //     }
    // },
    //配置分享信息
    onShareAppMessage: function () {
        const title = this.shareInfo.title;
        const desc = this.shareInfo.description;
        return {
            title: title,
            desc: desc,
            path: '/pages/shop/malldetail/malldetail?sid=' + that.data.this_goods_id
        };
    },
    //上拉加载更多
    onReachBottom: function (e) {
        var that = this
        that.setData({
            showLoading: true
        })
        if (that.data.this_page > 1) {
            //加载更多数据
            that.getCommentList();
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
})