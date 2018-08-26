<template>
  <div class="top-nav clearfix">
    <div class="nav-back text-center">
    <div class="nav-img" @click="goBack">
      <img :src="navBack">
    </div>
      
    </div>
    <div class="nav-title text-center">
      <span class="title">{{title}}</span>
    </div>
    <div class="nav-manu text-center flex">
    <div class="nav-img" v-if="showManu === '1'">
      <img :src="navManu" class="nav-manu-img">
    </div>
      <div v-if="manuType === 'type'" style="margin: auto;color: #fff;" @click="save">
        确定
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  data() {
    return {
      navBack: config.picURL.navBack,
      navManu: config.picURL.navManu
    }
  },
  props: ['title', 'showManu', 'manuType'],
  methods: { 
    // 返回
    goBack: function(){
      this.$emit('back')
    },
    save: function(){
      this.$emit('save')
    }
  },
  mounted (){
    // commom.setmiddle([$('.nav-title .title')])
  }
}

</script>