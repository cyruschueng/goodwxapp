<template>
  <div class="chart-board-1">
    <div class="first-part">
      <div>
        <span>流量数据详情</span>
        <el-button type="primary" plain class="download-button">下载</el-button>
      </div>
        <el-table
          ref="multipleTable"
          :data="tableData3"
          tooltip-effect="dark"
          style="width: 100%"
          max-height="300"
          highlight-current-row
          @current-change="handleCurrentChange">
          <el-table-column
            label="网格号"
            prop="gridCode">
          </el-table-column>
          <el-table-column
            prop="skyCount"
            label="空中全景"
            width="180">
          </el-table-column>
          <el-table-column
            prop="pv"
            label="当日浏览量PV"
            >
          </el-table-column>
          <el-table-column
            prop="uv"
            label="当日独立访客UV"
            >
          </el-table-column>
          <el-table-column
            prop="vv"
            label="当日访问次数W"
            >
          </el-table-column>
          <el-table-column
            prop="totalPv"

            label="累计浏览量PV">
          </el-table-column>
          <el-table-column
            prop="totalUv"

            label="累计独立访客UV">
          </el-table-column>
          <el-table-column
            prop="totalVv"

            label="累计访问次数W">
          </el-table-column>
        </el-table>
    </div>
    <div id="myChartsPano"></div>
  </div>
</template>
<script>
  export default {
    computed: {},
    watch: {},
    mounted () {
    },
    created () {
      console.log('sdfsdfsdfe:' + this.tableData3)
    },
    methods: {
      toggleSelection  (rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      }
    },
    props: {
      tableData3: null
    },
    data () {
      return {
        multipleSelection: []
      }
    },
    components: {}
  }
</script>
<style lang="scss">
  .el-table td{
    background: #ffffff;
  }
  .chart-board-1 {
    width: 100%;
    background: #fff;
    margin-top:20px;
    margin-right: 20px;
    margin-left: 20px;
    box-shadow: 0px 0px 10px 1px #d3d3d3;
    .first-part {
      height: 13%;
      text-align: left;
      margin-top: 20px;
      padding-left: 20px;
      span {
        font-size: 18px;
      }
      .download-button {
        position: absolute;
        right: 0px;
        margin-right: 80px;
        text-align: center;
        padding-left:10px;
        padding-right:10px;
        padding-top: 4px;
        padding-bottom: 4px;
        span {
          font-size: 14px;
        }
      }
    }
  }
</style>
