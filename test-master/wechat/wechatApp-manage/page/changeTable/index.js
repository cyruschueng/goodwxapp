
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     active:'',
     oldDeskId:'',
     List:'' //餐桌列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '换桌'
    })
    this.setData({
      oldDeskId: options.id
    })
    this.idleList()
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  queryList(e){
    this.idleList(e.detail.value)
  },

  //查询列表
  idleList(deskNo, deskTypeId){

    var subdata= {};

    if (deskNo){
      subdata.deskNo = deskNo
    }
    if (deskTypeId) {
      subdata.deskTypeId = deskTypeId
    }

    app.commonAjax('/shop/manage/table/idleList', ['shopId'], subdata, (res) => {

      this.setData({
        List:res.data.data
      })
      
    }, app, 'get')
  },

  //提交修改
  changeTable(){

    var subdata = {};

    subdata.oldDeskId = this.data.oldDeskId
    subdata.newDeskId = this.data.active

    if (subdata.newDeskId != ''){
      app.commonAjax('/shop/manage/table/changeTable', ['shopId'], subdata, (res) => {

        if (res.data.code == 0) {
          this.setData({
            active: ''
          })
          if (getCurrentPages()[1].route == 'page/tableManagement/index') {
            getCurrentPages()[1].onshow_boton()
          }
          wx.showToast({
            title: '换桌成功！',
            icon: 'success',
            duration: 1000,
            success:()=>{
              setTimeout(()=>{
                wx.navigateBack({
                  delta: 1
                })
              },1000)
            }
          })

        }

      }, app, 'post')
    }else{
      wx.showToast({
        title: '请选择一个新桌号',
        image: '/image/i/x.png',
        duration: 2000
      })
    }

    
  },

   radioChange: function (e) {
    this.setData({
      active: e.currentTarget.dataset.id
    })
  }
})