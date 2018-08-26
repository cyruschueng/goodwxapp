// pages/catlist/catlist.js
Page({
  data: {
    catCurrent:'0',
    heightCurrent:'0',
  },
  onLoad: function (e) {
    var that = this;
    that.setData({
      catCurrent: e.cat,
      swiperCurrent: e.cat,
      heightCurrent:e.cat
    })
    wx.request({
      url: 'https://xcx.bjletusq.com/index.php/home/common/getCat',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: { admin_user_id: getApp().globalData.shopId },
      success: function (res) {
        that.setData({
          cat:res.data,
        })
        wx.request({
          url: 'https://xcx.bjletusq.com/index.php/home/common/getCatGoods',
          method: 'POST',
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          data: { admin_user_id: getApp().globalData.shopId },
          success: function (res1) {
            console.log(res1.data)
            that.setData({
              items: res1.data,
            })
            var items = res1.data;
            var cat = res.data;
            var length = [];
            var height = [];
            cat.forEach(function(){
              length.push(0)
            })
            for(var i = 0;i<=items.length-1;i++){
              for(var j = 0;j<=cat.length-1;j++){
                if(items[i].catid==cat[j].id){
                    length[j]++;
                }
              }
            }
            length.forEach(function(val,index){
              length[index] = Math.ceil(val/2)*472+100;
            })
            that.setData({
              height:length,
            })
          },
        })
      },
    })
  }, 
  catSel:function(e){
    this.setData({
      catCurrent:e.currentTarget.dataset.index,
      swiperCurrent: e.currentTarget.dataset.index,
      heightCurrent: e.currentTarget.dataset.index,
    })
  },
  swiperSel:function(e){
    this.setData({
      catCurrent: e.detail.current,
      heightCurrent: e.detail.current,      
    })
  },
  todetail:function(e){
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: '/pages/detail/detail?id='+e.currentTarget.dataset.id,
    })
  }
})
