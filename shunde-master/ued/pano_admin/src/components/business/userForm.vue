<template>
  <div class="chart-board-1">
    <div class="first-part">
      <div style="justify-content: space-between;display: flex;margin-bottom: 20px">
        <span>流量数据详情</span>
        <div style="margin-right: 40px">
          <el-select class="form-filter" v-model="value" placeholder="排序" @change="selectorChange">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" @click="downloadItem('')" plain class="download-button">全部下载</el-button>
        </div>
      </div>
        <el-table
          id="userTable"
          border
          ref="multipleTable"
          :data="tableData3"
          tooltip-effect="dark"
          style="width: 100%;font-size: 10px"
          highlight-current-row
          @current-change="handleCurrentChange">
          <el-table-column
            label="用户名"
            prop="userName">
          </el-table-column>
          <el-table-column
            prop="deptName"
            label="单位"
          >
          </el-table-column>
          <el-table-column
            prop="userId"
            label="用户ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="totalViewStat"
            label="累计浏览">
          </el-table-column>
          <el-table-column
            prop="totalLoginStat"
            label="累计登陆"
            >
          </el-table-column>
          <el-table-column
            prop="totalDeployStat"
            label="累计发布"
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
          <el-table-column label="操作">
            <template slot-scope="scope">
              <i class="el-icon-download myDown"
                 size="mini"
                 @click="handleEdit(scope.$index, scope.row)"></i>
            </template>
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
    },
    methods: {
      handleEdit (s1, s2) {
        this.downloadItem(s2)
      },
      downloadItem (item) {
        let href = this.$api.getBase() + 'stat/exportUserStat'
        if (item === '') {
          window.location.href = href
        } else {
          window.location.href = href + '?userId' + item.userId
        }
      },
      selectorChange (value) {
        this.$emit('dropChange', value)
      },
      handleCurrentChange (val) {
        this.$emit('change', val)
      },
      toggleSelection (rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange (val) {
        this.$emit('change', val)
      }
    },
    props: {
      tableData3: null
    },
    data () {
      return {
        value: '',
        options: [{
          value: '1',
          label: '总浏览量'
        }, {
          value: '2',
          label: '总独立访客'
        }, {
          value: '3',
          label: '总访问次数'
        }, {
          value: '4',
          label: '当日浏览量'
        }, {
          value: '5',
          label: '当日独立访客'
        }, {
          value: '6',
          label: '当日访问次数'
        }],
        multipleSelection: []
      }
    },
    components: {}
  }
</script>
<style lang="scss">
  $colord3: #d3d3d3;
  $color6f: #6f6f6f;
  $color1b: #1bb1e6;
  #userTable{
    td{
      height: 47px;
      padding: 0px;
    }
  }

  .form-filter {
    height: 25px;
    width: 150px;
    float: left;
    input {
      height: 25px;
      font-size: 12px;
    }
  }
  .myDown{
    right: 10px;
    font-size: 20px;
    color: #808080;
    &:hover{
      color: #4DB0E2;
    }
  }
  .el-table__body{
    text-align: center;
  }
  .chart-board-1 {
    width: 100%;
    background: #fff;
    margin-top: 20px;
    margin-right: 20px;
    margin-left: 20px;
    box-shadow: 0px 0px 10px 1px #d3d3d3;
    .first-part {
      text-align: left;
      margin-top: 20px;
      padding-left: 20px;
      span {
        font-size: 18px;
      }
      .download-button {
        text-align: center;
        float: left;
        margin-left: 40px;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 4px;
        padding-bottom: 4px;
        span {
          font-size: 14px;
        }
      }
    }
  }
</style>
