<template>
  <div class="toast toastmore">
    <!--word-->
    <div class="wordp ab">
      <!--closebtn-->
      <slot></slot>
      <!--word-->
      <div v-if="actInfo.prize_arr.length>0" class="word ab">
        <img class="re tbg" src="./../assets/images/r_toastbg2.png">
        <!--奖品-->
        <img class="ab myptit" src="./../assets/images/r_lottit.png">
        <div class="ab prize_con">
          <p v-for="item in actInfo.prize_arr">{{item}}</p>
        </div>
      </div>
      <div v-else class="word ab nop">
        <img class="re tbg" src="./../assets/images/r_toastbg2.png">
        <p class="ab titword">暂时没有奖品</p>
      </div>
    </div>
  </div>
</template>

<script>
import Nativecodoon from '../assets/scripts/codoon-native-bridge'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'toastmore',
  components:{

  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions({
      setDialog: 'setDialog',
      setMum: 'setMum'
    })
  },
  computed: {
    ...mapGetters({
      actInfo: 'actInfo',
    }),
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
    height: 546px;
    position: absolute;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    .word{
      width: 600px;
      height: 546px;
      .tbg{
        width: 600px;
        height: 546px;
      }
      .myptit{
        width: 336px;
        height: 60px;
        top:50px;
        left: 132px;
      }
      .titword{
        width: 100%;
        font-size: 24px;
        top:150px;
        left:0px;
        color: white;
        text-align: center;
      }
      .prize_con{
        width: 550px;
        text-align: center;
        color: white;
        font-size: 40px;
        top:220px;
        left: 25px;
      }
    }
    .nop{
      .titword{
        font-size: 40px;
      }
    }
  }
</style>
