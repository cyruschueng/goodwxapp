<template>
    <router-view></router-view>
</template>
<script>

export default {
  name: 'component-publish',
  components: {
  },
  data () {
    return {
      showStageName: '发布管理'
    }
  },
  created () {
//    this.isLogin()
  },
  methods: {
//    isLogin () {
//      if (this.$cookie.get('username')) {
//        this.$api.isLogin().then(res => {
//          if (res.code === '0' && res.data === 1) {
//            this.$router.push('/index')
//          }
//        })
//      }
//    }
  },
  computed: {
    example () {
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
