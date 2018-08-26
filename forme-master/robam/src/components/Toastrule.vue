<template>
  <div class="toast toastrule">
    <!--word-->
    <div class="wordp ab">
      <!--closebtn-->
      <slot></slot>
      <!--word-->
      <div class="word ab">
        <img class="titimg" src="./../assets/images/r_ruletit.png">
        <p><span>活动时间：</span>6月8日-6月17日</p>
        <p><span>活动规则：</span></p>
        <p><span>勋章任务日</span></p>
        <p><span>炫耀达人勋章：</span>6月8日-17日</p>
        <p><span>真爱粉勋章：</span>6月11-13日</p>
        <p><span>互动达人勋章：</span>6月14-16日</p>
        <p><span> 疯狂卡路里终极达人勋章：</span>6月17日</p>
        <p>在勋章任务开启并在对应时间内完成任务即可点亮对应勋章并获得一次抽奖机会，点亮4枚勋章即可获得终极大奖，凭兑换码至老板电器电子商务官方微信（微信号：robamEC）联系小编，兑换价值999元的电压力煲一台，数量有限，先到先得。</p>
        <p>（每个ID完成每个勋章任务仅可获得一次抽奖机会）</p>
        <p><span>常规任务日：</span>6月9日-10日；6月12日-13日；6月15日-16日；连续的两个常规任务日均完成日行6000步任务即可分别获得一次抽奖机会。</p>
        <p><span>每日一领</span></p>
        <p>点击“每日一领”可领取加赠券，在6月8日-6月23日期间前往老板电器京东自营旗舰店购物满3000元，即可在原有赠品基础上加赠玻璃保鲜盒八件套，凭截图进店联系客服即可领取，数量有限，先到先得（每个ID活动期间仅有一次领取机会）</p>
        <!--<p><span>分享有奖</span></p>-->
        <!--<p>6月8日-6月23日活动期间，分享活动至咕咚运动圈及微信朋友圈，即可点亮一枚勋章，获得一次抽奖机会（每个ID活动期间仅有一次抽奖机会）。</p>-->
        <p><span>奖品设置：</span></p>
        <p>加赠券（加赠玻璃保鲜盒八件套）：共1000张 </p>
        <p><span>抽奖奖品</span></p>
        <p>老板电器电热水壶：50个</p>
        <p>环保竹纤维儿童餐具：50套</p>
        <p>WMF平底煎盘：50个</p>
        <p>咕咚跑鞋：10双</p>
        <p>咕咚防晒服：29件</p>
        <p>咕咚腰包：50个</p>
        <p>咕咚T-shirt：30件</p>
        <p>咕咚速干护臂：50对</p>
        <p><span>终极大奖</span></p>
        <p>价值999元老板电器电压力煲：50个</p>
        <p>特别申明：活动由咕咚app提供，与设备生产商苹果公司（Apple lnc)无关</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'toastrule',
  components:{

  },
  methods: {

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
    width: 700px;
    height: 978px;
    position: absolute;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    background: #2a70ff;
    border-radius: 30px;
    .word{
      width: 700px;
      height: 978px;
      background: #2a70ff;
      border-radius: 30px;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      box-sizing: border-box;
      padding: 50px;
      .titimg{
        width: 248px;
        height: 61px;
        display: block;
        margin: 0 auto;
      }
      p{
        color: white;
        font-size: 24px;
        font-weight: lighter;
        text-align:justify;
        -webkit-text-align-last:justify;/*chrome 20+*/
        span{
          font-size: 30px;
          font-weight: bold;
        }
      }

    }
  }
</style>
