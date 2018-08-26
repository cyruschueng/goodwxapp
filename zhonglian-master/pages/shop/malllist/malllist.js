const app = getApp();
import _ from '../../../utils/underscore';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import { urls } from '../../../utils/data';
import requestUtil from '../../../utils/requestUtil';

Page({
  data:{
    cate_list:[],
    this_item:0,
    this_cate_id:0,
    this_cate_name:'分类',
    goods_list:[],
    hasMore:false,
    showLoading:false,
    isScrollY:true,
    this_page:1,//当前页码
    pagesize:10,//每页数量
    this_finish_page:0,
    glo_is_load:true
  },
  detail: function(e) {
    wx.navigateTo({
      url: '../malldetail/malldetail?sid='+ e.currentTarget.id
    })
  },
  mallcart: function(){
    wx.navigateTo({
      url: '../mallcart/mallcart'
    })
  },
  onLoad:function(options){
      var that = this
      var cid = options.cid;
      var cname = options.cname;
      that.setData({
        this_cate_id:cid,
        this_cate_name:cname
      })
      //商品列表
      _function.getGoodsList(cid,1,that.data.pagesize,that.initGoodsListData,this)
  },
  initGoodsListData:function(data){
    var that = this
    that.setData({
      goods_list:data.info,
      glo_is_load:false
    })
    if(data.info == null){
          that.setData({
              isScrollY:false,
              showLoading:false
          })
      }else{
        if(data.info.length >= that.data.pagesize){
            that.setData({
                isScrollY:true,
                showLoading:true
            })
        }else{
            that.setData({
                isScrollY:false,
                showLoading:false
            })
        }
      }
  },
  //选项卡操作
  index_item_bind:function(e){
    //获取分类id 然后动态加载所属分类商品
    var that = this
    var this_target = e.target.id;
    that.setData({
        this_item:this_target,
        this_page:1
      })
    _function.getGoodsList(this_target,1,that.data.pagesize,that.initGoodsListData,this)
  },
  //下拉刷新
    onPullDownRefresh:function(){
      var that = this
      that.setData({
        this_page:1,
        this_item:0
      })
      _function.getGoodsList(that.data.this_cate_id,that.data.this_page,that.data.pagesize,that.initGoodsListData,this)
      setTimeout(()=>{
        wx.stopPullDownRefresh()
      },1000)
    },
    //滚动加载
    indexscrolltolower:function(){
      var that = this
      var this_target = this.data.this_item
      if(that.data.this_finish_page != that.data.this_page){
          _function.getGoodsList(that.data.this_cate_id,that.data.this_page + 1,that.data.pagesize,that.initGoodsListLoadData,this)
      }
    },
    initGoodsListLoadData:function(data){
      var that = this
      if(data.info == null){
          that.setData({
              isScrollY:false,
              showLoading:false
          })
        }else{
            if(data.info.length >= that.data.pagesize){
                that.setData({
                    isScrollY:true,
                    showLoading:true
                })
            }else{
                that.setData({
                    isScrollY:false,
                    showLoading:false
                })
            }
            that.setData({
              goods_list:that.data.goods_list.concat(data.info),
              this_page:that.data.this_page + 1
            })
        }
        that.setData({
          this_finish_page:that.this_finish_page + 1
        })
    },
    onReachBottom:function(e){
      var that = this
      var this_target = this.data.this_item
      if(that.data.this_finish_page != that.data.this_page){
          _function.getGoodsList(that.data.this_cate_id,that.data.this_page + 1,that.data.pagesize,that.initGoodsListLoadData,this)
      }
    }
})