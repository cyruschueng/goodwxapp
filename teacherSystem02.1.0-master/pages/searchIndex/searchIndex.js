//index.js
// var changeTabBar = require('../../utils/changeTabBar.js');
// var animation = require('../../utils/animation.js');
var classList = require('../../utils/classList.js');
var md51 = require('../../utils/md51.js');
var requestGet = require('../../utils/requestGet.js');
var publicJs = require('../../utils/public.js');
var sortClassAsWeek = require('../../utils/sortClassAsWeek.js');
var sortClassAsQi = require('../../utils/sortClassAsQi.js');
var check = require('../../utils/check.js');
//获取应用实例
const app = getApp();

Page({
  data: {
    schoolSrc:'../images/school.gif',
    scoreSrc:'../images/score.gif',
    tabBarArr:[
      {id:0,txt:'录入',iconSrc:'../images/write.gif',changeTextColor:'#525252',isChange: false},
      {id:1,txt:'查询',iconSrc:'../images/search1.gif',changeTextColor:'#1FBB1C',isChange: true},
      {id:2,txt:'工具',iconSrc:'../images/setting.gif',changeTextColor:'#525252',isChange: false},
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
    chioseArr:[
      {classe:'active',value:'按班级'},
      {classe:'',value:'按人名'}
    ],
    tipStr:'搜索结果为空，请检查您学生姓名或手机号',
    showTip: false,
    windowHeight:400,
    windowWidth: 375,
    resultH: 400,//显示结果的外框高度
    classInfo: [],
    teacherName:'张云',
    schoolYear: 2017,
    semester:'秋季',
    showModalStatus: false,
    isopen:'open',
    teacherName: '', //教师名称
    teacherToken:'', //教师token
    classInfo:[], //课程信息
    classes: [], //班级
    studentsArr: [], //学生列表
    nSemester: 1, //学年
    tipClassIndex: 0,//点击的班级或学生序号
    show:false, //控制弹窗显示
    searchIfshow: true, //控制班级或人名显示
    searchIfshow1: false, //控制班级或人名显示
    searchH: 90,//搜索部分的高度
    sName:'',//搜索学生姓名
    sPhone:'',//搜索学生电话
    choiseId:1,//查询选择的类型
  },
  onLoad: function(){
    this.setData({
      teacherName: wx.getStorageSync('teacherName'),
      teacherToken: wx.getStorageSync('teacherToken')
    })
// 校验是否在其他设备 上登陆
    check.check(this,md51)
    // wx.setStorageSync('tipClassIndex',this.data.tipClassIndex);
    // 获取手机宽高
    var that = this;
    // 手机宽高
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
          pixelRatio: res.pixelRatio,
          searchH: that.data.searchH/res.pixelRatio,
          resultH: res.windowHeight - 87-56})
      }
    });

    this.getClassList();
  },
  onShareAppMessage: function(){
     return {
      title: '转发给好友',
      path: '/pages/searchIndex/searchIndex'
    }
  },
  addClass: function(e){
    var id = Number(e.target.dataset.id);
    var chioseArr=[
        {classe:'active',value:'按班级'},
        {classe:'',value:'按人名'}
      ]
    if(id == 1){
      chioseArr=[
        {classe:'active',value:'按班级'},
        {classe:'',value:'按人名'}
      ]
      this.setData({searchIfshow:true,choiseId:1})
      // 获取班级列表
      this.getClassList()
    }else if( id == 2){
      chioseArr=[
        {classe:'',value:'按班级'},
        {classe:'active',value:'按人名'}
      ]
      this.setData({searchIfshow:false,choiseId:2})
      // 获取学生的信息
      this.searchStudents();
    }
    this.setData({chioseArr: chioseArr})
  },
  getName: function(e){
    console.log(e.detail)
    if(e.detail.value == ''){
      console.log(111111111)
      this.setData({showTip: false})
    }
    this.setData({sName: e.detail.value})
  },
  getPhone: function(e){
    if(e.detail.value == ''){
      this.setData({showTip: false})
    }
    this.setData({sPhone: e.detail.value})
  },
  // 改变学年相关值
  getYear: function (e) {
    publicJs.getYear(e,this)
    this.setData({
      sName:'',
      sPhone:'',
    })
  },
  // 改变学期相关值
  getSemester: function (e) {
    publicJs.getSemester(e,this);
    this.setData({
      sName:'',
      sPhone:'',
    })
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
  getIndex:function(e){
    // publicJs.getIndex(e,this,0,this.getClassList)
    var inpStr = this.data.inpStr;
    if(inpStr == 'year'){ //年份
      this.setData({
        schoolYear:e.target.dataset.id, 
        show: false,
        classInn: this.data.classes[0].value
      })
      
      // 缓存选择的年份
      wx.setStorageSync('schoolYear',e.target.dataset.id);
    }else if(inpStr == 'semester'){ //学期
      this.setData({
        semester:this.data.arr[e.target.dataset.id-1].value, 
        nSemester:e.target.dataset.id, 
        show: false,
        classInn: this.data.classes[0].value
      })
      // 缓存选择的学期的编号
      wx.setStorageSync('semesterIndex',e.target.dataset.id);
    }
    // 判断获取哪种数据
    if(this.data.choiseId ==1 ){
      this.getClassList();
    }else if(this.data.choiseId ==2){
      this.searchStudents();
    }
  },
  // 获取一个班级的学生
  goStudentsInfo: function(e){
    // console.log(e)
    var id = e.target.dataset.index;
    wx.setStorageSync('clickClassIndex',e.target.dataset.index);
    wx.navigateTo({url:'/pages/searchAsClass/searchAsClass'})
  },
  // 获取一个学生的信息
  goStudentInfo: function(e){
    // console.log(e)
    var id = e.currentTarget.dataset.index;
    // this.setData({studentCode:this.data.studentsArr[id].sStudentCode})
    // wx.setStorageSync('clickStudentIndex',e.target.dataset.index);
    // console.log(id)
    wx.setStorageSync('studentCode',this.data.studentsArr[id].sStudentCode);
    wx.setStorageSync('classCode',this.data.studentsArr[id].sClassCode);
    wx.setStorageSync('studentInfo',this.data.studentsArr[id]);
    wx.navigateTo({url:'/pages/searchAsName/searchAsName'});
  },
  //查询单个学生
  searchStudent: function(){
    var that = this;
    // 时间戳
    var stamp = new Date().getTime();
    // 学年
    var year = this.data.schoolYear;
    // 学期
    var nSemester = this.data.nSemester;
    // 教师token
    var token = this.data.teacherToken;
    // 学生姓名
    var sName = this.data.sName;
    // 学生电话
    var sPhone = this.data.sPhone;
    // nClassYear  nSemester  token  timestamp appid sign   sStudentName sPhone

    if(sName){
      var query1 = 'appid=web&nClassYear='+ year +'&nSemester='+nSemester+'&PageIndex=1&PageSize=50&sStudentName='+ sName +'&timestamp='+stamp+'&token='+token;
      var query2 = 'appid=web&nclassyear='+ year +'&nsemester='+nSemester+'&pageindex=1&pagesize=50&sstudentname='+ sName +'&timestamp='+stamp+'&token='+token+'test';
    }else if(sPhone){
      var query1 = 'appid=web&nClassYear='+ year +'&nSemester='+nSemester+'&PageIndex=1&PageSize=50&sPhone='+ sPhone +'&timestamp='+stamp+'&token='+token;
      var query2 = 'appid=web&nclassyear='+ year +'&nsemester='+nSemester+'&pageindex=1&pagesize=50&sphone='+ sPhone +'&timestamp='+stamp+'&token='+token+'test';
    }else if(sName && sPhone){
      var query1 = 'appid=web&nClassYear='+ year +'&nSemester='+nSemester+'&PageIndex=1&PageSize=50&sPhone='+ sPhone +'&sStudentName='+ sName +'&timestamp='+stamp+'&token='+token;
      var query2 = 'appid=web&nclassyear='+ year +'&nsemester='+nSemester+'&pageindex=1&pagesize=50&sphone='+ sPhone +'&sstudentname='+ sName +'&timestamp='+stamp+'&token='+token+'test';
    }else{
      wx.showModal({
          title: '提示',
          content: '请输入学生姓名或手机号',
          showCancel: false
      })
    }
    var sign = md51.md5(query2); 
    var query = query1 + '&sign=' + sign;

    wx.showLoading({
      title:'努力加载中...',
      success: function(){
        requestGet.requestGet('api/TeacherStudent?'+ query,function(res){
          if(res.data.ResultType == 0){
            var resData = res.data.AppendData;
            // console.log(resData)
            if(resData.length == 0){
              that.setData({
                showTip: true,
                studentsArr:[]
              });
            }else{
              that.data.studentsArr = [];
              var studentsListArr = [];
              // console.log(resData);
              for(var i = 0 ; i < resData.length; i++){
                var cur = resData[i];
                var dotIndex = cur.sPrintTime.lastIndexOf(',');
                var lineIndex = cur.sPrintTime.lastIndexOf('-');

                if(dotIndex == -1){
                  var times = cur.sPrintTime.slice(0,lineIndex); //上课时间
                }else{
                  var times = cur.sPrintTime.slice(dotIndex+1,lineIndex);
                }
                var kemu = cur.sDeptName.substr(2,3);  //学科
                var grade = times +' '+ cur.sGrade + kemu;
                studentsListArr.push({
                  SectBegin: cur.SectBegin,  //开课日期
                  grade: grade,  //所在班级+日期
                  sStudentName:cur. sStudentName, //学生姓名
                  sStudentCode: cur.sStudentCode, //学生编号
                  sClassCode: cur.sClassCode, //班级编号
                  sClassName: cur.sClassName, // 班级全称
                  sPhone: cur.sParents1Phone //手机号
                })
              }
              that.setData({showTip: false,studentsArr:studentsListArr})
              
            }
          }
          setTimeout(function(){
            wx.hideLoading()
          },500)
        })
      }
    })
  },
  //获取本季度的学生
  searchStudents: function(){
    var that = this;
    // 时间戳
    var stamp = new Date().getTime();
    // 学年
    var year = this.data.schoolYear;
    // 学期
    var nSemester = this.data.nSemester;
    // 教师token
    var token = this.data.teacherToken;
    this.setData({
      sName:'',
      sPhone:'',
      showTip:false
    })
    // nClassYear  nSemester  token  timestamp appid sign   sStudentName sPhone

    var query1 = 'appid=web&nClassYear='+ year +'&nSemester='+nSemester+'&PageIndex=1&PageSize=1000&timestamp='+stamp+'&token='+token;
    var query2 = 'appid=web&nClassYear='+ year +'&nSemester='+nSemester+'&PageIndex=1&PageSize=1000&timestamp='+stamp+'&token='+token+'test';
    var sign = md51.md5(query2.toLowerCase()); 
    var query = query1 + '&sign=' + sign;

    wx.showLoading({
      title:'努力加载中...',
      success: function(){
        requestGet.requestGet('api/TeacherStudent?'+ query,function(res){
          // console.log(res)
          if(res.data.ResultType == 0){
            var resData = res.data.AppendData;
            // console.log(resData)
            if(resData.length == 0){
              that.setData({studentsArr:['您此季度没有课程']});
            }else{
              that.data.studentsArr = [];
              var studentsListArr = [];
              // console.log(resData);
              for(var i = 0 ; i < resData.length; i++){
                var cur = resData[i];
                var dotIndex = cur.sPrintTime.lastIndexOf(',');
                var lineIndex = cur.sPrintTime.lastIndexOf('-');

                if(dotIndex == -1){
                  var times = cur.sPrintTime.slice(0,lineIndex); //上课时间
                }else{
                  var times = cur.sPrintTime.slice(dotIndex+1,lineIndex);
                }
                var kemu = cur.sDeptName.substr(2,3);  //学科
                if(resData[i].sTimeQuanTumCode && resData[i].sTimeQuanTumCode.indexOf('P') == 0){

                    if(resData[i].sTimeQuanTumCode.charAt(1) == '0'){
                      times = '零期' + times;
                      var grade = times +' '+ cur.sGrade + kemu;
                    }else if(resData[i].sTimeQuanTumCode.charAt(1) == '1'){
                      times = '一期' + times;
                      var grade =  times +' '+ cur.sGrade + kemu;
                    }else if(resData[i].sTimeQuanTumCode.charAt(1) == '2'){
                      times = '二期' + times;
                      var grade =  times +' '+ cur.sGrade + kemu;
                    }else if(resData[i].sTimeQuanTumCode.charAt(1) == '3'){
                      times = '三期' + times;
                      var grade =  times +' '+ cur.sGrade + kemu;
                    }else if(resData[i].sTimeQuanTumCode.charAt(1) == '4'){
                      times = '四期' + times;
                      var grade =  times +' '+ cur.sGrade + kemu;
                    }
                  }else{
                    var grade = times +' '+ cur.sGrade + kemu;
                  }
                studentsListArr.push({
                  SectBegin: cur.SectBegin,  //开课日期
                  grade: grade,  //所在班级+日期
                  sStudentName:cur. sStudentName, //学生姓名
                  sStudentCode: cur.sStudentCode, //学生编号
                  sClassCode: cur.sClassCode, //班级编号
                  sClassName: cur.sClassName, // 班级全称
                  sPhone: cur.sParents1Phone //手机号
                })
              }

              // SectBegin:"2017-09-08T18:00:00"
              // bLongTerm:true
              // bValid:true
              // dtBeginDate:"2017-09-08"
              // nGrade:8
              // sClassCode:"BJ17Q2627"
              // sClassName:"初二语文目标满分班"
              // sClassTypeCode:"CTBJ004005023"
              // sClassTypeName:"初二语文目标满分班"
              // sDeptCode:"DPBJ026"
              // sDeptName:"初中语文"
              // sGrade:"初二"
              // sParents1Phone:"13439545787"
              // sParents2Phone:"13381379249"
              // sPrintTeachers:"赵静"
              // sPrintTime:"周五夜晚18:00-20:00"
              // sStudentCode:"BJ73478"
              // sStudentName:"安泽宇"
              // sTimeQuanTumCode:"Fri3"

              that.setData({studentsArr:studentsListArr})
              wx.setStorageSync('studentsInfo',studentsListArr)
            }
          }
          setTimeout(function(){
            wx.hideLoading()
          },500)
        })
      }
    })
  },
  // 班级列表
  getClassList: function(){
    var that = this;
    // 时间戳
    var stamp = new Date().getTime();
    // 学年
    var year = this.data.schoolYear;
    // 学期
    var nSemester = this.data.nSemester;
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
              that.setData({classInn: that.data.classes[0].value})
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
