//index.js
//获取应用实例
const app = getApp()
var util=require('../../utils/util.js');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    array_yunsuanshu: [2,3,4,5],//参与运算的数字个数
    index_yunsuanshu: 0,
    array_weishu: [1,2,3,4],//参与运算的数字位数
    index_weishu: 0,  
    array_timushu: [10,15,20,25,30],//出题数量
    index_timushu: 2,
    array_xiaoshuwei: [1,2,3,4],//结果保留的小数位
    index_xiaoshuwei: 0,
    xiaoshuwei_result: 0,
    array_yunsuanfu: [{ name: '+', checked: false }, { name: '-', checked: false }, { name: '×', checked: false }, { name: '÷', checked: false }],
    array_yunsuanfu_result: ['+','-'],//默认选中的运算符是+和-
    array_yunsuanfu_tmp: [],//运算符的临时数组，用来记录checkbox-group变化时的返回值
    show_yunsuanfu: false,//运算符配置的页面默认是false，不显2
    switchState: true,
    timu:[],//题目数组
    correct_result:[],//答案数组
    array_time: [5,10,15,20,25],//待选择的考试时间，单位是分钟
    index_time: 0,//默认的array_time下标
    time_result: 300,//答题时间，用户选择时是分钟，传递参数时最终转换为秒
    isAuthority: getApp().globalData.authority,
  },
  switchChange: function(e){//结果取整
    this.setData({switchState: e.detail.value});
    if(e.detail.value==true){
      this.setData({xiaoshuwei_result:0});
    }else{
      this.setData({xiaoshuwei_result:this.data.array_xiaoshuwei[this.data.index_xiaoshuwei]});
    }
  },
  timechanged: function(e) {
    //设置考试时间
    this.setData({index_time: e.detail.value});
    var time=this.data.array_time[this.data.index_time]*60;
    this.setData({time_result:time});
  },
  //事件处理函数
  btStart: function(e) {
    wx.navigateTo({
      url: '/pages/main_exam/main_exam?yunsuanshu=' + this.data.array_yunsuanshu[this.data.index_yunsuanshu] + "&weishu=" + this.data.array_weishu[this.data.index_weishu] + "&yunsuanfu=" + this.data.array_yunsuanfu_result + "&timushu=" + this.data.array_timushu[this.data.index_timushu] + "&xiaoshuwei=" + this.data.xiaoshuwei_result + "&mode=exam" + "&time=" + this.data.time_result
    });
  }, 
  btExport: function(e){
    var num = this.data.array_timushu[this.data.index_timushu];
    for(var i=0;i<num;i++){
      var result = util.getBiaodashi(this.data.array_yunsuanshu[this.data.index_yunsuanshu], this.data.array_yunsuanfu_result, this.data.array_weishu[this.data.index_weishu], this.data.timu, this.data.correct_result, this.data.xiaoshuwei_result);//return {correct_result: correct_result,biaodashi: biaodashi, timu: timu}
    //yunsuanshu, yunsuanfu, weishu, timu, correct_result, xiaoshuwei
      this.setData({ correct_result: result.correct_result, timu: result.timu });
    }
    var timu=this.data.timu;
    var correct_result=this.data.correct_result;
    var text="题目\t正确答案";
    for(var i=0;i<timu.length;i++){
      text=text+"\n"+timu[i]+"\t"+correct_result[i];
    }
    wx.setClipboardData({
      data: text,
      success: function(){
        wx.showModal({
          title: '成功',
          content: '请打开Excel或记事本，完成粘贴',
        });
      }
    })
  },
  yunsuanfu_change: function(e){//点击了运算符配置选项后，配置页面出现了
    this.setData({show_yunsuanfu: true});
  },
  timushuchanged: function(e){
    this.setData({index_timushu:e.detail.value});
  },
  yunsuanfu_changed: function(e){//
    this.setData({array_yunsuanfu_tmp:e.detail.value});
  },
  onLoad: function () {
    console.log("获取的数据："+this.data.isAuthority);
    this.setData({isAuthority: getApp().globalData.authority});
    wx.setNavigationBarTitle({
      title: '四则运算练习器',
    });
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  confirmTap: function(e){
    //选中的运算符不能为空
    if (this.data.array_yunsuanfu_tmp.length == 0) {
      wx.showToast({
        title: '必须至少选择一个运算符',
        duration: 2000
      });
      return;
    }
    this.setData({array_yunsuanfu_result:this.data.array_yunsuanfu_tmp});
    this.setData({show_yunsuanfu:false});
  },
  cancelTap: function(e){
    this.setData({ array_yunsuanfu_result:['+','-']});
    this.setData({show_yunsuanfu:false});
  },
  yunsuanshuchanged: function(e) {
    this.setData({index_yunsuanshu:e.detail.value});
  },
  weishuchanged: function(e) {
    this.setData({index_weishu:e.detail.value});
  },
  xiaoshuweichanged: function(e) {
    this.setData({index_xiaoshuwei:e.detail.value});
    this.setData({ xiaoshuwei_result: this.data.array_xiaoshuwei[this.data.index_xiaoshuwei] });
  },
  onShareAppMessage: function () {
    return {
      title: '四则运算自动出题器',
      path: '/pages/index/index'
    }
  }
})
