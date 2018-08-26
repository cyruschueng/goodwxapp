var app = getApp();
Page({
  data: {
    msg: [
      {
        id: 0, name: '喜欢的萍聚类型', value: '',
        list: [{ name: '电影', sel: 0 }, { name: '旅行', sel: 0 }, { name: '唱歌', sel: 0 }, { name: '爬山', sel: 0 },
        { name: '运动', sel: 0 }, { name: '跑腿', sel: 0 }, { name: '酒吧', sel: 0 }, { name: '吃饭', sel: 0 },
        { name: '逛街', sel: 0 }, { name: '公益', sel: 0 }], open: false
      },
      {
        id: 1, name: '年龄段', value: '',
        list: [{ name: '18-23岁', sel: 0 }, { name: '24-29岁', sel: 0 }, { name: '30-35岁', sel: 0 }, { name: '36-41岁', sel: 0 },
        { name: '42-50岁', sel: 0 }, { name: '51-60岁', sel: 0 }], open: false
      },
      { id: 2, name: '婚姻状态', value: '未婚', list: [{ name: '未婚', sel: 0 }, { name: '已婚', sel: 0 }, { name: '离异', sel: 0 }], open: false },
      {
        id: 3, name: '星座', value: '',
        list: [{ name: '白羊座', sel: 0 }, { name: '金牛座', sel: 0 }, { name: '双子座', sel: 0 }, { name: '巨蟹座', sel: 0 },
        { name: '狮子座', sel: 0 }, { name: '处女座', sel: 0 }, { name: '天枰座', sel: 0 }, { name: '天蝎座', sel: 0 },
        { name: '射手座', sel: 0 }, { name: '摩羯座', sel: 0 }, { name: '水瓶座', sel: 0 }, { name: '双鱼座', sel: 0 }], open: false
      },
      { id: 4, name: '性别', value: '', list: [{ name: '男', sel: 0 }, { name: '女', sel: 0 }], open: false },
      {
        id: 5, name: '消费金额', value: '', list: [{ name: '10-100元', sel: 0 }, { name: '100-500元', sel: 0 },
        { name: '500-1000元', sel: 0 }, { name: '1000-5000元', sel: 0 }, { name: '5000元以上', sel: 0 }], open: false
      },
      { id: 6, name: '开支性质', value: '', list: [{ name: '求请', sel: 0 }, { name: '我做东', sel: 0 }, { name: 'AA', sel: 0 }, { name: '男A女免', sel: 0 }], open: false },
    ],
    drop: ['/img/dropdown.png', '/img/up_d.png'],
  },
  dropDownBind: function (e) {
    var list = this.data.msg;
    if (list[e.currentTarget.id].open == true) {
      list[e.currentTarget.id].open = false;
      this.setData({ msg: list })
    } else {
      list[e.currentTarget.id].open = true;
      this.setData({ msg: list })
    }
  },
  selectLi: function (e) {
    var index = e.target.dataset.index;
    var id = e.target.dataset.id;
    var msg = this.data.msg;
    msg[id].value = "";
    if (msg[id].list[index].sel == 1) {
      msg[id].list[index].sel = 0;
    } else {
      msg[id].list[index].sel = 1;
    }
    for (var i = 0; i < msg[id].list.length; i++) {
      if (msg[id].list[i].sel == 1) {
        msg[id].value += " " + msg[id].list[i].name
      }
    }
    this.setData({ msg: msg })

  },
  onLoad: function (options) {
    if (wx.getStorageSync('hobby') != '') {
      this.setData({
        msg: wx.getStorageSync('hobby')
      })
    }
    console.log(wx.getStorageSync('hobby'))
  },
  save: function (e) {
    wx.setStorageSync('hobby', this.data.msg)
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
    wx.switchTab({
      url: '/pages/own/own',
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})