<template>
  <div>
    <BaseNav/>
    <router-view></router-view>
  </div>
</template>
<script>
import BaseNav from '@/components/common/baseNav.vue'
export default {
  data () {
    return {}
  },
  components: {
    BaseNav
  }
}
</script>
<style lang="scss" scoped>

</style>

