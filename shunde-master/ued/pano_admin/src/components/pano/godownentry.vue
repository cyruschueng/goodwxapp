<template xmlns:popover="http://www.w3.org/1999/xhtml" xmlns:v-popover="http://www.w3.org/1999/xhtml">
  <transition name="el-zoom-in-center">
    <div id="godownentry" class="compopup">
      <div class="compopup-header">
        <div class="headerText">
          <div>{{titleDialog}}</div>
        </div>
        <div class="modelClose cursor-pointer el-icon-close" @click="closeEvent"></div>
      </div>
      <div class="compopup-body">
        <div class="editPoiBox" v-show="isEditPoi">
          <div class="underLineText poiHeader">
            Poi信息
            <div class="poiHeaderBtns">
              <div class="colorText cursor-pointer" @click="closeEvent">取消</div>
              <div class="colorText cursor-pointer" :class="{disable: poiSaveDisable}" @click.stop="editSave"
                   v-text="editPoiInfo.id?'保存修改':'保存Poi信息'"></div>
            </div>
          </div>
          <div class="compopup-items">
            <div class="compopup-item">
              <div class="compopup-item-text">
                <div class="warn-text">Poi名称：</div>
              </div>
              <input class="compopup-item-flexText" placeholder="请输入poi名称" v-model="editPoiInfo.poiName"/>
              <div style="flex:1"/>
              <div style="flex:1"/>
            </div>
            <div class="compopup-item mapCellView">
              <div class="compopup-item-text">
                <div class="warn-text">网格号：</div>
              </div>
              <mapview class="map"
                       :show-head="map.showHead"
                       :show-grid-number="map.showGridNumber"
                       size="small"
                       v-model:cell-number="editPoiInfo.gridCode"
                       @cell-click="mapCellClick"/>
            </div>
            <div class="compopup-item">
              <div class="compopup-item-text">
                <div class="warn-text">经纬度：</div>
              </div>
              <div class="compopup-item-textcell-box">
                <div class="compopup-item-textcell compopup-item-textcell-select">
                  <el-select v-model="editPoiInfoName.coordsys" @change="exchangeSys" placeholder="请选择">
                    <el-option
                      v-for="(item, index) in getCoordsys"
                      :key="index"
                      :value="item.label">
                    </el-option>
                  </el-select>
                </div>
                <input class="compopup-item-textcell activeWord" placeholder="经度" v-model="editPoiInfo.lng"/>
                <input class="compopup-item-textcell activeWord" placeholder="纬度" v-model="editPoiInfo.lat"/>
              </div>
              <div class="lngLatPicker" v-show="coordsysPicker">
                <a :href="coordsysPicker" target="_blank">坐标拾取器</a>
              </div>
            </div>
            <div class="compopup-item">
              <div class="compopup-item-text"></div>
              <div class="compopup-item-textcell-box">
                <div class="compopup-item-textcell compopup-item-textcell-select">
                  <el-select v-model="editPoiInfoName.provinceId" @change="editPoiInfoNameProvince"
                             :placeholder="holderProvince">
                    <el-option
                      v-for="item in zone.provinceList"
                      :key="item.code"
                      :value="item.name">
                    </el-option>
                  </el-select>
                </div>
                <div class="compopup-item-textcell compopup-item-textcell-select">
                  <el-select v-model="editPoiInfoName.cityId" @change="editPoiInfoNameCity" :placeholder="holderCity">
                    <el-option
                      v-for="item in zone.cityList"
                      :key="item.code"
                      :value="item.name">
                    </el-option>
                  </el-select>
                </div>
                <div class="compopup-item-textcell compopup-item-textcell-select">
                  <el-select v-model="editPoiInfoName.countyId" @change="editPoiInfoNameCounty"
                             :placeholder="holderCounty">
                    <el-option
                      v-for="item in zone.countyList"
                      :key="item.code"
                      :value="item.name">
                    </el-option>
                  </el-select>
                </div>
                <div class="compopup-item-textcell compopup-item-textcell-select">
                  <el-select v-model="editPoiInfoName.areaId" @change="editPoiInfoNameArea" :placeholder="holderArea">
                    <el-option
                      v-for="item in zone.areaList"
                      :key="item.code"
                      :value="item.name">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <!-- <div class="lngLatPicker" v-show="coordsysPicker">
              <a :href="coordsysPicker" target="_blank">坐标拾取器</a>
            </div> -->
          </div>
        </div>
        <div class="relativePoiInfo" v-show="!isEditPoi">
          <div class="underLineText poiHeader">
            Poi信息
            <div class="poiHeaderBtns" v-show="!onlyRead">
              <div class="colorText cursor-pointer" style="display: none;">修改</div>
              <div class="colorText cursor-pointer" @click.stop="createPoi">新建Poi</div>
            </div>
          </div>
          <div class="compopup-items">
            <div class="compopup-item">
              <div class="compopup-item-text">
                <div class="warn-text">Poi归属：</div>
              </div>
              <div>
                <el-select class="selectPoi" :disabled="onlyRead" v-model="relativePoi" @change="exchangePoi"
                           placeholder="请选择">
                  <el-option
                    v-for="item in pois"
                    :key="item.id"
                    :label="item.label"
                    :value="item.name">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="compopup-item">
              <div class="compopup-item-text">
                <div class="warn-text">网格号：</div>
              </div>
              <div class="compopup-item-textcell-box">
                <div class="compopup-item-textcell" v-text="panoInfo.gridCode || '请先选择Poi归属'"></div>
              </div>
            </div>
            <div class="compopup-item">
              <div class="compopup-item-text">
                <div class="warn-text">经纬度：</div>
              </div>
              <div class="compopup-item-textcell-box">
                <div class="compopup-item-textcell" v-text="panoInfoName.coordsys"></div>
                <div class="compopup-item-textcell">
                  <div v-text="panoInfo.lng"></div>
                  <div v-show="!panoInfo.lng">经度</div>
                </div>
                <div class="compopup-item-textcell">
                  <div v-text="panoInfo.lat"></div>
                  <div v-show="!panoInfo.lat">纬度</div>
                </div>
              </div>
            </div>
            <div class="compopup-item">
              <div class="compopup-item-text"></div>
              <div class="compopup-item-textcell-box">
                <div class="compopup-item-textcell">
                  <div v-text="panoInfoName.provinceId"></div>
                  <div v-show="!panoInfoName.provinceId" v-text="holderProvince"></div>
                </div>
                <div class="compopup-item-textcell">
                  <div v-text="panoInfoName.cityId"></div>
                  <div v-show="!panoInfoName.cityId" v-text="holderCity"></div>
                </div>
                <div class="compopup-item-textcell">
                  <div v-text="panoInfoName.countyId"></div>
                  <div v-show="!panoInfoName.countyId" v-text="holderCounty"></div>
                </div>
                <div class="compopup-item-textcell">
                  <div v-text="panoInfoName.areaId"></div>
                  <div v-show="!panoInfoName.areaId" v-text="holderArea"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="underLineText" v-show="!isEditPoi">
          属性信息
        </div>
        <div class="compopup-half-items" v-show="!isEditPoi">
          <div class="compopup-half-item godownDirectionslectBox">
            <div class="compopup-item-text">
              <div class="warn-text">朝向：</div>
            </div>
            <directionselect
              class="godownDirectionslect"
              :onlyRead="onlyRead"
              @direction-change="updateDirection"
              :angle="panoInfo.direction"/>

            <el-popover ref="popover1" placement="top-start" width="200" trigger="hover"
                        content="拍摄的第一张照片与正北方向的夹角。"></el-popover>
            <div class="questionBox">
              <div class="question" v-popover:popover1></div>
            </div>
          </div>
          <div class="compopup-half-item">
            <div class="compopup-item">
              <div class="compopup-item-text">
                <div class="warn-text">拍摄方式：</div>
              </div>
              <div class="compopup-item-textcell compopup-item-textcell-select">
                <el-select v-model="panoInfoName.cameraType" placeholder="请选择" :disabled="onlyRead">
                  <el-option
                    v-for="(item, index) in getCameraType"
                    :key="index"
                    :value="item.label">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="compopup-item">
              <div class="compopup-item-text">
                <div class="warn-text">拍摄高度：</div>
              </div>
              <input class="compopup-item-flexText"
                     :class="{'cellDisable': onlyRead}"
                     type="number"
                     @input="limitInt"
                     v-bind:title="limitHeightTitle"
                     v-model="panoInfo.height"
                     v-bind:disabled="onlyRead"/>
              &nbsp;米
            </div>
            <div class="compopup-item">
              <div class="compopup-item-text">
                <div class="warn-text">拍摄人员：</div>
              </div>
              <input class="compopup-item-flexText"
                     :class="{'cellDisable': onlyRead}"
                     v-model="panoInfo.photographer"
                     v-bind:disabled="onlyRead"/>
            </div>
            <div class="compopup-item">
              <div class="compopup-item-text">
                <div class="warn-text">拍摄日期：</div>
              </div>
              <el-date-picker
                :disabled="onlyRead"
                type="datetime"
                v-model="datePicker"
                :default-value="datePicker"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </div>
        </div>
        <div class="compopup-items">
          <div class="panoTagContainerBox compopup-item">
            <div class="compopup-item-text panoTagContainerLeft">
              <div class="warn-text">标签：</div>
            </div>
            <div class="panoTagContainer">
              <div class="tagsItem" v-for="tag in panoTagsArr" v-text="tag"></div>
              <div class="tagsItem addTags cursor-pointer" v-show="!onlyRead" @click.stop="editTags">添加标签</div>
            </div>
          </div>
        </div>
        <div class="compopup-btns" v-show="!onlyRead" v-if="!isEditPoi">
          <div class="compopup-btn-cancel" @click.stop="closeEvent">取消</div>
          <div class="commonbtn" :class="{'commonbtn-disabled': !isSaveAble}" @click.stop="saveAndEntry">保存</div>
          <!-- <div class="commonbtn commonbtn-disabled" @click.stop="saveAndEntry">保存并入库</div> -->
        </div>
        <div class="compopup-btns" v-show="onlyRead">
          <div class="commonbtn" @click.stop="closeEvent">确认</div>
        </div>
      </div>
      <div class="mask" v-show="popup.tagseditor">
        <tagseditor :tags="panoTagsArr"
                    @save="saveTagsEditor"
                    @close="closeTagsEditor"
                    @choose-tag="addTag"
                    @dis-choose-tag="deleteTag"/>
      </div>
    </div>
  </transition>
</template>
<script>
  /**
   * <godownentry />
   */
  import directionselect from '../../components/common/directionselect.vue'
  import tagseditor from '../../components/pano/tagseditor'
  import mapview from '../../components/space/map'

  export default {
    name: 'godownentry',
    props: {
      text: null,
      onlyRead: false,
      editId: ''
    },
    created () {
      // 通用获取地理列表
      this.getCommonZone = (id, callback) => {
        this.$api.commonzone({
          upperCode: id
        }).then(res => {
          if (res.code === 0) {
            callback(res.data)
          }
        })
      }
      this.updateZoneList = (type = 'provinceList', data = []) => {
        this.zone[type] = {}
        data.forEach((value, index, arr) => {
          this.$set(this.zone[type], `${index + ''}`, value)
          this.zone.codeToZone[value.code] = value
        })
      }
      this.updateProvinceList = (data) => {
        this.updateZoneList('provinceList', data)
      }
      this.updateCityList = (data) => {
        this.updateZoneList('cityList', data)
      }
      this.updateCountyList = (data) => {
        this.updateZoneList('countyList', data)
      }
      this.updateAreaList = (data) => {
        this.updateZoneList('areaList', data)
      }
      this.refreshPoiList = () => {
        return new Promise((resolve, reject) => {
          this.$api.searchPoi({}).then(res => {
            if (res.code === 0) {
              this.pois = {}
              for (let i in res.data) {
                this.$set(this.pois, res.data[i].id, res.data[i])
              }
            }
            resolve()
          })
        })
      }
      this.refreshPoiList()
      // this.$store.dispatch('fetchPoiList', this)
    },
    mounted () {
    },
    data () {
      return {
        titleDialog: '修改入库单',
        isEditPoi: false,
        pois: {},
        poiSaveDisable: true,
        panoTagsArr: [],
        datePicker: +new Date(),
        isSaveAble: false,
        coordsysPicker: '',
        zone: {
          zoneCodeToList: {}, // code对对应list的缓存
          codeToZone: {}, // 整体code和name的对应
          provinceList: {}, // 当前省级列表
          cityList: {}, // 当前城市列表
          countyList: {}, // 当前区列表
          areaList: {} // 当前地区列表
        },
        popup: {
          tagseditor: false
        },
        map: {
          showHead: true,
          showGridNumber: false
        },
        panoInfo: {
          panoId: '',
          id: this.id,
          gridCode: null,
          poiId: '',
          coordsys: '1',
          lat: '',
          lng: '',
          provinceId: '',
          cityId: '',
          countyId: '',
          areaId: '',
          direction: 0,
          cameraType: '',
          height: '',
          photographer: '',
          photoTime: '',
          tag: '',
          isEntry: false
        },
        panoInfoName: {
          coordsys: '',
          provinceId: '',
          cityId: '',
          countyId: '',
          areaId: '',
          cameraType: ''
        },
        editPoiInfo: {
          id: '',
          poiName: '',
          lat: '',
          lng: '',
          provinceId: '',
          cityId: '',
          countyId: '',
          areaId: '',
          coordsys: '',
          gridCode: 'A1'
        },
        editPoiInfoName: {
          coordsys: '',
          cityId: '',
          countyId: '',
          areaId: ''
        }
      }
    },
    computed: {
      relativePoi () {
        let poi = this.pois[this.panoInfo.poiId]
        return (poi && poi.name) || ''
      },
      getCoordsys () {
        return this.$store.state.config.coordsys
      },
      getCameraType () {
        return this.$store.state.config.cameraType
      },
      holderProvince () {
        return this.$store.state.zone.province
      },
      holderCity () {
        return this.$store.state.zone.city
      },
      holderCounty () {
        return this.$store.state.zone.county
      },
      holderArea () {
        return this.$store.state.zone.area
      },
      limitHeightTitle () {
        return `最大拍摄高度${this.$store.state.config.limitPhotoHeight}为米`
      }
    },
    methods: {
      limitInt () {
        var height = parseInt(this.panoInfo.height)
        if (height > this.$store.state.config.limitPhotoHeight) {
          height = this.$store.state.config.limitPhotoHeight
          this.$message({
            showClose: true,
            message: this.limitHeightTitle,
            type: 'warning'
          })
        }
        this.panoInfo.height = height
      },
      fetchPanoInfo (id) {
        return new Promise((resolve, reject) => {
          this.$api.getPanoInfo({
            panoId: id
          }).then(res => {
            if (res.code === 0) {
              resolve(res.data)
            } else {
              this.$message({
                showClose: true,
                message: res.msg,
                type: 'warning'
              })
              resolve({})
            }
          })
        })
      },
      computeIsSaveAble () {
        if (!this.panoInfo.poiId) {
          // console.error(this.panoInfo.poiId)
          this.isSaveAble = false
          return
        }
        if (!this.panoInfo.cameraType) {
          // console.error(this.panoInfo.cameraType)
          this.isSaveAble = false
          return
        }
        if (this.panoInfo.height === undefined || isNaN(this.panoInfo.height) || this.panoInfo.height === null) {
          // console.error(this.panoInfo.height)
          this.isSaveAble = false
          return
        }
        if (!this.panoInfo.photographer) {
          // console.error(this.panoInfo.photographer)
          this.isSaveAble = false
          return
        }
        // if (!this.panoInfo.photoTime) {
        //   console.error(this.panoInfo.photoTime)
        //   this.isSaveAble = false
        //   return
        // }
        this.isSaveAble = true
        // console.log(this.isSaveAble)
      },
      getZoneByName (zoneName) {
        for (let i in this.zone.codeToZone) {
          if (this.zone.codeToZone[i].name === zoneName) {
            return this.zone.codeToZone[i]
          }
        }
      },
      mapCellClick (rowId, colId, selectNum) {
        this.editPoiInfo.gridCode = selectNum
      },
      getCoordsysText (coordsysId) {
        let res = ''
        for (let i in this.$store.state.config.coordsys) {
          if (this.$store.state.config.coordsys[i].value === coordsysId) {
            res = this.$store.state.config.coordsys[i].label
            break
          }
        }
        return res
      },
      getCameraTypeText (cameraTypeId) {
        // return this.$store.state.config.cameraType[cameraTypeId + '']
        let res = ''
        for (let i in this.$store.state.config.cameraType) {
          if (this.$store.state.config.cameraType[i].value === cameraTypeId) {
            res = this.$store.state.config.cameraType[i].label
            break
          }
        }
        return res
      },
      updateDirection (newAngle) {
        this.panoInfo.direction = newAngle
      },
      exchangePoi (poiName) {
        let poi = this.getPoiByName(poiName)
        if (poi) {
          for (let i in this.panoInfo) {
            if (poi.hasOwnProperty(i) && (i !== 'id')) {
              this.panoInfo[i] = poi[i]
            }
          }
          this.panoInfo.poiId = poi.id
        }
        this.updatePanoInfoCoordsys()
      },
      getPoiByName (poiName) {
        for (let i in this.pois) {
          if (this.pois[i].name === poiName) {
            return this.pois[i]
          }
        }
        return null
      },
      closeEvent () {
        this.isEditPoi = false
        this.$emit('close')
      },
      getSaveObj () {
        let res = {
          id: null,
          poiId: null,
          direction: 0,
          cameraType: 1,
          height: null,
          photographer: '',
          photoTime: +new Date(),
          tag: '',
          isEntry: false
        }
        for (let i in res) {
          res[i] = this.panoInfo[i]
        }
        return res
      },
      saveEvent () {
        if (this.isEditPoi) {
          this.$message('请保存编辑的Poi')
          return
        }
        this.panoInfo.isEntry = false
        this.panoInfo.photoTime = this.datePicker ? (+new Date(this.datePicker)) : (+new Date())
        this.$api.savePanoInfo(this.getSaveObj()).then(res => {
          if (res.code === 0) {
            this.$emit('save', this.panoId)
            this.$emit('close', this.panoId)
          }
        })
      },
      saveAndEntry () {
        if (this.isEditPoi) {
          this.$message('请保存编辑的Poi')
          return
        }
        this.panoInfo.isEntry = true
        this.panoInfo.photoTime = this.datePicker ? (+new Date(this.datePicker)) : (+new Date())
        this.$api.savePanoInfo(this.getSaveObj()).then(res => {
          if (res.code === 0) {
            // this.$store.commit('UPDATEPANOINFO', this.panoInfo)
            this.$emit('save-and-entry', this.panoId)
            this.$emit('close', this.panoId)
          }
        })
      },
      _updatePanoInfo (info = {}) {
        for (let i in this.panoInfo) {
          this.panoInfo[i] = info[i]
        }
        this.panoTagsArr = this.$utils.tagsSplit(this.panoInfo.tag)
        // console.error(this.panoInfo.tag, this.panoTagsArr)
        this.updatePanoInfoCoordsys()
        this.computeIsSaveAble()
      },
      updatePanoInfo () {
        // console.log(this.panoInfo.id)
        if (!this.panoInfo.id) {
          this._updatePanoInfo()
        } else {
          this.fetchPanoInfo(this.panoInfo.id).then((data) => {
            this._updatePanoInfo(data)
          })
        }
      },
      updatePanoCoordsysName () {
        if (this.panoInfo.provinceId && this.zone.codeToZone[this.panoInfo.provinceId]) {
          this.panoInfoName.provinceId = this.zone.codeToZone[this.panoInfo.provinceId].name
        }
        if (this.panoInfo.cityId && this.zone.codeToZone[this.panoInfo.cityId]) {
          this.panoInfoName.cityId = this.zone.codeToZone[this.panoInfo.cityId].name
        }
        if (this.panoInfo.countyId && this.zone.codeToZone[this.panoInfo.countyId]) {
          this.panoInfoName.countyId = this.zone.codeToZone[this.panoInfo.countyId].name
        }
        if (this.panoInfo.areaId && this.zone.codeToZone[this.panoInfo.areaId]) {
          this.panoInfoName.areaId = this.zone.codeToZone[this.panoInfo.areaId].name
        }
      },
      updatePanoInfoCoordsys () {
        this.panoInfoName.provinceId = ''
        this.panoInfoName.cityId = ''
        this.panoInfoName.countyId = ''
        this.panoInfoName.areaId = ''
        // 更新省
        this.getCommonZone(null, (data) => {
          this.updateProvinceList(data)
          this.updatePanoCoordsysName()
        })
        if (this.panoInfo.provinceId) {
          this.getCommonZone(this.panoInfo.provinceId, (data) => {
            this.updateCityList(data)
            this.updatePanoCoordsysName()
          })
        }
        if (this.panoInfo.cityId) {
          this.getCommonZone(this.panoInfo.cityId, (data) => {
            this.updateCountyList(data)
            this.updatePanoCoordsysName()
          })
        }
        if (this.panoInfo.countyId) {
          this.getCommonZone(this.panoInfo.countyId, (data) => {
            this.updateAreaList(data)
            this.updatePanoCoordsysName()
          })
        }
      },
      updateEditPoiCoordsysName () {
        if (this.editPoiInfo.provinceId && this.zone.codeToZone[this.editPoiInfo.provinceId]) {
          this.editPoiInfoName.provinceId = this.zone.codeToZone[this.editPoiInfo.provinceId].name
        }
        if (this.editPoiInfo.cityId && this.zone.codeToZone[this.editPoiInfo.cityId]) {
          this.editPoiInfoName.cityId = this.zone.codeToZone[this.editPoiInfo.cityId].name
        }
        if (this.editPoiInfo.countyId && this.zone.codeToZone[this.editPoiInfo.countyId]) {
          this.editPoiInfoName.countyId = this.zone.codeToZone[this.editPoiInfo.countyId].name
        }
        if (this.editPoiInfo.areaId && this.zone.codeToZone[this.editPoiInfo.areaId]) {
          this.editPoiInfoName.areaId = this.zone.codeToZone[this.editPoiInfo.areaId].name
        }
      },
      updateEditPoiCoordsys () {
        this.zone.cityList = {}
        this.zone.countyList = {}
        this.zone.areaList = {}
        // 更新省
        if (!this.editPoiInfo.provinceId) {
          this.editPoiInfoName.provinceId = ''
        } else {
          if (this.zone.codeToZone[this.editPoiInfo.provinceId]) {
            this.editPoiInfoName.provinceId = this.zone.codeToZone[this.editPoiInfo.provinceId].name
          } else {
            this.editPoiInfoName.provinceId = ''
            this.getCommonZone(null, (data) => {
              this.updateProvinceList(data)
              this.updateEditPoiCoordsysName()
            })
          }
        }

        // 更新城市
        if (this.zone.codeToZone[this.editPoiInfo.cityId]) {
          this.editPoiInfoName.cityId = this.zone.codeToZone[this.editPoiInfo.cityId].name
        } else {
          this.editPoiInfoName.cityId = ''
        }
        if (this.editPoiInfo.provinceId) {
          this.getCommonZone(this.editPoiInfo.provinceId, (data) => {
            this.updateCityList(data)
            this.updateEditPoiCoordsysName()
          })
        }
        // 更新区
        if (this.zone.codeToZone[this.editPoiInfo.countyId]) {
          this.editPoiInfoName.countyId = this.zone.codeToZone[this.editPoiInfo.countyId].name
        } else {
          this.editPoiInfoName.countyId = ''
        }
        if (this.editPoiInfo.cityId) {
          this.getCommonZone(this.editPoiInfo.cityId, (data) => {
            this.updateCountyList(data)
            this.updateEditPoiCoordsysName()
          })
        }
        // 更新区
        if (this.zone.codeToZone[this.editPoiInfo.areaId]) {
          this.editPoiInfoName.areaId = this.zone.codeToZone[this.editPoiInfo.areaId].name
        } else {
          this.editPoiInfoName.areaId = ''
        }
        if (this.editPoiInfo.countyId) {
          this.getCommonZone(this.editPoiInfo.countyId, (data) => {
            this.updateAreaList(data)
            this.updateEditPoiCoordsysName()
          })
        }
      },
      editPoi () {
        this.isEditPoi = true
      },
      createPoi () {
        this.editPoiInfo.id = ''
        this.isEditPoi = true
      },
      // 编辑poi
      exchangeSys (coordsys) {
        let picker = ''
        for (let i in this.$store.state.config.coordsys) {
          if (this.$store.state.config.coordsys[i].label === coordsys) {
            this.editPoiInfo.coordsys = this.$store.state.config.coordsys[i].value
            picker = this.$store.state.config.coordsys[i].picker
            break
          }
        }
        this.coordsysPicker = picker
      },
      poiSaveDisableHandler () { // 判断poi是否可以保存
        this.poiSaveDisable = true
        if (!this.editPoiInfo.poiName) {
          // this.$message('请填写Poi名字')
          return
        }
        if (!this.editPoiInfo.gridCode) {
          // this.$message('请选择Poi所属网格')
          return
        }
        if (!this.editPoiInfo.coordsys) {
          // this.$message('请选择坐标系')
          return
        }
        if (!this.editPoiInfo.lat || !this.editPoiInfo.lng) {
          // this.$message('请填写经纬度')
          return
        }
        this.poiSaveDisable = false
      },
      editCancel () {
        this.isEditPoi = false
      },
      editSave () {
        // 保存poi
        if (this.poiSaveDisable) return
        this.$api[this.editPoiInfo.id ? 'updatePoi' : 'createPoi'](this.editPoiInfo).then(res => {
          if (res.code === 0) {
            if (res.data && res.data.id && !this.editPoiInfo.id) {
              this.editPoiInfo.id = res.data.id
            }
            this.refreshPoiList().then(() => {
              // console.log(this.editPoiInfo.id, this.pois)
              // this.panoInfo.poiId = this.editPoiInfo.id
              // this.panoInfoName.poiId = this.editPoiInfo.poiName
              this.updatePanoInfo()
              this.isEditPoi = false
              this.closeEvent()
            })
          }
        })
      },
      editPoiInfoNameProvince (newValue) {
        let provinceZone = this.getZoneByName(newValue)
        // console.log(newValue, provinceZone)
        if (provinceZone && provinceZone.code) {
          this.editPoiInfo.provinceId = provinceZone.code
        }
        this.editPoiInfo.cityId = ''
        this.editPoiInfo.countyId = ''
        this.editPoiInfo.areaId = ''
        this.updateEditPoiCoordsys()
      },
      editPoiInfoNameCity (newValue) {
        let cityZone = this.getZoneByName(newValue)
        if (cityZone && cityZone.code) {
          this.editPoiInfo.cityId = cityZone.code
        }
        this.editPoiInfo.countyId = ''
        this.editPoiInfo.areaId = ''
        this.updateEditPoiCoordsys()
      },
      editPoiInfoNameCounty (newValue) {
        let countyZone = this.getZoneByName(newValue)
        if (countyZone && countyZone.code) {
          this.editPoiInfo.countyId = countyZone.code
        }
        this.editPoiInfo.areaId = ''
        this.updateEditPoiCoordsys()
      },
      editPoiInfoNameArea (newValue) {
        let areaZone = this.getZoneByName(newValue)
        if (areaZone && areaZone.code) {
          this.editPoiInfo.areaId = areaZone.code
        }
        this.updateEditPoiCoordsys()
      },
      // 编辑标签
      closeTagsEditor () {
        this.panoTagsArr = this.$utils.tagsSplit(this.panoInfo.tag)
        this.popup.tagseditor = false
      },
      saveTagsEditor () {
        this.panoInfo.tag = this.$utils.tagsJoin(this.panoTagsArr)
        this.popup.tagseditor = false
      },
      addTag (tagName) {
        // console.log('添加tag', tagName)
        this.panoTagsArr.push(tagName)
      },
      deleteTag (tagName) {
        // console.log('删除tag', tagName)
        for (let i = 0, len = this.panoTagsArr.length; i < len; i++) {
          if (tagName === this.panoTagsArr[i]) {
            this.panoTagsArr.splice(i, 1)
            break
          }
        }
      },
      editTags () {
        this.popup.tagseditor = true
      }
    },
    watch: {
      // panoId (newValue) { // 入库单
      //   if (this.panoInfo.panoId !== newValue) {
      //     this.panoInfo.panoId = newValue
      //     this.updatePanoInfo(newValue)
      //   }
      // },
      isEditPoi () {
        if (this.isEditPoi === true) {
          this.titleDialog = '新建Poi'
        } else {
          this.titleDialog = '修改入库单'
        }
      },
      editId (newValue) {
        this.panoInfo.id = newValue
        this.updatePanoInfo()
      },
      'panoInfo.poiId' () {
        this.computeIsSaveAble()
      },
      'panoInfo.coordsys' (value) {
        this.panoInfoName.coordsys = this.getCoordsysText(this.panoInfo.coordsys)
        this.computeIsSaveAble()
      },
      'panoInfo.cameraType' () {
        this.panoInfoName.cameraType = this.getCameraTypeText(this.panoInfo.cameraType)
        this.computeIsSaveAble()
      },
      'panoInfo.photoTime' () {
        this.datePicker = new Date(this.panoInfo.photoTime || +new Date())
        this.computeIsSaveAble()
      },
      'panoInfo.direction' () {
        this.computeIsSaveAble()
      },
      'panoInfo.height' () {
        this.computeIsSaveAble()
      },
      'panoInfo.photographer' () {
        this.computeIsSaveAble()
      },
      'panoInfo.tags' () {
        this.computeIsSaveAble()
      },
      'panoInfoName.cameraType' () {
        for (let i in this.$store.state.config.cameraType) {
          if (this.$store.state.config.cameraType[i].label === this.panoInfoName.cameraType) {
            this.panoInfo.cameraType = this.$store.state.config.cameraType[i].value
            break
          }
        }
        this.computeIsSaveAble()
      },
      // 编辑poi
      'editPoiInfo.id' (newValue) {
        let poiInfo = this.pois[newValue] || {}
        // 更新poi信息
        for (let i in this.editPoiInfo) {
          if (i === 'coordsys') {
            this.$set(this.editPoiInfo, i, poiInfo[i] || 1)
            continue
          }
          if (i === 'gridCode') {
            this.$set(this.editPoiInfo, i, poiInfo[i] || 'A1')
            continue
          }
          if (i === 'poiName') {
            this.$set(this.editPoiInfo, 'poiName', poiInfo['name'] || '')
            continue
          }
          this.$set(this.editPoiInfo, i, poiInfo[i] || '')
        }
        // console.log(this.editPoiInfo)
        this.updateEditPoiCoordsys()
      },
      'editPoiInfo.poiName' () {
        this.poiSaveDisableHandler()
      },
      'editPoiInfo.coordsys' (newValue) {
        this.poiSaveDisableHandler()
        this.editPoiInfoName.coordsys = this.getCoordsysText(newValue)
      },
      'editPoiInfo.lat' () {
        this.poiSaveDisableHandler()
      },
      'editPoiInfo.lng' () {
        this.poiSaveDisableHandler()
      },
      'editPoiInfo.gridCode' () {
        this.poiSaveDisableHandler()
      }
    },
    components: {
      tagseditor,
      directionselect,
      mapview
    }
  }
</script>

<style lang="scss">
  $color1b: #1bb1e6;
  $colorb9: #b9b9b9;
  $color6f: #6f6f6f;

  #godownentry {
    width: 640px;
    .selectPoi input {
      height: 28px;
    }
    .compopup-body {
      max-height: 600px;
      overflow-y: auto;
    }
    input {
      outline: none;
    }
    .compopup-header {
      display: flex;
      justify-content: space-between;
      .headerText, .modelClose {
        display: flex;
        align-items: center;
      }
    }
    .compopup-btns {
      margin-top: 16px;
    }
    .poiHeaderBtns {
      display: flex;
      font-size: 0.8em;
      > div {
        margin-right: 8px;
      }
    }
    .question {
      margin-left: 8px;
    }
    .godownDirectionslectBox {
      display: flex;
    }
    .godownDirectionslect {
      display: flex;
      flex: 1;
    }
    .questionBox {
      height: 30px;
      display: flex;
      width: 40px;
      align-items: center;
    }
    .panoTagContainerBox {
      align-items: center;
      .panoTagContainer {
        display: flex;
        flex-wrap: wrap;
        font-size: 12px;
        .tagsItem {
          margin: 2px 10px 2px 0;
          display: flex;
          align-items: center;
          border-radius: 2px;
          padding: 0 8px;
          color: $color6f;
          border: 1px solid $color6f;
          user-select: none;
        }
        .tagsItem.addTags {
          border-radius: 10px;
          padding: 0 10px;
          color: $color1b;
          border: 1px solid $color1b;
        }
      }
    }
    .mapCellView {
      align-items: start;
      margin: 20px 0 0;
      // .map{
      //   margin-left: -25px;
      // }
    }
    .lngLatPicker {
      display: flex;
      flex: 1;
      text-align: right;
      a {
        color: #1bb1e6;
        font-size: 12px;
        border-bottom: 1px solid;
      }
    }
    /**mask*/
    .mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>

