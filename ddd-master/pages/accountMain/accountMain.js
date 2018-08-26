import  { formatTime,extend} from '../../utils/util.js';
const app = getApp();
var amm = {

  /**
   * 页面的初始数据
   */
  data: {
    levelInfo: app.globalData.levelInfo,
    barname:'goods',
    typeList:['去领取','已领取','已发货'],
    goodsList:[{
      g_title:'苏菲A',
      'timestamp':'2018-03-04 23:04:57',
      'status':1
    },{
      g_title:'苏菲B',
      'timestamp':'2018-03-04 23:04:57',
      'status':2
    },{
      g_title:'苏菲C',
      'timestamp':'2018-03-04 23:04:57',
      'status':3
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.fetchData({
      func:'user.get_answer_list'
    }).then(data=>{
      data.bonus_list = data.bonus_list.map(item=>{
        item.s_money = (item.s_money / 100 || 0).toFixed(2);
        return item
      })
      data.balance = (data.balance / 100 || 0).toFixed(2);
      data.last_bonus.s_money = (data.last_bonus.s_money / 100 || 0).toFixed(2);

      return data;
    }).then(data=>{
      // let ct = data.last_bonus.create_time;
      // data.last_bonus.create_time = formatTime(new Date(ct));
      this.setData({
        cinfo:data,
        userInfo: app.globalData.userInfo
      })
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
    let imageUrl = 'https://wxapp.haizeihuang.com/wannengdequan_php/images/share.png';
    let title = '24小时随时答题夺金，对三道题就有奖金，答的多拿得多。';
    let path = 'pages/index/index?';
    return {
      title: title,
      path: path,
      imageUrl: imageUrl,
      success: function (res) {},
      fail: function (res) {}
    }
  },
  toTX:function(){
    let m = this.data.cinfo.balance;
    app.toPage('tx', {m},'to');
  },
  toRule:function(){
    //app.toPage('tx', { m });
  },
  setCurTab:function (e) {
    let barname = e.target.dataset.barname;
    if(barname == 'com'){
      this.setData({
        barname:'com'
      });
    }else{
      this.setData({
        barname:'goods'
      });
    }
  },
  toAddress: function (e) {
    let ga_id = e.target.dataset.gaid;
    app.toPage('address', {
      ga_id: ga_id
    });
  },
}



var ammh = extend(amm,{});
Page(ammh);
