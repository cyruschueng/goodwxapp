//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    posbg: 'http://ruihe.99zan.net/Public/images/wx/wx_12.jpg',
    baseerma:'',
    poster_info:'',
  },
  //事件处理函数
  onLoad: function () {
    wx.showLoading({title:'数据加载中'});
    var that = this;
    wx.getStorage({
      key: 'u_Info_acid',
      success: function (res) {
        console.log(res.data.openid)
        console.log(res.data.activity_id)
        that.setData({
          poster_info: res.data.nickName
        })
        //请求二维码图片
        wx.request({
          url: 'https://xcx.aichukad.com/index.php/home/activity/creatimg',
          data: {
            openid:res.data.openid,
            acid:res.data.activity_id
          },
          header: {
            //'content-type': 'application/json' // 默认值
            'Content-Type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'POST',
          success: function (res) {
            console.log(res.data)
            if (res.data.errcode == 1){
              that.setData({
                baseerma: 'https://xcx.aichukad.com' + res.data.url
              });
            }else{

            }
            
          }
        });

      }
    });
    wx.hideLoading()
  },
  keepimg:function(){
    wx.saveImageToPhotosAlbum({
      success(res) {
        wx.showToast({
          title: '图片保存成功',
          icon: 'success',
          duration: 2000,
          mask: true
        });
      }
    })
  },

})
