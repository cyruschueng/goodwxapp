const app = getApp()
const apiurl = 'https://friend-guess.playonwechat.com/';
let sign = wx.getStorageSync('sign');
import tips from '../../utils/tips.js'
Page({
  data: {
    newarticle:false
  },
  onLoad: function (options) {
    console.log("options:", options);
    this.setData({
      lu_id: options.lu_id
    })
    if (options.goods_name){
      this.setData({
        name: options.goods_name,
        newarticle:true
      })
    }
    if (options.g_id){
      this.setData({
        g_id: options.g_id
      })
    }
    if (options.cat_id){
      this.setData({
        cat_id: options.cat_id
      })
    }else{
      this.setData({
        cat_id: 415
      })
    }
    if (options.cat_name){
      this.setData({
        cat_name: options.cat_name
      })
    }else{
      this.setData({
        cat_name: '服装 内衣'
      })
    }
  },
  onShow: function () {
    let that = this;
    let sign = wx.getStorageSync('sign');
    if (wx.getStorageSync('cat_id')) {
      this.setData({
        cat_id: wx.getStorageSync('cat_id')
      })
    }
    if (wx.getStorageSync('cat_name')) {
      this.setData({
        cat_name: wx.getStorageSync('cat_name')
      })
    }
  },
  //事件处理
  // 删除记录
  delTap(e){
    let that = this;
    let sign = wx.getStorageSync('sign');
    wx.showModal({
      content: "确认删除此项物品",
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: apiurl + "luggage/del-goods?sign=" + sign + '&operator_id=' + app.data.kid,
            data: {
              lu_id: that.data.lu_id,
              g_id: that.data.g_id
            },
            header: {
              'content-type': 'application/json'
            },
            method: "GET",
            success: function (res) {
              console.log("删除物品", res);
              let status = res.data.status;
              if (status == 1) {
                console.log(1);
                tips.success('删除物品成功！');
                setTimeout(function () {
                  wx.navigateBack({
                    url: '../travel/travel?lu_id=' + that.data.lu_id,
                  })
                }, 1000)
              } else {
                tips.alert(res.data.msg);
              }
            }
          })
        } else { //取消删除
          console.log("取消删除!")
        }
      }
    })

    
  },
  nameInput(e){
    this.setData({
      name: e.detail.value
    })
  },
  del(){
    wx.navigateBack({})
  },
  save(){
    let that = this;
    let sign = wx.getStorageSync('sign');
    if (!that.data.lu_id) {
      tips.alert('无效的lu_id！');
      return false;
    }
    if (!that.data.name){
        tips.alert('请输入物品名称！');
        return false;
    }
    if (!that.data.cat_id){
      tips.alert('请选择类别！');
      return false;
    }
    // 编辑选择好的物品
    if (that.data.newarticle){ 
      wx.request({
        url: apiurl + "luggage/edit-goods?sign=" + sign + '&operator_id=' + app.data.kid,
        data: {
          lu_id: that.data.lu_id,
          cat_id: that.data.cat_id,
          name: that.data.name,
          g_id: that.data.g_id
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          console.log("编辑物品", res);
          let status = res.data.status;
          if (status == 1) {
            console.log(1);
            tips.success('编辑物品成功！');
            setTimeout(function () {
              wx.navigateBack({
                url: '../travel/travel?lu_id=' + that.data.lu_id,
              })
            }, 1000)
            wx.removeStorageSync('cat_id');
            wx.removeStorageSync('cat_name');
          } else {
            tips.alert(res.data.msg);
          }
        }
      })
    } else { //新增物品 并添加到行李箱中
        wx.request({
          url: apiurl + "luggage/append-goods-by-args?sign=" + sign + '&operator_id=' + app.data.kid,
          data:{
            lu_id: that.data.lu_id,
            cat_id: that.data.cat_id,
            name: that.data.name
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          success: function (res) {
            console.log("添加物品成功", res); 
            let status = res.data.status;
            if (status == 1) {
              console.log(1);
              tips.success('添加物品成功！');
              setTimeout(function(){
                wx.navigateBack({
                  url: '../travel/travel?lu_id=' + that.data.lu_id,
                })
              },1000)
              wx.removeStorageSync('cat_id');
              wx.removeStorageSync('cat_name');
            } else {
              tips.alert(res.data.msg);
            }
          }
        })
    }
  },
  // 分类
  themeInput(){
    let that = this;
    wx.navigateTo({
      url: '../theme/theme?lu_id=' + that.data.lu_id + '&cat_id=' + that.data.cat_id + '&cat_name=' + that.data.cat_name + '&g_id=' + that.data.g_id
    })
  }
})