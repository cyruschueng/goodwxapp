<template>
  <el-dialog id="three-d-code" title="二维码" :visible.sync="isShowVisible">
    <div id="dialog-content">
      <canvas id="code-canvas"></canvas>
    </div>
  </el-dialog>
</template>
<script>
  import Vue from 'vue'
  import QRCode from 'qrcode'
  Vue.use(QRCode)
  export default {
    name: 'codeDialog',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      img: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        dialogTableVisibleSuccess: true,
        imageUrl: this.img,
        isShowVisible: false
      }
    },
    created () {
    },
    mounted () {
    },
    methods: {
      useqrcode () {
        var canvas = document.getElementById('code-canvas')
        QRCode.toCanvas(canvas, this.imageUrl, function (error) {
          if (error) console.error(error)
          console.log('success!')
        })
        this.canClick = false
      }
    },
    watch: {
      value () {
        this.isShowVisible = true
      },
      img (value) {
        this.imageUrl = value
        let self = this
        setTimeout(() => {
          self.useqrcode()
        }, 0)
      }
    },
    computed: {},
    components: {}
  }
</script>
<style lang="scss">
  #three-d-code {
    .el-dialog {
      position: fixed;
      height: 300px;
      width: 300px;
      left: 38%;
      top: 20%;
    }

    #code-canvas {
      margin-top: 10px;
      margin-left: 12%;
      height: 200px;
      width: 200px;
    }
  }


</style>
