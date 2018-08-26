// pages/task_list/task_list.js
const AV = require('../../lib/av-weapp-min');
const Todo = require('../../model/Todo');
const Group = require('../../model/Group');
var util = require('../../utils/util');
Page({
  data: {
    todos: [],
    groups:[],
    con: '',
    na: {}
    // height:0
  },
  login: function () {
    return AV.Promise.resolve(AV.User.current()).then(user => user ? (user.isAuthenticated().then(authed => authed ? user : null)) : null
    ).then(user => user ? user : AV.User.loginWithWeapp());

  },
  fetchTodos: function (user) {
    console.log('uid', user.id);
    const query = new AV.Query(Todo)
      .equalTo('user', AV.Object.createWithoutData('User', user.id))
      .descending('createdAt');
    const setTodos = this.setTodos.bind(this);
    return AV.Promise.all(query.find().then(setTodos));
  },
  setTodos: function (todos) {
    const activeTodos = todos.filter(todo => !todo.done);
    this.setData({
      todos,
      activeTodos,
    });
    return todos;
  },
  fetchGroups:function(user){
    console.log('uid', user.id);
    const queryG = new AV.Query(Group)
      .equalTo('User', AV.Object.createWithoutData('User', user.id))
      .descending('createdAt');
    const setGroups = this.setGroups.bind(this);
    return AV.Promise.all(queryG.find().then(setGroups));
  },
  setGroups:function(groups){
    this.setData({
      groups
    });
  },
  toggleDone: function ({
    target: {
      dataset: {
        id
      }
    }
  }) {
    const { todos } = this.data;
    const currentTodo = todos.filter(todo => todo.id === id)[0];
    console.log(currentTodo);
    currentTodo.done = !currentTodo.done;
    currentTodo.save().
      then(() => this.setTodos(todos)).
      catch(console.error);
    this.setData({
      con: '清除已完成'
    });

  },
  checkContext:function({
    target:{
      dataset:{
        id
      }
    }
  }){
    const { todos } = this.data;
    const currentTodo = todos.filter(todo => todo.id === id)[0];
    //var result=[]
    //result[0]=currentTodo.T_name;
    //result[1]=currentTodo.T_con;
    wx.navigateTo({
      url: '../task_context/task_context?res='+JSON.stringify(currentTodo),
      success: function(res){
        // success
        console.log(res);
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  checkDone: function ({
    target: {
      dataset: {
        id
      }
    }
  }) {
    wx.showToast({

      title: "打卡成功",
      icon: 'success',
      duration: 2000
    });
    const { todos } = this.data;
    const {groups}= this.data;
    var d = util.DateF();
    var pecrent = 0;
    const currentTodo = todos.filter(todo => todo.id === id)[0];
    const currentGroup = groups.filter(function(item){return (item.ListId==currentTodo.Tag)})[0];
    if (currentTodo.ContD == d) {
      wx.showToast({

        title: "已经打过卡咯",
        icon: 'loading',
        duration: 2000
      });
    } else {
      currentTodo.Count = currentTodo.Count + 1;
      currentGroup.Count = currentTodo.Count;
      currentTodo.ContD = d;
      currentTodo.Jin = Math.ceil((currentTodo.Count / currentTodo.Days) * 100);
      currentTodo.save().
        then(() => this.setTodos(todos)).
        catch(console.error);
      currentGroup.save().then(() => this.setGroups(groups)).
        catch(console.error);
    }
  },
  removeDone: function () {
    AV.Object.destroyAll(this.data.todos.filter(todo => todo.done)).then(() => {
      this.setTodos(this.data.activeTodos);
    }).catch(console.error);
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    /* var that=this;
     var hh=(that.data.todos.length+1)*40;
     that.setData({
       height:hh
     });*/
    //this.login().then(this.fetchTodos.bind(this)).catch(error => consolo.error(error.message));
    //this.login().then(this.fetchGroups.bind(this)).catch(error => consolo.error(error.message));
    this.login().then(this.fetchTodos.bind(this)).catch(error => consolo.error(error.message));
    this.login().then(this.fetchGroups.bind(this)).catch(error => consolo.error(error.message));
  },
  onReady: function () {
    // 页面渲染完成
    this.login().then(this.fetchTodos.bind(this)).catch(error => consolo.error(error.message));
    this.login().then(this.fetchGroups.bind(this)).catch(error => consolo.error(error.message))
  },
  onShow: function () {
    // 页面显示
   
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  addTodo: function () {
    wx.redirectTo({
      url: '../new_task/new_task',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }

})