<template>
  <div class="page indexPage">
    <img class="bgimg" src="./../assets/images/r_indexbg.jpg">
    <!--活动规则按钮-->
    <div class="rulebtn ab" @click="lookRule"><span>活动规则</span></div>
    <!--join us-->
    <router-link to="task">
      <div class="joinbtn ab">
        <img class="quanimg" src="./../assets/images/r_joinbtn.png">
      </div>
    </router-link>
    <!--活动规则-->
    <Toastrule v-show="isShowrule">
      <div @click="closeRule" class="closebtn ab"><img src="./../assets/images/r_closebtn.png"></div>
    </Toastrule>
  </div>
</template>

<script>
import Toastrule from './Toastrule'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'index',
  components:{
    Toastrule,//活动规则
  },
  data () {
    return {
      isShowrule:false,//是否显示规则弹窗
    }
  },
  methods: {
    lookRule(){
      this.isShowrule=true;
    },
    closeRule(){
      this.isShowrule=false;
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
  .joinbtn{
    width: 404px;
    height: 74px;
    left: 173px;
    top:1100px;
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
