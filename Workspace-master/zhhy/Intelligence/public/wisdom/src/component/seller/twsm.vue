<template>
  <div class="page-twsm">
    <div class="banner1">
      <div class="clearfix">
        <div class="head-img-box">
          <img src="lib/img/head.jpg" class="head-img">
        </div>
        <div class="head-r">
          <div class="name-box">
            <span class="name">{{userName}}</span>
            <span class="tw">摊位</span>           
          </div>
          <div class="phone-box">
            <span class="phone">{{userPhone}}</span>
          </div>
        </div>
      </div>
    </div>

<!--     <div class="add">
      <div class="add_icon" @click="addSellProduct"></div>
      <span @click="addSellProduct">增加售卖商品</span>
    </div> -->

    <div class="list">
      <div class="item clearfix" v-for="item in itemList">
        <div class="item-l">
          <div class="item-l-t">
            <span class="name">
              {{item.name}}
            </span>
          </div>
          <div class="item-l-b">
            <div>
              <span class="date">
                距今:<span>{{item.xDay}}天{{item.xHour}}小时</span>
              </span>
            </div>
            <div>
              <span class="type">{{item.type}}</span>
              <span class="price">￥{{item.price}}/{{item.unit}}</span>
            </div>
            <div>
              <span>
              生产时间{{item.year}}-{{item.month}}-{{item.day}}
              </span>   
            </div>                     
          </div>
          <div class="zjbg-box flex-y-center">
            <span class="a-upload" @click="upload(item.Id)">
              上传质检报告<img :src="uploadImg">
            </span>            
          </div>  
        </div>
        <div class="item-right">
          <div class="item-r-t clearfix">
            <div class="item-c text-center">
              <img :src="item.count <= 1 ? imgCut : imgCutActive" @click="cut(item)">
            </div>
            <div class="item-c text-center">
              <span>
                {{item.count}}
              </span>
            </div>
            <div class="item-c text-center">
              <img :src="imgPlus" @click="plus(item)">
            </div>
            <div class="item-r text-center">
              <img :src="item.checked === 1 ? imgChose : imgUnchose" @click="chose(item)">              
            </div>
          </div>
          <div class="item-r-b">
            <div class="text-right">库存: {{item.count}}{{item.unit}}</div>
            <div class="text-right">来源: {{item.userName}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="add-box" v-if="userRole != 4">
      <div class="add-pro" @click="add"></div>
      <div @click="add">新增</div>
    </div>
    <div class="banner-btn clearfix">
      <div class="text-center btns-box">
        <img :src="bannerBtn[0].picURL" @click="showCode" class="btns">
      </div>
      <div class="text-center btns-box">
        <img :src="bannerBtn[1].picURL" @click="toJYLB" class="btns">
      </div>
    </div> 
  </div>  
</template>

<script>
import topNav from '../topNav.vue'
import { Indicator } from 'mint-ui'
import { Toast } from 'mint-ui';

export default {
  components: { topNav, Indicator, Toast },
  data() {
    return {
      listData: config.smrzList,
      itemList: [],
      imgChose: config.picURL.chose,
      imgUnchose: config.picURL.unchose,
      userName: '',
      userPhone: '',
      imgPlus: config.picURL.plus,
      imgCut: config.picURL.cut,
      imgCutActive: config.picURL.cutActive,
      totlePrice: 0,
      bannerBtn: [
        {picURL: config.picURL.bannerBtn['code']},
        {picURL: config.picURL.bannerBtn['cklb']}
      ],
      uploadImg: config.picURL.upload,
      isLoad: true,
      userID: window.localStorage.getItem('zhhy_user_id'),
      userRole: window.localStorage.getItem('zhhy_user_role')
    }
  },
  mounted (){ 
    var vm = this
    if(vm.userID == 0){
      commom.passPort(vm, function(){
        vm.getData()
      })
    }else{
      vm.getData()
    }   
    commom.setmiddle([$('.name-box span'), $('.phone-box .phone'), $('.item-l-t .name'), $('.item-l-b span')])    
  },
  methods: {
    chose: function(item){      
      if(item.pic === 0){
        commom.msg('该商品无质检报告')
      }else{
        item.checked === 1 ? item.checked = 0 : item.checked = 1
      }
    },
    showCode: function(){
      var vm = this
      var arr = []
      for(var i = 0, l = vm.itemList.length; i < l; i++){
        if(vm.itemList[i].checked === 1){
          var o = {}
          o.pid = vm.itemList[i].Id
          o.num = vm.itemList[i].count
          o.price = vm.itemList[i].price
          vm.totlePrice = vm.totlePrice + o.num*o.price
          arr.push(o)
        }        
      }
      if(arr.length > 0){
        vm.totlePrice = parseFloat(vm.totlePrice).toFixed(2)
        commom.getDataList('ordernumber', {
          userid: vm.userID,
          totlaprice: vm.totlePrice,
          prolist: arr
        }, function(d){          
          if (window.WebSocket) {
            $.ajax({
              url: config.apiURL + 'ysh/getSesskey',
              type: 'POST',
              success: function(ret){
                if(ret && ret.status === 0){
                  var webSocket = new WebSocket(config.socketURL)
                  webSocket.onopen = function(ev){
                    console.log(ev) 
                    webSocket.send(JSON.stringify({sesskey: ret.aaData[0].sesskey})) 
                    webSocket.onmessage = function(event) {
                      console.log(event) 
                      var loading = JSON.parse(event.data).aaData[0].loding
                      if(loading == 2){
                        Indicator.open('等待买方确认...')
                        $('.loading-mask').addClass('active')
                        vm.loading(30, webSocket)
                      }
                      if(loading == 3){
                        vm.closeLoad(webSocket)
                        commom.msg('买方已确认') 
                      }
                      if(loading == 4){
                        vm.closeLoad(webSocket)
                        commom.msg('买方已取消')  
                      }                  
                    }
                    webSocket.onclose = function(event) { 
                      console.log('Client notified socket has closed',event); 
                    }
                  }
                  var url = window.location.href.split(vm.$route.fullPath)[0] 
                          + '/buyer/jysh?ordnumber=' 
                          + d.aaData.ordernumber 
                          + '&sesskey=' 
                          + ret.aaData[0].sesskey
                  commom.showQR(url)
                }
              }
            })       
          }          
        })
      }else{
        commom.msg('请选择商品')
      }            
    },
    toJYLB: function(){
      this.$router.push({name: 'seller_jylb'})
    },
    cut: function(item){
      if(item.count > 1){
        item.count--
      }
    },
    plus: function(item){
      item.count++
    },
    add: function(){
      this.$router.push({name: 'add'})
    },
    // 添加售卖商品
    addSellProduct:function(){
      let vm = this;
      this.$router.push({name: 'spbj'})
    },
    getData: function(callback){
      var vm = this
      commom.getDataList('ysh/GetUserInfo', {User_id: vm.userID}, function(d){
        if(d.aaData && d.aaData.length > 0){
          var data = d.aaData[0]
          vm.userName = data.UserName
          vm.userPhone = data.PhoneNum
        }
      })   
      commom.getDataList('ysh/GetUserProductList', {User_id: vm.userID}, function(d){
        if(d.aaData && d.aaData.length > 0){
          var dataList = d.aaData,arr=[]
          for (let [index, elem] of dataList.entries()) {
            var o = {}
            var cTime = new Date(elem.CreatDate).getTime()
            var cDate = new Date(elem.CreatDate)
            var nTime = new Date().getTime()
            var xTime = nTime - cTime 
            xTime = xTime > 0 ? parseInt(xTime/1000) : 0
            o.xDay = parseInt(xTime / (24 * 60 * 60))
            o.xHour = parseInt(xTime / (60 * 60) % 24)
            o.year = cDate.getFullYear()
            o.month = cDate.getMonth()
            o.day = cDate.getDate()
            o.name = elem.ProductName
            o.type = elem.ProductClass
            o.count = elem.Amount < 0 ? 0 : elem.Amount
            o.price = elem.Price
            o.unit = elem.Unit
            o.userName = elem.UserName
            if(elem.Picture !== null && elem.Picture > 0){
              o.pic = 1
              o.checked = 1
            }else{
              o.pic = 0
              o.checked = 0
            }            
            o.Id = elem.Id
            arr.push(o) 
          }
          vm.itemList = arr    
        }
      })
    },
    loading: function(n, webSocket){
      var vm = this
      if(n > 0){
        setTimeout(function(){
          vm.loading(n - 1, webSocket)
        }, 1000)
      }else if(vm.isLoad === true){
        Indicator.close()
        $('.loading-mask').removeClass('active')
        webSocket.close()
        commom.closeQR()
      }
    },
    closeLoad: function(webSocket){
      this.isLoad = false
      Indicator.close()
      $('.loading-mask').removeClass('active')
      webSocket.close()
      commom.closeQR()
    },
    upload: function(id){
      this.$router.push({name: 'upload', params: { id: id }})
    }
  }
}
</script>