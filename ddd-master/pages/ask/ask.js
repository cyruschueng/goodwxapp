// pages/ask/ask.js
import _ from '../../utils/underscore.js';
import { makePar, extend } from '../../utils/util.js';
var app = getApp();

var askm = {
  /**
   * 页面的初始数据
   */
  data: {
    isOver: false,
    isCheck: false,
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
    let that = this;
    app.fetchData({
      func: 'answer.get_answer_info',
      level: qo.cid
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
    }).then(()=>{
      //开始  答题 倒计时
      this.ask_sid = setInterval(() => {
        let oldCd = this.data.cd;
        if (this.isWaiting) return;
        if (oldCd < 1) {
          clearInterval(this.ask_sid);
          clearInterval(this.hcd_sid);
          this.setData({ isOver: true });
          let lindex = this.data.answer.q_level-1;//答题级别变成下标
          let rf = this.data.answer.resurrection_fee;//获得金额显示
          let content = `答题失败您可以续命这一关，否则只能下场从幼儿园重新开始。`;

          this.setData({
            isTryUIA:true,
            TryUIInfo:content
          });
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
  /**
   * 分享复活
   */
  tryItByShare:function () {
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

    wx.updateShareMenu({ withShareTicket: true })
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
      let par = `a_id=${this.data.answer.a_id}`;
      //let par = '';
      let path = 'pages/fua/fua?' + par;
      let that = this;
      return {
        title: title,
        path: path,
        imageUrl: imageUrl,
        success: function (ress) {
          //如果成功则禁用转发功能 因为是一对一的
          // wx.hideShareMenu();
          console.log('ask--------------onShareAppMessage------->', path)
          //TODO  增加回去用户信息的接口来区分群 -2018-03-14 17:54
          if (res.from === 'button' && res.target.id == 'tryItByShare') {
            app.fetchData({
              func:'resurrection.share_group',
              a_id: that.data.answer.a_id
            }).then(()=>{
              app.toPage('ask', { cid: that.cid })
            }).catch(()=>{
              //TODO 服务器异常怎么处理 - 2018-03-14 17:55
            })
            return 
          }

          that.setData({
            isShowHelpUI: true
          })
          //当前题目如果分享了 就不用调用接口了
          if (!that.isQuestionShare) {
            app.fetchData({
              func: 'help.share_num',
              a_id: that.data.answer.a_id
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
      @purpose 再次尝试在支付后
      @createTIme 2018-01-06 08:47:58
      @author miles_fk
      @parm
          answer.q_id
  */
  tryIt: function (force=0){
    let that = this;

    this.isWaiting = true;
    app.fetchData({ //调用复活接口
        func: 'resurrection.resurrection',
        a_id: this.data.answer.a_id,
        force: force
    }).then(data=>{
      //余额支付-2018-01-13 21:43
      if (data.payType === 'balance'){
        wx.showToast({
          title: '余额支付成功',
        })
        setTimeout(() => {
          app.toPage('ask', {cid:that.cid})
        }, 500);

        return ;
      }else{//使用微信进行支付-2018-01-13 21:43
        data.timeStamp = data.timeStamp + '';
        data.success = function () {
          app.toPage('ask', { cid:that.cid})
        }
        data.fail = function (error) {
          that.isWaiting = false;
          wx.showToast({
            title: '支付失败，即将返回首页',
            icon: 'none'
          });
          that.toIndex();
        }
        try {
          wx.requestPayment(data);
        } catch (e) {
          console.log(e);
        }
      }
    }).catch(()=>{
      console.log("生成订单次失败");
      this.toIndex();
    })
  },
    /*
      @purpose 核对是否 是 最后一道题
      @createTIme 2018-01-06 08:47:58
      @author miles_fk
  */
  isEndQuestion: function (answer){
    let { a_progress, a_max}  = answer;
    if (a_progress == a_max) return true
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
    this.setData({isCheck:true,selectQid:qid});
    return app.fetchData({
      func:'answer.check_answer',
      q_an: qid
    }).then(data=>{
      if (data.share == 0){
          wx.hideShareMenu();
      }
      return data;
    }).then(data=>{
      console.log("ask--------->fetchData------->answer.get_answer_info", data.q_an_yes);
      switch (data.is_correct){
          case 1 :{ //正确
            //更新问题数据 、重置倒计时 、选了谁
            if (this.isEndQuestion(data) || data.share == 0){
              wx.hideShareMenu();
            }else{
              this.isQuestionShare = false
            }
            this.setData({ answer: data, cd: data.answer_time,isCheck:false});
            this.isWaiting = false;
            this.cur_qid = false;
            break;
          }
          case 2:{ //错误
            clearInterval(this.hcd_sid);
            clearInterval(this.ask_sid);
            wx.hideShareMenu();
            //TODO 最后一道题错了怎么办 2018-01-09 19:04:31
            //let lindex = this.data.answer.q_level;//答题级别变成下标
            //let rf = this.data.answer.resurrection_fee;//获得金额显示
            //let content = `距离${rf[lindex]/100}元奖学金,一步之遥.点击续命,获得答题机会`;
            let content = '答题失败您可以续命这一关，否则只能下场从幼儿园重新开始。';
            this.setData({
              isTryUIB:true,
              TryUIInfo:content,
              isOver: true,
              answer: data
            });
            break;
          }
          case 3:{//通关
            wx.showToast({ title: '恭喜你过关了' });
            clearInterval(this.hcd_sid);
            clearInterval(this.ask_sid);
            app.toPage('dx');
            break;
          }
      }
      }).catch(()=>{
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
      let a_id = this.data.answer.a_id;
      app.fetchData({
        func:'help.fabulous_num',
        a_id: a_id,
        noloadding:true
      }).then(data=>{
        this.setData({ tipInfo: data});
      });
  }
}


var askmh = extend(askm,{});

Page(askmh);


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
