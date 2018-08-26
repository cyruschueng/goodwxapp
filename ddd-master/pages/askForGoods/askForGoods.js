// pages/askForGoods/askForGoods.js 实物答题
import _ from '../../utils/underscore.js';
import { makePar, extend } from '../../utils/util.js';
var app = getApp();

var askm = {
  /**
   * 页面的初始数据
   */
  data: {
    isOver: false,
    isCheck:false,
    isPassAll:false,
    isShowHelpUI:false, //是否显示帮助显示浮层-2018-01-05 11:26
    isTryUIA:false,//续命提示框
    isTryUIB:false,//续命提示框
    TryUIInfo:'',
    answer:{},
    cd:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (qo) {
    console.log("ask------onLoad--------", qo);
    this.isWaiting = false;
    this.isQuestionShare=false;
    this.cid = qo.cid;
    this.g_id = qo.g_id;
    let that = this;
    app.fetchData({
      func: 'goods.get_answer_info',
      g_id: qo.g_id
    }).then(data => {
      if (data.share == 0) {
        wx.hideShareMenu();
      }
      return data;
    }).then(data=>{
      console.log("ask--------->fetchData------->answer.get_answer_info",data.q_an_yes);
      try {
        that.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true,
          answer: data,
          cd: data.answer_time,
          helpCD: data.help_time
        })
      }
      catch (err) {
        console.log(err);
      }
    }).then(data=>{
      //开始  答题 倒计时
      this.ask_sid = setInterval(() => {
        console.log("setInterval-----cd----------------------------",this.data.cd);
        let oldCd = this.data.cd;
        if (this.isWaiting) return;
        if (oldCd < 1) {
          // let qid = e.target.dataset.qid || e.currentTarget.dataset.qid;
          let e = {
            target:{dataset:{qid:''}},
            currentTarget:{dataset:{qid:''}}
          }
          this.checkAsk(e)
        } else {
          this.setData({ cd: --oldCd });
        }
      }, 1000);
    })
  },
  /**
   * 强制复活
   */
  tryItA:function () {
    this.tryIt(1);
    this.hideTryItUI();
  },
  /**
   * 正常复活
   */
  tryItB:function () {
    this.tryIt();
    this.hideTryItUI();
  },

  hideTryItUI:function () {
    this.setData({
      isTryUIA:false,
      isTryUIB:false
    })
  },
  toIndex:function () {
    this.hideTryItUI();
    app.toPage('index', {});
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
    //clearInterval(this.hcd_sid);
    //clearInterval(this.ask_sid);
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
      clearInterval(this.hcd_sid);
      clearInterval(this.ask_sid);
      //app.fetchData({func:'answer.mark_answer_fail'})
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
  onShareAppMessage: function (res) {
    this.isWaiting = true;
    let imageUrl = 'https://wxapp.haizeihuang.com/wannengdequan_php/images/share.png';
    let title = '急！我正参加在百万夺金答题，万能的圈啊帮我选择正确答案！';
    //if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
      let par = `ga_id=${this.data.answer.ga_id}`;
      //let par = '';
      let path = 'pages/fua/fua?' + par;
      let that = this;
      return {
        title: title,
        path: path,
        imageUrl: imageUrl,
        success: function (res) {
          //如果成功则禁用转发功能 因为是一对一的
          // wx.hideShareMenu();
          console.log('ask--------------onShareAppMessage------->', path)
          that.setData({
            isShowHelpUI: true
          })
          //当前题目如果分享了 就不用调用接口了
          if (!that.isQuestionShare) {
            app.fetchData({
              func: 'goods_help.share_num',
              ga_id: that.data.answer.ga_id
            }).then(data => {
              //增加是否判断  控制 分享行为-2018-01-06 10:52
              that.isQuestionShare = true
              that.startHelpCD();
            }).catch((error) => {
              if(error.code == -201004){
                wx.hideShareMenu()
              }
              that.setData({
                isShowHelpUI: false
              })
            })
          }
        },
        fail: function (res) {
          // 转发失败
        }
      }
  },

    /*
      @purpose 核对是否 是 最后一道题
      @createTIme 2018-01-06 08:47:58
      @author miles_fk
  */
  isEndQuestion: function (answer){
    let { ga_progress, ga_max}  = answer;
    if (ga_progress == ga_max) return true
    else return false
  },

  onCheck:function(e){
    if (this.isWaiting) return ;
    this.checkAsk(e).catch(data=>{
      this.isWaiting = false;
    });
  },

  /*
      @purpose 核对问题
      @createTIme 2018-01-06 08:47:58
      @author miles_fk
  */
  checkAsk:function(e){
    console.log("ask----->checkAsk---------------->",e.target.dataset);
    if (this.data.isOver) return
    let that = this;
    let qid = e.target.dataset.qid || e.currentTarget.dataset.qid;

    // 如果选择的是 五项选的则不进行处理-2018-01-13 21:25:48
    if (qid > this.data.answer.q_an_num && qid < 98){
      return
    }


    this.cur_qid = qid;
    this.isWaiting = true;
    //check-question 接口 核对
    this.setData({ isCheck: true ,selectQid: qid});
    return app.fetchData({
      func:'goods.check_answer',
      q_an: qid
    }).then(data=>{
      if (data.share == 0){
          wx.hideShareMenu();
      }
      return data;
    }).then(data=>{
      console.log("ask--------->fetchData------->answer.get_answer_info", data.q_an_yes);
      switch (data.is_correct){
          case 3:{//通关 TODO后台增加一个字段判断是否通关
            clearInterval(this.hcd_sid);
            clearInterval(this.ask_sid);
            if(data.win_prize){
              wx.showToast({ title: '恭喜你过关了' });
              setTimeout(() => {
                app.toPage('goodsPass', { ispass:1});
              }, 600);
            }else{
              wx.showToast({ title: '答题失败' , image: "../../images/error-a.png"});
              setTimeout(() => {
                app.toPage('goodsPass', { ispass: 0 });
              }, 600);
            }
            break;
          }
          default: {
            //更新问题数据 、重置倒计时 、选了谁
            if (this.isEndQuestion(data) || data.share == 0) {
              wx.hideShareMenu();
            } else {
              this.isQuestionShare = false
            }
            this.setData({ answer: data, cd: data.answer_time, isCheck:false});
            this.isWaiting = false;
            this.cur_qid = false;
            break;
          }
      }
    }).catch(() => {
      this.toIndex();
    });
  },

    /*
      @purpose 开启帮助
      @createTIme 2018-01-06 08:47:58
      @author miles_fk
  */
  startHelpCD: function(){
    let  that = this;
    this.isWaiting = true;
    this.hcd_sid = setInterval(()=>{
      let time = this.data.helpCD-1;
      console.log(time);
      //帮助时间到
      if (time < 0) {
        let sid = this.hcd_sid ;
        clearInterval(sid)//清除帮助倒计时器
        // target.dataset.qid;
        let qid = this.getMaxqid(this.data).qid;
        let e = { target: { dataset :{qid}}}
        this.checkAsk(e).then(()=>{
            this.isWaiting = false;
            that.setData({
              cd: this.data.answer.answer_time,
              helpCD: this.data.answer.help_time,
              isShowHelpUI: false
            })
        }).catch(()=>{
          this.isWaiting = false;
          that.setData({
            cd: this.data.answer.answer_time,
            helpCD: this.data.answer.help_time,
            isShowHelpUI: false
          })
        })
      }else{
        this.setData({
          helpCD: time
        })
        this.getFabulous();
      }
    },1000);
    this.setData({
      isShowHelpUI:true
    })
  },

  getMaxqid:function(data){
    let qlist = [
      {star: data.fabulous1 || 0 ,qid:1},
      { star: data.fabulous2 || 0 ,qid:2},
      { star: data.fabulous3 || 0,qid:3 },
      { star: data.fabulous4 || 0, qid: 4}
    ]

    qlist = qlist.sort((pre,after)=>{
      if (after.star > pre.star){return 1}
      if (pre.star < after.star) {return -1}
      if (pre.star == after.star){return 0}
    });

    //TODO 如果没有选择则为99-2018-01-12 20:44
    if (qlist[0].star == 0) qlist[0].qid = 99;
    return qlist[0]
  },
  getFabulous: function () {
      let ga_id = this.data.answer.ga_id;
      app.fetchData({
        func:'goods_help.fabulous_num',
        ga_id: ga_id,
        noloadding:true
      }).then(data=>{
        this.setData({ tipInfo: data});
      });
  }
}


var askmh = extend(askm,{});

Page(askmh);


function fb(){
  let a = 100;
  return function(){
    return a
  }
}

// this.hcd_sid = setInterval(()=>{
//   let time = this.data.helpCD-1000;
//   let  m,s;
//   console.log(time);
//   if (time >= 0) {
//     m = Math.floor(time / 1000 / 60 % 60);
//     s = Math.floor(time / 1000 % 60);
//   }
//   this.setData({
//     helpTime:{m,s},
//     helpCD: time
//   })
// },1000);
