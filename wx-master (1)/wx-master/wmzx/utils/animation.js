function util(that, currentStatu, animationData) {
  // 动画部分 /
  // 第1步：创建动画实例
  var animation = wx.createAnimation({
    duration: 200, //动画时长
    timingFunction: "linear", //线性
    delay: 0 //0则不延迟
  });
  // 第2步：这个动画实例赋给当前的动画实例  
  that.animation = animation;

  // 第3步：执行第一组动画  
  //animation.opacity(0).step();

  // 第4步：导出动画对象赋给数据对象储存  
  that.setData({
    animationData: animation.export()
  })

  // 第5步：设置定时器到指定时候后，执行第二组动画  
  setTimeout(function () {
    // 执行第二组动画  
    animation.opacity(1).step();
    // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
    that.setData({
      
      animationData: animation
    })

    //关闭  
    if (currentStatu == "close") {
      that.setData({
        showModalStatus: false
      });
    }
  }.bind(that), 200)

  // 显示  
  if (currentStatu == "open") {
    that.setData({
      showModalStatus: true
    });
  }
}

module.exports.util = util