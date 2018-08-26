//app.js
App({
  onLaunch: function () {
  },
  globalData: {
    userInfo: null,
    API_URL:'',
    swAppId:''
  },
  config:{
    titleBar:{
      "frontColor":'#ffffff',
      "backgroundColor":'#444444',
      "text":'下渚湖旅行指南',
    },
    body:{
      "backgroundColor": '#f3f3f3',
      "backgroundImage": ''
    },
    pages:["index","find","own"],
    tabBar:{
      "backgroundColor":"#ffffff",
      "selectedTextColor":"#ff9900",
      "defaultTextColor":"#aaaaaa",
      "borderColor":"#fff",
      list:[
        {
          "pageUrl":"index",
          "text":"首页",
          "defaultIcon":"",
          "selectedIcon":""
        },
        {
          "pageUrl":"own",
          "text": "我的",
          "defaultIcon": "",
          "selectedIcon": ""
        }
      ]
    },
  }
})