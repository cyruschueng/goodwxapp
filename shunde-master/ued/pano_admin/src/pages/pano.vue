<template>
  <router-view></router-view>
</template>
<script>
  // import jQuery from 'jquery'
  export default {
    name: 'component-pano',
    components: {},
    data () {
      return {
        showStageName: '全景管理'
      }
    },
    created () {
      // this.isLogin()
      // console.error(jQuery)
    },
    methods: {
      // isLogin () {
      //   if (this.$cookie.get('username')) {
      //     this.$api.isLogin().then(res => {
      //       if (res.code === '0' && res.data === 1) {
      //         this.$router.push('/index')
      //       }
      //     })
      //   }
      // }
    },
    computed: {
      example () {
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
