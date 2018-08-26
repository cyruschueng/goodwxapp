//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 1,
    userInfo: {},
    housework:'',
    showModalStatus: false,
    peopleList: [],
    peopleListBuffer:[],
    peopleName:'',
    addInput: '',
  },
  
  //事件处理函数
  goBackToHome:function(){
    wx.navigateBack({
      delta:1
    });
  },
  goToResult:function(){
    let housework = this.data.housework;
    let peopleList = this.data.peopleList.join(',');
    wx.navigateTo({
      url: `../result/result?housework=${housework}&&peopleList=${peopleList}`,
    })
  },
  bindblurInput: function (e) {
    switch (e.target.id) {
      case 'peopleInput':
        //输入人员姓名
        let peopleListSet = new Set(this.data.peopleListBuffer);
        this.data.peopleName = e.detail.value;   
        console.log(this.data.peopleName);     
        if (peopleListSet.has(this.data.peopleName)) {
          wx.showToast({
            title: '该人员已经存在',
            icon: 'none',
            duration: 2000
          })
        } else {
          if (this.data.peopleName !== '') {
            peopleListSet.add(this.data.peopleName);
            this.data.peopleListBuffer=[...peopleListSet];
          }else{
            wx.showToast({
              title: '请输入人员姓名',
              icon:'none',
              duration:2000
            })
          }
        }
        break;
    }
  },
  bindtapButton: function (e) {
    switch (e.target.id) {
      case 'addItem':
        if (this.data.peopleName === '') {
          wx.showToast({
            title: '请输入人员姓名',
            icon: 'none',
            duration: 1000
          })
        }else{
          this.setData({
            peopleList: this.data.peopleListBuffer.concat(),
            peopleName:'',
            addInput:''
          })
        }
        break;
      case 'next':
        this.goToResult();
        break;
      case 'prev':
        this.goBackToHome();
        break;
      case 'delete0':
      case 'delete1':
      case 'delete2':
      case 'delete3':
      case 'delete4':
      case 'delete5':
        //删除已添加的家务活项目
        this.data.peopleList.splice(parseInt(e.target.dataset.index), 1);
        this.data.peopleListBuffer.splice(parseInt(e.target.dataset.index), 1);
        this.setData({
          peopleList: this.data.peopleList,
          peopleListBuffer: this.data.peopleListBuffer
        });
        break;
        //弹窗部分
      // case 'closePopView':
      // case 'cancelShare':
        // this.setData({
        //   showModalStatus: false
        // });
      default:
        break;
    }
  },
  onLoad: function (options) {
   this.setData({
     userInfo: JSON.parse(options.userInfo),
     housework: options.housework
   })
  },
})
