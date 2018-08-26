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
      { name: '男', value: '0', checked: 'true'},
      { name: '女', value: '1' }
    ],
    radiolifas: [
      { name: '阳历(公历)', value: '0', checked: 'true'},
      { name: '阴历(农历)', value: '1' }
    ],
    province:'',
    city:'',
    county:"",
    countys:false,
    sex:0,
    date_type:0,
    sc:'0',
    navto: 1,  //是否跳转启动页 1跳转 0 不跳转

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
    console.log("escape:", escape('江'))
    let that = this;
    // if (wx.getStorageSync("navto")) {
    //   setTimeout(function () {
    //     wx.navigateTo({
    //       url: '../star/star'
    //     })
    //   }, 20)
    // }
    let sign = wx.getStorageSync('sign');
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
  provinces(e){
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
      data:{
        level:2,
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
  countys(e){
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
    if (days[0]==0){
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
    if (minutes[0]==0){
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
  timeChange: function(e) {
    var checked = e.detail.value;
    let radiolifas = this.data.radiolifas;
    for (var i = 0; i < radiolifas.length; i++) {
      radiolifas[i].checked = false
      if (radiolifas[i].value==checked){
        radiolifas[i].checked = true
     }
    }
    this.setData({
      date_type: e.detail.value,
      radiolifas
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
    if (!that.data.txtLname){
      tips.alert('请输入姓氏');
      return false;
    }else{
      //只能输入中文
      let one = that.data.txtLname.replace(/[^\u4E00-\u9FA5]/g, '');
      console.log("one:",one);
      that.setData({
        txtLname:one
      })
    }
    if (!that.data.txtFname) {
      tips.alert('请输入名字');
      return false;
    } else {
      //只能输入中文
      let two = that.data.txtLname.replace(/[^\u4E00-\u9FA5]/g, '');
      console.log("two:", two);
      that.setData({
        txtFname: two
      })
    }
    if (!that.data.date){
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
    
    let a = ["txtFname=" + that.data.txtLname + "&=txtLname" + that.data.txtFname + "&sex=" + that.data.sex + "&yinyangli=" + escape(that.data.date_type) + "&years=" + escape(that.data.years) + "&months=" + escape(that.data.months) + "&days=" + escape(that.data.days) + "&sc=" + escape(that.data.sc) + "&hours=" + escape(that.data.hours) + "&minutes=" + escape(that.data.minutes) + "&prov=" + escape(that.data.index1) + "&city=" + escape(that.data.citysid) + "&county=" + escape(that.data.countysid) + "&act=addsm" + "&uid=0" + "&rt=" + escape(that.data.rt) + "&provstr=" + escape(that.data.provinces[that.data.index1].name) + "&citystr=" + escape(that.data.citys[that.data.index2].name) + "&countystr=" + escape(that.data.countys[that.data.index3].name)].join("");
    console.log("0000:", a);
    console.log("length:", a.length); 
    wx.showLoading({
      title: '加载中',
    });
    function EnEight(a) {
      a = a.toString();
      console.log("length:", a.length);
      for (var c = [], d, b = 0; b < a.length; b++) c += "" + a.charCodeAt(b).toString(16);
      console.log("aaa:", a.charCodeAt(b));
      return c
    }
    let home = EnEight(EnEight(a));
    console.log("home",home);
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    
    wx.request({
      url: apiurl + "zhouyi/suan-ming?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        txtFname: that.data.txtFname,
        txtLname: that.data.txtLname,
        sex: that.data.sex,
        yinyangli: that.data.date_type,
        years: that.data.years,
        months: that.data.months,
        days: that.data.days,
        sc: that.data.sc,
        hours: that.data.hours,
        minutes: that.data.minutes,
        prov: that.data.index1,
        city: that.data.citysid,
        county: that.data.countysid,
        act: 'addsm',
        uid: 0,
        rt: that.data.rt,
        provstr: that.data.provinces[that.data.index1].name,
        citystr: that.data.citys[that.data.index2].name,
        countystr: that.data.countys[that.data.index3].name,
        signs: home
      },
      header: {
        'Content-Type': 'application/json'
      },
      method: "GET",
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
