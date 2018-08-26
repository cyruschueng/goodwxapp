//index.js
var changeTabBar = require('../../utils/changeTabBar.js');
var check = require('../../utils/check.js');
var md51 = require('../../utils/md51.js');
//获取应用实例
const app = getApp();

Page({
  data: {
    schoolSrc:'../images/school.gif',
    scoreSrc:'../images/score.gif',
    tabBarArr:[
      {id:0,txt:'录入',iconSrc:'../images/write1.gif',changeTextColor:'#1FBB1C',isChange: true},
      {id:1,txt:'查询',iconSrc:'../images/search.gif',changeTextColor:'#525252',isChange: false},
      {id:2,txt:'工具',iconSrc:'../images/setting.gif',changeTextColor:'#525252',isChange: false},
    ],
  },
  onLoad: function(){
    console.log(111111111111111)
    this.setData({
      teacherToken:wx.getStorageSync('teacherToken')
    })

    // console.log(this.data.teacherToken)
    // 校验是否在其他设备 上登陆
    check.check(this,md51)
  },
  goSchool: function(){
    wx.navigateTo({url: '/pages/schoolInfos/schoolInfos'})
  },
  goScore: function(){
    wx.navigateTo({url: '/pages/entranceDoor/entranceDoor'})
  },
  // 点击改变tabBar颜色
  changeColor: function(e){
    // console.log(e.currentTarget.dataset.id)
    var tabBarArr = this.data.tabBarArr;
    var datasetId = Number(e.currentTarget.dataset.id);
    changeTabBar.changeTabBar(datasetId,tabBarArr,this);
  },
  // 调取扫一扫接口
 /* scan: function(){
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
      }
    })
  }*/
})
