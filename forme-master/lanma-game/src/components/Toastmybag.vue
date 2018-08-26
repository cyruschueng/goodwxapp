<template>
  <div class="toast toastbag">
    <!--word-->
    <div class="wordp ab">
      <!--closebtn-->
      <slot></slot>
      <!--hascard-->
      <div v-if="isGetimg" class="word ab hascard">
        <img class="ab bgimg" src="./../assets/images/lcardhasbg.png">
        <!--1-->
        <div class="ab card card_a">
          <img v-if="getImgArr[0]==0" src="./../assets/images/lcard01_an.png">
          <img v-if="getImgArr[0]==1" src="./../assets/images/lcard01_light.png">
        </div>
        <!--2-->
        <div class="ab card card_b">
          <img v-if="getImgArr[1]==0" src="./../assets/images/lcard02_an.png">
          <img v-if="getImgArr[1]==1" src="./../assets/images/lcard02_light.png">
        </div>
        <!--3-->
        <div class="ab card card_c">
          <img v-if="getImgArr[2]==0" src="./../assets/images/lcard03_an.png">
          <img v-if="getImgArr[2]==1" src="./../assets/images/lcard03_light.png">
        </div>
        <!--4-->
        <div class="ab card card_d">
          <img v-if="getImgArr[3]==0" src="./../assets/images/lcard04_an.png">
          <img v-if="getImgArr[3]==1" src="./../assets/images/lcard04_light.png">
        </div>

        <img v-if="getImgArr[0]==1" class="ab cardtx card_tx1" :src="actInfo.tximg">
        <img v-if="getImgArr[1]==1" class="ab cardtx card_tx2" :src="actInfo.tximg">
        <img v-if="getImgArr[2]==1" class="ab cardtx card_tx3" :src="actInfo.tximg">
        <img v-if="getImgArr[3]==1" class="ab cardtx card_tx4" :src="actInfo.tximg">

        <!--sharebtn-->
        <div class="ab cardbtn" @click="toSharemyimg">
          <img class="quanimg" src="./../assets/images/lshareimgbtn.png">
        </div>
      </div>
      <!--nocard-->
      <div v-else class="word ab nocard">
        <img class="ab bgimg" src="./../assets/images/lcardnobg.png">
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import buttonshare from './../assets/scripts/buttonshare'
import { mapActions, mapGetters, mapState } from 'vuex'
import vuedata from './../assets/scripts/main'
export default {
  name: 'toastbag',
  components:{

  },
  methods: {
    toSharemyimg(){
      var options = {
        shareImgUrl : "http://activity-codoon.b0.upaiyun.com/lanma-game/upload/share.jpg",
        shareLineLink : "https://www.codoon.com/activity/v1/lanma-game/share.html?imgArr="+vuedata.imgArr+'&txurl='+vuedata.tximgurl,
        shareDescContent :'好朋友，你还在苦等欧洲签证？我已经跑完了整个“捷克”赢得跑马护照，你也来试试！',
        shareCodoonLineLink : "https://www.codoon.com/activity/v1/lanma-game/index.html",
        shareTitle : '捷克酷跑之旅·释放跑能量！勇闯6关，赢取捷克跑马护照'
      };
      buttonshare(options);
    },

  },
  data () {
    return {
      getImgArr:[],
      isGetimg:false,
    }
  },
  computed: {
    ...mapGetters({
      actInfo: 'actInfo',
    }),
  },
  mounted: function () {
    console.log(vuedata.imgArr);
    this.getImgArr=vuedata.imgArr;
    this.isGetimg=vuedata.isGetimg;
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" scoped lang="scss">
  .wordp{
    top: 50%;
    left: 50%;
    width: 470px;
    height: 770px;
    position: absolute;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    .nocard{
      width: 470px;
      height: 770px;
      img{
        width: 470px;
        height: 770px;
      }
    }
    .hascard{
      width: 470px;
      height: 770px;
      .bgimg{
        width: 470px;
        height: 770px;
      }

      .card{
        width: 180px;
        height: 230px;
        overflow: hidden;
      }
      .card_a{
        top:44px;
        left:50px;
      }
      .card_b{
        top:44px;
        right:50px;
      }
      .card_c{
        top:280px;
        left:50px;
      }
      .card_d{
        top:280px;
        right:50px;
      }
      .cardbtn{
        width: 182px;
        height: 43px;
        top:690px;
        left: 144px;
      }

      .cardtx{
        width: 70px;
        height: 70px;
      }
      .card_tx1{
        top:60px;
        left: 100px;
      }
      .card_tx2{
        top:60px;
        right: 105px;
      }
      .card_tx3{
        top:300px;
        left: 100px;
      }
      .card_tx4{
        top:300px;
        right: 110px;
      }

    }
  }



</style>
