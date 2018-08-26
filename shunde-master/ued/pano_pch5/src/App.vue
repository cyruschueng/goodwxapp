<template>
  <router-view id="content"/>
</template>
<script>
export default {
  name: 'app',
  mounted () {},
  data () {
    return {
      isWechat: false
    }
  },
  created () {
    this.$api.departmentList().then(res => {
      if (res.code === 0) {
        this.$store.commit('UPATEDEPARTMENTLISTINFO', res)
      } else {
        alert('获取部门列表失败')
      }
    })
    this.$api.loginSave(this)
  },
  computed: {
  },
  methods: {}
}
</script>

<style lang="scss">
  #content{
    width: 100%;
    min-width: 1200px;
  }
</style>
