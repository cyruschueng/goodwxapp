<template>
  <div class="page-buyer-twsm">
    <div class="banner1">
      <div class="clearfix">
        <div class="head-img-box">
          <img :src="imgHead" class="head-img">
        </div>
        <div class="head-r">
          <div class="name-box">
            <span class="name">
              {{userName}}
            </span>
            <span class="tw">摊位</span>           
          </div>
          <div class="phone-box">
            <span class="phone">
              {{userPhone}}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="banner2">
      <div class="item clearfix">
        <span class="tlt text-right">商品名:</span>
        <span class="txt">
          {{proName}}
        </span>
      </div>
      <div class="item clearfix">
        <span class="tlt text-right">品&nbsp;&nbsp;&nbsp;类:</span>
        <span class="txt">
          {{proClass}}
        </span>
      </div>
      <div class="item clearfix">
        <span class="tlt text-right">批次号:</span>
        <span class="txt">
          {{batchCore}}
        </span>
      </div>
      <div class="item clearfix">
        <span class="tlt text-right">生产日期:</span>
        <span class="txt">
          {{year}}-{{month}}-{{day}}
        </span>
      </div>
      <div class="item clearfix">
        <span class="tlt text-right">单&nbsp;&nbsp;&nbsp;价:</span>
        <span class="txt">{{price}}元/{{unit}}</span>
      </div>
    </div>
    <div class="banner3 clearfix">
      <div class="tlt">
        <span>质检报告:</span>
      </div>
      <div class="ctnt">
        <img :src="imgZJ" @click="showPic(imgZJ)" v-if="imgZJ.length > 0">
        <p v-if="imgZJ.length <= 0">暂无</p>
      </div>
    </div>
  </div>  
</template>

<script>
import topNav from '../topNav.vue'

export default {
  components: { topNav },
  data() {
    return {
      imgHead: config.picURL.head,
      userName: '',
      userPhone: '',
      proName: '',
      proClass: '',
      price: 0,
      unit: '',
      imgZJ: '',
      year: '',
      month: '',
      day: '',
      batchCore: ''
    }
  },
  mounted (){
    commom.setmiddle([$('.name-box span'), $('.phone-box .phone')])
  },
  methods: {
    showPic: function(url){
      window.location.href = url
    }
  },
  beforeMount: function(){
    var vm = this 
    var ProductId = vm.$route.query.ProductId
    commom.getDataList('ysh/GetProductInfo', {productId: ProductId}, function(d){
      if(d.aaData.length > 0){
        var data = d.aaData[0]
        var cDate = new Date(data.CreatDate)
        vm.year = cDate.getFullYear()
        vm.month = cDate.getMonth()
        vm.day = cDate.getDate()
        vm.batchCore = data.BatchCore
        vm.proName = data.ProductName
        vm.price = data.Price
        vm.unit = data.Unit
        vm.proClass = data.ProductClass
        if(data.PictureUrl) vm.imgZJ = config.yshURL + data.PictureUrl
        var userid = data.UserId
        commom.getDataList('GetUserInfo', {userid: userid}, function(d){
          if(d.aaData && d.aaData.length > 0){
            var data = d.aaData[0]
            vm.userName = data.UserName
            vm.userPhone = data.PhoneNum
            var wxData = d.aaData[1]
            vm.imgHead = wxData.headimgurl
          }
        })
      }      
    })
    
  }
}
</script>