// pages/use/use.js
const app = getApp()
const comm = require('../../utils/comm');
const apiurl = 'https://friend-guess.playonwechat.com/';
import tips from '../../utils/tips.js'
let sign = wx.getStorageSync('sign');
Page({
  data: {
    condition: false,
    radioItems: [
      { name: '男', value: '0', checked: 'true' },
      { name: '女', value: '1' }
    ],
    radiolifas: [
      { name: '阳历(公历)', value: '0', checked: 'true' },
      { name: '阴历(农历)', value: '1' }
    ],
    sclist:[
      { name: '按时间', value: '1', checked: 'true' },
      { name: '按时辰', value: '0' }
    ],
    province: '',
    city: '',
    county: "",
    sc:1,
    countys: false,
    sex: 0,
    date_type: 0,
    broadcasting:'肌肤有困难？就找禾葡兰！千名专业美肤导师为你提供一对一服务，随时免费咨询，微信搜索小程序：禾葡兰护肤中心',
    navto: 1,  //是否跳转启动页 1跳转 0 不跳转
    marqueePace: 1,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    marqueeDistance2: 0,
    marquee2copy_status: false,
    marquee2_margin: 60,
    size: 14,
    orientation: 'left',//滚动方向
    interval: 40 // 时间间隔

  },
  onLoad: function (options) {
    console.log(options)
    wx.setStorageSync("navto", 1)
    let that = this;
    let sign = wx.getStorageSync('sign');
    let kid = wx.getStorageSync('kid');
    wx.showLoading({
      title: '加载中',
    });

    if (!wx.canIUse('web-view')) {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
    wx.hideLoading()
  },
  onShow: function () {
    let that = this;
    let sign = wx.getStorageSync('sign');
    // app.getAuth(function(){
    //   let userInfo = wx.getStorageSync('userInfo');
    //   let sign = wx.getStorageSync('sign');
    //   console.log(userInfo);
    //   that.setData({
    //     userInfo: userInfo
    //   })
    if (wx.getStorageSync("navto")) {
      setTimeout(function () {
        wx.navigateTo({
          url: '../star/star'
        })
      }, 20)
    }
    //滚动文字
    wx.request({
      url: "https://unify.playonweixin.com/site/get-advertisements",
      success: function (res) {
        console.log(res);
        if (res.data.status) {
          var advers = res.data.adver.advers;
          var head_adver = res.data.adver.head_adver;
          var broadcasting = res.data.adver.broadcasting;
          wx.setStorageSync("advers", advers);
          wx.setStorageSync("broadcasting", broadcasting);
          that.setData({
            broadcasting
          })
        }
      }
    })
    var vm = this;
    console.log("length1:",vm.data.broadcasting.length);
    console.log("length2:", vm.data.size);
    var length = vm.data.broadcasting.length * vm.data.size;//文字长度
    console.log("length:", length);
    var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
    console.log("windowWidth:", windowWidth);
    console.log("res:", vm.data.marquee2_margin)
    vm.setData({
      length: length,
      windowWidth: windowWidth,
      marquee2_margin: length < windowWidth ? windowWidth - length : vm.data.marquee2_margin//当文字长度小于屏幕长度时，需要增加补白
    });
    vm.run1();// 水平一行字滚动完了再按照原来的方向滚动
    vm.run2();// 第一个字消失后立即从右边出现
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: apiurl + "zhouyi/get-city?sign=" + sign + '&operator_id=' + app.data.kid,
      header: {
        'Content-Type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("列表:", res);
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            provinces: res.data.data
          })
        } else {
          tips.alert(res.data.msg);
        }
      }
    })
    wx.hideLoading()
  },
  provinces(e) {
    let that = this;
    let sign = wx.getStorageSync('sign');
    console.log('picker发送选择改变，携带值为', e.detail.value);
    that.setData({
      index1: e.detail.value
    })
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: apiurl + "zhouyi/get-city?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        level: 2,
        sid: that.data.index1
      },
      header: {
        'Content-Type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("城市2:", res);
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            citys: res.data.data
          })
        } else {
          tips.alert(res.data.msg);
        }
      }
    })
    wx.hideLoading()
  },
  run1: function () {
    var vm = this;
    var interval = setInterval(function () {
      if (-vm.data.marqueeDistance < vm.data.length) {
        vm.setData({
          marqueeDistance: vm.data.marqueeDistance - vm.data.marqueePace,
        });
      } else {
        clearInterval(interval);
        vm.setData({
          marqueeDistance: vm.data.windowWidth
        });
        vm.run1();
      }
    }, vm.data.interval);
  },
  run2: function () {
    var vm = this;
    var interval = setInterval(function () {
      //console.log("marquee2_margin",vm.data.marquee2_margin);
      if (-vm.data.marqueeDistance2 < vm.data.length) {
        // 如果文字滚动到出现marquee2_margin=30px的白边，就接着显示
        vm.setData({
          marqueeDistance2: vm.data.marqueeDistance2 - vm.data.marqueePace,
          marquee2copy_status: vm.data.length + vm.data.marqueeDistance2 <= vm.data.windowWidth + vm.data.marquee2_margin,
        });
      } else {
        if (-vm.data.marqueeDistance2 >= vm.data.marquee2_margin) { // 当第二条文字滚动到最左边时
          vm.setData({
            marqueeDistance2: vm.data.marquee2_margin // 直接重新滚动
          });
          clearInterval(interval);
          vm.run2();
        } else {
          clearInterval(interval);
          vm.setData({
            marqueeDistance2: -vm.data.windowWidth
          });
          vm.run2();
        }
      }
    }, vm.data.interval);
  },
  citys: function (e) {
    console.log("e:", e);
    let that = this;
    let sign = wx.getStorageSync('sign');
    that.setData({
      index2: e.detail.value,
      citysid: that.data.citys[e.detail.value].sid
    })
    //console.log(that.data.citys[e.detail.value].sid);
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: apiurl + "zhouyi/get-city?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        level: 3,
        sid: that.data.citysid
      },
      header: {
        'Content-Type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("城市3:", res);
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            countys: res.data.data
          })

        } else {
          tips.alert(res.data.msg);
        }
      }
    })
    wx.hideLoading()
  },
  countys(e) {
    let that = this;
    let sign = wx.getStorageSync('sign');
    that.setData({
      index3: e.detail.value,
      countysid: that.data.countys[e.detail.value].sid
    })
  },

  provChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    let value = e.detail.value;
    this.setData({
      citysid: value[1]
    })
  },
  countyChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    let value = e.detail.value;
    this.setData({
      citysid: value[2]
    })
  },
  // time
  bindDateChange: function (e) {
    console.log("date:", e.detail.value);
    let arr = e.detail.value.split('-');
    let months = arr[1];
    let days = arr[2];
    if (months[0] == 0) {
      months = months[1]
    }
    if (days[0] == 0) {
      days = days[1]
    }
    console.log(arr);
    this.setData({
      date: e.detail.value,
      years: arr[0],
      months: months,
      days: days
    })
  },
  bindTimeChange: function (e) {
    console.log("time:", e.detail.value);
    let arr = e.detail.value.split(':');
    console.log(arr);
    let hours = arr[0];
    let minutes = arr[1]
    if (hours[0] == 0) {
      hours = hours[1]
    }
    if (minutes[0] == 0) {
      minutes = minutes[1]
    }
    this.setData({
      time: e.detail.value,
      hours: hours,
      minutes: minutes
    })
  },
  // input
  radioChange: function (e) {
    var checked = e.detail.value;
    let radioItems = this.data.radioItems;
    for (var i = 0; i < radioItems.length; i++) {
      radioItems[i].checked = false
      if (radioItems[i].value == checked) {
        radioItems[i].checked = true
      }
    }
    this.setData({
      sex: e.detail.value,
      radioItems
    })
  },
  // 历法
  timeChange: function (e) {
    var checked = e.detail.value;
    let radiolifas = this.data.radiolifas;
    for (var i = 0; i < radiolifas.length; i++) {
      radiolifas[i].checked = false
      if (radiolifas[i].value == checked) {
        radiolifas[i].checked = true
      }
    }
    this.setData({
      date_type: e.detail.value,
      radiolifas
    })
  },
// 按时间
  shichen: function (e) {
    var checked = e.detail.value;
    let sclist = this.data.sclist;
    for (var i = 0; i < sclist.length; i++) {
      sclist[i].checked = false
      if (sclist[i].value == checked) {
        sclist[i].checked = true
      }
    }
    console.log("sc:", e.detail.value);
    this.setData({
      sc: e.detail.value,
      sclist
    })
  },
  txtFname: function (e) {
    var that = this;
    that.setData({
      txtFname: e.detail.value
    })
    console.log(that.data.txtFname);
  },
  txtLname: function (e) {
    var that = this;
    that.setData({
      txtLname: e.detail.value
    })
    console.log(that.data.txtLname);
  },
  formSubmit: function (e) {
    let that = this;
    let sign = wx.getStorageSync('sign');
    let rt = (new Date).getMilliseconds();
    that.setData({
      rt: rt
    })
    console.log(that.data.txtLname);
    if (!that.data.txtLname) {
      tips.alert('请输入姓氏');
      return false;
    } else {
      //只能输入中文
      let one = that.data.txtLname.replace(/[^\u4E00-\u9FA5]/g, '');
      console.log("one:", one);
      that.setData({
        txtLname: one
      })
    }
    if (!that.data.txtFname) {
      tips.alert('请输入名字');
      return false;
    } else {
      //只能输入中文
      let two = that.data.txtFname.replace(/[^\u4E00-\u9FA5]/g, '');
      console.log("two:", two);
      that.setData({
        txtFname: two
      })
    }
    if (!that.data.date) {
      tips.alert('请选择出生日期');
      return false;
    }
    if (!that.data.hours) {
      tips.alert('请选择出生时间');
      return false;
    }
    if (!that.data.provinces) {
      tips.alert('请选择省份');
      return false;
    }
    if (!that.data.citys) {
      tips.alert('请选择城市');
      return false;
    }

    //provstr: that.data.provinces[that.data.index1].name,
    //citystr: that.data.citys[that.data.index2].name,
    //countystr: that.data.countys[that.data.index3].name,

    let a = ["txtFname=" + that.data.txtFname + "&txtLname=" +that.data.txtLname+ "&sex=" + that.data.sex + "&yinyangli=" +that.data.date_type + "&years=" + that.data.years+ "&months=" + that.data.months + "&days=" + that.data.days + "&sc=" + that.data.sc + "&hours=" + that.data.hours + "&minutes=" + that.data.minutes + "&prov=" + that.data.index1 + "&city=" + that.data.citysid + "&county=" + that.data.countysid + "&act=addsm" + "&uid=0" + "&rt=" + that.data.rt + "&provstr=" +that.data.provinces[that.data.index1].name + "&citystr=" + that.data.citys[that.data.index2].name + "&countystr=" + that.data.countys[that.data.index3].name].join("");
    console.log("0000:", a);
    console.log("length:", a.length);
    wx.showLoading({
      title: '加载中',
    });
    // function EnEight(a) {
    //   a = a.toString();
    //   console.log("length:", a.length);
    //   for (var c = [], d, b = 0; b < a.length; b++) c += "" + a.charCodeAt(b).toString(16);
    //   console.log("aaa:", a.charCodeAt(b));
    //   return c
    // }
    // let home = EnEight(EnEight(a));
    // console.log("home", home);
    console.log('form发生了submit事件，携带数据为：', e.detail.value);

    wx.request({
      url: apiurl + "zhouyi/suan-ming?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        str: a
        // txtFname: that.data.txtFname,
        // txtLname: that.data.txtLname,
        // sex: that.data.sex,
        // yinyangli: that.data.date_type,
        // years: that.data.years,
        // months: that.data.months,
        // days: that.data.days,
        // sc: that.data.sc,
        // hours: that.data.hours,
        // minutes: that.data.minutes,
        // prov: that.data.index1,
        // city: that.data.citysid,
        // county: that.data.countysid,
        // act: 'addsm',
        // uid: 0,
        // rt: that.data.rt,
        // provstr: that.data.provinces[that.data.index1].name,
        // citystr: that.data.citys[that.data.index2].name,
        // countystr: that.data.countys[that.data.index3].name
        // // signs: home
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log("成功:", res);
        var status = res.data.status;
        console.log(res.data.data)
        if (status == 1) {
          wx.navigateTo({
            url: '../inform/inform?nums=' + res.data.data
          })
        } else {
          tips.alert(res.data.msg);
        }
        // 清空表单
        that.setData({
          txtFname: '',
          txtLname: '',
          date: '',
          time: ''
        })
      }
    })
    wx.hideLoading()
  },
  onShareAppMessage: function (e) {
    console.log(e);
    let that = this;
    return {
      title: '',
      path: '/pages/new/new',
      success: function (res) {
        console.log(res);
        // 转发成功
      },
      fail: function (res) {
        console.log(res);
        // 转发失败
      }
    }
  }
})
