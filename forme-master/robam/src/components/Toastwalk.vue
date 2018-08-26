<template>
  <div class="toast toastwalk">
    <!--word-->
    <div class="wordp ab">
      <!--closebtn-->
      <slot></slot>
      <!--word-->
      <div class="word ab">
        <p class="titword">{{dataArr[showWhich]}}</p>
        <p class="todayword">今天的任务，走完6000步哦</p>
        <p>今日步数：</p>
        <p class="walkword">{{actInfo.walk_finishArr[showWhich]}}<span>步</span></p>
        <div class="walk_out" v-if="actInfo.walk_finishArr[showWhich]<6000">
          <div class="walk_in" v-bind:style="{width: walktemp+'%'}"></div>
        </div>
        <!--<P class="finishword" v-if="actInfo.walk_finishArr[showWhich]>=6000">恭喜您获得一次抽奖机会！<br>快去抽奖吧！</P>-->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'toastwalk',
  props:['showNum'],
  components:{

  },
  methods: {

  },
  data () {
    return {
      dataArr:["6月9日","6月10日","6月12日","6月13日","6月15日","6月16日"],
      showWhich:0,
      walktemp:0,
    }
  },
  computed: {
    ...mapGetters({
      actInfo: 'actInfo',
    }),
  },
  mounted: function () {
    this.showWhich=this.showNum.num;
    this.walktemp=(this.actInfo.walk_finishArr[this.showWhich]/6000)*100;
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" scoped lang="scss">
  .wordp{
    top: 50%;
    left: 50%;
    width: 600px;
    height: 546px;
    position: absolute;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    background: #2a70ff;
    border-radius: 30px;
    .word{
      width: 600px;
      height: 546px;
      background: #2a70ff;
      border-radius: 30px;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      box-sizing: border-box;
      padding: 50px;
      background: url("./../assets/images/r_toastbg2.png") no-repeat;
      p{
        color: white;
        font-size: 32px;
        font-weight: lighter;
      }
      .titword{
        font-size: 36px;
        margin-top: 20px;
        margin-bottom: 20px;
        text-align: center;
      }
      .todayword{
        text-align: center;
      }
      .walkword{
        text-align: center;
        color: #faf742;
        font-size: 80px;
        letter-spacing: 5px;
        margin-top: 30px;
        span{
          font-size: 30px;
        }
      }
      .walk_out{
        width: 480px;
        height: 24px;
        display: block;
        margin: 0 auto;
        background: #1b51aa;
        margin-top: 50px;
        border-radius: 24px;
        /*display: none;*/
        .walk_in{
          width: 60px;
          height: 24px;
          background: #faf742;
          border-radius: 24px;
        }
      }
      .finishword{
        margin-top: 50px;
        color: #faf742;
        text-align: center;
      }
    }
  }
</style>
