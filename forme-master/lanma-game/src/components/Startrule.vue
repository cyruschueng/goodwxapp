<template>
  <div class="page startrulePage">
    <img class="bgimg" src="./../assets/images/l_startbg.jpg">
    <!--start_word-->
    <div class="ab start_word">
      <img class="quanimg" src="./../assets/images/l_startruleword.png">
    </div>
    <!--startbtn-->
    <router-link to="photo">
      <div class="ab startbtn">
        <img class="quanimg" src="./../assets/images/l_startbtn.png">
      </div>
    </router-link>
    <!--bottombtn-->
    <Botoombtn></Botoombtn>
  </div>
</template>

<script>
import Botoombtn from './Botoombtn.vue'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'startrule',
  components:{
    Botoombtn,//底部按钮
  },
  data () {
    return {

    }
  },
  methods: {

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
    console.log(this.actInfo);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" scoped lang="scss">
  .start_word{
    width: 440px;
    height: 498px;
    left: 155px;
    top:480px;
  }
  .startbtn{
    width: 208px;
    height: 59px;
    left: 271px;
    top:780px;
  }

</style>
