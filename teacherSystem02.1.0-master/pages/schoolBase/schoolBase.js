//index.js
var classList = require('../../utils/classList.js');
var md51 = require('../../utils/md51.js');
var requestGet = require('../../utils/requestGet.js');
var requestPost = require('../../utils/requestPost.js');
var publicJs = require('../../utils/public.js');
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
    typeArr:[
      {id: 1,value: '基本信息'},
      {id: 2,value: '期中期末'}
    ],
    kejieArr:[
      {id: 2, value: '第2讲'}
    ],
    ExperimentalArr:[
      {id:0,value:'是'},
      {id:1,value:'否'},
      {id:2,value:'已分班'},
      {id:3,value:'不清楚'},
      {id:4,value:''},
    ],
    studentslist:[],//所有的学生
    setSchoolList:[],//请求回来的所有学校
    AllSchool:[],
    classInfo: [], //班级信息数组
    classes:[],
    teacherName:'张云',
    schoolYear: 2017,
    semester:'秋季',
    showModalStatus: false,
    isopen:'open',
    tipClassIndex:0,
    show: false,//控制弹窗显示
    show1: false,//控制学校弹窗显示
    classInn:'',//显示的班级字符串
    typeInn:'',//显示的班级字符串
    inpStr:'',   //公共显示的字符串
    kind: 1, // 查询类型 基本/期中期末
    baseShow: false, //控制基本信息表单显示
    scoreShow: false, //控制期中期末表单显示
    classStr: '',//选择的班级信息

    // experimentalInn: ''  加在请求回来的数据里面
  },
  onLoad: function(){
    this.setData({
      teacherName: wx.getStorageSync('teacherName'),
      teacherToken: wx.getStorageSync('teacherToken'),
      tipClassIndex: wx.getStorageSync('tipClassIndex'),
      tipKejieIndex: wx.getStorageSync('tipKejieIndex'),
      semesterIndex: wx.getStorageSync('semesterIndex'),
      schoolYear: wx.getStorageSync('schoolYear'),
      classInfo: wx.getStorageSync('classInfo'),
      kind: wx.getStorageSync('kind'),
    })
    // 校验是否在其他设备 上登陆
    check.check(this,md51)
    // console.log(this.data.tipClassIndex)
   // 设置班级
    var choiceClass = this.data.classInfo[this.data.tipClassIndex]
    this.setData({classStr:choiceClass.classCode + choiceClass.sClassTypeName})

    //组装班级id和名称
    var classInfo = this.data.classInfo
    for(var i = 0 ; i < classInfo.length; i++){
      this.data.classes.push({id:i,value:classInfo[i].grade})
    }
    // console.log(this.data.classes)
    this.setData({classes: this.data.classes,})
    this.setData({classInn:this.data.classes[this.data.tipClassIndex].value})

    // for(var j = 2; j <= classInfo[this.data.tipClassIndex].lessonNumber;j++){
    //   this.data.kejieArr.push({id: j, value: '第'+ j +'讲'})
    // }
    // // 删除‘请选择’项
    // this.data.kejieArr.shift();
    // this.setData({kejieArr: this.data.kejieArr,kejieInn:this.data.kejieArr[this.data.tipKejieIndex-2].value})

    // 设置显示基本信息还是期中期末
    this.setData({typeInn: this.data.typeArr[this.data.kind-1].value})
    //判断是基本信息还是期中期末
    if(this.data.kind == 1){
      this.setData({
        baseShow: true,
        scoreShow: false
      })
      // 获取学生基本信息
      this.getAllStudent();
    }else{
      this.setData({
        baseShow: false,
        scoreShow: true
      })
      // 获取学生期中期末成绩
      
    }
    
    this.getClassList();
    
    // 获取手机宽高
    var that = this;
    // 手机宽高
    wx.getSystemInfo({
      success: function(res) {
        that.setData({windowHeight: res.windowHeight})
        that.setData({windowWidth: res.windowWidth})
        that.setData({resultH: res.windowHeight -45 - 42 - 14 -40-45-15-15 -56})
      }
    });
  },
  // 改变班级相关值
  getClass: function (e) {
    publicJs.getClass(e,this)
  },
  // 改变查询类型相关值
  getType: function (e) {
    publicJs.getType(e,this)
  },
  // 获取点击的弹窗的id和value值
  getIndex:function(e){
    // publicJs.getIndex(e,this,0,this.getClassList,undefined,undefined)
    var inpStr = this.data.inpStr;
    if(inpStr == 'class'){  //班级
      // console.log(this.data.arr)
      this.setData({
        classInn:this.data.arr[e.target.dataset.id].value, 
        tipClassIndex:e.target.dataset.id, 
        show: false
      })
      // 重新获取学生信息
      this.getAllStudent();
      // 缓存选择的班级信息的编号
      // wx.setStorageSync('tipClassIndex',this.data.tipClassIndex);
    }else if(inpStr == 'type'){  //基本信息/期中期末
      this.setData({
        typeInn: this.data.arr[e.target.dataset.id-1].value,
        kind:e.target.dataset.id, 
        show: false,
      })
      //判断是基本信息还是期中期末
      if(this.data.kind == 1){
        this.setData({
          baseShow: true,
          scoreShow: false
        })
        // 获取学生基本信息
        this.getAllStudent();
      }else{
        this.setData({
          baseShow: false,
          scoreShow: true
        })
        // 获取学生期中期末成绩
      }
      wx.setStorageSync('kind',e.target.dataset.id);
    }else if(inpStr == 'experimental'){  //实验班
      this.data.studentslist[this.data.numb].sExperimentalType = this.data.ExperimentalArr[e.target.dataset.id].value;
      this.setData({
        studentslist: this.data.studentslist,
        experimentalIndex:e.target.dataset.id, 
        show: false,
      })
    }
  },
  // 退出登录
  unlogin: function(){
    publicJs.unlogin()
  },
  // 关闭弹窗
  closeFloat: function(e){
    publicJs.closeFloat(e,this)
  },
  // 关闭弹窗
  closeFloat1: function(e){
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
  sExperimental: function(e){
     publicJs.sExperimental(e,this)
  },
  checkSchool: function(e){
    // console.log(e)
    this.setData({
      show1: true,
      schoolnum:e.target.dataset.schoolnum
    })
  },
  getIndex1:function(e){
    var studentslist = this.data.studentslist;
    studentslist[this.data.schoolnum].sSchoolName = '['+ e.target.dataset.district + ']'+ e.target.dataset.schoolname;
    this.setData({
      studentslist:this.data.studentslist,
      show1: false,
      setSchoolList:this.data.AllSchool,
      inpValue:''
    })

  },
  writeVlaue:function(e){
    this.setData({
      inpValue1: e.detail.value
    })
  },
  getIndex2:function(e){
    this.setData({
      show2: true,
      show1: false
    })
  },
  otherSchool: function(){
    var studentslist = this.data.studentslist;
    // console.log(this.data.schoolnum)
    studentslist[this.data.schoolnum].sSchoolName = this.data.inpValue1;
    this.setData({
      studentslist:this.data.studentslist,
      show2: false,
      inpValue1:''
    })
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
  getAllStudent: function(){
    // 设置studentslist的值
    var that = this;
    var token = this.data.teacherToken; // token值
    var stamp = new Date().getTime();  //时间戳
    var studentSize = this.data.classInfo[this.data.tipClassIndex].studentNumber;
    var ClassCode = this.data.classInfo[this.data.tipClassIndex].classCode;
    var query1 = 'appid=web&PageIndex=1&PageSize='+studentSize+'&sClassCode='+ClassCode+'&timestamp='+stamp+'&token='+token;
    var query2 = 'appid=web&pageindex=1&pagesize='+studentSize+'&sclasscode='+ClassCode+'&timestamp='+stamp+'&token='+token+'test';
    var sign = md51.md5(query2); 
    var query = query1 + '&sign=' + sign;
    wx.showLoading({
      title:'努力加载中',
      success: function(){
        requestGet.requestGet('api/Record?'+ query,function(res){
          console.log(res.data)
          var resData = res.data;
          // console.log(resData)
          if(resData.ResultType == 0){
            that.data.studentslist = [];
            var studentInfos = resData.AppendData;
            if(studentInfos[0].nXueBu == 1){
              that.setData({isShow:false})
              addArr();
            }else if(studentInfos[0].nXueBu == 2 || studentInfos[0].nXueBu == 3){
              that.setData({isShow:true})
              addArr();
            }
            that.setData({studentslist:that.data.studentslist,nXueBu: studentInfos[0].nXueBu})
            that.getAllSchool();
            // console.log(that.data.studentslist)
            // 组装数组
            function  addArr(){
              for(var i = 0 ; i < studentInfos.length; i++){
                var student = studentInfos[i]
                that.data.studentslist.push({
                  // index1:that.data.ExperimentalArr.indexOf(student.sExperimentalType==null? '':student.sExperimentalType),
                  sName: student.sStudentName, 
                  sStudentCode: student.sStudentCode, 
                  nXueBu: student.nXueBu, 
                  sExperimentalType: student.sExperimentalType==null? '':student.sExperimentalType,
                  sSchoolName: student.sSchoolName == null?'':(student.sDistrict=="" ? student.sSchoolName : '['+student.sDistrict +']'+student.sSchoolName),
                  schoolDistrict:student.sDistrict,
                  schoolId:student.nSchoolID
                })
              }
            }
          }
          setTimeout(function(){
            wx.hideLoading()
          },500)
        })
      }
    })
  },
  // 获取全部学校列表
  getAllSchool: function(){
    // 设置setSchoolList的值
    var that = this;
    var token = this.data.teacherToken; // token值
    var nxuebu = this.data.nXueBu;   //学部信息
    var stamp = new Date().getTime();  //时间戳
    var sName = this.data.sName;

    var query1 = 'appid=web&nXueBu='+nxuebu+'&timestamp='+ stamp +'&token='+token;
    var query2 = 'appid=web&nXueBu='+nxuebu+'&timestamp='+ stamp +'&token='+token+'test';
    var sign = md51.md5(query2.toLowerCase()); 
    var query = query1 + '&sign='+sign;
    requestGet.requestGet('api/School?'+ query,function(res){
      var resData = res.data;
      that.data.AllSchool=[];
      // console.log(resData)
      if(resData.ResultType == 0){
        var schoolInfos = resData.AppendData;
        for(var i = 0 ; i < schoolInfos.length; i++){
          var school = schoolInfos[i]
          that.data.setSchoolList.push({
            schoolDistrict:school.sDistrict,
            schoolName:school.sName,
            schoolId:school.ID
          })
        }
        that.setData({
          setSchoolList: that.data.setSchoolList,
          AllSchool: that.data.setSchoolList
        })

      }
    })

  },
  // 储存学生信息
  saveInfos: function(e){
    var that = this;
    var token = this.data.teacherToken; // token值
    var nxuebu = this.data.nXueBu;   //学部信息
    var stamp = new Date().getTime();  //时间戳
    var studentSize = this.data.classInfo[this.data.tipClassIndex].studentNumber;
    var ClassCode = this.data.classInfo[this.data.tipClassIndex].classCode;
    var datas = e.detail.value;
    var arr = [];
    var arr1 = [];
    for(var k in datas){
     var str = k + '=' + datas[ k ]
      arr.push(str);
    }
    
    for(var i = 0 ; i < arr.length; i+=6){
      arr1.push({
        "sStudentCode": arr[i].substr(arr[i].indexOf('=')+1),
        "sDistrict": arr[i+1].substr(arr[i+1].indexOf('=')+1),
        "sExperimentalType": arr[i+2].substr(arr[i+2].indexOf('=')+1) == "" ? null : arr[i+2].substr(arr[i+2].indexOf('=')+1),
        "nSchoolID": Number(arr[i+3].substr(arr[i+3].indexOf('=')+1)),
        "nXueBu": Number(arr[i+4].substr(arr[i+4].indexOf('=')+1)),
        "sSchoolName": arr[i+5].substr(arr[i+5].indexOf('=')+1),
      })
    }

    // 删除海淀区
    for(var i = 0 ; i < arr1.length; i++){
      var schoolStr = arr1[i].sSchoolName;
      console.log(schoolStr)
      if(arr1[i].sSchoolName.lastIndexOf(']') != -1){
        arr1[i].sSchoolName = arr1[i].sSchoolName.slice(arr1[i].sSchoolName.lastIndexOf(']')+1)
      }
    }
    console.log(arr1)
    var strDatas = JSON.stringify(arr1);
    var query1 = 'appid=web&timestamp='+stamp+'&token='+token;
    var query2 = query1+'&'+strDatas+'test';
    var sign = md51.md5(query2);
    var query = query1 + '&sign=' + sign;

    wx.showLoading({
      title:'保存中',
      success: function(){
        requestPost.requestPost('api/Record?'+ query,arr1,function(res){
          var resData = res.data;
          var resD = JSON.parse(res.data)
          // console.log(resD)
          if(resD.ResultType == 0){
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            });
            setTimeout(function(){
              // wx.redirectTo({ url: '/pages/SchoolCollection/SchoolCollection'})
              wx.navigateBack({ delta: 1 })
            },1000)
          }
          setTimeout(function(){
            wx.hideLoading()
          },500)

        })
      }
    })
  },
  // 筛选学校
  selectName: function(e){
    var allSchool = this.data.AllSchool;
    var len = allSchool.length;
    var values = e.detail.value;
    this.setData({
      inpValue: e.detail.value
    })
    this.data.selectSchoolList = [];
    if(this.data.inpValue.length != 0){
      for(var i = 0 ; i <len; i++){
        var school = allSchool[i];
        if(school.schoolName.indexOf(values) != -1){
          this.data.selectSchoolList.push(school)
        }
      }
      this.setData({setSchoolList:this.data.selectSchoolList})
    }else{
      this.setData({setSchoolList:this.data.AllSchool})
    }
  },

})
