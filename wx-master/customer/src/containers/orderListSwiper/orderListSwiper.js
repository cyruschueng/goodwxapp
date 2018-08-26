import {
	ajax
} from '../../../utils/util.js';
Page({
  data: {
    orderList: [

    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    circular:false,
    hasLeft:true,
    hasRight:true,
    current:0,
		totalSize:0,
		loaded:false
  },
  onShow(){
      this.doSearchList();
  },
  doSearchList: function() {
    var self = this;
    ajax({
      url: '/do/customer/receiveCarOrder/queryReceiveCarOrderCardList',
      success: function(res) {
        var data = res;
        //console.log(data);
        if(data.resultCode == "1") {
          wx.hideToast();
					var hasList=false;
          var resultObject = data.resultObject;
          var totalSize=typeof resultObject.orderList==='object'?resultObject.orderList.length:0;

          self.setData({
            orderList: resultObject.orderList,
						totalSize:totalSize,
						loaded:true
          });
          self.bindchange();
        } else if(data.resultCode == "2") {
          wx.hideToast();
        } else {
          wx.hideToast();
          wx.showModal({
            title: '提示',
            content: data.resultMessage,
            showCancel: false,
            confirmColor: "#ff6600",
            success: function(res) {
            }
          })
        }
      },
      fail: function() {
        wx.hideToast();
      },
      complete: function() {

      }
    });
  },
  bindchange:function(e){
     var current=typeof e==='object'?e.detail.current:this.data.current;
     console.log(current)
     this.setData({
        current:current
     })
     if(current==0){
         this.setData({
             hasLeft:false
         })
     }else{
        if(!this.data.hasLeft){
          this.setData({
              hasLeft:true
          })
        }
     }
     if(current==this.data.orderList.length-1){
       this.setData({
           hasRight:false
       })
     }else{
       if(!this.data.hasRight){
         this.setData({
             hasRight:true
         })
       }
     }
  },
  switchToDetail:function(e){
      var dataset = e.currentTarget.dataset;
      wx.navigateTo({
        url: '../orderDetail/orderDetail?id=' + dataset.itemid
      });
  },
  switchToList:function(){
    wx.navigateTo({
      url: '../orderList/orderList'
    });
  }
})
