var util = require("../../utils/util.js")
var app = getApp();
var that;
const config = require('../../config')

Page({
  data: {
    teachers: [],
    parents: [],
    cid: "",
    gid: "",
    role:"",
    class_name: "",
    imprint_name: "",
    loaded: false,
    cls:'',
    is_admin:false,
    role:""
  },
  onShow: function (obj) {
    if (app.globalData.memberReload == 1) {
      that.memberReload(that.data.cid);
    }
    app.globalData.memberReload = 0;
  },
  onLoad: function (options) {
    // 页面初始化 options 为页面跳转所带来的参数
    var cid = options.cid;
    var gid = options.gid;
    var class_name = options.class_name;
    that = this;
    that.setData({ cid: cid,gid:gid, class_name: class_name, role: app.globalData.role  });
    wx.showLoading({
      title: '加载中....',
    });
    var title = '通讯录';
    if (class_name) {
      title = class_name + '通讯录';
    };
    wx.setNavigationBarTitle({
      title: title
    })
    that.memberReload(cid);
    that.classInit(cid);
  },

  classInit:function(cid){
    app.getImprint(function (imprint) {
      util.AJAX1(config.classByIdUrl, { cid: cid }, "post", { imprint: imprint }, function (res) {
        if (res.data.status == 'ok') {
          var cls = res.data.class;
          var is_admin = res.data.is_admin;
          that.setData({ cls: cls, is_admin: is_admin})
        }
      })
    })
  },

  memberReload: function (cid) {
    var formdata = { cid: cid };
    app.getImprint(function (imprint) {
      util.AJAX1(config.MembersByCidUrl, formdata, "post", { imprint: imprint }, function (res) {
        var result = res.data;
        console.log(result);
        wx.hideLoading();
        if (result.status == 'ok') {
          var teachers = [];
          var parents = [];
          var imprint_name = res.data.imprint_name;
          res.data.members.forEach(function (item) {
            if (item.type==1) {
              item.FamilyRole = util.GetFamilyRole(item.relatives_role)
              parents.push(item);
            } else {
              item.subject = util.GetSubjectList()[item.teach_role]
              teachers.push(item)
            }
          });
          
          var parentsMap={};
          parents.forEach(function(item){
            if(item.name.length>0){
              var first= item.name.substring(0,1);
              if (parentsMap[first]){
                parentsMap[first].push(item)
              }else{
                parentsMap[first]=[];
                parentsMap[first].push(item)
              }
            }
          })

         var newParents=[]
          for (var key in parentsMap) {
            newParents = newParents.concat(parentsMap[key]);

          }

          that.setData({ parents: newParents, teachers: teachers, imprint_name: imprint_name, loaded:true })
        }
      });
    });
  },

 

  navigate: function (e) {
    var action = e.currentTarget.id;
    switch (action) {
      case "create":
        wx.navigateTo({
          url: '../createclass/createclass'
        })
        break;
      case "my":
        wx.navigateTo({
          url: '../my/my'
        })
        break;
      case "class":
        wx.navigateTo({
          url: '../classlist/classlist'
        })
        break;
      default:

    }
  },

  goClass: function (e) {
    var action = e.currentTarget.id;
    wx.navigateTo({
      url: '../member/member'
    })
  },

  addStudent:function(){
    var itemList = ['单个添加', '批量Excel导入'];
    var cid=that.data.cid
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {
        if (res.tapIndex == 0) {
          wx.navigateTo({
            url: '../createmember/createmember?cid='+cid,
          })
        } else if (res.tapIndex == 1) {
          wx.navigateTo({
            url: '../excelimport/excelimport?cid='+cid,
          })
        } 
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  moreAction: function (e) {
    var id = e.currentTarget.dataset.id;
    var mode = e.currentTarget.dataset.mode;
    var unbind = e.currentTarget.dataset.unbind;
    var is_my = e.currentTarget.dataset.is_my;
    var cid = that.data.cid;
    //如果不是老师或不是本人就不能操作更多
    if(that.data.role!="teacher"&&mode!="teacher"&&!is_my){
      return;
    }
    var info = "";
    if (mode == "teacher") {
      that.data.teachers.forEach(function (item) {
        if (item._id == id) {
          info = item;
        }
      });
    } else {
      that.data.parents.forEach(function (item) {
        if (item._id == id) {
          info = item;
        }
      });
    }
    var itemList = ['拨打电话','编辑'];
    if(that.data.role=='parent'&&!is_my){
      itemList = ['拨打电话'];
    }
    var deltip ="确认要删除该成员么";
    //当前是管理员同时要操作的不是自己，则显示出来删除按钮
    if (that.data.is_admin && that.data.cls.admin_id != info.wx_openid){
      itemList.push("删除");
    }else if(is_my){
      itemList.push("注销");
      deltip = "确认要注销么";
    }
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {
        if (app.globalData.isExpOpenid) {
          wx.showToast({
            title: '体验者无权限',
          })
          return;
        }
        if (res.tapIndex == 1) {
          wx.navigateTo({
            url: '../editmember/editmember?id=' + id + '&cid=' + cid + '&mode=' + mode
          })
        } else if (res.tapIndex == 0) {
          wx.makePhoneCall({
            phoneNumber: info.phone //仅为示例，并非真实的电话号码
          })
        } else if (res.tapIndex == 2) {
          wx.showModal({
            title: '提示',
            content: deltip,
            success: function (res) {
              if (res.confirm) {
                that.memberRemoveOrUnbind(id, "remove", mode,is_my);
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })

        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },


  memberRemoveOrUnbind: function (id, action, mode,is_my) {
    if (app.globalData.isExpOpenid) {
      wx.showToast({
        title: '体验者无权限',
      })
      return;
    }
    var formdata = { _id: id, action: action };
    wx.showLoading({
      title: '数据处理中....',
    })
    app.getImprint(function (imprint) {
      util.AJAX1(config.unBindUrl, formdata, "get", { imprint: imprint }, function (res) {
        var result = res.data;
        console.log(result);
        wx.hideLoading();
        if (result.status == 'ok') {
          if(is_my){
            wx.showToast({
              title: '注销成功',
              icon: 'success',
              duration: 1000
            });
            setTimeout(function () {
              wx.redirectTo({
                url: '../start/start',
              })
            }.bind(this), 1000);
          }else{
            that.memberReload(that.data.cid);
          }
        }
      });
    });
  },


  onShareAppMessage: function (options) {
    var gid=that.data.gid;
      wx.showShareMenu({
        withShareTicket: true //要求小程序返回分享目标信息
      });
      return {
        title: '我邀请群里各位老师和家长加入小管家进行发布和反馈作业',
        imageUrl: "http://campus002.oss-cn-beijing.aliyuncs.com/cc.jpg",
        path: '/example/bind/bind',
        success: function (res) {
          if (!res.shareTickets) {
            wx.showModal({
              title: '提示',
              content: '请分享到班级群',
            })
            return;
          }
          app.getImprint(function (imprint) {
            app.getLoginCode(function (logincode) {
              wx.getShareInfo({
                shareTicket: res.shareTickets[0],
                success: function (res) {
                  console.log(res)
                  var formdata = { "code": logincode, "iv": res.iv, encryptedData: res.encryptedData }
                  util.AJAX1(config.groupInitUrl, formdata, "post", { imprint: imprint }, function (res) {
                    var resData = res.data;
                    if (resData.status == "ok" && resData.bind && resData.gid == gid) {
                        wx.showToast({
                          title: '分享成功',
                        })
                    } else {
                      wx.showModal({
                        title: '和初始化分享的班级群不一致,请重新分享',
                        content: '',
                      })
                    }
                  });
                },
                fail: function (res) { console.log(res) },
                complete: function (res) { console.log(res) }
              })
            });
          });

        },
        fail: function (res) {
          // 分享失败
          console.log(res)
        }
      }
  },

});
