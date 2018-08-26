// pages/weddingTalent/weddingTalent.js

import * as hoteldata from '../../utils/hoteldata-format';
import * as HotelDataService from '../../services/hotel-service';
import shoppingCarStore from '../../services/shopping-car-store';
import contactsInfoStore from '../../services/contacts-info-store';
import moment from '../../utils/npm/moment';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: '',
    navbarSliderHidden: false,

    navbarTabs: ['菜品','婚礼人才','宴会庆典'],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    leftTabs: [],
    itemSelectIndex: 0,

    // 婚礼人才
    reservedDate: '',
    allTalentList: [],
    talentList: [],
    talentSelectedIndex: -1,

    // 菜品
    disheList: [],
    disheSelectedIndex: -1,

    // 宴会庆典
    celebrationList: [],

    // 结算
    totalPrice: '2333',
    shoppingCarNumbHidden: true,
    settlement: 0,

    shoppingcars: {
      talenttypes: [],
      shoppinglist: [],
      shoppingtime: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var res = wx.getSystemInfoSync();
    this.setData({
      'windowHeight': res.windowHeight,
      reservedDate: options.reservedDate ? options.reservedDate : 0
    });

    // 菜品 数据
    this.getDishesList();

    this.getShoppingCarInStore();
    
  },
  onShow: function () {
    this.getShoppingCarInStore();
  },
  onHide: function () {
    console.log('onHide..'); 
    // shoppingCarStore.save('shoppingcar', this.data.shoppingcars.shoppinglist);
  },
  onUnload: function () {
    console.log('onUnload..');
    // shoppingCarStore.save('shoppingcar', this.data.shoppingcars.shoppinglist);
  },

  // 数据处理
  getTalentList (reservedDate) {
    HotelDataService.queryTalentList(reservedDate).then((result) => {
      console.log('queryTalentList .. ' + JSON.stringify(result))
      //婚礼人才 数据
      this.setData({
        talentList: hoteldata.formatWeddingTalent(result[0].talentList,'主持人'),
        allTalentList: result,
        leftTabs: hoteldata.formatWeddingTalentLeftTab(result)
      })
    }).catch((error) => {
      console.log(error);
    })
  },
  getDishesList () {
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
  getCelebrationList () {
    HotelDataService.queryCelebrationList().then((result) => {
      //庆典 数据
      this.setData({
        celebrationList: hoteldata.formatBanquet(result),
      })
    }).catch((error) => {
      console.log(error);
    })
  },
  getShoppingCarInStore () {
    shoppingCarStore.get('shoppingcar').then(result => {
      this.setData({
        'shoppingcars.shoppinglist': result
      })
    }).catch(error => {
      console.log(error);
    });
  },

  // 点击事件
  bindNavbarTabTap: function (e) {
    // console.log(e.currentTarget.offsetLeft);

    switch (+e.currentTarget.id) 
    {
      case 0:
        // 菜品 数据
        if (this.data.disheList.length <= 0) {
          this.getDishesList();
        }
      break;
      case 1:
        if (this.data.talentList.length <= 0) {
          //婚礼人才 数据
          this.getTalentList(this.data.reservedDate);
        }
      break;
      case 2:
        if (this.data.celebrationList.length <= 0) {
          //宴会庆典 数据
          this.getCelebrationList();
        }
      break;
    }

    this.setData({
      activeIndex: e.currentTarget.id,
    });
  },
  bindLeftTabsTap (e) {
    
    var id = e.currentTarget.id;
    console.log('itemSelectIndex = '+id);
    this.setData({
      itemSelectIndex: id,
      talentList: hoteldata.formatWeddingTalent(this.data.allTalentList[id].talentList, this.data.leftTabs[id])
    })

    console.log('talentlist = ' + JSON.stringify(this.data.talentList));

  },
  // 婚礼人才 选择
  bindTalentSelectTap (e) {

    // 标记 已选用
    this.formatSelected(e.currentTarget.id);
    //查看 属于哪个类别 并放入购物车
    var itemSelectIndex = this.data.itemSelectIndex
    var talenttype = this.data.allTalentList[itemSelectIndex].occupation;
    var talentinfo = this.data.talentList[e.currentTarget.id];
    talentinfo = hoteldata.formatLocalShoppingcar(talentinfo, '婚礼人才');

    this.formatShoppingCar(talentinfo, talenttype);

    shoppingCarStore.save('shoppingcar', this.data.shoppingcars.shoppinglist);
    
  },
  // 标记 已选用
  formatSelected (id) {

    var itemSelectIndex = this.data.itemSelectIndex;
    var talentList = this.data.talentList;
    talentList.forEach((tal) => {
      tal.selected = false;
    })
    talentList[id].selected = true;

    var allTalentList = this.data.allTalentList;
    allTalentList[itemSelectIndex].talentList.forEach((tal) => {
      tal.chosenCount = false;
    })
    allTalentList[itemSelectIndex].talentList[id].chosenCount = true;

    this.setData({
      talentList: talentList,
      allTalentList: allTalentList
    })
  },
  // 过滤购物车
  formatShoppingCar(talentinfo, talenttype) {

    var shoppingcars = this.data.shoppingcars;
    var talenttypes = shoppingcars.talenttypes;
    var shoppinglist = shoppingcars.shoppinglist;
    shoppingcars.shoppingtime = moment().format('YYYY-MM-DD');

    // 如果已经有这个类别了，购物车就不再+1，且替换原来已有的人
    if (talenttypes.length > 0) {

      for (var i = 0; i < talenttypes.length; i++) {
        var types = talenttypes[i];
        if (types != talenttype) {
          talenttypes.push(talenttype);
          shoppinglist.push(talentinfo);
          break;
        } else {
          // 替换已有类别的人
          var tylength = talenttypes.length - 1;
          shoppinglist[tylength] = talentinfo;
          break;
        }
      }

    } else {
      talenttypes.push(talenttype);
      shoppinglist.push(talentinfo);
    }

    this.setData({
      shoppingcars: shoppingcars
    })

    console.log('最终购物车：' + JSON.stringify(shoppinglist));
  },

  // 菜品选择
  bindDishesSelectTap (e) {
    
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
    this.formatShoppingCar(dishesInfo, '菜品');

    shoppingCarStore.save('shoppingcar', this.data.shoppingcars.shoppinglist);

  },

  // 跳转
  goTalentDetailsPage (e) {
    wx.navigateTo({
      url: '../talents/talentDetails?talentid=' + e.currentTarget.dataset.talentid,
    })
  },
  goDishesDetailsPage (e) {
    wx.navigateTo({
      url: '../dishes/dishesDetails?dishesid=' + e.currentTarget.id,
    })
  },
  goCelebrationDetailsPage(e) {
    wx.navigateTo({
      url: '../celebration/celebrationDetails?celebrationid=' + e.currentTarget.id
    })
  },
  goSettlementPage () {
    wx.navigateTo({
      url: '../settlement/settlement',
    })
  },
  goShoppingCarPage () {
    wx.navigateTo({
      url: '../shoppingCar/shoppingCarIn?prepagetype=wedtalt',
    })
  }
})