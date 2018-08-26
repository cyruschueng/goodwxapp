<template>
  <div class="toast toastend">
    <!--word-->
    <div class="wordp ab">
      <!--closebtn-->
      <!--<slot></slot>-->
      <!--word-->
      <div class="word ab">
        <img class="ab bgimg" src="./../assets/images/lgame_endbg.png">
        <!--里程-->
        <div class="ab total_length"><span>{{gamedata.score}}KM</span></div>
        <!--剩余时间-->
        <div class="ab total_time"><span>00:00</span></div>
        <!--头-->
        <div class="ab tximg">
          <img class="quanimg" :src="actInfo.tximg">
        </div>
        <!--号牌-->
        <div class="ab race_num">
          <span v-if="actInfo.num_status == 1">{{actInfo.lanma_num}}</span>
          <span v-else>{{actInfo.virtual_num}}</span>
        </div>
        <!--话-->
        <div class="ab race_word"><span>wow~1分钟完成{{gamedata.score}}km</span></div>
        <!--再来一盘按钮-->
        <slot></slot>
        <!--分享-->
        <div class="ab sharegbtn"><span @click="toSharemyscore">炫耀战绩</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import buttonshare from './../assets/scripts/buttonshare'
import vuedata from './../assets/scripts/main'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'toastend',
  components:{

  },
  methods: {
    data () {
      return {
        gamedata:{
          score:0,
        },
        sharewordArr:['分分钟练就一指禅神功~','用力过猛点断手','全力以赴屏幕差点戳个洞','水土都不服我就服我自己'],//
      }
    },
    toSharemyscore(){
      var a=this.getrd(0,3);
      var options = {
        shareImgUrl : "http://activity-codoon.b0.upaiyun.com/lanma-game/upload/share.jpg",
        shareLineLink : "https://www.codoon.com/activity/v1/lanma-game/sharerouter.html?word="+a+"&score="+vuedata.score,
        shareDescContent :'好朋友，你还在苦等欧洲签证？我已经跑完了整个“捷克”赢得跑马护照，你也来试试！',
        shareCodoonLineLink : "https://www.codoon.com/activity/v1/lanma-game/index.html",
        shareTitle : '捷克酷跑之旅·释放跑能量！勇闯6关，赢取捷克跑马护照'
      };
      buttonshare(options);
    },
    getrd(n,m){
      var c = m-n+1;
      return Math.floor(Math.random() * c + n);
    },
  },
  computed: {
    ...mapGetters({
      actInfo: 'actInfo',
    }),
  },
  mounted: function () {
    //score
    this.gamedata=vuedata;
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" scoped lang="scss">
  .wordp{
    top: 50%;
    left: 50%;
    width: 600px;
    height: 960px;
    position: absolute;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    .word{
      width: 600px;
      height: 960px;
      .bgimg{
        width: 600px;
        height: 960px;
      }
      .total_length{
        width: 200px;
        height: 60px;
        line-height: 60px;
        top:110px;
        left: 30px;
        color: white;
        text-align: center;
        font-size: 50px;
        font-weight: bold;
      }
      .total_time{
        width: 200px;
        height: 60px;
        line-height: 60px;
        top:110px;
        right: 50px;
        color: white;
        text-align: center;
        font-size: 50px;
        font-weight: bold;
      }
      .tximg{
        width: 300px;
        height: 320px;
        left: 140px;
        top:160px;
      }
      .race_num{
        width: 80px;
        height: 30px;
        border: 1px solid #1e2356;
        background: white;
        line-height: 30px;
        top:454px;
        left: 260px;
        color: #1e2356;
        text-align: center;
        font-size: 24px;
      }
      .race_word{
        width: 100%;
        height: 100px;
        line-height: 100px;
        top:740px;
        left: 0px;
        color: white;
        text-align: center;
        font-size: 40px;
      }
      .regamebtn{
        width: 200px;
        height: 60px;
        line-height: 60px;
        top:840px;
        left: 70px;
        color: white;
        text-align: center;
        font-size: 40px;
        border: 2px solid white;
        border-radius: 30px;
      }
      .sharegbtn{
        width: 200px;
        height: 60px;
        line-height: 60px;
        top:840px;
        right: 70px;
        color: white;
        text-align: center;
        font-size: 40px;
        border: 2px solid white;
        border-radius: 30px;
      }
    }
  }
</style>
