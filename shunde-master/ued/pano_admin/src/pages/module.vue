<template>
  <div>
    <module>
    </module>
  </div>
</template>
<script>
  import module from '../components/3Dmodule/3Dmodule.vue'
  export default {
    components: {
      module
    },
    data () {
      return {
        showStageName: '三维管理'
      }
    },
    created () {
//      this.isLogin()
    },
    methods: {
//      isLogin () {
//        if (this.$cookie.get('username')) {
//          this.$api.isLogin().then(res => {
//            if (res.code === '0' && res.data === 1) {
//              this.$router.push('/index')
//            }
//          })
//        }
//      }
    },
    computed: {
      example () {
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
