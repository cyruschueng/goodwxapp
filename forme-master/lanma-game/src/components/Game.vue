<template>
  <div class="gamePage">
    <div id="gamecon"></div>
    <!--Toastmybag-->
    <Toastmybag v-if="isShowmybag">
      <div class="ab closebtn" @click="closebag">
        <img class="quanimg" src="./../assets/images/l_closebtn.png">
      </div>
    </Toastmybag>
    <!--gameEnd-->
    <Toastend v-if="isShowend">
      <div class="ab regamebtn"><span @click="restartGame">不服再战</span></div>
      <!--<div class="ab closebtn" @click="closeend">-->
        <!--<img class="quanimg" src="./../assets/images/l_closebtn.png">-->
      <!--</div>-->
    </Toastend>
  </div>
</template>

<script>
var game=null;
import vuedata from './../assets/scripts/main'
import gameimg from './../assets/scripts/gameimg'
import Game from './../assets/scripts/game'
import Toastmybag from './Toastmybag.vue'
import Toastend from './Toastend.vue'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'game',
  components:{
    Toastmybag,//我的背包
    Toastend,//游戏结束弹窗
  },
  data () {
    return {
      isShowmybag:false,//是否显示我的背包
      isShowend:false,//是否显示游戏结束弹窗
      tximgurl:'',//我的头像
    }
  },
  methods: {
    closebag(){
      this.isShowmybag=false;
      console.log(game);
      game.paused = false;
      game.state.states.game.countDownTime();
    },
    closeend(){
      this.isShowend=false;
    },
    restartGame(){
      this.isShowend=false;
      console.log(game.state);
      game.paused = false;
      game.state.restart();
      game.state.states.game.runpeople.stop();
      vuedata.score=0;
      vuedata.imgArr=[0,0,0,0];
      vuedata.isGetimg=false;
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

    var _vuethis=this
    //vuedata
    vuedata.openbag=function(){
      _vuethis.isShowmybag=true;
    }
    vuedata.openend=function(){
      _vuethis.isShowend=true;
      console.log(vuedata.score);
      _vuethis.$store.dispatch('upGrade',{'grade':vuedata.score});

    }
    vuedata.closeend=function(){
      _vuethis.isShowend=false;
    }

    vuedata.tximgurl=this.actInfo.tximg
    if(this.actInfo.num_status==1){
      vuedata.gameNum=this.actInfo.lanma_num
    }else if(this.actInfo.num_status==2){
      vuedata.gameNum=this.actInfo.virtual_num
    }


    let w = document.documentElement.clientWidth || document.body.clientWidth,
        h = document.documentElement.clientHeight || document.body.clientHeight

    w = w > 750 ? 750 : w

//    console.log('clientWidth:'+w, 'clientHeight:'+h)

    game = new Phaser.Game(w, h, Phaser.AUTO, 'gamecon')
    game.state.add('gameimg', new gameimg())
    game.state.add('game', new Game())

    game.state.start('gameimg');


  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" scoped lang="scss">
  .gamePage{
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 99;
    width: 750px;
    position: fixed;
  }
  #gamecon{
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 99;
    width: 750px;
    position: absolute;
  }

  .closebtn{
    width: 83px;
    height: 83px;
    right: -30px;
    top:-30px;
    z-index: 101;
  }
</style>
