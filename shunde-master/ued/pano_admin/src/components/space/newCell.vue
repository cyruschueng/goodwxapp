<template>
  <div>
    <common-container
      :gridCode="gridCode"
      showSelect
      :left-selecter="leftSelecter"
      :open-shadow="openShadow"
      @exceptionClick="ec"
      @left-select-change="leftSelectChange"
      :exception-text="exceptionText"
      @cell-click="cc"
      :highLightImg="area.img"
      :exceptionIsSelected="!isRegular">
      <delete-poi-dialog v-model="showAlert" @sure="deleteME"></delete-poi-dialog>
      <update-poi-dialog v-model="showUpdatePoiDialog" :data="dataUpdatePoiDialog"
                         @close-and-save="updatePoiDialogCloseAndSave"></update-poi-dialog>
      <update-ruku-dialog v-model="showUpdateRukuDialog" :poi-data="dataUpdateRukuDialogPoi"
                          :pano-data="dataUpdateRukuDialogPano" @change-poi="changeDefultPoi"></update-ruku-dialog>
      <div id="head">
        <h2 id="head-title">
          <template v-if="isRegular">
            <span v-if="!areaIdIsEmpty">区域-<span class="blue-span">{{area.name}}</span></span>
            <span v-if="!gridCodeIsEmpty">网格-<span class="blue-span">{{gridCode}}</span></span>
          </template>
          <template v-else>
            <span>异常点</span>
          </template>
        </h2>
        <div id="all-select-head" v-if="pois && pois.length > 1">
          <input type="checkbox" id="all-select-checkbox" v-model="allSelectCheckbox">
          <label for="all-select-checkbox">全选</label>
          <btn text="批量删除" :class="[pldeleteClass,{'delete-btn-active':truePois.length>0 || trueViews.length>0}]"
               @click="deletes" v-show="generalUser"></btn>
        </div>
      </div>
      <div class="line"></div>
      <div class="cell-item-container">
        <cell-item :title="totalPoiCount" sub-title="Poi全景点数共计" class="space-cell-item"
                   icon="static/space/img/v1.png"></cell-item>
        <cell-item :title="skyPoiCount" sub-title="空中全景数量" class="space-cell-item"
                   icon="static/space/img/v2.png"></cell-item>
        <cell-item :title="groundPoiCount" sub-title="地面全景数量" class="space-cell-item"
                   icon="static/space/img/v3.png"></cell-item>
      </div>
      <div class="search-bar">
        <div class="left-search">
          <el-input
            class="search-input"
            placeholder="按下回车键搜索poi"
            suffix-icon="el-icon-search"
            size="small"
            @change="searchChange"
            v-model="searchInput">
          </el-input>
        </div>
        <div :class="['right-tag',{'overflow-hidden': jtFlag}]">
          <span class="name">全景标签：</span>
          <div class="tag-container">
            <tagselector @change="tagClick" :lists="tags"/>
          </div>
        </div>
      </div>
      <poi-area
        v-for="(item,index) in pois"
        :data="item"
        :tag="tagSelected"
        :poi-index="index"
        :poi-checked="poiChecked"
        @poiCheck="poiCheck"
        @edit-one-pano-click="editOnePanoClick"
        @delete-one-pano-click="deleteOnePanoClick"
        @edit-one-poi-click="editOnePoiClick">
      </poi-area>
      <el-pagination
        @current-change="currentChange"
        class="pagination"
        v-if="pageTotal>0"
        :page-size="pageSize"
        background
        layout="prev, pager, next"
        :total="pageTotal">
      </el-pagination>
    </common-container>
  </div>
</template>
<script>
  import commonContainer from './commonContainer.vue'
  import cellItem from './cellItem.vue'
  import myDialog from './myDialog.vue'
  import poiArea from './poiArea.vue'
  import btn from '../btn.vue'
  import deletePoiDialog from './dialog/deletePoiDialog.vue'
  import updatePoiDialog from './dialog/updatePoiDialog.vue'
  import updateRukuDialog from './dialog/updateRuKuDialog.vue'
  import tagselector from '@/components/common/tagselector'

  export default {
    components: {
      commonContainer,
      cellItem,
      myDialog,
      poiArea,
      btn,
      deletePoiDialog,
      updatePoiDialog,
      updateRukuDialog,
      tagselector
    },
    created () {
      this.netRequests(false)
      this.$api.searchTag().then(res => {
        this.tags = res.data.list
      }).catch(e => {
      })
      this.netRequestError(false)
    },
    data () {
      return {
        pageTotal: 0,
        pageSize: this.$store.state.config.pageSize,
        poiSearchParam: {
          pageNum: 1,
          pageSize: this.$store.state.config.pageSize,
          searchName: '',
          areaId: '',
          gridCode: ''
        },
        errorPoiSearchParam: {
          pageNum: 1,
          pageSize: this.$store.state.config.pageSize
        },
        leftSelecter: {
          selected: '',
          options: this.$store.state.config.shunDeCode,
          selectPlaceHolder: '行政区域'
        },
        totalPoiCount: 0,
        skyPoiCount: 0,
        groundPoiCount: 0,
        openShadow: true,
        showAlert: false,
        showUpdatePoiDialog: false,
        dataUpdatePoiDialog: null,
        showUpdateRukuDialog: false,
        dataUpdateRukuDialogPoi: null,
        dataUpdateRukuDialogPano: null,
        selectedCell: '',
        allSelectHeadShow: false,
        poiClickTrigger: false,
        exceptionText: 0,
        allSelectCheckbox: false,
        pois: null,
        poiChecked: false,
        trueViews: [],
        truePois: [],
        pldeleteClass: 'delete-btn',
        searchInput: '',
        tags: [],
        tagSelected: 0,
        tagContainerStyle: {
          overflow: 'visible'
        },
        jtFlag: true,
        isRegular: true,
        pageChange: false
      }
    },
    computed: {
      generalUser () {
        return this.$store.state.userInfo.generalUser
      },
      area () {
        for (let i = 0; i < this.$store.state.config.shunDeCode.length; i++) {
          let code = this.$store.state.config.shunDeCode[i]
          if (code.code === this.areaId) {
            return {
              name: code.code === '' ? '' : code.name,
              img: code.img
            }
          }
        }
        return {
          name: '',
          img: ''
        }
      },
      gridCode: {
        get () {
          return this.poiSearchParam.gridCode
        },
        set (v) {
          console.log('set gridCode')
          this.poiSearchParam.gridCode = v
        }
      },
      gridCodeIsEmpty () {
        return this.$utils.isEmpty(this.gridCode)
      },
      pageNum: {
        get () {
          return this.poiSearchParam.pageNum
        },
        set (v) {
          console.log('set pageNum')
          this.poiSearchParam.pageNum = v
        }
      },
      errorPageNum: {
        get () {
          return this.errorPoiSearchParam.pageNum
        },
        set (v) {
          console.log('set pageNum')
          this.errorPoiSearchParam.pageNum = v
        }
      },
      areaId: {
        get () {
          return this.poiSearchParam.areaId
        },
        set (v) {
          console.log('set areaId')
          this.poiSearchParam.areaId = v
        }
      },
      areaIdIsEmpty () {
        return this.$utils.isEmpty(this.areaId)
      },
      searchName: {
        get () {
          return this.poiSearchParam.searchName
        },
        set (v) {
          console.log('set searchName')
          this.poiSearchParam.searchName = v
        }
      },
      searchNameIsEmpty () {
        return this.$utils.isEmpty(this.searchName)
      }
    },
    watch: {
      poiSearchParam: {
        deep: true,
        handler (newValue, oldValue) {
          let showFlag = true
          if (this.areaIdIsEmpty && this.gridCodeIsEmpty && this.searchNameIsEmpty) {
            showFlag = false
          }
          if (!this.isRegular && this.areaIdIsEmpty && this.gridCodeIsEmpty && this.searchNameIsEmpty) {
          } else {
            this.isRegular = true
          }
          this.netRequests(showFlag, !this.pageChange)
          this.pageChange = false
        }
      },
      errorPoiSearchParam: {
        deep: true,
        handler (newValue, oldValue) {
          this.netRequestError(true, !this.pageChange)
          this.pageChange = false
        }
      },
      allSelectCheckbox (val) {
        this.poiChecked = val
      },
      isRegular (v) {
        if (!v) {
          this.gridCode = ''
          this.areaId = ''
          this.searchName = ''
        }
      },
      searchName (v) {
        this.searchInput = v
      },
      areaId (v) {
        console.log('areaId change' + v)
        this.leftSelecter.selected = v
      }
    },
    methods: {
      changeDefultPoi (data) {
        this.dataUpdateRukuDialogPoi = data
      },
      deleteME () {
        let ids = this.getChoosedIds()
        ids = ids.join(',')
        this.$api.deletePanoInfoBatch({
          panoIds: ids
        }).then(res => {
          if (res.code === 0) {
            this.netRequests()
          }
        })
        this.showAlert = false
      },
      tagClick (index) {
        this.tagSelected = index
        this.poiSearchParam.tag = index === '全部' ? '' : index
        this.$api.searchPoiPage(this.poiSearchParam).then(res => {
          this.pois = res.data.list
          this.pageTotal = res.data.total
        }).catch(er => {
        })
      },
      currentChange (currentPage) {
        this.pageChange = true
        if (this.isRegular) {
          this.pageNum = currentPage
        } else {
          this.errorPageNum = currentPage
        }
      },
      leftSelectChange (v) { // code是string
        this.areaId = v
      },
      dealOriginData (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].code = data[i].code + ''
        }
        return data
      },
      updatePoiDialogCloseAndSave (data) {
        this.$api.updatePoi({
          id: data.id,
          poiName: data.name,
          coordsys: data.coordsys,
          lat: data.lat,
          lng: data.lng,
          provinceId: data.provinceId,
          cityId: data.cityId,
          countyId: data.countyId,
          areaId: data.areaId,
          gridCode: data.gridCode
        }).then(res => {
          this.netRequests()
        }).catch(e => {
        })
      },
      dealTagsData (data) {
        data.splice(0, 0, {
          'isValid': 1,
          'tagId': '',
          'tagName': '全部'
        })
        return data
      },
      editOnePanoClick (poiData, panoData) {
        this.showUpdateRukuDialog = true
        this.dataUpdateRukuDialogPoi = poiData
        this.dataUpdateRukuDialogPano = panoData
      },
      deleteOnePanoClick (id) {
        this.showAlert = true
      },
      editOnePoiClick (data) {
        this.showUpdatePoiDialog = true
        this.dataUpdatePoiDialog = data
      },
      ec (val) {
        this.isRegular = !val
        this.netRequestError(!this.isRegular)
      },
      searchChange () {
        this.searchName = this.searchInput
      },
      deletes () {
        if (this.trueViews.length > 0 || this.truePois.length > 0) {
          this.showAlert = true
          console.log(this.truePois)
        }
      },
      getChoosedIds () {
        let choosedId = []
        for (let i in this.truePois) {
          choosedId.push(this.truePois[i].viewIds[0])
        }
        return choosedId
      },
      tagJtClick () {
        if (this.tagContainerStyle.overflow === 'hidden') {
          this.tagContainerStyle.overflow = 'visible'
        } else {
          this.tagContainerStyle.overflow = 'hidden'
        }
      },
      poiCheck (param) {
        if (param.target === 'poi') {
          if (param.ss) { // flag 必定为true 将该poi添加进truepois，将剩余的view从trueviews中去除
            this.truePois.push({
              index: param.poiIndex,
              id: param.poiId,
              viewIndexs: param.viewIndexs,
              viewIds: param.viewIds
            })
            for (let i = 0; i < this.trueViews.length; i++) {
              let trueView = this.trueViews[i]
              if (trueView.poiIndex === param.poiIndex) {
                this.trueViews.splice(i--, 1)
              }
            }
          } else {
            for (let i = 0; i < this.truePois.length; i++) {
              let truePoi = this.truePois[i]
              if (param.poiIndex === truePoi.index) {
                this.truePois.splice(i--, 1)
                break
              }
            }
            if (param.flag) {
              this.truePois.push({
                index: param.poiIndex,
                id: param.poiId,
                viewIndexs: param.viewIndexs,
                viewIds: param.viewIds
              })
            }
          }
        } else {
          if (param.ss) { // 从truepois里去掉该poi，将该poi的剩余view转入trueviews
            let ssPoi = null
            for (let i = 0; i < this.truePois.length; i++) {
              let truePoi = this.truePois[i]
              if (param.poiIndex === truePoi.index) {
                ssPoi = this.truePois.splice(i--, 1)[0]
                break
              }
            }
            for (let i = 0; i < ssPoi.viewIndexs.length; i++) {
              let viewIndex = ssPoi.viewIndexs[i]
              if (param.viewIndexs[0] !== viewIndex) {
                this.trueViews.push({
                  poiIndex: ssPoi.index,
                  poiId: ssPoi.id,
                  viewIndex: viewIndex,
                  viewId: ssPoi.viewIds[i]
                })
              }
            }
          } else {
            for (let i = 0; i < param.viewIndexs.length; i++) {
              let viewIndex = param.viewIndexs[i]
              let viewId = param.viewIds[i]
              for (let j = 0; j < this.trueViews.length; j++) {
                let trueView = this.trueViews[j]
                if (!this.$utils.isEmpty(trueView)) {
                  if (trueView.poiIndex === param.poiIndex && trueView.viewIndex === viewIndex) {
                    this.trueViews.splice(j--, 1)
                    break
                  }
                }
              }
              if (param.flag) {
                this.trueViews.push({
                  poiIndex: param.poiIndex,
                  poiId: param.poiId,
                  viewIndex: viewIndex,
                  viewId: viewId
                })
              }
            }
          }
        }
        console.log('truePois = ' + JSON.stringify(this.truePois))
        console.log('trueViews = ' + JSON.stringify(this.trueViews))
      },
      cc (row, col, selectedCell, leftTopPoint, rightBottomPoint, isSelected) {
        this.gridCode = isSelected ? selectedCell : ''
        this.pageNum = 1
        console.log('cc')
      },
      netRequests (showFlag, setPoisNull) {
        if (setPoisNull === undefined || setPoisNull === true) {
          this.pois = null
          this.pageTotal = 0
        }
        this.$api.getPanoInfoCensus(this.poiSearchParam).then(res => {
          this.totalPoiCount = res.data.poiCount
          this.skyPoiCount = res.data.skyCount
          this.groundPoiCount = res.data.groundCount
        }).catch(e => {
        })
        if (showFlag === undefined || showFlag === true) {
          this.$api.searchPoiPage(this.poiSearchParam).then(res => {
            this.pois = res.data.list
            this.pageTotal = res.data.total
          }).catch(er => {
          })
        }
      },
      netRequestError (showFlag, setPoisNull) {
        if (setPoisNull === undefined || setPoisNull === true) {
          this.pois = null
          this.pageTotal = 0
        }
        this.$api.getErrorPois(this.errorPoiSearchParam).then(res => {
          this.exceptionText = res.data.total
          if (showFlag === undefined || showFlag === true) {
            this.pois = res.data.list
            this.pageTotal = res.data.total
          }
        }).catch(er => {
        })
      }
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../style/space";

  .dialog-poi {
    width: 700px;
    height: 700px;
    background: #fff;
    border-radius: 3px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .dialog-poi-top {
      height: 50px;
      background: #f5f5f5;
      display: flex;
      align-items: center;
    }
  }

  #head {
    height: $head-height;
    display: flex;
    justify-content: space-between;
    align-items: center;
    #head-title {
      font-size: 21px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      margin: 0;
      letter-spacing: 1.1px;
      color: #373737;
      .blue-span {
        color: #1bb1e6
      }
    }
    #all-select-head {
      display: flex;
      align-self: stretch;
      align-items: center;

      label {
        color: #888;
        font-size: 13px;
        font-weight: 300;
      }
      .delete-btn {
        font-size: 11.5px;
        border: 1px solid #ccc;
        border-radius: 2px;
        padding: 1px 3px;
        color: #ccc;
        margin-left: 12px;
        cursor: default;
      }
      .delete-btn-active {
        border: 1px solid #ef4a4a;
        color: #ef4a4a;
        cursor: pointer;
      }
    }

  }

  .search-bar {
    flex: 0 0 auto;
    display: flex;
    margin-bottom: 20px;
    .left-search {
      flex: 0 0 auto;
      .search-input {
        width: 200px;
        margin-right: 30px;
        border: solid 1px #808080;
      }
    }
    .right-tag {
      flex: 1 0 0;
      display: flex;
      align-items: center;
      height: 32px;
      .name {
        color: #888;
        font-size: 12.5px;
      }
      .tag-container {
        background: #F0F0F0;
        width: 350px;
        display: flex;
        flex-wrap: wrap;
        align-self: flex-start;
        align-items: flex-start;
        margin-top: 5px;
      }
      .tag-jt {
        color: #999;
        font-size: 10px;
        border: 1px solid #999;
        border-radius: 2px;
        padding: 1px;
      }
      .rotate {
        transform: rotate(180deg);
      }
    }
    .overflow-hidden {
      overflow: hidden;
    }
  }

</style>
