<template>
  <div id="panolist">
    <div class="panolistContainer">
      <div class="header">
        <div>
          <div class="menus">
            <router-link :class="{active: item.isActive}" v-for="item in header.menus" :to="{ path: item.path }">
              {{item.text}}
            </router-link>
          </div>
          <div class="center">
            <div class="inputBox-list">
              <el-input :placeholder="header.search.placeholder" v-model='searchWord' @change="refresh"
                        suffix-icon="el-icon-search"
                        size="small" style="padding-left:10px; height: 23px;width: 200px"/>
            </div>
          </div>
          <div class="right" v-show="header.btnText">
            {{header.btnText}}
          </div>
          <div @click.stop="showPopup" v-show="showPopupCtrl">
            <bordertext :text="template"/>
          </div>
        </div>
      </div>
      <div class="body">
        <div id="tHeader">
          <div class="left tagChooseBox">
            <div class="tagChooseLabel">全部标签：</div>
            <tagselector @change="tagChooseChange" :lists="panoTagList"/>
          </div>
          <div class="center"/>
          <div class="right selectAllBox" v-show="generalUser">
            <el-checkbox id="selectAll" label="全选" name="type" v-model="selectAll"></el-checkbox>
            <div id="deleteAll" @click="deleteBatch">批量删除</div>
          </div>
        </div>
        <div id="tBody">
          <div class="tbodyContainer">
            <div class="poiItem" v-for="(poi, index) in pois">
              <div class="poiItemHeader cursor-pointer" @click="changeOpened(index)">
                <div class="poiItemNameAndLen">
                  <div class="poiItemName" v-text="poi.name"></div>
                  <div class="poiItemLen" v-show="poi.panoLength">(共 {{poi.panoLength}} 张) </div>
                </div>
                <div class="poiItemIcon el-icon-arrow-right" :class="{opened: poi.isOpened}"></div>
              </div>
              <div class="panoListBox" :class="{padding: poi.panoLength, heightMin: !poi.isOpened && poi.panoLength}">
                <div class="panoItem" v-for="pano in poi.panos">
                  <panoitem
                    :name="pano.name"
                    :time="pano.photoTime"
                    :img="pano.thumbnail"
                    :choosed="pano.choosed"
                    :panoId="pano.panoId"
                    :id="pano.id"
                    :isStatic="isStatic"
                    @edit="editPanoById(pano.id, pano)"
                    @delete="deletePanoById"
                    @choosed-change="choosedChangeHandler"/>
                </div>
              </div>
            </div>
          </div>
          <compagenumber class="pagenumberBox"
                         :pagenumber="pageNumber"
                         :totalnumber="pageTotal"
                         v-on:number-change-to="changePageNumber"/>
        </div>
      </div>
    </div>
    <div class="mask" v-show="popup.template || popup.godownentry">
      <compoptemplate v-on:popup-close="popupClose" v-show="popup.template"/>
      <!-- onlyRead -->
      <godownentry
        v-show="popup.godownentry"
        :onlyRead="godownentryOnlyRead"
        class="popupGodownentry transform-center"
        :editId="editPaonId"
        @close="popupClose"/>
    </div>
  </div>
</template>

<script>
  import compoptemplate from '@/components/common/compoptemplate'
  import bordertext from '@/components/common/bordertext'
  import panoitem from '@/components/pano/panoitem'
  import compagenumber from '@/components/common/compagenumber'
  import godownentry from '@/components/pano/godownentry'
  import tagselector from '@/components/common/tagselector1'

  import {list} from './config'

  export default {
    name: 'mosaic',
    components: {
      compoptemplate,
      bordertext,
      panoitem,
      compagenumber,
      godownentry,
      tagselector
    },
    created () {
      this.getTags()
      this.header = list.header
      this.refresh = () => {
        this.fetchList(this.pageNumber, this.pageSize, this.updateList)
      }
      this.fetchList = (number, size, call = () => {
      }) => {
        // setTimeout(() => {
        //   call(list.lists, list.lists.length, number)
        // }, 200)
        this.$api.searchPoiPageForPano({
          searchName: this.searchWord,
          pageSize: size,
          pageNum: number,
          tag: this.tagName,
          areaId: null,
          gridCode: null
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
        panoTagList: [],
        isStatic: true,
        editPaonId: '',
        godownentryOnlyRead: false,
        template: '通用弹窗',
        showPopupCtrl: false,
        pois: {},
        pageNumber: 1,
        pageTotal: 0,
        pageSize: 10,
        tagName: '',
        popup: {
          template: false,
          godownentry: false
        },
        header: {},
        searchWord: '',
        selectAll: false
      }
    },
    computed: {
      generalUser () {
        return this.$store.state.userInfo.generalUser
      }
    },
    watch: {
      selectAll () {
        for (let i in this.pois) {
          for (let j in this.pois[i].panos) {
            this.pois[i].panos[j].choosed = this.selectAll
          }
        }
      }
    },
    methods: {
      getTags () {
        this.$api.searchTag({
          searchName: ''
        }).then(res => {
          if (res.code === 0) {
            this.panoTagList = res.data.list
          }
        })
      },
      showPopup () {
        this.popup.template = true
      },
      popupClose () {
        this.popup.template = false
        this.popup.godownentry = false
      },
      editPanoById (id, panoInfo) {
        // this.$store.commit('UPDATEPANOINFO', panoInfo)
        this.editPaonId = id
        this.popup.godownentry = true
      },
      choosedChangeHandler (choosed, panoId, poiId, cell) {
        for (let i in this.pois) {
          for (let j in this.pois[i].panos) {
            if (this.pois[i].panos[j].panoId === panoId) {
              this.pois[i].panos[j].choosed = choosed
              break
            }
          }
        }
      },
      deletePanoById (panoId) {
        this.$api.deletePanoInfo({
          panoId: panoId
        }).then(res => {
          if (res.code === 0) {
            this.$message('删除成功')
            this.refresh()
          }
        })
      },
      getChoosedPano () {
        let panos = []
        for (let i in this.pois) {
          for (let j in this.pois[i].panos) {
            this.pois[i].panos[j].choosed && panos.push(this.pois[i].panos[j].id)
          }
        }
        return panos
      },
      deleteBatch () {
        let panos = this.getChoosedPano().join(',')
        if (!panos) {
          this.$message('尚未所需删除的全景图片')
          return
        }
        this.$api.deletePanoInfoBatch({
          panoIds: panos
        }).then(res => {
          if (res.code === 0) {
            this.$message('删除成功')
            this.refresh()
          }
        })
      },
      checkFetchPoiPano (poiId, key) {
        // 获取poi对应的全景
        this.$api.getPanoInfoListByPoi({
          poiId: poiId,
          tag: this.tagName
        }).then(res => {
          if (res.code === 0) {
            this.$set(this.pois[key], 'panos', {})
            for (let i in res.data) {
              this.$set(this.pois[key]['panos'], i, res.data[i])
            }
            // for (let i in [1, 2, 3, 4, 5, 6, 7]) {
            //   this.$set(this.pois[key]['panos'], i, res.data[0])
            // }
            this.pois[key].panoLength = res.data.length || 0
          }
        })
      },
      changeOpened (key) {
        if (!this.pois[key].isOpened && !this.pois[key].panos) {
          this.checkFetchPoiPano(this.pois[key].id, key)
        }
        this.$set(this.pois[key], 'isOpened', !this.pois[key].isOpened)
      },
      changePageNumber (number) {
        this.pageNumber = number
        this.refresh()
      },
      updateList (pois, total, number) {
        this.pois = {}
        this.$nextTick(() => {
          for (let i in pois) {
            this.$set(this.pois, i, pois[i])
            this.checkFetchPoiPano(pois[i].id, i)
          }
        })
        this.total = total
        this.pageNumber = number
        this.pageTotal = Math.ceil(this.total / this.pageSize)
      },
      // tag 选择改变
      tagChooseChange (tags) {
        this.tagName = tags
        this.refresh()
      }
    }
  }
</script>

<style lang="scss">
  $margin: 24px;
  $commonColor: #1bb1e6;
  $color9b: #9b9b9b;
  $colorde: #dedede;
  $color6f: #6f6f6f;
  $itemHeight: 188px;
  $marginTop: 15px;
  $itemMarginBottom: 20px;

  #panolist {
    font-size: 13px;
    position: relative;
    .panolistContainer {
      position: absolute;
      min-height: 100%;
      display: flex;
      flex-flow: column nowrap;
      width: 100%;
    }
    // input{
    //   border: none;
    //   outline: none;
    // }
    .heightMin {
      height: $itemHeight + $itemMarginBottom;
    }
    /*header*/
    .panolistContainer > .header {
      margin: 0 $margin;
      padding: 20px 0px;
      border-bottom: 1px solid #dedede;
      > div {
        display: flex;
        flex-wrap: nowrap;
        height: 24px;
      }
      .menus {
        display: flex;
        flex-wrap: nowrap;
        border: 1px solid $commonColor;
        border-radius: 2px;
        a {
          display: flex;
          align-items: center;
          padding: 0 4px;
          color: $commonColor;
        }
        :not(:last-child) {
          border-right: 1px solid $commonColor;
        }
        a.active, a:hover {
          background: $commonColor;
          color: #fff;
        }
      }
      .center {
        flex: 1;
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        .inputBox-list {
          border: 1px solid #9b9b9b;
          border-radius: 2px;
          overflow: hidden;
          display: flex;
          flex-wrap: nowrap;
          flex-flow: row;
          .el-input__inner {
            border-color: #FFF;
            padding: 0px;
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
        input {
          height: 23px;
          flex: 1;
        }
        .el-input--small .el-input__icon {
          line-height: 20px;
        }
      }
      .right {
        color: $commonColor;
        border-radius: 12px;
        border: 1px solid $commonColor;
        padding: 0 20px;
        display: flex;
        align-items: center;
        font-size: 12px;
        &:hover {
          color: #fff;
          background: $commonColor;
        }
      }
    }
    .body {
      flex: 1;
      display: flex;
      flex-flow: column nowrap;
    }
    .tagChooseBox {
      display: flex;
      height: 24px;
      z-index: 2;
      align-items: center;
      .tagChooseLabel {
        display: flex;
        align-items: center;
      }
    }

    /*tHeader*/
    #tHeader {
      margin: 8px $margin;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      position: relative;
      .left {
        color: $color9b;
      }
      .center {
        flex: 1;
        color: $color9b;
      }
      .right {
        display: flex;
        flex-flow: row nowrap;
        > div {
          padding: 2px 8px;
          border-radius: 4px;
        }
        #startAll {
          background: $commonColor;
          color: #fff;
          margin-right: 5px;
          cursor: pointer;
        }
        #deleteAll {
          color: #ef4a4a;
          border: 1px solid #ef4a4a;
          cursor: pointer;
        }
        #selectAll {
          margin-right: 10px;
        }
        .selectAllBox {
          display: flex;
          align-items: center;
        }
      }
    }

    /*tBody*/
    #tBody {
      margin: 0 $margin;
      background: #f0f0f0;
      padding: 10px 10px 10px;
      flex: 1;
      display: flex;
      flex-flow: column nowrap;
      .tbodyContainer {
        display: flex;
        flex-flow: column nowrap;
        flex: 1;
        align-content: baseline;
        .poiItem {
          display: flex;
          flex-flow: column nowrap;
          .poiItemHeader {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid $colorde;
            padding: 5px 0;
            color: $color6f;
            height: 30px;
            align-items: center;
            .poiItemNameAndLen {
              display: flex;
              align-items: baseline;
            }
            .poiItemLen {
              align-items: baseline;
              opacity: 0.5;
            }
            .poiItemLen {
              margin-left: 10px;
              font-size: 0.8em;
            }
            .poiItemIcon {
              transition: transform 200ms;
              transform-origin: 50% 50%;
              width: 13px;
              height: 13px;
            }
            .poiItemIcon.opened {
              transform: rotateZ(90deg);
            }
          }
          .panoListBox {
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            // transition: opacity 120ms ease-out;
            // opacity:0;
          }
          // .panoListBox.opacityAni{
          //   opacity:1;
          // }
          .panoListBox.padding {
            margin: $marginTop 0;
          }
        }
      }
      .panoItem {
        display: flex;
        justify-content: center;
        margin-bottom: $itemMarginBottom;
        width: 25%;
      }
      // 245
      @media screen and (min-width: 1180px) {
        .panoItem {
          width: 20%;
        }
      }
      @media screen and (min-width: 980px) and (max-width: 1180px) {
        .panoItem {
          width: 25%;
        }
      }
      @media screen and (max-width: 980px) {
        .panoItem {
          width: 33.33%;
        }
      }
      .pagenumberBox {
        margin: 10px 0 50px;
      }
    }

    /*el*/
    #selectAll .el-checkbox__label {
      color: $color9b;
    }

    .mask {
      position: fixed;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
  }
</style>
