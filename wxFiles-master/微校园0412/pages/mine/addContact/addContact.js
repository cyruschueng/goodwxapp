// pages/wode/xinzeng/xinzeng.js
var app = getApp();
var that;
Page({
  data: {
    array: [],
    arrayid:[],
    index: 0,
    return1: true,
    school: '点击选择',
    contactPerson: '',
    name: '',
    tel: '',
    detailAddress: '默认地址',
    contactInfo: {},
    xs: '请选择',
    selected: false,
  },
  bindPickerChange: function (e) {
      var address = wx.getStorageSync("schoolname") + that.data.array[e.detail.value];
    this.setData({
      xs: address,
      index: e.detail.value
    })
  },
  contactPersonInput: function (e) {
    this.setData({
      contactPerson: e.detail.value
    });
  },
  telInput: function (e) {
    this.setData({
      tel: e.detail.value
    });
  },
  detailAddressInput: function (e) {

    this.setData({
      detailAddress: e.detail.value
    });
  },
  saveNewAdres: function () {
    var that = this;
    //新建联系人信息
    var dz = that.data.array[that.data.index];
      var address = wx.getStorageSync("schoolname") + dz + that.data.detailAddress;
    if (that.data.contactPerson == "" || that.data.tel == "" || that.data.detailAddress == "默认地址") {
      wx.showModal({
        title: '提示',
        content: '请填写完整信息',
        showCancel: false,

      })
    } else {
      wx.request({
        url: app.globalData.IP + "wx/addressadd.do",
        data: { name: that.data.contactPerson, phone: that.data.tel, detail: address, userid: app.globalData.ID,fid:that.data.arrayid[that.data.index] },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          // success
          if (res.data.result != '0') {
            if (that.data.selected) {
              //
              var pages = getCurrentPages();
              var prevPage = pages[pages.length - 2];
              prevPage.setData({
                name: that.data.contactPerson,
                tel: that.data.tel,
                address: address,
                addressid: res.data.result,
                fid: that.data.arrayid[that.data.index]
              })
            }
            wx.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面
            })
          }
        },
      })

    }

  },
  onLoad: function (options) {
    that = this;
    if (app.globalData.sid == 0) {
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '请去首页选择学校',
        success: function (res) {
          if (res.confirm) {
            wx.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面
            })
          }
        }
      })
    }
    app.getWindow(this)
    if (options.type) {
      that.setData({
        selected: true
      })
    }
    if (app.globalData.sid == 0) {
      var sid = wx.getStorageSync('school');
      app.globalData.sid = sid;
      that.init();
    } else {
      that.data.array=[];
      wx.request({
        url: app.globalData.IP + "wx/slistajax.do",
        success: function (res) {
          for (var i = 0; i < res.data.length; i++) {
               if(res.data[i].id==app.globalData.sid)
               {
                      for(var j=0;j<res.data[i].floor.length;j++)
                      {
                        that.data.array.push(res.data[i].floor[j].name)
                        that.data.arrayid.push(res.data[i].floor[j].id)
                      }
                      break;
               }
          }
          that.setData({
            array:that.data.array,
            arrayid:that.data.arrayid
          })
        }
      })
    }
  },
  init: function () {
    if (app.globalData.sid == 1) {
      that.setData({
        array: ['竹苑一', '竹苑二', '竹苑三', '竹苑四', '竹苑五', '竹苑六', '梅苑一', '梅苑二', '梅苑三', '梅苑四', '梅苑五', '梅苑六', '桂苑一', '桂苑二', '桂苑三', '桂苑四', '桂苑五', '桂苑六', '桂苑七', '桂苑八']
      })
    } else if (app.globalData.sid == 2) {
      that.setData({
        array: ['一栋', '二栋', '三栋', '四栋', '五栋', '六栋', '七栋', '八栋', '九栋', '十栋', '十一栋', '十二栋', '十三栋', '十四栋', '十五栋', '十六栋']
      })
    }
  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    var that = this;
    // 页面显示
    app.run("进入新增地址界面");
    wx.getStorage({
      key: 'wxSearchFor',
      success: function (res) {
        that.setData({
          school: res.data,
          return1: false,
        })
      }
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  chooseSchool: function () {
    wx.navigateTo({
      url: '../../mine/addContact/addContact-school/addContact-school',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }
})