//index.js
var classList = require('../../utils/classList.js');
var md51 = require('../../utils/md51.js');
var requestGet = require('../../utils/requestGet.js');
var requestPost = require('../../utils/requestPost.js');
var publicJs = require('../../utils/public.js');
var setTime = require('../../utils/setTime.js');
//获取应用实例
const app = getApp();

Page({
  data: {
    tabBarArr:[
      {id:0,txt:'录入',iconSrc:'../images/write1.gif',changeTextColor:'#1FBB1C',isChange: true},
      {id:1,txt:'查询',iconSrc:'../images/search.gif',changeTextColor:'#525252',isChange: false},
      {id:2,txt:'工具',iconSrc:'../images/setting.gif',changeTextColor:'#525252',isChange: false},
    ],
    taskArr:[],
    teacherName:'张云',
    schoolYear: 2017,
    semester:'秋季',
    showModalStatus: false,
    isopen:'open',
    showWrap:true,
    hasStudent: true,
    hours:0,
    mins:0,
    secs: 0,
    flag:false,//控制按钮是否可以点击
    queryArr:[],//转发携带的参数
    showLogin:false, //控制退出登陆按钮
  },
  onLoad: function(){
    this.setData({
      hasStudent: wx.getStorageSync('hasStudent'),
      studentTask: wx.getStorageSync('studentTask'),
      studentMessage: wx.getStorageSync('studentMessage'),
      queryArr: wx.getStorageSync('queryArr'),
    })
    console.log(this.data.queryArr)
    // console.log(this.data.studentMessage)
    if(this.data.hasStudent){
      this.setData({showWrap:true})
    }else{
      this.setData({showWrap:false})
    }
    // 处理打卡结束时间
    // var endTime = this.data.studentTask.dtEndDate;
    // console.log(this.data.studentTask)
    // console.log(endTime.split('T').join(' '))
    // this.setData({futureTime:this.data.studentTask.dtEndDate})
    this.getClassTaskInfo();
    this.getStudentTask();
  
  },
  // 获取截止时间
 /* getEndTime: function(){
    var that = this;
    var stamp = new Date().getTime();
    var token = this.data.studentMessage;
    // 班级编码
    // var classCode = this.data.classInfo[this.data.tipClassIndex].classCode;
    // console.log(classCode)
    // var classCode = 'BJ17Q1502';
    // 课节号码
    var classCode = this.data.queryArr[0];
    var kejieIndex = this.data.queryArr[1];
    // var kejieIndex = 1;
    
    var query1 = 'appid=web&nLessonNo='+kejieIndex+'&sClassCode='+classCode+'&timestamp='+stamp+'&token='+token;
    var query2 = 'appid=web&nlessonno='+kejieIndex+'&sclasscode='+classCode+'&timestamp='+stamp+'&token='+token+'test';
    var sign = md51.md5(query2); 
    var query = query1 + '&sign=' + sign;
    wx.showLoading({
      title:'努力加载中...',
      success: function(){
        requestGet.requestGet('api/PunchEndDate?'+ query,function(res){
          console.log(res)
          if(res.data.ResultType == 0){
            var arr = res.data.AppendData;
            var dates = arr.Date.substr(0,arr.Date.indexOf(' '));
            var times = arr.Time.substr(0,arr.Time.lastIndexOf(':'))

            var datesStr = '';
          }
          setTimeout(function(){
            wx.hideLoading()
          },500)
        })
      }
    })
  },*/
  //倒计时
 /* setTime: function(){
    var that = this;
    var timer = null;
    set();
    timer = setInterval(set,1000);
    function set(){
      var obj = setTime.setTime(that.data.futureTime);
      //判断条件
      if( obj.hours == '00' && obj.mins == '00' && obj.secs== '00'){
        // console.log(1111);
        clearInterval(timer)
        that.setData({
          flag: true
        })
      }
      that.setData({
        hours:obj.hours,
        mins:obj.mins,
        secs:obj.secs
      })
    }
  },*/
  // 退出登录
  unlogin: function(){
    wx.clearStorageSync();
    // wx.navigateTo({ url: '/pages/parentLogin/parentLogin'});
    wx.reLaunch({ url: '/pages/parentLogin/parentLogin'});
  },
  checkRadio: function(e){
    var id = e.currentTarget.dataset.id;
    var flag = e.currentTarget.dataset.complete;
    this.data.taskArr[id].isComplete = !flag;
    this.setData({taskArr:this.data.taskArr})
  },
  // 发送任务数据
  postTask: function(e){

    // 保存任务
    var that = this;
    var classCode = that.data.queryArr[0];
    var keJieId = that.data.queryArr[1];
    var token = that.data.studentMessage;

   /* var classCode = "BJ17Q1534";
    var keJieId = 4;
    var token = 'ef448fd7738342b08bc83bf8c4ca279c';*/

    var stamp = new Date().getTime();  //时间戳

    var datas = e.detail.value;

    var arr2 = [];
    var arr1 = [];
    for(var k in datas){
     var str = k + '=' + datas[ k ]
      arr2.push(str);
    }
    // console.log(arr2)
    for(var i = 0 ; i < arr2.length; i+=3){
      arr1.push({
        "sPunchCardCode": arr2[i].substr(arr2[i].indexOf('=')+1),
        "sItemName": arr2[i+1].substr(arr2[i+1].indexOf('=')+1),
        "isComplete": arr2[i+2].substr(arr2[i+2].indexOf('=')+1)
      })
    }
     for(var i = 0 ; i < arr1.length; i++){
      if(arr1[i].isComplete == 'false'){
        arr1.splice(i,1)
      }
      // delete arr1[i].isComplete
    }
    // console.log(arr1)

    var strDatas = JSON.stringify(arr1);
    var query1 = 'appid=web&timestamp='+stamp+'&token='+token;
    var query2 = query1+'&'+strDatas+'test';
    var sign = md51.md5(query2);
    var query = query1 + '&sign=' + sign;


    var taskArr = this.data.taskArr;
    var arr = [];
    var strArr = [];
    for(var i = 0 ; i < taskArr.length; i++){
      arr.push(taskArr[i].isComplete)
      if(taskArr[i].isComplete == false){
        strArr.push(taskArr[i].task);
      }
    }
    if(arr.indexOf(false) == -1){
      wx.showModal({
        title: '提示',
        content: '恭喜你，所有任务全部完成！',
        showCancel: false
      })
    }else if(arr.indexOf(true) == -1){
      wx.showModal({
        title: '提示',
        content: '还没有开始做作业嘛，可得抓紧啦！',
        showCancel: false
      })
      return;
    }
    // 部分未完成
    if(strArr.length){
      var str = strArr.join('、');
      // console.log(str)
      wx.showModal({
        title: '提示',
        content: '态度积极，常伴不离。尚缺'+ str +'项，万勿忘记',
        showCancel: false
      })
    }

    
    // arr1 = [{sItemName:'背诵',sPunchCardCode:'BJ17Q26272'}];
    wx.showLoading({
      title:'保存中',
      success: function(){
        requestPost.requestPost('api/StudentPunch?'+ query,arr1,function(res){
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
  // 获取班级打卡信息
  getClassTaskInfo:function(){
    var that = this;
    var stamp = new Date().getTime();
    var classCode = this.data.queryArr[0];
    var keJieId = this.data.queryArr[1];
    var token = this.data.studentMessage;
    /*var classCode = "BJ17Q1534";
    var keJieId = 4;
    var token = 'ef448fd7738342b08bc83bf8c4ca279c';*/

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
            var endTime1 = resData.dtEndDate.split('T');
            var endTime = endTime1.join(' ');
            that.setData({
              futureTime:endTime,
              className:resData.sClassName,
              alreadyCount:resData.AlreadyCount,
              noAlreadyCount:resData.TotalCount - resData.AlreadyCount,
              kejieIndex:resData.nLessonNo,

            });
            
            // console.log(that.data.futureTime)
            // that.setTime();
          }
           setTimeout(function(){
              wx.hideLoading()
            },500)
          
        })
      }
    })
  },
  // 获取学生打卡信息
  getStudentTask: function(){
    var that = this;
    var stamp = new Date().getTime();
    var classCode = this.data.queryArr[0];
    var keJieId = this.data.queryArr[1];
    var token = this.data.studentMessage;
    /*var classCode = "BJ17Q1534";
    var keJieId = 4;
    var token = 'ef448fd7738342b08bc83bf8c4ca279c';*/

    var query1 = 'appid=web&nLessonNo='+ keJieId +'&sClassCode='+classCode+'&timestamp='+stamp+'&token='+token;
    var query2 = 'appid=web&nlessonno='+ keJieId +'&sclasscode='+classCode+'&timestamp='+stamp+'&token='+token+'test';
    var sign = md51.md5(query2);
    var query = query1 + '&sign=' + sign;
    wx.showLoading({
      title:'加载中......',
      success: function(){
        requestGet.requestGet('api/StudentPunch?'+ query,function(res){
          // console.log(res)
          var resData = res.data.AppendData;
          if(res.data.ResultType == 0){
            that.data.taskArr = [];
            for(var i = 0 ; i < resData.TaskItems.length; i++){
              var cur = resData.TaskItems[i];
              that.data.taskArr.push({id:i,task:cur.sItemName,sCode:cur.sCode ,isComplete: cur.IsFinish != null? true:false})
            }
            that.setData({taskArr: that.data.taskArr,showLogin:false})
            setTimeout(function(){
              wx.hideLoading()
            },500)
          }else if(res.data.ResultType == 6){
            that.setData({showLogin:true})
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              content: '您登录的学员并未报名本课程，请退出登录并尝试切换账号，或检查是否进错班级',
              showCancel: false
            })
          }
        })
      }
    })
  },
  // 退出登陆
  unlogin1:function(){
    wx.clearStorageSync();
    var str = this.data.queryArr[0]+','+this.data.queryArr[1]+','+this.data.queryArr[2]
    wx.redirectTo({url:'/pages/parentLogin/parentLogin?id='+str})
  }
  
 
})
