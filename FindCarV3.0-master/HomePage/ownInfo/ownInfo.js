// HomePage/ownInfo/ownInfo.js
const app = getApp()
const { wc } = app
let { companyNo } = app
const { imgUrl, host, data, code, success } = wc

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  selectImg: function () {
    const that = this

    wx.chooseImage({
      count: 1,
      success: function (res) {
        let tempFilePaths = res.tempFilePaths[0]
        that.setData({
          'lgSrc': tempFilePaths
        })
        wx.uploadFile({
          url: `${host}?m=ApiFindCar&a=addLogo`,
          filePath: tempFilePaths,
          name: 'lg_img',
          formData: {
            m: 'ApiFindCar',
            a: 'addLogo',
            input: JSON.stringify({
              company_no: companyNo,
              lg_img: tempFilePaths
            })
          },
          success: (res) => {
          }
        })
      },
    })
  },
  submitCompanyInfo: function (e) {
    let formData = e.detail.value
    // for (let i in formData) {
    //   if (!formData[i]) {
    //     wc.showModal('请输入完整参数')
    //     return
    //   }
    // }
    let submitData = {
      a: 'changeCompanyInfo',
      input: wc.extend(formData, {
        company_no: companyNo
      })
    }

    wc.get(submitData, (json) => {
      if (json[code] === parseInt(success)) {
        setTimeout(() => {
          wc.showToast(['保存成功'])
        }, 100)
        setTimeout(() => {
          wc.navigateBack()
        }, 1300)
      } else {
        wc.showToast(['保存失败', 'loading'])
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    companyNo = app.companyNo
    const that = this
    let companyData = {
      a: 'getCompanyInfo',
      input: {
        company_no: companyNo
      }
    }

    wc.get(companyData, (json) => {
      if (json[code] === success) {
        that.setData({
          companyInfo: json[data].company_info,
          lgSrc: !!json[data].lg_src ? imgUrl + json[data].lg_src : ''
        })
      } else {
        wc.showToast(['请求失败', 'loading'])
      }
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