import { Cache } from '../../../utils/cache.js';
var cache = new Cache();
import api from '../../../api/api_v1.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [],
    user: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._onLoad();
  },

  _onLoad: function () {
    let token = cache.get("token");
    if (token) {
      this.getActivityCreated();
    }
  },

  getActivityCreated: function () {
    let that = this;
    api.getActivityCreated({
      success: (res) => {
        console.log('getActivityCreated', res.data);
        if (res.data.res == 0) {
          that.setData({
            user: res.data.data.user,
            lists: res.data.data.lists
          })
        }
      }
    })
  },

  kindToggle: function (e) {    
    let id = e.currentTarget.id;
    let lists = this.data.lists;
    for (let index = 0; index < lists.length; index++) {
      let list = lists[index];
      if (list.id == id) {
        list.open = !list.open;
      } else {
        list.open = false;
      }
    }
    this.setData({
      lists: lists
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  onRefresh: function () {
    this._onLoad();
  }
})