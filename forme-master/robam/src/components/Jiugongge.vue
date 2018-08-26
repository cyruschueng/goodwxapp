<template>
  <div class="page indexPage">
    <img class="bgimg" src="./../assets/images/r_jiugonggebg.jpg">
    <!--九个奖品-->
    <div class="ab prize_con">
      <div class="prize_ul">
        <!--p1-->
        <div class="prize-li">
          <img class="quanimg" src="./../assets/images/r_prize01.png">
        </div>
        <!--p2-->
        <div class="prize-li">
          <img class="quanimg" src="./../assets/images/r_prize02.png">
        </div>
        <!--p3-->
        <div class="prize-li">
          <img class="quanimg" src="./../assets/images/r_prize03.png">
        </div>
        <!--p4-->
        <div class="prize-li">
          <img class="quanimg" src="./../assets/images/r_prize04.png">
        </div>
        <!--p5-->
        <div class="prize-li">
          <img class="quanimg" src="./../assets/images/r_prize05.png">
        </div>
        <!--p6-->
        <div class="prize-li">
          <img class="quanimg" src="./../assets/images/r_prize06.png">
        </div>
        <!--p7-->
        <div class="prize-li">
          <img class="quanimg" src="./../assets/images/r_prize07.png">
        </div>
        <!--p8-->
        <div class="prize-li">
          <img class="quanimg" src="./../assets/images/r_prize08.png">
        </div>
        <!--p9-->
        <div class="prize-li">
          <img class="quanimg" src="./../assets/images/r_prize09.png">
        </div>
      </div>
    </div>
    <div class="ab prize_con_out">
      <div class="prize_ul">
        <!--p1-->
        <div id="ge1" class="prize-li"></div>
        <!--p2-->
        <div id="ge2" class="prize-li"></div>
        <!--p3-->
        <div id="ge3" class="prize-li"></div>
        <!--p4-->
        <div id="ge4" class="prize-li"></div>
        <!--p5-->
        <div id="ge5" class="prize-li"></div>
        <!--p6-->
        <div id="ge6" class="prize-li"></div>
        <!--p7-->
        <div id="ge7" class="prize-li"></div>
        <!--p8-->
        <div id="ge8" class="prize-li"></div>
        <!--p9-->
        <div id="ge9" class="prize-li"></div>
      </div>
    </div>
    <!--点击抽奖-->
    <div class="ab lotbtn" @click="startlot">
      <img class="quanimg" src="./../assets/images/r_tolotbtn.png">
    </div>
    <!--我的奖品-->
    <div class="ab myprizebtn" @click="lookMyp">
      <img class="quanimg" src="./../assets/images/r_ucentermyp.png">
    </div>
    <!--个人信息-->
    <div class="ab ucenterbtn" @click="lookForm">
      <img class="quanimg" src="./../assets/images/r_ucenterbtn.png">
    </div>
    <!--填写信息弹框-->
    <Toastform v-if="isShowyuyue"></Toastform>
    <!--中奖系列弹框-->
    <Toastrunlot></Toastrunlot>
    <!--我的奖品-->
    <Toastmore v-if="isShowMyp">
      <div @click="closeMyp" class="closebtn ab"><img src="./../assets/images/r_closebtn.png"></div>
    </Toastmore>
  </div>
</template>

<script>
import axios from 'axios'
import Url from './../assets/scripts/interface'
import Toastrunlot from './Toastrunlot.vue'
import Toastform from './Toastyuyue.vue'
import Toastmore from './Toastmore.vue'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'index',
  components:{
    Toastform,//填写中奖信息弹框
    Toastrunlot,//中奖系列弹框
    Toastmore,//我的奖品
  },
  data () {
    return {
      isShowMyp:false,

      index : 1,                                  //  初始化停在哪个位置
      count : 9,                                  //  总共多少个奖品
      timer : 0,                                  //  定时器
      times : 0,                                  //  转动次数
      cycle : 24,                                 //  基本转动次数
      speed : 300,                                //  转动速度
      prizeNum : 4,                               //  中奖位置
      q_flag:true,
    }
  },
  methods: {
    lookMyp(){
      this.isShowMyp=true;
    },
    closeMyp(){
      this.isShowMyp=false;
    },
    lookForm(){
      this.$store.dispatch('showBaominToast',{isShowyuyue:true});
    },
    prizetoindex(str){
      console.log(str);
      if(str.indexOf('热水壶')!= -1){
        this.prizeNum=1;
      }else if(str.indexOf('儿童餐具')!= -1){
        this.prizeNum=2;
      }else if(str.indexOf('煎盘')!= -1){
        this.prizeNum=3;
      }else if(str.indexOf('防晒服')!= -1){
        this.prizeNum=4;
      }else if(str.indexOf('跑鞋')!= -1){
        this.prizeNum=5;
      }else if(str.indexOf('护臂')!= -1){
        this.prizeNum=7;
      }else if(str.indexOf('腰包')!= -1){
        this.prizeNum=8;
      }else if(str.indexOf('T-shirt')!= -1){
        this.prizeNum=9;
      }
//      console.log(this.prizeNum);
      this.start(true);
    },
    startlot(){
      console.log('开始抽奖');
      //这儿要判断抽奖次数是否大于0和不能快速点
      if(this.actInfo.totalnum_lot>0 && this.q_flag){
        axios.defaults.withCredentials = true
        axios.defaults.crossDomain = true
        this.q_flag=false;
        axios.post(Url.lotUrl).then((res)=>{
          if(res.status){
            this.$store.dispatch('getUserInfo');
            console.log(res.data.is_nowprize);
            if(res.data.is_nowprize){//中奖
              this.prizetoindex(res.data.nowprize_name);
            }else {
              this.prizeNum = 6;
              this.start(false);
            }

          }else {
            this.setDialog({time: 2000, msg: res.description})
          }
        }).catch((error)=>{
          this.setDialog({time: 2000, msg: error})
        })
      }else{

        if(!this.q_flag){
          return this.setDialog({time: 2000, msg: '正在抽奖呢！'})
        }

        if(this.actInfo.totalnum_lot<=0){
          return this.setDialog({time: 2000, msg: '没有抽奖机会了！'})
        }

      }

    },
    start (flag) {
      var _self = this
      _self.speed = 300

      function game () {
        _self.roll()
        _self.times++
        if(_self.times >= _self.cycle+8 && _self.index == _self.prizeNum){
          clearInterval(_self.timer)
          _self.times = 0
          if(flag){
            //中奖动作
            console.log('yes');
            setTimeout(function(){
              _self.$store.dispatch('whickToast',{isShowToast:true,type:2});
              _self.q_flag=true;
            },1000)

          }else{
            //没有中奖动作
            console.log('no');
            setTimeout(function(){
              _self.setDialog({time: 2000, msg: '没有中奖'})
              _self.q_flag=true;
            },1000)
          }
        }else{
          if(_self.times < _self.cycle){
            _self.speed -= 10
            if(_self.speed <= 100){
              _self.speed = 100
            }
          }else{
            _self.speed += 30
          }
          _self.timer = window.setTimeout(()=> game(), _self.speed)
        }
      }
      game()
    },
    //  滚动
    roll () {
      this.getId('ge1').style.background = 'rgba(0,0,0,0.4)';
      this.getId('ge2').style.background = 'rgba(0,0,0,0.4)';
      this.getId('ge3').style.background = 'rgba(0,0,0,0.4)';
      this.getId('ge4').style.background = 'rgba(0,0,0,0.4)';
      this.getId('ge5').style.background = 'rgba(0,0,0,0.4)';
      this.getId('ge6').style.background = 'rgba(0,0,0,0.4)';
      this.getId('ge7').style.background = 'rgba(0,0,0,0.4)';
      this.getId('ge8').style.background = 'rgba(0,0,0,0.4)';
      this.getId('ge9').style.background = 'rgba(0,0,0,0.4)';
      this.index++
      if(this.index > this.count) this.index = 1
      this.getId('ge' + this.index).style.background = 'transparent'
    },

    getId (id) {
      return document.getElementById(id)
    },
    ...mapActions({
      setDialog: 'setDialog',
      setMum: 'setMum'
    })
  },
  computed: {
    ...mapGetters({
      actInfo: 'actInfo',
      isShowyuyue:'isShowyuyue',
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
  .prize_con{
    width: 710px;
    height: 710px;
    background: #0e1c81;
    left: 20px;
    top:200px;
    background: url("./../assets/images/r_lotbg.png");
    .prize_ul{
      width: 680px;
      height: 680px;
      margin-left: 16px;
      margin-top: 18px;
      display: flex;
      display: -webkit-flex;
      flex-wrap: wrap;
      justify-content:space-between;
      .prize-li{
        width: 220px;
        height: 220px;
      }
    }

  }

  .prize_con_out{
    width: 710px;
    height: 710px;
    left: 20px;
    top:200px;
    .prize_ul{
      width: 680px;
      height: 680px;
      margin-left: 16px;
      margin-top: 18px;
      display: flex;
      display: -webkit-flex;
      flex-wrap: wrap;
      justify-content:space-between;
      .prize-li{
        width: 220px;
        height: 220px;
        background: rgba(0,0,0,0.4);
      }
    }
  }

  .lotbtn{
    width: 570px;
    height: 80px;
    left: 90px;
    top:950px;
  }
  .myprizebtn{
    width: 260px;
    height: 60px;
    left: 90px;
    top:1060px;
  }
  .ucenterbtn{
    width: 260px;
    height: 60px;
    right:90px;
    top:1060px;
  }


  /*关闭按钮*/
  .closebtn{
    width: 30px;
    height: 30px;
    right: 10px;
    top:10px;
    z-index: 4;
    img{
      width: 100%;
    }
  }
</style>
