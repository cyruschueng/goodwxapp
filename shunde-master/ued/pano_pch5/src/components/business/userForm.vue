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
            label="用户名"
            prop="userName">
          </el-table-column>
          <el-table-column
            prop="userId"
            label="用户ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="totalViewStat"
            label="总浏览">
          </el-table-column>
          <el-table-column
            prop="totalLoginStat"
            label="总登陆"
            >
          </el-table-column>
          <el-table-column
            prop="totalDeployStat"
            label="总发布"
            >
          </el-table-column>
          <el-table-column
            prop="deptName"
            label="部门名字"
            >
          </el-table-column>
          <el-table-column
            prop="viewStat"

            label="当日浏览">
          </el-table-column>
          <el-table-column
            prop="loginStat"

            label="当日登录">
          </el-table-column>
          <el-table-column
            prop="deployStat"

            label="当日发布">
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
