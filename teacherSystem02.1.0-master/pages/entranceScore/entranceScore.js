
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
    kejieArr:[
      {id: 2, value: '第2讲'}
    ],
    classInfo:[],
    classes: [],
    teacherName:'张云',
    schoolYear: 2017,
    semester:'秋季',
    showModalStatus: false,
    isopen:'open',
    show:false, //控制弹窗的显示
    show1:false, //控制转发弹窗的显示

    tipKejieIndex: 0, //第几讲
    arr: [],//公共数组
    inpStr:'',//公共字符串
    classInn:'',
    kejieInn:'第2讲',
    studentsList: [],//学生信息集合
    resultH: 400, //表体的高度,
    classStr: '',//选择的班级信息

  },
  onLoad: function(){
    this.setData({
      teacherName: wx.getStorageSync('teacherName'),
      teacherToken: wx.getStorageSync('teacherToken'),
      tipClassIndex: wx.getStorageSync('tipClassIndex'),
      tipKejieIndex: wx.getStorageSync('tipKejieIndex'),
      semesterIndex: wx.getStorageSync('semesterIndex'),
      year: wx.getStorageSync('year'),
      classInfo: wx.getStorageSync('classInfo'),
    })
    // 校验是否在其他设备 上登陆
    check.check(this,md51)
    // 设置班级
    var choiceClass = this.data.classInfo[this.data.tipClassIndex]
    this.setData({classStr:choiceClass.classCode + choiceClass.sClassTypeName})

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

    var classInfo = this.data.classInfo
    for(var i = 0 ; i < classInfo.length; i++){
      this.data.classes.push({id:i,value:classInfo[i].grade})
    }
    // console.log(this.data.classes[this.data.tipClassIndex])
    this.setData({classes: this.data.classes,classInn:this.data.classes[this.data.tipClassIndex].value})

    for(var j = 2; j <= classInfo[this.data.tipClassIndex].lessonNumber;j++){
      this.data.kejieArr.push({id: j, value: '第'+ j +'讲'})
    }
    // 删除‘请选择’项
    this.data.kejieArr.shift();
    this.setData({kejieArr: this.data.kejieArr,kejieInn:this.data.kejieArr[this.data.tipKejieIndex-2].value})

    this.getScore();

  },
  // 改变班级相关值
  getClass: function (e) {
    publicJs.getClass(e,this)
  },
  // 改变课节相关值
  getKejie: function(e){
    publicJs.getKejie(e,this)
  },
  // 获取点击的弹窗的id和value值
  getIndex:function(e){
    // publicJs.getIndex(e,this,1,undefined,undefined,this.getStudentInfo)
    var inpStr = this.data.inpStr;
    if(inpStr == 'class'){  //班级
      this.setData({
        classInn:this.data.arr[e.target.dataset.id].value, 
        tipClassIndex:e.target.dataset.id, 
        show: false
      })
      this.getScore();


      // 重新渲染课节
      this.data.kejieArr = [];
      var lesson = this.data.classInfo[this.data.tipClassIndex].lessonNumber;
      for(var i = 2 ; i <= lesson; i++){
        this.data.kejieArr.push({id: i, value: '第'+i+'讲'});
      }
      this.setData({kejieArr: this.data.kejieArr,kejieInn:this.data.kejieArr[0].value});

      // 缓存选择的班级信息的编号
      // wx.setStorageSync('tipClassIndex',this.data.tipClassIndex);
    }else if(inpStr == 'kejie'){  //课节
      this.setData({
        kejieInn:this.data.arr[e.target.dataset.id-2].value, 
        tipKejieIndex:e.target.dataset.id, 
        show: false
      })
      this.getScore();
      // 缓存选择的课节
      // wx.setStorageSync('tipKejieIndex',this.data.tipKejieIndex);
    }
  },
  // 退出登录
  unlogin: function(){
    publicJs.unlogin()
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
  // 点击改变tabBar颜色
  changeColor: function(e){
    publicJs.changeColor(e,this)
  },
  // 验证分数
  checkScore: function(e){
    var score = Number(e.detail.value);
    if(score >100){
      wx.showModal({
        title: '提示',
        content: '分数必须小于等于100',
        showCancel: false
      })
      return;
    }
  },
  // 获取学生姓名分数
  getScore: function(){
    
    var that = this;
    var token = this.data.teacherToken; // token值
    var stamp = new Date().getTime();  //时间戳
    var ClassCode = this.data.classInfo[this.data.tipClassIndex].classCode;
    var studentNum = this.data.classInfo[this.data.tipClassIndex].studentNumber;
    var lessonNum = this.data.tipKejieIndex;

    var query1 = 'appid=web&nLessonNo='+lessonNum+'&sClassCode='+ ClassCode +'&PageSize='+ studentNum +'&PageIndex=1&timestamp='+ stamp +'&token='+token;
    var query2 = 'appid=web&nlessonno='+lessonNum+'&pageindex=1&pagesize='+ studentNum +'&sclasscode='+ ClassCode +'&timestamp='+ stamp +'&token='+token+'test';
    var sign = md51.md5(query2); 
    var query = query1 + '&sign='+sign;
    wx.showLoading({
      title:'加载中......',
      success: function(){
        requestGet.requestGet('api/JinMenKao?'+ query,function(res){
          var resData = res.data;
          // console.log(resData)
          if(resData.ResultType == 0){
            that.data.studentsList = [];
            var studentInfos = resData.AppendData;
            // console.log(studentInfos)
            for(var i = 0 ; i < studentInfos.length; i++){
              var student = studentInfos[i]
              that.data.studentsList.push({
                sStudentCode: student.sStudentCode,
                sClassCode: student.sClassCode,
                sName: student.sStudentName,
                sCardCode: student.sCardCode,
                nLessonNum: student.nLessonNo,
                ScoreType: student.ScoreType,
                Score: student.Score,
                changeLessonState:student.changeLessonState,
                tipText:student.changeLessonState == '调出'?'调出不可录':'满分100分',
                disable:student.changeLessonState == '调出'? true :false
              })
            }
            for(var i = 0 ; i < that.data.studentsList.length; i++){
              var curS = that.data.studentsList[i];
              (function(i){
                if(curS.changeLessonState == '正常' || curS.changeLessonState == '调入' || curS.changeLessonState == '转入' ){
                  that.setData({tipText: "满分100分"})
                }else if(curS.changeLessonState == '调出'){
                  that.setData({tipText: "调出不可录"})
                }
              })(i);
            }
            that.setData({studentsList:that.data.studentsList})
            // console.log(that.data.studentsList)
          }
          setTimeout(function(){
            wx.hideLoading()
          },500)
        });
      }
    })
    
  },
  // 储存学生分数
  saveScore: function(e){
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
        "sClassCode": arr[i].substr(arr[i].indexOf('=')+1),
        "nLessonNo": Number(arr[i+1].substr(arr[i+1].indexOf('=')+1)),
        "sCardCode": arr[i+2].substr(arr[i+2].indexOf('=')+1) == "" ? null : arr[i+2].substr(arr[i+2].indexOf('=')+1),
        "sStudentCode": arr[i+3].substr(arr[i+3].indexOf('=')+1),
        "ScoreType": Number(arr[i+4].substr(arr[i+4].indexOf('=')+1)),
        "Score": arr[i+5].substr(arr[i+5].indexOf('=')+1),
      })
    }
    var strDatas = JSON.stringify(arr1);
    var query1 = 'appid=web&timestamp='+stamp+'&token='+token;
    var query2 = query1+'&'+strDatas+'test';
    var sign = md51.md5(query2);
    var query = query1 + '&sign=' + sign;

    // console.log(arr1)
    requestPost.requestPost('api/JinMenKao?'+ query,arr1,function(res){
      // console.log(res)
      var resData = res.data;
      var resD = JSON.parse(res.data)
      if(resD.ResultType == 0){
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function(){
          // wx.redirectTo({ url: '/pages/SelectClass/SelectClass'})
          wx.navigateBack({ delta: 1 })
        },1000)
      }
    })
  }
})
