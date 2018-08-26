var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active_tab:'-1',
    box_show:0,
    box1_show:0,
    box3_show: 0,
    box6_show:0,
    active_dask: '',// 当前餐桌ID
    btn:0,
    numbers:0,
    daskList:[],//
    total: 0,//总条数
    now_total:0,//当前条数
    page:0,//页面
    limit:18,//每页数
    flag:-1,//类型
    active_flag:0,//当前选中的状态
    daskIndex:'', //当前选中的索引
    billsLogId: '',//验单订单ID
    id: '', 
    offset:0,
    deskNo:'',
    flag_tab:[
      // {
      //   text:'锁定',
      //   num:'4'
      // },
      {
        text: '预定',
        num: '1'
      },
      {
        text: '空闲',
        num: '0'
      }
    ],
    flag_num:'',
    tab:[
      {
        text:'全部',
        num:'-1'
      },
      {
        text: '空闲',
        num: '0'
      },
      {
        text: '就餐',
        num: '2'
      },
      {
        text: '预订',
        num: '1'
      },
      {
        text: '锁定',
        num: '4'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '餐桌列表'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    this.setData({
      page: 0,
      offset: 0
    })
    this.tableList(0)

  },


  //刷新顶部
  onshow_boton(){
    this.setData({
      page: 0,
      daskIndex: '',
      deskNo: '',
      active_dask: '',
      active_flag: 0,
      page: 0,
      btn: 0,
      offset: 0
    })
    this.tableList(0)
  },

  onPullDownRefresh(){
    this.setData({
      page: 0,
      offset: 0
    })
    this.tableList(0, this.data.flag,true) //第三个参数表示下拉刷新
  },

  //触底加载
  onReachBottom(){
    if(this.data.total > this.data.now_total){
      
      this.setData({
        offset: (this.data.page) * this.data.limit
      })
      this.tableList(this.data.page * this.data.limit, this.data.flag) // (起始位置,加载类型)
    }else{
    }
  },
  tableList(offset, flag, pull) { //(起始位置,加载类型,是否下拉刷新)
    
      var subdata = {};
      subdata.limit = this.data.limit; // 
      subdata.offset = this.data.offset;

      // if(flag>=0){
      //   subdata.flag = flag
      // }
      if (this.data.active_tab >= 0) {
        subdata.flag = this.data.active_tab
      }

      this.getTableList(subdata,pull)
    
  },

  //获取列表
  getTableList(subdata,pull){
    
    var offset = subdata.offset // 起始位置
    app.commonAjax('/shop/manage/table/list', ['shopId'], subdata, (res) => {
      if (offset == 0) {
        this.setData({
          daskList: res.data.data.rows,
          total: res.data.data.total,
          now_total: res.data.data.rows.length,
          page: 1
        })
        wx.stopPullDownRefresh()
      } else {
        var oldDaskList = this.data.daskList;
        for (var i in res.data.data.rows) {
          oldDaskList.push(res.data.data.rows[i])
        }



        this.setData({
          daskList: oldDaskList,
          now_total: oldDaskList.length,
          page: this.data.page + 1
        })
      }
    }, app, 'get')
  },

  //切换状态
  change_active_tab (e) {

    if (e.currentTarget.dataset.index == this.data.flag) {

    }else{
      this.setData({
        daskIndex: '',
        deskNo: '',
        active_dask: '',
        active_flag: 0,
        page: 0,
        btn: 0,
        offset:0
      })
    }

    this.setData({
      flag: e.currentTarget.dataset.index,
      active_tab: e.currentTarget.dataset.index
    })


    this.setData({
      page: 0,
      offset: 0
    })
    

    this.tableList(0)
    
  },
  //选中桌子
  active_dask_change (e){

    
    if (e.currentTarget.dataset.index === this.data.active_dask){
      this.setData({
        daskIndex: '',
        deskNo: '',
        active_dask: '',
        active_flag: 0,
        btn: 0
      })
    }else{
      this.setData({
        daskIndex: e.currentTarget.dataset.daskindex,
        deskNo: e.currentTarget.dataset.deskno,
        active_dask: e.currentTarget.dataset.index,
        active_flag: e.currentTarget.dataset.flag,
        flag_num: e.currentTarget.dataset.flag,
        btn: true
      })
    }

    
  },

  //刷新桌子状态
  desk_flag(flag, useNum){

    // var key = 'daskList[' + this.data.daskIndex + '].flag'

    var newdaskList = this.data.daskList;

    newdaskList[this.data.daskIndex].flag = flag
    newdaskList[this.data.daskIndex].useNum = useNum

    // console.log(newdaskList[this.data.daskIndex])

    this.setData({

      daskList: newdaskList,
      active_flag: flag,
      flag_num: flag
    })

  },



  catchtouchmove(e){
    
  },



  //控制下面按钮的显示
  show_box1(e) { // 开台
    this.setData({
      numbers: this.data.daskList[this.data.daskIndex].useNum,
      box_show: !this.box_show,
      box1_show: !this.box1_show
    })
  },
  show_box2(e){
    // wx.navigateTo({ url: "/page/verifymenu/index?deskTypeId=" + this.data.active_dask + "&deskNo=" + this.data.deskNo })
    wx.navigateTo({ url: "/page/pay/index?deskId=" + this.data.active_dask + "&deskNo=" + this.data.deskNo })
  },
  show_box3(e) { // 开台
    this.setData({
      box_show: !this.box_show,
      box3_show: !this.box3_show
    })
  },
  show_box4(e){
    wx.navigateTo({
      url: '/page/changeTable/index?id=' + this.data.active_dask
    })
  },
  show_box5(e) {
    wx.navigateTo({
      url: '/page/takeoutpay/index?deskId=' + this.data.active_dask + '&deskNo=' + this.data.deskNo
    })
  },
  show_box6(e) { // 开台
    this.setData({
      box_show: !this.box_show,
      box6_show: !this.box6_show
    })
  },
  close_box () {
    this.setData({
      box_show:0,
      box1_show: 0,
      box3_show: 0,
      box6_show: 0
    })
  },
  scan(){
    wx.scanCode({
      success: (res) => {

        this.setData({
          billsLogId: res.result
        })
      },
      fail:(res)=>{
      }
    })
  },
  add_person(){
     this.setData({
       "numbers":this.data.numbers+1
     })
  },
  del_person() {
    this.setData({
      "numbers": this.data.numbers > 0 ? this.data.numbers - 1 : this.data.numbers=0
    })
  },
  //确认并且点菜
  useDesk_takeoutpay(){
    this.useDesk(5);
    
    
  },
  //开台确定
  useDesk(ee,ff){
    var subdata = {};
    subdata.id = this.data.active_dask;
    subdata.useNum = this.data.numbers;
    if(this.data.numbers>0){
      app.commonAjax('/shop/manage/table/useDesk', [], subdata, (res) => {

        if (res.data.code == 0) {

        

          //this.desk_flag(4, parseInt(subdata.useNum))//改为锁定状态


          if (ee == 5) { // 确认并且点餐
            this.show_box5();
            this.close_box()
          }else if(ff){ //确认并且扫单

            wx.scanCode({
              success: (res) => {

                // this.setData({
                //   billsLogId: res.result
                // })


                wx.navigateTo({
                  url: '/page/menuList/index?id=' + res.result + '&deskId=' + this.data.active_dask + "&deskNo=" + this.data.deskNo
                })

                // this.verifyAndOrder()

              },
              fail: (res) => {

              }
            })

          }else{
            
            wx.showToast({
              title: '修改成功',
              icon:'success',
              duration: 2000
            })

            this.setData({
              page: 0,
              daskIndex: '',
              deskNo: '',
              active_dask: '',
              active_flag: 0,
              page: 0,
              btn: 0,
              offset: 0
            })

            this.tableList(0)
          }

          
          setTimeout(() => {
            this.setData({
              box_show: 0,
              box1_show: 0
            })
          }, 0)
        }else{
          wx.showToast({
            title: res.message,
            image: '/image/i/x.png',
            duration: 2000,
            success: () => {

            }
          })
        }

      }, app, 'post')
    } else {
      wx.showToast({
        title: '人数不能为0',
        image: '/image/i/x.png',
        duration: 2000,
        success: () => {

        }
      })
    }
  },

  //管理
  change_tableManage(e){
    this.setData({
      flag_num: e.currentTarget.dataset.num
    })
  },
  tableManage() {
    if (this.data.flag_num>=0){
      var subdata = {};
      subdata.id = this.data.active_dask;
      subdata.flag = this.data.flag_num;
      subdata.isCheck = true;
      app.commonAjax('/shop/manage/table/tableManage', ['shopId'], subdata, (res) => {
        
        if(res.data.code == 0){

          this.desk_flag(parseInt(subdata.flag),0)//改为状态

          wx.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 2000,
            success: () => {


              
              
              // this.setData({
              //   page: 0,
              //   offset: 0
              // })
              // this.tableList(0)
              setTimeout(() => {
                this.setData({
                  box_show: 0,
                  box6_show: 0
                })
              }, 0)
            }
          })
        }else{
          wx.showToast({
            title: '存在未结账订单',
            image:'/image/i/x.png',
            duration: 2000,
            success: () => {
              
            }
          })
        }
        
      }, app, 'post')
    }
  },
  placeorder(){

    this.useDesk(false, true)

    
    
  },

  

  //验单
  change_billsLogId(e){
    this.setData({
      billsLogId: e.detail.value
    })
  },

  //仅仅验单
  verify(){

    if (this.data.billsLogId) {


      if (/^[0-9]*$/.test(this.data.billsLogId)) {


        this.setData({
          box_show: 0,
          box3_show: 0
        })

        var billsLogId = this.data.billsLogId

        this.setData({
          billsLogId: ''
        })
        
        wx.navigateTo({
          url: '/page/menuList/index?id=' + billsLogId + '&deskId=' + this.data.active_dask + "&deskNo=" + this.data.deskNo,
          success:()=>{
            this.setData({
              billsLogId:''
            })
          }
        })
        
      } else {

        wx.showModal({
          title: '提示',
          content: '订单号格式有误！是否重新输入',
          success:  (res) => {
            if (res.confirm) {
              this.setData({
                billsLogId: ''
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })

        // wx.showToast({
        //   title: '订单号格式有误！',
        //   image: '/image/i/x.png',
        //   duration: 2000,
        //   success: () => {
        //     this.setData({
        //       billsLogId: ''
        //     })
        //   }
        // })
      }

    } else {

      

      wx.showToast({
        title: '未填写订单号！',
        image: '/image/i/x.png',
        duration: 2000,
        success: () => {

        }
      })
    }

  },


  //验单并且下单
  verifyAndOrder(){
    var subdata = {}

    if (this.data.billsLogId){


      if (/^[0-9]*$/.test(this.data.billsLogId)){
        subdata.orderId = this.data.billsLogId;
        subdata.deskId = this.data.active_dask;


        app.commonAjax('/shop/manage/order/submit', ['shopId'], subdata, (res) => {

          if (res.data.code == 0){

            this.desk_flag(2)//改为就餐状态

            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000,
              success:()=>{

                this.setData({
                  box_show: 0,
                  box3_show: 0
                })


                wx.navigateTo({ url: "/page/verifymenu/index?deskTypeId=" + this.data.active_dask + "&deskNo=" + this.data.deskNo })


                // this.setData({
                //   page: 0,
                //   offset: 0
                // })

                // this.tableList(0)

                
                this.close_box()
                this.setData({
                  billsLogId: ''
                })
              }
            })

          } else {
            wx.showToast({
              title: res.data.message,
              image: '/image/i/x.png',
              duration: 2000
            })
            this.setData({
              billsLogId: ''
            })
          }

        }, app, 'post')
      }else{

        wx.showModal({
          title: '提示',
          content: '订单号格式有误！是否重新输入',
          success:  (res)=> {
            if (res.confirm) {
              this.setData({
                billsLogId: ''
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })

        // wx.showToast({
        //   title: '订单号格式有误！',
        //   image: '/image/i/x.png',
        //   duration: 2000,
        //   success: () => {
        //     this.setData({
        //       billsLogId:''
        //     })
        //   }
        // })
      }

      
    }else{
      wx.showToast({
        title: '未填写订单号！',
        image: '/image/i/x.png',
        duration: 2000,
        success: () => {

        }
      })
    }

    
    
    
    
  }
})