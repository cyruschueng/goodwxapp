<template>
  <div id="roamContainer">
    <common-container :selected="selected" bgColor="#fff" :open-shadow="isShadow" :gridCode="gridCode"
                      :left-selecter="leftSelecter" gap="0px" @cell-click="clickLabel">
      <div id="new-roam">
        <pano-bar id="barContainer" :panoId="panoId" :gridCode="gridCode" :isEmpty="isEmpty" :leftCode="leftCode"
                  :rightCode="rightCode" @pbclick="pbc"
                  @vrclick="vrc" @changeRoadClick="changeRoad">
        </pano-bar>
        <div id="line"></div>
        <pano-view :play-flag="playFlag" :initPanoEnable="initFlag" :vr-flag="vrFlag" :isEmpty="isEmpty"
                   :panoId="panoId" @northclick="northClick"
                   @westclick="westClick" @eastclick="eastClick" @southclick="southClick"
                   :markList="markerList"></pano-view>
        <form-view v-show="isShowForm" :contents="array" :isShowBottom="isShowFormBottom"
                   @watchpano="watchPanoView" @addformclick="addFormClick" @resort="reSort"></form-view>
      </div>
    </common-container>
    <div id="dialog" v-show="false"></div>
  </div>
</template>
<script>
  import commonContainer from './commonContainer.vue'
  import formView from './form.vue'
  import panoView from './panoView.vue'
  import panoBar from './panoBar.vue'

  export default {
    components: {
      commonContainer,
      panoView,
      panoBar,
      formView
    },
    data () {
      return {
        leftSelecter: {
          selected: '',
          options: [
            {label: '乐从', value: '100'}
          ],
          selectPlaceHolder: '行政区域'
        },
        selected: 'all',
        isShadow: false,
        isEmpty: true,
        isShowForm: false,
        isShowFormBottom: false,
        playFlag: false,
        panoId: '',
        vrFlag: false,
        array: [],
        gridCode: '',
        leftCode: -1,
        rightCode: -1,
        markerList: [],
        initFlag: false,
        firstPanoId: '',
        mainMarkerList: []
      }
    },
    mounted () {
      if (this.$route.params && this.$route.params.gridCode) {
        this.gridCode = this.$route.params.gridCode
        this.panoId = this.$route.params.panoId
        this.leftCode = this.$route.params.leftCode
        this.rightCode = this.$route.params.rightCode
        this.getPoiData(this.gridCode)
      }
    },
    methods: {
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
      pbc () {
        this.playFlag = !this.playFlag
      },
      vrc () {
        this.vrFlag = !this.vrFlag
        this.playFlag = false
      },
      copy (src) {
        var dst = []
        for (var prop in src) {
          if (src.hasOwnProperty(prop)) {
            dst[prop] = src[prop]
          }
        }
        return dst
      },
      watchPanoView (index) {
        this.panoId = this.array[index].panoInfo.panoId
        this.initFlag = false
        let self = this
        if (this.firstPanoId === this.panoId) {
          this.markerList = this.copy(this.mainMarkerList)
        } else {
          this.markerList = []
        }
        setTimeout(function () {
          self.initFlag = true
        })
      },
      addFormClick () {
        this.array.push({a: 1})
        if (this.array.length > 0) {
          this.isShowFormBottom = true
        }
      },
      changeRoad () {
        this.isShowForm = true
        if (this.array.length > 0) {
          this.isShowFormBottom = true
        }
      },
      reSort (poiIds) {
        this.$api.poiListSort({
          gridCode: this.gridCode,
          poiIds: poiIds
        }).then(res => {
          if (res.code === 0) {
            this.$message.success('修改成功')
            this.getPoiData(this.gridCode, 1)
          } else {
            this.$message.error(res.msg)
          }
        }).catch(res => {
          this.$message.error(res.msg)
        })
      },
      clickLabel (left, right, ll, position) {
        if (ll === '') {
          return
        }
        this.leftCode = left + 1
        this.rightCode = right
        this.gridCode = ll
        this.getPoiData(this.gridCode)
      },
      getPoiData (ll, type) {
        this.initFlag = false
        this.markerList = []
        let self = this
        this.$api.getPoiList({
          gridCode: ll
        }).then(res => {
          if (res.code === 0) {
            if (res.data && res.data.length > 0) {
              if (type === 1) {
                this.isShowForm = true
              } else {
                this.isShowForm = false
              }
              this.isEmpty = false
              this.array = res.data
              this.panoId = res.data[0].panoInfo.panoId
              this.firstPanoId = res.data[0].panoInfo.panoId
              self.$api.getMarkerList({
                gridCode: ll
              }).then(res => {
                if (res.code === 0) {
                  if (res.data) {
                    let eData = res.data.E
                    eData.directionType = 'E'
                    eData.panoHeading = '17.569941'
                    eData.panoPitch = '9.445731'
                    self.markerList.push(eData)
                    let sData = res.data.S
                    sData.panoHeading = '-23.035397'
                    sData.panoPitch = '22.712752'
                    sData.directionType = 'S'
                    self.markerList.push(sData)
                    let nData = res.data.N
                    nData.directionType = 'N'
                    nData.panoHeading = '-15.666353'
                    nData.panoPitch = '-1.509240'
                    self.markerList.push(nData)
                    let wData = res.data.W
                    wData.panoHeading = '-44.860967'
                    wData.panoPitch = '7.0417632'
                    wData.directionType = 'W'
                    self.markerList.push(wData)
                    self.mainMarkerList = this.copy(self.markerList)
                  }
                } else {
                  self.markerList = []
                }
                this.initFlag = true
              }).catch(e => {
                self.markerList = []
                this.initFlag = true
              })
            } else {
              this.isShowForm = false
              this.isEmpty = true
              this.array = []
              this.$message('该网格没数据')
            }
          } else {
            this.isShowForm = false
            this.$message.error(res.msg)
            this.isEmpty = true
            this.$message.error('请求数据失败')
            this.array = []
          }
        }).catch(res => {
          this.isShowForm = false
          this.isEmpty = true
          this.array = []
          this.$message.error('请求数据失败')
        })
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../style/space";

  #roamContainer {
    position: relative;
  }

  #dialog {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  #new-roam {
    display: flex;
    background: #FFFFFF;
    height: 100%;
    flex-direction: column;
  }

  #barContainer {
    flex: 0 0 auto;
    height: 50px;
  }

  #line {
    width: 100%;
    height: 1px;
    background: #dedede;
  }

  #panoContainer {
    flex: 0 0 auto;
  }
</style>
