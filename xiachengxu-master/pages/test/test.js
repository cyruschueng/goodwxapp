// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgArr: [
      "/images/icon/about.png",
      "/images/icon/barcode.png",
      "/images/icon/brand.png",
      "/images/icon/card.png",
      "/images/icon/close.png",
      "/images/icon/completeback.png",
      "/images/icon/congratulation.png",
      "/images/icon/console.png",
      "/images/icon/directory.png",
      "/images/icon/empty.png"
    ],
    isFinish: -1,
    slideLeft: 0,
    slideTop: 400,
    current: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //手指触摸动作开始
  touchS(e) {
    if (e.touches.length == 1) {
      this.setData({
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        slideLeft: 0
      });
    }
  },

  // 手指触摸后移动
  touchM(e) {
    if (e.touches.length == 1) {
      var id = e.currentTarget.dataset.id;
      // 手指移动时水平方向位置
      var moveX = e.touches[0].clientX,
        moveY = e.touches[0].clientY;
      var { startX, startY } = this.data;
      var difX = moveX - startX, difY = moveY - startY;
      this.setData({
        slideLeft: difX,
        slideTop: difY + 400,
        current: id
      });
    }
  },


  // 触摸移动结束
  touchE(e) {
    if (e.changedTouches.length == 1) {
      // var goodsId = e.currentTarget.dataset.id;
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX,
        endY = e.changedTouches[0].clientY;
      var disX = endX - this.data.startX,
        disY = endY - this.data.startY,
        isFinish = -1;
      if (disX < 0 && disY < 0) {
        isFinish = 0; // 左上滑出
      } else if (disX > 0 && disY < 0) {
        isFinish = 1; // 右上滑出
      } else if (disX > 0 && disY > 0) {
        isFinish = 2; // 右下滑出
      } else {
        isFinish = 3; // 左下滑出
      }
      var imgArr = this.data.imgArr, that = this;
      imgArr.unshift(imgArr.pop());
      setTimeout(() => {
        that.setData({
          isFinish: -1,
          imgArr,
          current: -1,
          slideLeft: 0,
          slideTop: 400
        });
      }, 500)
      this.setData({
        slideLeft: disX,
        slideTop: disY + 400,
        startX: 0,
        isFinish
      });

    }
  },

})