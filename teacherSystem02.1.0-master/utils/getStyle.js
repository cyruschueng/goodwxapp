function touchstart(obj,e,allContentW,allContentH,allHeight,nameW){
    obj.setData({
       contentH: allContentH,
       contentW: allContentW,
       heigh:obj.data.windowHeight - allHeight
    })

    if(obj.data.heigh >= obj.data.contentH){
      obj.setData({
        heigh:obj.data.contentH
      })
    }else if(obj.data.contentW <= obj.data.windowWidth - nameW ){
      obj.setData({
        contentW: obj.data.windowWidth - nameW,
        scrollL: 0
      })
    }
    var sX = 0,sY = 0;
    sX = e.touches[0].clientX;
    sY = e.touches[0].clientY;
    obj.setData({ startX: sX ,startY: sY});
}
function touchmove(obj,e,nameW){
    var mX = 0,mY = 0;
    mX = e.touches[0].clientX;
    mY = e.touches[0].clientY;

    var mXpx = mX - obj.data.startX + obj.data.saveOldLeft;
    var mYpx = mY - obj.data.startY + obj.data.saveOldTop;

    //如果是在屏幕以内
    if(obj.data.contentW <= obj.data.windowWidth - nameW ){
      mXpx = 0;
      obj.setData({
        contentW:obj.data.windowWidth - nameW,
      })
    }else{
      // 超出屏幕
      // console.log(mXpx +'----'+mYpx)
      /* 判断 水平方向上临界值 */
      if (mXpx >= 0) {
        mXpx = 0 // 如果往右边拖动 left 不能大于 0
      }else if(mXpx <= obj.data.windowWidth- obj.data.contentW - nameW) {
        mXpx = obj.data.windowWidth - obj.data.contentW - nameW
      }else{
        mXpx = mX - obj.data.startX + obj.data.saveOldLeft;
      }
    }

    /* 判断 垂直方向上临界值 */
    // console.log(obj.data.heigh - obj.data.contentH)
    if(mYpx >= 0){
      mYpx = 0 
    }else if(mYpx <= obj.data.heigh - obj.data.contentH){
      mYpx = obj.data.heigh - obj.data.contentH

    }else{
      mYpx = mY - obj.data.startY + obj.data.saveOldTop;
    }

    obj.setData({ scrollL: mXpx, scrollT: mYpx});
}

function touchend(obj){
  var scrollL = obj.data.scrollL;
  var scrollT = obj.data.scrollT;
  obj.setData({ saveOldLeft: scrollL, saveOldTop: scrollT})
  
}
module.exports = {
  touchstart: touchstart,
  touchmove: touchmove,
  touchend: touchend
}