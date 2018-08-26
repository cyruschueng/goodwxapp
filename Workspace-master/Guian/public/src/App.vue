<template>
  <div class="container-fluid main-contain" style="width: 100%;height: 100%;">
    <transition name="custom-classes-transition"
    enter-active-class="animated slideInLeft"
    leave-active-class="animated slideOutRight" mode="out-in">
      <router-view></router-view>
    </transition>    
  </div>
</template>

<script>

export default {
  data () {
    return {
      
    }
  },
  components: {  },
  beforeCreate: function(){
    var bh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    document.getElementsByTagName("html")[0].style.height = bh + "px";
  },
  mounted: function(){
    
  }
}
</script>
