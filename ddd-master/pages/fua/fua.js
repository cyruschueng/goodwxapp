// pages/fua/fua.js
var app = getApp();
import { makePar, extend } from '../../utils/util.js';

var fuam = {

  /**
   * 页面的初始数据
   */
  data: {
    cd: 0,
    isOver:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.options = options;

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
    let options = this.options;
    let po = {};
    //如果是实物答题-2018-02-04 18:19:33
    if (options.ga_id){
      po.func = 'goods_help.get_helper';
      po.ga_id = options.ga_id;
    }else{
      po.func = 'help.get_helper';
      po.a_id = options.a_id;
    }

    app.fetchData(po).then(data => {
      let userInfo = app.globalData.userInfo;
      this.setData({
        isOver:false,
        answer: data,
        userInfo
      })
      this.startCd(data);
    })
    this.setUserInfo();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    let ask_sid = this.ask_sid;
    clearInterval(ask_sid)
    this.setData({
      isOver: false,
    })

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

  onShareAppMessage: function () {
    let imageUrl = 'https://wxapp.haizeihuang.com/wannengdequan_php/images/share.png';
    let title = '24小时随时答题夺金，对三道题就有奖金，答的多拿得多。';
    //判断是否为实物答题-2018-02-04 18:19:33
    let par = this.options.a_id ? `a_id=${this.options.a_id}` : `ga_id=${this.options.ga_id}`;
    let path = 'pages/fua/fua?' + par;
    return {
      title: title,
      path: path,
      imageUrl: imageUrl,
      success: function (res) {},
      fail: function (res) {}
    }
  },

  checkAsk:function(e){
    if(this.data.isOver) return ;

    let qid = e.target.dataset.qid || e.currentTarget.dataset.qid;

    this.setData({isOver: true,sqid:qid});
    let po = {};
    //如果是实物答题-2018-02-04 18:19:33
    if (this.options.ga_id){
        po.func = 'goods_help.help_answer'
        po.ga_id = this.options.ga_id
    }else{
      po.func = 'help.help_answer';
      po.a_id = this.options.a_id;
    }
    po.fabulous = qid;
    app.fetchData(po).then(data=>{
      wx.showToast({ 'title':'提交成功'});
      clearInterval(this.ask_sid);
    }).catch(error=>{
      wx.showToast({ 'title':'服务器超时', image: "../../images/error-a.png" });
    })

  },

  startCd: function (qd){
    this.data.cd = qd.help_time || 99;
    this.ask_sid =  setInterval(() => {
      let oldCd = this.data.cd;
      if (oldCd < 1) {
        clearInterval(this.ask_sid);
        this.setData({isOver:true});
        if(!this.data.sqid){
          wx.showToast({
            title: '答题已超时',
            image: "../../images/error-a.png"
          });
        }
      } else {
        this.setData({ cd: --oldCd });
      }
    }, 1000);
  },

  toIndex:function(){
      app.toPage('index',{});
  },
   /*
    @purpose 定时器-获得userInfo
    @creatTime 2018-01-02 21:09:22
    @author miles_fk
  */
  setUserInfo: function () {
    let that = this;
    let sid = setInterval(function () {
      let info = app.globalData.userInfo;
      if (info.nickName) {
        that.setData({
          userInfo: info,//app.globalData.userInfo,
        })
        clearInterval(sid);
      }
    }, 500);
  },

}

var fuamh = extend(fuam,{});
Page(fuamh);
