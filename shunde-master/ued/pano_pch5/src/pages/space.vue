<template>
  <div id="space-container">
    <router-view></router-view>
  </div>
</template>
<script>
  import toggle from '../components/space/toggle.vue'
  export default {
    name: 'space',
    components: {
      toggle
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
