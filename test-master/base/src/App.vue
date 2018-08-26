<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {}
}
</script>

<style lang="scss">
@import "./assets/scss/reset.scss";
//初始化css默认样式
@import "./assets/scss/const.scss";
</style>
