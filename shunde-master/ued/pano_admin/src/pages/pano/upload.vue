<template>
  <div id="panoupload">
    <div class="panouploadcontainer">
      <div class="header">
        <div>
          <div class="menus">
              <router-link :class="{active: item.isActive}" v-for="item in header.menus" :to="{ path: item.path }" >{{item.text}}</router-link>
          </div>
          <div class="center">
            <div class="inputBox-upload">
              <el-input class="search-upload" :placeholder="header.search.placeholder" v-model='searchWord' @change="reStartSearch" suffix-icon="el-icon-search"
                        size="small" style="height: 23px; width: 200px"/>
            </div>
            <el-date-picker
              v-model="fromDate"
              type="date"
              placeholder="选择同步起始日期">
            </el-date-picker>
            <el-button class="primary upload-hei" @click.stop="moveData">上传小黑全景</el-button>
          </div>
          <div class="right cursor-pointer"
          :class="{disabledDiv: panoLoading}"
           v-show="header.btnText, generalUser"
           :title="panoLoading?'全景上传中':'点击上传全景'"
           @click.stop="uploadPanoImg">
            {{header.btnText}}
          </div>
        </div>
      </div>
      <div class="body">
        <div id="tHeader">
          <div class="left" />
          <div class="center" />
          <div class="right" style="display:none;">
            <el-checkbox id="selectAll" label="全选" name="type" v-model="selectAll" />
            <div id="startAll" @click.stop="startBatchUpload">批量开始</div>
            <div id="deleteAll" @click.stop="deleteBatchUpload">批量删除</div>
          </div>
        </div>
        <div id="tBody">
          <div class="tbodyContainer">
            <div class="panoItem" v-for="list in lists" >
                <panoitem
                :name="list.name" :time="list.createTime" :img="list.thumbnail"
                :choosed="list.choosed"
                :id="list.id"
                :panoId="list.panoId"
                :isTest="list.isTest"
                :status="list.isSuccess"
                @delete="deletePanoById"
                @edit="editPanoById(list.id, list)"
                @choosed-change="choosedChangeHandler"/>
            </div>
          </div>
          <compagenumber class="pagenumberBox"
            :pagenumber="pageNumber"
            :totalnumber="pageTotal"
            @number-change-to="changePageNumber" />
        </div>
      </div>
    </div>
    <div class="popMask mask" v-show="popup.godownentry || popup.editpoi">
      <godownentry
        v-show="popup.godownentry"
        class="popupGodownentry transform-center"
        :editId="editPano_id"
        @save="updatePanoInfo"
        @save-and-entry="updatePanoInfoAndUpload"
        @close="closeGodownentry"/>
    </div>
  </div>
</template>

<script>
import panoitem from '@/components/pano/panoitem'
import godownentry from '@/components/pano/godownentry'
import compagenumber from '@/components/common/compagenumber'
import { upload } from './config'
import { fileMd5Factory } from '@/filters'
// import { resourPicShowUrl, resourPicFactUrl } from '@/api/urlprovider.js'
const getMd5 = fileMd5Factory()

export default {
  name: 'panoupload',
  components: {
    panoitem,
    godownentry,
    compagenumber
  },
  created () {
    // 初始化配置
    this.header = upload.header
    this.refresh = () => {
      this.fetchList(this.pageNumber, this.pageSize, this.updateList)
    }
    // 刷新列表
    this.fetchList = (number, size, call = () => {}) => {
      this.$api.getPanoInfoList({
        searchWord: this.searchWord,
        tag: '',
        pageSize: size,
        pageNum: number
      }).then(res => {
        if (res.code === 0) {
          call(res.data.list, res.data.total, number)
        }
      })
    }
    this.refresh()
  },
  data () {
    return {
      fromDate: '',
      header: {},
      panoLoading: false,
      searchWord: '',
      selectAll: false,
      lists: [],
      pageNumber: 1,
      pageTotal: 0,
      pageSize: 16,
      editPano_id: '',
      file: null,
      uploadPanoId: null,
      popup: {
        godownentry: false
      }
    }
  },
  computed: {
    panoIds () {},
    generalUser () {
      return this.$store.state.userInfo.generalUser
    }
  },
  watch: {
    selectAll () {
      for (let i in this.lists) {
        this.lists[i].choosed = this.selectAll
      }
    }
  },
  methods: {
    moveData () {
      if (this.fromDate === '' || this.fromDate === 0 || this.fromDate === null) {
        this.$message('请选择同步数据起始日期')
        return
      }
      this.$api.transferData((new Date(this.fromDate)).valueOf()).then(res => {
        this.$alert('该操作将同步微景天下全景相机拍摄的全景照片到本系统中，同步时间涉及到迁移全景图片数据，时间较长，平均每张图片1分钟左右。需要同步的图片有 ' + res.data.count + ' 张，可过段时间重新搜索和查看全景照片。', '提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
      })
    },
    choosedChangeHandler (isChoosed, panoId) {
      for (let i in this.lists) {
        if (this.lists[i].panoId === panoId) {
          this.lists[i].choosed = isChoosed
          break
        }
      }
    },
    updateList (lists, total, number) {
      this.lists = []
      this.$nextTick(() => {
        for (let i in lists) {
          lists[i].isTest = true
          this.$set(this.lists, i, lists[i])
          // this.$store.commit('UPDATEPANOINFO', lists[i])// 存储列表
        }
      })
      this.total = total
      this.pageNumber = number
      this.pageTotal = Math.ceil(this.total / this.pageSize)
    },
    changePageNumber (number) {
      this.fetchList(number, this.pageSize, this.updateList)
    },
    reStartSearch () {
      this.changePageNumber(1)
    },
    // 上传全景图
    uploadPanoImg () {
      if (!this._uploadInput) {
        this._uploadInput = document.createElement('input')
        this._uploadInput.setAttribute('type', 'file')
      }
      this._uploadInput.onchange = (e) => {
        let file = e.target.files[0]
        this.file = file
        this.checkAndUpLoadFile(file)
        this._uploadInput.value = null
      }
      !this.panoLoading && this._uploadInput.click()
    },
    uploadProgress () {},
    checkAndUpLoadFile (file) {
      if (/.jpg$/i.test(file.name)) {
        getMd5(file, md5 => {
          console.log(md5)
          this.$api.generatePanoId({
            md5: md5,
            name: file.name
          }).then(res => {
            if (res.code === 0) {
              this.panoLoading = true
              this.uploadPanoId = res.data.stitchId
              let self = this
              self.$api.uploadPanoTilesToCos(file, `${self.uploadPanoId}/${res.data.fileName}`, function (url) {
                self.$api.finishUploadPano({
                  stitchId: self.uploadPanoId
                }).then(res => {
                  if (res.code === 0) {
                    self.refresh()
                  }
                  self.panoLoading = false
                })
              }, function () {
                self.panoLoading = false
              }, self.uploadProgress)
            } else {
              this.$message({
                showClose: true,
                message: res.msg,
                type: 'warning'
              })
            }
          })
        })
      } else {
        this.$message({
          showClose: true,
          message: `图片格式必须为jpg，请重新上传`,
          type: 'warning'
        })
      }
    },
    // 关闭入库单
    closeGodownentry () {
      this.popup.godownentry = false
    },
    deletePanoById (panoId) {
      console.log(panoId)
      this.$api.deletePanoInfo({
        panoId: panoId
      }).then(res => {
        if (res.code === 0) {
          this.$message('删除成功')
          this.refresh()
        }
      })
    },
    editPanoById (id, panoInfo) {
      this.editPano_id = id
      this.popup.godownentry = true
    },
    updatePanoInfo (panoId) {
      for (let i in this.lists) {
        if (this.lists[i].panoId === panoId) {
          for (let j in this.lists[i]) {
            this.lists[i][j] = this.$store.state.panoInfos[panoId][j]
          }
          break
        }
      }
      this.editPano_id = ''
    },
    updatePanoInfoAndUpload (panoId) { // 修改入库单并入库
      this.updatePanoInfo(panoId)
      this.refresh()
    },
    getChoosedIds () {
      let choosedId = []
      for (let i in this.lists) {
        if (this.lists[i].choosed) {
          choosedId.push(this.lists[i].panoId)
        }
      }
      return choosedId
    },
    startBatchUpload () {
      // 批量入库
      let ids = this.getChoosedIds()
      ids = ids.join(',')
      console.log('批量入库：' + ids)
    },
    deleteBatchUpload () {
      let ids = this.getChoosedIds()
      ids = ids.join(',')
      this.$api.deletePanoInfoBatch({
        panoIds: ids
      }).then(res => {
        if (res.code === 0) {
          this.refresh()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  $margin: 24px;
  $commonColor: #1bb1e6;
  $color9b9b9b: #9b9b9b;

  #panoupload {
    .upload-hei{
      padding: 0px 10px;
      color: #1bb1e6;
      margin-left: 40px;
      border: solid 1px #1bb1e6;
      border-radius: 15px;
    }
    font-size: 13px;
    position: relative;
    .panouploadcontainer{
      min-height: 100%;
      width: 100%;
      position:absolute;
      display: flex;
      flex-flow: column nowrap;
    }
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
        .inputBox-upload {
          border: 1px solid #808080;
          border-radius: 2px;
          overflow: hidden;
          display: flex;
          flex-wrap: nowrap;
          flex-flow: row;
          search-upload {
          .el-input__inner {
            border-color: #FFF;
            padding: 0px;
            height: 24px;
          }
          .search-input-3 {
            width: 200px;
            margin-right: 30px;
            input {
              background: #fff;
              height: 23px;
            }
            .el-input__icon {
              line-height: 20px;
            }
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
        .el-date-editor{
          height: 24px;
          margin-left: 20px;
        }
      }
      .right{
        color:$commonColor;
        border-radius:12px;
        border:1px solid $commonColor;
        padding:0 20px;
        display:flex;
        align-items: center;
        font-size:12px;
        &:hover{
          color: #fff;
          background: $commonColor;
        }
      }
      .right.disabledDiv{
        cursor: no-drop;
        opacity: 0.5;
      }
      .right.disabledDiv:hover{
        color: $commonColor;
        background: #fff;
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
          margin-right:8px;
          cursor:pointer;
        }
        #deleteAll{
          color:#ef4a4a;
          border:1px solid #ef4a4a;
          cursor:pointer;
        }
        #selectAll{
          margin-right:10px;
        }
      }
    }

    /*tBody*/
    #tBody{
      margin:0 $margin;
      background: #f0f0f0;
      padding:30px 10px 10px;
      display: flex;
      flex-flow: column nowrap;
      flex: 1;
      .tbodyContainer{
        display: flex;
        flex-wrap: wrap;
        align-content: start;
        flex: 1;
      }
      .panoItem{
        display: flex;
        justify-content: center;
        margin-bottom:20px;
        width: 25%;
      }
      // 245
      @media screen and (min-width: 1180px){
        .panoItem{width: 20%;}
      }
      @media screen and (min-width: 980px) and (max-width: 1180px){
        .panoItem{width: 25%;}
      }
      @media screen and  (max-width: 980px){
        .panoItem{width: 33.33%;}
      }
    }
    /*el*/
    // #selectAll .el-checkbox__label{
    //   color:$color9b9b9b;
    // }

    .popMask{
      position: fixed;
      top:0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
    }
    .pagenumberBox{
      margin: 10px 0 50px;
    }
  }
</style>
