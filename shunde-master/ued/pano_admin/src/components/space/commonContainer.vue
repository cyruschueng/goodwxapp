<template>
  <div id="space-cell" :style="spaceStyle">
    <div class="grid-content">
      <div id="left" :style="leftStyle">
        <div id="left-head">
          <el-select v-model="leftSelecter.selected" :placeholder="leftSelecter.selectPlaceHolder" size="mini"
                     class="selecter" @change="change" v-if="showSelect">
            <el-option
              v-for="option in leftSelecter.options"
              :label="option.name"
              :value="option.code">
            </el-option>
          </el-select>
          <div>
            <input type="checkbox" id="checkbox" v-model="showCell">
            <label for="checkbox">显示网格号</label>
          </div>
        </div>
        <div class="line"></div>
        <map-view :show-grid-number="showCell"
                  :exception-text="exceptionText"
                  :exceptionIsSelected="exceptionIsSelected"
                  v-model="cellNumber"
                  @cell-click="cc"
                  @exceptionClick="exceptionClick"
                  :highLightImg="highLightImg"></map-view>
      </div>
    </div>
    <div id="right">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import mapView from './map.vue'
  export default {
    components: {
      mapView
    },
    created () {
//      console.log(this.$router.history.current.path)
    },
    props: {
      showSelect: {
        type: Boolean,
        default: false
      },
      options: {
        type: Array
      },
      selected: {
        type: String
      },
      leftSelecter: {
        type: Object
      },
      gap: {
        type: String,
        default: '40px'
      },
      bgColor: {
        type: String,
        default: '#f0f0f0'
      },
      openShadow: {
        type: Boolean,
        default: true
      },
      exceptionText: {
        type: Number,
        default: 0
      },
      exceptionIsSelected: {
        type: Boolean,
        default: false
      },
      gridCode: {
        type: String,
        default: ''
      },
      highLightImg: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        showCell: true,
        cellNumber: this.gridCode,
        popup: {
          godownentry: false
        }
      }
    },
    watch: {
      cellNumber (val) {
        console.log('watch: ' + val)
      },
      gridCode (value) {
        this.cellNumber = value
      }

    },
    computed: {
      leftStyle () {
        let obj = {
          marginRight: this.gap
        }
        if (this.openShadow) {
          this.$set(obj, 'boxShadow', '0px 6px 12px 0 rgba(4, 0, 0, 0.06)')
          this.$set(obj, 'border', '1px solid rgba(0,0,0,0.06)')
        }
        return obj
      },
      spaceStyle () {
        return {
          background: this.bgColor
        }
      }
    },
    methods: {
      exceptionClick (exceptionSelected) {
        this.$emit('exceptionClick', exceptionSelected)
      },
      cc (row, col, value, leftTopPoint, rightBottomPoint, isSelected) {
        this.$emit('cell-click', row, col, value, leftTopPoint, rightBottomPoint, isSelected)
      },
      change (v) {
        this.$emit('left-select-change', v)
      }
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../style/space";

  #space-cell {
    flex: 0 0 auto;
    height: auto;
    width: 1200px;
    margin: 30px auto;
    display: flex;
    .grid-content{
      text-align: center;
    }

    #left {
      flex: 0 0 auto;
      width: 452px;
      padding-bottom: 10px;
      align-self: flex-start;
      /*padding: 0 10px 10px 10px;*/
      border-radius: 3px;
      background-color: #ffffff;
      /*box-shadow: 0px 6px 12px 0 rgba(4, 0, 0, 0.06);*/
      display: flex;
      flex-direction: column;
    }
    #right {
      flex: 1 0 0;
    }
    #left-head {
      height: $head-height;
      flex: 0 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 25px;
      .selecter {
        width: 150px;
      }
      label {
        font-size: 12px;
        font-weight: 300;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: 0.3px;
        text-align: left;
        color: #9b9b9b;
      }
    }
  }


</style>
