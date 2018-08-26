
var Bmob = require('bmob.js');
var common = require('common.js');





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


//添加一条数据
function addPost(title, protype, budget, days, content, user, telnum, status) {
  var Project = Bmob.Object.extend("project");
  var project = new Project();
  project.set("title", title);
  project.set("protype", protype);
  project.set("budget", budget);
  project.set("days", days);
  project.set("content", content);
  project.set("user", user);
  project.set("telnum", telnum);
  project.set("status", status)
  return new Promise((resolve, reject) => {
    //添加数据，第一个入口参数是null
    project.save(null, {
      success: function (result) {
        // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
        console.log("创建成功, objectId:" + result.id);
        resolve(result)
      },
      error: function (result, error) {
        // 添加失败
        console.log('创建失败');
        resolve(error)
      }
    });
  });
}


//添加个人资料
function addPersonalData(userid, telnum, weixin, qq, github, content) {
  var Project = Bmob.Object.extend("personalData");
  var project = new Project();
  project.set("userid", userid);
  project.set("telnum", telnum);
  project.set("weixin", weixin);
  project.set("qq", qq);
  project.set("content", content);
  return new Promise((resolve, reject) => {
    //添加数据，第一个入口参数是null
    project.save(null, {
      success: function (result) {
        // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
        console.log("创建成功, objectId:" + result.id);
        resolve(result)
      },
      error: function (result, error) {
        // 添加失败
        console.log('创建失败');
        resolve(error)
      }
    });
  });
}



//项目详细页面
function getDetail(objectId) {
  var Project = Bmob.Object.extend("project");
  //创建查询对象，入口参数是对象类的实例
  var query = new Bmob.Query(Project);
  var promise = new Promise(function (resolve, reject) {
    //查询单条数据，第一个参数是这条数据的objectId值
    query.get(objectId, {
      success: function (result) {
        // 查询成功，调用get方法获取对应属性的值
        //console.log(result.get("objectId"));
        resolve({
          data: result,
          user: result.get("user")
        })
      },
      error: function (object, error) {
        // 查询失败
        reject(error)
      }
    })
  });
  return promise
}
//查询参加人员
function getPeople(objectId) {
  var Project_User = Bmob.Object.extend("project_user");
  var user = new Bmob.Query(Bmob.User)
  //创建查询对象，入口参数是对象类的实例
  var query = new Bmob.Query(Project_User);
  var promise = new Promise(function (resolve, reject) {
    query.equalTo("pro_id", objectId);
    //
    user.matchesKeyInQuery("objectId", "user_id", query);
    user.find({
      success: function (results) {
        console.log(results)
        resolve({
          data: results
        })
      },
      error: function (object, error) {
        // 查询失败
        reject(error)
      }
    })
  });
  return promise
}

//得到项目列表
function getList() {
  var Project = Bmob.Object.extend("project");
  var query = new Bmob.Query(Project);
  query.limit(10);
  query.descending('updatedAt')
  var promise = new Promise(function (resolve, reject) {
    query.find({
      success: function (results) {
        // 循环处理查询到的数据
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          //console.log(object.id + ' - ' + object.get('title'));

        }
        resolve({
          data: results
        })
      },
      error: function (error) {
        //console.log("查询失败: " + error.code + " " + error.message);
        reject(error)
      }
    })
  });
  // 查询所有数据
  return promise;
  //return list;
}




//是否加入项目
function isJoinin(objectId, userId) {
  //console.log(objectId)
  //console.log(userId)


  var ret = false;
  var Project = Bmob.Object.extend("project_user");
  //创建查询对象，入口参数是对象类的实例
  var query = new Bmob.Query(Project);
  var promise = new Promise(function (resolve, reject) {
    query.equalTo("pro_id", objectId)
    //查询单条数据，第一个参数是这条数据的objectId值
    query.find({
      success: function (results) {
        // 查询成功，调用get方法获取对应属性的值

        //console.log(results.length)
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          //console.log(object.id + ' - ' + object.get('user_id'));
          if (object.get('user_id') == userId) {
            ret = true;
            break
          }

        }
        resolve({
          data: ret
        })
      },
      error: function (object, error) {
        // 查询失败
        resolve({
          data: ret
        })
      }
    })
  });
  return promise
}



//是否被选择
function isSelected(proId, userId, developerId) {

  var ret = false;
  var Order = Bmob.Object.extend("order");
  //创建查询对象，入口参数是对象类的实例
  var query = new Bmob.Query(Order);
  var promise = new Promise(function (resolve, reject) {
    query.equalTo("proid", proId)
    query.equalTo("userid", userId)
    query.equalTo("developerid", developerId)
    //查询单条数据，第一个参数是这条数据的objectId值
    query.find({
      success: function (results) {
        // 查询成功，调用get方法获取对应属性的值

        //console.log(results.length)
        if (results.length > 0) {
          var object = results[0];
          ret = true;
        }
        resolve({
          data: ret
        })
      },
      error: function (object, error) {
        // 查询失败
        resolve({
          data: ret
        })
      }
    })
  });
  return promise
}
//查询个人资料
function getPersonalData(userId) {
  var content = ""
  var telnum = ""
  var ret = false
  var personal = Bmob.Object.extend("personalData");
  var query = new Bmob.Query(personal);
  var promise = new Promise(function (resolve, reject) {
    //查询单条数据，第一个参数是这条数据的objectId值
    query.equalTo("userid", userId)
    query.find({
      success: function (results) {
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          content = object.get('content')
          telnum = object.get('telnum')
          console.log(object.id + ' - ' + object.get('content'));
        }
        if (results.length>0) ret = true;
        resolve({
          data: results[0],
          content: content,
          telnum: telnum,
          ret: ret
        })
        //console.log("success")
      },
      error: function (object, error) {
        // 查询失败
        resolve({
          data: null,
          ret: false
        })
        //console.log("error")
      }
    })
  });
  return promise
}

//添加订单

function addOrder(proid, developerid, userid) {
  var Order = Bmob.Object.extend("order");
  var project = new Order();
  project.set("userid", userid);
  project.set("proid", proid);
  project.set("developerid", developerid);
  return new Promise((resolve, reject) => {
    //添加数据，第一个入口参数是null
    project.save(null, {
      success: function (result) {
        // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
        console.log("创建成功, objectId:" + result.id);
        resolve({
          data: true
        })
      },
      error: function (result, error) {
        // 添加失败
        console.log('创建失败');
        resolve({
          data: false
        })
      }
    });
  });
}

function getSelectedStatus(proid, developerid, userid) {
  var Order = Bmob.Object.extend("order");
  var query = new Bmob.Query(Order);
  var promise = new Promise(function (resolve, reject) {
    //查询单条数据，第一个参数是这条数据的objectId值
    query.equalTo("userid", userid)
    query.equalTo("developerid", developerid)
    query.equalTo("proid", proid)
    query.find({
      success: function (results) {
        // 查询成功，调用get方法获取对应属性的值
        console.log("order:共查询到 " + results.length + " 条记录");
        // 循环处理查询到的数据
        if (results.length > 0) {
          resolve({
            data: results[0],
            ret: true
          })
        } else {
          resolve({
            data: null,
            ret: false
          })
        }

      },
      error: function (object, error) {
        // 查询失败
        resolve({
          data: null,
          ret: false
        })
      }
    })
  });
  return promise
}

function getProjectStatus(proid) {
  var Project = Bmob.Object.extend("project");
  var query = new Bmob.Query(Project);
  var promise = new Promise(function (resolve, reject) {
    //查询单条数据，第一个参数是这条数据的objectId值
    query.get(proid, {
      success: function (result) {
        // 循环处理查询到的数据
        resolve({
          data: result,
          ret: true
        })

      },
      error: function (object, error) {
        // 查询失败
        resolve({
          data: null,
          ret: false
        })
      }
    })
  });
  return promise
}

function updateProjectStatus(proid, status) {
  var Project = Bmob.Object.extend("project");
  var query = new Bmob.Query(Project);
  // 这个 id 是要修改条目的 id，你在这个存储并成功时可以获取到，请看前面的文档
  var promise = new Promise(function (resolve, reject) {
    query.get(proid, {
      success: function (result) {
        // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
        result.set('status', status);
        result.save();
        resolve({
          data: result,
          ret: true
        })
        // The object was retrieved successfully.
      },
      error: function (object, error) {

      }
    })
  });
  return promise
}
function getUser(userId) {
  console.log(userId)
  var User = Bmob.Object.extend("_User");
  var query = new Bmob.Query(User);

  var promise = new Promise(function (resolve, reject) {
    query.get(userId, {
      success: function (result) {

        resolve({
          data: result,
          ret: true
        })
        // The object was retrieved successfully.
      },
      error: function (object, error) {

      }
    })
  });
  return promise
}


module.exports = {
  formatTime: formatTime,
  addPost: addPost,
  getList: getList,
  getDetail: getDetail,
  getPeople: getPeople,
  isJoinin: isJoinin,
  isSelected: isSelected,
  getPersonalData: getPersonalData,
  addPersonalData: addPersonalData,
  addOrder: addOrder,
  getSelectedStatus: getSelectedStatus,
  updateProjectStatus: updateProjectStatus,
  getProjectStatus: getProjectStatus,
  updateProjectStatus: updateProjectStatus,
  getUser: getUser,
  Bmob: Bmob
}
