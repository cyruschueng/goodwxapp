<template>
  <div class="real-map-container">
    <div class="map-head" :style="mapHeadStyle" v-if="showHead">{{selectedCell}}</div>
    <div id="map-container" :style="mapContainerStyle">
      <div id="left-grid-number" class="grid-number" :style="leftGridNumberStyle" v-if="showGridNumber">
        <div class="left-cell-number" v-for="leftcell in leftcells"
             :style="leftCellNumberStyle">{{leftcell}}
        </div>
      </div>
      <div id="map" :style="mapStyle">
        <img :src="highLightImgSrc" class="high-light-img" v-if="showHighLightArea">
        <btn :class="['exception',{'selected-exception':eis}]" :text="extext" @click="exceptionClick"
             v-if="exceptionText>0"></btn>
        <div id="grid">
          <div class="row" v-for="row in rows" :key="row.id" :style="rowStyle">
            <div :class="[mapCellClass, {'selected-cell': col.selected}]"
                 v-for="col in row.cols" :key="col.id"
                 @click="c(row.id,col.id)" :style="mapCellStyle">
              <div v-if="col.selected" class="sc"></div>
            </div>
          </div>
        </div>
        <div class="map-bg" v-show="!clickEnable"></div>
      </div>
      <div id="bottom-grid-number" class="grid-number" :style="bottomGridNumberStyle" v-if="showGridNumber">
        <div class="bottom-cell-number" v-for="bottomcell in bottomcells"
             :style="bottomCellNumberStyle">{{bottomcell}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import btn from '../btn.vue'
  export default {
    created () {
      this.selectedNumber = this.cellNumber
    },
    watch: {
      value (v) {
        this.selectedCell = v
      },
      selectedCell (v) {
        this.$emit('input', v)
      },
      exceptionIsSelected (val) {
        this.eis = val
      }
    },
    components: {btn},
    props: {
      clickEnable: {
        type: Boolean,
        default: true
      },
      showGridNumber: {
        type: Boolean,
        default: false
      },
      exceptionText: {
        type: Number,
        default: 0
      },
      size: {
        type: String,
        default: 'large',
        validator (value) {
          return value === 'large' || value === 'small' || value === 'tiny'
        }
      },
      showHead: {
        type: Boolean,
        default: false
      },
      value: { // 网格号，例如：A1
        type: String,
        default: ''
      },
      exceptionIsSelected: {
        type: Boolean,
        default: false
      },
      highLightImg: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        mapCellClass: 'map-cell',
        hCellNum: 14,
        vCellNum: 13,
        gap: 25,
        leftTopPoint: {
          lat: 23.016129, // 纬度 表示南北
          lng: 112.998199 // 经度 表示东西
        },
        rightBottomPoint: {
          lat: 22.666066,
          lng: 113.409655
        },
        baseHighLightImgSrc: 'static/space/img/',
        eis: this.exceptionIsSelected,
        selectedCell: this.value
      }
    },
    computed: {
      showHighLightArea () {
        return !this.$utils.isEmpty(this.highLightImg)
      },
      highLightImgSrc () {
        return this.baseHighLightImgSrc + this.highLightImg
      },
      selectedCol () { // 从左到右，由0开始
        if (this.$utils.isEmpty(this.selectedCell)) {
          return -1
        }
        return parseInt(this.selectedCell.slice(0, 1), 32) - 10
      },
      selectedRow () {
        if (this.$utils.isEmpty(this.selectedCell)) {
          return -1
        }
        return parseInt(this.selectedCell.slice(1)) - 1
      },
      isSelected () {
//        return this.selectedRow !== -1 && this.selectedCol !== -1
        return !this.$utils.isEmpty(this.selectedCell)
      },
      rows () {
        let result = []
        for (let i = 0; i < this.vCellNum; i++) {
          let row = {
            id: i,
            cols: []
          }
          for (let j = 0; j < this.hCellNum; j++) {
            let col = {
              id: j,
              seleted: false
            }
            row.cols.push(col)
          }
          result.push(row)
        }
        if (this.isSelected) {
          result[this.selectedRow].cols[this.selectedCol].selected = true
        }
        return result
      },
      cellLat () {
        return (this.rightBottomPoint.lat - this.leftTopPoint.lat) / this.vCellNum
      },
      cellLng () {
        return (this.rightBottomPoint.lng - this.leftTopPoint.lng) / this.hCellNum
      },
      extext () {
        return '异常点' + this.exceptionText + '个'
      },
      bl () {
        return this.vCellNum / this.hCellNum
      },
      leftcells () {
        let arr = []
        for (let i = 1; i <= this.vCellNum; i++) {
          arr.push(i)
        }
        return arr
      },
      bottomcells () {
        let arr = []
        for (let i = 1; i <= this.hCellNum; i++) {
          arr.push((i + 9).toString(32).toUpperCase())
        }
        return arr
      },
      width () {
        if (this.size === 'large') {
          return 400
        } else if (this.size === 'small') {
          return 280
        } else {
          return 190
        }
      },
      height () {
        return this.bl * this.width
      },
      cellWidth () {
        return this.width / this.hCellNum
      },
      mapContainerStyle () {
        return {
          width: (this.width + this.gap) + 'px',
          height: (this.height + this.gap) + 'px'
        }
      },
      leftGridNumberStyle () {
        return {
          width: this.gap + 'px',
          height: this.height + 'px'
        }
      },
      leftCellNumberStyle () {
        return {
          width: this.gap + 'px',
          height: this.cellWidth + 'px',
          lineHeight: this.cellWidth + 'px'
        }
      },
      bottomGridNumberStyle () {
        return {
          width: this.width + 'px',
          height: this.gap + 'px',
          marginLeft: this.gap + 'px'
        }
      },
      bottomCellNumberStyle () {
        return {
          width: this.cellWidth + 'px',
          height: this.gap + 'px'
        }
      },
      mapStyle () {
        return {
          width: this.width + 'px',
          height: this.height + 'px',
          position: 'relative',
          border: '1px solid #50B1E2'
        }
      },
      rowStyle () {
        return {
          height: this.cellWidth + 'px'
        }
      },
      mapCellStyle () {
        return {
          width: (this.cellWidth - 1) + 'px',
          height: (this.cellWidth - 1) + 'px'
        }
      },
      mapHeadStyle () {
        return {
          marginLeft: this.showGridNumber ? this.gap + 'px' : '0px',
          width: this.width + 'px'
        }
      }
    },
    methods: {
      getValue (row, col) {
        let colChar = (col + 10).toString(32).toUpperCase()
        let rowChar = row + 1
        return colChar + rowChar
      },
      c (row, col) {
        if (!this.clickEnable) {
          return
        }
        let lastRow = this.selectedRow
        let lastCol = this.selectedCol
        this.selectedCell = '' // 设置value为空
        if (row !== lastRow || col !== lastCol) { // 如果点击的网格和选中格不一致，将本次点击的网格设置为新的选中格
          this.selectedCell = this.getValue(row, col)
        }
        let leftTopPoint = {
          lat: this.leftTopPoint.lat + this.cellLat * row,
          lng: this.leftTopPoint.lng + this.cellLng * col
        }
        let rightBottomPoint = {
          lat: leftTopPoint.lat + this.cellLat,
          lng: leftTopPoint.lng + this.cellLng
        }
        this.$emit('cell-click', row, col, this.selectedCell, leftTopPoint, rightBottomPoint, this.isSelected)
      },
      exceptionClick () {
        this.eis = !this.eis
        this.$emit('exceptionClick', this.eis)
      }
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  $true-width: 588px;
  $true-height: 546px;
  .real-map-container {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    .map-head {
      height: 40px;
      border: 1px solid #e5e5e5;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      color: #888;
    }
    #map-container {
      flex: 0 0 auto;
      display: flex;
      flex-wrap: wrap;
      .grid-number {
        flex: 0 0 auto;
        text-align: center;
        color: #d3d3d3;
        font-size: 12px;
        display: flex;
      }
      #left-grid-number {
        flex-direction: column;
        .left-cell-number {
          flex: 0 0 auto;
        }
      }
      #bottom-grid-number {
        .bottom-cell-number {
          flex: 0 0 auto;
        }
      }
      #map {
        flex: 0 0 auto;
        background: url("../../assets/map.jpg") no-repeat;
        background-size: cover;
        position: relative;
        .high-light-img {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .exception {
          width: 95px;
          height: 26px;
          background: #fff;
          position: absolute;
          font-size: 13px;
          letter-spacing: .5px;
          color: #ef4b4a;
          top: 5px;
          right: 5px;
          border-radius: 2px;
          z-index: 10;
        }
        .selected-exception {
          background: #ef4b4a;
          color: #fff;
        }
        .map-bg {
          background: rgba(0, 0, 0, 0.3);
          position: absolute;
          width: 100%;
          height: 100%;
        }
        #grid {
          position: absolute;
        }
        .row {
          display: flex;
          .map-cell {
            box-sizing: content-box;
            $border: 1px solid rgba(255, 255, 255, 0.4);
            border-right: $border;
            border-bottom: $border;
            background: rgba(0, 0, 0, 0.11);
          }
          .map-cell:nth-last-of-type(1) {
            border-right: none;
          }
          .selected-cell {
            background: rgba(0, 0, 0, 0) !important;
            border-color: rgba(255, 255, 255, 0);
          }
          .sc {
            border: 1px solid orange;
            box-shadow: 2px 2px 8px 2px rgba(255, 153, 0, .5), -2px -2px 8px 2px rgba(255, 153, 0, .5);
            height: 100%;
          }
        }

      }

    }
  }


</style>
