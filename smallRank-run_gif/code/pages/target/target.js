//logs.js
const app = getApp()

Page({
    data: {
        logs: [],
        userId : app.getUserId(),
        zdyGoal:5000,
        list:[
          { rank:5,
            goal:20000,
            title:"终极目标"
          },
          {
            rank: 4,
            goal: 12000,
            title: "高级目标"
          },
          {
            rank: 3,
            goal: 8000,
            title: "中级目标"
          },
          {
            rank: 2,
            goal: 6000,
            title: "初级目标"
          },
          {
            rank: 1,
            goal: 3000,
            title: "入门目标"
          }
        ],
        select:8000,
    },

    select:function(e){
      var n = e.currentTarget.dataset.goal
      wx.request({
        url: app.API_URL + "werun/set/day/goal",
        method:"POST",
        data:{
          userId: this.data.userId,
          goal:n
        },
        success:function(response){
          if (response.data.status == 1){
            wx.showToast({
              title: '更改成功',
              icon: 'success',
              duration: 2000
            })
          }
        }
      })
      this.setData({
        select:n
      })
    },
    onLoad: function () {
      let _this=this;
      wx.request({
        url: app.API_URL + "werun/get/day/goal/"+this.data.userId,

        success:function(response){
          if(response.data.status==1){
            _this.setData({
              select:response.data.data.goal
            })
          }
        }
      })
       
    }
})
