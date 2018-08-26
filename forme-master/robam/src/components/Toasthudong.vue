<template>
  <div class="toast toasthudong">
    <!--word-->
    <div class="wordp ab">
      <!--closebtn-->
      <slot></slot>
      <!--word-->
      <div class="word ab">
        <p class="titword">6月14日－6月16日</p>
        <p>参与H5互动，可以点亮一枚勋章</p>
        <p>同时获得一次抽奖机会哦!</p>
        <img class="sharebtn" @click="toHudong" src="./../assets/images/r_hudongbtn.png">
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'toasthudong',
  components:{

  },
  methods: {
    toHudong(){
      _hmt.push(['_trackEvent', '参与h5互动', 'click', 'hudong'])
      var dataObj={
        whichmedia:2,
      };
      this.$store.dispatch('getMedia',dataObj);
    }
  },
  data () {
    return {

    }
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
      background: url("./../assets/images/r_toastbg1.png") no-repeat;
      .titimg{
        width: 248px;
        height: 61px;
        display: block;
        margin: 0 auto;
      }
      p{
        color: white;
        font-size: 32px;
        text-align:center;
        font-weight: lighter;
      }
      .titword{
        font-size: 36px;
        margin-top: 50px;
        margin-bottom: 20px;
      }
      .sharebtn{
        width: 310px;
        height: 74px;
        display: block;
        margin: 0 auto;
        margin-top: 150px;
      }
    }
  }
</style>
