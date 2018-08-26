var app = getApp();
var imgUrl = app.globalData.imgUrl;
var baseUrl = app.globalData.baseUrl;
var collection_idsArr=[];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectListInfo:[],
    isCollectNull:false,
    customer_id:0,
    isEditCollect:false,
    collection_ids:'',
    isSelectCollectTotal:false,
    isTotalOrSignal:false,
    isSignalOrTotal:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  getCollectListInfo(url){
    var that=this;
    wx.request({
      url: url,
      success(res){
        console.log(res)
        if(res.data.success){
          var data = res.data.result;
          for(var i=0;i<data.length;i++){
            data[i].mallProduct.exhibition = imgUrl + data[i].mallProduct.exhibition;
            data[i].checked=false;
          }
          that.setData({
            collectListInfo: data,
          })
          // console.log(that.data.collectListInfo)
        }else{
          that.setData({
            isCollectNull:true
          })
        }
      }
    })
  },
  // 点击编辑购物车
  editCollect(e){
    var collectListInfo = this.data.collectListInfo;
    this.setData({
      isEditCollect: !this.data.isEditCollect
    })
    if (!this.data.isEditCollect){
      collection_idsArr=[];
      for (var i = 0; i < collectListInfo.length; i++) {
        collectListInfo[i].checked = false;
      }
      this.setData({
        collection_ids:'',
        isSelectCollectTotal: false,
        isTotalOrSignal: false, 
        collectListInfo: collectListInfo
      })
    }
    
  },
  // 单选
  selectCollectSingle(e){
    // console.log(e)
    var collection_id = e.currentTarget.dataset.collection_id;
    var checked = e.detail.value;
    var checkedIndex = e.currentTarget.dataset.index;
    if (this.data.isSelectCollectTotal){
      // console.log(this.data.isSelectCollectTotal)
      this.setData({
        isTotalOrSignal:true
      })
      var collection_ids = this.data.collection_ids;
      var collection_idsArr1 = collection_idsArr;
      var newcollection_idsArr = collection_idsArr1.length == 0 ? collection_ids.split(',') : collection_idsArr1;
      for (var i = 0; i < newcollection_idsArr.length; i++) {
        if (newcollection_idsArr[i] == collection_id) {
          newcollection_idsArr.splice(i, 1)
        }
      }
      this.setData({
        collection_ids: newcollection_idsArr.join(',')
      })
    }else{
      if (checked != '') {
        collection_idsArr.push(collection_id)
      } else {
        for (var i = 0; i < collection_idsArr.length; i++) {
          if (collection_idsArr[i] == collection_id) {
            collection_idsArr.splice(i, 1)
          }
        }
      }
      this.setData({
        isSignalOrTotal:true
      })
    }
    
    if (collection_idsArr.length == this.data.collectListInfo.length){
      this.setData({
        isSelectCollectTotal:true,
        isTotalOrSignal:false
      })
    }
  },
  // 多选
  selectCollectTotal(e){
    var collectListInfo = this.data.collectListInfo;
    var collection_ids = this.data.collection_ids;
    if (this.data.isSignalOrTotal){
      collection_idsArr=[];
      for (var i = 0; i < collectListInfo.length; i++) {
        collectListInfo[i].checked = !collectListInfo[i].checked;
        collection_ids = collection_ids + collectListInfo[i].collection_id + ',';
      }
      this.setData({
        collection_ids: collection_ids,
        collectListInfo: collectListInfo
      })
    }else{
      if (this.data.isSelectCollectTotal) {
        for (var i = 0; i < collectListInfo.length; i++) {
          collectListInfo[i].checked = !collectListInfo[i].checked;
        }
        collection_ids = ''
        this.setData({
          collectListInfo: collectListInfo,
          collection_ids: collection_ids
        })
        collection_idsArr = collection_idsArr
      } else {
        for (var i = 0; i < collectListInfo.length; i++) {
          collectListInfo[i].checked = !collectListInfo[i].checked;
          collection_ids = collection_ids + collectListInfo[i].collection_id + ',';
        }
        this.setData({
          collection_ids: collection_ids,
          collectListInfo: collectListInfo
        })
      }
    }
    
    this.setData({
      isSelectCollectTotal: !this.data.isSelectCollectTotal
    })
    
  },
  // 点击删除
  deleteCollect(e){
    var that = this;
    var collection_ids = '' ;
    console.log(collection_idsArr)
    if (that.data.isSelectCollectTotal && that.data.isTotalOrSignal) {
      collection_ids = collection_idsArr.join(',');
    }
    if (that.data.isSelectCollectTotal){
      collection_ids = collection_idsArr.length == 0 ? that.data.collection_ids.slice(0, that.data.collection_ids.length - 1) : collection_idsArr.join(',');
    }else{
      collection_ids = collection_idsArr.join(',');
    }
    wx.request({
      url: baseUrl + '/api/collection/delete-batch?collection_ids=' + collection_ids,
      success(res){
        console.log(res)
        if(res.data.success){
          wx.showToast({
            title: '删除成功',
          })
          var collectList = baseUrl + '/api/collection/load-list?customer_id=' + that.data.customer_id;
          that.getCollectListInfo(collectList)
        }else{
          wx.showToast({
            title: '删除失败',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
    wx.getStorage({
      key: 'customer_id',
      success: function(res) {
        that.setData({
          customer_id:res.data
        })
        var collectList = baseUrl + '/api/collection/load-list?customer_id=' + that.data.customer_id;
        // console.log(collectList)
        that.getCollectListInfo(collectList)
       
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})