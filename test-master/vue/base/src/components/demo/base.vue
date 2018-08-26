<template>
  
  <div>{{data1}}</div>

</template>
<script>
export default {
  data () {
    return {
      data1: 1
    }
  },
  props: {
    propDemo: {
      type: Number,
      default: 100
    }
  },
  methods: {
  },
  computed: {
  },
  components: {
  }
}
</script>

<style lang="stylus" scoped>

</style>
