<template>
  <div id="mosaicBox">
    <div class="mosaic">
      <div class="header">
        <div>
          <div class="menus">
              <router-link :class="{active: item.isActive}" v-for="item in header.menus" :to="{ path: item.path }" >{{item.text}}</router-link>
          </div>
          <div class="center">
            <div class="inputBox">
              <el-input :placeholder="header.search.placeholder" v-model='searchWord' @change="reStartSearch" suffix-icon="el-icon-search"
                        size="small" style="padding-left:10px; height: 23px; width: 200px"/>
            </div>
          </div>
          <div class="right">
            <div class="createPanoList" v-show="generalUser">
              <div class="createPano" >新增拼接工程</div>
              <ul class="createPanoUl">
                <li class="createPanoLi" @click="createNewPano(2)">无人机</li>
                <li class="createPanoLi" @click="createNewPano(3)">鱼眼</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="body">
        <div id="tHeader">
          <div class="left">
            <el-checkbox id="panoName" label="全景名称" name="type" v-model="selectAllPano" />
          </div>
          <div class="center">
            <div class="mosaiclistHeaderBox">
              <div class="mosaiclistHeader">
                <div></div>
                <div>素材类型</div>
                <div>素材数量</div>
                <div>状态</div>
              </div>
            </div>
          </div>
          <div class="right" >
            <div id="startAll" v-show="generalUser" @click="startAll">全部开始</div>
            <div id="deleteAll" v-show="generalUser" @click="deleteAll">全部删除</div>
          </div>
        </div>
        <div id="tBody">
          <div class="tBodyContainer">
            <mosaiclistitem v-for="item in lists"
              v-model="item.choose"
              :panoId="item.id"
              :panoName="item.name"
              :type="item.deviceType"
              :preview="item.preview"
              :status="item.isSuccess"
              :stitchNumber="item.stitchNumber"
              :anchorInfo="item.anchorInfo"
              :waitingTime="item.waitingTime"
              @edit-pano="editPano"
              @delete-pano="deleteSinglePano"
            />
          </div>
          <compagenumber class="pagenumberBox"
            :pagenumber="pageNumber"
            :totalnumber="pageTotal"
            @close="refreshCurPage"
            v-on:number-change-to="changePageNumber" />
        </div>
      </div>
    </div>
    <div class="maskBox mask" v-show="popup.editYuYanTask || popup.editWuRenjiTask">
      <edityuyanpano
        :panoId="editPanoId.yuyan"
        @close="closePop"
        v-show="popup.editYuYanTask" />
      <editwurenjipano
        :panoId="editPanoId.wurenji"
        @close="closePop"
        v-show="popup.editWuRenjiTask" />
    </div>
  </div>
</template>

<script>
import mosaiclistitem from '@/components/pano/mosaiclistitem'
import edityuyanpano from '@/components/pano/edityuyanpano'
import editwurenjipano from '@/components/pano/editwurenjipano'
import compagenumber from '@/components/common/compagenumber'
import { mosaic } from './config'

export default {
  name: 'mosaic',
  components: {
    mosaiclistitem,
    edityuyanpano,
    editwurenjipano,
    compagenumber
  },
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
  },
  data () {
    return {
      header: null,
      selectAllPano: false,
      lists: [],
      total: 0,
      pageNumber: 1,
      pageTotal: 0,
      pageSize: 4,
      searchWord: '',
      editPanoId: {
        yuyan: null,
        wurenji: null
      },
      popup: {
        editYuYanTask: false,
        editWuRenjiTask: false
      }
    }
  },
  computed: {
    generalUser () {
      return this.$store.state.userInfo.generalUser
    }
  },
  watch: {
    selectAllPano () {
      for (let i in this.lists) {
        this.lists[i].choose = this.selectAllPano
      }
    }
  },
  methods: {
    reStartSearch () {
      this.changePageNumber(1)
    },
    // 删除pano
    deletePano (panoIds) {
      this.$api.deletePanoStitchBatch({
        panoIds: panoIds
      }).then(res => {
        if (res.code === 0) {
          this.refreshCurPage()
        }
      })
    },
    // 拼接pano
    processPano (panoIds) {
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
    // 新建pano
    createNewPano (deviceType) {
      this.$api.ceatePano({
        panoName: '',
        deviceType: deviceType
      }).then(res => {
        if (res.code === 0) {
          this.refreshCurPage()
        } else {
          this.$message({
            type: 'warning',
            text: res.msg
          })
        }
      })
    },
    // 更新列表数据
    updateList (lists, total, pageNum) {
      this.lists = []
      this.$nextTick(() => {
        for (let i in lists) {
          lists[i].stitchNumber = 0
          lists[i].preview = ''
          lists[i].choose = false
          if (lists[i].stitch) {
            for (var j in lists[i].stitch) {
              if (lists[i].stitch.hasOwnProperty(j)) {
                lists[i].stitchNumber += 1
                if (lists[i].stitch[j].url && !lists[i].preview) {
                  lists[i].preview = lists[i].stitch[j].url
                }
              }
            }
          }
          this.$set(this.lists, i, lists[i])
        }
      })
      if (total % 4 === 0) {
        this.pageTotal = total / 4
      } else {
        this.pageTotal = total / 4 + 1
      }

      this.pageNumber = pageNum
    },
    // 页码改变
    changePageNumber (pageNumber) {
      this.fetchList(pageNumber, this.pageSize, this.updateList)
    },
    // 获取全部选中panoId
    getBatchIds () {
      let panoIds = ''
      for (let i in this.lists) {
        if (this.lists[i].choose) {
          panoIds += (panoIds ? ',' : '') + this.lists[i].id
        }
      }
      return panoIds
    },
    // 全部选中开始
    startAll () {
      let panoIds = this.getBatchIds()
      if (!panoIds) {
        this.$message('尚未选中全景')
        return
      }
      this.processPano(panoIds)
    },
    // 全部选中删除
    deleteAll () {
      let panoIds = this.getBatchIds()
      if (!panoIds) {
        this.$message('尚未选中全景')
        return
      }
      this.deletePano(panoIds)
    },
    // 删除单个全景
    deleteSinglePano (panoId) {
      this.deletePano(panoId)
    },
    // 编辑全景
    editPano (panoId) {
      for (let i in this.lists) {
        if (this.lists[i].id === panoId) {
          if (this.lists[i].deviceType === 2) {
            this.popup.editWuRenjiTask = true
            this.editPanoId.wurenji = panoId
          }
          if (this.lists[i].deviceType === 3) {
            this.popup.editYuYanTask = true
            this.editPanoId.yuyan = panoId
          }
          break
        }
      }
    },
    // 关闭弹窗
    closePop () {
      this.editPanoId.yuyan = null
      this.editPanoId.wurenji = null
      this.popup.editYuYanTask = false
      this.popup.editWuRenjiTask = false
      this.refreshCurPage()
    }
  }
}
</script>

<style lang="scss">
  $margin: 24px;
  $commonColor: #1bb1e6;
  $commonFadeColor: rgba(27, 177, 230, 0.5);
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
        position: relative;
        margin:0 $margin;
        padding:20px 0px;
        border-bottom:1px solid #dedede;
        z-index:2;
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
          .inputBox{
            border:1px solid #9b9b9b;
            border-radius:2px;
            overflow: hidden;
            display:flex;
            flex-wrap:nowrap;
            flex-flow:row;
            .el-input__inner{
              border-color: #808080;
              padding: 0px;
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
            flex:1;
          }
          .el-input--small .el-input__icon{
            line-height: 20px;
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
        position: relative;
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
        .mosaiclistHeaderBox{
          position: absolute;
          width: 85%;
          height:100%;
          left:0;
          top:0;
          .mosaiclistHeader{
            padding: 0 20px;
            display: flex;
            >div{
              flex:1;
              justify-content: center;
              display: flex;
            }
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
      /* createPano */
      .createPanoList{
        display: flex;
        flex-flow: column nowrap;
        box-sizing: border-box;
        width: 100px;
        .createPano{
          background:$commonColor;
          color: #fff;
          border-radius: 2px;
        }
        .createPano, .createPanoLi{
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .createPanoUl{
          display: none;
          background: #fff;
          box-sizing: border-box;
          border: 1px solid rgb(222, 222, 222);
        }
        .createPanoLi:hover{
          cursor: pointer;
          background: $commonFadeColor;
        }
        &:hover .createPanoUl{
          display: block;
        }
      }
    }
    .maskBox{
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      >div{
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%)
      }
    }
  }
</style>
