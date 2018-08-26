<template>
  <div class="toast toastrunlot" v-if="isShowToast">
    <!--没有抽奖机会-->
    <div class="wordp nochance ab" v-if="toastType==0">
      <img class="re tbg" src="./../assets/images/r_toastbg2.png">
      <img class="ab closebtn" @click="closeLottc" src="./../assets/images/r_closebtn.png">
      <p class="ab">您还没有抽奖机会</p>
    </div>
    <!--未中奖word-->
    <div class="wordp nolot ab" v-if="toastType==1">
      <img class="re tbg" src="./../assets/images/r_toastbg2.png">
      <img class="ab closebtn" @click="closeLottc" src="./../assets/images/r_closebtn.png">
      <p class="ab">啊哦～没有抽中～</p>
    </div>
    <!--中奖-->
    <div class="wordp haslot ab" v-if="toastType==2">
      <img class="re tbg" src="./../assets/images/r_toastbg2.png">
      <img class="ab closebtn" @click="closeLottc" src="./../assets/images/r_closebtn.png">
      <img class="ab titword" src="./../assets/images/r_lottit.png">
      <p class="ab pname">{{actInfo.nowprize_name}}</p>
      <p class="ab pdes">返回至个人信息填写你的个人信息等着派奖吧！</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'toastrunlot',
  components:{

  },
  methods: {
    closeLottc(){
      this.$store.dispatch('whickToast',{isShowToast:false,type:0});
    },
    ...mapActions({
      setDialog: 'setDialog',
      setMum: 'setMum'
    })
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters({
      actInfo: 'actInfo',
      isShowToast:'isShowToast',
      toastType:'toastType',
    }),
  },
  mounted: function () {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" scoped lang="scss">
  .nochance{
    top: 50%;
    left: 50%;
    width: 526px;
    height: 505px;
    position: absolute;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    text-align: center;
    .tbg{
      width: 100%;
    }
    p{
      width: 100%;
      font-size: 34px;
      color: white;
      top:200px;
      font-weight: lighter;
    }
  }
  .nolot{
    top: 50%;
    left: 50%;
    width: 526px;
    height: 505px;
    position: absolute;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    text-align: center;
    .tbg{
      width: 100%;
    }
    p{
      width: 100%;
      font-size: 34px;
      color: white;
      top:200px;
      font-weight: lighter;
    }
  }
  .haslot{
    top: 50%;
    left: 50%;
    width: 526px;
    height: 505px;
    position: absolute;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    text-align: center;
    .tbg{
      width: 100%;
    }
    .titword{
      width: 336px;
      height: 61px;
      left: 95px;
      top:50px;
    }
    .pname{
      width: 100%;
      text-align: center;
      color: white;
      font-size: 42px;
      top:160px;
      left: 0px;
    }
    .pdes{
      width: 426px;
      text-align: left;
      color: white;
      font-size: 26px;
      top:300px;
      left: 50px;
    }
  }

  .closebtn{
    width: 30px;
    height: 30px;
    right: 10px;
    top:10px;
  }
</style>
