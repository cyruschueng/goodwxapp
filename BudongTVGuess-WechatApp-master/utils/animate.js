//  动画效果集合
const data = {

};

//  弹出层动画
const toast = {
  ready: function(){

    data.ready = wx.createAnimation({
      duration: 0,
      timingFunction: 'ease'
    });
    data.ready.opacity(0).step();
    return data.ready.export();
  },
  fadeIn: function(){

    data.fadeIn = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    });
    data.fadeIn.opacity(1).step();
    return data.fadeIn.export();
  },
  fadeOut: function () {

    data.fadeOut = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease'
    });
    data.fadeOut.opacity(0).translateY(-100).step();
    return data.fadeOut.export();
  }
};

//  模态层动画
const modal = {
  ready: function () {

    data.ready = wx.createAnimation({
      duration: 0,
      timingFunction: 'ease'
    });
    data.ready.opacity(0).step();
    return data.ready.export();
  },
  fadeIn: function () {

    data.fadeIn = wx.createAnimation({
      duration: 360,
      timingFunction: 'ease'
    });
    data.fadeIn.opacity(1).step();
    return data.fadeIn.export();
  },
  fadeOut: function () {

    data.fadeOut = wx.createAnimation({
      duration: 360,
      timingFunction: 'ease'
    });
    data.fadeOut.opacity(0).step();
    return data.fadeOut.export();
  }
};

//  文字选项动画
const word = {
  choiceNone: function () {

    data.choiceNone = wx.createAnimation({
      duration: 0,
      timingFunction: 'ease'
    });
    data.choiceNone.backgroundColor('#ffffff').step();
    return data.choiceNone.export();
  },
  choiceIn: function (delay) {

    data.choiceIn = wx.createAnimation({
      duration: 240,
      timingFunction: 'ease',
      delay: delay
    });
    data.choiceIn.scale(2, 2).step();
    data.choiceIn.backgroundColor('#ffffff').scale(1, 1).step();
    return data.choiceIn.export();
  },
  choiceOut: function(){

    data.choiceOut = wx.createAnimation({
      duration: 240,
      timingFunction: 'ease'
    });
    data.choiceOut.scale(2, 2).step();
    data.choiceOut.backgroundColor('rgba(0,0,0,0.25)').scale(1, 1).step();
    return data.choiceOut.export();
  },
  entryNone: function () {

    data.entryNone = wx.createAnimation({
      duration: 0,
      timingFunction: 'ease'
    });
    data.entryNone.backgroundColor('rgba(0,0,0,0.25)').step();
    return data.entryNone.export();
  },
  entryIn: function(){

    data.entryIn = wx.createAnimation({
      duration: 180,
      timingFunction: 'ease'
    });
    data.entryIn.backgroundColor('#ffffff').step();
    return data.entryIn.export();
  },
  entryOut: function (delay) {

    data.entryIn = wx.createAnimation({
      duration: 180,
      timingFunction: 'ease',
      delay: delay
    });
    data.entryIn.backgroundColor('rgba(0,0,0,0.25)').step();
    return data.entryIn.export();
  },
  entryShake: function(){

    data.entryShake = wx.createAnimation({
      duration: 180,
      timingFunction: 'ease'
    });
    data.entryShake.backgroundColor('#ff0000').step();
    data.entryShake.backgroundColor('rgba(0,0,0,.25)').step();
    data.entryShake.backgroundColor('#ff0000').step();
    data.entryShake.backgroundColor('rgba(0,0,0,.25)').step();
    data.entryShake.backgroundColor('#ff0000').step();
    return data.entryShake.export();
  }
};

module.exports = {
  toast: toast,
  modal: modal,
  word: word
};