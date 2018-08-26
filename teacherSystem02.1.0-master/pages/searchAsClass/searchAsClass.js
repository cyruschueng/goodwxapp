//index.js
var classList = require('../../utils/classList.js');
var md51 = require('../../utils/md51.js');
var requestGet = require('../../utils/requestGet.js');
var publicJs = require('../../utils/public.js');
var getStyle = require('../../utils/getStyle.js');
var check = require('../../utils/check.js');
//获取应用实例
const app = getApp();

Page({
  data: {
    tabBarArr:[
      {id:0,txt:'录入',iconSrc:'../images/write1.gif',changeTextColor:'#1FBB1C',isChange: true},
      {id:1,txt:'查询',iconSrc:'../images/search.gif',changeTextColor:'#525252',isChange: false},
      {id:2,txt:'工具',iconSrc:'../images/setting.gif',changeTextColor:'#525252',isChange: false},
    ],
    teacherName:'张云',
    schoolYear: 2017,
    semester:'秋季',
    showModalStatus: false,
    isopen:'open',
    classInfo: [], //班级信息数组
    classes:[],
    clickClassIndex:0,
    show: false,//控制弹窗显示
    classInn:'',//显示的班级字符串
    inpStr:'',   //公共显示的字符串
    infos:[],
    changeW: 130,
    lessonNumber:0, //总课节数,
    lessonNumArr: [],  //课节数组
    studentNumber:60,
    // showTip: false,
    theadH: 108,//表头的高度
    classStr:'',
    currentItem: 0,
    sNameW:140,
    flagBubble: true,

    // 滑动所需值
    windowWidth: 0,  //手机宽度
    windowHeight: 0,//手机高度
    pixelRatio:2,//手机像素比
    startX: 0, //触摸开始的X坐标
    startY: 0, //触摸开始的Y坐标
    saveOldLeft: 0, //触摸结束的X坐标
    saveOldTop: 0, //触摸结束的Y坐标
    contentH: 3000, //表格内容的总高度
    contentW: 3000, //表格内容的总宽度
    heigh: 3000, //内容区的高度
    scrollL: 0, //滑动的X值
    scrollT: 0,  //滑动的Y值

    localShow:false,
  },
  onLoad: function(){
    var that = this;
    that.setData({
      teacherName: wx.getStorageSync('teacherName'),
      teacherToken: wx.getStorageSync('teacherToken'),
      clickClassIndex: wx.getStorageSync('clickClassIndex'),
      schoolYear: wx.getStorageSync('schoolYear'),
      semesterIndex: wx.getStorageSync('semesterIndex'),
      classInfo: wx.getStorageSync('classInfo'),
      localShow: wx.getStorageSync('localShow')
    })
    console.log(this.data.localShow)
    if(this.data.localShow.length == 0){
      this.setData({localShow: true})
    }
    // 校验是否在其他设备 上登陆
    check.check(this,md51)
    // console.log(that.data.classInfo)
    that.setData({lessonNumber:that.data.classInfo[that.data.clickClassIndex].lessonNumber})
    var allHeight = 45 + 42 + 45
    // 手机宽高
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
          pixelRatio: res.pixelRatio,
          heigh: res.windowHeight - allHeight,
          theadH: that.data.theadH,
        })
      }
    });
    // console.log(this.data.windowHeight)
    // console.log(this.data.sNameW)
    // 设置班级
    var choiceClass = this.data.classInfo[this.data.clickClassIndex]
    this.setData({classStr:choiceClass.classCode + choiceClass.sClassTypeName})

    //组装班级id和名称
    var classInfo = that.data.classInfo
    for(var i = 0 ; i < classInfo.length; i++){
      that.data.classes.push({id:i,value:classInfo[i].grade})
    }
    that.setData({
      classes: that.data.classes,
      classInn:that.data.classes[that.data.clickClassIndex].value
    })
    that.getClassList();
    that.getStudentsData();

    //课节数组
    for(var i = 2; i <= that.data.lessonNumber;i++){
      that.data.lessonNumArr.push(i)
    }
    that.setData({lessonNumArr: this.data.lessonNumArr})
  },
 
  // 改变班级相关值
  getClass: function (e) {
    publicJs.getClass(e,this)
  },
  // 获取点击的弹窗的id和value值
  getIndex:function(e){
    // publicJs.getIndex(e,this,1,undefined,undefined,this.getStudentInfo)
    var inpStr = this.data.inpStr;
    if(inpStr == 'class'){  //班级
      // console.log(this.data.arr)
      this.setData({
        classInn:this.data.arr[e.target.dataset.id].value, 
        clickClassIndex:e.target.dataset.id, 
        show: false
      })
      this.getStudentsData();
      // 缓存选择的班级信息的编号
      wx.setStorageSync('clickClassIndex',this.data.clickClassIndex);
    }
  },
  // 菜单按钮
  powerDrawer: function (e) {
    publicJs.powerDrawer(e,this)
  },
  // 点击改变tabBar颜色
  changeColor: function(e){
    publicJs.changeColor(e,this)
  },
  // 关闭导航
  closeNav: function(e){
    publicJs.closeNav(e,this)
  },
  // 关闭弹窗
  closeFloat: function(e){
    publicJs.closeFloat(e,this)
  },
  // 获取班级列表
  getClassList: function(){
    var that = this;
    // 时间戳
    var stamp = new Date().getTime();
    // 学年
    var year = this.data.schoolYear;
    // 学期
    var nSemester = this.data.semesterIndex;
    // 教师token
    var token = this.data.teacherToken;
    
    var query1 = 'appid=web&nClassYear='+ year +'&nSemester='+nSemester+'&PageIndex=1&PageSize=50&timestamp='+stamp+'&token='+token;
    var query2 = 'appid=web&nClassYear='+ year +'&nSemester='+nSemester+'&PageIndex=1&PageSize=50&timestamp='+stamp+'&token='+token+'test';
    var sign = md51.md5(query2.toLowerCase()); 
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
  // 获取学生信息
  getStudentsData: function(){
    var that = this;
    var stamp = new Date().getTime();
    var token = this.data.teacherToken
    var classCode = this.data.classInfo[this.data.clickClassIndex].classCode;

    var query1 = 'appid=web&sClassCode='+classCode+'&timestamp='+stamp+'&token='+token;
    var query2 = 'appid=web&sclasscode='+classCode+'&timestamp='+stamp+'&token='+token+'test';
    var sign = md51.md5(query2);
   
    var query = query1 + '&sign=' + sign

    wx.showLoading({
      title:'加载中......',
      success: function(){
        requestGet.requestGet('api/ClassStudentJinMenKao?'+ query,function(res){
          // console.log(res)
          if(res.data.ResultType == 0){
            var resData = res.data.AppendData;
            that.setData({studentNumber:resData.length})
            var newInfos = [];
            
            for(var i = 0 ; i < resData.length; i++){
              var scoreJson = []
              var scoreArr = []
              var info = resData[i];
              for(var k in info){
                if(k.indexOf('No') == 0){
                  scoreJson.push(info[k])
                }
              }
              scoreArr = scoreJson.slice(0,that.data.lessonNumber-1)
              for(var j = 0 ; j < scoreArr.length; j++){
                if(scoreArr[j] == null){
                  scoreArr[j] = '--';
                }
              }
              newInfos.push({
                id: i,
                sId: info.sStudentCode,
                sName: info.sStudentName,
                sSchool: info.sSchoolName == null|| info.sSchoolName== ""? '--': (info.sDistrict=="" ? info.sSchoolName : '['+info.sDistrict +']'+info.sSchoolName),
                isOthersubject: info.sQiTaXueKe == null? '否':'是',
                sOthersubject: info.sQiTaXueKe,
                sExperimentalType: info.sExperimentalType == null? "--":info.sExperimentalType,
                sScore: scoreArr
              })
            }
            that.setData({infos: newInfos})
          }
          setTimeout(function(){
            wx.hideLoading()
          },500)
        })
      }
    })
  },
   // 退出登录
  unlogin: function(){
    publicJs.unlogin()
  },
  // 滑动
  touchstart: function(e){
    var nameW = 140;
    // obj,e,allContentW,allContentH,allHeight

    var allContentW = 60*this.data.lessonNumber+180;
    // var allContentH = 100/this.data.pixelRatio;
    var allContentH = 45*this.data.studentNumber;
    var allHeight = (45 + 42 + 45 )
    getStyle.touchstart(this,e,allContentW,allContentH,allHeight,nameW)
  },
  touchmove: function(e){
    var nameW = 140;
    getStyle.touchmove(this,e,nameW)
  },
  touchend: function(e){
    getStyle.touchend(this)
  },
  // 显示气泡
  showTip: function(e){
    // console.log(e)
    var that = this;
    var flagBubble = this.data.flagBubble;
    var id = e.currentTarget.dataset.id;
    if(flagBubble){
      that.setData({ flagBubble:false})
      that.setData({currentItem: id})
      setTimeout(function(){
        that.setData({
          currentItem: id+1000,
          flagBubble:true
        })
      },2000)
    }
  },
  hideBubble:function(e){
    // 前几其它地方隐藏气泡
    if(e.target.dataset.bubble != 'bubble'){
        this.setData({
          currentItem: 1000,
          flagBubble:true
        })
      }
  },
    // 点击隐藏向左滑动的提示
  hideZoom:function(){
    this.setData({localShow: false})
    wx.setStorageSync('localShow',this.data.localShow)
    
  }
  
})
