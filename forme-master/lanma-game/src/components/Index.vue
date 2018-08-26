<template>
  <div class="page indexPage">
    <img class="bgimg re" src="./../assets/images/l_indexbg.jpg">
    <!--cloud_s-->
    <div class="ab cloud_s cloud_s_animate">
      <img class="quanimg" src="./../assets/images/l_cloud_l.png">
    </div>
    <!--cloud_m-->
    <div class="ab cloud_m cloud_m_animate">
      <img class="quanimg" src="./../assets/images/l_cloud_l.png">
    </div>
    <!--cloud_l-->
    <div class="ab cloud_l cloud_l_animate">
      <img class="quanimg" src="./../assets/images/l_cloud_l.png">
    </div>
    <!--maotouying-->
    <div class="ab maotouying mtyanimate">
      <img class="quanimg" src="./../assets/images/l_maotouying.png">
    </div>
    <!--star_a-->
    <div class="ab star_a">
      <img class="quanimg" src="./../assets/images/l_star.png">
    </div>
    <!--star_b-->
    <div class="ab star_b">
      <img class="quanimg" src="./../assets/images/l_star.png">
    </div>
    <!--star_c-->
    <div class="ab star_c">
      <img class="quanimg" src="./../assets/images/l_star.png">
    </div>
    <!--star_d-->
    <div class="ab star_d">
      <img class="quanimg" src="./../assets/images/l_star.png">
    </div>
    <!--index_word-->
    <div class="ab index_word sZoom">
      <img class="quanimg" src="./../assets/images/l_indexword.png">
    </div>
    <!--monkey-->
    <div class="ab monkey monkeyanimate">
      <img class="quanimg" src="./../assets/images/l_monky.png">
    </div>
    <!--pig-->
    <div class="ab pig pigdonganimate">
      <img class="quanimg" src="./../assets/images/l_pig.png">
    </div>
    <!--people-->
    <div class="ab people">
      <img class="quanimg" src="./../assets/images/l_people.png">
    </div>
    <!--index_btn-->
    <router-link to="startrule">
      <div class="ab index_btn donganimate">
        <img class="quanimg" src="./../assets/images/l_indexbtn.png">
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'index',
  components:{
  },
  data () {
    return {
      isShowrule:false,//是否显示规则弹窗
      isShowzao: false,//是否显示早这个弹窗
      isShowguan:false,//是否显示领取任务弹窗
    }
  },
  methods: {
    lookRule(){
      this.isShowrule=true;
    },
    closeRule(){
      this.isShowrule=false;
    },
    tozhenbaoku(){
      //新开一个webview
      var bri=new codoonBrige();
      bri.jumpNative({
        type: 'webView',
        value: 'https://tms.codoon.com/cms/pro/149069545950411tpnw.html',
      }, function() {
        //alert("从打开的新页面回来了");
      });
    },
    toShowearly(){
      this.isShowzao=true;
    },
    closeEarly(){
      this.isShowzao=false;
    },
    toShare(){
      shareButton();
      var _self=this;
      setTimeout(function () {
        _self.$store.dispatch('goShare');
      },5000)
    },
    toOnlyshare(){
      shareButton();
    },
    tolot(){
      if(this.actInfo.lottery_count>0){
        this.$store.dispatch('goLot');
      }else {
        return this.setDialog({time: 2000, msg: '暂时还没有抽奖机会哦！'})
      }
    },
    toBulage(){
      this.$router.push('bulage');
    },
    toTask(num){
      this.$router.push({path:'task/'+num});
    },
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
  .cloud_s{
    width: 81px;
    height: 55px;
    top:50px;
    left:200px;
    z-index: 10;
  }
  .cloud_s_animate{
    -webkit-animation: cloud_s_dong 8s infinite 1s;
    -webkit-animation-fill-mode: both;
  }
  @-webkit-keyframes cloud_s_dong{
    0%{
      left:200px;
    }
    10%{
      left:220px;
    }
    20%{
      left:240px;
    }
    30%{
      left:260px;
    }
    40%{
      left:280px;
    }
    50%{
      left:300px;
    }
    60%{
      left:280px;
    }
    70%{
      left:260px;
    }
    80%{
      left:240px;
    }
    90%{
      left:220px;
    }
    100%{
      left:200px;
    }
  }
  .cloud_m{
    width: 98px;
    height: 65px;
    top:60px;
    left:30px;
    z-index: 10;
  }
  .cloud_m_animate{
    -webkit-animation: cloud_m_dong 7s infinite;
    -webkit-animation-fill-mode: both;
  }
  @-webkit-keyframes cloud_m_dong{
    0%{
      left:30px;
    }
    10%{
      left:50px;
    }
    20%{
      left:70px;
    }
    30%{
      left:90px;
    }
    40%{
      left:110px;
    }
    50%{
      left:130px;
    }
    60%{
      left:110px;
    }
    70%{
      left:90px;
    }
    80%{
      left:70px;
    }
    90%{
      left:50px;
    }
    100%{
      left:30px;
    }
  }
  .cloud_l{
    width: 115px;
    height: 77px;
    top:140px;
    left:300px;
    z-index: 10;
    transition:all 3s;
  }
  .cloud_l_animate{
    -webkit-animation: cloud_l_dong 4s infinite;
    -webkit-animation-fill-mode: both;
  }
  @-webkit-keyframes cloud_l_dong{
    0%{
      left:300px;
    }
    10%{
      left:290px;
    }
    20%{
      left:280px;
    }
    30%{
      left:270px;
    }
    40%{
      left:260px;
    }
    50%{
      left:250px;
    }
    60%{
      left:260px;
    }
    70%{
      left:270px;
    }
    80%{
      left:280px;
    }
    90%{
      left:290px;
    }
    100%{
      left:300px;
    }
  }
  .maotouying{
    width: 265px;
    height: 245px;
    top:30px;
    right:40px;
  }
  .mtyanimate{
    -webkit-animation: mtydong 1s infinite;
    -webkit-animation-fill-mode: both;
  }
  @-webkit-keyframes mtydong{
    0%{
      top:30px;
      right:40px;
    }
    25%{
      top:25px;
      right:45px;
    }
    50%{
      top:20px;
      right:50px;
    }
    75%{
      top:25px;
      right:45px;
    }
    100%{
      top:30px;
      right:40px;
    }
  }
  .star_a{
    width: 36px;
    height: 34px;
    top:120px;
    left:280px;
    z-index: 11;
  }
  .star_b{
    width: 36px;
    height: 34px;
    top:240px;
    left:30px;
    z-index: 11;
  }
  .star_c{
    width: 36px;
    height: 34px;
    top:190px;
    left:220px;
    z-index: 11;
  }
  .star_d{
    width: 30px;
    height: 30px;
    top:190px;
    left:320px;
    z-index: 11;
  }
  .index_word{
    width: 439px;
    height: 282px;
    top:490px;
    left: 10px;
    z-index: 11;
    opacity: 0;
  }
  .sZoom{
    -webkit-animation: DivZoom 0.8s 1 ease-in-out;
    animation-fill-mode:forwards;
  }
  @-webkit-keyframes DivZoom{
    0% { -webkit-transform: scale(0.5) ; opacity: 0.2}
    60% { -webkit-transform: scale(1.05); opacity: 0.5}
    80% { -webkit-transform: scale(0.95); opacity: 1 }
    100% { -webkit-transform: scale(1.00);opacity: 1 }
  }

  .monkey{
    width: 153px;
    height: 210px;
    top:820px;
    left:230px;
  }
  .monkeyanimate{
    -webkit-animation: monkeydong 1s infinite 1s;
    -webkit-animation-fill-mode: both;
  }
  @-webkit-keyframes monkeydong{
    0%{top:820px;}
    10%{top:810px;}
    20%{top:800px;}
    100%{top:800px;}
  }
  .pig{
    width: 102px;
    height: 178px;
    top:800px;
    left:370px;
  }
  .pigdonganimate{
    -webkit-animation: pigdong 1s infinite 1s;
    -webkit-animation-fill-mode: both;
  }
  @-webkit-keyframes pigdong{
    0%{top:800px;}
    10%{top:790px;}
    20%{top:780px;}
    30%{top:790px;}
    40%{top:800px;}
    100%{top:800px;}
  }
  .people{
    width: 663px;
    height: 1014px;
    top:110px;
    left:80px;
    z-index: 9;
  }
  .index_btn{
    width: 300px;
    height: 73px;
    top:1030px;
    left:225px;
    z-index: 11;
  }
  .donganimate{
    -webkit-animation: diandong 2s infinite;
    -webkit-animation-fill-mode: both;
  }
  @-webkit-keyframes diandong{
    0%{-webkit-transform: scale(1);}
    10%{-webkit-transform: scale(0.9);}
    20%{-webkit-transform: scale(1);}
    100%{-webkit-transform: scale(1);}
  }

</style>
