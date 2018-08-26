<template>
  <el-dialog id="three-d-code" title="二维码" :visible.sync="isShowVisible">
    <div>
      <div style="color: #98D15D; text-align: center">互联网发布成功</div>
      <canvas id="canvas"></canvas>
      <div style="text-align: center">
        <el-button round style="padding-top: 5px;padding-bottom: 5px;padding-left: 10px;padding-right: 10px">下载二维码</el-button>
      </div>
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
