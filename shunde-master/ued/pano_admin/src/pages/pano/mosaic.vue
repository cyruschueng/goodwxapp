<template>
  <div id="mosaicBox">
    <div class="mosaic">
      <div class="header">
        <div>
          <div class="menus">
              <router-link :class="{active: item.isActive}" v-for="item in header.menus" :to="{ path: item.path }" >{{item.text}}</router-link>
          </div>
          <div class="center">
            <div class="inputBox-pano">
              <el-input :placeholder="header.search.placeholder" v-model='searchWord' @change="reStartSearch" suffix-icon="el-icon-search"
                        size="small" style="padding-left:10px; height: 23px"/>
            </div>
          </div>
          <div class="right" v-show="header.btnText && !disabled" @click.stop="showAddNewTask" >
            <bordertext id="rightText" :text="header.btnText" />
          </div>
        </div>
      </div>
      <div class="body">
        <div id="tHeader">
          <div class="left">
            <el-checkbox id="panoName" label="全景名称" name="type" v-model="selectAllTask" :disabled="disabled"/>
          </div>
          <div class="center">
            <div>素材类型</div>
          </div>
          <div class="right" v-show="!disabled">
            <div id="startAll" v-show="generalUser" @click.stop="startAll">全部开始</div>
            <div id="deleteAll"  v-show="generalUser" @click.stop="deleteAll">全部删除</div>
          </div>
        </div>
        <div id="tBody">
          <div class="tBodyContainer">
            <mosaicitem v-for="panoItem in lists"
              :choosed="panoItem.choosed"
              :title="panoItem.name"
              :loadStyle="panoItem.loadStyle"
              :uploadTotal="panoItem.uploadTotal"
              :tiles="panoItem.stitch"
              :panoId="panoItem.id"
              :status="panoItem.isSuccess"
              :waitingTime="panoItem.waitingTime"
              :disabled="disabled"
              @process="processThis"
              @choosed-change="chooseChange"
              @deleteThis="deleteListItem"/>
          </div>
          <compagenumber class="pagenumberBox"
            :pagenumber="pageNumber"
            :totalnumber="pageTotal"
            @close="refreshCurPage"
            v-on:number-change-to="changePageNumber" />
        </div>
      </div>
    </div>
    <div class="maskBox mask" v-show="popup.addNewTask">
      <mosaicadd class="newMosaic"
        @close="closeAddNewTask"
        @save="refreshCurPage"
        v-show="popup.addNewTask" />
    </div>
  </div>
</template>

<script>
import mosaicitem from '../../components/pano/mosaicitem'
import bordertext from '../../components/common/bordertext'
import mosaicadd from '../../components/pano/mosaicadd'
import compagenumber from '../../components/common/compagenumber'

import { mosaic } from './config'

export default {
  name: 'mosaic',
  components: {mosaicitem, bordertext, mosaicadd, compagenumber},
  created () {
    // 初始化配置
    this.header = mosaic.header
    // 刷新列表
    this.refreshCurPage = () => {
      this.newTaskId = ''
      this.fetchList(this.pageNumber, this.pageSize, this.updateList)
    }
    this.fetchList = (number, size, call = () => {}) => {
      this.$api.getPanoStitchList({
        pageNum: number,
        pageSize: size,
        searchWord: this.searchWord
      }).then(res => {
        if (res.data) {
          call(res.data.list, res.data.total, number)
        }
      })
    }
    this.refreshCurPage()
    // // 权限配置
    // this.$api.deletePanoStitch.isPermission(this).then(isPermission => {
    //   this.disabled = !isPermission
    // })
  },
  data () {
    return {
      userInfo: false,
      header: null,
      selectAllTask: false,
      lists: [],
      total: 0,
      pageNumber: 1,
      pageTotal: 0,
      pageSize: 4,
      searchWord: '',
      disabled: false,
      // newTaskId: '', // 新增全景的panoId
      popup: {
        addNewTask: false
      }
    }
  },
  computed: {
    panoIds () {},
    generalUser () {
      return this.$store.userInfo.generalUser
    }
  },
  watch: {
    selectAllTask () {
      for (let i in this.lists) {
        if (this.selectAllTask) {
          let status = this.$store.state.config.mosaicStatus[0]
          for (let i in this.$store.state.config.mosaicStatus) {
            if (this.$store.state.config.mosaicStatus[i].key === this.lists[i].isSuccess) {
              status = this.$store.state.config.mosaicStatus[i]
              break
            }
          }
          if (status.chooseNable) {
            this.lists[i].choosed = this.selectAllTask
          }
        } else {
          this.lists[i].choosed = this.selectAllTask
        }
      }
    },
    total () {
      this.pageTotal = Math.ceil(this.total / this.pageSize) || 1
    }
  },
  methods: {
    updateList (lists = [], total = 0, pageNum = 1) {
      this.lists = []
      this.$nextTick(() => {
        for (let i in lists) {
          lists[i].stitch = this.checkStitch(lists[i].stitch)
          this.$set(this.lists, i, lists[i])
        }
      })
      this.total = total
      this.pageNumber = pageNum
    },
    checkStitch (stitch = {}) {
      ['1', '2', '3', '4', '5', '6', '7', '8', '9'].forEach((value) => {
        stitch[value] = stitch[value] || {}
      })
      return stitch
    },
    changePageNumber (pageNumber) {
      this.fetchList(pageNumber, this.pageSize, this.updateList)
    },
    deleteListItem (panoId) {
      this.$api.deletePanoStitch({
        panoId: panoId
      }).then(res => {
        if (res.code === 0) {
          this.$message('删除成功')
          this.refreshCurPage()
        }
      })
    },
    closeAddNewTask () {
      this.popup.addNewTask = false
    },
    showAddNewTask () {
      this.popup.addNewTask = true
      // this.$api.ceatePano.isPermission(this).then(isPermission => {
      //   console.log(isPermission)
      // })
    },
    getBatchId (isAll) {
      let panoIds = ''
      if (isAll) {
        for (let i in this.lists) {
          panoIds += this.lists[i].id + ','
        }
      } else {
        for (let i in this.lists) {
          if (this.lists[i].choosed) {
            panoIds += this.lists[i].id + ','
          }
        }
      }
      panoIds = panoIds.substring(0, panoIds.length - 1)
      return panoIds
    },
    reStartSearch () {
      this.changePageNumber(1)
    },
    chooseChange (isChoosed, panoId, cell) {
      for (let i in this.lists) {
        if (this.lists[i].id === panoId) {
          this.lists[i].choosed = isChoosed
          break
        }
      }
    },
    processThis (panoId) {
      if (!panoId) {
        this.$message('尚未选中全景')
        return
      }
      this.$api.processPanoBatch({
        panoIds: panoId
      }).then(res => {
        if (res.code === 0) {
          this.refreshCurPage()
        } else {
          this.$message(res.msg)
        }
      })
    },
    startAll () {
      let panoIds = this.getBatchId()
      if (!panoIds) {
        this.$message('尚未选中全景')
        return
      }
      this.$api.processPanoBatch({
        panoIds: panoIds
      }).then(res => {
        if (res.code === 0) {
          this.refreshCurPage()
        } else {
          this.$message(res.msg)
        }
      })
    },
    deleteAll () {
      let panoIds = this.getBatchId()
      if (!panoIds) {
        this.$message('尚未选中全景')
        return
      }
      this.$api.deletePanoStitchBatch({
        panoIds: panoIds
      }).then(res => {
        if (res.code === 0) {
          this.refreshCurPage()
        }
      })
    }
  }
}
</script>

<style lang="scss">
  $margin: 24px;
  $commonColor: #1bb1e6;
  $color9b9b9b: #9b9b9b;

  #mosaicBox {
    position: relative;
    .mosaic{
      font-size: 13px;
      display: flex;
      flex-flow: column nowrap;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      min-height: 100%;
      input{
        border: none;
        outline: none;
      }
      /*header*/
      .header{
        margin:0 $margin;
        padding:20px 0px;
        border-bottom:1px solid #dedede;
        >div{
          display: flex;
          flex-wrap: nowrap;
          height:24px;
        }
        .menus{
          display: flex;
          flex-wrap: nowrap;
          border:1px solid $commonColor;
          border-radius:2px;
          a{
            display: flex;
            align-items: center;
            padding:0 4px;
            color: $commonColor;
          }
          :not(:last-child){
            border-right:1px solid $commonColor;
          }
          a.active, a:hover{
            background:$commonColor;
            color:#fff;
          }
        }
        .center{
          flex:1;
          display:flex;
          flex-wrap:nowrap;
          justify-content: center;
          .inputBox-pano{
            border:1px solid #9b9b9b;
            border-radius:2px;
            overflow: hidden;
            display:flex;
            flex-wrap:nowrap;
            flex-flow:row;
            .el-input__inner{
              border-color: #808080;
              padding-left:10px;
            }
            .search-input-3 {
              width: 200px;
              margin-right: 30px;
              input{
                background: #fff;
                height: 23px;
              }
              .el-input__icon{
                line-height: 20px;
              }
            }
          }
          input{
            height: 23px;
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
      /*tHeader*/
      #tHeader{
        margin:8px $margin;
        display: flex;
        flex-flow:row nowrap;
        align-items: center;
        .left{
          width: 25%;
          color: $color9b9b9b;
        }
        .center{
          flex:1;
          color: $color9b9b9b;
        }
        .right{
          display: flex;
          flex-flow:row nowrap;
          >div{
            padding:2px 8px;
            border-radius:4px;
          }
          #startAll{
            background:$commonColor;
            color:#fff;
            margin-right:5px;
            cursor:pointer;
          }
          #deleteAll{
            color:#ef4a4a;
            border:1px solid #ef4a4a;
            cursor:pointer;
          }
        }
      }
      /*tBody*/
      #tBody{
        background: #f0f0f0;
        flex: 1;
        display: flex;
        flex-flow: column nowrap;
        .tBodyContainer{
          padding: 20px 0 1px;
          flex: 1;
          margin:0 $margin;
        }
        .pagenumberBox{
          margin:10px 0px 50px;
        }
      }
      /*el*/
      #panoName .el-checkbox__label{
        color:$color9b9b9b;
      }
    }
    .maskBox{
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      >div{
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%)
      }
    }
  }
</style>
