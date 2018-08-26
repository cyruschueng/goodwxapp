const app = getApp();
import _ from '../../../utils/underscore';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import { urls } from '../../../utils/data';
import requestUtil from '../../../utils/requestUtil';

Page({
    data:{
        wldata:[],
        glo_is_load:true
    },
    onLoad:function(options){
        var that = this;
        var order_id = options.oid;
        that.setData({
          this_order_id:order_id,
        });
    },
    onShow:function(){
        var that = this;
        //获取物流信息
        _function.getShopWuliuInfo(that.data.this_order_id,that.initgetShopWuliuInfoData,that);
    },
    initgetShopWuliuInfoData:function(data){
        var that = this;
        console.log(data.info);
        if(data.code == 1){
             that.setData({
                 wldata:data.info,
                 glo_is_load:false
             })
        }else if(data.code == 5){
            wx.showModal({
                title: '提示',
                content: data.info,
                showCancel:false,
                success:function(res){
                    if (res.confirm) {
                        wx.navigateBack({
                            delta: 1
                        });
                    }
                }
            });
            return false;
        }
    }
})