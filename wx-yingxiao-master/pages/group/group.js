// pages/group/group.js
Page({
  data: {
    colorCurrent: '999',
    sizeCurrent: '999',
    hidden:'0',
    num:1,
    seletedColor: '颜色',
    seletedSize: '尺码',
    actives_type:'2',
    current:0,
    colorId:'-1',
    sizeId:'-1',
    slogan:'一键开团',
  },
  onLoad: function (e) {
    var that = this;
    //若为拼团(区别开团)
    if(e.group_head_id){
      that.setData({
        group_head_id:e.group_head_id,
        slogan:'一键参团',
        // hidden:'2'
      })
    }else{
      that.setData({
        group_head_id: '0'
      })     
    }
    //获取商品id
    var id = e.id;
    that.setData({
      id: e.id
    })
    //根据id请求商品信息
    wx.request({
      url: 'https://xcx.bjletusq.com/index.php/home/product/goodsinfo',
      method: 'POST',
      data: { id: id },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: res => {
        console.log(res.data);
        var len = res.data.goods_img.length;
        that.setData({
          detail: res.data,
          co_price:res.data.goods_price,
          group_price: res.data.group.group_price,
          imgLen: len,
        })
        wx.request({
          url: 'https://xcx.bjletusq.com/index.php/home/group/getOfferedList',
          data: { group_goods_id: res.data.group.id },
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          method: 'POST',
          success: function (res1) {
            console.log(res1.data)
            if(res1.data.length==0){
              that.setData({
                hasList:'0'
              })
            }else{
              res1.data.forEach(function (val, index) {
                timer(val.etime, val)
                res1.data[index] = val
              })
              that.setData({
                group: res1.data
              })
            }
            //拼团列表信息翻译
            if (res1.data.length >= 3) {
              var lastgroup = [];
              var more = [];
              lastgroup.push(res1.data[0]);
              lastgroup.push(res1.data[1]);
              for (var i = 2; i <= res1.data.length - 1; i++) {
                more.push(res1.data[i]);
              }
              that.setData({
                lastgroup: lastgroup,
                more: more
              })
            } else {
              that.setData({
                lastgroup: res1.data,
                isshort: '1'
              })
            }
            //设置倒计时
            setInterval(function(){
              res1.data.forEach(function(val,index){
                  timer(val.etime,val)
                  res1.data[index] = val
              })
              that.setData({
                group: res1.data
              })
              //拼团列表信息翻译
              if (res1.data.length >= 3) {
                var lastgroup = [];
                var more = [];
                lastgroup.push(res1.data[0]);
                lastgroup.push(res1.data[1]);
                for (var i = 2; i <= res1.data.length - 1; i++) {
                  more.push(res1.data[i]);
                }
                that.setData({
                  lastgroup: lastgroup,
                  more: more
                })
              } else {
                that.setData({
                  lastgroup: res1.data,
                  isshort: '1'
                })
              }

            },1000)
            //倒计时方法
            function timer(endtimeStamp,item){
              var endtime = new Date().getTime();
              // //剩余时间 秒
              var leftsecond = (endtimeStamp * 1000 - endtime) / 1000;
              item.day = parseInt(leftsecond / 3600 / 24);
              item.hour = isDouble(parseInt((leftsecond / 3600) % 24));
              item.minute = isDouble(parseInt((leftsecond / 60) % 60));
              item.second = isDouble(parseInt(leftsecond % 60)); 
            };
            function isDouble(num) {
              return num < 10 ? '0' + num : num
            }    
          },
        })  
      },
    }) 
  },
  //关闭弹窗页面
  close:function(){
    this.setData({
      hidden:'0',
      overflow:''
    })
  },
  //参加已有的拼团
  toGroup:function(){
    wx.navigateTo({
      url: '/',
    })
  },
  //查看更多拼团信息
  more:function(){
    this.setData({
      hidden:'1',
      overflow:'hidden'
    })
  },
  //单独购买
  sub:function(){
    var co_price = this.data.co_price
    this.setData({
      hidden:'2',
      subtype:'1',
      price:co_price,
      tip:'购买'
    })
  },
  //开启一个拼团
  startGroup: function () {
    var that = this;
    //判断是否可以参加拼团
    wx.request({
      url: 'https://xcx.bjletusq.com/index.php/home/group/checkUserOffered',
      data: { group_goods_id: that.data.detail.group.id, user_id: getApp().globalData.userid },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: 'POST',
      success: function (res) {
        console.log(res)
        // code为1 表示可以正常开团
        if(res.data.code=='1'){
          var group_price = that.data.group_price;
          that.setData({
            hidden: '2',
            subtype: '2',
            price: group_price,
            tip: '一键拼团'
          })
          //code为2  表示已经开团
        }else{
          wx.navigateTo({
            url: '/pages/share/share?share=1&group_head_id='+res.data.group_head_id,
          })
          that.setData({
            tip:'邀请参团'
          })
        }
      },
    })    
  },
  //选择颜色,和颜色
  changeColor:function(e){
    var colorId = e.currentTarget.dataset.index;
    this.setData({
      colorCurrent:colorId,
      seletedColor:this.data.detail.color[colorId].attr_value,
      colorId:e.currentTarget.dataset.index
    })
  },
  changeSize:function(e){
    var sizeId = e.currentTarget.dataset.index;
    this.setData({
      sizeCurrent: sizeId,
      seletedSize: this.data.detail.size[sizeId].attr_value,
      sizeId : e.currentTarget.dataset.index
    })
  },
  //数量控制
  add:function(){
    this.setData({
      num:this.data.num+1,
    })
  },
  reverse:function(){
    if(this.data.num<=1){
      this.setData({
        num:1
      })
    }else{
      this.setData({
        num:this.data.num-1
      })
    }
  },
  //查看更多拼团信息
  togroup:function(e){
    var that = this;
    //判断是否可以参加拼团
    wx.request({
      url: 'https://xcx.bjletusq.com/index.php/home/group/checkUserOffered',
      data: { group_goods_id: that.data.detail.group.id, user_id: getApp().globalData.userid },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: 'POST',
      success: function (res) {
        console.log(res)
        // code为1 表示可以正常开团
        if (res.data.code == '1') {
          var group_price = that.data.group_price;
          wx.navigateTo({
            url: '/pages/piece/piece?id=' + e.currentTarget.dataset.id + '&goods_id=' + that.data.id,
          })
          //code为2  表示已经开团
        } else {
          wx.navigateTo({
            url: '/pages/share/share?share=1&group_head_id=' + res.data.group_head_id,
          })
        }
      },
    })
  },
  //提交团购信息
  tobuy:function(){
    console.log(getApp().globalData.userid)
    var that = this;
    // 判断是否选择颜色,尺寸
    if (that.data.colorId != '-1' && that.data.sizeId != '-1') {
      //判断点击来源是否为立即购买
      if (that.data.subtype=='1') {
        //单独购买
        console.log(that.data.num)
        wx.request({
          url: 'https://xcx.bjletusq.com/index.php/home/product/addCart',
          data: { user_id: getApp().globalData.userid, goods_id: that.data.id, goods_name: that.data.detail.goods_name, goods_price: that.data.price * that.data.num, goods_number: that.data.num, goods_attr_color: that.data.detail.color[that.data.colorId].attr_value, goods_attr_size: that.data.detail.size[this.data.sizeId].attr_value, actives_type: 0 },
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          method: 'POST',
          success: function (res) {
            wx.navigateTo({
              //参数完整
              url: '/pages/payment/payment?cart_id=' + res.data.cart_id+'&actives_type=0' ,
            })
          },
        })
      } else {
        console.log(that.data)
        //开启团购支付
        wx.request({
          url: 'https://xcx.bjletusq.com/index.php/home/product/addCart',
          data: { user_id: getApp().globalData.userid, goods_id: that.data.id, goods_name: that.data.detail.goods_name, goods_price: that.data.price, goods_number: 1, goods_attr_color: that.data.detail.color[that.data.colorId].attr_value, goods_attr_size: that.data.detail.size[this.data.sizeId].attr_value, actives_type: '2', },
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          method: 'POST',
          success: function (res) {
            console.log(that.data.group_head_id)
            wx.navigateTo({
              url: '/pages/payment/payment?cart_id=' + res.data.cart_id + '&actives_type=2&group_goods_id=' + that.data.detail.group.id +'&group_head_id='+that.data.group_head_id
            })
          },
        })
      }
    } else {
      wx.showToast({
        title: '请选择参数',
        image: '/pages/source/images/err.png',
        duration: 2000,
        success: function () {
          that.setData({
            seltedColor: '颜色',
            seletedSize: '尺码',  
          })
        }
      })
    }
  }
})