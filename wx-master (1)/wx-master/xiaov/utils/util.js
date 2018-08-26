 function formatTime(date) {  
var year = date.getFullYear()
var month = date.getMonth() + 1
var day = date.getDate()

var hour = date.getHours()
var minute = date.getMinutes()
var second = date.getSeconds()

return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')  
} 
  
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function header(that, nickName, avatarUrl, uid) {
  wx.getUserInfo({
    success: function (res) {
      console.log(res.userInfo)
      that.setData({
        userData: res.userInfo,
        nickName: res.userInfo.nickName,
        avatarUrl: res.userInfo.avatarUrl,
        // uid: wx.setStorageSync("uid", res.userInfo)
      })
      console.log(that.data.nickName)
      console.log(that.data.avatarUrl)
      wx.setStorageSync("nickName", res.userInfo.nickName)
      wx.setStorageSync("avatarUrl", res.userInfo.avatarUrl)
      that.setData({
        uid: wx.getStorageSync("uid")
      })
    },
  })
}

//发送验证码
function sendCode(that,phone ,disa,getBtnText){ 
  var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;  //手机验证正则
  //请求参数*
  var str = {
    "OperationType": "10001",
    "mobile": phone
  }
  console.log(phone)
  console.log(myreg.test(phone))
  if (myreg.test(phone)) {
     var time = 90
    var inter = setInterval(function () {
      that.setData({
        getBtnText: time + "s后重新发送",
        disa: true
      })
      time--;
      if (time < 0) {
        time = 1
        clearInterval(inter)
        that.setData({
          getBtnText: "获取短信验证码",
          disa: false
        })
      }
    }, 1000)
    
    //发起请求*
    wx.request({
      
      url: "",
      data: str,
      method: 'POST',
      header: { "content-type": "application/json" },
      success: function (res) {
        console.log(10001)
        console.log(res)
        if(res.data.CODE=="00"){
          wx.showToast({
            title: '发送成功',
            image: '../../images/icon/s.png',
            duration: 1000
          })
        }
      }
    })
  } else {
    wx.showToast({
      title: '手机格式不正确',
      image: '../../images/icon/f.png',
      duration: 1000
    })
  }
}

//查询开户银行
function queryBank(that, card, valueBankName, acctType){
  var card1 = card.slice(0, 6);
  console.log(card1);
  //请求参数*
  var str = {
    "OperationType": "10014",
    "binNum": card1
  };
 
    if (card1) {
      //发起请求*
      wx.request({
        url: "",
        data: str,
        method: 'POST',
        header: { "content-type": "application/json" },
        success: function (res) {
          console.log(res)
          if(res.data.CODE=="00"){
            that.setData({
              valueBankName: res.data.bankName,
              acctType: res.data.cardType
            })
  
            wx.setStorageSync("depositBank", res.data.cardType)
          }else{
            wx.showToast({
              title: res.data.MESSAGE,
              image: '../../images/icon/f.png',
              duration: 1000
            })
          }
        }
      })
    }
  
}


//添加信用卡
function addCard(that,uid, card, acctType, tele, cvn, date, arr1, arr2, bankName, showModalStatus, wallets_password_flag){
  // var str = {
  //   "OperationType": "10021",
  //   "uid": uid,
  //   "acctNo": card,
  //   "acctType": acctType,
  //   "phoneNo": tele,
  //   "cvn2": cvn,
  //   "expDate": date,
  //   "zd_date": arr1,
  //   "hk_date": arr2,
  //   "bankName": bankName
  // };

  // console.log(uid);
  // console.log(card);
  // console.log(acctType);
  // console.log(tele);
  // console.log(cvn);
  // console.log(date);
  // console.log(arr1);
  // console.log(arr2);
  // console.log(bankName);

  // var reg = /^(\d{16}|\d{19})$/;
  // var bool = (reg.test(that.data.card));

  // if (bool) {
  //   //发起请求*
  //   wx.request({
      
  //     url: "",
  //     data: str,
  //     method: 'POST',
  //     header: { "content-type": "application/json" },
  //     success: function (res) {
  //       console.log(10021)
  //       console.log(res)
  //       if (res.data.CODE == '00') {
  //         that.setData({
  //           showModalStatus: false,
  //           wallets_password_flag: false
  //         })
  //         wx.redirectTo({
  //           url: '../card/card'
  //         })
  //       } else {
  //         wx.showToast({
  //           title: '添加失败',
  //           image: "../../images/icon/f.png",
  //           duration: 1000,
  //           mask: true,
  //         })
  //       }
  //     }
  //   })
  // } else {
  //   wx.showToast({
  //     title: '请输入正确卡号',
  //     image: "../../images/icon/f.png",
  //     duration: 1500,
  //     mask: true,
  //   })
  // }
}

//查询个人详情
function personaInfo(that, uid, userData, display, phone,mer,show){
  //获取个人信息
  var str = {
    "OperationType": "10020",
    "uid":uid
  }
  //发起请求*
  wx.request({
    url: "",
    data: str,
    method: 'POST',
    header: { "content-type": "application/json" },
    success: function (res) {
      console.log(10020)
      console.log(res)
      console.log(res.data.ID)
      if (res.data.ID) {
        that.setData({
          display: true,
          userData: res.data,
          phone: res.data.username
        })

        if (res.data.bank.substring(0, 2) == "平安") {
          res.data.r = 230
          res.data.g = 150
          res.data.b = 46
          res.data.a = 0.6

        } else if (res.data.bank.substring(0, 2) == "农业" || res.data.bank.substring(0, 2) == "民生" || res.data.bank.substring(0, 2) == "邮政") {
          res.data.r = 35
          res.data.g = 98
          res.data.b = 95
          res.data.a = 0.8
        } else if (res.data.bank.substring(0, 2) == "建设" || res.data.bank.substring(0, 2) == "交通" || res.data.bank.substring(0, 2) == "兴业" || res.data.bank.substring(0, 2) == "浦发") {
          res.data.r = "58"
          res.data.g = "94"
          res.data.b = "148"
          res.data.a = "0.6"
        } else {
          res.data.r = 183
          res.data.g = 57
          res.data.b = 70
          res.data.a = 0.6
        }
        console.log("res")
        console.log()
        //缓存数据，后期看看能不能每一页的数据能不能push到对应的一个数组里面，
        wx.setStorageSync("userData", res.data)
        wx.setStorageSync("userBankName", res.data.bank)
        wx.setStorageSync("userBankId", res.data.bankCard)

        wx.setStorageSync("phone", res.data.username)
        wx.setStorageSync("display", that.data.display)
        if (res.data.sort == "Mer") {
          that.setData({
            mer: "普通会员"
          })
        }
        if (res.data.sort == "Agpro") {
          that.setData({
            mer: "A级代理"
          })
        }
        if (res.data.sort == "Agcity") {
          that.setData({
            mer: "B级代理"
          })
        }
        if (res.data.sort == "Agcount") {
          that.setData({
            mer: "C级代理"
          })
        }
        wx.setStorageSync("mer", that.data.mer)
      }
    }
  })
}

//公告栏
function notice(that,banners){
  //请求参数*
  var str = {
    "OperationType": "10043"
  }

  //发起请求*
  wx.request({
    // url: "http://ppp.zhybpay.com:94/ashx/XYK_Server.ashx",
    url: "",
    data: str,
    method: 'POST',
    header: { "content-type": "application/json" },
    success: function (res) {
      console.log(res)
      console.log(res.data.data)
      if (res.data.CODE == "00") {
        that.setData({
          banners: res.data.data
        })
      }
      console.log(that.data.banners)
    }
  })
}

//借款订单列表 10028
function BorrowList(that, uid, page, term, level,num, money, detailOrder){
  var str = {
    "OperationType": "10028",
    "uid": uid,
    "page": page,
    "term": term,
    "level": level,
  }
  console.log(uid)
  console.log(page)
  console.log(term)
  console.log(level)
  //发起请求*
  wx.request({
    url: "",
    data: str,
    method: 'POST',
    header: { "content-type": "application/json" },
    success: function (res) {
      console.log(10028)
      console.log(res)
      console.log(res.data.data)
      if (res.data.CODE == "00") {
        that.setData({
          num: res.data.totalNumber,  //当月笔数
          money: res.data.totalMoney,//当月金额
          detailOrder:res.data.data
        })
        wx.setStorageSync("borrowList", res.data)
        wx.setStorageSync("num", res.data.totalNumber)
        wx.setStorageSync("money", res.data.totalMoney)
        // wx.setStorageSync("mothTotalMoney", res.data.mothTotalMoney)
      }
    }
  })
}

//查询下级列表
function subordinateList(that, uid, pro,city,count,mer,page){
  var str = {
    "OperationType": "10016",
    "uid": uid,
    "sort": "All",
    "state": 6,
    "page": page
  }

  //发起请求*
  wx.request({
    url: "",
    data: str,
    method: 'POST',
    header: { "content-type": "application/json" },
    success: function (res) {
      console.log("hhh")
       console.log(10036)
       console.log(res)
      if (res.data.CODE == "00") {
        //成功缓存在本地会员代理
        var arrPro = [],
          arrCity = [],
          arrCount = [],
          arrMer = [];
        var length = res.data.data.length;
        for (var i = 0; i < length; i++) {
          if (res.data.data[i].sort == "Mer") {
            arrMer.push(res.data.data[i])
          }
          if (res.data.data[i].sort == "Agpro") {
            arrPro.push(res.data.data[i])
          }
          if (res.data.data[i].sort == "Agcity") {
            arrCity.push(res.data.data[i])
          }
          if (res.data.data[i].sort == "Agcount") {
            arrCount.push(res.data.data[i])
          }
        }
        // console.log(res.data.data.length)
        that.setData({
          pro: arrPro,
          city: arrCity,
          count: arrCount,
          mer: arrMer,
          // user: [
          //   {
          //     img: '../../images/areaLogo/province.png',
          //     title: "A级代理",
          //     rate: "0.55%",
          //     num: arrPro.length
          //   },
          //   {
          //     img: '../../images/areaLogo/city.png',
          //     title: "B级代理",
          //     rate: "0.61%",
          //     num: arrCity.length
          //   },
          //   {
          //     img: '../../images/areaLogo/county.png',
          //     title: "C级代理",
          //     rate: "0.7%",
          //     num: arrCount.length
          //   },
          //   {
          //     img: '../../images/areaLogo/member.png',
          //     title: "普通会员",
          //     rate: "1.0%",
          //     num: arrMer.length
          //   },
          // ]
        })
      }
    }
  })
}

//提现列表
function WithdrawalList(that, uid, page, listData){
  //提现列表
  var str = {
    "OperationType": "10030",
    "uid": uid,
    "page": page
  };
  //发起请求*
  wx.request({
    url: "",
    data: str,
    method: 'POST',
    header: { "content-type": "application/json" },
    success: function (res) {
      console.log(10030)
      console.log(res)
      that.setData({
        listData: res.data.data,
      })
    }
  })
}

//信用卡列表 10022
function cardList(that, uid, list, cardId){
  var str = {
    "OperationType": "10022",
    "uid": uid
  }
  //发起请求*
  wx.request({
    url: "",
    data: str,
    method: 'POST',
    header: { "content-type": "application/json" },
    success: function (res) {
      console.log(10022)
      console.log(res)
      if (res.data.CODE == '00') {
        that.setData({
          list: res.data.data
        })

        if (res.data.data.length) {
          var cardId = [];
          var len = res.data.data.length;
          for (var i = 0; i < len; i++) {

            cardId.push(res.data.data[i].acctNo)
            if (res.data.data[i].state == 0) {
              res.data.data[i].state = "未申请"
            } else if (res.data.data[i].state == 1) {
              res.data.data[i].state = "还款中"
            } else if (res.data.data[i].state == 2) {
              res.data.data[i].state = "还款完成"
            } else if (res.data.data[i].state == 3) {
              res.data.data[i].state = "还款异常"
            } else if (res.data.data[i].state == 4) {
              res.data.data[i].state = "拉黑"
            }

            if (res.data.data[i].bankName.substring(0, 2) == "平安") {
              res.data.data[i].r = 230
              res.data.data[i].g = 150
              res.data.data[i].b = 46
              res.data.data[i].a = 0.6

            } else if (res.data.data[i].bankName.substring(0, 2) == "农业" || res.data.data[i].bankName.substring(0, 2) == "民生" || res.data.data[i].bankName.substring(0, 2) == "邮政") {
              res.data.data[i].r = 35
              res.data.data[i].g = 98
              res.data.data[i].b = 95
              res.data.data[i].a = 0.8
            } else if (res.data.data[i].bankName.substring(0, 2) == "建设" || res.data.data[i].bankName.substring(0, 2) == "交通" || res.data.data[i].bankName.substring(0, 2) == "兴业" || res.data.data[i].bankName.substring(0, 2) == "浦发") {
              res.data.data[i].r = "58"
              res.data.data[i].g = "94"
              res.data.data[i].b = "148"
              res.data.data[i].a = "0.6"
            } else {
              res.data.data[i].r = 183
              res.data.data[i].g = 57
              res.data.data[i].b = 70
              res.data.data[i].a = 0.6
            }


          }
          var cardId = mask(cardId, len)
          console.log(cardId)
          function mask(cardId, len) {
            var arr = [];
            for (var j = 0; j < len; j++) {
              var str = cardId[j];
              var reg = /^(\d{4})\d+(\d{4})$/;
              str = str.replace(reg, "$1****$2");
              arr.push(str);
            }
            return arr
          }
          that.setData({
            cardId: cardId,
            list: res.data.data
          })
          wx.setStorageSync("cardList", res.data.data)
          wx.setStorageSync("cardId", that.data.cardId)
        } else {
          wx.removeStorageSync("listIndex")
        }
      }
    }
  })
}

//删除信用卡10023
function removeCard(that, list, Index, cardId){
  var str = {
    "OperationType": "10023",
    "cardid": list[Index].id
  }
  //发起请求*
  wx.request({
    url: "",
    data: str,
    method: 'POST',
    header: { "content-type": "application/json" },
    success: function (res) {
      console.log(10023)
      console.log(res)
      if (res.data.CODE == "00") {
        //删除点击的信用卡

        var len = wx.getStorageSync("cardList").length;
        var newCardList = [];
        var newCardId = [];
        for (var i = 0; i < len; i++) {
          if (i != Index) {
            newCardList.push(wx.getStorageSync("cardList")[i])
            newCardId.push(wx.getStorageSync("cardId")[i])
          }
        }
        wx.setStorageSync("cardList", newCardList)
        wx.setStorageSync("cardId", newCardId)
        that.setData({
          list: wx.getStorageSync("cardList"),
          cardId: wx.getStorageSync("cardId")
        })

        console.log(Index)
        console.log(wx.getStorageSync("cardList").slice(Index))
        console.log(wx.getStorageSync("cardId").splice(Index))
        wx.showToast({
          title: res.data.MESSAGE,
          duration: 1000,
          mask: true,
        })
        that.onLoad();
        that.onShow()
      } else {
        wx.showToast({
          title: res.data.MESSAGE,
          duration: 1000,
          mask: true,
        })
      }
    }
  })
}
//密码登陆10008
function login(that,name,password,mdPwd){
  var myreg = /^1[3-8]\d{9}$/; //手机验证正则
  var str = {
    "OperationType": "10008",
    'username': name,
    'pwd': mdPwd
  }
  if (myreg.test(name) && password) {
    wx.request({
      url: "",
      data: str,
      method: 'POST',
      header: { "content-type": "application/json" },
      success: function (res) {
        console.log(res)
        if (res.data.CODE === "00") {
          //var arr = [];
          wx.clearStorageSync()
          wx.setStorageSync('uid', res.data.id);
          wx.setStorageSync('realName', res.data.realname);
          wx.setStorageSync('IsPayPwd', res.data.IsPayPwd);
          wx.showToast({
            title: '登陆成功',
            image: '../../images/icon/s.png',
            duration: 1000
          })

          var skip = setTimeout(function () {
            wx.switchTab({
              url: '../index/index'
            })
          }, 1000);
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.MESSAGE+"请确认后再次输入",
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
    })
  } else if (!that.data.password) {
    wx.showToast({
      title: '请填写完整信息',
      image: '../../images/icon/f.png',
      duration: 1000
    })
  }
}

//验证验证码+修改密码
function VerificationCode(that,phone,code,password,password1,mdPwd){
  //验证验证码
  var str = {
    "OperationType": "10002",
    "phone":phone,
    "code": code,
  }

  if (code && phone && password && password1) {
    if (password == password1) {
      wx.request({
        url: "",
        data: str,
        method: 'POST',
        header: { "content-type": "application/json" },
        success: function (res) {
          console.log(res)
          console.log(10002)
          if(res.data.CODE=="00"){
            amend(mdPwd);
          }else{
            wx.showToast({
              title: '请输入正确验证码',
              image: '../../images/icon/f.png',
              duration: 1000
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '两次密码不一致',
        image: '../../images/icon/f.png',
        duration: 1000
      })
    }
  } else {
    wx.showToast({
      title: '信息不完整',
      image: '../../images/icon/f.png',
      duration: 1000
    })
  }
}

//分润列表 10032
function profitsList(that, uid, page, profit){

  var str = {
    'OperationType': '10032',
    "uid": uid,
    "page": page
  }

  wx.request({
    url: "",
    data: str,
    method: 'POST',
    header: { "content-type": "application/json" },
    success: function (res) {
      console.log(10032)
      console.log(res)
      that.setData({
        profit: res.data.data
      })
      console.log(profit)
    }
  })
}

//getAll 省市县
function getAll(that, provinces, Code, index, citys, Code1, index1, countys,Code2) {
  //获取省
  // var str = {
  //   'OperationType': '10004'
  // }
  // wx.request({
  //   // url: "http://ppp.zhybpay.com:94/ashx/XYK_Server.ashx",
  //   url: "",
  //   data: str,
  //   method: 'POST',
  //   header: { "content-type": "application/json" },
  //   success: function (res) {
  //     console.log(res)
  //     if (provinces) {
  //       for (var i = 0; i < res.data.data.length; i++) {
  //         provinces.push(res.data.data[i].Name)
  //         Code.push(res.data.data[i].Code)
  //       }
  //       that.setData({
  //         provinces: provinces,
  //         Code: Code
  //       })
  //       //wx.setStorageSync("Code",that.data.Code)
  //       //归空
  //       Code1 = [];
  //       citys = [];

  //       //获取市
  //       var str = {
  //         'OperationType': '10005',
  //         "PCode": Code[index]
  //       }
  //       console.log(Code[index])
  //       wx.request({
  //         // url: "http://ppp.zhybpay.com:94/ashx/XYK_Server.ashx",
  //         url: "",
  //         data: str,
  //         method: 'POST',
  //         header: { "content-type": "application/json" },
  //         success: function (res) {
  //           console.log(res)
  //           console.log(res.data.data + "111")
  //           if (provinces) {
  //             for (var i = 0; i < res.data.data.length; i++) {
  //               citys.push(res.data.data[i].Name)
  //               Code1.push(res.data.data[i].Code)
  //             }
  //             console.log(citys)
  //             console.log(Code1)
  //             that.setData({
  //               citys: citys,
  //               Code1: Code1
  //             })
  //             //wx.setStorageSync("Code1", that.data.Code1)
  //             //获取区
  //             var str = {
  //               'OperationType': '10006',
  //               "PCode": Code1[index1]
  //             }
  //             wx.request({
  //               // url: "http://ppp.zhybpay.com:94/ashx/XYK_Server.ashx",
  //               url: "",
  //               data: str,
  //               method: 'POST',
  //               header: { "content-type": "application/json" },
  //               success: function (res) {
  //                 console.log(res)
  //                 if (countys) {
  //                   for (var i = 0; i < res.data.data.length; i++) {
  //                     countys.push(res.data.data[i].Name)
  //                     Code2.push(res.data.data[i].Code)
  //                   }
  //                   that.setData({
  //                     countys: countys,
  //                     Code2:Code2
  //                   })
  //                 }
  //               }
  //             })
  //           }
  //         }
  //       })
  //     }
  //   }
  // })
}

//绑定基本信息 10026
function BindBasicInformation(that,uid,provinces,index,citys,index1,countys,index2,detail,ID,name,valueBankName,card,Code,Code1,Code2,tele){
  //绑定基本信息---实名认证
  //请求参数*
  var str = {
    "OperationType": "10026",
    "uid": uid,
    "pro": Code[index],
    "city": Code2[index1],
    "count": Code2[index2],
    "address": detail,
    "idCard": ID,
    "realname": name,
    "bank": valueBankName,
    "phone": tele,
    "bankCard": card
  };
  console.log(uid)

  console.log(Code[index])
  console.log(Code1[index1])
  console.log(Code2[index2]) 
  console.log(detail)
  console.log(ID)
  console.log(name)
  console.log(valueBankName)
  //console.log(tele)
  console.log(card)


  var reg = /^(\d{16}|\d{19})$/;
  var bool = (reg.test(card));
  if (bool) {
    //发起请求*
    wx.request({
      
      url: "",
      data: str,
      method: 'POST',
      header: { "content-type": "application/json" },
      success: function (res) {
        console.log(10026)
        console.log(res)
        if (res.data.CODE == "00") {
          wx.setStorageSync("realName", name)
          wx.showToast({
            title: res.data.MESSAGE,
            image: "../../images/icon/s.png",
            duration: 1000,
            mask: true,
          })
          setTimeout(function(){
            wx.switchTab({
              url: '../index/index',
            })
          },1000)
          
        } else {
          // wx.showToast({
          //   title: res.data.MESSAGE,
          //   image: "../../images/icon/f.png",
          //   duration: 1000,
          //   mask: true,
          // })
          wx.showModal({
            title: res.data.MESSAGE+"请确认后在认证",
            // content: '这是一个模态弹窗',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        console.log(res)
      }
    })
  } else {
    wx.showToast({
      title: '银行卡号错误',
      image: "../../images/icon/f.png",
      duration: 1000,
      mask: true,
    })
  }
}

//验证码验证及注册10003
function regist(that, phone, password,mdPwd,sort,Invitation,mer,password1,code){
  var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;  //手机验证正则
  
  console.log(mdPwd)
  //验证验证码
  var str = {
    "OperationType": "10002",
    "mobile": phone,
    "code": code,
  }
  if (myreg.test(Invitation)){
    if (code && phone && password && password1 && Invitation) {
      if (password == password1) {
        wx.request({
          url: "",
          data: str,
          method: 'POST',
          header: { "content-type": "application/json" },
          success: function (res) {
            console.log(res)
            console.log(10002)
            if (res.data.CODE == "00") {
              //注册
              var str = {
                "OperationType": "10003",
                "username": phone,
                "pwd": mdPwd,
                "sort": sort,
                "topUser": Invitation,
                "grade": mer
              }
              console.log(myreg.test(phone));
              console.log(password);
              console.log(password1);
              console.log(code);
              console.log(Invitation);
              //发起请求*
              wx.request({
                url: "",
                data: str,
                method: 'POST',
                header: { "content-type": "application/json" },
                success: function (res) {
                  console.log(10003)
                  console.log(res)
                  if (res.data.CODE == '00') {
                    wx.showToast({
                      title: "注册成功",
                      image: '../../images/icon/s.png',
                      duration: 500
                    })
                    var skip = setTimeout(function () {
                      wx.redirectTo({
                        url: '../login/login'
                      })
                    }, 500);
                  } else {
                    wx.showToast({
                      title: res.data.MESSAGE,
                      image: '../../images/icon/f.png',
                      duration: 500
                    })
                  }
                }
              })
            } else {
              wx.showModal({
                title: '提示',
                content: res.data.MESSAGE,
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }
          }
        })
      } else {
        wx.showModal({
          title: '提示',
          content: "两次输入密码不一致",
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    } else {
      wx.showModal({
        title: '提示',
        content: "信息不全",
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }  
  }else{
    wx.showModal({
      title: '提示',
      content: "邀请码必须为手机号码",
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
  
}

//申请提现
function requestWithdrawal(that, uid,inputJine,payPwd){
  var str = {
    "OperationType": "10029",
    "uid": uid,
    "money":inputJine,
    "paypwd": payPwd
  }
  //发起请求*
  wx.request({
    url: "",
    data: str,
    method: 'POST',
    header: { "content-type": "application/json" },
    success: function (res) {
      console.log(10029)
      console.log(res)
      if (res.data.CODE == "00") {
        wx.showToast({
          title: '提现成功',
          image: "../../images/icon/s.png",
          duration: 1000,
          mask: true,
        })
        //重新加载钱包
        that.onLoad();
      } else {
        wx.showModal({
          title: '提示',
          content:res.data.MESSAGE,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              that.setData({
                inputJine:""
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
              that.setData({
                inputJine: ""
              })
            }
          }
        })
      }
    }
  })
}

//钱包查询
function queryWallet(that,uid,sum,use,yue){
  console.log(uid + "1111")
  var str = {
    "OperationType": "10024",
    "uid": uid
  }
  //发起请求*
  wx.request({
    url: "",
    data: str,
    method: 'POST',
    header: { "content-type": "application/json" },
    success: function (res) {
      console.log(res)
      if (res.data.CODE == "00") {
        that.setData({
          sum: res.data.sumTotal,
          use: res.data.useTotal,
          yue: res.data.yue
        })
      }
    }
  })
}
//修改登陆密码10017
function amend(mdPwd){
  
  console.log(10002)
  console.log(res)
  var str1 = {
    "OperationType": "10017",
    "username": phone,
    "pwd": mdPwd
  }
  wx.request({
    url: "",
    data: str1,
    method: 'POST',
    header: { "content-type": "application/json" },
    success: function (res) {
      console.log(10017)
      console.log(res)
      //本地储存用户信息
      wx.setStorageSync('uid', res.data.data.uid);
      // wx.setStorageSync('nice', res.data.data.nice);
      var skip = setTimeout(function () {
        wx.switchTab({
          url: '../account/account'
        })
      }, 1000);
    }
  })
}

//接口

module.exports = {
  header: header,
  sendCode: sendCode,
  queryBank: queryBank,
  addCard: addCard,
  personaInfo: personaInfo,
  notice:notice,
  BorrowList: BorrowList,
  subordinateList: subordinateList,
  WithdrawalList: WithdrawalList,
  cardList: cardList,
  removeCard: removeCard,
  login: login,
  VerificationCode: VerificationCode,
  getAll:getAll,
  BindBasicInformation: BindBasicInformation,
  regist: regist,
  queryWallet: queryWallet,
  requestWithdrawal: requestWithdrawal,
}