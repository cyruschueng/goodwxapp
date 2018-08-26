<template>
  <div id="bar">
    <div class="content">
      <toggle text-before="网格"  text-after="漫游" @click="c" :flag="toggleFlag"></toggle>
    </div>
  </div>
</template>
<script>
  import toggle from './toggle.vue'
  export default {
    components: {
      toggle
    },
    methods: {
      c (flag) {
        this.toggleFlag = flag
        this.$router.push(this.toggleFlag ? '/pages/space' : '/pages/space/roam')
      },
      dealPath (path) {
        if (path.indexOf('roam') !== -1) {
          console.log('漫游')
          this.toggleFlag = false
        } else {
          console.log('网格')
          this.toggleFlag = true
        }
      }
    },
    data () {
      return {
        toggleFlag: true
      }
    },
    created () {
      this.dealPath(this.$router.history.current.path)
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        this.dealPath(to.path)
      }
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  #bar{
    background: #fff;
    flex:  0 0 auto;

    .content{
      width: 1200px;
      height: 50px;
      margin: 0 auto;
      background: #fff;
      display: flex;
      align-items: center;
    }
  }
</style>
