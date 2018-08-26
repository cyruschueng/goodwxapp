// pages/test/dragsort.js
let tools = require('../../utils/tools.js')
let start_x, start_y, touch_diff_y, list_top, list_bottom, start_left, start_top, curr_left, curr_top, move_index, position;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    x: 0,
    y: 0,
    scrollTop: 0,
    cellWidth: 300,
    cellHeight: 80,
    isMoving: false,
    movableCellsData: [
      {
        id: 1000,
        title: 'test-1000',
        content: 'ETH',
        price: '$2000',
        color: 'blue',
      },
      {
        id: 1001,
        title: 'test-1001',
        content: 'BTS',
        price: '$0.9',
        color: 'yellow',
      },
      {
        id: 1002,
        title: 'test-1002',
        content: 'EOS',
        price: '$10.0',
        color: 'pink',
      },
      {
        id: 1003,
        title: 'test-1003',
        content: 'DNT',
        price: '$0.83',
        color: 'green',
      },
      {
        id: 1004,
        title: 'test-1004',
        content: 'OMG',
        price: '$6.6',
        color: 'grey',
      },
      {
        id: 1005,
        title: 'test-1005',
        content: 'PTOY',
        price: '$2.3',
        color: 'orange',
      },
      {
        id: 1006,
        title: 'test-1006',
        content: 'CVC',
        price: '$4.8',
        color: 'purple',
      },
      {
        id: 1007,
        title: 'test-1006',
        content: 'CVC',
        price: '$4.8',
        color: 'red',
      },
      {
        id: 1008,
        title: 'test-1006',
        content: 'CVC',
        price: '$4.8',
        color: 'white',
      },
      {
        id: 1009,
        title: 'test-1006',
        content: 'CVC',
        price: '$4.8',
        color: 'skyblue',
      },
      {
        id: 1010,
        title: 'test-1006',
        content: 'CVC',
        price: '$4.8',
        color: 'black',
      },
    ]
  },

  longtap: function (e) {
    console.log(e)
    move_index = e.target.dataset.index
    start_left = e.currentTarget.offsetLeft
    start_top = e.currentTarget.offsetTop
    touch_diff_y = e.touches[0].clientY - start_top
    list_top = start_top - this.data.cellHeight * move_index
    let that = this
    this.setData({
      position: {x: start_left, y: start_top},
      movingItem: that.data.movableCellsData[move_index],
      isMoving: true,
    })

    console.log('')
  },

  move: function (e) {
    if (this.data.isMoving) {
      console.log(curr_top, e.touches[0].clientY, touch_diff_y, this.data.scrollTop)
      curr_top = e.touches[0].clientY - touch_diff_y
      if (curr_top < list_top) {
        curr_top = list_top
      }

      // if (curr_top + this.data.cellHeight > this.data.windowHeight) {
      //   curr_top = this.data.windowHeight - this.data.cellHeight
      // }

      // if (e.touches[0].clientY > this.data.windowHeight + this.data.scrollTop - 100) {
      //   console.log('scroll lower')
      //   const scrollHight = 50
      //   let that = this
      //   wx.pageScrollTo({
      //     scrollTop: that.data.scrollTop + scrollHight
      //   })

      //   this.setData({
      //     scrollTop: that.data.scrollTop + scrollHight
      //   })
      // }

      // console.log(start_top, curr_top)

      if ((curr_top - start_top) > 0.7 * this.data.cellHeight) {
        let newList = tools.swapItems(this.data.movableCellsData, move_index, move_index+1)
        start_y = start_y + this.data.cellHeight
        start_top = start_top + this.data.cellHeight
        move_index = move_index + 1
        this.setData({
          movableCellsData: newList,
          move_index: move_index,
          position: { x: start_left, y: curr_top },
        })
      } 
      else if ((start_top - curr_top) > 0.7 * this.data.cellHeight) {
        let newList = tools.swapItems(this.data.movableCellsData, move_index, move_index - 1)
        start_y = start_y - this.data.cellHeight
        start_top = start_top - this.data.cellHeight
        move_index = move_index - 1
        this.setData({
          movableCellsData: newList,
          move_index: move_index,
          position: { x: curr_left, y: curr_top },
        })
      }   
      else {
        this.setData({
          move_index: move_index,
          position: { x: curr_left, y: curr_top }
        })
      }
    }
    else {
      
    }
  },

  moveEnd: function () {
    this.setData({
      isMoving: false,
      movingItem: null,
    })
  },

  scroll: function (e) {
    console.log('scroll...')
    console.log(e)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 版本判断 >1.1.0
    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight
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