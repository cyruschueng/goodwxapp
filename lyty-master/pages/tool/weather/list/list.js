//list.js
Page({
  data: {
    cityLists:["北京","上海","天津","深圳","杭州","广州","西安","太原"]
  },
//   输入框失去焦点
  blur:function(e){
     this.setData(
         {
             city:e.detail.value
         }
     );
  },

//   点击搜索按钮
  search:function(){
    var city=this.data.city;
    if(city){
        this.save(city);
        setTimeout(function(){
            this.setData(
                {
                    cityLists:this.data.cityLists.concat([city]),
                    city:""
                }
            )
        },1000);
    }
    
  },

//   直接选择城市
  select:function(e){
      var city=e.target.id;
      this.save(city);
  },

  //   保存数据、页面跳转
  save:function(city){
    //添加到缓存中
    this.setData(
        {
        cacheCity:wx.setStorage({
            key:"cacheCity",
            data:city
        })
        }
    );
    // 页面跳转
    // wx.navigateBack();
    wx.redirectTo({
        url: '../../weather/weather'
    })
  }
})