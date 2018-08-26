<template>
  <my-dialog v-if="selfShow">
    <div class="dialog-container">
      <div class="dialog-head">
        <span class="dialog-head-title">修改Poi和全景关联关系</span>
        <i class="iconfont icon-guanbi dialog-close" @click="closeButNotSave"></i>
      </div>
      <div class="dialog-body">
        <div class="dialog-title-bar">
          <p class="title">Poi信息</p>
        </div>
        <div class="dialog-body-top" v-if="isUpdatePoi">
          <div class="row">
            <div class="row-title"><h3>Poi名称：</h3></div>
            <el-select class="selectPoi" v-model="tempPoiData.name" style="width: 250px;" @change="exchangePoi"
                       placeholder="请选择">
              <el-option
                v-for="item in pois"
                :key="item.id"
                :label="item.label"
                :value="item.name">
              </el-option>
            </el-select>
            <!--<div class="row-content"><h3>{{tempPoiData.name}}</h3></div>-->
          </div>
          <div class="row">
            <div class="row-title"><h3>格网号：</h3></div>
            <div class="row-content" style="position: relative">
              <div style="position: absolute;width: 50%;height: 100%; background: #808080; opacity: 0.5; z-index: 1000;" @click.stop=""/>
              <map-view :show-head="showMapHead" size="small" v-model="tempPoiData.gridCode"></map-view>
            </div>
          </div>
          <div class="row">
            <div class="row-title"><h3>经纬度：</h3></div>
            <div class="row-content jwd-container">
              <div class="jwd">
                <el-select disabled v-model="tempPoiData.coordsys" placeholder="地图坐标系" size="small" class="jwd-son">
                  <el-option
                    v-for="coordsys in $store.state.config.coordsys"
                    :label="coordsys.label"
                    :value="coordsys.value">
                  </el-option>
                </el-select>
                <el-input disabled
                  size="small"
                  class="jwd-son"
                  v-model="tempPoiData.lng">
                </el-input>
                <el-input disabled
                  size="small"
                  class="jwd-son"
                  v-model="tempPoiData.lat">
                </el-input>
                <div class="jwd-son za">
                  <div class="circle-wenhao">?</div>
                </div>
              </div>
              <div class="jwd">
                <el-select disabled class="jwd-son" v-model="tempSelectedProvince" :placeholder="$store.state.zone.province" size="small" @change="tempProvinceChange">
                  <el-option
                    v-for="item in provinces"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
                <el-select disabled class="jwd-son" v-model="tempSelectedCity" :placeholder="$store.state.zone.city" size="small"  @change="tempCityChange">
                  <el-option
                    v-for="item in tempCitys"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
                <el-select disabled class="jwd-son" v-model="tempSelectedCounty" :placeholder="$store.state.zone.county" size="small"  @change="tempCountyChange">
                  <el-option
                    v-for="item in tempCountys"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
                <el-select disabled class="jwd-son" v-model="tempSelectedArea" :placeholder="$store.state.zone.area" size="small">
                  <el-option
                    v-for="item in tempAreas"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog-body-top" v-if="!isUpdatePoi">
          <div class="row">
            <div class="row-title"><h3>Poi归属：</h3></div>
          </div>
          <div class="row">
            <div class="row-title"><h3>格网号：</h3></div>
            <div class="row-content">
              <el-input
                size="small"
                placeholder="G10"
                class="disable-input"
                v-model="selfPoiData.gridCode"
                :disabled="true">
              </el-input>
            </div>
          </div>
          <div class="row">
            <div class="row-title"><h3>经纬度：</h3></div>
            <div class="row-content row-input">
              <el-select v-model="selfPoiData.coordsys" placeholder="地图坐标系" size="small" class="disable-input" disabled>
                <el-option
                  v-for="coordsys in $store.state.config.coordsys"
                  :label="coordsys.label"
                  :value="coordsys.value">
                </el-option>
              </el-select>
              <el-input
                size="small"
                class="disable-input"
                v-model="selfPoiData.lng"
                disabled>
              </el-input>
              <el-input
                size="small"
                class="disable-input"
                v-model="selfPoiData.lat"
                disabled>
              </el-input>
              <div class="row-input-son">
                <div class="circle-wenhao">?</div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="row-title"><h3></h3></div>
            <div class="row-content row-input">
              <el-select class="disable-input" disabled v-model="selectedProvince" :placeholder="$store.state.zone.province" size="small" @change="provinceChange">
                <el-option
                  v-for="item in provinces"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
              <el-select class="disable-input" disabled v-model="selectedCity" :placeholder="$store.state.zone.city" size="small"  @change="cityChange">
                <el-option
                  v-for="item in citys"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
              <el-select class="disable-input" disabled v-model="selectedCounty" :placeholder="$store.state.zone.county" size="small"  @change="countyChange">
                <el-option
                  v-for="item in countys"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
              <el-select class="disable-input" disabled v-model="selectedArea" :placeholder="$store.state.zone.area" size="small">
                <el-option
                  v-for="item in areas"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="dialog-body-bottom">
          <div class="dialog-title-bar">
            <p class="title">属性信息</p>
          </div>
          <div class="row">
            <div class="row-title"><h3><span class="xing">*</span>朝向：</h3></div>
            <div class="row-content chaoxiang-container">
              <div class="chaoxiang-son cx-box-container">
                <directionselect @direction-change="directionChange"  :angle="selfPanoData.direction"/>
                <div class="circle-wenhao">?</div>
                <div style="position: absolute;width: 90%;height: 100%; background: #808080; opacity: 0.5; z-index: 1000;" @click.stop=""/>
              </div>
              <div class="chaoxiang-son cx-input-container">
                <div class="input-row">
                  <div class="input-row-left">
                    <h3><span class="xing">*</span>拍摄方式：</h3>
                  </div>
                  <div class="input-row-right">
                    <el-select disabled class="jwd-son" v-model="selfPanoData.cameraType" placeholder="请选择" size="small">
                      <el-option
                        v-for="cameraType in $store.state.config.cameraType"
                        :label="cameraType.label"
                        :value="cameraType.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="input-row">
                  <div class="input-row-left">
                    <h3><span class="xing">*</span>拍摄高度：</h3>
                  </div>
                  <div class="input-row-right">
                    <el-input disabled class="jwd-son" v-model="selfPanoData.height" placeholder="请输入拍摄高度" size="small"></el-input>
                  </div>
                </div>
                <div class="input-row">
                  <div class="input-row-left">
                    <h3><span class="xing">*</span>拍摄人员：</h3>
                  </div>
                  <div class="input-row-right">
                    <el-input disabled class="jwd-son" v-model="selfPanoData.photographer" placeholder="请输入拍摄人员" size="small"></el-input>
                  </div>
                </div>
                <div class="input-row">
                  <div class="input-row-left">
                    <h3><span class="xing">*</span>拍摄日期：</h3>
                  </div>
                  <div class="input-row-right">
                    <el-date-picker disabled
                      class="date-time-picker"
                      v-model="v"
                      type="datetime"
                      placeholder="选择日期时间"
                      align="right"
                      size="small"
                      :picker-options="pickerOptions1">
                    </el-date-picker>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="row-title"><h3><span class="xing">*</span>标签：</h3></div>
            <div class="row-content tags">
              <btn v-for="(tag,index) in tags" :text="tag" class="tag"></btn>
              <btn class="add-tag" text="添加标签" @click.stop=""></btn>
            </div>
          </div>
        </div>
        <div class="btn-bar ruku-btn-bar">
          <btn text="取消" class="btn cancel" @click="closeButNotSave"></btn>
          <btn text="保存" class="btn save" @click="closeAndSave"></btn>
        </div>
      </div>
    </div>
  </my-dialog>
</template>
<script>
  import myDialog from '../myDialog.vue'
  import mapView from '../map.vue'
  import btn from '../../btn.vue'
  import directionselect from '../../../components/common/directionselect.vue'
  export default {
    components: {myDialog, mapView, btn, directionselect},
    created () {
      this.$api.commonzone().then(res => {
        this.provinces = this.dealOriginData(res.data)
        this.isUpdatePoi = true
      }).catch(e => {
      })
      this.$api.searchPoi({}).then(res => {
        if (res.code === 0) {
          this.pois = {}
          for (let i in res.data) {
            this.$set(this.pois, res.data[i].id, res.data[i])
          }
        }
      })
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      poiData: {
        type: Object,
        default () {
          return null
        }
      },
      panoData: {
        type: Object,
        default () {
          return null
        }
      }
    },
    data () {
      return {
        pois: {},
        selfShow: this.value,
        selfPoiData: {
          id: '',
          name: '',
          gridCode: '',
          lat: 0,
          lng: 0,
          isValid: 1,
          provinceId: '',
          cityId: '',
          countyId: '',
          areaId: ''
        },
        selfPanoData: {
          panoId: '',
          creatorId: '',
          description: '',
          cityId: '',
          updateId: '',
          countyId: '',
          photographer: '',
          id: '',
          poiId: '',
          tag: '',
          lnglat: '',
          lat: '',
          lng: '',
          direction: 0,
          height: 0,
          thumbnail: '',
          isValid: 1,
          createTime: 0,
          updateTime: 0,
          photoTime: 0,
          isFinish: 1,
          provinceId: '',
          cameraType: 1,
          areaId: '',
          name: '',
          coordsys: 1
        },
        tempPoiData: {},
        tempPanoData: {},
        showMapHead: true,
        mapCellNumber: '',
        isUpdatePoi: true,
        input: 'xxx',
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        },
        value2: '',
        provinces: [],
        citys: [],
        countys: [],
        areas: [],
        tempCitys: [],
        tempCountys: [],
        tempAreas: []
      }
    },
    watch: {
      value (val) {
        this.selfShow = val
      },
      selfShow (val) {
        this.$emit('input', val)
      },
      poiData (v) {
        this.selfPoiData = this.$utils.shallowCopy(v)
        this.updatePoiClick()
      },
      panoData (v) {
        this.selfPanoData = this.$utils.shallowCopy(v)
      },
      selectedProvince (v) {
        this.$api.commonzone({
          upperCode: v
        }).then(res => {
          this.citys = this.dealOriginData(res.data)
        }).catch(e => {
        })
      },
      selectedCity (v) {
        if (v === '') {
          this.countys = []
          return
        }
        this.$api.commonzone({
          upperCode: v
        }).then(res => {
          this.countys = this.dealOriginData(res.data)
        }).catch(e => {
        })
      },
      selectedCounty (v) {
        if (v === '') {
          this.areas = []
          return
        }
        this.$api.commonzone({
          upperCode: v
        }).then(res => {
          this.areas = this.dealOriginData(res.data)
        }).catch(e => {
        })
      },
      tempSelectedProvince (v) {
        this.$api.commonzone({
          upperCode: v
        }).then(res => {
          this.tempCitys = this.dealOriginData(res.data)
        }).catch(e => {
        })
      },
      tempSelectedCity (v) {
        if (v === '') {
          this.tempCountys = []
          return
        }
        this.$api.commonzone({
          upperCode: v
        }).then(res => {
          this.tempCountys = this.dealOriginData(res.data)
        }).catch(e => {
        })
      },
      tempSelectedCounty (v) {
        if (v === '') {
          this.tempAreas = []
          return
        }
        this.$api.commonzone({
          upperCode: v
        }).then(res => {
          this.tempAreas = this.dealOriginData(res.data)
        }).catch(e => {
        })
      }
    },
    methods: {
      exchangePoi (poiName) {
        let poi = this.getPoiByName(poiName)
        if (poi) {
          for (let i in this.selfPanoData) {
            if (poi.hasOwnProperty(i) && (i !== 'id')) {
              this.selfPanoData[i] = poi[i]
            }
          }
          this.selfPanoData.poiId = poi.id
          this.$emit('change-poi', poi)
        }
      },
      getPoiByName (poiName) {
        for (let i in this.pois) {
          if (this.pois[i].name === poiName) {
            return this.pois[i]
          }
        }
        return null
      },
      savePoiClick () {
        alert(JSON.stringify(this.tempPoiData))
        this.$api.updatePoi({
          id: this.tempPoiData.id,
          poiName: this.tempPoiData.name,
          coordsys: this.tempPoiData.coordsys,
          lat: this.tempPoiData.lat,
          lng: this.tempPoiData.lng,
          provinceId: this.tempPoiData.provinceId,
          cityId: this.tempPoiData.cityId,
          countyId: this.tempPoiData.countyId,
          areaId: this.tempPoiData.areaId,
          gridCode: this.tempPoiData.gridCode
        }).then(res => {
          console.log(res)
        }).catch(e => {
        })
      },
      updatePoiClick () {
        this.tempPoiData = this.$utils.shallowCopy(this.selfPoiData)
        this.tempPanoData = this.$utils.shallowCopy(this.selfPanoData)
      },
      dealOriginData (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].code = data[i].code + ''
        }
        return data
      },
      provinceChange () {
        this.selectedCity = this.selectedCounty = this.selectedArea = ''
      },
      cityChange () {
        this.selectedCounty = this.selectedArea = ''
      },
      countyChange () {
        this.selectedArea = ''
      },
      tempProvinceChange () {
        this.tempSelectedCity = this.tempSelectedCounty = this.tempSelectedArea = ''
      },
      tempCityChange () {
        this.tempSelectedCounty = this.tempSelectedArea = ''
      },
      tempCountyChange () {
        this.tempSelectedArea = ''
      },
      closeButNotSave () {
        this.selfPanoData = this.panoData
        this.selfShow = false
      },
      closeAndSave () {
        this.$set(this.selfPanoData, 'isEntry', 1)
        this.$api.savePanoInfo(this.selfPanoData).then(res => {
          console.log(res)
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.selfShow = false
        }).catch(e => {
        })
      },
      directionChange (angel) {
        console.log(angel)
      }
    },
    computed: {
      tags: {
        get () {
          console.log('this.selfPanoData')
          console.log(this.selfPanoData)
          if (this.selfPanoData.tag == null) {
            return []
          }
          return this.selfPanoData.tag.split('#')
        },
        set (v) {
          v.join('#')
        }
      },
      v: {
        get () {
          return new Date(this.selfPanoData.photoTime)
        },
        set (v) {
          this.selfPanoData.photoTime = v.getTime()
        }
      },
      selectedProvince: {
        get () {
          return this.selfPoiData.provinceId
        },
        set (v) {
          this.selfPoiData.provinceId = v
        }
      },
      selectedCity: {
        get () {
          return this.selfPoiData.cityId
        },
        set (v) {
          this.selfPoiData.cityId = v
        }
      },
      selectedCounty: {
        get () {
          return this.selfPoiData.countyId
        },
        set (v) {
          this.selfPoiData.countyId = v
        }
      },
      selectedArea: {
        get () {
          return this.selfPoiData.areaId
        },
        set (v) {
          this.selfPoiData.areaId = v
        }
      },
      tempSelectedProvince: {
        get () {
          return this.selfPoiData.provinceId
        },
        set (v) {
          this.selfPoiData.provinceId = v
        }
      },
      tempSelectedCity: {
        get () {
          return this.selfPoiData.cityId
        },
        set (v) {
          this.selfPoiData.cityId = v
        }
      },
      tempSelectedCounty: {
        get () {
          return this.selfPoiData.countyId
        },
        set (v) {
          this.selfPoiData.countyId = v
        }
      },
      tempSelectedArea: {
        get () {
          return this.selfPoiData.areaId
        },
        set (v) {
          this.selfPoiData.areaId = v
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../style/space";
  .grey{
    height: 100%;
    width: 100%;
    position: absolute;
    background: rgba(52, 52, 52, 0.5);
    z-index: 2;
  }
  .dialog-container{
    width: 700px;
    height: 660px;
    border-radius: 3px;
    background: #fff;
    display: flex;
    flex-direction: column;
    h3{
      padding:5px 0;
      margin: 0;
      font-size: 14px;
      font-weight: normal;
      color: #888;
      .xing{
        color: red;
      }
    }
    .dialog-head{
      flex: 0 0 auto;
      height: 50px;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 15px;
      .dialog-head-title{
        font-size: 16px;
      }
      .dialog-close{
        color: #bbb;
        cursor: pointer;
      }
    }
    .dialog-body{
      flex: 1 0 0;
      overflow-y: scroll;
      display: flex;
      flex-direction: column;
      $iw: 130px;
      .disable-input{
        width: $iw;
      }
      .dialog-body-top,.dialog-body-bottom{
        flex: 0 0 auto;
        display: flex;
        position: relative;
        flex-direction: column;
      }
      .dialog-body-top{
        .selectPoi input {
          height: 28px;
          width: 100px;
        }
        .row-input{
          display: flex;
          justify-content: space-between;
          .row-input-son{
            width: $iw;
            display: flex;
            align-items: center;
          }
        }
      }
      .dialog-title-bar{
        flex: 0 0 auto;
        margin: 15px;
        border-bottom: 1px solid #bbb;
        display: flex;
        justify-content: space-between;
        .title{
          font-size: 16px;
        }
        .change-bar{
          display: flex;
          .change{
            flex: 0 0 auto;
            min-width: 40px;
            height: 20px;
            background: $space-blue;
            border-radius: 15px;
            color: #fff;
            font-size: 12px;
            font-weight: 300;
            margin-right: 10px;
            padding: 2px 5px;
            letter-spacing: 1px;
          }
          .change:last-of-type{
            margin-right: 0px;
          }
        }
      }
      .row{
        flex: 0 0 auto;
        display: flex;
        margin: 0 15px 15px 15px;
        .row-title{
          flex: 0 0 auto;
          width: 80px;
          display: flex;
          justify-content: flex-end;
        }
        .row-content{
          flex: 1 0 0;
          .circle-wenhao{
            $w: 15px;
            $c: #bbb;
            width: $w;
            height: $w;
            border: 1px solid $c;
            border-radius: $w / 2;
            font-size: 12px;
            color: $c;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        .jwd-container{
          display: flex;
          flex-direction: column;
          .jwd{
            display: flex;
            margin-bottom: 15px;
            .jwd-son{
              flex: 1 0 0;
              margin-right: 15px;
            }
            .jwd-son:last-of-type{
              margin-right: 0px;
            }
            .za{
              display: flex;
              justify-content: space-between;
              align-items: center;

              a{
                font-size: 12px;
                color: $space-blue;
                text-decoration: underline;
                letter-spacing: .7px;
              }
            }
          }
        }
        .chaoxiang-container{
          display: flex;
          justify-content: space-between;
          .chaoxiang-son{
            flex: 0 0 auto;
            .cx-box{
              width: 200px;
              height: 230px;
              border: 1px solid #ddd;
              border-radius: 3px;
              display: flex;
              flex-direction: column;
              .cx-box-head{
                flex: 0 0 auto;
                height: 30px;
                display: flex;
                align-items: center;
                font-size: 13px;
                padding-left: 15px;
                span{color: #999;}
              }
              .cx-box-body{
                flex: 1 0 0;
                background: #eee;
              }
            }
          }
          .cx-box-container{
            display: flex;
            position: relative;
            .circle-wenhao{
              margin: 10px 0 0 10px;
            }
          }
          .cx-input-container{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .input-row{
              flex: 0 0 auto;
              display: flex;
              .input-row-left{
                flex: 0 0 auto;
              }
              .input-row-right{
                flex: 0 0 auto;
                width: 230px;
                .date-time-picker{
                  width: 100%;
                }
              }
            }
          }
        }
        .tags{
          display: flex;
          .tag{
            align-self: center;
            border: 1px solid #888;
            border-radius: 3px;
            color: #888;
            font-size: 11px;
            padding: 1px 5px;
            margin-right: 10px;
            cursor: default;
            font-weight: 300;
          }
          .add-tag{
            align-self: center;
            border: 1px solid $space-blue;
            color: $space-blue;
            font-size: 12px;
            border-radius: 15px;
            padding: 1px 5px;
            letter-spacing: 1px;
            font-weight: 300;
          }
        }
      }
      .btn-bar{
        flex: 0 0 auto;
        display: flex;
        justify-content: center;
        .btn{
          width: 130px;
          padding: 5px 0;
          border-raidus: 3px;
          margin-right: 15px;
          font-size: 14px;
          font-weight: normal;
        }
        .btn:last-of-type{
          margin-right: 0px;
        }
        .cancel{
          border: 1px solid $space-blue;
          color: $space-blue;
        }
        .save{
          background: #bbb;
          color: #fff;
        }
      }
      .ruku-btn-bar{
        margin: 20px;
        .btn{
          border-radius: 5px;
        }
        .save{
          background: $space-blue;
        }
      }

    }

  }
</style>
