var app = getApp()
Page({

  data: {
    OrderList:[],
    shopId: '',
    bizId: '',
    memberId: 0,
    limit:6,
    offset:0,
    total:'',
    newtotal:''
  },
  onLoad:function(){
    wx.setNavigationBarTitle({
      title: '全部订单'
    })
    var that = this;
    that.getOrderList()

    
  },

  
  onReachBottom: function () {

    this.setData({
      offset: this.data.offset+1
    })

    this.getOrderList()
  },

 
  onPullDownRefresh: function () {
    this.setData({
      offset: 0
    })
    setTimeout(()=>{
      this.getOrderList()
    },100)
  },

  //获取订单列表
  getOrderList:function(){
    var that = this;
    var subdata = {};

    subdata.limit = this.data.limit;
    subdata.offset = this.data.limit * this.data.offset;

    

    app.commonAjax('/shop/manage/order/list', ['shopId'], subdata,  (res) => {
      

      if (this.data.offset === 0){

        if (res.data.data.rows.length==0){
          wx.showToast({
            title: '暂无数据',
            image: '/image/i/x.png',
            duration: 2000,
            success: () => {
              setTimeout(() => {
                // wx.navigateBack({
                //   delta: 1
                // })
              }, 2000)
            }
          })
        }

        that.setData({
          OrderList: res.data.data.rows,
          total: res.data.data.total,
          newtotal: res.data.data.rows.length
        })

      } else if (this.data.offset>0){
        var oldDaskList = this.data.OrderList;
        for (var i in res.data.data.rows) {
          oldDaskList.push(res.data.data.rows[i])
        }
        this.setData({
          OrderList: oldDaskList,
          newtotal: oldDaskList.length
        })
      }

      wx.stopPullDownRefresh()
      


    }, app,'get')

  },

  //跳转到详情页
  gominiDetail: function(e){
    var dataset = e.currentTarget.dataset;
    wx.navigateTo({
      url: '/page/order/miniDetail/index?id=' + dataset.id + '&orderstatus=' + dataset.orderstatus + '&billmoney=' + dataset.billmoney 
    })
  }
})