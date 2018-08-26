<template>
  <div class="toast toastmedia">
    <!--word-->
    <div class="wordp ab" v-if="isShowM">
      <!--closebtn-->
      <slot></slot>
      <!--word-->
      <div class="word ab">
        <div class="imgs">
          <div>
            <img v-if="actInfo.mediaArr[0]==1" class="quanimg" src="./../assets/images/1-a.png">
            <img v-else class="quanimg" src="./../assets/images/1-b.png">
          </div>
          <div>
            <img v-if="actInfo.mediaArr[1]==1" class="quanimg" src="./../assets/images/2-a.png">
            <img v-else class="quanimg" src="./../assets/images/2-b.png">
          </div>
          <div>
            <img v-if="actInfo.mediaArr[2]==1" class="quanimg" src="./../assets/images/3-a.png">
            <img v-else class="quanimg" src="./../assets/images/3-b.png">
          </div>
          <div>
            <img v-if="actInfo.mediaArr[3]==1" class="quanimg" src="./../assets/images/4-a.png">
            <img v-else class="quanimg" src="./../assets/images/4-b.png">
          </div>
        </div>
        <img v-if="countmedia>=4 && !actInfo.isgetBigprize" @click="getBig" class="sharebtn" src="./../assets/images/r_getbigbtn.png">
        <img v-if="countmedia<4" class="sharebtn" src="./../assets/images/r_finalbtnan.png">
        <img v-if="countmedia>=4 && actInfo.isgetBigprize" @click="lookcode" class="sharebtn" src="./../assets/images/r_finalbtn.png">
      </div>
    </div>
    <!--word-->
    <div class="codep ab" v-else>
      <!--closebtn-->
      <slot></slot>
      <!--word-->
      <div class="word ab">
        <p class="titword">你的终极大奖兑换码为：</p>
        <p class="todayword">B74C9FD70084P</p>
        <p class="sword">请截图保存兑换码，前往老板电器电子商务官方微信【robamEC】向小编发送截图+咕咚昵称，领取终极大奖，数量有限，先到先得！</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'toastmedia',
  components:{

  },
  methods: {
    getBig(){
      this.isShowM=false;
      this.$store.dispatch('getBigPrize');
    },
    lookcode(){
      this.isShowM=false;
    }
  },
  data () {
    return {
      isShowM:true,//true-显示勋章墙，false-显示code
    }
  },
  computed: {
    ...mapGetters({
      actInfo: 'actInfo',
      countmedia:'countmedia'
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
      background: url("./../assets/images/r_toastbg1.png") no-repeat;
      .imgs{
        width: 400px;
        height: 320px;
        display: flex;
        display: -webkit-flex;
        flex-wrap: wrap;
        justify-content:space-between;
        margin: 0 auto;
        margin-top: 50px;
        div{
          width: 164px;
          height: 140px;
          overflow: hidden;
          img{
            width: 164px;
            height: 140px;
          }
        }
      }
      .sharebtn{
        width: 305px;
        height: 76px;
        display: block;
        margin: 0 auto;
        margin-top: 50px;
      }
    }
  }
  .codep{
    top: 50%;
    left: 50%;
    width: 600px;
    height: 400px;
    position: absolute;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    background: #2a70ff;
    border-radius: 30px;
    .word{
      width: 600px;
      height: 400px;
      background: #2a70ff;
      border-radius: 30px;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      box-sizing: border-box;
      padding: 50px 20px;
      background: url("./../assets/images/r_toastbg2.png") no-repeat;
      p{
        color: white;
        font-size: 32px;
      }
      .titword{
        font-size: 40px;
        margin-top: 20px;
        margin-bottom: 20px;
        text-align: center;
      }
      .todayword{
        text-align: center;
        font-size: 60px;
        margin-bottom: 50px;
      }
      .sword{
        font-weight: lighter;
        font-size: 24px;
      }
    }
  }
</style>
