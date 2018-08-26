//index.js
// var changeTabBar = require('../../utils/changeTabBar.js');
var classList = require('../../utils/classList.js');
var md51 = require('../../utils/md51.js');
var requestGet = require('../../utils/requestGet.js');
var publicJs = require('../../utils/public.js');
var getStyle = require('../../utils/getStyle.js');
// var setTime = require('../../utils/setTime.js');
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
      {id: 1, value: '第1讲'}
    ],
    taskArr:[],
    classInfo:[],
    classes: [],
    teacherName:'张云',
    schoolYear: 2017,
    semester:'秋季',
    showModalStatus: false,//控制导航的显示
    isopen:'open', //控制菜单的显示
    show:false, //控制弹窗的显示
    show1:false, //控制转发弹窗的显示

    tipKejieIndex: 0, //第几讲
    arr: [],//公共数组
    inpStr:'',//公共字符串
    classInn:'',
    kejieInn:'第1讲',
    futureTime:'',//到期时间
    huors:0,
    mins:0,
    secs:0,
    src:'../images/logo.png',
    showBtn: true,
    linkBth:false, //显示转发链接图片按钮是否可用
    taskH: 20,
    taskF: true,
    sRemainTime:'',//剩余时间
    // 滑动所需值
    windowWidth: 0,  //手机宽度
    windowHeight: 0,//手机高度
    pixelRatio:2,//手机像素比
    startX: 0, //触摸开始的X坐标
    startY: 0, //触摸开始的Y坐标
    saveOldLeft: 0, //触摸结束的X坐标
    saveOldTop: 0, //触摸结束的Y坐标
    contentH: 300, //表格内容的总高度
    contentW: 888, //表格内容的总宽度
    heigh: 200, //内容区的高度
    scrollL: 0, //滑动的X值
    scrollT: 0,  //滑动的Y值
  },
  onLoad: function(){
    wx.showShareMenu({
      withShareTicket: true //要求小程序返回分享目标信息
    })

    var that = this;
    this.setData({
      teacherName: wx.getStorageSync('teacherName'),
      teacherToken: wx.getStorageSync('teacherToken'),
      tipClassIndex: wx.getStorageSync('tipClassIndex'),
      tipKejieIndex: wx.getStorageSync('tipKejieIndex'),
      semesterIndex: wx.getStorageSync('semesterIndex'),
      schoolYear: wx.getStorageSync('schoolYear'),
      classInfo: wx.getStorageSync('classInfo'),
      futureTime: wx.getStorageSync('futureTime'),
      // cardIndex: wx.getStorageSync('cardIndex'),
    })
    check.check(this,md51)
    // console.log(this.data.futureTime)
    // 渲染倒计时
    // this.setTime();
    var classInfo = this.data.classInfo;
    for(var i = 0 ; i < classInfo.length; i++){
      this.data.classes.push({id:i,value:classInfo[i].grade})
    }
    this.setData({classes: this.data.classes,classInn:this.data.classes[this.data.tipClassIndex].value})

    for(var j = 1; j <= classInfo[this.data.tipClassIndex].lessonNumber;j++){
      this.data.kejieArr.push({id: j, value: '第'+ j +'讲'})
    }
    // 删除‘请选择’项
    this.data.kejieArr.shift();
    this.setData({kejieArr: this.data.kejieArr,kejieInn:this.data.kejieArr[this.data.tipKejieIndex-1].value})

    this.getEndTime();
    this.getTask();
    // allHeight = 打卡时间 + 选择框 + 表头  + 按钮     + 表格下padding  
    /*var allHeight = 45+42+40+44+15+15;
    // 获取手机宽高
    var that = this;
    // 手机宽高
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
          heigh:res.windowHeight - allHeight
        })
      }
    });*/
    // this.getCardTemplate()
    this.getUrl();
  },
  onHide: function(){
    wx.setStorageSync('cardIndex',0);
  },
  /*// 倒计时
  setTime: function(){
    var that = this;
    // var timer = null;

    // set();
    var timer = setInterval(set,1000);

    function set(){

      //设置未来时间
      var Ftime = new Date(that.data.futureTime);
      var FtimeMs = Ftime.getTime();
      //获取本地时间
      var Ltime = new Date();
      var LtimeMs = Ltime.getTime();

      //获取时间差的秒数
      var diff = (FtimeMs - LtimeMs)/1000;
      
      //获取时间差的天
      var day = Math.floor(diff / (24*60*60));
      //获取时间差的时
      var hour = parseInt(diff /(60*60) %24);
      //获取时间差的分
      var mins = getTwo(parseInt(diff/60%60));
      //获取时间差的秒
      var secs = getTwo(parseInt(diff % 60));

      //处理个位数
      function getTwo(num){
        return num < 10? '0' + num : num
      }
      var hours = getTwo(day*24 + hour)
      console.log(hours)
      console.log(hours)

      if(diff < 0){
        console.log(232323)
        clearInterval(timer);
        that.setData({
          hours:'00',
          mins:'00',
          secs:'00'
      })
        // return {
        //   hours:'0'+0,
        //   mins:'0'+0,
        //   secs:'0'+0
        // };
      }else{
        that.setData({
        hours:hours,
        mins:mins,
        secs:secs
      })
      }

      // var obj = setTime.setTime(that.data.futureTime);
      // console.log(obj)
      //判断条件
      // if( hours == '00' && mins == '00' && secs== '00'){
      //   // 清除定时器
        
      //   // that.setData({
      //   //   flag: true
      //   // })
      // }
      
      
      
    }
  },*/
  onShareAppMessage: function(){
    var that = this;
    var infos = this.data.classInfo[this.data.tipClassIndex].classCode +','+this.data.tipKejieIndex+','+this.data.sRemainTime;
    // console.log(infos)
    this.setData({showBtn1: false})
    return {
      title: '转发给好友',
      path: '/pages/parentLogin/parentLogin?id='+infos,
      // imageUrl:that.data.src,
      success: function(res){
        that.setData({show1: false,showBtn: true,showBtn1: false})
        // wx.redirectTo({ url: '/pages/parentLogin/parentLogin?id='+infos });
        // console.log(res)
       // console.log(res.shareTickets[0])
       // 
      }
    }
  },
  forward:function(){
    this.setData({showBtn: false,show1: true,showBtn1: true})
  },
  getUrl:function(){
    var that = this;
    var stamp = new Date().getTime();
    var token = this.data.teacherToken;
    var classCode = this.data.classInfo[this.data.tipClassIndex].classCode;
    var keJieId = this.data.tipKejieIndex;
    var query1 = 'appid=web&nLessonNo='+ keJieId +'&sClassCode='+classCode+'&timestamp='+stamp+'&token='+token;
    var query2 = 'appid=web&nlessonno='+ keJieId +'&sclasscode='+classCode+'&timestamp='+stamp+'&token='+token+'test';
    var sign = md51.md5(query2);
    var query = query1 + '&sign=' + sign;
    wx.showLoading({
      title:'加载中......',
      success: function(){
        requestGet.requestGet('api/PunchLink?'+ query,function(res){
          console.log(res)
          if(res.data.ResultType == 0){
            var resData = res.data.AppendData;
            // console.log(resData)
            that.setData({src: resData.picUrl,sRemainTime:resData.sRemainTime})  
          }
          setTimeout(function(){
            wx.hideLoading()
          },500)
        })
        
      }
    })
  },
  // 点击分享链接
  // parentLogin: function(){
  //   wx.navigateTo({url:'/pages/parentLogin/parentLogin'})
  // },
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
      // console.log(this.data.arr)
      this.setData({
        classInn:this.data.arr[e.target.dataset.id].value, 
        tipClassIndex:e.target.dataset.id, 
        tipKejieIndex:2,
        show: false
      })
      // this.getStudentInfo();
      this.getTask();
      this.getEndTime();
      this.getUrl();
      // 重新渲染课节
      this.data.kejieArr = []
      var lesson = this.data.classInfo[this.data.tipClassIndex].lessonNumber;
      for(var i = 1 ; i <= lesson; i++){
        this.data.kejieArr.push({id: i, value: '第'+i+'讲'});
      }
      this.setData({kejieArr: this.data.kejieArr,kejieInn:this.data.kejieArr[0].value});

      
      // 缓存选择的班级信息的编号
      // wx.setStorageSync('tipClassIndex',this.data.tipClassIndex);
    }else if(inpStr == 'kejie'){  //课节
      this.setData({
        kejieInn:this.data.arr[e.target.dataset.id-1].value, 
        tipKejieIndex:e.target.dataset.id, 
        show: false
      })
      // this.getStudentInfo();
      this.getTask();
      this.getEndTime();
      this.getUrl();
      // 缓存选择的课节
      // wx.setStorageSync('tipKejieIndex',this.data.tipKejieIndex);
    }
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
  // 
  /*getCardTemplate: function(){
    var that = this;
    // 时间戳
    var stamp = new Date().getTime();
    // 班级编号
    // console.log(this.data.classInfo)
    var classCode = this.data.classInfo[this.data.tipClassIndex].classCode;
    // 教师token
    var token = this.data.teacherToken;
    
    var query1 = 'appid=web&sClassCode='+classCode+'&timestamp='+stamp+'&token='+token;
    var query2 = 'appid=web&sclasscode='+classCode+'&timestamp='+stamp+'&token='+token+'test';
    var sign = md51.md5(query2); 
    var query = query1 + '&sign=' + sign;
    wx.showLoading({
      title:'努力加载中...',
      success: function(){
        requestGet.requestGet('api/PunchTemplate?'+ query,function(res){
          console.log(res)
          if(res.data.ResultType == 0){

          }
          setTimeout(function(){
            wx.hideLoading()
          },500)
        })
      }
    })
  },*/
 // 获取任务卡
  getTask: function(){
    var that = this;
    var stamp = new Date().getTime();
    var token = this.data.teacherToken;
    // 班级编码
    var classCode = this.data.classInfo[this.data.tipClassIndex].classCode;
    // var classCode = 'BJ17Q1502';
    // 课节号码
    var kejieIndex = this.data.tipKejieIndex;
    // var kejieIndex = 1;

    var query1 = 'appid=web&nLessonNo='+kejieIndex+'&sClassCode='+classCode+'&timestamp='+stamp+'&token='+token;
    var query2 = 'appid=web&nlessonno='+kejieIndex+'&sclasscode='+classCode+'&timestamp='+stamp+'&token='+token+'test';
    var sign = md51.md5(query2); 
    var query = query1 + '&sign=' + sign;

    wx.showLoading({
      title:'努力加载中...',
      success: function(){
        requestGet.requestGet('api/PunchTask?'+ query,function(res){
          // console.log(res.data.AppendData)
          if(res.data.ResultType == 0){
          var arr = res.data.AppendData;
          that.setData({studentNumber:res.data.AppendData.length-1})
          // 处理原始数据
          for(var i =0; i <arr.length; i++ ){
            var cur = arr[i];
            for(var k in cur.Tasks){
              if(cur.Tasks[k] == null){
                delete cur.Tasks[k]
              }
            }
          }
          // 处理标题
          var newArr = [];
          for(var k in arr[0].Tasks){
            if(arr[0].Tasks[k] != ""){
              newArr.push(arr[0].Tasks[k])
            }
          }
          that.setData({taskArr:newArr})
          // console.log(that.data.taskArr)
        
          
          // 如果获取的任务数量为空，那么就不能显示转发链接
          if(that.data.taskArr.length == 0){
            that.setData({linkBth:true})
          }else{
            that.setData({linkBth:false})
          }

          /* 处理学生*/
          arr.shift();
          
          for(var i = 0 ; i < arr.length; i++){
            var cur = arr[i].Tasks
            arr[i]['newTask'] = ''
            for(var k in cur){
              if(cur[k] != null){
                arr[i]['newTask'] += cur[k] + ','
              }
            }
            arr[i].newTask = arr[i].newTask.split(',')
            arr[i].newTask = arr[i].newTask.splice(0,arr[i].newTask.length-1);
          }

          that.setData({resultArr:arr})
          for(var i = 0 ; i <  that.data.taskArr.length; i++){
            if(that.data.taskArr[i].length> 4){
              that.setData({taskH:40,taskF:false})
            }else{
              that.setData({taskH:20,taskF:false})
            }
          }
          var allHeight = 45+42+that.data.taskH+20+44+15+15;
       
          // 手机宽高
          wx.getSystemInfo({
            success: function(res) {
              that.setData({
                windowHeight: res.windowHeight,
                windowWidth: res.windowWidth,
                heigh:res.windowHeight - allHeight
              })
            }
          });
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
    var that = this;
    // console.log(e)
    var nameW = 65;

    // obj,e,allContentW,allContentH,allHeight

       // 6 任务卡的数量 
    var allContentW = 70*this.data.taskArr.length+85;
    // var allContentW = this.data.contentW;
    if(this.data.taskF){
      var allContentH = 40*that.data.studentNumber
      var allHeight = 45+42+40+44+15+15;
    }else{
      var allContentH = 40*that.data.studentNumber
      var allHeight = 45+42+60+44+15+15;
    }


    getStyle.touchstart(that,e,allContentW,allContentH,allHeight,nameW)  
  },
  touchmove: function(e){
    var nameW = 65;
    getStyle.touchmove(this,e,nameW)
  },
  touchend: function(e){
    getStyle.touchend(this)
  },
  // 获取截止时间
  getEndTime: function(){
    var that = this;
    var stamp = new Date().getTime();
    var token = this.data.teacherToken;
    // 班级编码
    var classCode = this.data.classInfo[this.data.tipClassIndex].classCode;
    // console.log(classCode)
    // var classCode = 'BJ17Q1502';
    // 课节号码
    var kejieIndex = this.data.tipKejieIndex;
    // var kejieIndex = 1;
    
    var query1 = 'appid=web&nLessonNo='+kejieIndex+'&sClassCode='+classCode+'&timestamp='+stamp+'&token='+token;
    var query2 = 'appid=web&nlessonno='+kejieIndex+'&sclasscode='+classCode+'&timestamp='+stamp+'&token='+token+'test';
    var sign = md51.md5(query2); 
    var query = query1 + '&sign=' + sign;
    wx.showLoading({
      title:'努力加载中...',
      success: function(){
        requestGet.requestGet('api/PunchEndDate?'+ query,function(res){
          // console.log(res)
          if(res.data.ResultType == 0){
            var arr = res.data.AppendData;
            var dates = arr.Date.substr(0,arr.Date.indexOf(' '));
            var times = arr.Time.substr(0,arr.Time.lastIndexOf(':'))

            var datesStr = '';

             var datesArr = dates.split('/');
            if(datesArr[1]<10){
              datesArr[1] = '0'+datesArr[1];
            }
            datesStr = datesArr[1]+'月'+datesArr[2]+'日'
            that.setData({
              yearStr:datesArr[0],
              month:datesStr,
              clock:times
            })

            // 处理输入的时间
            var reg = /[\u4e00-\u9fa5]/;
            var monthArr = that.data.month.split(reg);
            monthArr.pop()
            for(var i = 0 ; i < monthArr.length; i++){
              if(monthArr[i].length == 1 && monthArr[i] < 10){
                monthArr[i] = '0' +monthArr[i]
              }
            }
            // var fullyear = new Date().getFullYear()
            var times = that.data.yearStr +'/'+monthArr.join('/') + ' ' + that.data.clock+':00';
            // console.log(times)
            that.setData({futureTime:times})
            console.log(that.data.futureTime)
            // that.setTime(); 
            var timer = setInterval(set,1000);

    function set(){
       // console.log(that.data.futureTime +'bbbbbbbb')
      //设置未来时间
      var Ftime = new Date(that.data.futureTime);
      var FtimeMs = Ftime.getTime();
     

      //获取本地时间
      var Ltime = new Date();
      var LtimeMs = Ltime.getTime();


      // console.log(FtimeMs+'aaaaaaaa');
      // console.log(LtimeMs+'aaaaaaaa');

      //获取时间差的秒数
      var diff = (FtimeMs - LtimeMs)/1000;
      
      //获取时间差的天
      var day = Math.floor(diff / (24*60*60));
      //获取时间差的时
      var hour = parseInt(diff /(60*60) %24);
      //获取时间差的分
      var mins = getTwo(parseInt(diff/60%60));
      //获取时间差的秒
      var secs = getTwo(parseInt(diff % 60));

      //处理个位数
      function getTwo(num){
        return num < 10? '0' + num : num
      }
      var hours = getTwo(day*24 + hour)
      // console.log(hours)
      // console.log(mins)

      if(diff < 0){
        console.log(232323)
        clearInterval(timer);
        that.setData({
          hours:'00',
          mins:'00',
          secs:'00'
      })

      }else{
        that.setData({
          hours:hours,
          mins:mins,
          secs:secs
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
  }

})
