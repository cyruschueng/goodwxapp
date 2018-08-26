<template>
  <div id="overlay" @click.stop="c($event)" @scroll.prevent @touchmove.prevent>
    <slot></slot>
  </div>
</template>
<script>
  export default {
    mounted () {
      this.$utils.hideBody()
    },
    methods: {
      c (event) {

      }
    },
    destroyed () {
      this.$utils.showBody()
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  #overlay{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    top: 0;
    left: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
