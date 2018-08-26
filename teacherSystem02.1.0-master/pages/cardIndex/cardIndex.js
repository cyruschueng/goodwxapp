//index.js
// var changeTabBar = require('../../utils/changeTabBar.js');
// var animation = require('../../utils/animation.js');
var classList = require('../../utils/classList.js');
var md51 = require('../../utils/md51.js');
var requestGet = require('../../utils/requestGet.js');
var publicJs = require('../../utils/public.js');
var check = require('../../utils/check.js');
//获取应用实例
const app = getApp();

Page({
  data: {
    tabBarArr:[
      {id:0,txt:'录入',iconSrc:'../images/write.gif',changeTextColor:'#525252',isChange: false},
      {id:1,txt:'查询',iconSrc:'../images/search.gif',changeTextColor:'#525252',isChange: true},
      {id:2,txt:'工具',iconSrc:'../images/setting1.gif',changeTextColor:'#1FBB1C',isChange: false},
    ],
    yearArr:[
      {id: 2016, value: 2016},
      {id: 2017, value: 2017},
    ],
    semesterArr: [
      {id: 1, value: '秋季'},
      {id: 2, value: '寒假'},
      {id: 3, value: '春季'},
      {id: 4, value: '暑假'}
    ],
    teacherName:'张云',
    resultH:400,
    schoolYear: 2017,
    semester:'秋季',
    showModalStatus: false,//控制导航显示
    isopen:'open',//控制菜单按钮显示
    show: false,//控制公共弹窗显示
    show1: false,//控制按钮弹窗显示
    tipClassIndex: 0, //点击的班级序号
    tipKejieIndex: 0, //点击的课节序号
    nSemester: 1,  //学年
    inpStr: '',//公共字符串
    arr:[],// 公共数组
  },
  onLoad: function(){
    this.setData({
      teacherName: wx.getStorageSync('teacherName'),
      teacherToken: wx.getStorageSync('teacherToken'),
    })
    // 校验是否在其他设备 上登陆
    check.check(this,md51)
    var that = this;
    // 手机宽高
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
          resultH: res.windowHeight - 108
        })
      }
    });
    wx.setStorageSync('tipKejieIndex',1);
    this.getClassList();
  },
  onShareAppMessage: function(){
     return {
      title: '转发给好友',
      path: '/pages/scorePic/scorePic'
    }
  },
  // 改变学年相关值
  getYear: function (e) {
    publicJs.getYear(e,this)
  },
  // 改变学期相关值
  getSemester: function (e) {
    publicJs.getSemester(e,this)
  },
  // 改变班级相关值
  getClass: function (e) {
    publicJs.getClass(e,this)
  },
  // 退出登录
  unlogin: function(){
    publicJs.unlogin()
  },
   // 关闭弹窗
  closeFloat: function(e){
    publicJs.closeFloat(e,this)
  },
  // 菜单按钮
  powerDrawer: function (e) {
    publicJs.powerDrawer(e,this)
  },
  // 关闭导航
  closeNav: function(e){
    publicJs.closeNav(e,this)
  },
  // 点击改变tabBar颜色
  changeColor: function(e){
    publicJs.changeColor(e,this)
  },
  // 改变班级相关值
  goTaskProgress: function(e){
    this.setData({
      tipClassIndex:e.currentTarget.dataset.num
    })
    wx.setStorageSync('tipClassIndex',this.data.tipClassIndex)
    wx.navigateTo({url:'/pages/taskProgress/taskProgress'})
  },

  // 获取点击的弹窗的id和value值
  getIndex:function(e){
    var inpStr = this.data.inpStr;
    if(inpStr == 'year'){ //年份
      this.setData({
        schoolYear:e.target.dataset.id, 
        show: false,
        classInn: this.data.classes[0].value
      })
      // 缓存选择的年份
      wx.setStorageSync('year',e.target.dataset.id);
      this.getClassList();
    }else if(inpStr == 'semester'){ //学期
      this.setData({
        semester:this.data.arr[e.target.dataset.id-1].value, 
        nSemester:e.target.dataset.id, 
        show: false,
        classInn: this.data.classes[0].value
      })
      // 缓存选择的学期的编号
      wx.setStorageSync('semesterIndex',e.target.dataset.id);
      this.getClassList();
    }
  },
  
  // 班级列表
  getClassList: function(){
    var that = this;
    // 时间戳
    var stamp = new Date().getTime();
    var year = this.data.schoolYear;
    var nSemester = this.data.nSemester;
    var token = this.data.teacherToken;
    
    var query1 = 'appid=web&nClassYear='+ year +'&nSemester='+nSemester+'&PageIndex=1&PageSize=50&timestamp='+stamp+'&token='+token;
    var query2 = 'appid=web&nclassyear='+ year +'&nsemester='+nSemester+'&pageindex=1&pagesize=50&timestamp='+stamp+'&token='+token+'test';
    var sign = md51.md5(query2); 
    var query = query1 + '&sign=' + sign;

    wx.showLoading({
      title:'努力加载中...',
      success: function(){
        requestGet.requestGet('api/Class?'+ query,function(res){
          if(res.data.ResultType == 0){
            var resData = res.data.AppendData;
            if(resData.length == 0){
              that.setData({classes:['您此学期没有课程']});
            }else{
              classList.classList(that.data.classes,resData,that);
              // that.setData({classInn: that.data.classes[0].value})
            }
          }
          setTimeout(function(){
            wx.hideLoading()
          },500)
        })
      }
    })
  },

})
