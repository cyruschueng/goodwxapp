
var classList = require('../../utils/classList.js');
var md51 = require('../../utils/md51.js');
var requestGet = require('../../utils/requestGet.js');
var publicJs = require('../../utils/public.js');
var getStyle = require('../../utils/getStyle.js');
var check = require('../../utils/check.js');


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
    currentItem: 0,
    showTip: false,
    theadH: 108,//表头的高度
    classStr:'',
    currentItem: 0,
    sNameW:160,
    infos:[],
    // changeW: 130,
    lessonNumber:0, //总课节数,
    lessonNumArr: [],  //课节数组
    // studentNumber:60,
    studentCode: '',
    classCode:'',
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
    console.log(1111)
    this.setData({
      localShow: wx.getStorageSync('localShow')
    })


    if(this.data.localShow.length == 0){
      this.setData({localShow: true})
    }

    var that = this;
    that.setData({
      teacherName: wx.getStorageSync('teacherName'),
      teacherToken: wx.getStorageSync('teacherToken'),
      schoolYear: wx.getStorageSync('schoolYear'),
      semesterIndex: wx.getStorageSync('semesterIndex'),
      classInfo: wx.getStorageSync('classInfo'),
      studentInfo: wx.getStorageSync('studentInfo'),
      studentCode: wx.getStorageSync('studentCode'),
      classCode: wx.getStorageSync('classCode'),
    })
    // 校验是否在其他设备 上登陆
    check.check(this,md51)
    console.log(wx.getStorageSync('localShow'))
// console.log(typeof this.data.localShow)
    


    // console.log(this.data.studentInfo)
    this.getStudentInfo();

    // console.log(this.data.classInfo)
    // console.log(this.data.studentInfo)

    // that.setData({lessonNumber:that.data.classInfo[that.data.clickClassIndex].lessonNumber})
    // var allHeight = 90 + 32+50  +90 +20
    // 手机宽高
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
        })
      }
    });
    
    // 设置班级
    var choiceStudent = this.data.studentInfo;
    var grade = choiceStudent.grade;
    var classS = choiceStudent.grade.substr(0,grade.indexOf(' ')) +' '+ choiceStudent.sClassName;
    this.setData({
      StudentName: choiceStudent.sStudentName+'同学',
      StudentPhone: choiceStudent.sPhone,
      StudentClass: classS
    })
    // //组装班级id和名称
    // var classInfo = that.data.classInfo
    // for(var i = 0 ; i < classInfo.length; i++){
    //   that.data.classes.push({id:i,value:classInfo[i].grade})
    // }
    // that.setData({
    //   classes: that.data.classes,
    //   classInn:that.data.classes[that.data.clickClassIndex].value
    // })
    // that.getClassList();
    // that.getStudentsData();

    //课节数组
    // for(var i = 2; i <= that.data.lessonNumber;i++){
    //   that.data.lessonNumArr.push(i)
    // }
    // that.setData({lessonNumArr: this.data.lessonNumArr})
  },
 
  // 菜单按钮
  powerDrawer: function (e) {
    publicJs.powerDrawer(e,this)
  },
  // 关闭导航
  closeNav: function(e){
    publicJs.closeNav(e,this)
  },
  // 关闭弹窗
  closeFloat: function(e){
    publicJs.closeFloat(e,this)
  },
   // 退出登录
  unlogin: function(){
    publicJs.unlogin()
  },
  // 获取单个学生信息
  getStudentInfo:function(){
    var that = this;
    var stamp = new Date().getTime();
    var token = this.data.teacherToken;
    var studentCode = this.data.studentCode;
    var classCode = this.data.classCode;

    var query1 = 'appid=web&sClassCode='+classCode+'&sStudentCode='+studentCode+'&timestamp='+stamp+'&token='+token;
    var query2 = 'appid=web&sclasscode='+classCode+'&sstudentcode='+studentCode+'&timestamp='+stamp+'&token='+token+'test';
    var sign = md51.md5(query2);
   
    var query = query1 + '&sign=' + sign

    wx.showLoading({
      title:'加载中......',
      success: function(){
        requestGet.requestGet('api/ClassStudentJinMenKao?'+ query,function(res){
          if(res.data.ResultType == 0){
            var resData = res.data.AppendData;
            // that.setData({studentNumber:resData.length})
            var newInfos = [];
            // console.log(resData)
            for(var i = 0 ; i < resData.length; i++){
              var scoreJson = []
              var scoreArr = []
              var info = resData[i];
              for(var k in info){
                if(k.indexOf('No') == 0){
                  scoreJson.push(info[k])
                }
              }
              // console.log(scoreJson)
              scoreArr = scoreJson.slice(0,scoreJson.length)
              // console.log(scoreArr)
              for(var j = 0 ; j < scoreArr.length; j++){
                if(scoreArr[j] == null){
                  scoreArr[j] = '--';
                }
              }
              newInfos.push({
                id: i,
                sId: info.sStudentCode,
                sName: info.sStudentName,
                sSchool: info.sSchoolName == null|| info.sSchoolName== ""? '--':(info.sDistrict=="" ? info.sSchoolName : '['+info.sDistrict +']'+info.sSchoolName),
                isOthersubject: info.sQiTaXueKe == null? '否':'是',
                sOthersubject: info.sQiTaXueKe,
                sExperimentalType: info.sExperimentalType == null? "--":info.sExperimentalType,
                sScore: scoreArr
              })
            }
            that.setData({infos: newInfos})
            for(var i = 2; i <= scoreArr.length;i++){
              that.data.lessonNumArr.push(i)
            }
            that.setData({lessonNumArr: that.data.lessonNumArr})
          }
          setTimeout(function(){
            wx.hideLoading()
          },500)
        })
      }
    })
  },
  // 滑动
  touchstart: function(e){
    var nameW = 160;
    var allContentW = 60*(this.data.lessonNumArr.length+1)+180;
    var allContentH = 160;
    var allHeight = (45 + 42 + 45 );
    getStyle.touchstart(this,e,allContentW,allContentH,allHeight,nameW)
  },
  touchmove: function(e){
    var nameW = 160;
    getStyle.touchmove(this,e,nameW)
  },
  touchend: function(e){
    getStyle.touchend(this)
  },
  showTip: function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    // console.log(id)
    that.setData({currentItem: id})
    setTimeout(function(){
      that.setData({currentItem: id+100})
    },3000)
  },
  // 点击隐藏向左滑动的提示
  hideZoom:function(){
    this.setData({localShow: false})
    wx.setStorageSync('localShow',this.data.localShow)
    console.log(wx.getStorageSync('localShow'))
  }
})
