

//远程图片加载失败处理
function errImgFun(e,that){
  var _errImg=e.target.dataset.errImg
  var _errObj={}
  _errObj[_errImg] ='/image/default.png'
  console.log(e.detail.errMsg + "----" + "----" + _errImg)
  that.setData(_errObj)
}

module.exports={
  errImgFun: errImgFun  
}

