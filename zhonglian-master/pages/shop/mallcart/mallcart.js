const app = getApp();
import { urls } from '../../../utils/data';
import requestUtil from '../../../utils/requestUtil';
Page({
    data: {
        imgUrlPX: urls.hostUrl,
        cart_list: [],
        all_g_number: 0,
        totalPrice: 0,
        all_g_yunfei: 0,
        this_check_val: [],
        all_is_checked: false,
        btn_mall_sure_disabled: false,
        glo_is_load: true,
        totalNum: 0,
        isShowGassite: false
    },
    mallsure: function () {
        var that = this;
        if (this.data.cart_list == null) {
            wx.showModal({
                title: '提示',
                content: '购物车暂无商品',
                showCancel: false
            })
            return;
        }
        if (this.data.this_check_val.length == 0) {
            wx.showModal({
                title: '提示',
                content: '请选择要结算的商品',
                showCancel: false
            })
            return;
        }
        that.setData({ isShowGassite: true });
    },
    onCashing: function (e) {
        //兑换商品
        const dataset = e.currentTarget.dataset, deptId = dataset.deptId, deptName = dataset.name, that = this;
        var idArr = that.data.this_check_val;
        var ids = idArr.join(',');
        wx.showModal({
            title: '提示',
            content: "确定兑换吗？",
            success: function (res) {
                if (res.confirm == true) {
                    requestUtil.post(urls.shoping.order.create, { cart_ids: ids, dept_id: deptId, dept_name: deptName }, (data) => {
                        wx.redirectTo({
                            url: '../../user/order/list/index'
                        })
                    }, { completeAfter: that.aaa });
                } else {
                    that.setData({ isShowGassite: false });
                }
            }
        })
    },
    onLoad: function (options) {
        var that = this
        that.getCartList();
        that.loadGassite();
    },
    //请求购物车信息
    getCartList: function () {
        var that = this;
        requestUtil.get(urls.shoping.cart.list, {}, (data) => {
            for (var i = 0; i < data.length; i++) {
                data[i].is_checked = false;
            }
            that.data.cart_list = data;
            that.setData({
                glo_is_load: false,
                cart_list: that.data.cart_list
            })
        }, { completeAfter: that.aaa });
    },
    loadGassite: function () {
        wx.request({
            url: urls.public.gassite,
            success: (res) => {
                res = res.data.RESULT;
                this.setData({ gassiteData: res });
            },
        })
    },
    //更新商品数量
    updateGoodsNum: function (num, cart_id) {
        var that = this;
        requestUtil.get(urls.shoping.cart.update, { num: num, id: cart_id }, (data) => {
            console.log(data);
        }, { completeAfter: that.aaa });
    },
    updateGoodsNumComplete: function () {

    },
    //全选
    all_checkboxChange: function (e) {
        var that = this
        var isallcheck = false
        if (e.detail.value[0] == 1) {
            isallcheck = true
        } else {
            isallcheck = false
        }
        var datas = that.data.cart_list
        var check_val = []
        for (var i = 0; i < datas.length; i++) {
            datas[i].is_checked = isallcheck
            if (isallcheck == true) {
                check_val[i] = datas[i].id
            }
        }
        that.data.cart_list = datas;
        that.setData({
            cart_list: that.data.cart_list,
            this_check_val: check_val
        })
        that.calculateTotalPrice();
    },
    // //单选
    single_checkboxChange: function (e) {
        var that = this
        var a = e.detail.value;
        var datas = that.data.cart_list
        for (var i = 0; i < datas.length; i++) {
            var cartid = datas[i].id;
            if (a.indexOf(cartid) == -1) {
                datas[i].is_checked = false;
            }
            else {
                datas[i].is_checked = true;
            }
        }
        that.data.cart_list = datas;
        var c_length = e.detail.value.length
        var g_length = that.data.cart_list.length
        if (c_length >= g_length) {
            that.setData({
                all_is_checked: true,
                this_check_val: e.detail.value
            })
        } else {
            that.setData({
                all_is_checked: false,
                this_check_val: e.detail.value
            })
        }
        that.calculateTotalPrice();
    },
    calculateTotalPrice: function () {
        var that = this;
        var datas = that.data.cart_list
        var totalPrice = 0;
        var totalNum = 0;
        for (var i = 0; i < datas.length; i++) {
            var is_c = datas[i].is_checked;
            console.log(is_c);
            if (is_c == false) {
                datas[i].is_checked = false;
            }
            else {
                datas[i].is_checked = true;
                totalPrice = totalPrice + parseFloat(datas[i].goods_price) * parseInt(datas[i].goods_number);
                totalNum = totalNum + parseInt(datas[i].goods_number);
            }
        }
        console.log(totalPrice);
        that.setData({
            totalPrice: totalPrice,
            totalNum: totalNum
        })

    },
    // //减少数量
    bind_cart_number_jian: function (e) {
        var that = this
        var this_cart_id = e.currentTarget.id
        var datas = that.data.cart_list
        var goodsnum = 1;
        for (var i = 0; i < datas.length; i++) {
            if (datas[i].id == this_cart_id) {
                if (datas[i].goods_number > 1) {
                    datas[i].goods_number = parseInt(datas[i].goods_number) - 1
                    goodsnum = datas[i].goods_number
                } else {
                    datas[i].goods_number = 1;
                    goodsnum = 1;
                }
                //更新购物车数量
            }
        }
        that.data.cart_list = datas;
        that.updateGoodsNum(goodsnum, this_cart_id);
        that.setData({
            cart_list: datas,
        })
        that.calculateTotalPrice();
    },
    // //增加数量
    bind_cart_number_jia: function (e) {
        var that = this
        var this_cart_id = e.currentTarget.id
        var datas = that.data.cart_list
        var goodsnum
        for (var i = 0; i < datas.length; i++) {
            if (datas[i].id == this_cart_id) {
                datas[i].goods_number = parseInt(datas[i].goods_number) + 1
                //更新购物车数量
                goodsnum = datas[i].goods_number
            }
        }
        that.data.cart_list = datas;
        that.updateGoodsNum(goodsnum, this_cart_id);
        that.setData({
            cart_list: datas,
        })
        that.calculateTotalPrice();
    },
    // //删除购物车
    bind_delete_cart: function () {
        var that = this
        if (that.data.this_check_val.length == 0) {
            wx.showModal({
                title: '提示',
                content: '请选择要删除的商品',
                showCancel: false,
            })
            return false;
        }
        wx.showModal({
            title: '提示',
            content: "确认要删除已购商品吗?",
            success: function (res) {
                if (res.confirm == true) {
                    if (that.data.this_check_val.length == that.data.cart_list.length) {
                        //清空购物车
                        requestUtil.get(urls.shoping.cart.clear, {}, (data) => {
                            console.log(data);
                            //请求购物车信息
                            that.getCartList();
                        }, { completeAfter: that.aaa });
                    }
                    else {
                        //删除购物车商品
                        var idArr = that.data.this_check_val;
                        var ids = idArr.join(',');
                        requestUtil.get(urls.shoping.cart.delete, { id: ids }, (data) => {
                            console.log(data);
                            //请求购物车信息
                            that.getCartList();
                        }, { completeAfter: that.aaa });

                    }
                }
            }
        })

    },
    // //下拉刷新
    onPullDownRefresh: function () {
        var that = this;
        //请求购物车信息
        that.getCartList();
        that.loadGassite();
    },
    onHideGasSiteTap: function (e) {
        this.setData({ isShowGassite: false });
    }
})