<template>
  <div style="width: 100%;height: 100%;">
    <div class="tip-bar clearfix">
      <span class="tip-bar-text">{{title}}</span>
      <span class="tip-bar-subtext">{{subtitle}}</span>
    </div>
    <slot></slot> 
  </div>  
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  props: ['title', 'subtitle'],
  mounted (){
    setmiddle([$('.tip-bar-text'), $('.tip-bar-subtext')])
  }
}

</script>

<style>
.tip-bar{
  width: 100%;
  height: 12%;
  background:rgba(255,255,255,0.1); 
}
.tip-bar-text{
  padding-left: 0.2rem;
  border-left: 0.2rem solid #69c218;
  margin-left: 0.5rem
}
.tip-bar-subtext{
  float: right;
  padding-right: 1rem;
}
</style>