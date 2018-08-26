<template>
  <div class="toast toastsaishi">
    <!--word-->
    <div class="wordp ab">
      <!--closebtn-->
      <slot></slot>
      <!--word-->
      <div class="word ab">
        <img class="ab bgimg" src="./../assets/images/l_saishibg.png">
        <!--input-->
        <input class="ab input_li" type="text" v-model="actInfo.lanma_num" placeholder="请输入你的参赛号码">
        <!--inputbtn-->
        <div class="ab inputbtn" @click="tjnum" v-if="actInfo.num_status!=1"><span>确认</span></div>
        <div class="ab inputbtn" @click="tjnum" v-else><span>修改</span></div>
        <!--tosaishi-->
        <div class="ab saishibtn">
          <img class="quanimg" src="./../assets/images/l_tosaishibtn.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'toastsaishi',
  components:{

  },
  methods: {
    tjnum(){
      if(this.actInfo.lanma_num.length == '4'){
        this.$store.dispatch('tjTruenum',{'gamenum':this.actInfo.lanma_num});
      }else {
        return this.setDialog({time: 2000, msg: '参赛号码没有填写对哦！'})
      }
    },
    ...mapActions({
      setDialog: 'setDialog',
      setMum: 'setMum',
    })
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
    width: 566px;
    height: 800px;
    position: absolute;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    .word{
      width: 566px;
      height: 800px;
      .bgimg{
        width: 566px;
        height: 800px;
      }
      .input_li{
        width: 330px;
        height: 50px;
        top:375px;
        left: 60px;
        font-size: 30px;
        line-height: 50px;
        color: #1e2356;
      }
      .inputbtn{
        width: 90px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 30px;
        background: #1e2356;
        color: white;
        border-radius: 10px;
        top:375px;
        right: 60px;
      }
      .saishibtn{
        width: 460px;
        height: 75px;
        top:580px;
        left: 60px;
      }
    }
  }
</style>
