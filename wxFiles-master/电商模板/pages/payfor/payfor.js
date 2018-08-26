var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxnumber:'',
    version:1,
    store:null,
    area:[
      { label: '北京市', value: '京' }, { label: '天津市', value: '津' }, { label: '河北省', value: '冀' }, { label: '山西省', value: '晋' }, { label: '内蒙古自治区', value: '内蒙古' },
      { label: '辽宁省', value: '辽' }, { label: '吉林省', value: '吉' }, { label: '黑龙江省', value: '黑' }, { label: '上海市', value: '沪' }, { label: '江苏省', value: '苏' }, 
      { label: '浙江省', value: '浙' }, { label: '安徽省', value: '皖' }, { label: '福建省', value: '闽' }, { label: '江西省', value: '赣' }, { label: '山东省', value: '鲁' },
      { label: '河南省', value: '豫' }, { label: '湖北省', value: '鄂' }, { label: '湖南省', value: '湘' }, { label: '广东省', value: '粤' }, { label: '广西壮族自治区', value: '桂' },
      { label: '海南省', value: '琼' }, { label: '重庆市', value: '渝' }, { label: '四川省', value: '川' }, { label: '贵州省', value: '贵' }, { label: '云南省', value: '云' },
      { label: '西藏自治区', value: '藏' }, { label: '陕西省', value: '陕' }, { label: '甘肃省', value: '甘' }, { label: '青海省', value: '青' }, { label: '宁夏回族自治区', value: '宁' },
      { label: '新疆维吾尔自治区', value: '新' }, { label: '香港特别行政区', value: '港' }, { label: '澳门特别行政区', value: '澳' }, { label: '台湾省', value: '台' }
    ],
    wxAddressInfo:'',
    wxProvinceCode:'',
    templatePrice:0,
    countPrice:0,
    countNumber:0,
    companyId:null,
    orderRemark: '',
    multiData:{
      
      itemIds : '',
    },
    shop:[],
    companyShow:'',
    company:[],
    sum:0
  },
  payIt(){
    
    var that = this;
    var data = {
      storeId: app.storeId,
      userId :app.userInfo.userId,
      companyId: this.data.companyId,
      wxProvinceCode: this.data.wxProvinceCode ,
      wxAddressInfo: JSON.stringify(this.data.wxAddressInfo),
      orderRemark: this.data.orderRemark
    }
    var add = 'addOne';
    if (this.data.paytype == 1) {
      data.specificationId = this.data.shop[0].specificationId;
      data.itemCount = this.data.shop[0].itemCount
    } else {
      var li = [];
      for (var i in this.data.shop) {
        li.push(this.data.shop[i].itemId);
      }
      data.itemIds = li;
      add = 'addAll';
    }

    var doPost = false;
    if (that.data.version == 2){
      wx.showModal({
        title: '步骤提示',
        content: '①下单②给店家转账③等待收货',
        success:function(res) {
          if(res.confirm){
            that.createOrder(add,data);
          }
        }
      })
    }else{
      that.createOrder(add,data);
    }
    
  },
  //创建订单
  createOrder(add,data){
    var that = this;
    wx.showLoading({})
    //创建订单
    app.post('order/info/wx/' + add, data, function (res) {
      wx.hideLoading();
      var order = res;
      if (res.code == 1000) {
        if (that.data.version == 2) {
          //个人版的处理
          wx.redirectTo({
            url: '/pages/orderdetail/orderdetail?id=' + order.body.orderId,
          })
        } else {
          that.wxpay(res.body)
        }
      } else {
        wx.showToast({
          title: '下单失败',
          duration: 800,
          image: '/img/60.png'
        })
      }
    })
  },
  //微信支付
  wxpay: function (data) {
    var that = this;
    wx.requestPayment({
      timeStamp: data.time,
      nonceStr: data.nonceStr,
      package: 'prepay_id=' + data.prepay_id,
      signType: 'MD5',
      paySign: data.paySign,
      success: function () {
        wx.redirectTo({
          url: '/pages/orderdetail/orderdetail?id=' + data.orderId,
        })
      },
      fail: function () {
        wx.redirectTo({
          url: '/pages/orderdetail/orderdetail?id=' + data.orderId,
        })
      },

    })
  },
  //备注
  remarkInput(e){
    this.setData({
      orderRemark:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   * paytype    2为购物车结算    1为立即结算
   */
  onLoad: function (options) {
    this.getCompany();
    //购物车
    if(options.shop){
      var shop = JSON.parse(options.shop);
      var countNumber = 0;
      for(var item in shop){
        countNumber += shop[item].itemCount
      }
      this.setData({
        wxnumber:app.wxnumber,
        store:app.store,
        shop: shop,
        paytype:2,
        countNumber: countNumber,
        countPrice: options.countPrice
      })
    }
    //立即结算
    if(options.simple){
      var shop = [];
      shop.push(JSON.parse(options.simple));
      var countNumber = shop[0].itemCount;
      this.setData({
        store: app.store,
        shop: shop,
        paytype: 1,
        countNumber: countNumber,
        countPrice: options.countPrice
      })
    }
  },
  //选择地址
  chooseAddress(cb){
    var that = this;
    wx.chooseAddress({
      success(res) {
        var jian = '';
        for (var item in that.data.area) {
          if (res.provinceName == that.data.area[item].label) {
            jian = that.data.area[item].value;
          }
        }
        cb(app.ip, res, jian);
        // that.setData({
        //   ip:app.ip,
        //   wxAddressInfo: res,
        //   wxProvinceCode: jian
        // })
      },
      fail(){
        wx.showModal({
          title: '提示',
          content: '为了您的方面请先开启微信地址授权',
          success(res) {
            if (res.confirm) {
              wx.openSetting({
                success: function () {
                  that.chooseAddress(cb)
                }
              })
            }
          }
        })
      }
    })
  },
  //获取物流公司
  getCompany(){
    var that = this;
    app.post('logistics/company/finds',{
      pageIndex: 1,
      pageSize: 50,
      storeId: app.storeId,
      searchString: '',
      storeType: 2
    },function(res){   
      var com =  res;
      that.chooseAddress(function(ip,res,jian){
        that.setData({
          ip:ip,
          version:app.version,
          wxAddressInfo:res,
          wxProvinceCode:jian,
          companyId: com.body.modelData[0].companyId,
          companyShow: com.body.modelData[0].companyName,
          company: com.body.modelData
        })
        that.calculate();
      });
      
    })
  },
  //计算运费
  calculate(){
    var that = this;
    var data = {
      storeId: app.storeId,
      companyId: this.data.companyId,
      wxProvinceCode: this.data.wxProvinceCode,
      type:this.data.paytype
    }
    if (this.data.paytype == 1){
      data.specificationId = this.data.shop[0].specificationId;
      data.itemCount = this.data.shop[0].itemCount
    }else{
      var li = [];
      for(var i in this.data.shop){
        li.push(this.data.shop[i].itemId);
      }
      data.itemIds = li;
    }
    app.post('order/info/wx/getMailPrice',data,function(res){
      that.setData({
        templatePrice:res.body,
        sum: (parseFloat(that.data.countPrice)+parseFloat(res.body)).toFixed(2)
      })
    })
  },
  //显示物流公司
  showCompany(){
    var that = this;
    var list = this.data.company;
    var li = [];
    for(var item in list){
      li.push(list[item].companyName);
    }
    wx.showActionSheet({
      itemList: li,
      success: function (res) {
        that.setData({
          companyId: list[res.tapIndex].companyId,
          companyShow: list[res.tapIndex].companyName,
        })
        that.calculate();
      },
      fail: function (res) {
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },


})