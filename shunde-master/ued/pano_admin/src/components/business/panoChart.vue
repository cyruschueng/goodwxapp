<template>
  <div class="chart-board">
    <div class="first-part">
      <span>流量趋势图</span>
      <el-select id="timeFilter" v-model="value" placeholder="近7天" @change="selectorChange">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker :picker-options="endDateOpt" class="date-picker" v-model="value1" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" type="daterange" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期" @change="dateChange" />
    </div>
    <div id="myChartsPano"></div>
  </div>
</template>
<script>
  let echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/line')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/toolbox')
  require('echarts/lib/component/legend')
  require('echarts/lib/component/markLine')
  export default {
    computed: {},
    props: {
      list: null,
      x_content: null
    },
    mounted () {
      this.$nextTick(function () {
        this.drawLine()
      })
    },
    created () {
    },
    methods: {
      selectorChange (value) {
        this.$emit('dropChange', value)
      },
      drawLine () {
        var charts
        charts = echarts.init(document.getElementById('myChartsPano'))
        charts.setOption(this.option)
      },
      dateChange () {
        if (this.value1 === null) {
          this.$emit('dateChange', ['', ''])
        } else {
          this.$emit('dateChange', this.value1)
        }
      }
    },
    watch: {
      x_content () {
        this.option.xAxis[0].data = this.x_content
        this.$nextTick(function () {
          this.drawLine()
        })
      },
      list () {
        this.option.series = this.list
        this.$nextTick(function () {
          this.drawLine()
        })
      }
    },
    data () {
      return {
        endDate: null,
        endDateOpt: {
          disabledDate: (time) => {
            return time.getTime() > new Date(this.$utils.format(new Date(), 'yyyy-MM-dd').split('-').join(','))
          }
        },
        value1: '',
        options: [{
          value: '1',
          label: '近7天'
        }, {
          value: '2',
          label: '近30天'
        }, {
          value: '3',
          label: '近90天'
        }, {
          value: '4',
          label: '近1年'
        }],
        value: '',
        option: {
          title: {
            text: '堆叠区域图'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: ['浏览量（PV）', '独立访客（UV）', '访问次数（VV）']
          },
          toolbox: {
            feature: {
            }
          },
          color: ['#00ff00', '#0000ff', '#ff0000', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: this.x_content
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: this.list
        }
      }
    },
    components: {echarts}
  }
</script>
<style lang="scss">
  .chart-board {
    width: 100%;
    height: 350px;
    background: #fff;
    margin-left: 20px;
    margin-right: 20px;
    box-shadow: 0px 0px 10px 1px #d3d3d3;
    #myChartsPano {
      height: 85%;
      padding-right: 20px;
    }
    .el-select {
      width: 200px;
      height: 80%;
      margin-top: 10px;
    }
    .first-part {
      height: 13%;
      text-align: left;
      padding-left: 20px;
      span {
        font-size: 18px;
        margin-right: 100px;
      }
      .el-date-editor{
        margin-left:20px;
        height: 28px;
        width: 500px;
        border-width: 0px;
        .el-range-separator {
          font-size: 10px;
          margin-right: 10px;
          margin-left: 10px;
        }
        .el-range-input{
          width: 150px;
          height: 30px;
        }
      }
      input{
        border:1px solid #9b9b9b;
        flex:1;
      }
    }
    .el-input--suffix .el-input__inner {
      padding-right: 30px;
      height: 30px;
    }
  }
</style>
