const common=require('../../common/common.js')
var app = getApp()
var page_no=0
var page_size=20
Page({
  data:{
    showLoading:false,
    searchVal:'',
    bankData:[],
    result:false,
    isSearch:true,
    page_no:0,
    bankInfo:[
      {
        name:'银行',
        institution:'机构名称',
        number:'联行行号'
      },{
        name:'工商银行',
        institution:'中国工商银行总行清算中心',
        number:'102100099996'
      },{
        'name':'中国银行',
        'institution':'中国银行总行',
        'number':'104100000004',
      },{
        'name':'农业银行',
        'institution':'中国农业银行股份有限公司总行营业部（非转汇行）',
        'number':'103100000018',
      },{
        'name':'建设银行',
        'institution':'中国建设银行总行',
        'number':'105100000017',
      },{
        'name':'交通银行',
        'institution':'交通银行总行营业部',
        'number':'301290011110',
      },{
        'name':'招商银行',
        'institution':'招商银行总行营业部',
        'number':'308584001024',
      },{
        'name':'民生银行',
        'institution':'中国民生银行总行',
        'number':'305100000013',
      },{
        'name':'浦发银行',
        'institution':'上海浦东发展银行第一营业部',
        'number':'310290098012',
      },{
        'name':'兴业银行',
        'institution':'兴业银行总行',
        'number':'309391000011',
      },{
        'name':'平安银行',
        'institution':'平安银行总行营业部',
        'number':'307584008005',
      },{
        'name':'中信银行',
        'institution':'中信银行总行营业部',
        'number':'302100011106',
      },{
        'name':'光大银行',
        'institution':'中国光大银行',
        'number':'303100000006',
      },{
        'name':'广发银行',
        'institution':'广东发展银行上海分行',
        'number':'306290003518',
      },{
        'name':'邮储银行',
        'institution':'中国邮政储蓄银行总行',
        'number':'403100000004',
        },{
        'name':'华夏银行',
        'institution':'华夏银行股份有限公司总行',
        'number':'304100040000',
      },{
        'name':'北京银行',
        'institution':'北京银行',
        'number':'313100000013',
      },{
        'name':'厦门银行',
        'institution':'厦门银行股份有限公司',
        'number':'313393080005',
      },{
        'name':'上海银行',
        'institution':'上海银行股份有限公司',
        'number':'325290000012',
      },{
        'name':'上海农村商业银行',
        'institution':'上海农村商业银行',
        'number':'322290000011',
      }
    ]
  },
  onLoad:function(opt){
    var key=opt.key
    console.log(key)
    if (key==undefined) {
      this.setData({
        searchVal:'',
        bankData:[]
      })
    }else{
      this.setData({
        searchVal:key,
        isSearch:false
      })
      this.clickSearch()
      console.log('转发')
    }

  },
  //转发
  onShareAppMessage:function(res){
    return {
      title: '大额行号搜索',
      path: `/page/bankquery/bankquery?key=${this.data.searchVal}`,
      success: res=> {},
      fail:res=>{}
    }
  },
  //监听输入关键字
  searchVal:function(e){
    var value=e.detail.value
    if(value===''){
      this.setData({
        bankData:[]
      })
    }else{
      this.setData({
        searchVal:e.detail.value
      })
    }
  },
  //点击搜索
  clickSearch:function(){
    var value=this.data.searchVal
    var _this=this;
    page_no=0
    if (value=='') {
      wx.showToast({
        title:'请输入搜索内容',
        image:'../../image/warn.png',
        duration:2000
      })
      return false
    } else {
      this.setData({
        bankData:[],
        showLoading:true,
        isSearch:false
      })
      setTimeout(()=>this.search(),500)
    }
  },
  //搜索
  search:function(){
    wx.request({
      method:'GET',
      url: common.getRequestUrl + '/dtk/search/bankinfo',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        page_no:page_no,
        page_size:page_size,
        key:this.data.searchVal
      },
      success:res=>{
        this.setData({showLoading:false})
        var dataLength=res.data.data.length
        if(res.data.code==='OK'){
          if(dataLength<=0){
            wx.showToast({
              title: '没有数据了',
              image: '../../image/warn.png',
              duration: 2000,
            })
          } else {
            var data=this.data.bankData
            for(let i=0;i<dataLength;i++){
              data.push(res.data.data[i])
            }

            this.setData({
              bankData:data,
              result:true
            })

            page_no++
          }
        } else {
          wx.showToast({
            title: res.data.msg,
            image: '../../image/warn.png',
            duration: 2000,
          })
        }
      }
    })
  },
  //监听上拉刷新，上拉累计数据条数
  onReachBottom:function(e){
    var value=this.data.searchVal

    if (value=='') {
      return false
    } else {
      this.setData({
        showLoading:true,
        isSearch:false
      })
      setTimeout(()=>this.search(),500)
    }

  },















})
