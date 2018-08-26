Page({
  data:{
    newStoreItem: [
      { 
        id:"1",
        month: 6, 
        day: 3, 
        primaryImg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        images: [
          { id:"1",imgurl: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
           desc: "Sweat", 
           goodsPrice:1233 }, 
          { id: "2",imgurl: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', desc: "Sweat", goodsPrice:111 }, 
          { id: "3",imgurl: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', desc: "Sweat", goodsPrice:123 }
           ]
      }, {
        id: "1",
        month: 6,
        day: 3,
        primaryImg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        images: [
          {
            id: "1", imgurl: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            desc: "Sweat",
            goodsPrice: 1233
          },
          { id: "2", imgurl: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', desc: "Sweat", goodsPrice: 111 },
          { id: "3", imgurl: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', desc: "Sweat", goodsPrice: 123 }
        ]
      }
    ]
  },
  onLoad: function (options){

    var storeNoLink = options.storeno || '';//店铺编号
    var that=this;
    var param = {
      data:{
        "sort": "1",
        "storeNo": storeNoLink
      }
    };
    var params = JSON.stringify(param);
    wx.request({
      url:'https://dingdian-ppe.parllay.cn/wxserver/index/new',
      data:params,
      header:{
        'content-type': 'application/json' // 默认值
      },
      method:'POST',
      success: function(res){
        var status=res.statusCode;
        var items = res.data.data;
        if(status){
          console.log("newstore----------",res);
          var arr=[];
          for(var i=0;i<items.length; i++){
             var json={};
             for (var name in items[i]){
                json[name]=items[i][name];
             }
             json.day = new Date(json.createTime).getDate();
            json.month = new Date(json.createTime).getMonth();
             arr.push(json);
            
          }
          that.setData({'newStoreItem':arr});
          console.log("arr----------",that.data.newStoreItem);
        }else{

        }
      },
      error:function(){
        console.log();
      }
    })
  },
  getTime:function(data){
    var dur = data;
    var pms={};

    if (dur > 0) {

      pms.sec = this.f.zero(dur % 60);

      pms.mini = Math.floor((dur / 60)) > 0 ? this.f.zero(Math.floor((dur / 60)) % 60) : "00";

      pms.hour = Math.floor((dur / 3600)) > 0 ? this.f.zero(Math.floor((dur / 3600)) % 24) : "00";

      //pms.day = Math.floor((dur / 86400)) > 0 ? f.zero(Math.floor((dur / 86400)) % 30) : "00"; 

      pms.day = Math.floor((dur / 86400)) > 0 ? this.f.zero(Math.floor(dur / 86400)) : "00";

      //月份，以实际平均每月秒数计算 

      pms.month = Math.floor((dur / 2629744)) > 0 ? this.f.zero(Math.floor((dur / 2629744)) % 12) : "00";

      //年份，按回归年365天5时48分46秒算 

      pms.year = Math.floor((dur / 31556926)) > 0 ? Math.floor((dur / 31556926)) : "0"; 
    }
      return pms
  }
})