  // pages/wode/dizhi/dizhi.js
var app = getApp()
var that;
Page({
  data: {
    showl:false,
    editIndex: 0,
    delBtnWidth: 150,
    shanchu: false,
    list: [],
    selected: false,
    dele: false
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    that = this;
    if (options.type) {
      that.data.selected = true;
    }
    app.getWindow(this)
  },

  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    app.run("进入地址列表界面");
    wx.request({
      url: app.globalData.IP + "wx/myaddress.do",
      data: { id: app.globalData.ID },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        wx.hideLoading();
        that.data.list = [];
        for (var i = 0; i < res.data.length; i++) {
          var item = { id: res.data[i].id, name: res.data[i].name, phone: res.data[i].phone, detail: res.data[i].detail, fid:res.data[i].fid};
          that.data.list.push(item);
        }
        that.setData({
          showl:true,
          list: that.data.list
        })
      },
    })
  },

  add_Address: function () {
    if (this.data.selected) {
      wx.redirectTo({
        url: '/pages/mine/addContact/addContact?type=1',
      })
    } else {
      wx.navigateTo({
        url: '/pages/mine/addContact/addContact',
        fail: function (e) {
        }
      })

    }
  },
  sele: function (e) {
    if (that.data.selected) {
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      var info = that.data.list[e.currentTarget.id];
      prevPage.setData({
        name: info.name,
        tel: info.phone,
        address: info.detail,
        addressid: info.id,
        fid:info.fid
      })
      wx.navigateBack({
        delta: 1, // 回退前 delta(默认为1) 页面
      })
    }
  },
  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function (e) {
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "right:0px";
        this.setData({
          dele: false
        })
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "right:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "right:-" + delBtnWidth + "px";
          this.setData({
            dele: true
          })
        }
      }
      //获取手指触摸的是哪一项
      var index = e.target.dataset.index;
      var list = this.data.list;
      if (index >= 0) {
        console.log("第" + index + '行')
        console.log(txtStyle);
        for (var i = 0; i < list.length; i++) {
          if (i != index)
            list[i].txtStyle = txtStyle
        }

        //更新列表的状态
        this.setData({
          list: list
        });
      }
    }

    this.data.shanchu = true;
  },

  touchE: function (e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "right:-" + delBtnWidth + "px" : "right:0px";
      //获取手指触摸的是哪一项
      var index = e.target.dataset.index;
      var list = this.data.list;
      if (index >= 0) {
        /*console.log(index)
        for(var i=0;i<list.length;i++)
        {
          if(i==index)
            list[index].txtStyle = txtStyle;
        }
      
        //更新列表的状态
        this.setData({
          list:list
        })*/

      }
    }
    this.data.shanchu = true;
  },
  //获取元素自适应后的实际宽度
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);//以宽度750px设计稿做宽度的自适应
      // console.log(scale);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error
    }
  },
  initEleWidth: function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  //点击删除按钮事件
  delItem: function (e) {
    var that = this
    //获取列表中要删除项的下标
    var index = e.target.dataset.index;
    var list = this.data.list;
    var id = this.data.list[index].id;
    
    //更新列表的状态
    console.log(id)
    wx.showModal({
      title: '提示',
      content: '确定要删除？',
      success: function(res){
        if(res.confirm){
          //移除列表中下标为index的项
          list.splice(index, 1);
          wx.request({
            url: app.globalData.IP + "wx/addressde.do",
            data: { id: id },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
          })
          that.setData({
            list: list,
            dele: false
          });
        }
      }
    })
    
  },
})