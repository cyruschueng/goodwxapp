//index.js
//获取应用实例

import {
  ajax
} from '../../../utils/util.js';
var app = getApp()

Page({
  data: {
    list: [],
    //控件用
    isLoadMore: false,

    postData:{
       pageIndex: 1,
       dateType:'',
       status:'',
    },
    pageSize: 10,
    fullListSize: 0,
    pullUpLoadFlag: true,
    loadMoreData: '上拉加载更多',
    hasOrderList: false,
    sortData:{
        dateType:{code:0,text:'全部时间'},
        status:{code:0,text:'全部状态'}
    },
    sortOptions:{
        dateType:[{code:0,text:'全部时间'},{code:1,text:'今天'},{code:3,text:'本周'},{code:5,text:'本月'},{code:2,text:'昨天'},{code:4,text:'上周'},{code:6,text:'上月'}],
        status:[{code:'',text:'全部状态'},{code:1,text:'待扫码'},{code:2,text:'待检车'},{code:3,text:'待报价'},{code:4,text:'待同意'},{code:5,text:'已同意'},{code:6,text:'不同意'}]
    },
    sortChoosed:'',
  },
  _toDetail: function(e) {
    let status = e.currentTarget.dataset.status,
      step=e.currentTarget.dataset.step,
      id = e.currentTarget.dataset.id;

    if (status == '1'||status == '2'||status == '3') {
      wx.navigateTo({
        url: '/src/containers/createOrder/createOrder?id=' + id
      });
    } else if (status == '4'){
      wx.navigateTo({
        url: '/src/containers/createSuccessed/createSuccessed?id=' + id
      });
    } else if(status=='7'){
        if(step<4){
          wx.navigateTo({
            url: '/src/containers/createHistoryOrder/createHistoryOrder?id=' + id
          });
        }else{
          wx.navigateTo({
            url: '/src/containers/orderDetail/orderDetail?id=' + id
          })
        }
    }else {
      wx.navigateTo({
        url: '/src/containers/orderDetail/orderDetail?id=' + id
      })
    }
  },
  onPullDownRefresh: function() {
    let self = this;
    this.setData({
      pullUpLoadFlag: true
    })
    wx.showNavigationBarLoading() //在标题栏中显示加载
    setTimeout(function() {
      self._scrollTop('top', function() {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      })
    }, 500)

  },
  onReachBottom: function() {

    let self = this;
    this._scrollEnd('end', function() {
      self.setData({
        isLoadMore: false
      })
    })
  },
  toCreateOrder:function(){
     wx.switchTab({
         url:"/src/containers/transferCreaterOrder/transferCreaterOrder",
     })
  },
  _chooseSort(e){
     var type=e.currentTarget.dataset.type;
     if(this.data.sortChoosed==type){
         this.setData({
             sortChoosed:''
         })
     }else{
       this.setData({
           sortChoosed:type
       })
     }
  },
  _scrollEnd: function(type, fn) {
    let self = this;
    if (!this.data.isLoadMore && this.data.pullUpLoadFlag) {
      if (this.data.postData.pageIndex * this.data.pageSize <= this.data.fullListSize) {
        var pageIndex = parseInt(self.data.postData.pageIndex) + 1;
          self.setData({
            'postData.pageIndex': pageIndex,
            isLoadMore: true,
          });
        this._getOrderList(type, fn);
      } else {
        this.setData({
          pullUpLoadFlag: false
        })
      }

      //			return;
      //			if(self.data.list.length >= self.data.fullListSize) {
      //				this.setData({
      //					'isLoadMore': false
      //				});
      //				return;
      //			}
      //			if(!this.data.isLoadMore) {
      //				//          this.setData({'isLoadMore':true});
      //				this._getOrderList();
      //			}
    }

  },
  _scrollTop(type, fn) {
    let self = this;
    self.setData({
      'postData.pageIndex': 1,
    });
    this._getOrderList(type, fn);
  },
  _getOrderList(type,fn,unloading) {
    let self = this;
    ajax({
      url: '/do/garageAdmin/receiveCarOrder/queryReceiveCarOrderList', //仅为示例，并非真实的接口地址
      data:this.data.postData,
      success: function(res) {
        if (res.resultCode == "2") {

        } else if (res.resultCode == "1") {
          self.setData({
            fullListSize: res.resultObject.fullListSize
          });
          if (type == "end") {
            if (res.resultObject && typeof res.resultObject.orderList === 'object' && res.resultObject.orderList.length) {
                self.setData({
                  'list': self.data.list.concat(res.resultObject.orderList),
                  hasOrderList: true
                });
            }
          } else if (type == "top") {
            self.setData({
              'list': res.resultObject.orderList,
            });
          }
          // if((!res.resultObject || typeof res.resultObject.orderList !== 'object' ||  !res.resultObject.orderList.length)&&self.data.hasOrderList){
          //     self.setData({
          //          hasOrderList: false
          //     })
          // }
        }
      },
      complete: function() {
        if (fn) {
          setTimeout(function(){
            fn()
          },300)
        }
      },
      unloading:unloading===undefined?true:unloading
    })
  },
  _sortSelect(e){
     var code=e.target.dataset.code;
     var text=e.target.dataset.text;
     this.data.postData=Object.assign({},this.data.postData,{pageIndex:1})
     this.data.postData[this.data.sortChoosed]=code;
     this.setData({
         sortData:Object.assign({},this.data.sortData,{[this.data.sortChoosed]:{
             code:code,
             text:text
         }}),
         sortChoosed:''

     })
     this._getOrderList('top',null,false)
  },
  _toSearch(){
    wx.navigateTo({
      url: '/src/containers/search/search'
    })
  },
  onLoad: function() {
    let self = this;
    wx.setNavigationBarTitle({
      title: '接车单'
    });
    wx.getSystemInfo({
      success: function(res) {
        self.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    });
  },
  onShow: function() {
    let self = this;
    this.setData({
      list: [],
      'postData.pageIndex': 1,
      sortChoosed:''
    });
    this._getOrderList('end', function() {
      self.setData({
        isLoadMore: false
      })
    });
    wx.setStorageSync('fromTabbarUrl', "/src/containers/orderList/orderList");
  }
})
