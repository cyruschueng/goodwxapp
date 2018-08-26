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
    kejieArr:[
      {id: 1, value: '第1讲'}
    ],
    taskArr:[
      // {id:0, focus:false, task:'作业', isComplete: true},
      // {id:1, focus:false, task:'计算题', isComplete: false},
      // {id:2, focus:false, task:'背课文', isComplete: false},
    ],//从后台获取的任务卡数组
    newTaskArr:[], //新增加的任务卡数组
    classInfo: [], //班级信息数组
    classes:[],
    teacherName:'张云',
    schoolYear: 2017,
    semester:'秋季',
    showModalStatus: false,
    isopen:'open',
    show:false, //控制弹窗的显示
    tipKejieIndex: 2, //第几讲
    arr: [],//公共数组
    inpStr:'',//公共字符串
    classInn:'',
    kejieInn:'第2讲',
    month:'',//截止日
    clock:'',//截止日
    classStr: '',//选择的班级信息
    classCode:'',
    kejieIndex:0,
    endTime:'',
    showTime: false, //是否显示截止时间
    taskTemplateArr:[],// 获取到的模板任务
    addTaskTemplateArr:[],//添加的模板任务
    AllTemplateArr:[],//所有模板任务
    status: 0, //课节获取任务卡的状态值
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


    // 设置班级编号及课节
    this.setData({
      classCode:this.data.classInfo[this.data.tipClassIndex].classCode,
    })
    //组装班级id和名称
    var classInfo = this.data.classInfo;
    // console.log(classInfo)
    // 设置班级
    var choiceClass = this.data.classInfo[this.data.tipClassIndex]
    this.setData({classStr:choiceClass.classCode + choiceClass.sClassTypeName})

    for(var i = 0 ; i < classInfo.length; i++){
      this.data.classes.push({id:i,value:classInfo[i].grade})
    }
    this.setData({classes: this.data.classes})
    this.setData({classInn:this.data.classes[this.data.tipClassIndex].value})

    //设置课节
    for(var j = 1; j <= classInfo[this.data.tipClassIndex].lessonNumber;j++){
      this.data.kejieArr.push({id: j, value: '第'+ j +'讲'})
    }
    // 删除‘请选择’项
    this.data.kejieArr.shift();
    this.setData({kejieArr: this.data.kejieArr})

    // 布置模板项的显示
    if(this.data.tipKejieIndex == 0){
      this.setData({showTime: false})
      this.getTaskTemplate();
      this.setData({tipKejieIndex: 0})
      this.setData({kejieInn:'第1讲'})
    }else if(this.data.tipKejieIndex == 1){
      this.setData({showTime: true, kejieInn:'第1讲'})
      this.getTask();
      this.getEndTime();
    }else{
      this.setData({showTime: true})
      // this.setData({tipKejieIndex: this.data.tipKejieIndex})
      this.setData({kejieInn:this.data.kejieArr[this.data.tipKejieIndex-1].value})
      this.getTask();
      this.getEndTime();
    }

    // 设置显示基本信息还是期中期末
    // this.setData({typeInn: this.data.typeArr[this.data.kind-1].value})
    //判断是基本信息还是期中期末
    // if(this.data.kind == 1){
    //   this.setData({
    //     baseShow: true,
    //     scoreShow: false
    //   })
    // }else{
    //   this.setData({
    //     baseShow: false,
    //     scoreShow: true
    //   })
    // }

    // 获取手机宽高
    var that = this;
    // 手机宽高
    wx.getSystemInfo({
      success: function(res) {
        that.setData({windowHeight: res.windowHeight})
        that.setData({windowWidth: res.windowWidth})
        that.setData({resultH: res.windowHeight - 90-52-32-109-30})
      }
    });
 
  },
  // 拼接时间
  getTime: function(){
    // 处理输入的时间
    var reg = /[\u4e00-\u9fa5]/;
    var monthArr = this.data.month.split(reg);
    monthArr.pop()
    // console.log(monthArr)
    for(var i = 0 ; i < monthArr.length; i++){
      if(monthArr[i].length == 1 && monthArr[i] < 10){
        monthArr[i] = '0' +monthArr[i]
      }
    }
    var fullyear = this.data.yearStr;
    // console.log(fullyear)
    var times = fullyear +'-'+monthArr.join('-') + ' ' + this.data.clock+':00';
    wx.setStorageSync('futureTime',times)
    this.setData({
      endTime:times
    })
    // console.log(this.data.endTime)
  },
  onShow:function(){
   /* // console.log(this.data.classes)
    this.setData({
      tipClassIndex: wx.getStorageSync('tipClassIndex'),
      tipKejieIndex: wx.getStorageSync('tipKejieIndex'),
    })
    if(this.data.tipClassIndex != 0){
      this.setData({
        // classInn:this.data.classes[this.data.tipClassIndex].value,
        // kejieInn:this.data.kejieArr[this.data.tipKejieIndex].value
      })
    }else{
      this.setData({
        // kejieInn:this.data.kejieArr[this.data.tipKejieIndex].value
      })
    }*/
  },
  getMonth: function(e){
    // console.log(e)
    var reg = /([0-9]{1,4}年)?[0-9]{1,2}月[0-9]{1,2}日/;
    if(!(reg.test(e.detail.value))){
      wx.showModal({
        title: '提示',
        content: '您输入的日期格式不正确，正确格式为：09月09日',
        showCancel: false
      })
      return;
    }
    this.setData({
      month: e.detail.value
    });
    this.getTime();
  },
  getClock: function(e){
    // console.log(e)
    this.setData({
      clock: e.detail.value
    });
    this.getTime();
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
        tipClassIndex:e.target.dataset.id, 
        show: false
      })
      this.setData({
        classCode:this.data.classInfo[this.data.tipClassIndex].classCode
      })

      // 重新渲染课节
      this.data.kejieArr = [];
      var lesson = this.data.classInfo[this.data.tipClassIndex].lessonNumber;
      for(var i = 1 ; i <= lesson; i++){
        this.data.kejieArr.push({id: i, value: '第'+i+'讲'});
      }
      this.setData({kejieArr: this.data.kejieArr,kejieInn:this.data.kejieArr[0].value});
      this.getTask();
      this.getEndTime();
      // 缓存选择的班级信息的编号
      wx.setStorageSync('tipClassIndex',this.data.tipClassIndex);
    }else if(inpStr == 'kejie'){  //课节
      this.setData({
        kejieInn:this.data.arr[e.target.dataset.id-1].value, 
        tipKejieIndex:e.target.dataset.id, 
        show: false
      })
      this.setData({
        kejieIndex:this.data.tipKejieIndex
      })
     // console.log(e.target.dataset.id)
     this.getTask();
     this.getEndTime();
      // 缓存选择的班级信息的编号
      wx.setStorageSync('tipKejieIndex',e.target.dataset.id);
    }
  },
   // 改变课节相关值
  getKejie: function (e) {
    publicJs.getKejie(e,this)
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
            that.getTime();
          }
          setTimeout(function(){
            wx.hideLoading()
          },500)
        })
      }
    })
  },


  /*===== 模板任务卡 =====*/
  // 获取模板
  getTaskTemplate: function(){
    var that = this;
    // 时间戳
    var stamp = new Date().getTime();
    // 班级编号
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
          console.log(res.data)
          var AllTemplateArr = [];
          if(res.data.ResultType == 0){
            var resData = res.data.AppendData;
            for(var i = 0; i < resData.length; i++){
              AllTemplateArr.push({
                id: resData[i].ID,
                task: resData[i].Name,
                classCode: resData[i].ClassCode,
                dateTime: resData[i].DateTime,
                isDelete:false,
                foucs: false
              })
            }
            that.setData({AllTemplateArr:AllTemplateArr})
          }
          setTimeout(function(){
            wx.hideLoading()
          },500)
        })
      }
    })
  },
  // 保存模板
  postTaskTemplate: function(e){
    var that = this;
    var token = this.data.teacherToken; // token值
    var stamp = new Date().getTime();  //时间戳
    var datas = e.detail.value;

    var arr = [];
    var arr1 = [];
    for(var k in datas){
     var str = k + '=' + datas[ k ]
      arr.push(str);
    }
    for(var i = 0 ; i < arr.length; i+=3){
      arr1.push({
        "sClassCode": arr[i].substr(arr[i].indexOf('=')+1),
        "ID": arr[i+1].substr(arr[i+1].indexOf('=')+1) == ""? null:arr[i+1].substr(arr[i+1].indexOf('=')+1),
        "sName": arr[i+2].substr(arr[i+2].indexOf('=')+1)
      })
    }
    // 去除空任务卡
    for(var i = 0 ; i < arr1.length; i++){
      if(arr1[i].sName == ''){
        arr1.splice(i,1)
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
        requestPost.requestPost('api/PunchTemplate?'+ query,arr1,function(res){
          var resData = res.data;
          var resD = JSON.parse(res.data)
          if(resD.ResultType == 0){
            setTimeout(function(){
              wx.hideLoading();
            },500)
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000,
              success: function(){
                console.log('保存成功')
                wx.redirectTo({url:'/pages/taskCard/taskCard'})
              }
            })
          };
        })
      }
    })
  },
  // 添加模板任务
  addTaskTemplate: function(){
    if(this.data.AllTemplateArr.length >=7){
      wx.showModal({
        title: '提示',
        content: '最多建立7个任务卡',
        showCancel: false
      })
      return;
    }
    if(this.data.AllTemplateArr[this.data.AllTemplateArr.length-1].task == ""){
      this.data.AllTemplateArr[this.data.AllTemplateArr.length-1].focus = true;
      this.setData({AllTemplateArr: this.data.AllTemplateArr})
      return;
    }

    this.data.AllTemplateArr.push({
      id: null,
      task: '',
      focus:true,
      classCode: this.data.classInfo[this.data.tipClassIndex].classCode,
      isDelete:true
    })
    this.setData({
      AllTemplateArr:this.data.AllTemplateArr
    })
  },
  // 模板获取值
  templateGetInpVal1:function(e){
    var id = Number(e.target.dataset.index);
    if(e.detail.value == ''){
      wx.showModal({
        title: '提示',
        content: '任务名称不能为空',
        showCancel: false
      })
      this.data.AllTemplateArr[id].focus = true;
      this.setData({
        AllTemplateArr:this.data.AllTemplateArr
      })
      return;
    }
    this.data.AllTemplateArr[id].task = e.detail.value
    this.data.AllTemplateArr[id].focus = false
    this.setData({
      // addTaskTemplateArr: this.data.addTaskTemplateArr,
      AllTemplateArr:this.data.AllTemplateArr
    })
  },
  // 选择或删除模板任务
  checkRadio:function(e){
    var ids = e.currentTarget.dataset.id;
    var AllTemplateArr = this.data.AllTemplateArr;
    // if(AllTemplateArr[ids].isDelete == false){
    // console.log(ids)
    AllTemplateArr.splice(ids,1)
    
    this.setData({AllTemplateArr:this.data.AllTemplateArr})
  },







  /*====  课节任务卡   =====*/
  // 选择或删除任务
  checkRadio1:function(e){
    var ids = e.currentTarget.dataset.id;
    var newTaskArr = this.data.newTaskArr;
    newTaskArr.splice(ids,1)
    this.setData({newTaskArr:this.data.newTaskArr})
  },
  // 添加任务
  addTask:function(){
    if(this.data.taskArr.length + this.data.newTaskArr.length >=7){
      wx.showModal({
        title: '提示',
        content: '最多建立7个任务卡',
        showCancel: false
      })
      return;
    }
      console.log(this.data.newTaskArr)
    if(this.data.newTaskArr.length && this.data.newTaskArr[this.data.newTaskArr.length-1].task == ""){
      this.data.newTaskArr[this.data.newTaskArr.length-1].focus = true;
      this.setData({newTaskArr: this.data.newTaskArr})
      return;
    }
    this.data.newTaskArr.push({
      focus: true,
      task:'',
      sCode:null,
    })
    this.setData({newTaskArr: this.data.newTaskArr})
   
  },
  // 课节获取值
  getInpVal1:function(e){
    var id = Number(e.target.dataset.index);
    if(e.detail.value == ''){
      wx.showModal({
        title: '提示',
        content: '任务名称不能为空',
        showCancel: false
      })
      return;
    }
    this.data.taskArr[id].task = e.detail.value
    this.data.taskArr[id].focus = false;
    this.setData({taskArr: this.data.taskArr})
  },
  // 课节获取值
  getInpVal2:function(e){
    var id = Number(e.target.dataset.index);
    if(e.detail.value == ''){
      wx.showModal({
        title: '提示',
        content: '任务名称不能为空',
        showCancel: false
      })
      return;
    }
    this.data.newTaskArr[id].task = e.detail.value
    this.data.newTaskArr[id].focus = false;
    this.setData({newTaskArr: this.data.newTaskArr})
    console.log(this.data.newTaskArr)
  },
  // 获取课节任务卡
  getTask: function(){
    var that = this;
    var stamp = new Date().getTime();
    var token = this.data.teacherToken;
    // 班级编码
    var classCode = this.data.classInfo[this.data.tipClassIndex].classCode;
    // 课节号码
    var kejieIndex = this.data.tipKejieIndex;
    
    var query1 = 'appid=web&nLessonNo='+kejieIndex+'&sClassCode='+classCode+'&timestamp='+stamp+'&token='+token;
    var query2 = 'appid=web&nlessonno='+kejieIndex+'&sclasscode='+classCode+'&timestamp='+stamp+'&token='+token+'test';
    var sign = md51.md5(query2); 
    var query = query1 + '&sign=' + sign;
    wx.showLoading({
      title:'努力加载中...',
      success: function(){
        requestGet.requestGet('api/PunchTemplateOperation?'+ query,function(res){
          console.log(res)
          // 取消加载图标
          setTimeout(function(){
            wx.hideLoading()
          },500)
          if(res.data.ResultType == 0){
            that.setData({newTaskArr:[],taskArr:[]})
            var arr = res.data.AppendData.PunchInitiItems;
            // 设置获取的任务卡状态值
            that.setData({status: res.data.AppendData.nTaskType})
            // 处理任务卡数组
            var newA = [];
            for(var i = 0 ; i < arr.length; i++){
              var json = {task:'',code:""}
              json['task'] =  arr[i].sName;
              json['code'] =  arr[i].sCode;
              newA.push(json)
            }
            that.setData({taskArr:newA})
          }else if(resD.ResultType == 7){
            setTimeout(function(){
              wx.hideLoading()
            },500)
            wx.showModal({
              title: '提示',
              content: '请重新登陆',
              showCancel: false,
              success: function(){
                wx.reLaunch({ url: '/pages/index/index'})
              }
            })
          }
        
        })
      }
    })
  },
  // 保存课节任务卡
  postTask:function(e){
    // console.log(e)
    var that = this;
    var token = this.data.teacherToken; // token值
    var stamp = new Date().getTime();  //时间戳
    // var endtime = month
    var studentSize = this.data.classInfo[this.data.tipClassIndex].studentNumber;
    var ClassCode = this.data.classInfo[this.data.tipClassIndex].classCode;
    var datas = e.detail.value;

    if(that.data.month == ''|| that.data.clock== ''){
       console.log(11111)
       wx.showModal({
        title: '提示',
        content: '请设置截止时间',
        showCancel: false
      })
      return;
    }

    var arr = [];
    var arr1 = [];
    for(var k in datas){
     var str = k + '=' + datas[ k ]
      arr.push(str);
    }
    for(var i = 0 ; i < arr.length; i+=5){
      arr1.push({
        "sClassCode": arr[i].substr(arr[i].indexOf('=')+1),
        "nLessonNo": arr[i+1].substr(arr[i+1].indexOf('=')+1),
        "dtEndDate": arr[i+2].substr(arr[i+2].indexOf('=')+1),
        "sItemName": arr[i+3].substr(arr[i+3].indexOf('=')+1),
        "sCode": arr[i+4].substr(arr[i+4].indexOf('=')+1) == ""? null : arr[i+4].substr(arr[i+4].indexOf('=')+1),
      })
    }
    console.log(arr1)
   /* for(var i = 0 ; i < arr1.length; i++){
      if(arr1[i].isComplete == 'false' || arr1[i].sItemName == ""){
        arr1.splice(i,1)
      }
    }*/
    var strDatas = JSON.stringify(arr1);
    var query1 = 'appid=web&timestamp='+stamp+'&token='+token;
    var query2 = query1+'&'+strDatas+'test';
    var sign = md51.md5(query2);
    var query = query1 + '&sign=' + sign;
    wx.showLoading({
      title:'保存中',
      success: function(){

        requestPost.requestPost('api/PunchTask?'+ query,arr1,function(res){
          var resData = res.data;
          var resD = JSON.parse(res.data)
          if(resD.ResultType == 0){

            wx.hideLoading();
 
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000,
              success: function(){
                wx.navigateTo({url:'/pages/taskProgress/taskProgress'})
              }
            });
          }
        })

      }
    })
  },

})
