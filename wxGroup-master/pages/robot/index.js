Page({

  scanPic(){
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: ['https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1515137727&di=53371e4ddcecc6e7479db8814261588c&src=http://www.qqjishu.cc/uploads/allimg/151031/1329321445-0.gif'] // 需要预览的图片http链接列表
    })

  }
  
})