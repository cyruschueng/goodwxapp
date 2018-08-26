<template>
  <div id="overlay" @touchmove.prevent.stop="touchmove" @click="handlerClick">

  </div>
</template>
<script>
  export default {
    props: {
      click: {
        type: Function
      }
    },
    methods: {
      touchmove () {
      },
      handlerClick () {
        if (this.click) {
          this.click()
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  #overlay{
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index:1000;
    background: rgba(0,0,0,0.3);
  }
</style>
