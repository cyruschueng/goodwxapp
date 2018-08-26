// pages/dishes/dishesDetails.js

import * as hoteldata from '../../utils/hoteldata-format';
import * as HotelDataService from '../../services/hotel-service';
import shoppingCarStore from '../../services/shopping-car-store';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    edit: 0,
    texts: [],
    inputText: true,
    inputValue: '',
    inputTextFocus: false,

    dishes: {
      name: '',
      price: '',
      dishesList: []
    },
    dishesImgIndex: 0,
    dishesImgUrls: [],

    shoppingcar: [],
    dishesResult: [],

    dishesid: 0,

    // 菜品弹窗
    dishesTcHiddent: true,
    dishesTc: {},

    prepagetype: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.getDishesDetailsData(+options.dishesid);

    this.checkShoppingCar();

    this.setData({
      dishesid: options.dishesid,
      prepagetype: options.prepagetype ? options.prepagetype : ''
    })

  },

  // 取数据
  getDishesDetailsData(dishesId) {
    var me = this;
    HotelDataService.queryDishesDetails(dishesId).then((result) => {
      // console.log("success = " + JSON.stringify(result.hotel));
      // console.log("queryDishesDetails success...");

      me.setData({
        dishesResult: result,
        dishes: hoteldata.formatDishesDetails(result),
        dishesImgUrls: hoteldata.formatDishesDetailsSwiper(result.dishStyleGroupList)
      })

      console.log("queryDishesDetails success..." + JSON.stringify(this.data.dishes));

    }).catch((error) => {
      console.log(error);
    })
  },
  
  bindDishesImgSwiperChange (e) {
    this.setData({
      dishesImgIndex: e.detail.current
    })
  },
  bindEditTextTap () {

    this.setData({
      edit: !this.data.edit
    })
  },
  bindTextDeleteTap (e) {

    if (this.data.edit == 1) {
      var texts = this.data.texts;
      texts.splice(e.currentTarget.id, 1);

      this.setData({
        texts: texts
      })
    }
  },
  bindTextAddTap () {
    if (this.data.edit == 1) {
   
      this.setData({
        inputText: false,
        inputTextFocus: true
      })
    }
  },
  bindCancelTap () {
    this.setData({
      inputText: true
    })
  },
  bindDefineTap () {

    var texts = this.data.texts;
    texts.push(this.data.inputValue);

    this.setData({
      inputText: true,
      texts: texts
    })
  },

  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  bindJoinShoppingcarTap () {

    var dishesResult = hoteldata.formatLocalShoppingcar(this.data.dishesResult.combo, '菜品', 1, null);
    var newShoppingcar = this.data.shoppingcar;

    console.log('dishesResult .. ' + JSON.stringify(dishesResult));

    newShoppingcar.push(dishesResult);
    shoppingCarStore.save('shoppingcar', newShoppingcar);

    wx.showToast({
      title: '加入成功',
      icon: 'success',
      duration: 2000,
      success: function (res) {
        // 返回 上一页
        wx.navigateBack({
          delta: 1
        })
      }
    })

  },
  bindDishesNameTap (e) {
    this.setData({
      dishesTcHiddent: false,
      dishesTc: e.currentTarget.dataset.dishesinfo
    })
  },
  bindCloseDishesDetailsTap () {
    this.setData({
      dishesTcHiddent: true,
    })
  },

  checkShoppingCar() {
    shoppingCarStore.get('shoppingcar').then(result => {

      console.log('shoppingcar...' + JSON.stringify(result));
      this.setData({
        shoppingcar: result
      })

    }).catch(error => {
      console.log(error);
    });
  },

  goDishesCommentPage () {
    wx.navigateTo({
      url: '../comment/commentListView?dishesid=' + this.data.dishesid + '&prePageType=dishes',
    })
  }

})