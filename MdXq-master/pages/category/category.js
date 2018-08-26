// pages/category/category.js
var app = getApp();
var imgUrl = app.globalData.imgUrl;
var baseUrl = app.globalData.baseUrl;
var shop_id = app.globalData.shop_id;
var sideBarUrl = baseUrl + '/api/project/load-list?shop_id=' + shop_id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sideBarInfo:[],
    secondCatagoryInfo:[],
    thirdCatagoryInfo:[],
    categoryindex:0,
    searchProductInput:'',
    searchProductList:[],
    isSearchResultNull:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSideBarInfo(sideBarUrl, this.data.categoryindex);

  },
  // 跳转到产品列表
  goProductList(e){
    // console.log(e)
    var project_id = e.currentTarget.dataset.project_id;
    wx.navigateTo({
      url: './productList/productList?project_id=' + project_id,
    })
  },
  // 侧边导航数据
  getSideBarInfo(url, categoryindex){
    // debugger
    // console.log(categoryindex)
    // 防止出现this指针问题
    var that = this;
    wx.request({
      url: url,
      success(res){
        // console.log(res);
        if(res.data.success){
          var data = res.data.result;
          for(var i = 0;i < data.length;i++){
            that.setData({ 
              secondCatagoryInfo: data[categoryindex].childMallProject
            })
          } 
          for (var i = 0; i < that.data.secondCatagoryInfo.length;i++){
            that.setData({
              thirdCatagoryInfo: that.data.secondCatagoryInfo[i].childMallProject
            })
            // console.log(that.data.thirdCatagoryInfo)
          }
          that.setData({
            sideBarInfo:data
          })
        }
      },
      fail(error){

      }
    })
  },
  // 选择分类
  selectCategory(e){
    // console.log(e)
    var categoryindex= e.currentTarget.dataset.categoryindex;
    this.setData({
      categoryindex: categoryindex
    })
    this.getSideBarInfo(sideBarUrl,this.data.categoryindex)
  },
  // 搜索框的内容
  searchInput(e){
    var searchProductInput=e.detail.value;
    this.setData({
      searchProductInput: searchProductInput
    })
    // console.log(searchProductInput)
  },
  // 点击搜素
  searchButton(e){
    var that=this;
    var searchProductInput = that.data.searchProductInput;
    wx.request({
      url: baseUrl + '/api/product/query-list?_query.shop_id=' + shop_id+'&_query.product_name=' + searchProductInput,
      success(res){
        // console.log(res)
        if(res.data.success){
          var data = res.data.result.rows;
          for(var i=0;i<data.length;i++){
            data[i].exhibition = imgUrl + data[i].exhibition;
          }
          that.setData({
            searchProductList: data,
            isSearchResultNull:false
          })
        }else{
          wx.showModal({
            title: '提示',
            content: '没有该条件的商品',
          })
          that.setData({
            isSearchResultNull:true
          })
        }
      }
    })
  },
  // 点击去商品详情
  recommendGoProductDetail(e) {
    var product_id = e.currentTarget.dataset.product_id;
    wx.navigateTo({
      url: '../productDetails/productDetails?product_id=' + product_id,
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
    that.setData({
      isSearchResultNull: true
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