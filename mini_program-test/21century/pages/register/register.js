var util = require('../../utils/util.js');
var area = {};
var app = getApp();
var cityUrl = app.globalData.cityUrl;
var codeUrl = app.globalData.codeUrl;
var checkUrl = app.globalData.checkUrl;
var registerUrl = app.globalData.registerUrl;
var sign_key = app.globalData.sign_key;
var p = 0, c = 0,phoneNum=null,count = 60,codeTimer,gradeValue=0,provinceCode,cityCode;
var gradeArr = ['学前班','一年级','二年级','三年级','四年级','五年级','六年级','七年级','八年级','九年级','高一','高二','高三'];
var canSend = true;
Page({
  data:{
    cityArea:false,
    gradeArea:false,
    gradeData:[{value:0,name:'学前班'},{value:1,name:'一年级'},{value:2,name:'二年级'},{value:3,name:'三年级'},{value:4,name:'四年级'},
        {value:5,name:'五年级'},{value:6,name:'六年级'},{value:7,name:'七年级'},{value:8,name:'八年级'},{value:9,name:'九年级'},
        {value:10,name:'高一'},{value:11,name:'高二'},{value:12,name:'高三'}],
    grade:'学前班',
    provinceName:[],
    provinceCode: [],
    provinceSelIndex: '',
    cityName: [],
    cityCode: [],
    citySelIndex: '',
    area:'',
    showMessage: false,
    messageContent: '',
    saveStatus:false,
    sendStatus:false,
    codeText:'发送验证码',
    isIpx:app.globalData.isIpx?true:false,
    tranStatus:false,
  },
  onLoad:function(options){
      wx.hideShareMenu();
    // 载入时要显示再隐藏一下才能显示数据，如果有解决方法可以在issue提一下，不胜感激:-)
    // 初始化数据
    wx.request({
        url:cityUrl,
        success:res=>{
            console.log('city',res.data.data);
            area = res.data.data;
        this.setAreaData();
  }
    })
  },
  //  年级选择
    showGradepicker: function() {
        this.setData({gradeArea: true})
    },
    changeGrade:function (e) {
        gradeValue = e.detail.value[0];
        console.log(gradeValue);
        this.setData({grade:gradeArr[gradeValue]});
    },
    gradeHide:function () {
        this.setData({gradeArea: false})
    },
    //  地区选择
  setAreaData: function(p, c, d){
    var p = p || 0 // provinceSelIndex
    var c = c || 0 // citySelIndex
    // var d = d || 0 // districtSelIndex
    // 设置省的数据
    var province = area.province;
    var provinceName = [];
    var provinceCode = [];
    for (var item in province) {
      provinceName.push(province[item].province)
      provinceCode.push(province[item].provinceid);
    }
    this.setData({
      provinceName: provinceName,
      provinceCode: provinceCode
    })
    // 设置市的数据
      var city = [];
      var cityName = [];
      var cityCode = [];
      var cityFrom = [];
      for(var i in area.city){
        if(area.city[i].fatherid == provinceCode[p]){
          city.push(area.city[i]);
        }
      }
    for (var item in city) {
      cityName.push(city[item].city);
      cityCode.push(city[item].cityid);
      cityFrom.push(city[item].fatherid)
    }
    this.setData({
      cityName: cityName,
      cityCode: cityCode
    })
  },
  changeArea: function(e) {
    p = e.detail.value[0]
    c = e.detail.value[1]
    // d = e.detail.value[2]
    this.setAreaData(p, c)
  },
  showCitypicker: function() {
      console.log('show');
      this.setData({
      cityArea: true
    })
  },
  distpickerCancel: function() {
    this.setData({
      cityArea: false
    })
  },
  distpickerSure: function() {
    // this.setData({
    //   provinceSelIndex: p,
    //   citySelIndex: c,
    //   districtSelIndex: d
    // });
    // var p = this.data.provinceCode[p];
    var x = this.data.provinceName[p]+' '+this.data.cityName[c];
    var y = this.data.provinceCode[p]+' '+this.data.cityCode[c];
    this.setData({area:x});
    console.log(x);
    console.log(y);
    provinceCode = this.data.provinceCode[p];
    cityCode = this.data.cityCode[c];
    this.distpickerCancel()
  },
    //监听手机号码变化
    input_phoneNum:function (e) {
        phoneNum = e.detail.value;
    },
    countDow:function () {
            console.log(count);
            if(count==0){
                clearInterval(codeTimer);
                canSend = true;
                this.setData({sendStatus:false,codeText:'发送验证码'})
                count = 60;
            }else {
                count--;
                this.setData({codeText:'重新发送('+count+'s)'})
            }
    },
    sendCode:function (e) {
        if(canSend){
            var that = this;
            console.log(phoneNum);
            var telRule = /^1[3|4|5|7|8]\d{9}$/;
            if (!phoneNum || phoneNum == '') {
                this.showMessage('请输入手机号码');
            } else if (! telRule.test(phoneNum)) {
                this.showMessage('手机号格式不正确')
            }else {
                console.log(phoneNum);
                canSend = false;
                that.setData({sendStatus:true,codeText:'重新发送('+count+'s)'})
                codeTimer = setInterval(that.countDow,1000)
                var s = "phone"+phoneNum+sign_key;
                var sign = util.SHA256(s);
                var fd={phone:phoneNum,sign:sign};
                wx.request({
                    url:codeUrl,
                    // data:JSON.stringify(fd),
                    data:fd,
                    method:'POST',
                    header: {"Content-Type": "application/x-www-form-urlencoded"},
                    success:function (res) {
                        console.log(res);
                        if(res.data.code==200){
                        };
                    },
                    fail:function (res) {
                    }
                })
            }
        }
    },

    checkCode:function (e) {
        var _this = this;
    var data = e.detail.value;
    var telRule = /^1[3|4|5|7|8]\d{9}$/;
      if (data.tel == '') {
        this.showMessage('请输入手机号码');
      } else if (! telRule.test(data.tel)) {
        this.showMessage('手机号格式不正确')
      }else if (data.code.length<6) {
          this.showMessage('验证码至少6位')
      }else {
          var s = "code"+data.code+"phone"+data.tel+sign_key;
          var sign = util.SHA256(s);
          var fd={phone:data.tel,code:data.code,sign:sign};
          wx.request({
              url:checkUrl,
              // data:JSON.stringify(fd),
              data:fd,
              method:'POST',
              header: {"Content-Type": "application/x-www-form-urlencoded"},
              success:function (res) {
                  console.log(res);
                  if(res.data.code==200){
                      _this.setData({saveStatus:true})
                  }else{
                      _this.showMessage(res.data.msg);
                  };
              },
              fail:function (res) {
              }
          })

        // this.setData({saveStatus:true})
      }
  },
  savePersonInfo: function(e) {
      var _th = this;
    var data = e.detail.value;
    var telRule = /^1[3|4|5|7|8]\d{9}$/, nameRule = /^[\u2E80-\u9FFF]+$/;
    if (data.name == '') {
      this.showMessage('请输入姓名')
    } else if (! nameRule.test(data.name)) {
      this.showMessage('请输入中文名')
    } else if(data.name.length<2){
        this.showMessage('中文名最少2位')
    } else if (data.age == '') {
      this.showMessage('请输入年龄')
    } else if (data.age<=0) {
        this.showMessage('年龄必须大于0')
    } else if (data.area == '') {
      this.showMessage('请选择所在地区')
    }  else {
        this.setData({tranStatus:true})
        // console.log(phoneNum);
        // console.log(provinceCode);
        // console.log(cityCode);
        // console.log(data.name);
        // console.log(data.age);
        // console.log(gradeValue);
        var openid = wx.getStorageSync('openid');
        var s = "age"+parseInt(data.age)+"city"+cityCode+"grade"+gradeValue+"openid"+openid+"phone"+phoneNum+"province"+provinceCode+"username"+data.name+sign_key;
        var sign = util.SHA256(s);
        var fd={phone:phoneNum,age:parseInt(data.age),grade:gradeValue,openid:openid,city:cityCode,province:provinceCode,username:data.name,sign:sign};
        console.log(fd);
        wx.request({
            url:registerUrl,
            // data:JSON.stringify(fd),
            data:fd,
            method:'POST',
            header: {"Content-Type": "application/x-www-form-urlencoded"},
            success:function (res) {
                console.log(res);
                if(res.data.code==200){
                    // this.showMessage(' 保存成功');
                    wx.setStorageSync('phoneNum', phoneNum);
                    wx.setStorageSync('grade', gradeValue);
                    wx.redirectTo({
                      url: '../../pages/match/match'
                    })
                }else {
                    _th.showMessage(res.data.msg)
                    _th.setData({saveStatus:false,tranStatus:false});
                };
            },
            fail:function (res) {
                _th.setData({tranStatus:false})
            }
        })
      // wx.navigateTo({
      //   url: '../../pages/index/index'
      // })
    }
  },
  showMessage: function(text) {
    var that = this
    that.setData({
      showMessage: true,
      messageContent: text
    })
    setTimeout(function(){
      that.setData({
        showMessage: false,
        messageContent: ''
      })
    }, 2500)
  },
  onUnload:function () {
      clearInterval(codeTimer);
      this.setData({sendStatus:false,codeText:'发送验证码'})
      count = 60;
      phoneNum = '';
  },
  onShow:function () {
      this.setData({tranStatus:false})
  }
})