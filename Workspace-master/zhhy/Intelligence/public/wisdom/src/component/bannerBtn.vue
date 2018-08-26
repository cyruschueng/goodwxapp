<template>
  <div class="banner-btn text-center">
    <img :src="picURL" @click="submit">
  </div>  
</template>

<script>
export default {
  data() {
    var vm = this
    return {
      picURL: config.picURL.bannerBtn[vm.name]
    }
  },
  props: ['name'],
  mounted (){
    
  },
  methods: {
    submit: function(){
      this.$emit('commit')
    }
  }
}

</script>