const app = getApp();
const QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');// 引入SDK核心类
const qqmapsdk = new QQMapWX({ key: '7DWBZ-XEW6R-HGGWQ-WZYXJ-FZUAV-MBBDY' });// 实例化API核心类
const con = require('../../../utils/api.js');

Page({
  data: {
    this_options: {},
    this_dish_id: 0,
    this_dish_info: '',
    this_dish_type: '',
    this_cate_id: 0,
    this_dish_cate_data: '',
    this_dish_cate_num: 0,
    this_ruzhu_show_status: true,
    this_latitude_data: 0,
    this_longitude_data: 0,
    glo_is_load: true,
    this_page: 1,
    this_page_num: 0,
    dish_sort_type: 3,
    is_loadmore: true,
    previewImage:[],
    shareDesc: '',
    waimaiStatus: '',
    more_dish_status: '',
    index_swiper_list: [],
    index_dish_list: [],
    latt: 0,
    lngg: 0,
    inputShowed: false,
    inputVal: "",
    showLoadMore: false,
    showNoMore: false,
    inputValue: '',
    dish_shijing_arr:[]
    
  },
  dish_diancan_bind: function (e) {
    var that = this;
    var cid = e.currentTarget.id;
    if (that.data.this_dish_info.dish_is_diannei == 1) {  
    wx.showModal({
      title: '提示',
      content: '如果需要扫餐桌二维码点餐,请点击确定,否则将进入选桌界面',
      success: function(res){
         if(res.confirm){
           if (that.data.this_dish_info.dish_is_rcode_open == 1) {
             wx.showToast({
               title: '加载中',
               icon: 'loading',
               duration: 1000 
             });
                wx.scanCode({
                  success: (res) => {
                    console.log(res,123321);
                    if (res.path) {
                      wx.navigateTo({
                        url: '/' + res.path + '&dish_id=' + cid
                      });
                    }
                  }
                });        
           }
         }else{
           wx.navigateTo({
             url: '../restaurant-diannei-chosetable/table?cid='+cid,
           })
         } 
      }
    });
    }else {

      wx.showModal({
        title: '提示',
        content: "对不起，暂不支持店内点餐",
        showCancel: false
      });
      return;
    }
    
      
  },
 // 预订
  dish_yuding_bind: function (e) {
    var that = this;
    wx.request({
      url: con.getyudingtype,
      method: "GET",
      data: {
        wxappid: con.wxappid,
        cid: e.currentTarget.id
      },
      header: {
        'content-type': 'application/json'
      },
      success:function(res){
        
        if(res.data.code == '1'){
          
          wx.showModal({
            title: '提示',
            content: '选择您想要的预约状态,点击确定就将进入预约点餐,否则将是预约状态',
            success:function(res){
              console.log(res);
              if(res.confirm){
              wx.navigateTo({
              url: '../restaurant-reserve/index?dish_id=' + e.currentTarget.id,
                });
              }else{
                wx.navigateTo({
                  url: '../restaurant-planned/planned?dish_id=' + e.currentTarget.id,
                });
              }
            }
          });
        }else if(res.data.code == '0'){
          wx.navigateTo({
            url: '../restaurant-planned/planned?dish_id=' + e.currentTarget.id,
          });
        }else{
          wx.showModal({
          title: '提示',
          content: "对不起，暂不支持预订",
          showCancel: false
          });
          return;
        }
      }
    });
    
  },
  //外卖
  dish_waimai_bind: function (e) {
    var that = this;
    
    if (that.data.this_dish_info.waimai_isopen == 1) {
      console.log(e);
      wx.navigateTo({
        url: '../restaurant-single/index?dish_id=' + e.currentTarget.id + '&order_type=2'
      });
    } else {
      wx.showModal({
        title: '提示',
        content: "对不起，暂不支持外卖",
        showCancel: false
      });
      return;
    }
  },
  //搜索
  showInput: function () {
    this.setData({
      inputShowed: true
    });
    // console.log("showInput");
  },
  hideInput: function () {
    this.setData({
      inputValue: "",
      inputVal: "",
      showLoadMore: false,
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputValue: "",
      inputVal: "",
      showLoadMore: false,
      index_dish_list: []
    });
    // console.log("clearInput");
  },
  inputTyping: function (e){
    this.setData({
      inputVal: e.detail.value,
      this_page: 1  
    });
    if(e.detail.value.length == 0){
      this.setData({
        index_dish_list: [],
        showLoadMore: false,
      });
    }
    // console.log(e.detail.value);
  },
  getindex_dish_list: function(e){
    var that = this;
    wx.showToast({
      title: '搜索中',
      icon: 'success',
      duration: 1000
    });
    var url = con.companyList;
    // console.log(url);
    wx.request({
      url: url,
      method: "GET",
      data: {
        wxappid: con.wxappid,
        latitude: that.data.lat,
        longitude: that.data.lng,
        search: that.data.inputVal
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res){
        // console.log(res.data.info);
        
        if (res.data.info == '未找到和您要的门店信息'){
            wx.showModal({
              title: '提示',
              content: '暂没搜索到您所需的店铺信息',
              showCancel: false
            });
          
        }else{
          that.setData({
            index_dish_list: res.data.info
          });
        }

      },
      fail: function(res){
        wx.showToast({
          title: '搜索失败',
          duration: 1000  
        });
      }
    });
  },
  searchAction: function(e){
    this.getindex_dish_list();
  },
  //扫码
  shop_saoma_bind: function(e){
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000  
    });
    wx.scanCode({
        success: function(res){
          if(res.path){
            wx.navigateTo({
              url: '/'+ res.path,
            });
          }
        }
    });
  },
  //餐饮排序
  datasort_bind: function(e){
   var that = this;
   var id = e.currentTarget.id;
    if(id == '3'){
      wx.request({
      url: con.companyList,
      method: "GET",
      data: {
        wxappid: con.wxappid,
        latitude: that.data.latt,
        longitude: that.data.lngg,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        
          that.setData({
            index_dish_list: res.data.info,
            glo_is_load: false
          });
      }
    });
    } else if(id == '1'){
      wx.request({
        url: con.companyList,
        method: "GET",
        data: {
          wxappid: con.wxappid,
          latitude: that.data.latt,
          longitude: that.data.lngg,
          paixu: 1
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          
          that.setData({
            index_dish_list: res.data.info,
            glo_is_load: false
          });
        }
      });
    } else if (id == '2'){
      wx.request({
        url: con.companyList,
        method: "GET",
        data: {
          wxappid: con.wxappid,
          latitude: that.data.latt,
          longitude: that.data.lngg,
          paixu: 2
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          
          that.setData({
            index_dish_list: res.data.info, 
            glo_is_load: false
          });
        }
      });
    }

   that.setData({
     dish_sort_type: id
   });
   
  },
  //点击进入单门店
  dish_info_bind: function(e){
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../restaurant-home-info/info?dish_id='+ id,
    })
  },

  //转账
  zhuanzhang_bind: function (e) {
    wx.navigateTo({
      url: '../pay/index?dish_id=' + e.currentTarget.id
    });
  },
  get_location_bind: function () {
    
    wx.showToast({
      title: '地图加载中',
      icon: 'loading',
      duration: 1000,
      mask: true
    });
    var that = this;
    var loc_lat = that.data.this_dish_info.latitude;
    var loc_lng = that.data.this_dish_info.longitude;

    wx.openLocation({
      latitude: parseFloat(loc_lat),
      longitude: parseFloat(loc_lng),
      scale: 18,
      name: that.data.this_dish_info.dish_name,
      address: that.data.this_dish_info.address
    });
  },
  //电话
  call_phone_bind: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.this_dish_info.dish_con_phone
    });
  },
  onLoad: function(options){
    var that = this;
    that.setData({
      this_options: options
    });
    that.onShow();
    that.loadSingleDishData(); 
    

    wx.request({
      url: con.getshareconfig,
      method: 'GET',
      data: {
        wxappid: con.wxappid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res);
        that.setData({
          shareDesc: res.data.info.desc,
          glo_is_load: false,
        });
      }
    });
    wx.request({
      url: con.waimai_isopen,
      method: "GET",
      data: {
        wxappid: con.wxappid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res){
          
          that.setData({
            waimaiStatus: res.data.waimai_isopen
          });
      }
    });

    //判断是否多门店
    wx.request({
      url: con.getDishConfig,
      method: "GET",
      data: {
        wxappid: con.wxappid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res){
        that.setData({
          more_dish_status: res.data.info.dish_type,

        });
      }
    });
    //轮播图
    wx.request({
      url: con.getslide,
      method: "GET",
      data: {
        wxappid: con.wxappid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res){
        
        that.setData({
          index_swiper_list: res.data.info
        });
      }
    });
    
  },
  onShow: function(){
    var that = this;
    //获取定位坐标
    wx.getLocation({
      success: function (res) {
         wx.showLoading({
           title: '获取定位信息中',
           madk: true,
           duration: 2300
         });
        wx.request({
          url: con.getcompanylist,
          method: "GET",
          data: {
            wxappid: con.wxappid,
            latitude: that.data.latt,
            longitude: that.data.lngg
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            // console.log(res);
            that.setData({
              index_dish_list: res.data.info,
              glo_is_load: false
            });
          }
        });

        that.setData({
          latt: res.latitude,
          lngg: res.longitude
        });
      },
      
    });

   
    
  },
  
  //多门店定位
  get_location_more: function(e){
    var len = e.currentTarget.id;
    wx.showToast({
      title: '地图加载中',
      icon: 'loading',
      duration: 1000,
      mask: true
    });
    var that = this;
    var arr = that.data.index_dish_list;
    var lt = '', lg = '', dish_name, address ;
    for(var i  in arr){
       if(len == arr[i].id){
         lt = arr[i].latitude;
         lg = arr[i].longitude;
         dish_name = arr[i].dish_name;
         address = arr[i].address;
       }
    }
    wx.openLocation({
      latitude: parseFloat(lt),
      longitude: parseFloat(lg),
      scale: 18,
      name: dish_name,
      address: address
    });
  },
  
  loadSingleDishData:function(){
    var that = this;
    wx.request({
      url: con.getcompanylist,
      method: "GET",
      data: {
        wxappid: con.wxappid,
        // menid: that.data.menid
      },
      header: {
        "Content-Type": "application/json"
      },
      success:function(res){
        // console.log(res);
        for(var i in res.data.info){
          
          that.setData({
            this_dish_info: res.data.info[i],
            glo_is_load:false
          })
        }
      }
    })
  },
 

  onShareAppMessage: function () {
    var that = this;
    var shareDesc = that.data.shareDesc;
    var sharePath = 'pages/restaurant/restaurant-home/index';
    return {
      title: shareDesc,
      path: sharePath,
      success:function(res){
        // console.log(res);
      },  
    }; 
  },
  //图片放大
  img_max_bind: function (e) {
    var that = this;
    that.data.dish_shijing_arr.push(that.data.this_dish_info.dish_huanjing1);
    that.data.dish_shijing_arr.push(that.data.this_dish_info.dish_huanjing2);
    that.data.dish_shijing_arr.push(that.data.this_dish_info.dish_huanjing3);

    wx.previewImage({ current: e.target.dataset.url, urls: that.data.dish_shijing_arr });
  },
  img_max_bind_zz: function (e) {
    var that = this;
    that.data.previewImage.push(that.data.this_dish_info.dish_zizhi);
    that.setData({
      previewImage: that.data.previewImage
    })
    wx.previewImage({ current: e.target.dataset.url, urls: that.data.previewImage });
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    that.setData({ this_cate_id: 0 });
    that.onLoad(that.data.this_options);
    that.loadSingleDishData();
    wx.showNavigationBarLoading() //在标题栏中显示加载
     setTimeout(() => {
       wx.hideNavigationBarLoading() //完成停止加载 
       wx.stopPullDownRefresh();
    }, 1000);
     
  },
  
})