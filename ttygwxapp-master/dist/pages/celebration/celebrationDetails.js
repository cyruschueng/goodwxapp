// pages/celebration/celebrationDetails.js

import * as hoteldata from '../../utils/hoteldata-format';
import * as HotelDataService from '../../services/hotel-service';
import shoppingCarStore from '../../services/shopping-car-store';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    celebrationResult: {},
    celebration: null,
    celebrationid: '',

    selectPackage: true,
    checkboxItems: [],

    packageStage: {
      packName: '',
      packPrice: 0,
      stage: true,
      stageprice: 0
    },

    shoppingcar: [],
    prepagetype: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.setData({
      celebrationid: options.celebrationid,
      prepagetype: options.prepagetype ? options.prepagetype : ''
    })
    // this.getCelebrationDetailsData(options.celebrationid);

    this.getCelebrationDetailsData(this.data.celebrationid);
    this.checkShoppingCar();

  },

  // 取数据
  getCelebrationDetailsData(celebrationId) {
    var me = this;
    console.log('celebrationId = ' + celebrationId);
    HotelDataService.queryCelebrationDetails(celebrationId).then((result) => {
      console.log("queryCelebrationDetails success = " + JSON.stringify(result));

      if (result != '') {
        var packageStage = {
          packName: result.basename,
          stage: true,
          stageprice: result.stagePrice
        }
        me.setData({
          celebrationResult: result,
          celebration: hoteldata.formatCelebrationDetails(result),
          checkboxItems: hoteldata.formatCelebrationDetailsCheckbox(result),
          packageStage: packageStage
        })
        console.log('celebration ... ' + JSON.stringify(me.data.celebration));
        wx.setNavigationBarTitle({
          title: result.name,
        })
      }

    }).catch((error) => {
      console.log(error);
    })
  },

  bindAppointmentTap () {
    this.setData({
      selectPackage: false
    });
  },
  bindCancelTap () {
    this.setData({
      selectPackage: true
    });
  },
  bindDefineTap () {
    this.setData({
      selectPackage: true
    });

    console.log('cele result ... ' + JSON.stringify(this.data.celebrationResult));

    // 套餐、 全息 判断
    var packageStage = this.data.packageStage;
    var checkboxItems = this.data.checkboxItems;
    checkboxItems.forEach(item => {
      if (item.checked == true) {
        packageStage.packName = item.name;
        packageStage.packPrice = item.value;
        packageStage.stage = item.stage;
        packageStage.stageprice = item.stagePrice;
      }
    })
    this.setData({
      packageStage: packageStage
    })

    wx.setStorage({
      key: "packageStage",
      data: packageStage
    })

    // 保存购物车
    this.joinShoppingCar(packageStage);

    wx.navigateTo({
      url: '../shoppingCar/shoppingCarIn',
    })
  },
  bindMorePicTap () {
    wx.navigateTo({
      url: 'celebrationShowMore?celebrationid=' + this.data.celebrationid,
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
  joinShoppingCar(packageStage) {

    var celebrationResult = hoteldata.formatLocalShoppingcar(this.data.celebrationResult, '宴会庆典', null, packageStage);

    var newShoppingcar = this.data.shoppingcar;
    newShoppingcar.push(celebrationResult);
    shoppingCarStore.save('shoppingcar', newShoppingcar);

  },

  bindCheckBoxTap (e) {
    console.log('套餐ID = ' + e.currentTarget.id);
    console.log('套餐有无全息 = ' + e.currentTarget.dataset.stage);

    var index = e.currentTarget.id;
    var stage = e.currentTarget.dataset.stage ? e.currentTarget.dataset.stage : null;
    var checkboxItems = this.data.checkboxItems;

    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) { 
      if (i == index) {
        if (stage) {
          checkboxItems[i].checked = true;
          checkboxItems[i].stage = !checkboxItems[i].stage;
        } else {
          checkboxItems[i].checked = true;
          checkboxItems[i].stage = true;
        }
      } else {
        checkboxItems[i].checked = false;
        checkboxItems[i].stage = false;
      }
    }

    console.log('checkboxItems ... ' + JSON.stringify(checkboxItems));

    this.setData({
      checkboxItems: checkboxItems
    })

  },

  goDishesCommentPage () {
    wx.navigateTo({
      url: '../comment/commentListView?celebrationid=' + this.data.celebrationid + '&prePageType=celebration',
    })
  }

})