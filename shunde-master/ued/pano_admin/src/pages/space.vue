<template>
  <div id="space-container">
    <bar></bar>
    <router-view></router-view>
  </div>
</template>
<script>
  import toggle from '../components/space/toggle.vue'
  import bar from '../components/space/bar.vue'
  export default {
    name: 'space',
    components: {
      toggle,
      bar
    },
    data () {
      return {
        showStageName: '空间管理'
      }
    },
    computed: {
      example () {
      }
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import "../style/space.scss";
  #space-container{
    background: $space-bg-color;
  }

</style>
