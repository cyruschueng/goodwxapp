var app = getApp()
var sv = require('../../utils/server.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconList:[],
    iconFlag:0,
    iconArray:['景点','美食','住宿','娱乐','活动','文化','户外','购物'],
    list:[
      [
        { image: 'http://img.mp.itc.cn/upload/20161118/228418521cad4f0ead97a5828db2cfc4_th.jpg', title: '熊猫园', subTitle: '营业时间：9:00~16:00', price: 40 },
        { image: 'http://img.pconline.com.cn/images/upload/upc/tx/itbbs/1507/29/c66/10412388_1438181065508.jpg', title: '湿地景区', subTitle: '营业时间：9:00~16:00', price: 25 },
      ],
      [
        { image: 'http://img.zxzhijia.com/case/20140513/20140513161405_50355.jpg', title: '美式简餐', subTitle: '营业时间：9:00~16:00', price: 40 },
        { image: 'http://parkviewgreen.com/html/public/upload/images/media/2015-03/media_p19hkesu2f190annr1qid18b9tq11.jpg', title: 'BigJa cafe 咖啡厅', subTitle: '营业时间：9:00~16:00', price: 300 },
      ],
      [
        { image: 'http://q-cf.bstatic.com/images/hotel/840x460/492/49209783.jpg', title: '湖畔民宿', subTitle: '请在18:00前预约', price: 320 },
        { image: 'http://img1.iyiou.com/Cover/2017-08-18/hangye-lv.jpg', title: '某某民宿', subTitle: '请在18:00前预约', price: 250 },
        { image: 'http://img.mp.itc.cn/upload/20170317/17ad309a38254bd587ae5063a97e1eec_th.jpg', title: '某某民宿', subTitle: '请在18:00前预约', price: 250}
      ],
      [
        { image: 'http://www.pig66.com/uploadfile/2016/1102/20161102124501846.jpg', title: '江南茧寨', subTitle: '营业时间：9:00~16:00', price: 25},
        { image: 'http://img1.selfimg.com.cn/uedselfcms/2017/11/13/1510571508_Ml1Tn6.jpg', title: '儿童游戏屋', subTitle: '营业时间：9:00~16:00', price: 25 },
        { image: 'http://img.zcool.cn/community/017da4585265dda801219c77314611.jpg@1280w_1l_2o_100sh.jpg', title: '金牌KTV', subTitle: '营业时间：9:00~16:00', price: 25}
      ],
      [
        { image: 'http://img.zcool.cn/community/017f765549bc9b0000009e32d415a7.jpg', title: '下渚湖全场年促销', subTitle: '活动时间: 2月1日~2月15日', price: 0 },
        { image: 'http://img1.imgtn.bdimg.com/it/u=3971635326,4098553948&fm=214&gp=0.jpg', title: '志愿者活动', subTitle: '活动时间: 2月1日~2月15日', price: 0 },
        { image: 'http://heilongjiang.sinaimg.cn/2014/0207/U9109P1274DT20140207082126.png', title: '春节活动', subTitle: '活动时间: 2月7日~2月17日', price: 0 }
      ],
      [
        { image: 'http://i3.sinaimg.cn/travel/2014/0526/U8795P704DT20140526195853.jpg', title: '历史文化', subTitle: '', price: '0' },
        { image: 'http://img4.imgtn.bdimg.com/it/u=1897990662,1885400032&fm=11&gp=0.jpg', title: '民俗风俗', subTitle: '', price: '0'}
      ],
      [
        { image: 'http://imgphoto.gmw.cn/attachement/jpg/site2/20161104/f44d305ea0d91986280721.jpg', title: 'cs童子军夏令营', subTitle: '营业时间：9:00~16:00', price: 100 },
        { image: 'http://img2.imgtn.bdimg.com/it/u=1311628582,1529682879&fm=214&gp=0.jpg', title: '户外求生技能训练营', subTitle: '营业时间：9:00~16:00', price: 100 },
      ],
      [
        { image: 'http://lywb.lyd.com.cn/images/2013-04/01/1364774133046lya3373_b.jpg', title: '特产', subTitle: '营业时间：9:00~16:00', price: 0 },
        { image: 'http://i3.szhomeimg.com/o/2015/08/06/0806181342628331.JPG', title: '特产', subTitle: '营业时间：9:00~16:00', price: 0 },
      ],
    ]
  },
  iconChange(e){
    this.setData({
      iconFlag:e.detail.value
    })
  },
  navToShop(e){
    var that = this
    wx.navigateTo({
      url: '/pages/details/shop/shop?id='+that.data.iconFlag,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      iconFlag: options.id,
      iconList: sv.iconList
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