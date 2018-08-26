<template>
  <section class="shot-container">
    <header>
      <div>
        <div class="center">
          <div class="inputBox">
            <input :placeholder="config.header.search.placeholder" v-model='searchWord' @keyup.enter.stop="reStartSearch"/>
          </div>
        </div>
        <div class="right" @click.stop="showAddNewTask" >
          <bordertext id="rightText" :text="config.header.btnText" />
        </div>
      </div>
    </header>
    <div class="body">
      <div class="tHeader">
        <div class="left">
          <el-select v-model="param.orderBy" placeholder="请选择" size="small" class="el-select">
            <el-option
              v-for="item in config.select.time"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="param.status" placeholder="请选择" size="small" class="el-select">
            <el-option
              v-for="item in config.select.status"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="right">
          <el-checkbox v-model="checked" class="el-checkbox">全选</el-checkbox>
          <btn text="打印需求" class="btn"></btn>
        </div>
      </div>
      <div class="tBody">
        <div class="tBodyContainer">
          <div class="shot-item" v-for="(item,index) in data">
            <div class="top">
              <h1>{{item.shotName}}</h1>
              <img src="static/watch.png" alt="" style="width: 24px;height: 24px;" @click="item.status==1?item.deal=!item.deal:item.deal=false">
            </div>
            <h2>网格号-{{item.gird}}</h2>
            <h3>发布者 {{item.createUserName}}</h3>
            <div class="bottom">
              <h3>{{$utils.format(new Date(item.createTime),'yyyy-MM-dd hh:mm:ss')}}</h3>
              <btn class="badge dealing" text="处理中" v-if="item.status==1"></btn>
              <btn class="badge done" text="已完成" v-if="item.status==2"></btn>
              <btn class="badge refused" text="已拒绝" v-if="item.status==3"></btn>
            </div>
            <!---->
            <div class="shot-item" style="position: absolute;box-shadow: 7px 7px 8px 0px #ddd;z-index: 1000;top: 0px;left: 0px;width: 100%;height: 250px;" v-if="item.deal">
              <div class="top">
                <h1>{{item.shotName}}</h1>
                <img src="static/watch.png" alt="" style="width: 24px;height: 24px;" @click="item.deal=!item.deal">
              </div>
              <h2>网格号-{{item.gird}}</h2>
              <h3>发布者 {{item.createUserName}}</h3>
              <div class="bottom" style="border-bottom: 1px solid #ddd;">
                <h3>{{$utils.format(new Date(item.createTime),'yyyy-MM-dd hh:mm:ss')}}</h3>
              </div>
              <div class="form">
                <h2 class="form-item">单号：{{item.orderNo}}</h2>
                <h2 style="color: #1ab0e7;font-size: 12px;margin: 0;">【待处理】</h2>
              </div>
              <div class="form">
                <h2 class="form-item">属地：{{item.provinceName+item.cityName+item.countyName+item.areaName}}</h2>
              </div>
              <div class="form">
                <h2 class="form-item">期望完成日期：{{$utils.format(new Date(item.expectDate),'yyyy-MM-dd hh:mm:ss')}}</h2>
              </div>
              <div class="form" style="margin-top: 12px;">
                <btn text="已拒绝" class="form-btn" @click="updateShotStatus(item.orderNo,3,index)"></btn>
                <btn text="已完成" class="form-btn" @click="updateShotStatus(item.orderNo,2,index)"></btn>
              </div>
            </div>
          </div>
        </div>
        <el-pagination
          :current-page.sync="param.pageNo"
          class="pagination"
          v-if="pageTotal>0"
          :page-size="param.pageSize"
          background
          layout="prev, pager, next"
          :total="pageTotal">
        </el-pagination>
      </div>

    </div>
  </section>
</template>
<script>
import { config } from './config'
import bordertext from '../../components/common/bordertext'
import btn from '../../components/btn'
export default {
  name: 'component-shot',
  components: {
    bordertext,
    btn
  },
  data () {
    return {
      config: config,
      searchWord: '',
      timeselect: config.select.time[0].value,
      statusselect: config.select.status[0].value,
      checked: false,
      pageTotal: 0,
      param: {
        pageNo: 1,
//        pageSize: this.$store.state.config.pageSize,
        pageSize: 1,
        status: '0',
        orderBy: '0',
        taskName: ''
      },
      data: null
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    fetch () {
      this.$api.getShotTaskList(this.param).then(res => {
        console.log('-shotTast--')
        this.pageTotal = res.data.total
        for (let i = 0; i < res.data.list.length; i++) {
          let item = res.data.list[i]
          item.deal = false
          item.check = false
          res.data.list[i] = item
        }
        this.data = res.data.list
        console.log(res)
      }).catch(e => {
      })
    },
    updateShotStatus (orderNo, status, index) {
      console.log('uss')
      console.log(index)
      let params = {
        orderNo: orderNo,
        status: status
      }
      this.$api.updateShotStatus(params).then(res => {
        if (res.code === 0) {
          this.$message({
            showClose: true,
            message: '状态修改成功',
            type: 'success'
          })
          if (this.param.status === '0' || this.param.status === status) {
            this.data[index].deal = false
            this.data[index].status = status
          } else {
            this.data.splice(index, 1)
          }
        }
      }).catch(e => {
      })
    },
    reStartSearch () {
    }
  },
  computed: {
    example () {
    }
  },
  watch: {
    param: {
      deep: true,
      handler (newVal, oldVal) {
        console.log('watch deep')
        this.fetch()
      }
    }
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  $margin: 24px;
  .shot-container {
    position: relative;
    font-size: 13px;
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    input{
      border: none;
      outline: none;
    }
    header{
      margin:0 $margin;
      padding:20px 0px;
      border-bottom:1px solid #dedede;
      >div{
        display: flex;
        flex-wrap: nowrap;
        height:24px;
      }
      .center{
        flex:1;
        display:flex;
        flex-wrap:nowrap;
        justify-content: center;
        .inputBox{
          width:240px;
          border:1px solid #9b9b9b;
          border-radius:2px;
          overflow: hidden;
          display:flex;
          flex-wrap:nowrap;
          flex-flow:row;
        }
        input{
          margin-left:10px;
          flex:1;
        }
      }
    }
    .body{
      flex: 1;
      display: flex;
      flex-flow: column nowrap;
    }
    .tHeader{
      margin:8px $margin;
      display: flex;
      flex-flow:row nowrap;
      align-items: center;
      justify-content: space-between;
      .el-select{
        width: 150px;
        margin-right: 10px;
      }
      .right{
        display: flex;
        align-items: center;
      }
      .el-checkbox{
        margin-right: 10px;
      }
      .btn{
        border: 1px solid #1ab0e7;
        color: #1ab0e7;
        border-radius: 4px;
        padding: 2px;
      }
    }
    .tBody{
      background: #f0f0f0;
      flex: 1;
      display: flex;
      flex-flow: column nowrap;
      .tBodyContainer{
        padding: 20px 0 1px;
        flex: 1;
        margin:0 $margin;
        display: flex;
        .shot-item{
          position: relative;
          align-self: flex-start;
          width: 310px;
          padding: 18px;
          background: #fff;
          transition: box-shadow .4s;
          margin-right: 20px;
          margin-bottom: 20px;
          h1{
            font-size: 18px;
          }
          h2{
            color: #444;
            font-size: 15px;
            margin-bottom: 15px;
          }
          .form{
            display: flex;
            justify-content: space-between;
            margin: 3px 0;
          }
          .form-item{
            font-size: 12px!important;
            margin: 0!important;
          }
          .form-btn{
            width: 100px;
            height: 30px;
            background: #1ab0e7;
            color: #fff;
            border-radius: 3px;
          }
          h3{
            color: #888;
            font-size: 13px;
            margin-bottom: 5px;
          }
          .top,.bottom{
            display: flex;
            justify-content: space-between;
          }
          .top{
            margin-bottom: 15px;
          }
          .badge{
            padding: 1px 5px;
            font-weight: 300;
            font-size: 9px;
            border-radius: 12px;
          }
          .dealing{
            color: #fff;
            background: #1ab0e7;
          }
          .done{
            color: #fff;
            background: #9fd46a;
          }
          .refused{
            color: red;
            border: 1px solid red;
          }
        }
        .shot-item:hover{
          cursor: pointer;
          box-shadow: 2px 2px 5px 0px #ddd;
        }

      }
    }
  }

</style>
