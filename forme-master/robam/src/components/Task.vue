<template>
  <div class="page indexPage">
    <img class="bgimg" src="./../assets/images/r_taskbg.jpg">
    <!--活动规则按钮-->
    <div class="rulebtn ab" @click="lookRule"><span>活动规则</span></div>
    <!--6.8-->
    <div class="ab dian_a" @click="lookShare">
      <img v-if="actInfo.mediaStartTimeArr[0]==1" src="./../assets/images/1-a.png">
      <img v-else src="./../assets/images/1-b.png">
    </div>
    <!--6.9-->
    <div class="ab dian_b" @click="lookWalk(0)">
      <img v-if="actInfo.walk_timeArr[0]==1" class="quanimg" src="./../assets/images/r_dian_yellow.png">
      <img v-else class="quanimg" src="./../assets/images/r_dian_an.png">
    </div>
    <!--6.10-->
    <div class="ab dian_c" @click="lookWalk(1)">
      <img v-if="actInfo.walk_timeArr[1]==1" class="quanimg" src="./../assets/images/r_dian_yellow.png">
      <img v-else class="quanimg" src="./../assets/images/r_dian_an.png">
    </div>
    <!--6.11-->
    <div class="ab dian_d" @click="lookVideo">
      <img v-if="actInfo.mediaStartTimeArr[1]==1" src="./../assets/images/2-a.png">
      <img v-else @click="lookVideo" src="./../assets/images/2-b.png">
    </div>
    <!--6.12-->
    <div class="ab dian_e" @click="lookWalk(2)">
      <img v-if="actInfo.walk_timeArr[2]==1" class="quanimg" src="./../assets/images/r_dian_yellow.png">
      <img v-else class="quanimg" src="./../assets/images/r_dian_an.png">
    </div>
    <!--6.13-->
    <div class="ab dian_f" @click="lookWalk(3)">
      <img v-if="actInfo.walk_timeArr[3]==1" class="quanimg" src="./../assets/images/r_dian_yellow.png">
      <img v-else class="quanimg" src="./../assets/images/r_dian_an.png">
    </div>
    <!--6.14-->
    <div class="ab dian_g" @click="lookHudong">
      <img v-if="actInfo.mediaStartTimeArr[2]==1" src="./../assets/images/3-a.png">
      <img v-else src="./../assets/images/3-b.png">
    </div>
    <!--6.15-->
    <div class="ab dian_h" @click="lookWalk(4)">
      <img v-if="actInfo.walk_timeArr[4]==1" class="quanimg" src="./../assets/images/r_dian_yellow.png">
      <img v-else class="quanimg" src="./../assets/images/r_dian_an.png">
    </div>
    <!--6.16-->
    <div class="ab dian_i" @click="lookWalk(5)">
      <img v-if="actInfo.walk_timeArr[5]==1" class="quanimg" src="./../assets/images/r_dian_yellow.png">
      <img v-else class="quanimg" src="./../assets/images/r_dian_an.png">
    </div>
    <!--6.17-->
    <div class="ab dian_j" @click="lookKa">
      <img v-if="actInfo.mediaStartTimeArr[3]==1" src="./../assets/images/4-a.png">
      <img v-else src="./../assets/images/4-b.png">
    </div>
    <!--按钮s-->
    <div class="ab btns">
      <img @click="lookMedia" class="btn_media" src="./../assets/images/r_mymediabtn.png">
      <img @click="lookEvery" class="btn_every" src="./../assets/images/r_everydaybtn.png">
      <img @click="lookRank" class="btn_rank" src="./../assets/images/r_crobtn.png">
      <router-link to="jiugongge">
        <img v-bind:class="{ donganimate : (actInfo.totalnum_lot>0)}" class="btn_lot" src="./../assets/images/r_lotbtn.png">
      </router-link>
    </div>
    <!--勋章小红点-->
    <div class="ab reddian red_media"><span>{{countmedia}}</span></div>

    <!--活动规则-->
    <Toastrule v-if="isShowrule">
      <div @click="closeRule" class="closebtn ab"><img src="./../assets/images/r_closebtn.png"></div>
    </Toastrule>
    <!--分享弹框-->
    <Toastshare v-if="isShowshare">
      <div @click="closeShare" class="closebtn ab"><img src="./../assets/images/r_closebtn.png"></div>
    </Toastshare>
    <!--走路弹框-->
    <Toastwalk v-if="isShowwalk" :showNum="showNum">
      <div @click="closeWalk" class="closebtn ab"><img src="./../assets/images/r_closebtn.png"></div>
    </Toastwalk>
    <!--6.11小视频-->
    <Toastvideo v-if="isShowvideo">
      <div @click="closeVideo" class="closebtn ab"><img src="./../assets/images/r_closebtn.png"></div>
    </Toastvideo>
    <!--6.14参与h5互动-->
    <Toasthudong v-if="isShowhudong">
      <div @click="closeHudong" class="closebtn ab"><img src="./../assets/images/r_closebtn.png"></div>
    </Toasthudong>
    <!--6.17京东旗舰店-->
    <Toastka v-if="isShowka">
      <div @click="closeKa" class="closebtn ab"><img src="./../assets/images/r_closebtn.png"></div>
    </Toastka>
    <!--每日一领-->
    <Toastevery v-if="isShowevery">
      <div @click="closeEvery" class="closebtn ab"><img src="./../assets/images/r_closebtn.png"></div>
    </Toastevery>
    <Toasteveryhas v-if="isShoweveryhas">
      <div @click="closeEveryhas" class="closebtn ab"><img src="./../assets/images/r_closebtn.png"></div>
    </Toasteveryhas>
    <!--卡路里排行榜-->
    <Toastrank v-if="isShowrank">
      <div @click="closeRank" class="closebtn ab"><img src="./../assets/images/r_closebtn.png"></div>
    </Toastrank>
    <!--勋章墙-->
    <Toastmedia v-if="isShowmedia">
      <div @click="closeMedia" class="closebtn ab"><img src="./../assets/images/r_closebtn.png"></div>
    </Toastmedia>

    </div>
</template>

<script>
import Toastrule from './Toastrule'
import Toastshare from './Toastshare.vue'
import Toastwalk from './Toastwalk.vue'
import Toastvideo from './Toastvideo.vue'
import Toasthudong from './Toasthudong.vue'
import Toastka from './Toastka.vue'
import Toastevery from './Toastevery.vue'
import Toasteveryhas from './Toasteveryhas.vue'
import Toastrank from './Toastrank.vue'
import Toastmedia from './Toastmedia.vue'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'index',
  components:{
    Toastrule,//活动规则
    Toastshare,//分享弹框
    Toastwalk,//步数弹框
    Toastvideo,//视频弹框
    Toasthudong,//h5互动
    Toastka,//6.17京东
    Toastevery,//每日一领
    Toasteveryhas,//每日一领已领过
    Toastrank,//排行榜
    Toastmedia,//勋章墙
  },
  data () {
    return {
      isShowrule:false,//是否显示规则弹窗
      isShowshare:false,//是否显示分享弹窗
      isShowwalk:false,//是否显示走路弹窗
      isShowvideo:false,//是否显示走路弹窗
      isShowhudong:false,//是否显示h5互动
      isShowka:false,//是否显示6.17京东
      isShowevery:false,//是否显示每日一领
      isShoweveryhas:false,//是否显示每日一领(已领过)
      isShowrank:false,//是否显示排行榜
      isShowmedia:false,//是否显示勋章墙
      isShowcode:false,//是否显示兑换码
      showNum:{
        num:4,
      },//是否显示哪个弹框
    }
  },
  methods: {
    lookRule(){
      this.isShowrule=true;
    },
    closeRule(){
      this.isShowrule=false;
    },
    lookShare(){
      if(this.actInfo.mediaStartTimeArr[0]==0){
        return this.setDialog({time: 1500, msg: '客官，biè着急，你选择的任务正朝你狂奔而来……'})
      }
      this.isShowshare=true;
    },
    closeShare(){
      this.isShowshare=false;
    },
    lookWalk(whichWalk){
      this.showNum.num=whichWalk;
      if(this.actInfo.walk_timeArr[whichWalk]==0){
        return this.setDialog({time: 1500, msg: '客官，biè着急，你选择的任务正朝你狂奔而来……'})
      }
      this.isShowwalk=true;
    },
    closeWalk(){
      this.isShowwalk=false;
    },
    lookVideo(){
      if(this.actInfo.mediaStartTimeArr[1]==0){
        return this.setDialog({time: 1500, msg: '客官，biè着急，你选择的任务正朝你狂奔而来……'})
      }
      this.isShowvideo=true;
      _hmt.push(['_trackEvent', '观看视频人数', 'click', 'video'])
    },
    closeVideo(){
      this.isShowvideo=false;
    },
    lookHudong(){
      if(this.actInfo.mediaStartTimeArr[2]==0){
        return this.setDialog({time: 1500, msg: '客官，biè着急，你选择的任务正朝你狂奔而来……'})
      }
      this.isShowhudong=true;
    },
    closeHudong(){
      this.isShowhudong=false;
    },
    lookKa(){
      if(this.actInfo.mediaStartTimeArr[3]==0){
        return this.setDialog({time: 1500, msg: '客官，biè着急，你选择的任务正朝你狂奔而来……'})
      }
      this.isShowka=true;
    },
    closeKa(){
      this.isShowka=false;
    },
    lookEvery(){
      if(this.actInfo.isTodaygetquan){
//        return this.setDialog({time: 1500, msg: '今天已经领取过券了，明天再来吧'});
        return this.isShoweveryhas=true;
      }
      this.isShowevery=true;
      this.$store.dispatch('goEvery');
    },
    closeEvery(){
      this.isShowevery=false;
    },
    closeEveryhas(){
      this.isShoweveryhas=false;
    },
    lookRank(){
      this.isShowrank=true;
    },
    closeRank(){
      this.isShowrank=false;
    },
    lookMedia(){
      this.isShowmedia=true;
    },
    closeMedia(){
      this.isShowmedia=false;
    },
    lookCode(){
      this.isShowcode=true;
    },
    closeCode(){
      this.isShowcode=false;
    },
    ...mapActions({
      setDialog: 'setDialog',
      setMum: 'setMum'
    })
  },
  computed: {
    ...mapGetters({
      actInfo: 'actInfo',
      countmedia:'countmedia'
    }),
  },
  mounted: function () {
    //勋章个数
//    console.log(this.countmedia);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" scoped lang="scss">
  .rulebtn{
    width: 150px;
    height: 50px;
    font-size: 26px;
    line-height: 50px;
    color: white;
    right: 30px;
    top:40px;
    letter-spacing: 5px;
  }
  .dian_a,.dian_d,.dian_g,.dian_j{
    width: 80px;
    height: 70px;
    overflow: hidden;
    img{
      width: 80px;
      height: 70px;
    }
  }
  .dian_b,.dian_c,.dian_e,.dian_f,.dian_h,.dian_i{
    width: 100px;
    height: 100px;
    /*background: red;*/
    img{
      width: 16px;
      height: 16px;
      margin: 42px;
    }
  }
  .dian_a{
    top:230px;
    left:410px;
  }
  .dian_b{
    /*top:342px;*/
    /*left:604px;*/
    top:302px;//-40
    left: 560px;//-44
  }
  .dian_c{
    top:452px;
    left:86px;
  }
  .dian_d{
    top:384px;
    left:250px;
  }
  .dian_e{
    top:452px;
    left:402px;
  }
  .dian_f{
    top:452px;
    left:560px;
  }
  .dian_g{
    top:670px;
    left:100px;
  }
  .dian_h{
    top:604px;
    left:248px;
  }
  .dian_i{
    top:604px;
    left:406px;
  }
  .dian_j{
    top:670px;
    left:580px;
  }

  .btns{
    width: 500px;
    height: 180px;
    top:1000px;
    left: 125px;
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
    justify-content:space-between;
    .btn_media,.btn_rank{
      width: 260px;
      height: 60px;
    }
    .btn_every,.btn_lot{
      width: 200px;
      height: 60px;
    }

  }

  .reddian{
    width: 30px;
    height: 30px;
    border-radius: 30px;
    text-align: center;
    font-size: 20px;
    line-height: 30px;
    color: white;
    background: red;
  }
  .red_media{
    top:990px;
    left: 340px;
  }


  .donganimate{
    -webkit-animation: diandong 0.8s infinite;
    -webkit-animation-fill-mode: both;
  }
  @-webkit-keyframes diandong{
    0%{-webkit-transform: scale(0.8);}
    25%{-webkit-transform: scale(0.9);}
    50%{-webkit-transform: scale(1);}
    75%{-webkit-transform: scale(1);}
    100%{-webkit-transform: scale(1);}
  }
  /*关闭按钮*/
  .closebtn{
    width: 30px;
    height: 30px;
    right: 20px;
    top:20px;
    z-index: 4;
    img{
      width: 100%;
    }
  }
</style>
