var app = getApp()
Page({
  data: {
    shopId: '',
    busname: '',
    hiddenmodalput: false, //显示登陆框
    validCodeShow: false, //显示验证码倒计时
    validCodeTime: 120, //验证码倒计时时间
    phone: '', //登陆框手机号
    userphone:'null',
    memberId: '',
    active_tab:"2",//选中的tab状态
    contentlist:'',
    cancel_suc:'true',
    sel_flag:'',
    tab: [
      {
        text: '全部',
        num: '2',
        tab_num: '',
      },
      {
        text: '未验单',
        num: '0',
        tab_num: ''
      },
      {
        text: '已验单',
        num: '1',
        tab_num: ''
      },
      {
        text: '已取消',
        num: '-1',
        tab_num: ''
      }
    ]
  },
  onLoad(){
    wx.setNavigationBarTitle({
      title: '查看订单',
    })
    
  },
  onShow: function () {
    
      
    

    var that = this;
    this.setData({
      active_tab: "2",
      userphone: app.globalData.userphone,
      memberId: app.globalData.memberId
    })

    this.filtorder()
    
  },
  change_active_tab(e) {
    this.setData({
      active_tab: e.currentTarget.dataset.index,
    })   
    
    if (this.data.active_tab==2){
      this.orderMemberList()
    }else{
      this.filtorder(this.data.active_tab)
    }
  },
  //已经验单的跳转到详细页面
  toOrder_2(e){
    wx.navigateTo({
      url: "/page/neworderlist/index?orderMemberId=" + e.currentTarget.dataset.id + '&orderList=' + 'true' + '&orderNo=' + e.currentTarget.dataset.id + '&deskId=' + e.currentTarget.dataset.deskid
    })
  },
  //跳转到详细页面
  toOrder(e){
    wx.navigateTo({
      url: "/page/takeoutpay/cart/submit/index?orderMemberId=" + e.currentTarget.dataset.id + '&orderList=' + 'true' + '&orderNo=' + e.currentTarget.dataset.id + '&deskId=' + e.currentTarget.dataset.deskid
    })
  },
  //已取消的跳转到详细页面
  order(e){
    wx.showToast({
      title: '订单已取消！',
      image: '/image/i/x.png'
    })
    // wx.navigateTo({
    //   url: "/page/order/index?orderMemberId=" + e.currentTarget.dataset.id + '&orderList=' + 'true' + '&orderNo=' + e.currentTarget.dataset.id + '&deskId=' + e.currentTarget.dataset.deskid + '&deskcal=' + 'true'
    // })
  },
  //筛选订单
  filtorder(flags){
    flags = 0
    app.commonAjax('/miniapp/cat/order/verification', ['memberId','shopId'], {flag:flags}, (res) => {

      this.setData({
        contentlist: res.data.data
      })

      if (res.data.data <= 0) {
        this.setData({
          showcontentlist: true
        })
      }

    }, app.globalData, 'post')
  },

  //刷新列表
  MemberList(){
    if (this.data.active_tab != 2){

      this.filtorder(this.data.active_tab)

    }else{
      this.orderMemberList()
    }
  },

  // 获取订单列表全部
  orderMemberList(){
    app.commonAjax('/miniapp/cat/order/orderMemberList', ['memberId','shopId'], {}, (res) => {
 

      if(res.data.code == 0){
        var tab = this.data.tab

        tab[0].tab_num = res.data.data.orderMemberList.length
        tab[1].tab_num = res.data.data.notVerification
        tab[2].tab_num = res.data.data.verification
        tab[3].tab_num = res.data.data.cancel

        if (res.data.data.orderMemberList<=0){
          this.setData({
            showcontentlist:true
          })
        }


        this.setData({
          tab: tab,
          contentlist: res.data.data.orderMemberList,
        })
      }

        

    }, app.globalData, 'post')
  },
  //取消订单
  dealCancel(e){
    console.log(e)
    var orderId = e.currentTarget.id
    var deskId = e.currentTarget.dataset.deskid
    var index = e.currentTarget.dataset.index
    var contentlist = this.data.contentlist
    console.log(contentlist)
    var subdata = {}
    subdata.orderId = orderId
    if (deskId!= 0) {
      subdata.deskId = deskId
    }
    wx.showModal({
      title: '提示',
      content: '预选菜单进入详情页可以进行修改是否确定取消',
      success: (res) =>{
        if (res.confirm) {
          app.commonAjax('/miniapp/cat/order/cancel', ['memberId', 'shopId'], subdata, (res) => {

            this.filtorder()

            // var tab = this.data.tab

            // tab[1].tab_num--

            // tab[3].tab_num++

            // this.setData({
            //   tab: tab
            // })



            // contentlist[index].flag =-1      
            // this.setData({
            //   contentlist: contentlist,
            //   cancel_suc:false,
            // })
            // this.MemberList()
          }, app.globalData, 'post')
        }
      }
    })

  }

})