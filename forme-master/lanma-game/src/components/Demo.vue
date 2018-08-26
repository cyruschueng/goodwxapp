<template>
  <div class="page saishiPage">
    <img class="bgimg" src="./../assets/images/j_indexbg.jpg">
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'saishi',
  components:{

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

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" scoped lang="scss">

</style>
