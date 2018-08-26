<template>
  <div id="popup">
    <div id="close" v-on:click="close">×</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    close: function () {
      document.getElementById("popup").style.display = "none"
      document.getElementById("mask").style.display = "none"
      this.$emit('close')
    }
  }
}

</script>