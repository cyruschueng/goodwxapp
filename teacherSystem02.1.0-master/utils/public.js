var changeTabBar = require('./changeTabBar.js');
var animation = require('./animation.js');
// 改变学年相关值
function getYear(e,obj) {
  obj.setData({
    show: true,
    arr: obj.data.yearArr,
    inpStr:e.currentTarget.dataset.id
  })
}
// 改变学期相关值
function getSemester(e,obj) {
  obj.setData({
    show: true,
    arr: obj.data.semesterArr,
    inpStr:e.currentTarget.dataset.id
  })
}
// 改变班级相关值
function getClass(e,obj) {
  obj.setData({
    show: true,
    arr: obj.data.classes,
    inpStr:e.currentTarget.dataset.id
  })
}
function getKejie(e,obj){
  obj.setData({
    show: true,
    arr: obj.data.kejieArr,
    inpStr:e.currentTarget.dataset.id
  });
}
function getType(e,obj){
  obj.setData({
    show: true,
    arr: obj.data.typeArr,
    inpStr:e.currentTarget.dataset.id
  });
}
function sExperimental(e,obj){
   obj.setData({
    numb: e.target.dataset.numb,
    show: true,
    arr: obj.data.ExperimentalArr,
    inpStr:e.currentTarget.dataset.id
  });
}
// 获取点击的弹窗的id和value值
function getIndex(e,obj,num,callback,callback1,callback2,callback3){
  var inpStr = obj.data.inpStr;
  if(inpStr == 'year'){ //年份
    obj.setData({
      schoolYear:e.target.dataset.id, 
      show: false,
      classInn: obj.data.classes[0].value
    })
    // 缓存选择的年份
    wx.setStorageSync('year',e.target.dataset.id);
    callback();
  }else if(inpStr == 'semester'){ //学期
    obj.setData({
      semester:obj.data.arr[e.target.dataset.id-1].value, 
      nSemester:e.target.dataset.id, 
      show: false,
      classInn: obj.data.classes[0].value
    })
    // 缓存选择的学期的编号
    wx.setStorageSync('semesterIndex',e.target.dataset.id);
    callback();
  }else if(inpStr == 'class'){  //班级
    console.log(obj.data.arr)
    obj.setData({
      classInn:obj.data.arr[e.target.dataset.id].value, 
      tipClassIndex:e.target.dataset.id, 
      show: false
    })
    console.log(obj.data.tipClassIndex)
    // 缓存选择的班级信息的编号
    wx.setStorageSync('tipClassIndex',obj.data.tipClassIndex);
    callback2();
  }else if(inpStr == 'kejie'){  //课节
    obj.setData({
      kejieInn:obj.data.arr[e.target.dataset.id-1-num].value, 
      tipKejieIndex:e.target.dataset.id, 
      show: false
    })
    // 缓存选择的课节
    wx.setStorageSync('tipKejieIndex',obj.data.tipKejieIndex);
    callback2();
  }else if(inpStr == 'classes'){  //课节按钮组
    obj.setData({
      tipKejieIndex:e.detail.value, 
      show1: false,
    })
    callback1();
  }else if(inpStr == 'type'){  //基本信息/期中期末
    obj.setData({
      typeInn: obj.data.arr[e.target.dataset.id-1].value,
      kind:e.target.dataset.id, 
      show: false,
    })
    callback3();
    wx.setStorageSync('kind',e.target.dataset.id);
  }else if(inpStr == 'experimental'){  //实验班
    obj.data.studentslist[obj.data.numb].sExperimentalType = obj.data.ExperimentalArr[e.target.dataset.id].value;
    obj.setData({
      studentslist: obj.data.studentslist,
      experimentalIndex:e.target.dataset.id, 
      show: false,
    })
  }
}
// 退出登录
function unlogin(){
  wx.clearStorageSync();
  wx.reLaunch({ url: '/pages/index/index'})
}
// 关闭弹窗
function closeFloat(e,obj){
  var tId = e.target.dataset.id
  if(tId == 'float'){
    obj.setData({
      show: false,
      show1: false,
      show2:false,
      arr:[]
    })
  }
}
// 菜单按钮
function powerDrawer(e,obj) {
  var currentStatu = e.currentTarget.dataset.statu;
  if(currentStatu == 'close'){
    animation.animation(currentStatu,obj);
    obj.setData({isopen:'open'})
  }else{
    animation.animation(currentStatu,obj)
    obj.setData({isopen:'close'})
  }
}
// 关闭导航
function closeNav(e,obj){
  if(e.target.dataset.id == "closeNav"){
    animation.animation('close',obj);
    obj.setData({
      isopen: 'open'
    })
  }
}
// 点击改变tabBar颜色
function changeColor(e,obj){
  var tabBarArr = obj.data.tabBarArr;
  var datasetId = Number(e.currentTarget.dataset.id);
  changeTabBar.changeTabBar(datasetId,tabBarArr,obj);
}

module.exports = {
  getYear:getYear,
  getSemester:getSemester,
  getClass:getClass,
  getKejie:getKejie,
  getType:getType,
  sExperimental:sExperimental,
  getIndex:getIndex,
  unlogin:unlogin,
  closeFloat:closeFloat,
  powerDrawer:powerDrawer,
  closeNav:closeNav,
  changeColor:changeColor,
}