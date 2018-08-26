//index.js 
import Api from '/../../utils/config/api.js';
import { GLOBAL_API_DOMAIN } from '/../../utils/config/config.js';
var utils = require('../../utils/util.js')
var app = getApp();

Page({
  data: {
    _build_url: GLOBAL_API_DOMAIN,
    city: "",
    carousel: [],  //轮播图
    business: [], //商家列表，推荐餐厅
    actlist: [],  //热门活动
    hotlive: [],  //热门直播
    food: [],   //美食墙
    logs: [],
    topics: [],   //专题
    restaurant: [], //菜系专题
    service: [],  //服务专题
    alltopics: [],
    currentTab: 0,
    navbar: ['菜系专题', '服务专题'],
    sort: ['川湘菜', '海鲜', '火锅', '烧烤', '西餐', '自助餐', '聚会', '商务', '约会']
  },
  onLoad: function (options) {
    let that = this
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      // console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady(function () {
      // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      updateManager.applyUpdate()
    })
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
    })
    this.getuseradd()
  },
  onShow: function () {
    let that = this
    let lat = wx.getStorageSync('lat')
    let lng = wx.getStorageSync('lng')
    // if(!app.globalData.userInfo.city){
    //   lat = '30.51597', lng = '114.34035';
    // }else{
    //   return false
    // }
    if (lat && lng) {
      setTimeout(function () {
        that.requestCityName(lat, lng)
        wx.removeStorageSync('lat')
        wx.removeStorageSync('lng')
      }, 500)
    }
  },
  getuseradd: function () {  //获取用户userid
    wx.login({
      success: res => {
        let _code = res.code;
        // console.log("code:", _code)
        // return false  //此处返回，获取的code是没有用过的，用于测试
        if (res.code) {
          let _parms = {
            code: res.code
          }
          Api.useradd(_parms).then((res) => {
            if (res.data.data) {
              app.globalData.userInfo.userId = res.data.data
              this.getuser()
              this.getlocation()
            }
          })
        }
      }
    })
  },
  getuser: function () { //从自己的服务器获取用户信息
    let that = this
    wx.request({
      url: this.data._build_url + 'user/get/' + app.globalData.userInfo.userId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code == 0) {
          let data = res.data.data;
          app.globalData.userInfo.userType = data.userType,
            app.globalData.userInfo.openId = data.openId,
            app.globalData.userInfo.password = data.password,
            app.globalData.userInfo.shopId = data.shopId ? data.shopId : '',
            app.globalData.userInfo.userName = data.userName,
            app.globalData.userInfo.nickName = data.nickName,
            app.globalData.userInfo.loginTimes = data.loginTimes,
            app.globalData.userInfo.iconUrl = data.iconUrl,
            app.globalData.userInfo.sourceType = data.sourceType,
            app.globalData.userInfo.sex = data.sex
            app.globalData.userInfo.mobile = data.mobile
        }
      }
    })
  },
  navbarTap: function (e) {// 专题推荐栏
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  getmoredata: function () {  //获取更多数据
    this.getcarousel();
    this.getdata();
    this.getactlist();
    this.gethotlive();
    this.gettopic();
    // this.gettopics();
  },
  onReachBottom: function () {  //用户上拉触底加载更多
    if (this.data.alltopics.length < 1) {
      this.gettopics()
    }
  },
  gettopics: function () {  //加载分类数据
    let _list = [], _shop = []
    wx.showLoading({
      title: '更多数据加载中。。。',
      mask: true
    })
    Api.listForHomePage().then((res) => {
      if (res.data.code == 0) {
        _list = res.data.data
      }
      // console.log("_list:", _list)
    })

    let _parms = {
      locationX: app.globalData.userInfo.lng,
      locationY: app.globalData.userInfo.lat,
      browSort: 2,
      page: 1,
      rows: 5
    }
    Api.shoplistForHomePage(_parms).then((res) => {
      if (res.data.code == 0) {
        wx.hideLoading()
        let arr = []
        _shop = res.data.data
        for (let i = 0; i < _list.length; i++) {
          for (let j in _shop) {
            if (j == _list[i].type) {
              let obj = {
                img: _list[i],
                cate: this.data.sort[i],
                data: _shop[j]
              }
              arr.push(obj)
            }
          }
        }
        let [...newarr] = arr

        this.setData({
          alltopics: newarr,
          restaurant: arr.slice(0, 6), //菜系专题
          service: arr.slice(6, arr.length)
        })
      } else {
        wx.hideLoading()
        wx.showToast({
          title: res.data.message,
          icon: 'none',
        })
      }
    })
  },
  getlocation: function () {  //获取用户位置
    let that = this
    let lat = '', lng = ''
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        let latitude = res.latitude
        let longitude = res.longitude
        that.requestCityName(latitude, longitude);
      }
    })
  },
  wxgetsetting: function () {  //若用户之前没用授权位置信息，则调整此函数请求用户授权
    let that = this
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userLocation']) { // 用户未授受获取其用户信息或位置信息
          wx.showModal({
            title: '提示',
            content: '享7要你的位置信息，快去授权',
            success: function (res) {
              if (res.confirm) {
                wx.openSetting({  //打开授权设置界面
                  success: (res) => {
                    if (res.authSetting['scope.userLocation']) {
                      wx.getLocation({
                        type: 'wgs84',
                        success: function (res) {
                          let latitude = res.latitude
                          let longitude = res.longitude
                          that.requestCityName(latitude, longitude)
                        }
                      })
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
  },
  requestCityName(lat, lng) {//获取当前城市
    app.globalData.userInfo.lat = lat
    app.globalData.userInfo.lng = lng
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + lat + "," + lng + "&key=4YFBZ-K7JH6-OYOS4-EIJ27-K473E-EUBV7",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        this.getmoredata()
        if (res.data.status == 0) {
          this.setData({
            city: res.data.result.address_component.city,
            alltopics: [],
            restaurant: [],
            service: []
          })
          app.globalData.userInfo.city = res.data.result.address_component.city
        }
      }
    })
  },
  getcarousel: function () {  //轮播图
    let that = this;
    Api.hcllist().then((res) => {
      // console.log("carousel:",res.data.data)
      this.setData({
        carousel: res.data.data
      })
    })
  },
  getdata: function () { // 获取推荐餐厅数据
    let lat = '30.51597', lng = '114.34035';
    let _parms = {
      locationX: app.globalData.userInfo.lng ? app.globalData.userInfo.lng : lng,
      locationY: app.globalData.userInfo.lat ? app.globalData.userInfo.lat : lat,
    }
    Api.shoptop(_parms).then((res) => {
      // console.log("businss:",res.data.data)
      this.setData({
        business: res.data.data
      })
    })
  },
  gettopic: function () {  // 美食墙
    Api.topictop().then((res) => {
      // console.log("food:", res.data.data)
      let _data = res.data.data
      for (let i = 0; i < _data.length; i++) {
        _data[i].summary = utils.uncodeUtf16(_data[i].summary)
        _data[i].content = utils.uncodeUtf16(_data[i].content)
      }
      this.setData({
        food: res.data.data
      })
    })
  },
  getactlist() {  //获取热门活动数据
    Api.actlist().then((res) => {
      // console.log("actlist:",res)
      this.setData({
        actlist: res.data.data.list.slice(0, 10)
      })
    })
  },
  gethotlive() {  //获取热门直播数据 
    let that = this;
    wx.request({
      url: that.data._build_url + 'zb/top/',
      success: function (res) {
        // console.log("hotlive:",res.data.data)
        that.setData({
          hotlive: res.data.data
        })
      }
    })
  },
  userLocation: function () {   // 用户定位
    this.wxgetsetting()
    wx.navigateTo({
      url: 'user-location/user-location',
    })
  },
  seekTap: function () {   //用户搜索
    wx.navigateTo({
      url: 'user-seek/user-seek',
    })
  },
  discountCoupon: function () {  //用户优惠券
    wx.navigateTo({
      url: '../personal-center/my-discount/my-discount',
    })
  },
  shopping: function () {
    wx.navigateTo({
      url: 'consume-qibashare/consume-qibashare',
    })
  },
  entertainment: function () {  //掌上生活
    // wx.navigateTo({
    //   url: 'webview/webview',
    // })
    wx.showToast({
      title: '该功能更新中...',
    })
  },
  recommendCt: function (event) {  //跳转到商家列表页面
    wx.navigateTo({
      url: 'dining-room/dining-room',
    })
  },
  cateWall: function (event) {  //美食墙 查看更多
    wx.switchTab({
      url: '../discover-plate/discover-plate',
    })
  },
  preferential: function (event) {
    wx.switchTab({
      url: '../activityDetails/activity-details',
    })
  },
  diningHhall: function (event) {  //跳转到商家（餐厅）内页
    const shopid = event.currentTarget.id
    wx.navigateTo({
      url: 'merchant-particulars/merchant-particulars?shopid=' + shopid
    })
  },
  fooddetails: function (e) {  //跳转美食墙内页
    const id = e.currentTarget.id
    let _data = this.data.food
    let zan = ''
    for (let i = 0; i < _data.length; i++) {
      if (id == _data[i].id) {
        zan = _data[i].zan
      }
    }
    wx.navigateTo({
      url: '../discover-plate/dynamic-state/article_details/article_details?id=' + id + '&zan=' + zan,
    })
  },
  detailOfTheActivity: function (event) { //跳转到活动内页
    const actid = event.currentTarget.id
    // console.log("actid:",actid)
    wx.navigateTo({
      url: '../activityDetails/details-like/details-like?actid=' + actid,
    })
  },
  tolive: function (ev) { //跳转到直播内页
    const liveid = ev.currentTarget.id
    // console.log("liveid:",liveid)
    // wx.navigateTo({
    //   url: 'test?liveid=' + liveid,
    // })
  },
  toNewExclusive: function (e) {   //跳转至新人专享页面
    let id = e.currentTarget.id;
    if (id == 4) {
      wx.navigateTo({
        url: 'new-exclusive/new-exclusive',
      })
    } else if (id == 1) {
      wx.navigateTo({
        url: '../personal-center/free-of-charge/free-of-charge',
      })
    }
  },
  clickimg: function (e) {  //点击专题图片 --某个分类
    let ind = e.currentTarget.id
    let arr = this.data.alltopics, cate = ''
    for (let i = 0; i < arr.length; i++) {
      if (ind == arr[i].img.id) {
        cate = arr[i].cate
      }
    }
    wx.navigateTo({
      url: 'dining-room/dining-room?cate=' + cate,
    })
  },
  clickcon: function (e) {  //點擊某一傢點
    let shopid = e.currentTarget.id
    wx.navigateTo({
      url: 'merchant-particulars/merchant-particulars?shopid=' + shopid
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '享七美食',
      path: 'pages/index/index',
      imageUrl: 'https://xq-1256079679.file.myqcloud.com/aaa_wxf91e2a026658e78e.o6zAJs-7D9920jC4XTKdzt72lobs.86hwazjh0Vhk732646790661f7af79f59e5d782d6c2f_0.8.jpg',
      success: function (res) {
        // 转发成功
        console.log("res:", res)
      },
      fail: function (res) {
        // 转发失败
        console.log("res:", res)
      }
    }
  }
})
