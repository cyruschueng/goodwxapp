const app = getApp();
import _ from '../../../utils/underscore';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import { urls } from '../../../utils/data';
import requestUtil from '../../../utils/requestUtil';

Page({
    data:{
        cart_list:[],
        all_g_number:0,
        all_g_price:0,
        all_g_yunfei:0,
        this_check_val:[],
        all_is_checked:false,
        btn_mall_sure_disabled:false,
        glo_is_load:true
    },
    mallsure:function(){
        if(this.data.cart_list == null){
            wx.showModal({
                title: '提示',
                content: '对不起,购物车暂无商品',
                showCancel:false
            })
            return
        }
        wx.navigateTo({
          url: '../mallsure/mallsure'
        })
    },
    onShow:function(options){
        var that = this
      //请求购物车信息
      _function.getCartList(wx.getStorageSync("utoken"),that.initgetCartListData,this)
    },
    initgetCartListData:function(data){
      var that = this
      if(data.code == 2){
            wx.showModal({
                title: '提示',
                content: '登陆超时，将重新获取用户信息',
                showCancel:false,
                success:function(res){
                    app.getNewToken(function(token){
                        that.setData({
                            local_global_token:token
                        })
                        that.setData({
                            this_page:1,
                            buttonIsDisabled:false
                        })
                        _function.getCartList(wx.getStorageSync("utoken"),that.initgetCartListData,this)
                    })
                }
            })
            return false;
      }
      that.setData({
          cart_list:data.info.glist,
          all_g_number:data.info.all_g_number,
          all_g_price:data.info.all_g_price,
          all_g_yunfei:data.info.all_g_yunfei,
          glo_is_load:false
      })
    },
    //全选
    all_checkboxChange:function(e){
        var that = this
        var isallcheck = false
        if(e.detail.value[0]==1){
            isallcheck = true
        }else{
            isallcheck = false
        }
        var datas = that.data.cart_list
        var check_val = []
        for(var i=0;i<datas.length;i++){
            datas[i].is_checked = isallcheck
            if(isallcheck == true){
                check_val[i] = datas[i].id
            }
        }
        that.setData({
            cart_list:datas,
            this_check_val:check_val
        })
    },
    //单选
    single_checkboxChange:function(e){
        var that = this
        var c_length = e.detail.value.length
        var g_length = that.data.cart_list.length
        if(c_length >= g_length){
            that.setData({
                all_is_checked:true,
                this_check_val:e.detail.value
            })
        }else{
            that.setData({
                all_is_checked:false,
                this_check_val:e.detail.value
            })
        }
    },
    //减少数量
    bind_cart_number_jian:function(e){
        var that = this
        var this_cart_id = e.currentTarget.id
        var datas = that.data.cart_list
        for(var i=0;i<datas.length;i++){
            if(datas[i].id == this_cart_id){
                if(datas[i].goods_number > 1){
                    datas[i].goods_number = parseInt(datas[i].goods_number) - 1
                }else{
                    datas[i].goods_number = 1
                }
                //更新购物车数量
                _function.editCartList(wx.getStorageSync("utoken"),this_cart_id,datas[i].goods_number,that.initeditCartListData,this)
            }
        }
    },
    //增加数量
    bind_cart_number_jia:function(e){
        var that = this
        var this_cart_id = e.currentTarget.id
        var datas = that.data.cart_list
        for(var i=0;i<datas.length;i++){
            if(datas[i].id == this_cart_id){
                datas[i].goods_number = parseInt(datas[i].goods_number) + 1
                //更新购物车数量
                _function.editCartList(wx.getStorageSync("utoken"),this_cart_id,datas[i].goods_number,that.initeditCartListData,this)
            }
        }
    },
    initeditCartListData:function(data){
        var that = this
        if(data.code == 1){
              _function.getCartList(wx.getStorageSync("utoken"),that.initgetCartListData,this)
        }else if(data.code == 2){
            wx.showModal({
                title: '提示',
                content: '登陆超时，将重新获取用户信息',
                showCancel:false,
                success:function(res){
                    app.getNewToken(function(token){
                        that.setData({
                            local_global_token:token
                        })
                        _function.getCartList(wx.getStorageSync("utoken"),that.initgetCartListData,this)
                    })
                }
            })
        }else if(data.code == 5){
            wx.showModal({
                title: '提示',
                content: data.info,
                showCancel:false
            })
            return false;
        }
    },
    //删除购物车
    bind_delete_cart:function(){
        var that = this
        if(that.data.this_check_val.length == 0){
            wx.showModal({
                title: '提示',
                content: '请选择要删除的商品',
                showCancel:false,
            })
            return false;
        }
        
        wx.showModal({
                title: '提示',
                content: "确认要删除已购商品吗?",
                success:function(res){
                  if(res.confirm == true){
                      _function.delCartList(wx.getStorageSync("utoken"),that.data.this_check_val.toString(),that.initdelCartListData,that)
                  }
                }
            })
        
    },
    initdelCartListData:function(data){
      var that = this
      if(data.code == 2){
            wx.showModal({
                title: '提示',
                content: '登陆超时，将重新获取用户信息',
                showCancel:false,
                success:function(res){
                    app.getNewToken(function(token){
                        that.setData({
                            local_global_token:token
                        })
                        that.setData({
                            this_page:1,
                            buttonIsDisabled:false
                        })
                        _function.getCartList(wx.getStorageSync("utoken"),that.initgetCartListData,that)
                    })
                }
            })
            return false;
      }
      _function.getCartList(wx.getStorageSync("utoken"),that.initgetCartListData,that)
    },
    //下拉刷新
    onPullDownRefresh:function(){
      var that = this
      _function.getCartList(wx.getStorageSync("utoken"),that.initgetCartListData,this)
      that.setData({
          all_is_checked:false
      })
      setTimeout(()=>{
        wx.stopPullDownRefresh()
      },1000)
    },
})