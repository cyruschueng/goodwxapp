<template>
  <my-dialog v-if="show">
    <div class="container">
      <div class="head">
        <h1>全景需求打印预览-【标准A4纸张】</h1>
        <i class="iconfont icon-guanbi dialog-close" @click="closeButNotSave"></i>
      </div>
      <div class="content" style="overflow-y: scroll">
        <h1 class="print-title"></h1>
        <div class="yemei">
          <img src="static/print4.png" alt="">
          <img src="static/print3.png" alt="">
        </div>
        <div id="print" ref="print">
          <el-table
            :span-method="arraySpanMethod"
            size="mini"
            :data="excelData"
            border
            style="width: 100%;font-size: 11px;">
            <el-table-column
              prop="orderNo"
              label="需求单号">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态">
            </el-table-column>
            <el-table-column
              prop="createUserName"
              label="需求用户">
            </el-table-column>
            <el-table-column
              prop="departmentName"
              label="单位">
            </el-table-column>
            <el-table-column
              prop="poiId"
              label="目标全景点Poi名称">
            </el-table-column>
            <el-table-column
              prop="lnglat"
              label="经纬度">
            </el-table-column>
            <el-table-column
              prop="address"
              label="属地">
            </el-table-column>
            <el-table-column
              prop="grid"
              label="网格">
            </el-table-column>
            <el-table-column
              prop="shotMode"
              label="拍摄方式">
            </el-table-column>
            <el-table-column
              prop="shotHeight"
              label="拍摄高度">
            </el-table-column>
            <el-table-column
              prop="expectDate"
              label="期望完成日期">
            </el-table-column>
          </el-table>
        </div>
        <div class="yemei">
          <img src="static/print2.png" alt="">
          <img src="static/print1.png" alt="">
        </div>
        <h1 class="print-foot">顺德区地理国情监测平台 全景需求单</h1>
        <div class="btn-bar">
          <btn text="取消" class="cancel" @click="show=false"></btn>
          <btn text="导出.exl" class="b" @click="excel"></btn>
          <btn text="打印" class="b" @click="print"></btn>
        </div>
      </div>
    </div>
  </my-dialog>
</template>
<script>
  import myDialog from '../space/myDialog'
  import btn from '../btn.vue'

  export default {
    components: {myDialog, btn},
    props: {
      value: {
        type: Boolean,
        default: false
      },
      orderNos: {
        type: String,
        default: ''
      },
      excelData: {
        type: Array,
        default: null
      }
    },
    watch: {
      value (v) {
        this.show = v
      },
      show (v) {
        this.$emit('input', v)
      }
    },
    data () {
      return {
        show: this.value
      }
    },
    methods: {
      excel () {
        let href = this.$api.getBase() + 'shotTask/exportShotTask?orderNos=' + this.orderNos
        window.location.href = href
      },
      print () {
        this.printdiv('print')
      },
      printdiv (printpage) {
        var headhtml = '<html><head><title></title></head><body>'
        var foothtml = '</body>'
        // 获取div中的html内容
        var newhtml = document.all.item(printpage).innerHTML
        // 获取div中的html内容，jquery写法如下
        // var newhtml= $("#" + printpage).html()

        // 获取原来的窗口界面body的html内容，并保存起来
        var oldhtml = document.body.innerHTML

        // 给窗口界面重新赋值，赋自己拼接起来的html内容
        document.body.innerHTML = headhtml + newhtml + foothtml
        // 调用window.print方法打印新窗口
        window.print()

        // 将原来窗口body的html值回填展示
        document.body.innerHTML = oldhtml
        return false
      },
      printPage () {
        var newWin = window.open('about:blank', '', '')
        var titleHTML = document.getElementById('print').innerHTML
        newWin.document.write(titleHTML)
        newWin.document.location.reload()
        newWin.print()
      },
      p (printpage) {
        var headhtml = '<html><head><title></title></head><body>'
        var foothtml = '</body>'
        // 获取div中的html内容
        var newhtml = document.all.item(printpage).innerHTML
        // 获取div中的html内容，jquery写法如下
        // var newhtml= $("#" + printpage).html()

        // 获取原来的窗口界面body的html内容，并保存起来
//        var oldhtml = document.body.innerHTML

        // 给窗口界面重新赋值，赋自己拼接起来的html内容
//        document.body.innerHTML = headhtml + newhtml + foothtml
        var newWin = window.open('about:blank', '', '')
        newWin.document.write(headhtml + newhtml + foothtml)
        newWin.document.location.reload()
        newWin.print()
        // 调用window.print方法打印新窗口
//        window.print()

        // 将原来窗口body的html值回填展示
//        document.body.innerHTML = oldhtml
        return false
      },
      arraySpanMethod ({row, column, rowIndex, columnIndex}) {
        if (rowIndex % 2 !== 0) {
          if (columnIndex === 0) {
            return [1, 11]
          } else if (columnIndex === 1) {
            return [0, 0]
          }
        }
      },
      closeButNotSave () {
        this.show = false
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/iconfont/spaceicon.css";
.container{
  flex: 0 0 auto;
  width: 960px;
  max-height: 700px;
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
  .head{
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f4f5f6;
    padding: 0 15px;
    h1{
      font-size: 16px;
      color: #2a2b2c;
    }
    i{
      cursor: pointer;
    }
  }
  .content{
    max-height: 660px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    .print-title,.print-foot{
      font-size: 14px;
      color: #bbb;
      margin: 0;
      padding: 0;
      line-height: 1;
    }
    .yemei{
      width: 100%;
      flex: 0 0 auto;
      display: flex;
      justify-content: space-between;
    }
    #print{
      width: 100%;
      flex: 0 0 auto;
      padding: 3px;
      h1{
        color: #bbb;
      }
    }
    .btn-bar{
      align-self: stretch;
      padding: 15px 20px;
      flex: 0 0 auto;
      display: flex;
      justify-content: center;
      .cancel{
        width: 110px;
        height: 30px;
        border: 1px solid #1ab0e7;
        border-radius: 4px;
        font-size: 15px;
        color: #1ab0e7;
        margin-right: 15px;
      }
      .b{
        width: 110px;
        height: 30px;
        background: #1ab0e7;
        color: #fff;
        border-radius: 4px;
        font-size: 15px;
        margin-right: 15px;
      }
    }
  }
}
</style>
