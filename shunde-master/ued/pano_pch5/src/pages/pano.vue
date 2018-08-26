<template>
   <router-view></router-view>
</template>
<script>
  export default {
    name: 'component-pano',
    components: {},
    data () {
      return {
        showStageName: '全景管理'
      }
    },
    created () {
    },
    methods: {
      getRouter (path) {
        return (this.$route.path && this.$route.path.indexOf(path) > -1) ? 'routerActive' : ''
      }
    },
    computed: {
      example () {
      }
    }
  }
</script>

<style lang="scss" scoped>
  #routerContainer{
    background: #f9f9f9;
    a{
      color: #1bb1e6 !important;
    }
  }
</style>
