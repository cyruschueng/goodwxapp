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
    noAnswer:false,
    postData:{
       pageIndex: 1,
       dateType:0,
       status:'',
       text:'',
    },
    pageSize: 10,
    fullListSize: 0,
    pullUpLoadFlag: true,
    loadMoreData: '上拉加载更多',
    hasOrderList: false,
    searchText:''
  },
  _toDetail: function(e) {
    let status = e.currentTarget.dataset.status,
      id = e.currentTarget.dataset.id;

    if (status == '1'||status == '2'||status == '3') {
      wx.navigateTo({
        url: '/src/containers/createOrder/createOrder?id=' + id
      });
    } else if (status == '4'){
      wx.navigateTo({
        url: '/src/containers/createSuccessed/createSuccessed?id=' + id
      });
    } else {
      wx.navigateTo({
        url: '/src/containers/orderDetail/orderDetail?id=' + id
      })
    }
  },
  inputChange(e){
    let key = e.currentTarget.dataset.key,
        value = e.detail.value;
        this.setData({[key]: value});
  },
  _clearSearch(e){
     this.setData({searchText:''})
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
  _cancel(){
    wx.switchTab({
			url: '/src/containers/orderList/orderList'
		});
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
            if(self.data.noAnswer){
              self.setData({
                'noAnswer': false,
              });
            }
          }

          if(!res.resultObject || typeof res.resultObject.orderList !== 'object' ||  !res.resultObject.orderList.length){

              if(self.data.hasOrderList){
                self.setData({
                     hasOrderList: false
                })
              }
              self.setData({noAnswer:true})
          }
        }
      },
      complete: function() {
        if (fn) {
          setTimeout(function(){
            fn()
          },300)
        }
      },
      unloading: unloading===undefined?true:unloading
    })
  },
  searchConfirm(e){
    let self = this;
    this.setData({
        'postData.pageIndex':1,
        'postData.text':e.detail.value
    })
    this._getOrderList('top',null,false)
  },
  onLoad: function() {
    let self = this;
    wx.setNavigationBarTitle({
      title: '查询接车单'
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
  }
})
