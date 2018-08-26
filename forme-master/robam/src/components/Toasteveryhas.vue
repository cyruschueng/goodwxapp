<template>
  <div class="toast toasteveryhas">
    <!--word-->
    <div class="wordp ab">
      <!--closebtn-->
      <slot></slot>
      <!--word-->
      <div class="word ab">
        <img class="titimg" src="./../assets/images/r_everytit2.png">
        <img class="quan" src="./../assets/images/r_quan.png">
        <p>使用规则：</p>
        <p>6.8-6.23老板电器京东自营旗舰店购买产品满3000元，即可在原有赠品基础上加赠保鲜玻璃饭盒八件套，凭加赠券截图联系客服即可领取</p>
        <img class="sharebtn" @click="tojdShop" src="./../assets/images/r_jingdongbtn2.png">
      </div>
    </div>
  </div>
</template>

<script>
import codoonBrige from './../assets/scripts/codoon-native-bridge';
export default {
  name: 'toasteveryhas',
  components:{

  },
  methods: {
     tojdShop(){
       _hmt.push(['_trackEvent', '每日一领外链', 'click', 'every'])
       var nativejs=new codoonBrige();
       nativejs.jumpNative({
         type: 'webView',
         value: 'https://sale.jd.com/m/act/UpqsFmPOBdER.html'
       }, function() {
//          alert("从打开的新页面 回来了");
       });
     }
  },
  data () {
    return {

    }
  },
  computed: {

  },
  mounted: function () {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" scoped lang="scss">
  .wordp{
    top: 50%;
    left: 50%;
    width: 600px;
    height: 746px;
    position: absolute;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    background: #2a70ff;
    border-radius: 30px;
    .word{
      width: 600px;
      height: 746px;
      background: #2a70ff;
      border-radius: 30px;
      box-sizing: border-box;
      padding: 50px;
      background: url("./../assets/images/r_toastbg1.png") no-repeat;
      background-size: cover;
      .titimg{
        width: 274px;
        height: 57px;
        display: block;
        margin: 0 auto;
      }
      .quan{
        width: 504px;
        height: 200px;
        display: block;
        margin: 0 auto;
        margin-top: 20px;
        margin-bottom: 20px;
      }
      p{
        color: white;
        font-size: 24px;
        font-weight: lighter;
      }
      .sharebtn{
        width: 494px;
        height: 74px;
        display: block;
        margin: 0 auto;
        margin-top: 100px;
      }
    }
  }
</style>
