// pages/paycar/paycar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAll:'0',
    sum:'0.00',
  },
  onLoad: function (options) {
    var that = this;
    //请求购物车列表
    wx.request({
      url: 'https://xcx.bjletusq.com/index.php/home/product/getCart',
      data: { user_id: getApp().globalData.userid },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
       var item = res.data.rows;
       //判断购物车是否为空
       if(res.data.rows.length==0){
        that.setData({
          isNull:'1'
        })
       }else{
         var isSel = [];
         item.forEach(function (val, index) {
           isSel[index] = 0
         })
         //设置选中数组和数据
         that.setData({
           isSel: isSel,
           paycar: item,
         })
         
       }
      },
    })
  },
  seleted:function(e){
    var that = this;
    //选中合计金额
    var prePrice = (e.currentTarget.dataset.sum).toFixed(2);
    //计算商品总数
    var sum = that.data.sum;
    //判断选中数组 
    var isSel = that.data.isSel;
    //判断逆向全选
    var allSel = 0;
    //点击选中图片指针
    var sel = e.currentTarget.dataset.issel;
    //判断商品是否选中
    if(sel=='0'){
      isSel[e.currentTarget.dataset.index] = 1;
      this.setData({
        isSel: isSel,
        sum:(-(-sum-prePrice)).toFixed(2)
      })
      //判断逆向全选
      isSel.forEach(function(val,index){
        if(val == 1){
          allSel++
        }
      })
      if(allSel==that.data.paycar.length){
        that.setData({
          isAll:'1'
        })
      }
    }else{
      //取消选择
      isSel[e.currentTarget.dataset.index] = 0;
      sum = (sum-prePrice).toFixed(2)
      this.setData({
        isSel: isSel,
        sum:sum,
        isAll:'0',
      })  
    }
  },
  //判断全选
  all:function(){
    var that = this;
    var isAll = that.data.isAll;
    var isSel = that.data.isSel;
    if(isAll=='0'){
      //全选
      isSel.forEach(function(val,index){
        isSel[index] = '1'
      })
      var item = that.data.paycar;
      var sum = 0;
      item.forEach(function(val,index){
        sum += (val.goods_price * val.goods_number);
      })
      that.setData({
        isAll:'1',
        isSel:isSel,
        sum:sum.toFixed(2),
      })
    }else{
      //取消全选
      isSel.forEach(function(val,index){
        isSel[index] = '0';
      })
      that.setData({
        isAll:'0',
        isSel:isSel,
        sum:'0.00'
      })
    }
  },
  del:function(e){
    //删除购物车商品
    var that = this;
    var index = e.currentTarget.dataset.index;
    var item = this.data.paycar;
    var isSel = [];
    wx.request({
      url: 'https://xcx.bjletusq.com/index.php/home/product/delIdCart',
      data: { cart_id: e.currentTarget.dataset.id},
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: 'POST',
      success: function(res) {
        if(res.data.code=='1'){
          wx.showToast({
            title: '删除成功',
            success:function(){           
              if(item.length==1){
                that.setData({
                  isNull: '1'
                })
              }
              //删除当前商品
              item.splice(index, 1);
              item.forEach(function (val, index) {
                isSel[index] = '0';
              })
              //删除后初始化信息
              that.setData({
                paycar: item,
                sum: '0.00',
                isSel: isSel,
                zero: 0
              })
            }
          })
        }
      },
    })
  },
  topay: function(){
    var that = this;
    var paycar = that.data.paycar;
    var isSel = that.data.isSel;
    var URL_control = 0;
    console.log(isSel)
    var topay = '';
    isSel.forEach(function(val,index){
      if(val=='1'){
        topay =topay + paycar[index].id+',';
      }
    })
    topay = topay.substr(0,topay.length-1);
    isSel.forEach(function(val){
      if(val=='1'){
        URL_control = 1;
        return false
      }
    })
    if(URL_control==1){
      wx.navigateTo({
        url: '/pages/payment/payment?actives_type=0&cart_id=' + topay,
      })
    }else{
      wx.showToast({
        title: '请选择商品',
        image:'/pages/source/images/info.png'
      })
    }
  }
})