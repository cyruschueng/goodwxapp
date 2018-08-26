Page({
  data: {
    order_sn:'0'
  },/*
    进入share有3种情况
    1. 开团成功,进入邀请好友.(share=1)
    2. 好友进入邀请页面,参与邀请人的团
    3. 邀请人在开团页面点击开团(share=1)
  */
  onLoad: function (e) {
    var that = this;
    console.log(e)
    //邀请好友,两种情况入口(支付成功后以及在此进入该拼团后查询跳转)
    if(e.share==1){
      that.setData({
        tip:'邀请好友参加团',
        share_type:'share',
        togroup:'',
        order_sn:e.order_sn,
      })
      //进入分享页面,所以分享出去的页面share均为2
    }else if(e.share==2||e.order_sn){
      that.setData({
        tip:'立即参加拼团',
        share_type:'none',
        togroup: 'togroup',
      })
      //获取进入分享页面的group_head_id
      if(e.group_head_id){
        that.setData({
          group_head_id: e.group_head_id
        })
      }
    }
    // share为1的有两种情况,order_sn为支付成功后跳转,groupid(group_head_id)为查询后直接跳转
    //根据id查询不同的接口
    var id = '0';
    if(!e.order_sn){
      id = e.group_head_id;
      wx.request({
        url: 'https://xcx.bjletusq.com/index.php/home/group/getGroupInfo',
        data: { id: id },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        success: function (res) {
          console.log(res)
          that.setData({
            item: res.data,
            group_head_id: e.group_head_id
          })
          //参团人
          var userlist = res.data.userlist;
          var joiner = userlist;
          if (joiner.length>=1){
            if (that.data.item.userlist.length == res.data.total_count_num){
              console.log(1)
              joiner.splice(0, 1);
              that.setData({
                joiner: joiner,
                tip: '拼团完成,等待商家通知',
                share_type: 'none',
                togroup: '',   
              })
            }else{
              joiner.splice(0, 1);
              that.setData({
                joiner: joiner
              })
            }
          }else{
            that.setData({
              joiner:joiner
            })
          }
          //倒计时
          var endtimeStamp = res.data.etime;
          var endtime = new Date().getTime();
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
      })      
    }else{
      wx.request({
        url: 'https://xcx.bjletusq.com/index.php/home/user/getOrderInfo',
        method: 'POST',
        data: { order_sn: e.order_sn },
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        success: function (res) {
          id = res.data.rows.group_head_id;
          wx.request({
            url: 'https://xcx.bjletusq.com/index.php/home/group/getGroupInfo',
            data: { id: id },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'POST',
            success: function (res) {
              console.log(res)
              that.setData({
                item: res.data,
                group_head_id:id
              })
              //参团人
              var userlist = res.data.userlist;
              var joiner = userlist
              if (joiner.length >= 1) {
                if (that.data.item.userlist.length == res.data.total_count_num) {
                  console.log(1)
                  joiner.splice(0, 1);
                  that.setData({
                    joiner: joiner,
                    tip: '拼团完成,等待商家通知',
                    share_type: 'none',
                    togroup: '',
                  })
                } else {
                  joiner.splice(0, 1);
                  that.setData({
                    joiner: joiner
                  })
                }
              } else {
                that.setData({
                  joiner: joiner
                })
              }
              //倒计时
              var endtimeStamp = res.data.etime;
              var endtime = new Date().getTime();
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
          })
        },
      })      
    }
  },
  togroup: function () {
    var that = this;
    wx.navigateTo({
      url: '/pages/group/group?id='+that.data.item.product_goods_id+'&group_head_id='+that.data.group_head_id,
    })
  },
  /**cart_id=1700&actives_type=2&group_goods_id=2&group_head_id=undefined
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    // console.log(getApp().globalData)
    if (that.data.share_type=='share'){
      return {
        title: '【' + getApp().globalData.uesrinfo.nickName + '】  邀请你参加【' + that.data.item.goods_name +'】商品的'+that.data.item.goods_price +'元的拼团活动 快来一起购买吧',
        path: '/pages/share/share?group_head_id=' + this.data.group_head_id + '&uesr_id=' + getApp().globalData.userid+'&share=2'
      }
    }else{
      return false;
    }
  }
})