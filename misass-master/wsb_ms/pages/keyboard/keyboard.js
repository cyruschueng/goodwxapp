// keyboard.js
var checkNetWork = require('../../utils/CheckNetWork.js');
Page({
  /**
   * 页面的初始数据
   * keyboard1:首页键盘,显示省的简称
   * keyboard2:第二页键盘，显示数字和大写字母
   */
  data: {
    isKeyboard: false, //是否显示键盘
    noneKeyboard: false, //是否显示键盘
    isKeyHangboard:false,
    specialBtn: false,
    specialBtnHang:false,
    tapNum: false, //数字键盘是否可以点击
    parkingData: false, //是否展示剩余车位按钮
    isFocus: false, //输入框聚焦
    flag: false, //防止多次点击的阀门
    phoneNumber: '0379-60201137',
    keyboardNumber: '1234567890',
    keyboardAlph: 'QWERTYUIOPASDFGHJKL巛ZXCVBNM',
    keyboard1:
    '京津沪冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤川青藏琼宁渝',
    keyboard2: '',
    keyboard2For: ['完成'],
    keyboardValue: '',
    keyboardHangValue: '',
    textArr: [],      //正车牌
    textHangArr:[],   //挂车牌
    noneHangArr:[],   //无挂正车牌
    textValue: '',    //车牌值
    textHangValue:'',  //挂号车牌值
    noneHangValue:'',  //无挂车牌值
    _btn:false,
    _haveHang:true,   //判断是有挂还是无挂界面
    carnonenum:'',
    carnum:'',
    carhangnum:''
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    if (!checkNetWork.checkNetWorkStatu()) {
      console.log('网络错误');
      return false;
    } else {
      // console.log(0)
    }
  },
  /**
   * 输入框显示键盘状态
   */
  showKeyboard: function () {
    var self = this;
    self.setData({
      isFocus: true,
      isKeyboard: true
    });
  },
  /**
   * 点击页面隐藏键盘事件
   */
  hideKeyboard: function () {
    var self = this;
    if (self.data.isKeyboard) {
      //说明键盘是显示的，再次点击要隐藏键盘
      if (self.data.textValue) {
        self.setData({
          isKeyboard: false
        });
      } else {
        self.setData({
          isKeyboard: false,
          isFocus: false
        });
      }
    }
  },
  /***********有挂状态开始***********************/
  /**
   * 输入框聚焦触发，显示键盘
   */
  bindFocus: function () {
    var self = this;
    if (self.data.isKeyboard) {
      //说明键盘是显示的，再次点击要隐藏键盘
      self.setData({
        isKeyboard: false,
        isFocus: true,
      });
    } else {
      //说明键盘是隐藏的，再次点击显示键盘
      self.setData({
        isFocus: true,
        isKeyboard: true,
        isKeyHangboard:false
      });
    }
  },

  /**
 * 输入框聚焦触发，显示键盘
 */
  hangFocus: function (e) {
    var self = this;
  
    if (self.data.isKeyHangboard) {
      //说明键盘是显示的，再次点击要隐藏键盘
      self.setData({
        isKeyHangboard: false,
        isFocus: true,
      });
    } else {
      //说明键盘是隐藏的，再次点击显示键盘
      self.setData({
        isFocus: true,
        isKeyHangboard: true
      });
    }
  },
  /**
   * 键盘事件
   */
  tapKeyboard: function (e) {
    var self = this;
    //获取键盘点击的内容，并将内容赋值到textarea框中
    var tapIndex = e.target.dataset.index;
    var tapVal = e.target.dataset.val;
    var keyboardValue;
    var specialBtn;
    var tapNum;
    if (tapVal == '巛') {
      //说明是删除
      self.data.textArr.pop();
      if (self.data.textArr.length == 0) {
        this.specialBtn = false;
        this.tapNum = false;
        this.keyboardValue = self.data.keyboard1;
      }

      self.setData({
        textArr: self.data.textArr
      })
      self.data.textValue = self.data.textArr.join('');
      self.setData({
        textValue: self.data.textValue,
        keyboardValue: this.keyboardValue,
        specialBtn: this.specialBtn,
        tapNum: this.tapNum
      });
      return false;
    }
    if (self.data.textArr.length == 0) {
      //说明没有数据了，返回到省份选择键盘
      this.specialBtn = false;
      this.tapNum = false;
      this.keyboardValue = self.data.keyboard1;
    } else if (self.data.textArr.length == 1) {
      //只能输入字母
      this.tapNum = false;
      this.specialBtn = true;
      this.keyboardValue = self.data.keyboard2;
    } else {
      this.specialBtn = true;
      this.tapNum = true;
      this.keyboardValue = self.data.keyboard2;
    }
    if (self.data.textArr.length >= 7) {
      self.setData({
        isKeyboard:false
      })
      return false;
    }else{
      self.setData({
        isKeyboard: true
      })
    }
    self.data.textArr.push(tapVal);
    self.data.textValue = self.data.textArr.join('');
    self.setData({
      textValue: self.data.textValue,
      keyboardValue: self.data.keyboard2,
      specialBtn: true,
      textArr: self.data.textArr
    });
    if (self.data.textArr.length > 1) {
      //展示数字键盘
      self.setData({
        tapNum: true
      });
    }
  },


  /*挂的键盘*/
  hangboard:function(e){
    var self = this;
    //获取键盘点击的内容，并将内容赋值到textarea框中
    var tapIndex = e.target.dataset.index;
    var tapVal = e.target.dataset.val;
    var keyboardHangValue;
    var specialBtnHang;
    var tapNum;
    if (tapVal == '巛') {
      //说明是删除
      self.data.textHangArr.pop();
      self.setData({
        textHangArr: self.data.textHangArr
      })
      if (self.data.textHangArr.length == 0) {
        //说明没有数据了，返回到省份选择键盘
        this.specialBtnHang = false;
        this.tapNum = false;
        this.keyboardHangValue = self.data.keyboard1;
      } else if (self.data.textHangArr.length == 1) {
        //只能输入字母
        this.tapNum = false;
        this.specialBtnHang = true;
        this.keyboardHangValue = self.data.keyboard2;
      } else {
        this.specialBtnHang = true;
        this.tapNum = true;
        this.keyboardHangValue = self.data.keyboard2;
      }
      self.data.textHangValue = self.data.textHangArr.join('');
      self.setData({
        textHangValue: self.data.textHangValue,
        keyboardHangValue: this.keyboardHangValue,
        specialBtnHang: this.specialBtnHang,
        tapNum: this.tapNum
      });
      return false;
    }
   
    if (self.data.textHangArr.length >= 6) {
      self.setData({
        isKeyHangboard: false
      })
      return false;
    }else{
      self.setData({
        isKeyHangboard: true
      })
    }
    self.data.textHangArr.push(tapVal);
    self.data.textHangValue = self.data.textHangArr.join('');
    self.setData({
      textHangValue: self.data.textHangValue,
      keyboardHangValue: self.data.keyboard2,
      specialBtnHang: true,
      textHangArr: self.data.textHangArr
    });
    if (self.data.textHangArr.length > 1) {
      //展示数字键盘
      self.setData({
        tapNum: true
      });
    }
  },
  /**
   * 特殊键盘事件（删除和完成）
   */
  tapSpecBtn: function (e) {
    var self = this;
    console.log(self.data.textArr)
   
    var btnIndex = e.target.dataset.index;
    if (btnIndex == 0) {
      //说明是完成事件
      if (self.data.textArr.length < 7) {
      }
    }
  },
  //挂的删除 
  tapHangSpecBtn: function (e) {
    var self = this;
    console.log(self.data.textHangArr)
    var btnIndex = e.target.dataset.index;
    if (btnIndex == 0) {
      //说明是完成事件
    
    }
  },
 /***********有挂状态结束***********************/

 /***********无挂状态开始***********************/
  /**
    * 输入框聚焦触发，显示键盘
    */
  noneHangFocus: function () {
    var self = this;
    if (self.data.noneKeyboard) {
      //说明键盘是显示的，再次点击要隐藏键盘
      self.setData({
        noneKeyboard: false,
        isFocus: true,
      });
    } else {
      //说明键盘是隐藏的，再次点击显示键盘
      self.setData({
        isFocus: true,
        noneKeyboard: true
      });
    }
  },
  /**
   * 键盘事件
   */
  noneKeyboard: function (e) {
    var self = this;
    //获取键盘点击的内容，并将内容赋值到textarea框中
    var tapIndex = e.target.dataset.index;
    var tapVal = e.target.dataset.val;
    var keyboardValue;
    var specialBtn;
    var tapNum;
    if (tapVal == '巛') {
      //说明是删除
      self.data.noneHangArr.pop();
      if (self.data.noneHangArr.length == 0) {
        this.specialBtn = false;
        this.tapNum = false;
        this.keyboardValue = self.data.keyboard1;
      }

      self.setData({
        noneHangArr: self.data.noneHangArr
      })
      self.data.noneHangValue = self.data.noneHangArr.join('');
      self.setData({
        noneHangValue: self.data.noneHangValue,
        keyboardValue: this.keyboardValue,
        specialBtn: this.specialBtn,
        tapNum: this.tapNum
      });
      return false;
    }
    if (self.data.noneHangArr.length == 0) {
      //说明没有数据了，返回到省份选择键盘
      this.specialBtn = false;
      this.tapNum = false;
      this.keyboardValue = self.data.keyboard1;
    } else if (self.data.noneHangArr.length == 1) {
      //只能输入字母
      this.tapNum = false;
      this.specialBtn = true;
      this.keyboardValue = self.data.keyboard2;
    } else {
      this.specialBtn = true;
      this.tapNum = true;
      this.keyboardValue = self.data.keyboard2;
    }
    if (self.data.noneHangArr.length >= 7) {
      self.setData({
        noneKeyboard: false
      })
      return false;
    } else {
      self.setData({
        noneKeyboard: true
      })
    }
    self.data.noneHangArr.push(tapVal);
    self.data.noneHangValue = self.data.noneHangArr.join('');
    self.setData({
      noneHangValue: self.data.noneHangValue,
      keyboardValue: self.data.keyboard2,
      specialBtn: true,
      noneHangArr: self.data.noneHangArr
    });
    if (self.data.noneHangArr.length > 1) {
      //展示数字键盘
      self.setData({
        tapNum: true
      });
    }
  },
  /*点击有挂*/
  haveHang: function (e) {
    this.setData({
      _btn: false,
      _haveHang: true,
      noneHangArr: [],   //无挂正车牌
    })
  },
  /*点击无挂*/
  noneHang: function (e) {
    this.setData({
      _btn: true,
      _haveHang: false,
      textArr: [],      //正车牌
      textHangArr: [],   //挂车牌,
    })
  }, 

  //点击完成
  tapNoneSpecBtn: function (e) {
    var self = this;
    console.log(self.data.noneHangArr)
    var btnIndex = e.target.dataset.index;
    if (btnIndex == 0) {
      //说明是完成事件
      if (self.data.noneHangArr.length < 7) {
      }
    }
  },
  carResult: function (e) {
    var self = this;
    let carNumber = '';
    let carNum = self.data.textValue;             //有挂正牌
    let carHangNum = self.data.textHangValue;     //挂牌
    let carNoneNumber = self.data.noneHangValue;  //单车牌
    if (carNum){
      if (carHangNum){
          carNumber = carNum + '挂' + carHangNum;
      }else{
        console.log('请填入挂车牌');
        return false;
      }
    }else{
      if (carNoneNumber){
        carNumber = carNoneNumber
      }
    }
    console.log(carNumber)
    // var carNumber = event.currentTarget.dataset.carNumber;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];  //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      carNumber: carNumber
    })
    wx.navigateBack();
  },
  //取消
  carCancel: function (e) {
    var self = this;
    wx.navigateBack({})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var self = this;
    //将keyboard1和keyboard2中的所有字符串拆分成一个一个字组成的数组
    self.data.keyboard1 = self.data.keyboard1.split('');
    self.data.keyboard2 = self.data.keyboard2.split('');
    self.setData({
      keyboardValue: self.data.keyboard1,
      keyboardHangValue: self.data.keyboard1
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var self = this;
    self.setData({
      flag: false
    });
  },





  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
});
