
var app = getApp()

Page({
  data: { 
    pages:1,
    hasMore: true,
    array:[],
    listLen:0,
    shareinfo:[]
  },
  onShareAppMessage: function () {
    var that = this;
    return {
      title: '民情热线',
      path: '/page/indexcb/indexcb',
      success: function(res) {
        wx.showToast({
          title: '已发送', 
          icon: 'success', 
          duration: 1000
          }),
          wx.showShareMenu({
            withShareTicket: true
          }),
          wx.getShareInfo({
          shareTicket: res.shareTickets,
            success: function (res) {
              //console.log(res);
              that.setData({
                shareinfo:res
              })
            }
          })
      },
      fail: function(res) {
        
      }
    }
  },
  onLoad:function(){
    this.data.pages=0;
    this.getdata();
    this.doLogin();
},
  getdata:function(){
    var that=this;
    var page=that.data.pages;
    page++;
    var arrayBefore = that.data.array;
    console.log(this.data.shareinfo);
    wx.request({
      url:getApp().URLS+'mqrx/news/list?p='+page,
      data:{
        shareinfo:this.data.shareinfo
      },
      header:{
        "Content-Type":"applciation/json"
      },
      method:"GET",
      success:function(res){     
         var list = res.data.data.newss;
         for(var i=0;i<list.length;i++){     
          if(list[i].status==1){
            var date3 = res.data.timestamp - list[i].publishDate;        
            var days=Math.floor(date3/(24*3600*1000)); 
            var hours=Math.floor((date3%(24*3600*1000))/(3600*1000));     
            var resu =days + "天" + hours + "小时";
           }
           if(list[i].status==2){
             var resu = "已回复";
           }      
            list[i].publishDate=resu;
        }
        arrayBefore= arrayBefore.concat(list);
          that.setData({
            array:arrayBefore,
            pages:page,
            listLen:list.length
          })
      },
    })
  },
  doLogin:function(){
    var token = wx.getStorageSync('t');
    wx.login({
      success: function(res){
        wx.request({
          url: getApp().URLS+'mqrx/login/byWeixinCode',
          data: {code:res.code},
          method: 'GET',
          success: function(res){       
            if(res&&res.statusCode==200&&res.data){
              var token = res.data.t.token;
              wx.setStorage({
                key: 't',
                data: token
              })
            }
          },     
        })
      },    
    })
  },
  setLoading:function(){ 
    if (!this.data.hasMore) return  
     this.getdata();
     if (this.data.listLen==0){
            wx.showToast({
              title: '没有更多了', 
              icon: 'loading', 
              duration: 1000
          })
          this.setData({
            hasMore: false
          })
         }
         else{
           wx.showToast({
            title: '加载中', 
            icon: 'loading', 
            duration: 200
          })
         }
  },
  refresh: function(){
    this.data.pages=0;
    this.data.array=[];
    this.data.hasMore=true;
    this.getdata();
    wx.showToast({
      title: '刷新成功', 
      icon: 'loading', 
      duration: 1000
      })
  },
  bindform: function() {
    wx.switchTab({
      url: '../form/form'
    })
  },
  bindphone:function(){
    wx.makePhoneCall({
      phoneNumber: '028-86968696'
    })
  }

})