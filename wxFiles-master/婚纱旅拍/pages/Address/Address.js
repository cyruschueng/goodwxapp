// pages/Address/Address.js
var tcity = require("../../utils/citys.js");
var app = getApp();
Page({
  data:{
    type:0,
    MECOME:0,
    PRODUCTCOME:1,
    SHOPCARCOME:2,
    AddHidden:true,
    text1:'选择省份',
    text2:'选择城市',
    text3:'选择地区',
    detaile:'详细地址',
    Province : [],
    City : [],
    Region : [],
    ProvinceIndex:0,
    CityIndex:0,
    RegionIndex:0,
    DetailedAddress:false,
    input:false,
    //获取地址数据
        name:false,
        phone:false,
        address:false,
        //获取服务器上的数据
        addresslist:[]
  },
  //保存收货人姓名
  SaveName:function(e){
    this.setData({
      name:e.detail.value
    })
        console.log(e.detail.value,this.data.name)
  },
    //保存收货人电话
  SavePhoneNum:function(e){
    this.setData({
      phone:e.detail.value
    })
        console.log(e.detail.value,this.data.phone)
  },
    //保存详细地址 
  SaveDetailedAddress:function(e){
    var that=this;
    that.data.input=true;
    this.setData({
      DetailedAddress:e.detail.value
    })
        console.log(e.detail.value,this.data.DetailedAddress)
  },
  //保存全部地址，并返回上一页
  SaveAddress:function(){
    var that = this;
    //保存城市信息
    if(that.data.input)
    {
    that.setData({
      address:that.data.Province[that.data.ProvinceIndex] + that.data.City[that.data.CityIndex]+that.data.Region[that.data.RegionIndex]+ that.data.DetailedAddress
    })
    }
    console.log(that.data.address)
      console.log(that.data.DetailedAddress)
    if(!(that.data.name&&that.data.phone&&that.data.address&&that.data.DetailedAddress)){

  }else{
         //将地址信息发送到服务器
         
  }

  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    tcity.init(that);
    var cityData = that.data.cityData;

    const Province = [];
    const City = [];
    const Region = [];

    

// cityData[省].sub[市].sub[i].name

    for(let i=0;i<cityData.length;i++){
      Province.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0 ; i < cityData[0].sub.length; i++) {
      City.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0 ; i < cityData[0].sub[0].sub.length; i++) {
      Region.push(cityData[0].sub[0].sub[i].name)
    }

    that.setData({
    Province :Province ,
    City : City,
    Region :Region ,
    })
    console.log(that.data.Province,that.data.City,that.data.Region)
    //请求服务器数据
    wx.request({
      url: app.globalData.IP+"wx/addresslist.do",
      data:{userid:app.globalData.UID},
      method: 'GET',
      success: function(res){
        // success
        for(var i=0;i<res.data.length;i++)
        {
                 var item={id:res.data[i].id,name:res.data[i].name,phone:res.data[i].phone,detail:res.data[i].detail,moren:res.data[i].moren};

                  that.data.addresslist=that.data.addresslist.concat(item);
        }
        that.setData({
          addresslist:that.data.addresslist
        })
      },
    })

    //判断访问类型
    if(options.type==that.data.PRODUCTCOME)
    {
      that.setData({
        type:that.data.PRODUCTCOME
      })
    }else if(options.type==that.data.SHOPCARCOME)
    {
       that.setData({
        type:that.data.SHOPCARCOME
      })
    }else{
       that.setData({
        type:0
      })
    }
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function(res){
           wx.request({
             url: app.globalData.IP+"wx/getlocation.do",
             data:{
            latitude:res.latitude,
             longitude:res.longitude
             },
             success: function(res){
               // success
                if(res.data.result)
                {
                var province=res.data.result.addressComponent.province;
                var city=res.data.result.addressComponent.city;
                var district=res.data.result.addressComponent.district;
                var business=res.data.result.sematic_description;
                that.setData({
                  text1:province,
                  text2:city,
                  text3:district,
                  detail:business,
                  address:province+city+district+business,
                  DetailedAddress:business
                });
                }
             },
           })
      },
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示

  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  //选择省份
    ProvinceChange: function(e) {
    var that = this;
    tcity.init(that);
    var cityData = that.data.cityData;
       const City = [];
       const Region = [];
    for (let i = 0 ; i < cityData[e.detail.value].sub.length; i++) {
      City.push(cityData[e.detail.value].sub[i].name)
    }
     for (let i = 0 ; i < cityData[e.detail.value].sub[0].sub.length; i++) {
      Region.push(cityData[e.detail.value].sub[0].sub[i].name)
    }
     console.log(City,that.data.Province[e.detail.value])
     that.setData({
       ProvinceIndex:e.detail.value,
       City:City,
       Region:Region,
       CityIndex:0,
      RegionIndex:0,
     })
     console.log(that.data.Province[that.data.ProvinceIndex])
     that.setData({
       text1:that.data.Province[that.data.ProvinceIndex],
       text3:that.data.Region[that.data.RegionIndex],
       text2:that.data.City[that.data.CityIndex]
     }
     )
  },
  //选择城市
  CityChange:function(e){
    var that = this;
    tcity.init(that);
    var cityData = that.data.cityData;
    const Region = [];
      for (let i = 0 ; i < cityData[that.data.ProvinceIndex].sub[e.detail.value].sub.length; i++) {
      Region.push(cityData[that.data.ProvinceIndex].sub[e.detail.value].sub[i].name)
    }
    console.log()
    that.setData({
      CityIndex:e.detail.value,
      Region:Region,
      RegionIndex:0,
    })
    that.setData({
      text2:that.data.City[that.data.CityIndex],
      text3:that.data.Region[that.data.RegionIndex],
    })
  },
  //选择地区
  RegionChange:function(e){
     var that = this;
    console.log(e.detail.value)
     that.setData({
      RegionIndex:e.detail.value,
    })
    that.setData({
      text3:that.data.Region[that.data.RegionIndex]
    })
  },
  //显示添加地址
  showAddAddress:function(){
    var that = this;
    that.setData({
      AddHidden:false
    })
  },  //隐藏添加地址
  CloseAddAddress:function(){
    var that = this;
    that.setData({
      AddHidden:true
    })
  },
  deleteaddress:function(e){
    var that=this;
       var index=e.currentTarget.id;
       wx.request({
         url: app.globalData.IP+"wx/deleteaddress.do",
         data: {id:that.data.addresslist[index].id},
         method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
         success: function(res){
             that.data.addresslist.splice(index,1);
             that.setData({
               addresslist:that.data.addresslist
             })
         },
       })
  },
  moren:function(e){
        var that=this;
        var index=e.currentTarget.id;
        wx.request({
         url: app.globalData.IP+"wx/updatemoren.do",
         data: {id:that.data.addresslist[index].id,userid:app.globalData.UID},
         method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
         success: function(res){
             if(res.data==1)
             {
                   for(var i=0;i<that.data.addresslist.length;i++)
                   {
                     if(i==index)
                     that.data.addresslist[i].moren=true;
                     else
                      that.data.addresslist[i].moren=false;
                   }
             }else{
                    wx.showToast({
                      title:'更新失败',
                      duration:2000,
                    })
             }
             that.setData({
               addresslist:that.data.addresslist
             })
         },
       })
  },
  returndata:function(e){
        var that=this;
        var index=e.currentTarget.id;
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];  //上一个页面
        if(that.data.type==that.data.PRODUCTCOME)
       {
             prevPage.setData({
               address:that.data.addresslist[index],
               select:true
             })
       }
       if(that.data.type==that.data.SHOPCARCOME)
       {
          prevPage.setData({
               addressid:that.data.addresslist[index].id
             })
       }
       wx.navigateBack({
         delta: 1, // 回退前 delta(默认为1) 页面
       })
  },
  sb:function(e){
         var that=this;
         if(e.detail.value.name==''||e.detail.value.phone==''||e.detail.value.province==''||e.detail.value.city==''||e.detail.value.area==''||e.detail.value.detail=='')
         {
           console.log(e);
                      wx.showModal({
                        title: '提示',
                        content: '请将地址填写完整',
                        showCancel:false,
                        success: function(res) {
                          if (res.confirm) {
                            console.log('用户点击确定')
                          }
                        }
                      })
         }
         else{
            var address=e.detail.value.province+e.detail.value.city+e.detail.value.area+e.detail.value.detail;
         wx.request({
           url: app.globalData.IP+"wx/addaddress.do",
           header:{'content-type':'application/x-www-form-urlencoded'},
           data: {name:e.detail.value.name,phone:e.detail.value.phone,detail:address,userid:app.globalData.UID},
           method: 'POST', 
           success: function(res){
             // success
            that.CloseAddAddress();
            var item={name:e.detail.value.name,phone:e.detail.value.phone,detail:address,id:res.data.result};
            that.data.addresslist=that.data.addresslist.concat(item);
            that.setData({
              addresslist:that.data.addresslist
            });
           },
         })
         }
  }
})