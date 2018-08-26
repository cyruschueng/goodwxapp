<template>
  <div style="height: 3%;text-align: center;padding-top: 1%;" class="row">
    <!-- <span class="footer-text">Copyright  2016.成都源溯优品科技有限公司</span> -->
    <span class="footer-text">{{txt}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  props: ['txt'],
  mounted (){
    setmiddle([$('.footer-text')])
  }
}

</script>

<style>

</style>