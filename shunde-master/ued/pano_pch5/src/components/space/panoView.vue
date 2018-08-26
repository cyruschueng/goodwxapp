<template>
  <div id="allContainer">
    <div id="container">
      <div id="container-empty" v-show="isEmpty">
        <img class="location-icon" src="/static/icon-location.png"/>
        <div class="text-empty">请先选择漫游起始点</div>
      </div>
      <direction-image class="icon-direction" src='/static/direction.png' v-show="!isEmpty" @northclick="northClick"
                       @westclick="westClick" @eastclick="eastClick" @southclick="southClick"/>
    </div>
    <div id="loading-layout" v-loading="loading" v-show="loading"></div>
  </div>
</template>
<script>
  import directionImage from './directionImage.vue'
  var panoView = null
  export default{
    name: 'roamPanoView',
    created () {
    },
    props: {
      isEmpty: {
        type: Boolean,
        default: true
      },
      playFlag: {
        type: Boolean,
        default: false
      },
      vrFlag: {
        type: Boolean,
        default: false
      },
      panoId: {
        type: String,
        default: ''
      },
      markList: {
        type: Array,
        default: []
      },
      initPanoEnable: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        loading: true,
        panoID: this.panoId,
        num: 1,
        objectNum: 0
      }
    },
    components: {
      directionImage
    },
    watch: {
      playFlag (value) {
        if (panoView) {
          panoView.panoViewInternal.setAutoplayEnable(value)
        }
      },
      vrFlag (value) {
        if (panoView) {
          panoView.panoViewInternal.setVREnable(value)
        }
      },
      panoId (value) {
        this.panoID = value
        this.num = 1
      },
      initPanoEnable (value) {
        if (value === true) {
          this.initPanoView(this.panoID)
        }
      }
    },
    mounted () {
      this.initPanoView(this.panoId)
    },
    methods: {
      northClick () {
        this.$emit('northclick')
      },
      westClick () {
        this.$emit('westclick')
      },
      eastClick () {
        this.$emit('eastclick')
      },
      southClick () {
        this.$emit('southclick')
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
      initPanoView (panoID) {
        if (this.num > 1) {
          return
        }
        this.num++
        /* eslint-disable no-new */
        if (!panoID || panoID.trim() === '') {
          this.loading = false
          return null
        }
        this.$api.panoStatistics({panoId: panoID})
        var self = this
        new window.com.vizengine.App(document.getElementById('container'), function () {
          if (panoView === null) {
            panoView = new window.com.vizengine.view.PanoView()
          }
          let View = window.com.appengine.view.View
          panoView.setMouseWheelEnable(false)
          panoView.panoViewInternal.setAutoplayEnable(self.playFlag)
          panoView.setPanoId(panoID, function () {
            self.loading = false
          })
          panoView.setKeyEnable(false)
          panoView._nativeView.div.style.position = 'absolute'
          panoView.setAdaptor({
            getView: function (index) {
              var cell = View.parse({
                width: 'wrap',
                height: 'wrap',
                layout: 'vertical',
                panoHeading: self.markList[index].panoHeading,
                panoPitch: self.markList[index].panoPitch,
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
                      src: '/static/marker-bg.png',
                      paddingLeft: '10dp',
                      paddingRight: '10dp',
                      paddingTop: '3dp'
                    }, {
                      type: 'TextView',
                      text: self.cutText(self.markList[index].name),
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
                    src: '/static/marker-bg-stick.png',
                    gravity: 'centerHorizontal'
                  }]
              })
              cell._nativeView.div.type = self.markList[index].directionType
              cell._nativeView.div.zIndex = 100
              cell._nativeView.div.style.cursor = 'pointer'
              cell._nativeView.div.addEventListener('click', function () {
                if (this.type === 'E') {
                  self.$emit('eastclick')
                } else if (this.type === 'N') {
                  self.$emit('northclick')
                } else if (this.type === 'S') {
                  self.$emit('southclick')
                } else if (this.type === 'W') {
                  self.$emit('westclick')
                }
              })
              if (cell) {
                return cell
              } else {
                return null
              }
            },
            getCount: function () {
              return self.markList.length
            }
          })
          return panoView
        })
      }
    }
  }

</script>
<style scoped lang="scss" rel="stylesheet/scss">


  #allContainer {
    position: relative;
    width: 95%;
    margin: 0 auto;
    margin-top: 18px;
    height: 371.42px;
    background: #000000;
  }

  #container {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #FFFFFF;
  }

  #container-empty {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .location-icon {
      width: 40px;
    }
    .text-empty {
      margin-top: 10px;
      font-size: 17px;
      color: #dedede;
    }
  }

  .icon-direction {
    position: absolute;
    right: 0px;
    bottom: 0px;
  }

  #loading-layout {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #FFFFFF;
  }

</style>
