// pages/address/address.js
Page({
  data: {
    addprovince:'请选择地址',
    addcity:'',
    addarea:'',
    hidden:1,
    address:[
    ],
    isNull:'0'
  },
  onLoad: function (e) {
    //判断入口
    var that = this;
    if(e.enc){
      this.setData({
        hidden:'0',
        sub:'2'
      })
    }
    //请求用户地址数据
    setTimeout(function(){
      wx.request({
        url: 'https://xcx.bjletusq.com/index.php/home/user/getAddress',
        method: 'POST',
        data: { user_id: getApp().globalData.userid },
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        success: function (res) {
          console.log(res.data)
          if(res.data.code!='0'){
            that.setData({
              address: res.data
            })
          }else{
            that.setData({
              isNull:'1'
            })
          }
        },
      }) 
    },500)   
  },
  //默认地址设置
  default:function(e){
    var that = this;
    console.log(getApp().globalData.userid)
    wx.request({
      url: 'https://xcx.bjletusq.com/index.php/home/user/updAddressDefault',
      method: 'POST',
      data: { user_id: getApp().globalData.userid,id:e.currentTarget.dataset.id },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        console.log(res.data)
        var address = that.data.address;
        address.forEach(function (val, index) {
          val.is_default = '0';
        })
        address[e.currentTarget.dataset.index].is_default = '1';
        that.setData({
          address: address
        })
      },
    })     
  },
  //更新地址条目
  update:function(e){
    var that = this;
    var address = that.data.address[e.currentTarget.dataset.index];
    that.setData({
      addName: address.consignee,
      addDel:address.tel,
      addprovince:address.province,
      addcity:address.city,
      addarea:address.area,
      addInfo:address.address,
      hidden:'0',
      sub:'1',
      id:address.id
    })
  },
  //删除地址条目
  del:function(e){
    var that = this;
    wx.showModal({
      title: '确认删除?',
      success: function (event){
        if(event.confirm){
          wx.request({
            url: 'https://xcx.bjletusq.com/index.php/home/common/delAddress',
            method: 'POST',
            data: { id: e.currentTarget.dataset.id },
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            dataType:'json',
            success:res => {
              if(res.data.code==1){
                var address = that.data.address;
                address.splice(e.currentTarget.dataset.index, 1);
                that.setData({
                  address: address,
                })
                //删除后如果没有条目,显示为空地址
                if(that.data.address.length==0){
                  that.setData({
                    isNull:'1'
                  })
                }
              }
            }
          })           
        }
      }
    })
  },
  //添加新地址
  setNew:function(e){
    var addprovince = e.detail.value[0];
    var addcity = e.detail.value[1];
    var addarea = e.detail.value[2];
    this.setData({
      addprovince:addprovince,
      addcity: addcity,
      addarea: addarea,
    })
  },
  //唤起弹层,添加地址
  add:function(){
    this.setData({
      hidden:'0',
      sub:'2',
    })
  },
  //关闭弹层
  close:function(){
    this.setData({
      hidden:'1',
      addName: '',
      addDel: '',
      addprovince: '请选择收货地址',
      addcity: '',
      addarea: '',
      addInfo: ''
    })
  },
  //获得地址信息
  getName:function(e){
    this.setData({
      addName:e.detail.value
    })
  },
  getDel: function (e) {
    this.setData({
      addDel: e.detail.value
    })
  },
  getInfo: function (e) {
    this.setData({
      addInfo: e.detail.value
    })
  },
  //地址提交
  sub:function(){
    var that = this;
    if(that.data.addName!=''&&that.data.addDel!=''&&that.data.addInfo!=''&&that.data.addprovince!='请选择地址'){
      //sub为2时提交新的地址信息,为1时更新已有的地址信息
      if (that.data.sub == '2') {
        wx.request({
          url: 'https://xcx.bjletusq.com/index.php/home/common/addAddress',
          method: 'POST',
          data: { user_id: getApp().globalData.userid, consignee: that.data.addName, tel: that.data.addDel, province: that.data.addprovince, city: that.data.addcity, area: that.data.addarea, address: that.data.addInfo },
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          success: function (res) {
            if (res.data.code == '1') {
              wx.showToast({
                title: '添加成功',
                success: function () {
                  wx.request({
                    url: 'https://xcx.bjletusq.com/index.php/home/user/getAddress',
                    method: 'POST',
                    data: { user_id: getApp().globalData.userid },
                    header: { "Content-Type": "application/x-www-form-urlencoded" },
                    success: function (res) {
                      console.log(res.data)
                      that.setData({
                        address: res.data,
                        hidden: '1',
                        isNull:'0',
                        addName: '',
                        addDel: '',
                        addprovince: '请选择收货地址',
                        addcity: '',
                        addarea: '',
                        addInfo: ''
                      })
                    },
                  })
                }
              })
            }
          },
        })
      } else {
        wx.request({
          url: 'https://xcx.bjletusq.com/index.php/home/common/updAddress',
          method: 'POST',
          data: { id: that.data.id, consignee: that.data.addName, tel: that.data.addDel, province: that.data.addprovince, city: that.data.addcity, area: that.data.addarea, address: that.data.addInfo },
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          success: function (res) {
            console.log(res.data)
            if (res.data.code == '1') {
              wx.showToast({
                title: '更新成功',
                success: function () {
                  wx.request({
                    url: 'https://xcx.bjletusq.com/index.php/home/user/getAddress',
                    method: 'POST',
                    data: { user_id: getApp().globalData.userid },
                    header: { "Content-Type": "application/x-www-form-urlencoded" },
                    success: function (res) {
                      console.log(res.data)
                      that.setData({
                        address: res.data,
                        hidden: '1',
                        addName:'',
                        addDel:'',
                        addprovince:'请选择地址',
                        addcity:'',
                        addarea:'',
                        addInfo:''
                      })
                    },
                  })
                }
              })
            }
          },
        })
      }
    }else{
      wx.showToast({
        title: '填写错误',
        image:'/pages/source/images/err.png'
      })
    }

  }
})