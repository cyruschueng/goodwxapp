<template>
  <div style="width: 100%;" class="page-app">
    <router-view></router-view>   
  </div>
</template>

<script>

export default {
  mounted() {
    var vm = this
    $(document).on('click', '.close-qrcode', function(){
      commom.closeQR()
    })
  }
}
</script>
