function animation(currentStatu,obj) {
  var animation = wx.createAnimation({
    duration: 200, 
    timingFunction: "linear",
    delay: 0 
  });
  obj.animation = animation;
  animation.translateX(240).step();
  obj.setData({
    animationData: animation.export()
  })
  setTimeout(function () {
    animation.translateX(0).step()
    obj.setData({
      animationData: animation
    })
    if (currentStatu == "close") {
      obj.setData(
        {
          showModalStatus: false
        }
      );
    }
  }.bind(obj), 200)
  if (currentStatu == "open") {
    obj.setData(
      {
        showModalStatus: true
      }
    );
  }
}

module.exports = {
  animation: animation
}