const imgPath='https://develop.mmmee.cn/cmd/qunxiao/public/uploads/'

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 跳转至详情页
const toInfoHandle = (e) => {
  let _id = e.currentTarget.dataset.id;
  let entryType = e.currentTarget.dataset.type;//1为通知，2为活动，3为投票
  if (entryType == 1) {
    wx.navigateTo({
      url: '../noticeInfo/noticeInfo?id=' + _id + '',
    })
  } else if (entryType == 2) {
    wx.navigateTo({
      url: '../activityInfo/activityInfo?id=' + _id + '',
    })
  } else if (entryType == 3) {
    wx.navigateTo({
      url: '../voteInfo/voteInfo?id=' + _id + '',
    })
  }
}

//跳转至发布页
const toAddHandle = (e) => {
  let entryType = e.currentTarget.dataset.type;//1为通知，2为活动，3为投票
  if (entryType == 1) {
    wx.navigateTo({
      url: '../noticePublic/noticePublic',
    })
  } else if (entryType == 2) {
    wx.navigateTo({
      url: '../activityPublic/activityPublic',
    })
  } else if (entryType == 3) {
    wx.navigateTo({
      url: '../votePublic/votePublic',
    })
  }
}

// 本地选择图片
const uploadImg=(page,count,imgUrls) => {
  wx.chooseImage({
    count: count,
    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认压缩图
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认相册
    success: res=> {
      let tempFiles = res.tempFiles;
      for (let item of tempFiles){
        if (item.size > 1024*2024*2){
          wx.showModal({
            title: '提示',
            content: '图片大小不能超过2M',
            showCancel: false,
            success: function (res) {
              console.log('用户点击确定')
            }
          })
          return
        }
        imgUrls.push(item.path)
      }
      page.setData({
        imgUrls: imgUrls
      })
     },
  })
}

// 上传图片至服务器
const upLoadImg = (app,page,upload_URL, entryType, public_URL, imgUrls,param)=>{
  wx.showLoading({
    title: '提交中',
    mask: true
  })
  let imgUploadUrls=[];
  for (let item of imgUrls){
    wx.uploadFile({
      url: upload_URL, 
      filePath: item,
      name: 'image',
      method: "POST",
      success: function (res) {
        var data = JSON.parse(res.data)
        imgUploadUrls.push(imgPath + data.image_address)
      }
    })
  }
  // if (param.classify == 1) {
  //   param.template = parseInt(page.data.template.template_id);
  // }
  console.log(param)
  let t=setTimeout(function(){
    app.checkInfo(function () {
      try {
        var wxBizKey = wx.getStorageSync('wxBizKey');
        param.image = imgUploadUrls
        param.wxBizKey = wxBizKey;
        console.log(param)
        publicHandle(public_URL, entryType, param)
      }
      catch (e) {
      }
    })
  },1000)
  
}


//表单提交cb为回调函数，public_URL为接口地址，page为页面对象，entryType中1表示跳转至通知详情，2表示跳转至活动详情，3表示跳转至投票详情，param为请求参数
const publicHandle=(public_URL,entryType, param)=> {
  console.log(param)
  wx.showLoading({
    title: '提交中',
    mask:true
  })
  wx.request({
    url: public_URL,
    data: param,
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      'content-type': 'application/json'
    }, // 设置请求的 header
    success: res => {
      console.log(res)
      if (res.data.statusCode == '200') {
        let _id = res.data.send_id;
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1000,
          complete: function () {
            if (entryType == 1) {
              wx.redirectTo({
                url: '../noticeInfo/noticeInfo?id=' + _id + '',
              })
            } else if (entryType == 2) {
              wx.redirectTo({
                url: '../activityInfo/activityInfo?id=' + _id + '',
              })
            } else if (entryType == 3) {
              wx.redirectTo({
                url: '../voteInfo/voteInfo?id=' + _id + '',
              })
            }
          }
        })
      }
    },
    complete:function(){
      wx.hideLoading()
    }
  })
}

//获取详情
const getInfo = (page, info_URL, _id, wxBizKey, cb)=> {
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  wx.request({
    url: info_URL,
    data: {
      send_id: _id,
      wxBizKey: wxBizKey
    },
    method: 'POST',
    success: res => {
      console.log(res)
      if (res.data.statusCode == '200') {
        page.setData({
          infoData:res.data,
          viewers: res.data.valid_person
        })
      } else {
        typeof cb == "function" && cb();
      }
    },
    complete:function(){
      wx.hideLoading()
    }
  })
}

// 长按删除
const delItem = (page, list, idx, del_URL, _id, wxBizKey, box_status, cb)=>{
  wx.showModal({
    title: '提示',
    content: '确定删除该项？',
    success: function (res) {
      if (res.confirm) {
        wx.showLoading({
          title: '提交中',
          mask: true
        })
        wx.request({
          url: del_URL,
          data: {
            send_id: _id,
            wxBizKey: wxBizKey,
            box_status: box_status
          },
          method: 'POST',
          success: res => {
            if (res.data.statusCode == '200') {
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000,
                complete: function () {
                  list.splice(idx,1)
                  page.setData({
                    mainList:list
                  })
                }
              })
            } else {
              typeof cb == "function" && cb();
            }
          },
          complete:function(){
            wx.hideLoading()
          }
        })
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
 
}

module.exports = {
  formatTime: formatTime,
  uploadImg: uploadImg,
  toAddHandle: toAddHandle,
  toInfoHandle: toInfoHandle,
  publicHandle:publicHandle,
  getInfo: getInfo,
  delItem: delItem,
  upLoadImg: upLoadImg
}

