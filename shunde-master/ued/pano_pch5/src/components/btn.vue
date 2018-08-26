<template>
  <div class="btnClass" @click="c">
    <i v-if="hasLeftIcon" :class="leftIcon"></i><span>{{text}}</span>
  </div>
</template>
<script>
  export default {
    props: ['text', 'leftIcon'],
    computed: {
      hasLeftIcon () {
        return !this.$utils.isEmpty(this.leftIcon)
      }
    },
    methods: {
      c () {
        this.$emit('click')
      }
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .btnClass{
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
</style>
