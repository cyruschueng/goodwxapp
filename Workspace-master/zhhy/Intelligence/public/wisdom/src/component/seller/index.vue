<template>
  <div style="width: 100%;">
    <router-view></router-view> 
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  mounted () { 
    
  },
  methods: {
    
  },
  beforeRouteEnter (to, from, next) {
    next()
  },
  beforeRouteLeave (to, from, next) {
    next()
  }
}
</script>