const app = getApp()
const apiurl = 'https://friend-guess.playonwechat.com/';
let sign = wx.getStorageSync('sign');
import tips from '../../utils/tips.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  onLoad: function (options) {
    console.log('options' , options)
    this.setData({
      lu_id: options.lu_id
    })
  },
  onShow: function () {
    let that = this;
    let sign = wx.getStorageSync('sign');
    // 行李箱详情
    wx.request({
      url: apiurl + "luggage/luggage-detail?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        lu_id: that.data.lu_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("行李箱详情：", res);
        let status = res.data.status;
        if (status == 1) {
          that.setData({
              luggageInform:res.data.data
          })
        } else {
          that.setData({
            luggageInform:false
          })
          //tips.alert(res.data.msg)
        }
      }
    })
  },
  // 事件处理
  //重置
  reset(){
    
  },
  // 编辑
  setting(e){
    let that = this;
    let lu_id = e.currentTarget.dataset.lu_id;
    let cat_id = e.currentTarget.dataset.cat_id;
    let cat_name = e.currentTarget.dataset.cat_name;
    let goods_name = e.currentTarget.dataset.goods_name;
    let g_id = e.currentTarget.dataset.g_id;
    wx.navigateTo({
      url: '../travelSet/travelSet?lu_id=' + lu_id + '&cat_id=' + cat_id + '&cat_name=' + cat_name + '&goods_name=' + goods_name + '&g_id=' + g_id
    })
  },
  addNew(e){
    wx.navigateTo({
      url: '../travelSet/travelSet?lu_id=' + this.data.lu_id
    })
  },
  liveList(){
    wx.navigateTo({
      url: '../liveList/liveList?lu_id=' + this.data.lu_id
    })
  },
  checkedTap(e){
    let that = this;
    let sign = wx.getStorageSync('sign');
    let luggageInform = that.data.luggageInform;
    let checked = e.currentTarget.dataset.checked;
    let result = e.currentTarget.dataset.result;
    let childInx = e.currentTarget.dataset.childindex;
    let cat_id = e.currentTarget.dataset.cat_id;
    let g_id = e.currentTarget.dataset.g_id;
    console.log(checked, result, childInx, result, g_id)
    for (let i = 0; i < luggageInform.length;i++){
      if (cat_id == luggageInform[i].cat_id){
          for (let j = 0; j < luggageInform[i].goods.length; j++) {
            luggageInform[i].goods[childInx].checked = result
          }
      }
    }
    wx.request({
      url: apiurl + "luggage/checked-goods?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        lu_id: that.data.lu_id,
        g_id: g_id,
        type: result
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("更新物品选中状态", res);
        let status = res.data.status;
        if (status == 1) {
          tips.success("修改物品状态成功！");
        } else {
          tips.alert(res.data.msg)
        }
      }
    })
    that.setData({
      luggageInform
    })
  }
})