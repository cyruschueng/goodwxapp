<template>
  <div class="gaxq-head row box-shadow-inset-radius border-radius-5" id="navBar">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding-lr title-box" style="position: relative;">
      <span class="title-text text-shadow-2">
        {{title}}
      </span>
      <div class="right-position" style="height: 55%;padding-right: 30px;">
        <router-link :to="link1">
          <img :src="btn1" style="height: 100%;">
        </router-link>
        <router-link :to="link2">
          <img :src="btn2" style="height: 100%;">
        </router-link>
      </div>      
    </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  props: ['title', 'btn1', 'btn2', 'link1', 'link2'],
  mounted: function(){
    setmiddle([$('.title-text')])
  }
}

</script>

<style>
.gaxq-head.box-shadow-inset-radius{
  -moz-box-shadow:0 -5px 10px 0px #7c9aa6 inset;
  -webkit-box-shadow:0 -5px 10px 0px #7c9aa6 inset;
  box-shadow:0 -5px 10px 0px #7c9aa6 inset;
} 
</style>