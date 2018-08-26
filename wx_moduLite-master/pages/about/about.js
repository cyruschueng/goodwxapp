// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hide: 'hide'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 添加到通讯录
   */
  addPhone: function(){

    wx.addPhoneContact({
      photoFilePath:'../../pictures/about.png',
      lastName: '乔',
      firstName: '源',//联系人姓名
      nickName: 'louie',
      mobilePhoneNumber: '17317733001',//联系人手机号
      weChatNumber:'ws18939819198',
      addressCountry:'中国',
      addressState: '上海市',
      addressCity: '普陀区',
      addressStreet: '真南路620号同济科技园2楼',
      addressPostalCode:'200333',
      organization: '同年科技',
      title:'客户经理',
      workPhoneNumber: '17317733001',
      hostNumber:'（021）51030777',
      email: 'zx@qiniuniu.com',
      remark: '简单的事，做到极致',
      url:'www.qiniuniu.com'
    })
  },

  preview: function(){
    wx.previewImage({
      urls: ['https://www.shtongnian.com/storage/icons/code1.jpg'],
    })
  },

  /**
   * showwx
   */
  showwx: function(){
    this.setData({
      hide: ''
    })

    wx.setClipboardData({
      data: 'ws18939819198',
      success: function () {
        wx.showToast({
          title: '已复制微信号',
          duration: 1500
        })
      }
    })

  },

  hidewx: function(){
    this.setData({
      hide: 'hide'
    })
  },


  copy: function(){
    wx.setClipboardData({
      data: 'zsmd365',
      success: function(){
        wx.showToast({
          title: '已复制',
          duration: 500
        })
      }
    })
  },
})