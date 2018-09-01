

// 获取全局应用程序实例对象
const app = getApp();
import http from '../../js/request';

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "page1",
  /**
   * 页面的初始数据
   */

  data: {
    
  
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    http.get('MyTest', {
      session_key: 'cFUs6PbgnOYIU7j+3qpdhw==',
      openid: 'oLsc24210HbAsz4nj0vf2PzcPi1o',
      encryptedData: 'SbvSpTWkYMEXUP0B1AbRsWwE1Zg2BhBwi+7oQa27FQl5Iay5qixIMSIVS5DuqhW0mqvY/02qJb+y8IZWMtsjm7PiWemspbiLnmBDJzXaVEn7RUYNycIlN+t9HQcg7dJtN+D8pAFQFQdoH14Uiqg91Q==',
      iv: 'dYbvUN1fg0PCPFPfYxLrIA=='
    }).then((res) => {
      console.log(res)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    
  },


  //以下为自定义点击事件
  toIndex() {
    wx.redirectTo({
      url: "../index/index"
    })
  },
  showMore() {
    wx.showToast({
      title: '没有更多信息',
      icon: 'none',
      duration: 2000
    })
  }
})

