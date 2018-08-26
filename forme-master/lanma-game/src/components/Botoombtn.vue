<template>
  <div>
    <div class="ab bottombtn">
      <img class="quanimg" @click="lookrule" src="./../assets/images/l_rulebtn.png">
      <img class="quanimg photobtn" @click="looksaishi" src="./../assets/images/l_photobtn.png">
    </div>
    <!--规则-->
    <Toastrule v-if="isShowrule">
      <div class="ab closebtn" @click="closerule">
        <img class="quanimg" src="./../assets/images/l_closebtn.png">
      </div>
    </Toastrule>
    <!--赛事-->
    <Toastsaishi v-if="isShowsaishi">
      <div class="ab closebtn" @click="closesaishi">
        <img class="quanimg" src="./../assets/images/l_closebtn.png">
      </div>
    </Toastsaishi>
  </div>
</template>

<script>
import Toastrule from './Toastrule.vue'
import Toastsaishi from './Toastsaishi.vue'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'bottombtn',
  components:{
    Toastrule,//规则弹框
    Toastsaishi,//赛事
  },
  data () {
    return {
      isShowrule:false,
      isShowsaishi:false,
    }
  },
  methods: {
    lookrule(){
      this.isShowrule=true;
    },
    closerule(){
      this.isShowrule=false;
    },
    looksaishi(){
      this.isShowsaishi=true;
    },
    closesaishi(){
      this.isShowsaishi=false;
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
  .bottombtn{
    width: 650px;
    height: 100px;
    background: #588885;
    text-align: center;
    top:1030px;
    left: 50px;
    border-radius: 45px;
    img{
      width: 236px;
      height: 72px;
      margin-top: 14px;
    }
    .photobtn{
      margin-left: 70px;
    }
  }

  .closebtn{
    width: 83px;
    height: 83px;
    right: -30px;
    top:-30px;
    z-index: 4;
  }
</style>
