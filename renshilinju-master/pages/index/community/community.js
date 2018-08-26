var app = getApp()
var url = app.globalData.baseAPI;

Page({
  data: {
    searchLetter: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    displayLetter:[],
    showLetter: "", // [A-Z]
    winHeight: 0, //窗口的高度
    tHeight: 0, // Top height
    bHeight: 0, // Bottom height
    startPageY: 0,
    cityList: [],
    isShowLetter: false,
    scrollTop: 0,
    city: "",
    cityObj: []
  },

  back: function () {
    wx.navigateBack({
      babel: 1
    })
  },

  go: function () {
    wx.navigateTo({
      url: '/pages/index/index?province=' + this.data.province + '&Community=' + this.data.city + '&resultCity=' + this.data.resultCity + '&resultCountys=' + this.data.resultCountys
,
    })

  },

  displayLetter : function(cityList, that){
    
      var arry = [];
      for (var i = 0; i < cityList.length; i++){
        if (cityList[i].cityInfo.length != 0){
        
            arry.push(cityList[i].initial);
            
        }
      }

      that.setData({displayLetter : arry});
  },

  // 对小区根据首字母进行分组
  cityGroup: function (cityList, that) {

    var tempObj = []; // 临时数组
    // 遍历A-Z
    for (var i = 0; i < this.data.searchLetter.length; i++) {
      var initial = this.data.searchLetter[i];
      var cityInfo = [];
      var tempArr = {};
      tempArr.initial = initial;
      // 遍历城市列表,获取initial属性
      for (var j = 0; j < cityList.length; j++) {
        if (initial == cityList[j].initial) {
          cityInfo.push(cityList[j]);
        }
      }
      tempArr.cityInfo = cityInfo;
      tempObj.push(tempArr);
    }
    return tempObj;
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '选择小区'
    })
    var userid = wx.getStorageSync('userInfo').id;
    var cityList;
    var that = this;

    that.setData({
      userid: userid,
      resultCity: options.resultCity,  //区县
      resultCountys: options.resultCountys,  //商圈
      id: options.id,  //商圈id
      province:options.province
    })

    wx.request({
      url: url + '/xiaoqus/' + this.data.id,  //商圈id
      header: {
        'Accept': "*/*"
      },
      success: function (res) {
        var cityList = res.data.xiaoqus;  //商圈下面的小区列表
        var groupCity = that.cityGroup(cityList, that);
        that.setData({ cityList: groupCity });
        that.displayLetter(groupCity, that);
        that.calcDistance(that);
      }
    })

    function searchLetter() {
      return searchLetter;
    }

  },
  
  calcDistance:function(that){
    var sysInfo = wx.getSystemInfoSync();

    var winHeight = sysInfo.windowHeight;

    var h = that.data.displayLetter.length;
    //添加要匹配的字母范围值
    //1、根据屏幕高度设置子元素的高度
    var itemH = winHeight / that.data.displayLetter.length;
    console.log("length : " + JSON.stringify(that.data.displayLetter));

    var tempObj = [];
    for (var i = 0; i < that.data.searchLetter.length; i++) {
      var temp = {};
      temp.name = that.data.searchLetter[i];
      temp.tHeight = i * itemH;
      temp.bHeight = (i + 1) * itemH;

      tempObj.push(temp)
    }

    that.setData({
      winHeight: winHeight,
      itemH: itemH,
      //  searchLetter: tempObj,
     // cityList: cityList
    })

    console.log(this.data);
  },

  cityList: function () {

    var tempObj = [];
    for (var i = 0; i < searchLetter.length; i++) {
      var initial = searchLetter[i];
      var cityInfo = [];
      var tempArr = {};
      tempArr.initial = initial;
      for (var j = 0; j < cityObj.length; j++) {
        if (initial == cityObj[j].initial) {
          cityInfo.push(cityObj[j]);
        }
      }
      console.log(cityInfo);
      tempArr.cityInfo = cityInfo;
      tempObj.push(tempArr);
    }
    return tempObj;
  },


  searchStart: function (e) {
    var showLetter = e.currentTarget.dataset.letter;
    var pageY = e.touches[0].pageY;

    this.setScrollTop(this, showLetter);
    this.nowLetter(pageY, this);
    this.setData({
      showLetter: showLetter,
      startPageY: pageY,
      isShowLetter: true,
    })
  },
  searchMove: function (e) {
    var pageY = e.touches[0].pageY;
    var startPageY = this.data.startPageY;
    var tHeight = this.data.tHeight;
    var bHeight = this.data.bHeight;
    var showLetter = 0;
    console.log(pageY);
    if (startPageY - pageY > 0) { //向上移动
      if (pageY < tHeight) {
        showLetter = this.mateLetter(pageY, this);
        this.nowLetter(pageY, this);
      }
    } else {//向下移动
      if (pageY > bHeight) {
        showLetter = this.mateLetter(pageY, this);
        this.nowLetter(pageY, this);
      }
    }
  },
  searchEnd: function (e) {
    // console.log(e);
    var showLetter = e.currentTarget.dataset.letter;
    var that = this;
    setTimeout(function () {
      that.setData({
        isShowLetter: false
      })
    }, 1000)

  },
  nowLetter: function (pageY, that) {//当前选中的信息
    var letterData = this.data.searchLetter;
    var bHeight = 0;
    var tHeight = 0;
    var showLetter = "";
    for (var i = 0; i < letterData.length; i++) {
      if (letterData[i].tHeight <= pageY && pageY <= letterData[i].bHeight) {
        bHeight = letterData[i].bHeight;
        tHeight = letterData[i].tHeight;
        showLetter = letterData[i].name;
        break;
      }
    }

  //  this.setScrollTop(that, showLetter);

    that.setData({
      bHeight: bHeight,
      tHeight: tHeight,
      showLetter: showLetter,
      startPageY: pageY
    })
  },
  bindScroll: function (e) {
    //console.log(e.detail)
  },
  bindChange: function (e) {
   // console.log(e);
  },

  setScrollTop: function (that, showLetter) {

    var scrollTop = 0;
    var citys = that.data.cityList;
    
    var cityCount = 0;
    var initialCount = 0;

    //console.log("itemH : " + that.data.itemH);


    for (var i = 0; i < citys.length; i++) {
      if (showLetter == citys[i].initial) {
        //console.log("initialCount : " + initialCount + " cityCount : " + cityCount);
        scrollTop = (initialCount * 30 + cityCount * 41);
        break;
      } else {
        if (citys[i].cityInfo.length != 0){
          initialCount++;
        }
        
        cityCount += citys[i].cityInfo.length;
      }
    }
   // console.log("Scroll Top : " + scrollTop);
    that.setData({
      scrollTop: scrollTop
    })
  },
  bindCity: function (e) {
    var that =this
    var city = e.currentTarget.dataset.city;
    var id = e.currentTarget.dataset.id;

    let temp = {};

    temp.xqid = id;
    temp.xqname = city;
    temp.sqname = that.data.resultCountys;

    app.globalData.temp = temp;

    this.setData({
      city: city,
      id: id,
      currentItem: id
    })

  }
})
