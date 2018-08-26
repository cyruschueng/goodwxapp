<template>
  <div id="panoContainer2">
    <div id="panoContainer">
    </div>
    <direction-image class="icon-direction-full" src='/static/direction.png' v-show="!isEmpty" @northclick="northClick"
                     @westclick="westClick" @eastclick="eastClick" @southclick="southClick"/>
    <img id="close" src='/static/close.png' v-on:click="close"/>
    <div id="rightBtnContainer">
      <img id="allStop" v-bind:src="this.playStatus ? '/static/pause-2.png' : '/static/play-2.png'"
           v-on:click="stop"/>
      <img id="vrBtn" src="/static/vr_btn_two.png" v-on:click="vr"/>
    </div>
    <div class="small-map">
      <map-view :show-head="false" :clickEnable='false' size="tiny" v-model="gridCode"></map-view>
    </div>
  </div>
</template>
<script>
  var panoView = null
  import mapView from './map.vue'
  import directionImage from './directionImage.vue'
  export default{
    created () {
    },
    props: {
      isEmpty: {
        type: Boolean,
        default: false
      }
    },
    watch: {},
    data () {
      return {
        loading: true,
        playStatus: true,
        vrStatus: false,
        gridCode: '',
        leftCode: -1,
        rightCode: -1
      }
    },
    mounted () {
      let panoId = this.$route.params.panoId
      this.gridCode = this.$route.params.gridCode
      this.leftCode = this.$route.params.leftCode
      this.rightCode = this.$route.params.rightCode
      this.initPanoView(panoId)
    },
    components: {
      mapView,
      directionImage
    },
    methods: {
      getPoiData (grid) {
        this.$api.getPoiList({
          gridCode: grid
        }).then(res => {
          if (res.code === 0) {
            if (res.data && res.data.length > 0) {
              this.panoId = res.data[0].panoInfo.panoId
              this.initPanoView(this.panoId)
            } else {
              this.$message('该网格没数据')
            }
          } else {
            this.$message.error(res.msg)
          }
        }).catch(res => {
          this.$message.error('请求数据失败')
        })
      },
      northClick () {
        if (this.leftCode === 0) {
          this.$message.error('已经在最北了')
          return
        }
        this.leftCode -= 1
        this.gridCode = (this.rightCode + 10).toString(32).toUpperCase() + '' + this.leftCode
        this.getPoiData(this.gridCode)
      },
      westClick () {
        if (this.rightCode === 0) {
          this.$message.error('已经在最西了')
          return
        }
        this.rightCode -= 1
        this.gridCode = (this.rightCode + 10).toString(32).toUpperCase() + '' + this.leftCode
        this.getPoiData(this.gridCode)
      },
      eastClick () {
        if (this.rightCode === 13) {
          this.$message.error('已经在最东了')
          return
        }
        this.rightCode += 1
        this.gridCode = (this.rightCode + 10).toString(32).toUpperCase() + '' + this.leftCode
        this.getPoiData(this.gridCode)
      },
      southClick () {
        if (this.leftCode === 13) {
          this.$message.error('已经在最南了')
          return
        }
        this.leftCode += 1
        this.gridCode = (this.rightCode + 10).toString(32).toUpperCase() + '' + this.leftCode
        this.getPoiData(this.gridCode)
      },
      initPanoView (key) {
        /* eslint-disable no-new */
        if (!key || key.trim() === '') {
          this.loading = false
          return null
        }
        this.$api.panoStatistics({panoId: key})
        var self = this
        new window.com.vizengine.App(document.getElementById('panoContainer'), function () {
          if (panoView === null) {
            panoView = new window.com.vizengine.view.PanoView()
          }
          panoView.setMouseWheelEnable(false)
          panoView.panoViewInternal.setAutoplayEnable(self.playStatus)
          panoView.setPanoId(key, function () {
            self.loading = false
          })
          panoView.setKeyEnable(false)
          panoView._nativeView.div.style.position = 'absolute'
          return panoView
        })
      },
      close () {
        this.$router.push({
          path: '/pages/space/roam',
          name: 'roam',
          params: {panoId: this.panoId, gridCode: this.gridCode, leftCode: this.leftCode, rightCode: this.rightCode}
        })
      },
      stop () {
        this.playStatus = !this.playStatus
        if (panoView) {
          panoView.panoViewInternal.setAutoplayEnable(this.playStatus)
        }
      },
      vr () {
        this.playStatus = false
        this.vrStatus = !this.vrStatus
        if (panoView) {
          panoView.panoViewInternal.setVREnable(this.vrStatus)
          panoView.panoViewInternal.setAutoplayEnable(this.vrStatus)
        }
      }
    }
  }

</script>
<style scoped lang="scss" rel="stylesheet/scss">

  #panoContainer2 {
    position: relative;
    width: 100%;
    height: 100%;
    background: #000000;
  }

  #panoContainer {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #000000;
  }

  #rightBtnContainer {
    display: flex;
    flex-direction: row;
    margin-right: 30px;
    margin-top: 20px;
    position: absolute;
    right: 0px;
    width: auto;
    height: auto;
    align-items: center;
  }

  #vrBtn {
    flex: 0 0 auto;
    width: 32px;
    margin-left: 20px;
    height: auto;
  }

  #allStop {
    flex: 0 0 auto;
    width: 32px;
    height: auto;
  }

  #icon {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 120px;
    height: 105px;
  }

  .small-map {
    position: absolute;
    bottom: 0;
  }

  .icon-direction-full {
    position: absolute;
    right: 0px;
    bottom: 0px;
    margin-top: 10px;
  }

  #close {
    position: absolute;
    margin-left: 30px;
    margin-top: 20px;
    width: 30px;
    height: 30px;
  }

</style>
