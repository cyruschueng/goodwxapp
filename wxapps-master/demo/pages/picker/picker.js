// pages/picker/picker.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:['美国','中国','巴西','日本'],
    objectArray:[
      {
        id:0,
        name: '美国'
      },
      {
        id:1,
        name:'中国'
      },
      {
        id:2,
        name:'巴西'
      },
      {
        id:3,
        name:'日本'
      }
    ],
    index:0,
    multiArray:[['无脊柱动物','脊柱动物'],['扁性动物','线性动物'],['环节动物','软体动物']],
    objectMultiArray:[
      [
        {
          id:0,
          name:'无脊柱动物'
        },
        {
          id:1,
          name:'脊柱动物'
        }
      ],[
        {
          id:0,
          name:'扁性动物'
        },
        {
          id:1,
          name:'线性动物'
        },
        {
          id:2,
          name:'环节动物'
        },
        {
          id:3,
          name:'软体动物'
        },
        {
          id:4,
          name:'节肢动物'
        }
      ],[
        {
          id:0,
          name:'猪肉涤虫'
        },
        {
          id:1,
          name:'吸血虫'
        }
      ]
    ],
    multiIndex:[0,0,0,],
    time:'12:01',
    date:"2017-06-15",
    region:['广东省','广州市','海珠区']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      "title":"演示",
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})