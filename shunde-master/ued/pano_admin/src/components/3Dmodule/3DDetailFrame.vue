<template>
  <div id="three-d-frame" v-show="isShowVisible">
    <div id="three-d-model-view">
    </div>
    <img class="icon-close" src='../../../static/close.png' @click="closeModel">
    <div class="icon-container">
      <img class="icon-model-control" src='../../../static/model_enlarge.png' @mousedown.stop="mouseDownBig($event)"
           @mouseleave.stop="mouseLeaveBig()"
           @mouseup.stop="mouseUpBig($event)">
      <img class="icon-model-control" src='../../../static/model_small.png'>
      <img class="icon-model-control" src='../../../static/model_leftrotate.png'>
      <img class="icon-model-control" src='../../../static/model_rightrotate.png'>
      <img class="icon-model-control" src='../../../static/model_updown.png'>
    </div>

  </div>
</template>
<script>
  var threeDModelView = null
  //  var View = null
  export default {
    name: 'threeDDetail',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      threeDUrl: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        dialogTableVisibleSuccess: true,
        url1: this.threeDUrl,
        isShowVisible: false,
        vrId: '',
        jobId: '',
        fovMax: 80,
        fovMin: 10,
        enlargeInterval: null
      }
    },
    created () {
    },
    mounted () {
      this.initVizen()
    },
    methods: {
      closeModel () {
        this.isShowVisible = false
      },
      initVizen () {
        /* eslint-disable no-new */
        new window.com.vizengine.App(document.getElementById('three-d-model-view'), function () {
//          View = window.com.appengine.view.View
          if (threeDModelView === null) {
            threeDModelView = new window.com.vizengine.view.Model3DView()
            threeDModelView.camera.far = 4000
            threeDModelView._nativeView.div.style.position = 'absolute'
          }
          return threeDModelView
        })
      },
      initModel () {
        if (threeDModelView) {
          threeDModelView.setWidth((window.innerWidth || 500) + 'dp')
          threeDModelView.setWidth('fill')
          setTimeout(function () {
            threeDModelView.setModelSrc('http://test-model-vbr3d.oss-cn-beijing.aliyuncs.com/scenes/1EAC78E78AC945A2930A6ECC3003DDB9/877', function () {
              setTimeout(function () {
                threeDModelView.onCameraLocationChanged()
              }, 500)
            })
          }, 100)
        }
      },
      mouseDownBig (e) {
        let fov = threeDModelView.fov
        let self = this
        this.enlargeInterval = setInterval(function () {
          if (fov < self.fovMin) {
            return
          }
          fov--
          threeDModelView.camera.fov = fov
          threeDModelView.camera.updateProjectionMatrix()
        }, 500)
      },
      mouseLeaveBig () {
        clearInterval(this.enlargeInterval)
        this.enlargeInterval = null
      },
      mouseUpBig (e) {
        clearInterval(this.enlargeInterval)
        this.enlargeInterval = null
      }
    },
    watch: {
      value () {
        this.isShowVisible = true
      },
      threeDUrl (value) {
        this.url1 = value
        this.initModel()
      }
    },
    computed: {},
    components: {}
  }
</script>
<style lang="scss">
  #three-d-frame {
    position: fixed;
    left: 0px;
    top: 0px;
    height: 100%;
    width: 100%;
    .icon-close {
      position: absolute;
      z-index: 25;
      width: 35px;
      right: 20px;
      margin-top: 20px;
    }
    #three-d-model-view {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 10;
    }
    .icon-container {
      position: absolute;
      display: flex;
      bottom: 0;
      flex-direction: row;
      width: 100%;
      height: auto;
      margin-bottom: 30px;
      justify-content: center;
    }
    .icon-model-control {
      z-index: 20;
      margin-left: 8px;
      margin-right: 8px;
      width: 25px;
      height: 25px;
    }

  }


</style>
