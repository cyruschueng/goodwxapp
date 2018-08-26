<template>
  <div id="panoContainer2">
    <div id="panoContainer">
    </div>
    <direction-image class="icon-direction-full" src='../../../static/direction.png' v-show="!isEmpty" @northclick="northClick"
                     @westclick="westClick" @eastclick="eastClick" @southclick="southClick"/>
    <img id="close" src='../../../static/close.png' v-on:click="close"/>
    <div id="rightBtnContainer">
      <img id="allStop" v-bind:src="this.playStatus ? './static/pause-2.png' : './static/play-2.png'"
           v-on:click="stop"/>
      <img id="vrBtn" src="../../../static/vr_btn_two.png" v-on:click="vr"/>
    </div>
    <div class="small-map">
      <div class="pano-name">{{panoname}}</div>
      <map-view :show-head="false" :clickEnable='false' size="tiny" v-model="gridCode"></map-view>
    </div>
  </div>
</template>
<script>
  let self = null
  let panoView = null
  let View = null
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
        playStatus: false,
        vrStatus: false,
        gridCode: '',
        markerList: [],
        leftCode: -1,
        rightCode: -1,
        panoname: ''
      }
    },
    mounted () {
      self = this
//      let panoId = this.$route.params.panoId
      this.gridCode = this.$route.params.gridCode
      this.leftCode = this.$route.params.leftCode
      this.panoname = this.$route.params.panoName
      this.rightCode = this.$route.params.rightCode
      this.initVizenEnigine()
      this.getPoiData(this.gridCode)
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
              self.panoId = res.data[0].panoInfo.panoId
              self.panoname = res.data[0].panoInfo.name
              self.markerList = []
              self.$api.getMarkerList({
                gridCode: grid
              }).then(res => {
                if (res.code === 0) {
                  if (res.data) {
                    let eData = res.data.E
                    if (eData) {
                      eData.directionType = 'E'
                      eData.panoHeading = '263.0859'
                      eData.panoPitch = '-2.5450'
                      self.markerList.push(eData)
                    }
                    let sData = res.data.S
                    if (sData) {
                      sData.panoHeading = '176.2088'
                      sData.panoPitch = '-2.0547'
                      sData.directionType = 'S'
                      self.markerList.push(sData)
                    }
                    let nData = res.data.N
                    if (nData) {
                      nData.directionType = 'N'
                      nData.panoHeading = '-11.5527'
                      nData.panoPitch = '-2.1195'
                      self.markerList.push(nData)
                    }
                    let wData = res.data.W
                    if (wData) {
                      wData.panoHeading = '81.0067'
                      wData.panoPitch = '-2.3173'
                      wData.directionType = 'W'
                      self.markerList.push(wData)
                    }
                  }
                } else {
                  self.markerList = []
                }
                this.initPanoView(self.panoId)
              }).catch(e => {
                self.markerList = []
                this.initPanoView(self.panoId)
              })
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
      cutText (text) {
        if (!text) {
          text = ''
        }
        if (text.length > 6) {
          return text.substring(0, 6) + '...'
        } else {
          return text
        }
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
      initVizenEnigine () {
        /* eslint-disable no-new */
        new window.com.vizengine.App(document.getElementById('panoContainer'), function () {
          if (panoView === null) {
            panoView = new window.com.vizengine.view.PanoView()
          }
          View = window.com.appengine.view.View
          panoView.setMouseWheelEnable(false)
          panoView.setKeyEnable(false)
          panoView._nativeView.div.style.position = 'absolute'
          return panoView
        })
      },
      initPanoView (key) {
        if (!key || key.trim() === '') {
          this.loading = false
          return null
        }
        this.$api.panoStatistics({panoId: key})
        panoView.setPanoId(key, function () {
          self.loading = false
        })
        panoView.setAdaptor({
          getView: function (index) {
            var cell = View.parse({
              width: 'wrap',
              height: 'wrap',
              layout: 'vertical',
              panoHeading: self.markerList[index].panoHeading,
              panoPitch: self.markerList[index].panoPitch,
              children: [
                {
                  layout: 'frame',
                  height: 'wrap',
                  width: 'wrap',
                  children: [{
                    type: 'ImageView',
                    width: '120dp',
                    height: '30dp',
                    clipToBounds: 'true',
                    src: '../../static/marker-bg.png',
                    paddingLeft: '10dp',
                    paddingRight: '10dp',
                    paddingTop: '3dp'
                  }, {
                    type: 'TextView',
                    text: self.cutText(self.markerList[index].name),
                    fontColor: '#ffffff',
                    width: 'fill',
                    marginLeft: '17dp',
                    marginRight: '17dp',
                    height: 'wrap',
                    fontSize: '9dp',
                    gravity: 'center',
                    contentGravity: 'center'
                  }]
                }, {
                  id: 'icon',
                  type: 'ImageView',
                  width: 'wrap',
                  height: '15dp',
                  src: '../../static/marker-bg-stick.png',
                  gravity: 'centerHorizontal'
                }]
            })
            cell.type = self.markerList[index].directionType
            cell._nativeView.div.zIndex = 100
            cell._nativeView.div.style.cursor = 'pointer'
            cell.setOnClick(function () {
//              alert('heading:' + this.panoHeading + '===========pitch:' + this.panoPitch)
//              return
              if (this.type === 'E') {
                self.eastClick()
              } else if (this.type === 'N') {
                self.northClick()
              } else if (this.type === 'S') {
                self.southClick()
              } else if (this.type === 'W') {
                self.westClick()
              }
            })
            if (cell) {
              return cell
            } else {
              return null
            }
          },
          getCount: function () {
            return self.markerList.length
          }
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
    display: flex;
    flex-direction: column;
    bottom: 0;
  }

  .pano-name {
    background: rgba(0, 0, 0, 0.5);
    padding: 3px 10px 5px;
    font-size: 11px;
    width: 80%;
    margin: 5px;
    color: white;
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
