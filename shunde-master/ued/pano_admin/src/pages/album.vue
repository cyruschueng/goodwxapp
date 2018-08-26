<template>
  <iframe id="iframeCondy" :src="url"/>
</template>
<script>
export default {
  name: 'component-ablum',
  components: {
  },
  data () {
    return {
      modulename: '专题管理',
      url: ''
    }
  },
  created () {
    this.$api.getToken({}).then(res => {
      if (res.data) {
        if (this.$cookie.get('albumId') != null) {
          this.url = 'http://shunde.vizen.cn/pano_album/backstage/login.html?unique_id=' + res.data.unique_id + '&token=' + res.data.token + '&albumId=' + this.$cookie.get('albumId')
        } else {
          this.url = 'http://shunde.vizen.cn/pano_album/backstage/login.html?unique_id=' + res.data.unique_id + '&token=' + res.data.token
        }
      }
      this.$cookie.del('albumId')
    })
  },
  mounted () {
  },
  methods: {
  },
  computed: {
    example () {
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
