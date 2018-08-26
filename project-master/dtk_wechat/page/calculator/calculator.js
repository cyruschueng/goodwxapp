var util=require('../../common/util.js')
var app = getApp()
Page({
  data:{
    start_date:util.formatTime2(new Date()),
    end_date: '',
    days:3,
    fullrate:'',
    monrate:'',
    sum:'',
    sumdays:0,
    accural:'0.00',
    surplus:'0.00',
    year:false,
    month:false,
    ybgcolor:'',
    mbgcolor:'',
    forward:false,

    //zhanglianhao
    calshow:false,
    all:'',
    quantity:'',
    lakh:0
  },
  onLoad:function(opt){
    this.WxValidate=app.globalDataValidate(
      {
        sum: {
          required: true
        },
        rate: {
          required: true
        },
        yrate: {
          required: true
        },
        start_date: {
          required: true
        },
        end_date: {
          required: true
        },
        days: {
          required: true
        }
      },
      {
        sum: {
          required: '请填写票面金额'
        },
        yrate: {
          required: '请填写年利率'
        },
        rate: {
          required: '请填写月利率'
        },
        start_date: {
          required: '请选择贴现日期'
        },
        end_date: {
          required: '请选择到期日'
        },
        days: {
          required: '请填写调整天数'
        }
      }
    )

    //设置结束日期
    this.setData({
      end_date:this.monthPlus(this.data.start_date, 6)
    })

    if (opt.forward==1) {
      this.setData({
        sum:opt.sum,
        fullrate:opt.fullrate,
        monrate:opt.monrate,
        start_date:opt.start_date,
        end_date:opt.end_date,
        days:opt.days,
        lakh:opt.lakh
      })
      this.calculate()
    }

    //计算售价----zhanglianhao
    if(opt.calshow){
      this.setData({
        calshow:opt.calshow,
        sum:opt.sumMoney,
        end_date:opt.stardate,
        all:opt.sumMoney,
        quantity:opt.quantity
      })
    }
  },
  /**
   * 开始日期加6个月
   * @param  {[string]} curr [开始日期]
   * @param  {[Number]} num  [增加月份数]
   * @return {[string]}      [结束日期]
   */
  monthPlus:function(curr, num){
    var date=curr//this.data.start_date
    var now=date.split('-')
    var year=now[0]
    var month=parseInt(now[1])
    var days=now[2]

    //判断加6个月是否超过一年
    var substract=(month+num)-12
    if (substract<=0) {
      year=year
      if (month+num<10) {
        month='0'+(month+num)
      } else {
        month=month+num
      }
    } else {
      year=parseInt(year)+1
      month='0'+((month+num)-12)
    }

    //当月份为二月时，根据闰年还是非闰年判断天数
    if (parseInt(month)==2) {
      var sdays
      sdays=(year % 4 == 0) && (year % 100 != 0 || year % 400 == 0) ? 29 : 28
      days=days>sdays?sdays:days
    } else if (parseInt(month) == 1 || parseInt(month) == 3 || parseInt(month) == 5 || parseInt(month) == 7 || parseInt(month) == 8 || parseInt(month) == 10 || parseInt(month) == 12) {
      days=days
    } else {
      days=days>30?30:days
    }
    var end_date=[year, month, days].join('-')
    return end_date
  },
  //返回增加票源页面----zhanglianhao
  goticket:function(){
    var all=this.data.all
    var quantity=this.data.quantity
    var stardate=this.data.end_date
    // wx.redirectTo({
    //   url:`../ticketadd/ticketadd?surplus=${this.data.surplus}&all=${all}&quantity=${quantity}&stardate=${stardate}`
    // })


    var pages=getCurrentPages();//获取当前页面
    var prevPage=pages[pages.length-2]//上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      calculateDate:{
        surplus:this.data.surplus,
        all:all,
        quantity:quantity,
        stardate:stardate
      }
    })
    wx.navigateBack({
      delta: 1
    })
  },
  //转发
  onShareAppMessage:function(res){
    return {
      title: '贴现计算器',
      path: `/page/calculator/calculator?sum=${this.data.sum}&fullrate=${this.data.fullrate}&monrate=${this.data.monrate}&start_date=${this.data.start_date}&end_date=${this.data.end_date}&days=${this.data.days}&lakh=${this.data.lakh}&forward=1`,
      success: res=> {},
      fail:res=>{}
    }
  },
  ycontrol:function(e){
    var value=e.detail.value
    var monrate=parseFloat((value*10)/12).toFixed(6)
    if (value!='') {
      this.setData({
        month:true,
        mbgcolor:'#F5F5F5',
        monrate:monrate,
        fullrate:value
      })
    } else {
      this.setData({
        month:false,
        mbgcolor:'#fff',
        monrate:''
      })
    }
  },
  mcontrol:function(e){
    var value=e.detail.value
    var fullrate=parseFloat((value*12)/10).toFixed(6)
    if (value!='') {
      this.setData({
        year:true,
        ybgcolor:'#F5F5F5',
        fullrate:fullrate,
        monrate:value
      })
    } else {
      this.setData({
        year:false,
        ybgcolor:'#fff',
        fullrate:''
      })
    }
  },
  formSubmit:function(e){
    if(!this.WxValidate.checkForm(e)){
       const error = this.WxValidate.errorList[0]
       wx.showToast({
         title: `${error.msg} `,
         image: '../../image/warn.png',
         duration: 2000
       })
       return false
     }

     var idays=this.days()
     var addays=parseInt(e.detail.value.days)
     var days=idays+addays

     var sum=e.detail.value.sum
     var rate=parseFloat(e.detail.value.rate/30000)
     var yrate=parseFloat(e.detail.value.yrate/100)
     var yearinpue=e.detail.value.yrate
     var lakh=e.detail.value.lakh

     sum=parseFloat(sum*10000)
     var poundage=lakh*(sum/100000)
     if (rate==='0' || yearinpue==='0') {
       this.setData({
         sumdays:days,
         accural: poundage,
         surplus:sum-poundage,
       })
     }else{
       var accural,surplus//利息，贴现金额
       if (e.detail.value.rate=='') {
         // 贴现付款额＝票据面额×（1－年贴现率×未到期天数÷360天）
         surplus=parseFloat((sum*(1-(yrate*days)/360))-poundage).toFixed(2)
         accural=parseFloat(sum-surplus).toFixed(2)

         this.setData({
           sumdays:days,
           accural:accural,
           surplus:surplus,
         })
       } else {
         accural=parseFloat(sum*rate*days+poundage).toFixed(2)
         surplus=parseFloat(sum-accural-poundage).toFixed(2)

         this.setData({
           sumdays:days,
           accural:accural,
           surplus:surplus,
         })
       }
     }
  },
  calculate:function(){
    var csum=this.data.sum
    var cfullrate=this.data.fullrate
    var cmonrate=this.data.monrate
    var cdays=this.data.days
    var lakh=this.data.lakh

    var idays=this.days()
    var addays=parseInt(cdays)
    var days=idays+addays

    var sum=csum
    var rate=parseFloat(cmonrate/30000)
    var yrate=parseFloat(cfullrate/100)
    var yearinpue=cfullrate

    sum=parseFloat(sum*10000)
    var poundage=lakh*(sum/100000)
    if (rate==='0' || yearinpue==='0') {
      this.setData({
        sumdays:days,
        accural:0,
        surplus:sum-poundage,
      })
    }else{
      var accural,surplus//利息，贴现金额
      if (cmonrate=='') {
        // 贴现付款额＝票据面额×（1－年贴现率×未到期天数÷360天）
        surplus=parseFloat((sum*(1-(yrate*days)/360))-poundage).toFixed(2)
        accural=parseFloat(sum-surplus).toFixed(2)

        this.setData({
          sumdays:days,
          accural:accural,
          surplus:surplus,
        })
      } else {
        accural=parseFloat(sum*rate*days).toFixed(2)
        surplus=parseFloat(sum-accural-poundage).toFixed(2)

        this.setData({
          sumdays:days,
          accural:accural,
          surplus:surplus,
        })
      }
    }
  },
  days:function(){
    var start=this.data.start_date.split('-')
    var end=this.data.end_date.split('-')
    var astart=new Date(start[1] + '/' + start[2] + '/' + start[0])
    var aend=new Date(end[1] + '/' + end[2] + '/' + end[0])
    var days= parseInt(Math.abs(aend  -  astart)  /  1000  /  60  /  60  /24)
    return days
  },
  formReset:function(){
    this.setData({
      sumdays:'0',
      accural:'0.00',
      surplus:'0.00',
      mbgcolor:'',
      ybgcolor:'',
      year:false,
      month:false,
      start_date:this.data.start_date,
      end_date:this.data.end_date
    })
  },
  bindStartDate:function(e){
    this.setData({
      start_date:e.detail.value
    })
  },
  bindEndDate:function(e){
    this.setData({
      end_date:e.detail.value
    })
  },
  //调整天数
  changeday:function(e){
    this.setData({
      days:e.detail.value
    })
  },
  sumMoney:function(e){
    this.setData({
      sum:e.detail.value
    })
  },
  lakhchange:function(e){
    this.setData({
      lakh:e.detail.value
    })
  },























})
