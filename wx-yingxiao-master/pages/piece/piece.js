// pages/piece/piece.js
Page({
  data: {
    num:'1',
    seletedColor:'颜色',
    seletedSize:'尺码',
    hidden:'1',
    colorId:'-1',
    sizeId:'-1',
    isEnd:'0',
  },
  onLoad: function (e) {
    var that = this;
    //此id为group_head_id,获取拼团信息
    var id = e.id;
    that.setData({
      id: e.id,
      goods_id:e.goods_id
    })
    //拼团商品信息
    wx.request({
      url: 'https://xcx.bjletusq.com/index.php/home/group/getGroupInfo',
      method: 'POST',
      data: { id: id },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: res => {
        that.setData({
          detail: res.data,
        })
        //参团人列表
        var userlist = res.data.userlist;
        //区别开团人(团长)和参团人
        var joiner = userlist;
        if (joiner.length >= 1) {
          joiner.splice(0, 1);
          console.log(joiner)
          that.setData({
            joiner: joiner
          })
        } else {
          that.setData({
            joiner: joiner
          })
        }
        //时间倒计时
        var endtimeStamp = res.data.etime;
        var endtime = new Date().getTime();
        //拼团结束
        if(endtimeStamp<0){
          that.setData({
            isEnd:'1'
          })
          wx.showToast({
            title: '拼团结束',
            image:'/pages/source/images/info.png',
            duration:3000,
            success:function(){
              setTimeout(function(){
                wx.navigateBack({})
              },2000)
            }
          })
        }
        //剩余时间 秒
        var leftsecond = (endtimeStamp * 1000 - endtime) / 1000;
        var d = parseInt(leftsecond / 3600 / 24);
        var h = parseInt((leftsecond / 3600) % 24);
        var m = parseInt((leftsecond / 60) % 60);
        var s = parseInt(leftsecond % 60);
        function isDouble(num) {
          return num < 10 ? '0' + num : num
        }
        that.setData({
          day: d,
          hour: isDouble(h),
          minute: isDouble(m),
          second: isDouble(s)
        })
        setInterval(function () {
          leftsecond--;
          var d = parseInt(leftsecond / 3600 / 24);
          var h = parseInt((leftsecond / 3600) % 24);
          var m = parseInt((leftsecond / 60) % 60);
          var s = parseInt(leftsecond % 60);
          that.setData({
            day: d,
            hour: isDouble(h),
            minute: isDouble(m),
            second: isDouble(s)
          })
        }, 1000)
      },
      complete: function () {
        wx.request({
          url: 'https://xcx.bjletusq.com/index.php/home/product/index',
          method: 'POST',
          data: { admin_user_id: getApp().globalData.shopId },
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          success: function (res) {
            that.setData({
              childItem: res.data,
            })
          },
        })
      }
    }); 
  },
  changeColor:function(e){
    console.log(e.currentTarget);
    var index = e.currentTarget.dataset.id;
    this.setData({
      aaa:'background:red;color:#fff',
    })
  },
  topay:function(){
    var that = this;
    //根据id请求商品信息
    wx.request({
      url: 'https://xcx.bjletusq.com/index.php/home/product/goodsinfo',
      method: 'POST',
      data: { id: that.data.goods_id },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: res => {
        console.log(res.data);
        var len = res.data.goods_img.length;
        that.setData({
          info: res.data,
          hidden: '0',
          group_price: res.data.group.group_price,
        })
      },
    }) 
  },
  changeColor: function (e) {
    var colorId = e.currentTarget.dataset.index;
    this.setData({
      colorCurrent: colorId,
      seletedColor: this.data.info.color[colorId].attr_value,
      colorId: e.currentTarget.dataset.index
    })
  },
  changeSize: function (e) {
    var sizeId = e.currentTarget.dataset.index;
    this.setData({
      sizeCurrent: sizeId,
      seletedSize: this.data.info.size[sizeId].attr_value,
      sizeId: e.currentTarget.dataset.index
    })
  },
  //关闭弹窗页面
  close: function () {
    this.setData({
      hidden: '1',
      overflow: ''
    })
  },
  //提交团购信息
  tobuy: function () {
    var that = this;
    // 判断是否选择颜色,尺寸
    if (that.data.colorId != '-1' && that.data.sizeId != '-1') {
        // 开启团购支付
        wx.request({
          url: 'https://xcx.bjletusq.com/index.php/home/product/addCart',
          data: { user_id: getApp().globalData.userid, goods_id: that.data.goods_id, goods_name: that.data.info.goods_name, goods_price: that.data.group_price, goods_number: 1, goods_attr_color: that.data.info.color[that.data.colorId].attr_value, goods_attr_size: that.data.info.size[this.data.sizeId].attr_value, actives_type: '2'},
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          method: 'POST',
          success: function (res) {
            wx.navigateTo({
              url: '/pages/payment/payment?cart_id=' + res.data.cart_id + '&actives_type=2&group_goods_id=' + that.data.info.group.id+'&group_head_id='+that.data.id
            })
          },
        })
    }else{
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