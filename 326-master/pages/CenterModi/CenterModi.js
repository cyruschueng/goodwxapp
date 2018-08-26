var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    usName:'',
    usId:'',
    centip:'请输入昵称',
    centTapDis:false,
    centNameHid:true,
    logo: '/images/rsign_user.png',
    datpic:{
      picBig:'',
      picSmall:'',
    }
  },
  cenModiCancel:function(e){
    wx.navigateBack({
      delta: 1
    })
  },
  // 获取输入账号
  usNaInput: function (e) {
    var that = this
    if (util.trim(e.detail.value)) {
      that.setData({
        usName: util.trim(e.detail.value),
        centNameHid: true,
      })
    } else {
      that.setData({
        centip:'请输入昵称',
        centNameHid: false,
      })
    }
  },
  // 点击添加电站图片 第一步
  chooseImageTap: function () {
    let that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择'],
      itemColor: "#f7982a",
      // 弹出弹框选择
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },
  // 第二步
  chooseWxImage: function (type) {
    let that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      // 第四步拿到图片路径
      success: function (res) {
        that.setData({
          logo: res.tempFilePaths[0],
          centNameHid: false,
          centip: '图片上传中',
          centTapDis:true
        })
        wx.uploadFile({
          url: util.http_upload_pic_url(),
          filePath: that.data.logo,
          name: 'pic',
          success: function (res) {
            that.setData({
              centNameHid: true,
              centTapDis:false
            })
            var dataJson = JSON.parse(res.data)
            that.setData({
              datpic: dataJson.dat
            })
          },
          fail: function (res) {
            wx.showToast({
              title: '上传失败！',
              icon: 'loading',
              duration: 1500
            })
            that.setData({
              centTapDis: false
            })
          },
        })
      }
    })
  },
  // 上传图片 end

  // 点击确定修改   
  listPage: function () {
    var that = this, action ='editAccount';
    var usName = that.data.usName
    if (util.trim(that.data.datpic.picBig) != ''){
      action += '&photo=' + that.data.datpic.picBig 
    }
    if (util.trim(usName) == '') {
      that.setData({
        centNameHid: false,
        centip:'请输入昵称'
      })
    } else if (that.data.centNameHid==true){
      action += '&qname=' + that.data.usName
      util.http_oper(encodeURI('&action=' + action), function (err, dat, desc) {
        if (err == 0) {
          wx.showToast({
            title: '修改成功！',
            icon: 'loading',
            duration: 1500
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '/pages/center/center',
            })
          }, 500)
        } else {
          util.errBoxFunc(that, err, desc) 

        }
      }, function () {
        util.netWork(that)
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that = this;
  that.setData({
    usId: options.usId
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
    var shareObj = util.shareFunc()
    return shareObj
  }
})