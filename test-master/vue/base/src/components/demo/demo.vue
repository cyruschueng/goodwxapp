<template>
  <div class="hello">
    <div v-for="(item, index) in aaa" :key="index">{{item.address}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      aaa: []
    }
  },
  created () {
    this.test()
  },
  methods: {
    test () {
      this.$_api.tologin({aaa: '66'},(res) => {
        console.log(res)
      })
    }
    // test () {
    //   this.$store.dispatch('alert', {aaa: '66'})
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

</style>
