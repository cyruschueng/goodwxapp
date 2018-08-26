// pages/warn/warn.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkboxValue:[],//故障类型数组
    btnBgc:'',//提交按钮的景色，未勾选类型时无颜色
    picUrls:[],//故障车周围环境路径数组
    actionText:"拍照/照相",
    itemsValue:[
      {
        checked:false,
        value:"私锁私用"
      },
      {
        checked:false,
        value:"车牌缺损"
      },
      {
        checked:false,
        value:"轮胎坏了"
      },
      {
        checked:false,
        value:"车锁坏了"
      },
      {
        checked:false,
        value:"违规乱停"
      },
      {
        checked:false,
        value:"密码不对"
      },
      {
        checked:false,
        value:"刹车坏了"
      },
      {
        checked:false,
        value:"其他故障"
      }
    ],
  },
  //勾选故障类型，获取类型值存入checkboxValue
  checkboxChange: function(e){
    let _values = e.detail.value;
    if(_values.length == 0){
      this.setData({
        checkboxValue:[],
        btnBgc:''
      })
    }else{
      this.setData({
        checkboxValue:_values,
        btnBgc:"limegreen"
      })
    }
  },
  //选择故障车周围环境图拍照或选择相册
  bindCamera: function () {
    wx.chooseImage({
      count:4,
      sizeType:['original','compressed'],
      sourceType:['album','camera'],
      success:(res)=>{
        let tfps = res.tempFilePaths;
        let _picUrls = this.data.picUrls;
        for(let item of tfps){
          _picUrls.push(item);
          this.setData({
            picUrls:_picUrls,
            actionText:"+"
          });
        }
      }
    })
  },
  //删除故障车周围环境图
  delPic:function(e){
    let index = e.target.dataset.index;
    let _picUrls = this.data.picUrls;
    _picUrls.splice(index,1);
    this.setData({
      picUrls:_picUrls
    })
  },
  //提交到服务器
  formSubmit:function(e){
    if(this.data.checkboxValue.length >0){
      wx.showLoading({
        title: '上传服务器...'
      });
      setTimeout(function(){
        wx.hideLoading();
        wx.showToast({
          title: '提交成功'
        });
      },1000);
      setTimeout(function () {
        wx.hideToast();
      }, 2000);
    }else{
      wx.showModal({
        title:"提示",
        content:"请选择故障原因！",
        confirmText:'确定',
        cancelText:'取消',
        success:(res)=>{
          if(res.confirm){
          }else{
            wx.navigateBack({
              delta:1//回退前detal（默认为1）页面
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})