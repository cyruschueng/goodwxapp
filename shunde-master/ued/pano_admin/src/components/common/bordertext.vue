<template>
  <div class="combordertext cursor-pointer" :class="{'disabled': disabled}" 
      :style="{fontSize: fontSize, borderWidth: borderWidth, padding: padding, height: height}" >
    <div class="user-select-none">{{text}}</div>
  </div>
</template>
<script>
export default {
  name: 'combordertext',
  props: {
    text: null,
    height: null,
    padding: null,
    disabled: null,
    fontSize: null,
    borderWidth: null
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  $activeColor: #1bb1e6;

  .combordertext{
    border-width: 1px;
    border-color: $activeColor;
    border-style: solid;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    height: 22px;
    border-radius:12px;
    color:$activeColor;
    &:hover{
      background: $activeColor;
      color:#fff;
    }
  }
</style>

