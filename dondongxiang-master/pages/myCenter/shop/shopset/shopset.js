// pages/myCenter/shop/shopset/shopset.js
var app = getApp();
var shopname = "";
var shopadress = "";
var shoptel = "";
var shopdesc = "";
var shopedit = "";
var shopurl = "";
var array = [];//本地分类数组
var catInput = "";

Page({
  data: {
    dialogmsg:false,
    shopId:0,
    shopname:"",
    shopadress:"",
    shoptel:"",
    shopdesc:"",
    shopedit:"",
    goods_cat:[],
    catinfo:"",//输入分类名
    link_url:"",
    deltabmsg: true,
    shop_imgs:[],
    is_represent:false,
    innersrc:"",
    creatbtn:"立即创建", 
    shoplongitude: "",//店铺地址坐标longitude
    shoplatitude: ""//店铺地址坐标latitude

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options.shop_id>0){
      that.setData({
        dialogmsg: true,
        creatbtn:"修改",
        shopId: options.shop_id
      })
      that.refreshshopinfo(options.shop_id);
    };

    console.log("店铺设置id是" + options.shop_id);

  },
  //获取名称
  ShopNameInput: function (e){
    this.setData({
      shopname: e.detail.value
    })
    shopname = e.detail.value;

  },
  //获取地址
  ShopAdressInput:function(e){
    this.setData({
      shopadress: e.detail.value
    })
    shopadress = e.detail.value;
  },
  //获取电话
  ShopTelInput: function (e) {
    this.setData({
      shoptel: e.detail.value
    })
    shoptel = e.detail.value;
  },
  //获取介绍
  IntroduceInput: function (e) {
    this.setData({
      shopdesc: e.detail.value
    })
    shopdesc = e.detail.value;
  },
  //获取活动编辑
  Act_descriptionInput: function (e) {
    this.setData({
      shopedit: e.detail.value
    })
    shopedit = e.detail.value;
  },
  //获取产品分类
  catInput: function (e) {
      this.setData({
        catinfo: e.detail.value
      })
  },
  //添加分类
  //服务器增加分类
  addcatrequest: function (cat_name){
  var _this = this;
  if (this.data.catinfo == "") {
    wx.showToast({
      title: '请输入分类名称',
      icon: 'success',
      duration: 2000
    })
  } else {
    //判断是否是创建店铺
    if (!_this.data.shopId>0){
      var obj = { cat_id: _this.data.goods_cat.length, cat_name: _this.data.catinfo };
      array.push(obj);
      _this.setData({
        goods_cat: array,
      })
    }else{

  wx.request({
    url: app.globalData.url +'/shop/shop/addGoodsCat',
    method: "post",
    data: {
      shop_id: _this.data.shopId,
      cat_name: _this.data.catinfo,
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res.data)
      if (res.data.errcode == 0) {
        _this.refreshshopinfo(_this.data.shopId);
        var array = _this.data.goods_cat;
        var obj = { cat_id: _this.data.goods_cat.length, cat_name: _this.data.catinfo };
        array.push(obj);
        _this.setData({
          goods_cat: array,
        })
        
      } else {
        wx.showToast({
          title: res.data.errmsg,
          icon: 'fail',
          duration: 2000
        })
        return false
      }
    }
  })}
  }
},
//删除分类
//服务器删除分类
  delcatrequest: function (catid) {
    var _this = this;
    // var array = this.data.goods_cat;
    //判断是否是创建店铺
    if (!_this.data.shopId > 0) {
      
      array.pop();
      _this.setData({
        goods_cat: array,
      })
    } else {
      var array = this.data.goods_cat;
     console.log(_this.data.goods_cat)
    wx.request({
      url: app.globalData.url +'/shop/shop/delGoodsCat',
      method: "post",
      data: {
        cat_id: _this.data.goods_cat[array.length-1].cat_id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.errcode == 0) {
          array.pop();
          _this.setData({
            goods_cat: array,
          })
         
        } else {
          wx.showToast({
            title: res.data.errmsg,
            icon: 'fail',
            duration: 2000
          })
        }
      }
    })
    }
  //  return false
  },
  //获取链接
  urlInput: function (e) {
    shopurl = e.detail.value;
  },
  //上传店铺介绍图片
  chooseImg:function(){
    var _this = this;
    wx.chooseImage({
      count: 5,
      sizeType: ['original'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        var urlarr = [];
        for (var i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: app.globalData.url +'/shop/shop/uploadShopImgs',
            filePath: tempFilePaths[i],
            name: 'shop_imgs[]',
            success: function (res) {
              var img_url = "";
               var tdata = JSON.parse(res.data);
               console.log(tdata.data[0]);
              // console.log("ha" + typeof (res.data));
               
               var obj = {img_url: tdata.data[0]};
               urlarr.push(obj);
               _this.setData({
                 shop_imgs: urlarr
               })
            }
          })
        }
        
        // var terallar = _this.data.shop_imgs.push(urlarr);
        // _this.setData({
        //   shop_imgs: terallar
        // })
        console.log("店铺介绍图片" + _this.data.shop_imgs[0].img_url);
      }
    })
  },
  choosePoster:function(){
    var _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
          wx.uploadFile({
            url: app.globalData.url +'/shop/shop/uploadShopImgs',
            filePath: tempFilePaths[0],
            name: 'shop_imgs[]',
            success: function (res) {
              console.log(res.data);
              var data = JSON.parse(res.data);
              _this.setData({
                innersrc: data.data[0]
              })
            }
          })
      }
    })
  },
  //店铺代言开关
  switch1Change:function(e){
      this.setData({
        is_represent: e.detail.value
      })
  },
  //判断店铺创建或者修改
  Stateshop:function(){
    
    var that = this;
    if (that.data.shopId>0){
      console.log("hahha");
      that.uploadshop(that.data.shopId);
      
     }else{
      that.Setshop();
     }
  },
  //创建店铺
  Setshop:function(){
    var _this = this;
    var terarry = [];
    for (var i = 0; i < _this.data.shop_imgs.length; i++) {
      terarry.push(_this.data.shop_imgs[i].img_url)
    }
    var catterarry = [];
    for (var i = 0; i < _this.data.goods_cat.length; i++) {
      catterarry.push(_this.data.goods_cat[i].cat_name)
    }
    wx.request({
      url: app.globalData.url +'/shop/shop/createshop',
      method:"post",
      data: {
        user_id: app.globalData.user_id,
        shop_name: shopname,
        address: shopadress,
        tel: shoptel,
        //goods_cat: {"n1":"456"},
        goods_cat: catterarry,
        introduce: shopdesc,
        poster: _this.data.innersrc,
        link_url: shopurl,
        shop_imgs: terarry,
        is_represent: _this.data.is_represent==false?0:1,
        act_description: shopedit,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.errcode)
        if (res.data.data.errcode==0){
          wx.showToast({
            title: '创建成功',
            icon: 'success',
            duration: 2000
          })
          _this.setData({
            creatbtn:"修改",
            creatbtn: res.data.data.shop_id
          })
          
          _this.refreshshopinfo(res.data.data.shop_id);
        }
      }
    })
  },
  //修改店铺
  uploadshop: function (shopid) {
    var _this = this;
     var terarry = [];
    for (var i = 0; i < _this.data.shop_imgs.length; i++){
      terarry.push(_this.data.shop_imgs[i].img_url)
    }
    
    wx.request({
      url: app.globalData.url +'/shop/shop/updateShopInfo',
      method: "post",
      data: {
        shop_id: shopid,
        shop_name: _this.data.shopname,
        address: _this.data.shopadress,
        tel: _this.data.shoptel,
        // goods_cat: _this.data.goods_cat,
        introduce: _this.data.shopdesc,
        poster: _this.data.innersrc,
        link_url: _this.data.shopurl,
        shop_imgs: terarry,
        is_represent: _this.data.is_represent == false ? 0 : 1,
        act_description: _this.data.shopedit,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.errcode == 0) {
          wx.showToast({
            title: res.data.errmsg,
            icon: 'success',
            duration: 2000
          })
          //刷新店铺
          _this.refreshshopinfo(shopid);
        }else{
          wx.showToast({
            title: res.data.errmsg,
            icon: 'fail',
            duration: 2000
          })
        }
      }
    })
  },
  //刷新店铺信息
  refreshshopinfo:function(shopid){
    var that = this;
    wx.request({
      url: app.globalData.url +'/shop/shop/getShopInfo', //仅为示例，并非真实的接口地址
      data: { shop_id: shopid},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        that.setData({
          shopname: res.data.data.shop_name,
          shopadress: res.data.data.address,
          shoptel: res.data.data.tel,
          //goods_cat: {"n1":"456"},
          goods_cat: res.data.data.cat_info,
          shopdesc: res.data.data.introduce,
          innersrc: res.data.data.poster,
          link_url: res.data.data.link_url,
          shop_imgs: res.data.data.shop_imgs,
          is_represent: res.data.data.is_represent,
          shopedit: res.data.data.act_description
        })
      }
    })
  },
  //获取店铺地理位置
  getshoploation: function () {
     var that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        that.setData({
          latitude:res.latitude,
          longitude :res.longitude,
        })
      }
    })

  },
  //删除图片
  deletePic: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.id);
    wx.request({
      url: app.globalData.url + '/commons/common/deletePic',
      method: "POST",
      data: {
        id: e.currentTarget.dataset.id,
        type: 2
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.refreshshopinfo(that.data.shopId);
      }
    })
  },
//选择店铺地理位置坐标
//根据经纬度在地图上显示  
  // openLocation: function (e) {
  //     var value = e.detail.value
  //     wx.openLocation({
  //       // longitude: Number(value.longitude),
  //       // latitude: Number(value.latitude)
  //     })
  //     this.setData({
  //       shoplongitude: 000,
  //       shoplatitude:111
  //     })
  // },
  //弹窗创建店铺
  setbtnshop:function(){
    this.setData({
      dialogmsg:true,
    })
  }
})