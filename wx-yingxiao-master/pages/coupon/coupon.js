// pages/coupon/coupon.js
Page({
  data: {
    menu: ['未使用', '已过期'], 
    type:['店铺券','在线券'],
    heightCurrent:'1',
    menuCurrent:'0',
    swiperCurrent:'0',
    coupon:[
      { name: '0', num: '5', demand: '满99减5', info: '仅限活动使用1', time: '2017.10.10-2017.10.17' ,isOverdate:'1'},
      { name: '1', num: '5', demand: '满99减5', info: '仅限活动使用2', time: '2017.10.10-2017.10.25', isOverdate: '0'},
      { name: '0', num: '5', demand: '满99减5', info: '仅限活动使用3', time: '2017.09.11-2017.09.18', isOverdate: '1'},
      { name: '1', num: '5', demand: '满99减5', info: '仅限活动使用4', time: '2017.10.09-2017.10.16', isOverdate: '1'},
      { name: '1', num: '5', demand: '满99减5', info: '仅限活动使用5', time: '2017.10.11-2017.10.18', isOverdate: '1'},
      { name: '1', num: '5', demand: '满99减5', info: '仅限活动使用6', time: '2017.03.25-2017.04.05', isOverdate: '1'},
      { name: '1', num: '5', demand: '满99减5', info: '仅限活动使用7', time: '2017.08.10-2017.08.17', isOverdate: '0'},
      { name: '1', num: '5', demand: '满99减5', info: '仅限活动使用8', time: '2017.10.01-2017.10.30', isOverdate: '1'}, 
      { name: '1', num: '5', demand: '满99减5', info: '仅限活动使用9', time: '2017.10.19-2017.10.26', isOverdate: '0'}, 
      { name: '0', num: '5', demand: '满99减5', info: '仅限活动使用0', time: '2017.11.11-2017.11.18', isOverdate: '0'},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var hei1 = 0;
    var hei2 = 0;
    var height = [];
    if(that.data.coupon.length==0){
      that.setData({
        isNull:'1',
        height:[1000,1000],
      })
    }else{
      that.data.coupon.forEach(function (val, index) {
        if (val.isOverdate > 0) {
          hei1++;
        } else {
          hei2++
        }
      })
      var height1 = hei1 * 220 + 140;
      var height2 = hei2 * 220 + 140;
      height.push(height1);
      height.push(height2);
      that.setData({
        height: height,
      })
    }
  },
  selMenu:function(e){
    this.setData({
      menuCurrent:e.currentTarget.dataset.index,
      swiperCurrent: e.currentTarget.dataset.index,
    })
  },
  changeCurrent:function(e){
    var that = this;
    var index =  e.currentTarget.dataset.index;
    if(index==0){
      that.setData({
        menuCurrent:'1'
      })
    }else{
      that.setData({
        menuCurrent:'0'
      })
    }
    that.setData({
      heightCurrent:index,
    })
  },
})