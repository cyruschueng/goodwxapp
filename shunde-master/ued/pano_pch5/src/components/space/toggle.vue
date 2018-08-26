<template>
  <div class="toggle">
    <btn :class="[btnClass,{'btn-active':flag}]" :text="textBefore" @click="c1"></btn>
    <btn :class="[btnClass,{'btn-active':!flag}]" :text="textAfter" @click="c2"></btn>
  </div>
</template>
<script>
  import btn from '../btn.vue'
  export default {
    components: {
      btn
    },
    props: {
      toggle: {
        type: String
      },
      textBefore: {
        type: String
      },
      textAfter: {
        type: String
      },
      flag: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        btnClass: 'btn'
      }
    },
    methods: {
      c1 () {
        this.$emit('click', true)
      },
      c2 () {
        this.$emit('click', false)
      }
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  $main-color: #1ab0e7;
  $sub-color: #fff;
  .toggle{
    width: 120px;
    height: 26px;
    border:1px solid $main-color;
    border-radius: 5px;
    display: flex;
    overflow: hidden;
  }
  .btn{
    flex: 1 0 0;
    font-size: 14px;
    background: $sub-color;
    color: $main-color;
  }
  .btn-active{
    background: $main-color;
    color: $sub-color;
  }


</style>
