// pages/dishes/dishesListView.js

import * as hoteldata from '../../utils/hoteldata-format';
import * as HotelDataService from '../../services/hotel-service';
import shoppingCarStore from '../../services/shopping-car-store';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    prePageType: '',

    disheList: [],
    dishesResult: [],
    shoppingcars: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      prePageType: options.prepagetype ? options.prepagetype : ''
    })

    this.getShoppingCarInStore();
    this.getDishesList();

  },

  getShoppingCarInStore() {
    shoppingCarStore.get('shoppingcar').then(result => {
      this.setData({
        'shoppingcars': result
      })
    }).catch(error => {
      console.log(error);
    });
  },
  getDishesList() {
    HotelDataService.queryDishesList().then((result) => {
      //菜品 数据
      this.setData({
        dishesResult: result,
        disheList: hoteldata.formatWeddingmenu(result)
      })
    }).catch((error) => {
      console.log(error);
    })
  },

  // 菜品选择
  bindDishesSelectTap(e) {

    var id = e.currentTarget.id;
    var disheList = this.data.disheList;
    var disheInfo = e.currentTarget.dataset.disheinfo;

    disheList.forEach((dishe) => {
      dishe.selected = false;
    })
    disheList[id].selected = true;

    this.setData({
      disheList: disheList
    })

    // 放入购物车
    var dishesResult = this.data.dishesResult;
    console.log('dishesResult[id] = ' + JSON.stringify(dishesResult[id]));
    var tabNumsText = wx.getStorageSync('ballTablenNum');
    var dishesInfo = hoteldata.formatLocalShoppingcar(dishesResult[id], '菜品', tabNumsText);

    var shoppingcars = this.data.shoppingcars;
    shoppingcars.push(dishesInfo)

    shoppingCarStore.save('shoppingcar', shoppingcars);
    
    wx.navigateBack({
      delta: 1
    })

  },

  goDishesDetailsPage(e) {
    wx.navigateTo({
      url: '../dishes/dishesDetails?dishesid=' + e.currentTarget.id + '&prepagetype=' + this.data.prePageType,
    })
  },
  
})