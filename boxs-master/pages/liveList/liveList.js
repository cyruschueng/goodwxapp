const app = getApp()
const apiurl = 'https://friend-guess.playonwechat.com/';
let sign = wx.getStorageSync('sign');
import tips from '../../utils/tips.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bianji:false,
    collectsArr: '' //收藏物品ID 
  },
  onLoad: function (options) {
      console.log("options:", options)
      this.setData({
        lu_id: options.lu_id
      })
  },
  onShow: function () {
    let that = this;
    let sign = wx.getStorageSync('sign');
    // 收藏物品列表
    wx.request({
      url: apiurl + "luggage/collect-list?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        lu_id: that.data.lu_id,
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("收藏物品列表", res);
        let status = res.data.status;
        if (status == 1) {
          that.setData({
            luggageList: res.data.data
          })
        } else {
          that.setData({
            luggageList: false
          })
          //tips.alert(res.data.msg);
        }
      }
    })
  },
  bianji(){
    this.setData({
      bianji: !this.data.bianji
    })
  },
  // 返回
  backTap(){
    wx.navigateBack({})
  },
  shanchu(e){
    let that = this;
    let sign = wx.getStorageSync('sign');
    let collect_id = e.currentTarget.dataset.collect_id;
    wx.request({
      url: apiurl + "luggage/del-collect?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        collect_id: e.currentTarget.dataset.collect_id,
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("删除收藏物品", res);
        let status = res.data.status;
        if (status == 1) {
          tips.success('删除收藏物品成功！');
          // 收藏物品列表
          wx.request({
            url: apiurl + "luggage/collect-list?sign=" + sign + '&operator_id=' + app.data.kid,
            data: {
              lu_id: that.data.lu_id,
            },
            method: 'GET',
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              console.log("收藏物品列表", res);
              let status = res.data.status;
              if (status == 1) {
                that.setData({
                  luggageList: res.data.data
                })
              } else {
                that.setData({
                  luggageList: false
                })
                //tips.alert(res.data.msg);
              }
            }
          })
        } else {
          tips.alert(res.data.msg);
        }
      }
    })
  },
  // 选择添加到行李箱
  collectsTap(e){
      console.log("e:",e);
      let that = this;
      let luggageList = that.data.luggageList;
      let collect_id = e.currentTarget.dataset.collect_id;
      let cat_id = e.currentTarget.dataset.cat_id;
      let childIndex = e.currentTarget.dataset.childindex;
      console.log("length:", luggageList.length);
      for (let i = 0; i < luggageList.length; i++){
        //setTimeout(function(){
            if (cat_id == luggageList[i].cat_id) {
              console.log('luggageList:', i);
              console.log('childIndex:', childIndex);
              if (luggageList[i].collects[childIndex].checked == true) {
                luggageList[i].collects[childIndex].checked = false;
              } else {
                luggageList[i].collects[childIndex].checked = true;
              }
            }
        //})
     }
      that.setData({
        luggageList
      })  
      console.log('luggageList:', luggageList);
  },
  // 添加
  addTravel(e){
      let that = this;
      let sign = wx.getStorageSync('sign');
      let collect_id = e.currentTarget.dataset.collect_id;
      let luggageList = that.data.luggageList;
      let collectsArr = that.data.collectsArr;
      console.log("collectsArr:", typeof (collectsArr), collectsArr.length);
      
      for (let i = 0; i < luggageList.length; i++) {
        for (let j = 0; j < luggageList[i].collects.length;j++){
            if (luggageList[i].collects[j].checked == true) {
                collectsArr += luggageList[i].collects[j].collect_id + ","; //拼接字符
            }
        }
      }
      collectsArr = collectsArr.substr(0, collectsArr.length - 1); // 截取最后一位字符
      if (!collectsArr || collectsArr.length == 0) {
        tips.alert('请选择要添加的物品！');
        return false;
      }
      wx.request({
        url: apiurl + "luggage/append-goods-by-collect?sign=" + sign + '&operator_id=' + app.data.kid,
        data: {
          collect_id: collectsArr,
          lu_id: that.data.lu_id
        },
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log("往行李箱里添加收藏物品", res);
          let status = res.data.status;
          if (status == 1) {
            tips.success('添加物品成功！');
            setTimeout(function () {
              wx.navigateBack({
                url: '../travel/travel?lu_id=' + that.data.lu_id
              })
            }, 200)
          } else {
            tips.alert(res.data.msg);
          }
        }
      })
  }
})