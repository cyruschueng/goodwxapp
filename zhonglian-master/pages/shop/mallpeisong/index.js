const app = getApp();
import _ from '../../../utils/underscore';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import { urls } from '../../../utils/data';
import requestUtil from '../../../utils/requestUtil';

Page({
    data:{
        this_order_id:0,
        user_info:[],
        oinfo:[],
        glo_is_load:true,
        btn_disabled:false,
        submitIsLoading:false,
    },
    onLoad:function(options){
        var that = this;
        var order_id = options.oid;
        that.setData({
          this_order_id:order_id,
        });
      //获取用户信息
      _function.getShopPsUserInfo(wx.getStorageSync("utoken"),that.initgetShopPsUserInfoData,that);
    },
    initgetShopPsUserInfoData:function(data){
        var that = this;
        if(data.code == 1){
            that.setData({
                user_info:data.info,
            });
            wx.hideToast();
        _function.getShopPsOrderInfo(that.data.this_order_id,that.initgetOrderInfoData,that);
        }else if(data.code == 2){
            wx.showToast({
                title: '登陆中',
                icon: 'loading',
                duration: 10000,
                success:function(){
                    app.getNewToken(function(token){
                        _function.getShopPsUserInfo(wx.getStorageSync("utoken"),that.initgetShopPsUserInfoData,that);
                    })
                }
            })
        }
    },
    initgetOrderInfoData:function(data){
        var that = this;
        if(data.code == 1){
             that.setData({
                 oinfo:data.info,
                 glo_is_load:false
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
    //确认配送
    order_peisong_bind:function(){
        var that = this;
        var order_id = that.data.oinfo.id;
        wx.showModal({
            title: '提示',
            content: "确认配送吗?",
            success:function(res){
                if(res.confirm == true){
                    wx.showToast({
                        title: '操作中',
                        icon: 'loading',
                        duration: 10000,
                        mask:true
                    })
                    that.setData({
                        btn_disabled:true,
                        submitIsLoading:true,
                    });
                    _function.getShopPsConfirm(wx.getStorageSync("utoken"),order_id,that.initgetShopPsConfirmData,that);
                }
            }
        })
    },
    initgetShopPsConfirmData:function(data){
        var that = this;
        if(data.code == 1){
            wx.showModal({
                title: '提示',
                content: data.info,
                showCancel:false
            });
        }else if(data.code == 2){
            wx.showToast({
                title: '登陆中',
                icon: 'loading',
                duration: 10000,
                success:function(){
                    app.getNewToken(function(token){
                        _function.getShopPsConfirm(wx.getStorageSync("utoken"),order_id,that.initgetShopPsConfirmData,that);
                    })
                }
            })
        }else{
            wx.showModal({
                title: '提示',
                content: data.info,
                showCancel:false
            });
        }
        wx.hideToast();
        that.setData({
            btn_disabled:false,
            submitIsLoading:false,
        });
    },
})