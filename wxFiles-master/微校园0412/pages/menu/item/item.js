// pages/snack/snack.js
var that;
var app = getApp();
Page({
  data: {
    selected1: true,
    selected2: false,
    selected3: false,
    selected4: false,
    status1: '',
    storeInfo: '',
    classlist: ['美食外卖', '甜点饮品', '生鲜水果', '零食小站'],
    list: [],
  },
  onLoad: function (res) {
    that = this;
    this.setData({
      ThisIndex: res.ThisIndex
    })
    if (this.data.ThisIndex == 0) {
      this.selected1();
    } else if (this.data.ThisIndex == 1) {
      this.selected2();
    } else if (this.data.ThisIndex == 2) {
      this.selected3();
    } else if (this.data.ThisIndex == 3) {
      this.selected4();
    }

    app.getWindow(this)
  },
  update: function (index) {
    var sid = app.globalData.sid;
    that.setData({
      load: true,
      list: [],
      tl: false
    })
    wx.request({
      url: app.globalData.IP + 'wx/findshop.do',
      data: {
        sid: sid,
        name: that.data.classlist[index]
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        // success
        that.data.list = [];
        for (var i = 0; i < res.data.length; i++) {
          var item = { id: res.data[i].id, img: '', store_name: res.data[i].name, monthlySale: '0', status: '营业中', startingFee: res.data[i].startprice, distributionFee: res.data[i].psf, style: 'color:#4a9a7f', zk: res.data[i].zk };
          if (app.globalData.IP + "controller/" + res.data[i].imagec) {
            item.img = app.globalData.IP + "controller/" + res.data[i].imagec.url;
          }
          if (res.data[i].status == 'off') {
            item.status = '打烊中'
            item.style = "color:#d2767a"
          }
          var total = 0;
          for (var j = 0; j < res.data[i].myclasses.length; j++) {
            for (var z = 0; z < res.data[i].myclasses[j].ps.length; z++) {
              total += res.data[i].myclasses[j].ps[z].sales;
            }
          }
          console.log(item)
          if(index == 0){
            var tempDiscount = 1;
              for (var j = 0; j < res.data[i].myclasses.length; j++) {
                for (var k = 0; k < res.data[i].myclasses[j].ps.length; k++) {
                  if (res.data[i].myclasses[j].ps[k].discount < tempDiscount) {
                    tempDiscount = res.data[i].myclasses[j].ps[k].discount;
                  }
                }
              }
              console.log(tempDiscount)
              item.minDiscount = (tempDiscount * 10 + '').substring(0, (tempDiscount * 10 + '').indexOf('.') + 2);
            
          }
          
          item.monthlySale = total;
          that.data.list.push(item);
        }
        that.setData({
          load: false
        })
        that.setData({
          list: that.data.list
        })
        if (that.data.list.length == 0) {
          that.setData({
            tl: true
          })
        } else {
          that.setData({
            tl: false
          })
        }
      },
    })
  },
  selected1: function () {
    this.setData({
      selected1: true,
      selected2: false,
      selected3: false,
      selected4: false
    });
    that.update(0);
  },
  selected2: function () {
    this.setData({
      selected2: true,
      selected1: false,
      selected3: false,
      selected4: false
    })
    that.update(1);
  },
  selected3: function () {
    this.setData({
      selected3: true,
      selected1: false,
      selected2: false,
      selected4: false
    })
    that.update(2);
  },
  selected4: function () {
    this.setData({
      selected4: true,
      selected1: false,
      selected2: false,
      selected3: false
    })
    that.update(3);
  },
  storeMenu: function (e) {
    var status = this.data.list[e.currentTarget.dataset.in].status
    if (status == '打烊中') {
      wx.navigateTo({
        url: '/pages/menu/item/storeMenu/storeMenu?id=' + e.currentTarget.id + '&rt=1',
      })

    } else {
      wx.navigateTo({
        url: '/pages/menu/item/storeMenu/storeMenu?id=' + e.currentTarget.id,
      })
    }


  },

})