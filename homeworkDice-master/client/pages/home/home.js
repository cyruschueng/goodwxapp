//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 1,
    userInfo: {},
    hasUserInfo: false,
    // showModalStatus:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    houseworkList:[],
    houseworkBuffer:[],
    houseworkItemList:[],
    houseworkItem:'',
    weightItem:'',
    addInput:'',
    weightInput:''
  },
  goToPeople: function () {
    let housework = JSON.stringify(this.data.houseworkList);
    let userInfo = JSON.stringify(this.data.userInfo);
    wx.navigateTo({
      url: `../people/people?housework=${housework}&&userInfo=${userInfo}`,
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindblurInput: function (e) {
    switch(e.target.id){
      case 'houseworkInput':
       //输入家务项目
        let inputStr = e.detail.value;
        let houseworkSet = new Set(this.data.houseworkItemList);              
        if (houseworkSet.has(this.data.houseworkItem)) {
          wx.showToast({
            title: '该家务活已经存在',
            icon: 'none',
            duration: 2000
          })
        }else{
          if (inputStr !== '') {
            this.data.houseworkItem = inputStr;
          }
        }
        break;
      case 'weightInput':
      //输入家务权重
        let weightInputStr = e.detail.value;
        if(weightInputStr!==''){
          this.data.weightItem = weightInputStr;
        }
        break;
    }
  },
  bindtapButton:function(e){
    switch(e.target.id){
      case 'addItem':
        let houseworkSet = new Set(this.data.houseworkItemList);      
        if (this.data.houseworkItem === ''){
          wx.showToast({
            title: '请输入需要分配的项目',
            icon: 'none',
            duration: 1000
          })
        }else if (this.data.weightItem === ''){
          wx.showToast({
            title: '请输入家务权重',
            icon: 'none',
            duration: 1000
          })
        }
        if (this.data.houseworkItem !== '' && this.data.weightItem !== '') {
            houseworkSet.add(this.data.houseworkItem);
            this.data.houseworkItemList = [...houseworkSet];
            let newItem = { txt: this.data.houseworkItem, power: this.data.weightItem };
            this.data.houseworkBuffer.push(newItem);
            this.setData({
              houseworkList: this.data.houseworkBuffer.concat(),
              houseworkItem: '',
              weightItem: '',
              addInput: '',
              weightInput: ''
            })
        }       
        break;
      case 'next':
        // this.setData({
        //   showModalStatus:true
        // });
        this.goToPeople();
        break;
      case 'delete0':
      case 'delete1':
      case 'delete2':
      case 'delete3':
      case 'delete4':
      case 'delete5':      
        //删除已添加的家务活项目
        this.data.houseworkList.splice(parseInt(e.target.dataset.index), 1);
        this.data.houseworkBuffer.splice(parseInt(e.target.dataset.index), 1);
        this.setData({
          houseworkList:this.data.houseworkList,
          houseworkBuffer:this.data.houseworkBuffer
        });       
        break;
        // 弹窗
      // case 'closePopView':
      // case 'cancelShare':
      //   this.setData({
      //     showModalStatus:false
      //   });
      default:
        break;
    }
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      });
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  
})
